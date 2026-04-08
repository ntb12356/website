import { Router, type IRouter } from "express";
import { eq, and } from "drizzle-orm";
import { db, appointmentsTable } from "@workspace/db";
import {
  CreateAppointmentBody,
  GetAppointmentParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

const SERVICES = [
  "General Dentistry",
  "Teeth Whitening",
  "Dental Implants",
  "Invisalign",
  "Emergency Care",
  "Pediatric Dentistry",
];

function generateAllSlots(date: string): { time: string; label: string }[] {
  const d = new Date(date + "T00:00:00");
  const dayOfWeek = d.getUTCDay();

  if (dayOfWeek === 0) return [];

  const slots: { time: string; label: string }[] = [];
  const isSaturday = dayOfWeek === 6;

  const startHour = 8;
  const endHour = isSaturday ? 15 : 18;

  for (let h = startHour; h < endHour; h++) {
    for (const m of [0, 30]) {
      const hour = h.toString().padStart(2, "0");
      const min = m.toString().padStart(2, "0");
      const time = `${hour}:${min}`;
      const period = h < 12 ? "AM" : "PM";
      const displayHour = h % 12 === 0 ? 12 : h % 12;
      const label = `${displayHour}:${min} ${period}`;
      slots.push({ time, label });
    }
  }

  return slots;
}

router.get("/appointments/available-slots", async (req, res): Promise<void> => {
  const { date } = req.query as { date?: string };

  if (!date || typeof date !== "string") {
    res.status(400).json({ error: "date query parameter is required (YYYY-MM-DD)" });
    return;
  }

  const allSlots = generateAllSlots(date);

  if (allSlots.length === 0) {
    res.json({ date, slots: [] });
    return;
  }

  const booked = await db
    .select({ timeSlot: appointmentsTable.timeSlot })
    .from(appointmentsTable)
    .where(eq(appointmentsTable.date, date));

  const bookedSet = new Set(booked.map((b) => b.timeSlot));

  const slots = allSlots.map((slot) => ({
    ...slot,
    available: !bookedSet.has(slot.time),
  }));

  res.json({ date, slots });
});

router.post("/appointments", async (req, res): Promise<void> => {
  const parsed = CreateAppointmentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { patientName, patientEmail, patientPhone, service, date, timeSlot, notes } = parsed.data;

  const d = new Date(date + "T00:00:00");
  const dayOfWeek = d.getUTCDay();
  if (dayOfWeek === 0) {
    res.status(400).json({ error: "The practice is closed on Sundays." });
    return;
  }

  const existing = await db
    .select()
    .from(appointmentsTable)
    .where(
      and(
        eq(appointmentsTable.date, date),
        eq(appointmentsTable.timeSlot, timeSlot)
      )
    );

  if (existing.length > 0) {
    res.status(409).json({ error: "This time slot is already booked. Please choose another." });
    return;
  }

  const [appointment] = await db
    .insert(appointmentsTable)
    .values({
      patientName,
      patientEmail,
      patientPhone,
      service,
      date,
      timeSlot,
      notes: notes ?? null,
    })
    .returning();

  res.status(201).json(appointment);
});

router.get("/appointments/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetAppointmentParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid appointment ID" });
    return;
  }

  const [appointment] = await db
    .select()
    .from(appointmentsTable)
    .where(eq(appointmentsTable.id, params.data.id));

  if (!appointment) {
    res.status(404).json({ error: "Appointment not found" });
    return;
  }

  res.json(appointment);
});

export default router;
