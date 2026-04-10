import { Link } from "wouter";
import { Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { CLINIC_PHONE_TEL, CLINIC_WHATSAPP_NUMBER } from "@/lib/clinic-constants";

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      <a
        href={`https://wa.me/${CLINIC_WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
        aria-label="Contact on WhatsApp"
      >
        <SiWhatsapp className="h-7 w-7" />
        <span className="absolute right-full mr-4 whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-sm font-medium text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
          WhatsApp Us
        </span>
      </a>
      
      <a
        href={`tel:${CLINIC_PHONE_TEL}`}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
        aria-label="Call Now"
      >
        <Phone className="h-6 w-6" />
        <span className="absolute right-full mr-4 whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-sm font-medium text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
          Call Now
        </span>
      </a>
    </div>
  );
}
