import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smile, Sparkles, ShieldCheck, HeartHandshake, Phone, Baby, ArrowRight, CheckCircle2 } from "lucide-react";

const SERVICES = [
  {
    id: "General Dentistry",
    title: "General Dentistry",
    icon: Smile,
    description: "Comprehensive care for lasting oral health.",
    who: "Recommended for everyone every 6 months to maintain optimal oral health and catch potential issues early.",
    expect: [
      "Thorough examination with digital x-rays",
      "Professional cleaning to remove plaque and tartar",
      "Oral cancer screening",
      "Customized treatment planning if needed"
    ]
  },
  {
    id: "Teeth Whitening",
    title: "Teeth Whitening",
    icon: Sparkles,
    description: "Professional solutions for a brighter, more confident smile.",
    who: "Perfect for patients looking to lift stains caused by coffee, tea, wine, or natural aging before a big event or just for a confidence boost.",
    expect: [
      "In-office laser whitening for immediate results (up to 8 shades lighter)",
      "Custom take-home trays for gradual, controlled whitening",
      "Desensitizing treatments to minimize discomfort",
      "Shade matching to track your progress"
    ]
  },
  {
    id: "Dental Implants",
    title: "Dental Implants",
    icon: ShieldCheck,
    description: "Permanent, natural-looking replacements for missing teeth.",
    who: "Patients missing one or more teeth who want a permanent, secure solution that functions exactly like natural teeth.",
    expect: [
      "Comprehensive 3D scanning and bone density assessment",
      "Surgical placement of the titanium implant post",
      "Healing period (osseointegration)",
      "Placement of a custom-crafted, natural-looking crown"
    ]
  },
  {
    id: "Invisalign",
    title: "Invisalign",
    icon: HeartHandshake,
    description: "Clear, removable aligners to straighten teeth discreetly.",
    who: "Teens and adults looking to correct crowded teeth, gaps, overbites, or underbites without traditional metal braces.",
    expect: [
      "Digital 3D scan of your teeth (no messy impressions)",
      "Custom treatment plan showing your projected results",
      "New sets of clear aligners every 1-2 weeks",
      "Brief check-ins every 6-8 weeks to monitor progress"
    ]
  },
  {
    id: "Pediatric Dentistry",
    title: "Pediatric Dentistry",
    icon: Baby,
    description: "Gentle, educational care for our youngest patients.",
    who: "Children from their first tooth (or first birthday) through adolescence.",
    expect: [
      "Child-friendly, anxiety-free environment",
      "Gentle cleanings and examinations",
      "Preventative care including sealants and fluoride",
      "Education on proper brushing and nutrition in a fun way"
    ]
  },
  {
    id: "Emergency Care",
    title: "Emergency Dental Care",
    icon: Phone,
    description: "Prompt relief when you need it most.",
    who: "Anyone experiencing severe tooth pain, a knocked-out tooth, a broken crown, or swelling.",
    expect: [
      "Same-day appointments prioritized for true emergencies",
      "Immediate pain relief and stabilization",
      "Clear explanation of the problem and treatment options",
      "Follow-up care scheduling if necessary"
    ]
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-foreground">
                Expert Care for <br/><span className="text-primary italic">Every Smile.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                From routine preventative care to advanced restorative treatments, we offer comprehensive dental services in a comfortable, modern environment.
              </p>
              <Button size="lg" className="rounded-full px-8" asChild>
                <Link href="/book">Book an Appointment</Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/services-hero.png" 
                  alt="Modern dental clinic interior" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Detail List */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-24">
            {SERVICES.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="scroll-mt-32"
                id={`service-${index}`}
              >
                <Card className="overflow-hidden border-border shadow-md">
                  <div className="grid md:grid-cols-5">
                    <div className="md:col-span-2 bg-primary/5 p-8 flex flex-col justify-center border-r border-border">
                      <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mb-6">
                        <service.icon className="w-8 h-8" />
                      </div>
                      <h2 className="text-3xl font-serif font-bold mb-4">{service.title}</h2>
                      <p className="text-muted-foreground text-lg mb-8">{service.description}</p>
                      
                      <Button asChild className="rounded-full w-fit group">
                        <Link href={`/book?service=${encodeURIComponent(service.id)}`}>
                          Book This Service 
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="md:col-span-3 p-8 md:p-10 space-y-8">
                      <div>
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center text-sm">1</span>
                          Who it's for
                        </h3>
                        <p className="text-muted-foreground leading-relaxed pl-10">{service.who}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center text-sm">2</span>
                          What to expect
                        </h3>
                        <ul className="space-y-3 pl-10">
                          {service.expect.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground text-center px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-serif font-bold mb-6">Not sure what you need?</h2>
          <p className="text-xl mb-10 text-primary-foreground/80">
            Schedule a general consultation and we'll help you build a personalized treatment plan tailored to your goals.
          </p>
          <Button size="lg" variant="secondary" className="rounded-full px-10 text-lg" asChild>
            <Link href="/book">Schedule Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
