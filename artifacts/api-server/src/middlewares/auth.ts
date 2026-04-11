import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: { id: number; email: string; name: string; role: string };
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET && process.env.NODE_ENV === "production") {
  throw new Error("JWT_SECRET must be set in production");
}
const resolvedSecret = JWT_SECRET ?? "dev-secret-change-in-production";
const secretKey = new TextEncoder().encode(resolvedSecret);

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token = (req.cookies as Record<string, string> | undefined)?.token;
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const { payload } = await jwtVerify(token, secretKey);
    req.user = {
      id: parseInt(payload.sub as string, 10),
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
    };
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}

export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  await requireAuth(req, res, async () => {
    if (req.user?.role !== "admin") {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    next();
  });
}
