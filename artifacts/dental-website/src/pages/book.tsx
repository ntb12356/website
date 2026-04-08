import { useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Smile, Sparkles, HeartHandshake, Phone, ArrowLeft, Calendar as CalendarIcon, CheckCircle2, Clock } from "lucide-react";
import { useLocation, Link } from "wouter";
import { Calendar } from "@/components/ui/calendar";
import { useGetAvailableSlots, useCreateAppointment } from "@workspace/api-client-react";
import { format, addDays, startOfToday } from "date-fns";
import { useForm as useRHForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SERVICES = [
  { id: "General Dentistry", title: "General Dentistry", icon: Smile },
  { id: "Teeth Whitening", title: "Teeth Whitening", icon: Sparkles },
  { id: "Dental Implants", title: "Dental Implants", icon: ShieldCheck },
  { id: "Invisalign", title: "Invisalign", icon: HeartHandshake },
  { id: "Pediatric Dentistry", title: "Pediatric Dentistry", icon: Smile },
  { id: "Emergency Care", title: "Emergency Care", icon: Phone },
];

const formSchema = z.object({
  patientName: z.string().min(2, "Name is required"),
  patientEmail: z.string().email("Valid email is required"),
  patientPhone: z.string().min(10, "Valid phone number is required"),
  notes: z.string().optional(),
});

type Step = 1 | 2 | 3 | 4;

export default function Book() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1]);
  const initialService = urlParams.get("service") || "";

  const [step, setStep] = useState<Step>(1);
  const [selectedService, setSelectedService] = useState<string>(initialService);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [bookingResult, setBookingResult] = useState<any>(null);
  
  const today = startOfToday();
  const maxDate = addDays(today, 60);

  const { data: slotsData, isLoading: isLoadingSlots } = useGetAvailableSlots(
    { 
      date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
      service: selectedService
    },
    { 
      query: { 
        enabled: !!selectedDate, 
        queryKey: ["/api/appointments/available-slots", { date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "", service: selectedService }]
      }
    }
  );

  const createAppointment = useCreateAppointment();

  const form = useRHForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      notes: "",
    },
  });

  const handleNextStep = () => {
    setStep((prev) => Math.min(prev + 1, 4) as Step);
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1) as Step);
  };

  const onSubmitDetails = (data: z.infer<typeof formSchema>) => {
    if (!selectedDate || !selectedTimeSlot || !selectedService) return;

    createAppointment.mutate({
      data: {
        patientName: data.patientName,
        patientEmail: data.patientEmail,
        patientPhone: data.patientPhone,
        notes: data.notes,
        service: selectedService,
        date: format(selectedDate, "yyyy-MM-dd"),
        timeSlot: selectedTimeSlot
      }
    }, {
      onSuccess: (result) => {
        setBookingResult(result);
        setStep(4);
      }
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4 container mx-auto max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-6">Book Your Visit</h1>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center max-w-md mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <Fragment key={i}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                  step >= i ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  {i}
                </div>
                {i < 4 && (
                  <div className={`h-1 w-12 sm:w-20 transition-colors duration-300 ${
                    step > i ? "bg-primary" : "bg-secondary"
                  }`} />
                )}
              </Fragment>
            ))}
          </div>
          <div className="flex justify-between max-w-md mx-auto mt-2 text-xs font-medium text-muted-foreground px-2">
            <span>Service</span>
            <span className="ml-2">Time</span>
            <span className="ml-2">Details</span>
            <span>Done</span>
          </div>
        </div>

        <div className="bg-card rounded-3xl shadow-lg border border-border p-6 md:p-10 relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial="hidden" animate="visible" exit="exit" variants={fadeInUp} className="w-full h-full">
                <h2 className="text-2xl font-serif font-bold mb-6">What can we help you with?</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {SERVICES.map((service) => (
                    <Card 
                      key={service.id}
                      className={`cursor-pointer transition-all duration-200 border-2 hover:border-primary/50 ${selectedService === service.id ? 'border-primary bg-primary/5' : 'border-border'}`}
                      onClick={() => {
                        setSelectedService(service.id);
                        setTimeout(handleNextStep, 300);
                      }}
                    >
                      <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedService === service.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-primary'}`}>
                          <service.icon className="w-6 h-6" />
                        </div>
                        <span className="font-semibold text-foreground">{service.title}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial="hidden" animate="visible" exit="exit" variants={fadeInUp} className="w-full h-full">
                <Button variant="ghost" onClick={handlePrevStep} className="mb-6 -ml-4 text-muted-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <h2 className="text-2xl font-serif font-bold mb-6">Choose a date and time</h2>
                
                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="font-medium mb-4 flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-primary" /> Select Date
                    </h3>
                    <div className="border border-border rounded-xl p-4 bg-background inline-block">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < today || date > maxDate || date.getDay() === 0}
                        className="rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" /> Select Time
                    </h3>
                    {!selectedDate ? (
                      <div className="h-48 flex items-center justify-center text-muted-foreground bg-secondary/30 rounded-xl border border-dashed border-border">
                        Please select a date first
                      </div>
                    ) : isLoadingSlots ? (
                      <div className="h-48 flex items-center justify-center text-muted-foreground">
                        Loading available times...
                      </div>
                    ) : slotsData?.slots?.length ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {slotsData.slots.map((slot) => (
                          <Button
                            key={slot.time}
                            variant={selectedTimeSlot === slot.time ? "default" : "outline"}
                            className={`rounded-lg ${!slot.available && 'opacity-50'}`}
                            disabled={!slot.available}
                            onClick={() => setSelectedTimeSlot(slot.time)}
                          >
                            {slot.label}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center text-muted-foreground bg-secondary/30 rounded-xl border border-dashed border-border text-center p-6">
                        No available slots on this date. Please choose another date.
                      </div>
                    )}
                    
                    <div className="mt-8 flex justify-end">
                      <Button 
                        size="lg" 
                        className="rounded-full px-8" 
                        disabled={!selectedDate || !selectedTimeSlot}
                        onClick={handleNextStep}
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial="hidden" animate="visible" exit="exit" variants={fadeInUp} className="w-full h-full max-w-2xl mx-auto">
                <Button variant="ghost" onClick={handlePrevStep} className="mb-6 -ml-4 text-muted-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <h2 className="text-2xl font-serif font-bold mb-6">Your Details</h2>
                
                <div className="bg-secondary/30 p-4 rounded-xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Service</p>
                    <p className="font-semibold">{selectedService}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-semibold">
                      {selectedDate && format(selectedDate, "MMMM d, yyyy")} at {slotsData?.slots?.find(s => s.time === selectedTimeSlot)?.label}
                    </p>
                  </div>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitDetails)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="patientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="patientEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="patientPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(312) 555-0190" type="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Any notes or concerns? (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Please let us know if you have any specific concerns or dental anxiety..." className="min-h-[100px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4 flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">By booking, you agree to our policies.</p>
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="rounded-full px-8"
                        disabled={createAppointment.isPending}
                      >
                        {createAppointment.isPending ? "Booking..." : "Confirm Booking"}
                      </Button>
                    </div>
                    {createAppointment.isError && (
                      <p className="text-destructive text-sm font-medium mt-2">There was an error creating your appointment. Please try again.</p>
                    )}
                  </form>
                </Form>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-serif font-bold mb-4">You're all set!</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                  We've successfully booked your appointment. A confirmation email has been sent to {bookingResult?.patientEmail}.
                </p>
                
                <div className="bg-secondary/50 rounded-2xl p-6 mb-8 w-full max-w-md text-left">
                  <p className="text-sm text-muted-foreground mb-1">Confirmation Number</p>
                  <p className="font-mono font-bold text-lg mb-4">#{bookingResult?.id?.toString().padStart(6, '0')}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{bookingResult?.date && format(new Date(bookingResult.date), "MMM d, yyyy")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">{bookingResult?.timeSlot}</p>
                    </div>
                    <div className="col-span-2 mt-2">
                      <p className="text-sm text-muted-foreground">Service</p>
                      <p className="font-medium">{bookingResult?.service}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button asChild variant="outline" size="lg" className="rounded-full">
                    <Link href="/">Back to Home</Link>
                  </Button>
                  <Button 
                    size="lg" 
                    className="rounded-full"
                    onClick={() => {
                      setStep(1);
                      setSelectedDate(undefined);
                      setSelectedTimeSlot("");
                      form.reset();
                    }}
                  >
                    Book Another
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
