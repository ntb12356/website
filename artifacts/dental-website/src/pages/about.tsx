import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, HeartHandshake, Smile, Sparkles } from "lucide-react";

export default function About() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24">
        {/* Bio Section */}
        <section className="px-4 mb-24">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Meet Your Doctor</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                  Dr. Sarah Mitchell, <span className="text-primary text-3xl md:text-5xl block mt-2">DDS</span>
                </h1>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    With over 12 years of clinical experience, Dr. Mitchell has built her practice on a singular belief: dentistry should be gentle, transparent, and completely free of anxiety.
                  </p>
                  <p>
                    She earned her Doctor of Dental Surgery (DDS) from the prestigious Northwestern University School of Dentistry, where she developed a passion for minimally invasive techniques and cosmetic restorative work.
                  </p>
                  <p>
                    "I understand that the dental chair can be an intimidating place for many," says Dr. Mitchell. "My goal is to change that narrative completely. We take the time to listen, to explain every procedure, and to ensure you are comfortable from the moment you walk through our doors."
                  </p>
                </div>
                <div className="mt-10 flex gap-4">
                  <Button asChild size="lg" className="rounded-full">
                    <Link href="/book">Book with Dr. Mitchell</Link>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
                  <img 
                    src="/dr-mitchell-portrait.png" 
                    alt="Dr. Sarah Mitchell Portrait" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -inset-4 bg-secondary/50 rounded-[2.5rem] -z-0 transform rotate-3"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-24 bg-primary text-primary-foreground px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Our Philosophy</h2>
              <p className="text-lg text-primary-foreground/80">We're shifting the paradigm of dental care. Here is what you can expect at every visit.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Radical Transparency", text: "No surprise bills or pushy upsells. We explain your options, the costs, and the clinical reasoning behind every recommendation.", icon: ShieldCheck },
                { title: "Gentle Approach", text: "From our waiting room atmosphere to our clinical techniques, everything is designed to minimize anxiety and maximize comfort.", icon: HeartHandshake },
                { title: "Modern Techniques", text: "We invest heavily in the latest dental technology to make procedures faster, safer, and less invasive.", icon: Sparkles }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <Card className="bg-primary-foreground/10 border-none text-primary-foreground h-full">
                    <CardContent className="p-8">
                      <item.icon className="w-10 h-10 mb-6 opacity-80" />
                      <h3 className="text-xl font-bold font-serif mb-4">{item.title}</h3>
                      <p className="opacity-90 leading-relaxed">{item.text}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-16">Meet the Team</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="border-border shadow-sm overflow-hidden flex flex-col h-full">
                  <div className="h-64 bg-secondary flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center text-4xl font-serif text-primary">E</div>
                  </div>
                  <CardContent className="p-8 flex-1">
                    <h3 className="text-2xl font-serif font-bold mb-1">Elena Rodriguez</h3>
                    <p className="text-primary font-medium mb-4">Lead Dental Hygienist</p>
                    <p className="text-muted-foreground">
                      Elena brings over 8 years of experience to our hygiene team. Known for her incredibly gentle touch, she makes even the most thorough cleanings feel like a breeze. When she's not educating patients on oral health, she's exploring Chicago's culinary scene.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-border shadow-sm overflow-hidden flex flex-col h-full">
                  <div className="h-64 bg-secondary flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center text-4xl font-serif text-primary">J</div>
                  </div>
                  <CardContent className="p-8 flex-1">
                    <h3 className="text-2xl font-serif font-bold mb-1">James Chen</h3>
                    <p className="text-primary font-medium mb-4">Front Desk Coordinator</p>
                    <p className="text-muted-foreground">
                      James is the first friendly face you'll see when you walk in. A master of navigating complex insurance policies, he ensures your administrative experience is just as seamless and stress-free as your clinical care.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-secondary/30 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-serif font-bold text-center mb-16">Our Journey</h2>
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary shrink-0" />
                  <div className="w-0.5 h-full bg-primary/20 mt-4" />
                </div>
                <div className="pb-12">
                  <span className="text-primary font-bold text-lg">2012</span>
                  <h4 className="text-xl font-serif font-bold mt-1 mb-2">Practice Founded</h4>
                  <p className="text-muted-foreground">Dr. Mitchell opens her first small clinic in Lincoln Park with a vision for anxiety-free dentistry.</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary shrink-0" />
                  <div className="w-0.5 h-full bg-primary/20 mt-4" />
                </div>
                <div className="pb-12">
                  <span className="text-primary font-bold text-lg">2018</span>
                  <h4 className="text-xl font-serif font-bold mt-1 mb-2">Expansion to Downtown</h4>
                  <p className="text-muted-foreground">To serve more patients, the practice moves to a state-of-the-art facility on Michigan Avenue.</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary shrink-0" />
                </div>
                <div>
                  <span className="text-primary font-bold text-lg">Today</span>
                  <h4 className="text-xl font-serif font-bold mt-1 mb-2">A Trusted Community Partner</h4>
                  <p className="text-muted-foreground">Now serving over 2,000 active patients, Mitchell Dental Care remains committed to its founding principles of gentle, transparent care.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
