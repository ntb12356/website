import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Menu, User, LogOut, LayoutDashboard, ShieldCheck } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CLINIC_LOCATION_LABEL,
  CLINIC_HOURS_WEEKDAY,
  CLINIC_HOURS_SATURDAY,
  CLINIC_PHONE,
  CLINIC_NAME,
} from "@/lib/clinic-constants";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isLoading: isAuthLoading, logout } = useAuth();
  const [, navigate] = useLocation();

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="hidden md:flex bg-primary text-primary-foreground py-2 px-6 text-sm justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{CLINIC_LOCATION_LABEL}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{CLINIC_HOURS_WEEKDAY} | {CLINIC_HOURS_SATURDAY}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 font-medium">
          <Phone className="h-4 w-4" />
          <span>{CLINIC_PHONE}</span>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-serif font-bold text-xl">M</span>
          </div>
          <span className="font-serif font-semibold text-xl tracking-tight text-foreground">
            {CLINIC_NAME}
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link>
          <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Dr. Mitchell</Link>
          <a href="/#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Reviews</a>
          <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact & Insurance</Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-3">
          {!isAuthLoading && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full gap-2">
                  <User className="h-4 w-4" />
                  {user.name.split(" ")[0] ?? user.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                {user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center gap-2 cursor-pointer">
                      <ShieldCheck className="h-4 w-4" /> Admin
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                    <LayoutDashboard className="h-4 w-4" /> My Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive cursor-pointer"
                  onClick={() => logout({ onSuccess: () => navigate("/") })}
                >
                  <LogOut className="h-4 w-4 mr-2" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : !isAuthLoading ? (
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link href="/login">Sign in</Link>
            </Button>
          ) : null}
          <Button asChild size="lg" className="rounded-full shadow-md hover:shadow-lg transition-all">
            <Link href="/book">Book Appointment</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <nav className="flex flex-col gap-6 mt-8">
              <Link href="/services" onClick={() => setOpen(false)} className="text-lg font-medium text-foreground hover:text-primary transition-colors">Services</Link>
              <Link href="/about" onClick={() => setOpen(false)} className="text-lg font-medium text-foreground hover:text-primary transition-colors">About Dr. Mitchell</Link>
              <a href="/#testimonials" onClick={() => setOpen(false)} className="text-lg font-medium text-foreground hover:text-primary transition-colors">Reviews</a>
              <Link href="/contact" onClick={() => setOpen(false)} className="text-lg font-medium text-foreground hover:text-primary transition-colors">Contact & Insurance</Link>
              <div className="pt-6 border-t border-border flex flex-col gap-3">
                {!isAuthLoading && user ? (
                  <>
                    {user.role === "admin" && (
                      <Button asChild variant="outline" size="lg" className="w-full rounded-full">
                        <Link href="/admin" onClick={() => setOpen(false)}>Admin Dashboard</Link>
                      </Button>
                    )}
                    <Button asChild variant="outline" size="lg" className="w-full rounded-full">
                      <Link href="/dashboard" onClick={() => setOpen(false)}>My Dashboard</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full rounded-full text-destructive"
                      onClick={() => { setOpen(false); logout({ onSuccess: () => navigate("/") }); }}
                    >
                      Sign out
                    </Button>
                  </>
                ) : (
                  <Button asChild variant="outline" size="lg" className="w-full rounded-full">
                    <Link href="/login" onClick={() => setOpen(false)}>Sign in</Link>
                  </Button>
                )}
                <Button asChild size="lg" className="w-full rounded-full">
                  <Link href="/book" onClick={() => setOpen(false)}>Book Appointment</Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
