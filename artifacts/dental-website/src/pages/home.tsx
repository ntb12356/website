import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
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
  ArrowRight
} from "lucide-react";
import React from "react";

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

export default function Home() {
  const { toast } = useToast();

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Received",
      description: "We will contact you shortly to confirm your appointment time.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
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
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Now accepting new patients in Downtown Chicago</span>
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight mb-6">
                Modern dentistry with a <span className="text-primary italic">gentle touch.</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Experience a calm, reassuring approach to dental care. At Mitchell Dental Care, we believe your visit should feel like a wellness retreat, not a clinical chore.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full text-base h-14 px-8" asChild>
                  <a href="#contact">
                    Book Your Visit
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full text-base h-14 px-8" asChild>
                  <a href="#services">Our Services</a>
                </Button>
              </motion.div>
              <motion.div variants={fadeInUp} className="mt-10 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-bold text-primary">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="font-medium text-foreground">4.9/5</span>
                  <span>from over 500 happy patients</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
                <img 
                  src="/hero.png" 
                  alt="Bright modern dental clinic reception" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg mb-1">Top-Rated Care</h3>
                    <p className="text-sm text-muted-foreground">Voted Chicago's best emerging dental practice 2023.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl max-w-md mx-auto">
                <img 
                  src="/doctor.png" 
                  alt="Dr. Sarah Mitchell" 
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-serif font-bold mb-6 text-foreground">
                Meet Dr. Sarah Mitchell
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-6 leading-relaxed">
                "I started Mitchell Dental Care with a simple philosophy: going to the dentist shouldn't cause anxiety. We've built a practice focused on comfort, transparency, and truly listening to our patients."
              </motion.p>
              <motion.div variants={fadeInUp} className="space-y-4 mb-8">
                {[
                  "Over 10 years of clinical excellence",
                  "Graduate of Northwestern University School of Dentistry",
                  "Specialized in anxiety-free and cosmetic dentistry",
                  "Committed to ongoing education and modern techniques"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-medium text-foreground">{text}</span>
                  </div>
                ))}
              </motion.div>
              <motion.div variants={fadeInUp}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Signature_of_John_Hancock.svg" alt="Signature" className="h-12 opacity-40" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-secondary/30">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-foreground">Comprehensive Care</h2>
            <p className="text-lg text-muted-foreground">From routine cleanings to complete smile makeovers, we provide all the care you need under one roof using the latest technology.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "General Dentistry", desc: "Exams, cleanings, and preventative care to keep your smile healthy.", icon: Smile },
              { title: "Cosmetic & Whitening", desc: "Professional teeth whitening and veneers for a radiant smile.", icon: Sparkles },
              { title: "Dental Implants", desc: "Permanent, natural-looking solutions for missing teeth.", icon: ShieldCheck },
              { title: "Invisalign", desc: "Clear, comfortable aligners to straighten your teeth discreetly.", icon: HeartHandshake },
              { title: "Pediatric Dentistry", desc: "Gentle, fun, and educational care for our youngest patients.", icon: Smile },
              { title: "Emergency Care", desc: "Same-day appointments available for urgent dental needs.", icon: Phone },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } }
                }}
              >
                <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow bg-background">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery / Environment Section */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-foreground">
                A space designed for your comfort
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We've thoughtfully designed our clinic to remove the clinical feel of traditional dentistry. Enjoy natural light, calming music, and state-of-the-art technology that makes your treatment faster and more comfortable.
              </p>
              <Button variant="outline" size="lg" className="rounded-full">Take a Virtual Tour</Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src="/clinic-room.png" 
                  alt="Modern dental clinic treatment room" 
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Patient Stories</h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">Don't just take our word for it. Here's what our patients have to say about their experience at Mitchell Dental Care.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Michael R.",
                text: "I hadn't been to the dentist in 5 years due to anxiety. Dr. Mitchell and her team were incredibly patient, non-judgmental, and made sure I was comfortable the entire time. Best dental experience I've ever had.",
              },
              {
                name: "Sarah L.",
                text: "The office is beautiful and spotless. They got me in right on time, explained every step of my Invisalign treatment clearly, and the staff is incredibly warm. Highly recommend!",
              },
              {
                name: "David T.",
                text: "Needed emergency work done on a Saturday. They fitted me in, handled the issue professionally, and saved my weekend. The transparent pricing and modern equipment really set them apart.",
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-primary-foreground/10 border-none text-primary-foreground h-full">
                  <CardContent className="p-8">
                    <div className="flex gap-1 mb-6">
                      {[1,2,3,4,5].map(star => (
                        <Star key={star} className="w-5 h-5 fill-current text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-lg leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                    <p className="font-bold font-serif">— {testimonial.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance & Booking */}
      <section id="contact" className="py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-foreground">Ready for a better dental experience?</h2>
              <p className="text-lg text-muted-foreground mb-10">We're currently accepting new patients. Fill out the form, or give us a call to schedule your visit.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Call Us</h4>
                    <p className="text-muted-foreground text-lg">(312) 555-0190</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Location</h4>
                    <p className="text-muted-foreground">1200 N Michigan Ave, Suite 400<br/>Downtown Chicago, IL 60611</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Hours</h4>
                    <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 6:00 PM<br/>Saturday: 9:00 AM - 3:00 PM</p>
                  </div>
                </div>
              </div>

              <div id="insurance" className="mt-12 p-6 bg-secondary/50 rounded-2xl">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  Insurance Accepted
                </h4>
                <p className="text-muted-foreground">We accept most major PPO insurance plans including Delta Dental, Cigna, MetLife, and Aetna. We also offer flexible financing options for patients without insurance.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-border shadow-xl">
                <CardContent className="p-8 md:p-10">
                  <h3 className="text-2xl font-serif font-bold mb-6">Request an Appointment</h3>
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="(312) 555-0000" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Needed</Label>
                      <select id="service" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
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
                      <Textarea id="message" placeholder="Any specific concerns?" className="min-h-[100px]" />
                    </div>
                    <Button type="submit" size="lg" className="w-full rounded-full h-14 text-lg">
                      Request Appointment
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      By submitting this form, you agree to our privacy policy.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto max-w-7xl px-4 text-center md:text-left">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-serif font-bold text-xl">M</span>
                </div>
                <span className="font-serif font-semibold text-xl tracking-tight">
                  Mitchell Dental Care
                </span>
              </Link>
              <p className="text-background/70 max-w-sm mx-auto md:mx-0">
                Providing exceptional, compassionate dental care for the Downtown Chicago community. Your comfort is our priority.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors">Our Team</a></li>
                <li><a href="#testimonials" className="hover:text-primary transition-colors">Patient Stories</a></li>
                <li><a href="#insurance" className="hover:text-primary transition-colors">Insurance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-background/70">
                <li>(312) 555-0190</li>
                <li>hello@mitchelldental.com</li>
                <li>1200 N Michigan Ave, Suite 400</li>
                <li>Chicago, IL 60611</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-background/20 text-background/50 text-sm flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Mitchell Dental Care. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
