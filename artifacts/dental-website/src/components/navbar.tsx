import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="hidden md:flex bg-primary text-primary-foreground py-2 px-6 text-sm justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Downtown Chicago</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Mon-Fri 8am-6pm | Sat 9am-3pm</span>
          </div>
        </div>
        <div className="flex items-center gap-2 font-medium">
          <Phone className="h-4 w-4" />
          <span>(312) 555-0190</span>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-serif font-bold text-xl">M</span>
          </div>
          <span className="font-serif font-semibold text-xl tracking-tight text-foreground">
            Mitchell Dental Care
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About Dr. Mitchell</a>
          <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Reviews</a>
          <a href="#insurance" className="text-muted-foreground hover:text-primary transition-colors">Insurance</a>
        </nav>
        <Button asChild size="lg" className="rounded-full shadow-md hover:shadow-lg transition-all">
          <a href="#contact">Book Appointment</a>
        </Button>
      </div>
    </header>
  );
}
