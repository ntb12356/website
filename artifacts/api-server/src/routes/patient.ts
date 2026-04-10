import { Router, type IRouter, type Request, type Response } from "express";
import { eq, and, desc } from "drizzle-orm";
import { db, appointmentsTable, usersTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";

const router: IRouter = Router();

router.get(
  "/patient/me/appointments",
  requireAuth,
  async (req: Request, res: Response): Promise<void> => {
    const email = req.user!.email;

    const appointments = await db
      .select()
      .from(appointmentsTable)
      .where(eq(appointmentsTable.patientEmail, email))
      .orderBy(desc(appointmentsTable.date));

    res.json({ appointments });
  },
);

router.patch(
  "/patient/me/appointments/:id/cancel",
  requireAuth,
  async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(String(req.params.id), 10);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid appointment ID" });
      return;
    }

    const email = req.user!.email;

    const [appointment] = await db
      .select()
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.id, id),
          eq(appointmentsTable.patientEmail, email),
        ),
      );

    if (!appointment) {
      res.status(404).json({ error: "Appointment not found" });
      return;
    }

    if (
      appointment.status !== "confirmed" &&
      appointment.status !== "pending"
    ) {
      res
        .status(400)
        .json({ error: "Only confirmed or pending appointments can be cancelled" });
      return;
    }

    const [updated] = await db
      .update(appointmentsTable)
      .set({ status: "cancelled" })
      .where(eq(appointmentsTable.id, id))
      .returning();

    res.json(updated);
  },
);

router.get(
  "/patient/me",
  requireAuth,
  async (req: Request, res: Response): Promise<void> => {
    const [user] = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        role: usersTable.role,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .where(eq(usersTable.id, req.user!.id));

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  },
);

router.patch(
  "/patient/me",
  requireAuth,
  async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body as { name?: string };

    if (!name) {
      res.status(400).json({ error: "name is required" });
      return;
    }

    const [updated] = await db
      .update(usersTable)
      .set({ name })
      .where(eq(usersTable.id, req.user!.id))
      .returning({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        role: usersTable.role,
      });

    if (!updated) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(updated);
  },
);

export default router;
