import { Router, type IRouter, type Request, type Response } from "express";
import { eq, and, ilike, or, sql, desc } from "drizzle-orm";
import { db, appointmentsTable, usersTable } from "@workspace/db";
import { requireAdmin } from "../middlewares/auth";

const router: IRouter = Router();

router.get(
  "/admin/stats",
  requireAdmin,
  async (_req: Request, res: Response): Promise<void> => {
    const today = new Date().toISOString().slice(0, 10);

    const [[totalRow], [todayRow], [pendingRow], [patientsRow]] =
      await Promise.all([
        db
          .select({ count: sql<number>`count(*)::int` })
          .from(appointmentsTable),
        db
          .select({ count: sql<number>`count(*)::int` })
          .from(appointmentsTable)
          .where(eq(appointmentsTable.date, today)),
        db
          .select({ count: sql<number>`count(*)::int` })
          .from(appointmentsTable)
          .where(eq(appointmentsTable.status, "pending")),
        db
          .select({ count: sql<number>`count(*)::int` })
          .from(usersTable)
          .where(eq(usersTable.role, "patient")),
      ]);

    res.json({
      totalBookings: totalRow?.count ?? 0,
      todayBookings: todayRow?.count ?? 0,
      pendingBookings: pendingRow?.count ?? 0,
      totalPatients: patientsRow?.count ?? 0,
    });
  },
);

router.get(
  "/admin/appointments",
  requireAdmin,
  async (req: Request, res: Response): Promise<void> => {
    const page = Math.max(1, parseInt(String(req.query.page ?? "1"), 10));
    const limit = Math.min(
      100,
      Math.max(1, parseInt(String(req.query.limit ?? "20"), 10)),
    );
    const offset = (page - 1) * limit;
    const status = req.query.status as string | undefined;
    const date = req.query.date as string | undefined;
    const service = req.query.service as string | undefined;
    const search = req.query.search as string | undefined;

    const conditions = [];
    if (status) conditions.push(eq(appointmentsTable.status, status));
    if (date) conditions.push(eq(appointmentsTable.date, date));
    if (service) conditions.push(eq(appointmentsTable.service, service));
    if (search) {
      conditions.push(
        or(
          ilike(appointmentsTable.patientName, `%${search}%`),
          ilike(appointmentsTable.patientEmail, `%${search}%`),
        ),
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [appointments, [totalRow]] = await Promise.all([
      db
        .select()
        .from(appointmentsTable)
        .where(whereClause)
        .orderBy(desc(appointmentsTable.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(appointmentsTable)
        .where(whereClause),
    ]);

    res.json({
      appointments,
      total: totalRow?.count ?? 0,
      page,
      limit,
    });
  },
);

router.patch(
  "/admin/appointments/:id",
  requireAdmin,
  async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(String(req.params.id), 10);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid appointment ID" });
      return;
    }

    const { status } = req.body as { status?: string };
    const validStatuses = ["confirmed", "cancelled", "completed", "pending"];
    if (!status || !validStatuses.includes(status)) {
      res
        .status(400)
        .json({ error: "status must be one of: " + validStatuses.join(", ") });
      return;
    }

    const [updated] = await db
      .update(appointmentsTable)
      .set({ status })
      .where(eq(appointmentsTable.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Appointment not found" });
      return;
    }

    res.json(updated);
  },
);

router.patch(
  "/admin/appointments/:id/reschedule",
  requireAdmin,
  async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(String(req.params.id), 10);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid appointment ID" });
      return;
    }

    const { date, timeSlot } = req.body as {
      date?: string;
      timeSlot?: string;
    };
    if (!date || !timeSlot) {
      res.status(400).json({ error: "date and timeSlot are required" });
      return;
    }

    const [updated] = await db
      .update(appointmentsTable)
      .set({ date, timeSlot })
      .where(eq(appointmentsTable.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Appointment not found" });
      return;
    }

    res.json(updated);
  },
);

router.get(
  "/admin/patients",
  requireAdmin,
  async (_req: Request, res: Response): Promise<void> => {
    const patients = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        createdAt: usersTable.createdAt,
        appointmentCount:
          sql<number>`count(${appointmentsTable.id})::int`,
      })
      .from(usersTable)
      .leftJoin(
        appointmentsTable,
        eq(usersTable.email, appointmentsTable.patientEmail),
      )
      .where(eq(usersTable.role, "patient"))
      .groupBy(
        usersTable.id,
        usersTable.name,
        usersTable.email,
        usersTable.createdAt,
      )
      .orderBy(desc(usersTable.createdAt));

    res.json({ patients, total: patients.length });
  },
);

router.get(
  "/admin/patients/:id",
  requireAdmin,
  async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(String(req.params.id), 10);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid patient ID" });
      return;
    }

    const [patient] = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        role: usersTable.role,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .where(and(eq(usersTable.id, id), eq(usersTable.role, "patient")));

    if (!patient) {
      res.status(404).json({ error: "Patient not found" });
      return;
    }

    const appointments = await db
      .select()
      .from(appointmentsTable)
      .where(eq(appointmentsTable.patientEmail, patient.email))
      .orderBy(desc(appointmentsTable.createdAt));

    res.json({ patient, appointments });
  },
);

export default router;
