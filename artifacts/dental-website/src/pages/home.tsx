import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Star, 
  ShieldCheck, 
  Smile, 
  HeartHandshake, 
  Sparkles,
  ArrowRight,
  Activity,
  Stethoscope,
  Syringe,
  Baby,
  StarHalf,
  ChevronRight,
  Droplets
} from "lucide-react";
import { FormEvent, useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const BeforeAfterImage = ({ before, after, label }: { before: string, after: string, label: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative aspect-square rounded-3xl overflow-hidden cursor-ew-resize group shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={before} alt={`Before ${label}`} className="absolute inset-0 w-full h-full object-cover" />
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-500 ease-in-out z-10"
        style={{ width: isHovered ? '100%' : '50%' }}
      >
        <img src={after} alt={`After ${label}`} className="absolute inset-0 w-[200%] h-full object-cover max-w-none" style={{ width: 'calc(100% * (1 / (50 / 100)))', transform: isHovered ? 'translateX(0)' : 'translateX(0)' }} />
      </div>
      <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">BEFORE</div>
      <div className="absolute top-4 right-4 z-20 bg-primary/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full transition-opacity duration-300" style={{ opacity: isHovered ? 1 : 0 }}>AFTER</div>
      
      {!isHovered && (
        <div className="absolute inset-y-0 left-1/2 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 -translate-x-1/2 pointer-events-none flex items-center justify-center">
          <div className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-primary">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const { toast } = useToast();

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Received",
      description: "We will contact you shortly to confirm your appointment time.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* 1. Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-secondary/30" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20 shadow-sm">
                <MapPin className="w-4 h-4" />
                <span>Downtown Chicago | 1200 N Michigan Ave</span>
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight mb-6 tracking-tight">
                Anxiety-free dentistry. <br/><span className="text-primary italic font-light">Book today, smile today.</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
                The antidote to the dentist you've been avoiding. Experience pain-free technology in a space that feels like a wellness studio, right in the heart of Chicago.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full text-base h-14 px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-1 transition-all" asChild>
                  <Link href="/book">
                    Book Appointment
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full text-base h-14 px-8 border-2" asChild>
                  <a href="tel:+13125550190">
                    <Phone className="mr-2 w-5 h-5" />
                    Call Now
                  </a>
                </Button>
              </motion.div>
              <motion.div variants={fadeInUp} className="mt-10 flex items-center gap-4 text-sm text-muted-foreground bg-background/50 backdrop-blur-sm p-4 rounded-2xl inline-flex shadow-sm border border-border/50">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="h-5 w-px bg-border mx-2"></div>
                <div className="font-medium">
                  <strong className="text-foreground">4.9/5</strong> rating from <strong className="text-foreground">500+</strong> patients
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl relative border-8 border-background">
                <img 
                  src="/hero.png" 
                  alt="Bright modern dental clinic reception" 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-8 -left-8 bg-background p-6 rounded-3xl shadow-xl max-w-xs border border-border/50 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg mb-1">Accepting New Patients</h3>
                    <p className="text-sm text-muted-foreground">Same-day appointments often available.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. USP Strip */}
      <section className="py-8 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
            {[
              { icon: ShieldCheck, text: "Pain-Free Technology" },
              { icon: Activity, text: "Advanced Digital X-Rays" },
              { icon: Star, text: "15+ Years Experience" },
              { icon: Smile, text: "500+ Happy Patients" }
            ].map((usp, i) => (
              <div key={i} className="flex items-center gap-3">
                <usp.icon className="w-6 h-6 text-primary-foreground/80" />
                <span className="font-medium tracking-wide text-sm md:text-base">{usp.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Emergency Dental Care Highlight */}
      <section className="py-16 bg-destructive/10 border-y border-destructive/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-destructive/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/20 text-destructive mb-6 shadow-sm">
            <Activity className="w-8 h-8 animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">In Dental Pain? We Can Help Today.</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't wait if you're experiencing severe toothache, a broken tooth, or a lost filling. We reserve specific times every day for emergency patients.
          </p>
          <Button size="lg" className="rounded-full h-16 px-10 text-lg bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg shadow-destructive/30 animate-pulse transition-all hover:scale-105" asChild>
            <a href="tel:+13125550190">
              <Phone className="mr-3 w-6 h-6" />
              Call (312) 555-0190 Now
            </a>
          </Button>
        </div>
      </section>

      {/* 5. Doctor Profile */}
      <section id="about" className="py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl max-w-md mx-auto border-8 border-secondary">
                <img 
                  src="/doctor.png" 
                  alt="Dr. Sarah Mitchell" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute top-1/2 -right-8 -translate-y-1/2 bg-white p-6 rounded-3xl shadow-xl hidden lg:block max-w-[240px]">
                <p className="font-serif italic text-lg leading-relaxed text-foreground">
                  "Going to the dentist shouldn't cause anxiety. We're here to change that."
                </p>
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <HeartHandshake className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Specialty</p>
                    <p className="font-medium text-sm">Anxiety-Free Care</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">
                Meet Dr. Sarah Mitchell
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-8 leading-relaxed">
                A Chicago native, Dr. Mitchell built this practice with a singular vision: to create a dental environment that feels safe, transparent, and remarkably gentle. She specializes in treating patients who have avoided dental care for years.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6 mb-10">
                <div className="bg-secondary/50 p-5 rounded-2xl">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Education</p>
                  <p className="font-medium">Northwestern University School of Dentistry</p>
                </div>
                <div className="bg-secondary/50 p-5 rounded-2xl">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Experience</p>
                  <p className="font-medium">15+ Years Clinical Excellence</p>
                </div>
                <div className="bg-secondary/50 p-5 rounded-2xl">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Credentials</p>
                  <p className="font-medium">Board Certified Dentist</p>
                </div>
                <div className="bg-secondary/50 p-5 rounded-2xl">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Focus</p>
                  <p className="font-medium">Cosmetic & Anxiety-Free</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Signature_of_John_Hancock.svg" alt="Signature" className="h-12 opacity-30 mix-blend-multiply dark:invert" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Services Section */}
      <section id="services" className="py-24 bg-secondary/30 relative">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Our Treatments</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">Comprehensive, Gentle Care</h2>
            <p className="text-lg text-muted-foreground">From routine cleanings to complete smile makeovers, we provide all the care you need under one roof using the latest technology.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "General Checkup & Cleaning", desc: "Preventative care to keep your smile healthy and bright.", icon: Sparkles },
              { title: "Teeth Whitening", desc: "Professional, long-lasting brightening for a radiant smile.", icon: Smile },
              { title: "Dental Implants", desc: "Permanent, natural-looking solutions for missing teeth.", icon: ShieldCheck },
              { title: "Invisalign", desc: "Clear, comfortable aligners to straighten your teeth discreetly.", icon: HeartHandshake },
              { title: "Pediatric Dentistry", desc: "Gentle, fun, and educational care for our youngest patients.", icon: Baby },
              { title: "Emergency Care", desc: "Same-day appointments available for urgent dental needs.", icon: Phone },
              { title: "Root Canal", desc: "Pain-free endodontic therapy to save and restore damaged teeth.", icon: Stethoscope },
              { title: "Crowns & Bridges", desc: "Custom-crafted restorations to protect and beautify your teeth.", icon: Syringe },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.05 } }
                }}
              >
                <Card className="h-full border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all bg-background group cursor-pointer">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-3 leading-snug">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Before/After Gallery */}
      <section className="py-24 bg-background border-t border-border/30">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">Transformations</h2>
            <p className="text-lg text-muted-foreground">Real results from our Chicago clinic. Hover or drag to see the difference.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <BeforeAfterImage before="/before-whitening.png" after="/after-whitening.png" label="Teeth Whitening" />
              <h3 className="text-xl font-serif font-bold mt-6 mb-2 text-center">Professional Whitening</h3>
              <p className="text-muted-foreground text-center text-sm">Completed in one 60-minute session</p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.1 }}>
              <BeforeAfterImage before="/before-invisalign.png" after="/after-invisalign.png" label="Invisalign" />
              <h3 className="text-xl font-serif font-bold mt-6 mb-2 text-center">Invisalign</h3>
              <p className="text-muted-foreground text-center text-sm">9 month treatment plan</p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.2 }}>
              <BeforeAfterImage before="/before-implants.png" after="/after-implants.png" label="Dental Implants" />
              <h3 className="text-xl font-serif font-bold mt-6 mb-2 text-center">Dental Implants</h3>
              <p className="text-muted-foreground text-center text-sm">Single tooth replacement</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. Clinic Interior Gallery & 9. Hygiene */}
      <section className="py-24 bg-foreground text-background overflow-hidden relative">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                A space designed for your peace of mind.
              </h2>
              <p className="text-lg text-background/70 mb-8 leading-relaxed">
                We've thoughtfully designed our clinic to remove the clinical feel of traditional dentistry. Enjoy natural light, calming music, and state-of-the-art technology that makes your treatment faster and more comfortable.
              </p>
              
              <div className="bg-background/10 p-6 rounded-2xl border border-background/20 backdrop-blur-sm">
                <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <ShieldCheck className="text-primary w-6 h-6" /> Uncompromising Safety
                </h4>
                <ul className="space-y-3 text-background/80">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Strict CDC compliance & sterilization protocols</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Single-use instruments where applicable</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Hospital-grade disinfectants between every patient</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Advanced HEPA air filtration in all rooms</li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4 pt-12">
                <img src="/clinic-reception.png" alt="Clinic Reception" className="rounded-3xl w-full h-48 object-cover shadow-2xl" />
                <img src="/clinic-treatment.png" alt="Treatment Room" className="rounded-3xl w-full h-64 object-cover shadow-2xl" />
              </div>
              <div className="space-y-4">
                <img src="/clinic-waiting.png" alt="Waiting Area" className="rounded-3xl w-full h-64 object-cover shadow-2xl" />
                <img src="/clinic-doctor-patient.png" alt="Doctor Consultation" className="rounded-3xl w-full h-48 object-cover shadow-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section id="testimonials" className="py-24 bg-secondary/50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Patient Stories</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">Why Chicago Loves Us</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Michael Roberts",
                service: "General Checkup",
                text: "I hadn't been to the dentist in 5 years due to severe anxiety. Dr. Mitchell and her team were incredibly patient, non-judgmental, and made sure I was comfortable the entire time. Best dental experience I've ever had."
              },
              {
                name: "Sarah Lin",
                service: "Invisalign",
                text: "The office is beautiful and spotless. They got me in right on time, explained every step of my Invisalign treatment clearly, and the staff is incredibly warm. Highly recommend if you work downtown!"
              },
              {
                name: "David Thompson",
                service: "Emergency Care",
                text: "Needed emergency work done on a Thursday evening. They fitted me in, handled the issue professionally, and saved my trip. The transparent pricing and modern equipment really set them apart."
              },
              {
                name: "Emily Chen",
                service: "Teeth Whitening",
                text: "Got my teeth whitened before my wedding and the results were incredible! The chair had massage features and I literally watched Netflix during the procedure. Zero sensitivity afterwards."
              },
              {
                name: "James Wilson",
                service: "Dental Implants",
                text: "I was terrified of getting an implant, but Dr. Mitchell walked me through it and the procedure was completely painless. The new tooth looks exactly like my natural ones. Amazing work."
              },
              {
                name: "Jessica Martinez",
                service: "Root Canal",
                text: "I've never said this about a root canal before, but it was a breeze. They numbed everything perfectly, constantly checked on me, and I was out of pain the same day. Thank you Mitchell Dental!"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-background border-border/50 shadow-sm hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="flex gap-1 mb-4">
                      {[1,2,3,4,5].map(star => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">"{testimonial.text}"</p>
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold font-serif">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold font-serif text-sm">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.service}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-foreground">Common Questions</h2>
            <p className="text-lg text-muted-foreground">Everything you need to know about visiting Mitchell Dental Care.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "Does it hurt?", a: "No. We specialize in pain-free dentistry. We use strong topical anesthetics before any injection, and we don't start any procedure until you are completely numb and comfortable." },
              { q: "Do you accept my insurance?", a: "Yes, we accept most major PPO plans including Delta Dental, Cigna, MetLife, Aetna, BlueCross BlueShield, and United Healthcare. We'll handle all the paperwork and verify your benefits before your appointment." },
              { q: "What if I have severe dental anxiety?", a: "You are our ideal patient. Let us know when you book. We offer a calm environment, noise-canceling headphones, comfort items, and take everything at your pace. We promise to never judge the state of your teeth." },
              { q: "How much does it cost?", a: "We believe in 100% transparency. Before any treatment begins, we will provide a detailed breakdown of costs and what your insurance will cover. No surprise bills, ever." },
              { q: "Do you offer payment plans?", a: "Yes! We offer 0% financing options and accept CareCredit. We believe everyone deserves excellent dental care, and we'll work with you to find a payment plan that fits your budget." },
              { q: "What's your emergency process?", a: "If you have a dental emergency, call us immediately at (312) 555-0190. We reserve specific slots every day for emergencies and will do everything possible to see you the same day." },
              { q: "How long does a cleaning take?", a: "A standard checkup and cleaning usually takes about 45 to 60 minutes. If it's your first time with us, expect about 60-75 minutes so we can take comprehensive X-rays and Dr. Mitchell can do a full exam." },
              { q: "Do you see children?", a: "Yes, we love seeing kids! We offer pediatric dentistry for children ages 3 and up, making sure their first experiences with the dentist are fun and positive." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border py-2">
                <AccordionTrigger className="text-left font-serif text-lg font-medium hover:text-primary hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 11. Insurance & 12. Contact */}
      <section id="contact" className="py-24 bg-secondary/30 border-t border-border">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">Ready to book?</h2>
              <p className="text-lg text-muted-foreground mb-10">We're currently accepting new patients. Fill out the form, or give us a call to schedule your visit.</p>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-md shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Call Us</h4>
                    <a href="tel:+13125550190" className="text-muted-foreground text-lg hover:text-primary transition-colors">(312) 555-0190</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-md shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Location</h4>
                    <p className="text-muted-foreground">1200 N Michigan Ave, Suite 400<br/>Downtown Chicago, IL 60611</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-md shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Hours</h4>
                    <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 6:00 PM<br/>Saturday: 9:00 AM - 3:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="w-full h-64 rounded-2xl overflow-hidden shadow-md mb-12 border border-border">
                <iframe 
                  src="https://maps.google.com/maps?q=1200+N+Michigan+Ave+Chicago+IL&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mitchell Dental Care Location"
                ></iframe>
              </div>

              <div id="insurance" className="p-8 bg-background rounded-3xl border border-border shadow-sm">
                <h4 className="font-serif font-bold text-2xl mb-4 flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                  Insurance & Payment
                </h4>
                <p className="text-muted-foreground mb-6 leading-relaxed">We handle the paperwork for you. We accept most major PPO insurance plans including:</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Delta Dental", "Cigna", "MetLife", "Aetna", "BlueCross BlueShield", "United Healthcare"].map(ins => (
                    <span key={ins} className="px-3 py-1.5 bg-secondary text-secondary-foreground text-sm font-medium rounded-lg border border-border/50">{ins}</span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <strong className="text-foreground">No insurance? No problem.</strong> We offer 0% financing, accept CareCredit, and have flexible payment plans available for all patients.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:pt-0 pt-8"
            >
              <Card className="border-border shadow-2xl rounded-[2rem] overflow-hidden sticky top-24">
                <div className="bg-primary p-6 text-primary-foreground">
                  <h3 className="text-2xl font-serif font-bold">Request an Appointment</h3>
                  <p className="text-primary-foreground/80 text-sm mt-2">Fast, easy, and secure. We'll call you to confirm.</p>
                </div>
                <CardContent className="p-8 md:p-10 bg-background">
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
                        <Input id="firstName" placeholder="John" className="h-12 bg-secondary/30" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
                        <Input id="lastName" placeholder="Doe" className="h-12 bg-secondary/30" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                      <Input id="email" type="email" placeholder="john@example.com" className="h-12 bg-secondary/30" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
                      <Input id="phone" type="tel" placeholder="(312) 555-0000" className="h-12 bg-secondary/30" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Needed</Label>
                      <select id="service" className="flex h-12 w-full rounded-md border border-input bg-secondary/30 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors hover:border-primary/50">
                        <option>General Checkup & Cleaning</option>
                        <option>Teeth Whitening</option>
                        <option>Invisalign Consultation</option>
                        <option>Dental Implants</option>
                        <option>Tooth Pain / Emergency</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea id="message" placeholder="Any specific concerns or dental anxiety? Let us know." className="min-h-[120px] bg-secondary/30 resize-none" />
                    </div>
                    <Button type="submit" size="lg" className="w-full rounded-xl h-14 text-lg shadow-lg hover:shadow-xl transition-all">
                      Request Appointment
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Secure and confidential
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16 pb-32 md:pb-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Link href="/" className="inline-flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground font-serif font-bold text-2xl">M</span>
                </div>
                <span className="font-serif font-bold text-2xl tracking-tight">
                  Mitchell Dental Care
                </span>
              </Link>
              <p className="text-background/70 max-w-sm leading-relaxed">
                Providing exceptional, compassionate dental care for the Downtown Chicago community. Your comfort is our priority, and your smile is our passion.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-xl mb-6 text-primary">Quick Links</h4>
              <ul className="space-y-3 text-background/80">
                <li><a href="#services" className="hover:text-primary transition-colors">Treatments</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors">Meet Dr. Mitchell</a></li>
                <li><a href="#testimonials" className="hover:text-primary transition-colors">Patient Reviews</a></li>
                <li><a href="#insurance" className="hover:text-primary transition-colors">Insurance & Financing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold text-xl mb-6 text-primary">Contact</h4>
              <ul className="space-y-3 text-background/80">
                <li><a href="tel:+13125550190" className="hover:text-primary transition-colors flex items-center gap-2"><Phone className="w-4 h-4"/> (312) 555-0190</a></li>
                <li><a href="mailto:hello@mitchelldental.com" className="hover:text-primary transition-colors">hello@mitchelldental.com</a></li>
                <li className="pt-2">1200 N Michigan Ave, Suite 400<br/>Chicago, IL 60611</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-background/20 text-background/50 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Mitchell Dental Care. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex gap-3">
        <Button className="flex-1 rounded-full h-12 shadow-lg" asChild>
          <Link href="/book">Book Now</Link>
        </Button>
        <Button variant="outline" className="flex-1 rounded-full h-12 border-2 text-foreground" asChild>
          <a href="tel:+13125550190">
            <Phone className="w-4 h-4 mr-2" />
            Call Us
          </a>
        </Button>
      </div>
    </div>
  );
}