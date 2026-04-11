import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Send } from "lucide-react";
import {
  CLINIC_PHONE,
  CLINIC_PHONE_TEL,
  CLINIC_EMAIL,
  CLINIC_ADDRESS_STREET,
  CLINIC_ADDRESS_CITY,
} from "@/lib/clinic-constants";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          subject: formData.get("subject") as string,
          message: formData.get("message") as string,
        }),
      });
      if (!response.ok) throw new Error("Server error");
      setIsSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">
              Whether you're ready to book an appointment, have a question about your insurance, or just want to say hello, we're here for you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-border shadow-sm">
                <CardContent className="p-8 space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Visit Us</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {CLINIC_ADDRESS_STREET}<br/>
                        {CLINIC_ADDRESS_CITY}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Call Us</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        <a href={`tel:${CLINIC_PHONE_TEL}`} className="hover:text-primary transition-colors">{CLINIC_PHONE}</a><br/>
                        <span className="text-sm">For emergencies, press 1.</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Email Us</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        <a href={`mailto:${CLINIC_EMAIL}`} className="hover:text-primary transition-colors">{CLINIC_EMAIL}</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Hours</h3>
                      <ul className="text-muted-foreground space-y-1">
                        <li className="flex justify-between"><span>Mon - Fri:</span> <span>8am - 6pm</span></li>
                        <li className="flex justify-between"><span>Saturday:</span> <span>9am - 3pm</span></li>
                        <li className="flex justify-between"><span>Sunday:</span> <span>Closed</span></li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Insurance */}
              <Card className="border-border shadow-sm bg-secondary/30">
                <CardContent className="p-8">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Insurance Accepted
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We accept most major PPO plans. If you don't see yours listed, call us to verify.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Delta Dental", "Cigna", "Aetna", "United Healthcare", "Blue Cross Blue Shield", "Humana"].map(plan => (
                      <span key={plan} className="text-xs font-medium bg-background border border-border px-3 py-1 rounded-full">
                        {plan}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Forms and Map */}
            <div className="lg:col-span-3 space-y-8">
              
              <Card className="border-border shadow-md">
                <CardContent className="p-8 md:p-10">
                  {isSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                        <Send className="w-10 h-10 ml-1" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold mb-4">We'll be in touch soon!</h3>
                      <p className="text-muted-foreground mb-8">
                        Thank you for reaching out. A member of our team will get back to you within 24 business hours.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)} variant="outline" className="rounded-full">
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-serif font-bold mb-6">Send a Message</h2>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" placeholder="John Doe" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input id="subject" name="subject" placeholder="How can we help?" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea id="message" name="message" placeholder="Type your message here..." className="min-h-[150px]" required />
                        </div>
                        {submitError && (
                          <p className="text-destructive text-sm font-medium">
                            Something went wrong. Please try again or call us at {CLINIC_PHONE}.
                          </p>
                        )}
                        <Button type="submit" size="lg" className="w-full rounded-full h-14 text-lg" disabled={isSubmitting}>
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <div className="w-full h-64 bg-secondary rounded-2xl overflow-hidden relative border border-border flex items-center justify-center">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="z-10 flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg mb-2">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="bg-background px-4 py-2 rounded-lg shadow-md font-medium text-sm">
                    Mitchell Dental Care
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
