import { Router, type IRouter, type Request, type Response } from "express";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { eq, and, gt, isNull } from "drizzle-orm";
import { db, usersTable, passwordResetTokensTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";
import rateLimit from "express-rate-limit";

const router: IRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET && process.env.NODE_ENV === "production") {
  throw new Error("JWT_SECRET must be set in production");
}
const resolvedSecret = JWT_SECRET ?? "dev-secret-change-in-production";
const secretKey = new TextEncoder().encode(resolvedSecret);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

async function signToken(user: {
  id: number;
  email: string;
  name: string;
  role: string;
}): Promise<string> {
  return new SignJWT({ email: user.email, name: user.name, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id.toString())
    .setExpirationTime("7d")
    .sign(secretKey);
}

function setAuthCookie(res: Response, token: string): void {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

router.post("/auth/register", authLimiter, async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name || !email || !password) {
    res.status(400).json({ error: "name, email, and password are required" });
    return;
  }

  const existing = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, email.toLowerCase()));

  if (existing.length > 0) {
    res.status(409).json({ error: "Email already registered" });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const [user] = await db
    .insert(usersTable)
    .values({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: "patient",
    })
    .returning();

  const token = await signToken(user);
  setAuthCookie(res, token);

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

router.post("/auth/login", authLimiter, async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    res.status(400).json({ error: "email and password are required" });
    return;
  }

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email.toLowerCase()));

  if (!user || !user.passwordHash) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const token = await signToken(user);
  setAuthCookie(res, token);

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

router.post("/auth/logout", (_req: Request, res: Response): void => {
  res.clearCookie("token", { path: "/" });
  res.json({ message: "Logged out" });
});

router.get(
  "/auth/me",
  authLimiter,
  requireAuth,
  (req: Request, res: Response): void => {
    res.json(req.user);
  },
);

router.post("/auth/forgot-password", authLimiter, async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body as { email?: string };

  if (!email) {
    res.status(400).json({ error: "email is required" });
    return;
  }

  const [user] = await db
    .select({ id: usersTable.id, email: usersTable.email })
    .from(usersTable)
    .where(eq(usersTable.email, email.toLowerCase()));

  if (!user) {
    // Don't reveal whether email exists
    res.json({ message: "If an account with that email exists, a reset link has been sent." });
    return;
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await db.insert(passwordResetTokensTable).values({
    userId: user.id,
    token,
    expiresAt,
  });

  res.json({
    message: "If an account with that email exists, a reset link has been sent.",
  });
});

router.post("/auth/reset-password", authLimiter, async (req: Request, res: Response): Promise<void> => {
  const { token, newPassword } = req.body as {
    token?: string;
    newPassword?: string;
  };

  if (!token || !newPassword) {
    res.status(400).json({ error: "token and newPassword are required" });
    return;
  }

  const now = new Date();

  const [resetToken] = await db
    .select()
    .from(passwordResetTokensTable)
    .where(
      and(
        eq(passwordResetTokensTable.token, token),
        gt(passwordResetTokensTable.expiresAt, now),
        isNull(passwordResetTokensTable.usedAt),
      ),
    );

  if (!resetToken) {
    res.status(400).json({ error: "Invalid or expired reset token" });
    return;
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);

  await Promise.all([
    db
      .update(usersTable)
      .set({ passwordHash })
      .where(eq(usersTable.id, resetToken.userId)),
    db
      .update(passwordResetTokensTable)
      .set({ usedAt: now })
      .where(eq(passwordResetTokensTable.id, resetToken.id)),
  ]);

  res.json({ message: "Password reset successfully" });
});

export default router;
