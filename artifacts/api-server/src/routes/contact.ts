import { Router, type IRouter } from "express";
import * as z from "zod";
import { db, contactInquiriesTable } from "@workspace/db";

const router: IRouter = Router();

const ContactInquiryBody = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  service: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = ContactInquiryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, email, phone, service, subject, message } = parsed.data;
  const resolvedSubject =
    subject?.trim() ||
    (service ? `Appointment request: ${service}` : "General Inquiry");

  await db.insert(contactInquiriesTable).values({
    name,
    email,
    phone: phone ?? null,
    service: service ?? null,
    subject: resolvedSubject,
    message,
  });

  res.status(201).json({ success: true });
});

export default router;
