export const CLINIC_NAME = "Mitchell Dental Care";
export const CLINIC_PHONE = "(312) 555-0190";
export const CLINIC_PHONE_TEL = "+13125550190";
export const CLINIC_WHATSAPP_NUMBER = "13125550190";
export const CLINIC_EMAIL = "hello@mitchelldental.com";
export const CLINIC_ADDRESS_STREET = "1200 N Michigan Ave, Suite 400";
export const CLINIC_ADDRESS_CITY = "Chicago, IL 60611";
export const CLINIC_ADDRESS_FULL = `${CLINIC_ADDRESS_STREET}, ${CLINIC_ADDRESS_CITY}`;
export const CLINIC_HOURS_WEEKDAY = "Mon-Fri 8am-6pm";
export const CLINIC_HOURS_SATURDAY = "Sat 9am-3pm";
export const CLINIC_HOURS_WEEKDAY_LONG = "Monday - Friday: 8:00 AM - 6:00 PM";
export const CLINIC_HOURS_SATURDAY_LONG = "Saturday: 9:00 AM - 3:00 PM";
export const CLINIC_LOCATION_LABEL = "Downtown Chicago";

export const DENTAL_SERVICES = [
  "General Dentistry",
  "Teeth Whitening",
  "Dental Implants",
  "Invisalign",
  "Pediatric Dentistry",
  "Emergency Care",
] as const;

export type DentalService = (typeof DENTAL_SERVICES)[number];
