import { motion, useScroll, useTransform } from "motion/react";
import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import { PROJECTS, Project, EXPERIENCE, Experience } from "./constants";
import { ArrowDown, Menu, X, ExternalLink, ArrowUpRight, Download } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="site-shell relative z-[60] flex justify-between items-center py-6 lg:py-8 2xl:py-10 mix-blend-difference text-white">
        <div className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase">
          Saifeddine Lahmar
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-accent hover:opacity-80 transition-all duration-300 transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper rounded-full"
        >
          {isOpen ? <X size={32} strokeWidth={1.5} /> : <Menu size={32} strokeWidth={1.5} />}
        </button>
      </div>
      
      {/* Mobile Menu Overlay */}
      <motion.div 
        initial={false}
        animate={isOpen ? { clipPath: "circle(150% at 100% 0%)" } : { clipPath: "circle(0% at 100% 0%)" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 bg-paper text-ink flex flex-col justify-center items-center gap-6 lg:gap-10 z-50"
      >
        <div className="flex flex-col items-center gap-4 lg:gap-8">
          {["Work", "Resume", "About", "Contact"].map((item, index) => (
            <motion.a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={() => setIsOpen(false)}
              initial={{ y: 20, opacity: 0 }}
              animate={isOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              className="group relative text-5xl lg:text-8xl font-serif font-medium italic uppercase tracking-tighter"
            >
              <span className="relative z-10 group-hover:text-accent transition-colors duration-500">
                {item}
              </span>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-accent transition-all duration-500 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isOpen ? { opacity: 0.4 } : { opacity: 0 }}
          className="absolute bottom-10 text-[10px] font-sans font-bold uppercase tracking-widest"
        >
          © 2024 Saifeddine Lahmar
        </motion.div>
      </motion.div>
    </header>
  );
};

const Hero = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={targetRef} className="h-screen w-screen grid grid-cols-1 lg:grid-cols-12 lg:grid-border-b relative overflow-hidden">
      {/* Background Image with Overlay */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img 
          src="/hero-image.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-40 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent" />
      </motion.div>

      <div className="lg:col-span-8 p-6 lg:p-10 2xl:p-12 flex flex-col justify-end lg:grid-border-r pt-32 lg:pt-0 relative z-10">
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[18vw] sm:text-[16vw] lg:text-[12vw] 2xl:text-[11rem] font-serif font-bold leading-[0.74] tracking-[-0.05em] uppercase italic text-ink"
        >
          Saifeddine<br />Lahmar
        </motion.h1>
      </div>
      <div className="lg:col-span-4 p-6 lg:p-10 2xl:p-12 flex flex-col justify-end lg:border-t-0 border-line relative z-10 lg:bg-transparent">
      </div>

      <motion.div 
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-6 lg:right-10 2xl:right-12 z-20 text-accent"
      >
        <ArrowDown size={32} strokeWidth={1} />
      </motion.div>
    </section>
  );
};

const SectionHeader = ({ number, title, id }: { number: string, title: string, id?: string }) => (
    <div id={id} className="grid grid-cols-1 lg:grid-cols-12 grid-border-b">
    <div className="lg:col-span-2 p-6 lg:p-10 2xl:p-12 lg:grid-border-r text-[10px] font-sans font-bold uppercase tracking-[0.28em] text-muted">
      {number}
    </div>
    <div className="lg:col-span-10 p-6 lg:p-10 2xl:p-12">
      <h2 className="text-5xl lg:text-8xl 2xl:text-[7.5rem] font-serif font-bold uppercase tracking-[-0.05em] leading-none italic">
        {title}
      </h2>
    </div>
  </div>
);

const ProjectItem: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 grid-border-b group">
      <div className={`lg:col-span-7 p-0 overflow-hidden ${isEven ? "lg:grid-border-r" : "lg:order-last lg:grid-border-l"}`}>
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover aspect-video lg:aspect-auto lg:h-[80vh] transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="lg:col-span-5 p-6 lg:p-10 2xl:p-12 flex flex-col justify-between border-t lg:border-t-0 border-line bg-paper/40">
        <div>
          <div className="flex justify-between items-start mb-10 lg:mb-12">
            <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted">
              {project.category}
            </p>
            <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted">
              {project.year}
            </p>
          </div>
          <h3 className="text-4xl lg:text-7xl 2xl:text-[5.4rem] font-serif font-medium uppercase tracking-tighter mb-10 lg:mb-12 leading-[0.85] italic">
            {project.title}
          </h3>
          <div className="border-t border-line pt-8 mt-8">
            <p className="text-sm font-sans text-ink opacity-80 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
        <div className="mt-12 lg:mt-16">
          {project.link ? (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group/btn flex items-center gap-4 text-[10px] font-sans font-bold uppercase tracking-widest text-accent"
            >
              <span className="border-b border-accent pb-1 group-hover/btn:opacity-50 transition-opacity">View Project</span>
              <ExternalLink size={12} className="group-hover/btn:translate-x-1 transition-transform" />
            </a>
          ) : (
            <button className="group/btn flex items-center gap-4 text-[10px] font-sans font-bold uppercase tracking-widest text-accent">
              <span className="border-b border-accent pb-1 group-hover/btn:opacity-50 transition-opacity">View Project</span>
              <ArrowDown className="-rotate-90 group-hover/btn:translate-x-1 transition-transform" size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ExperienceItem: React.FC<{ exp: Experience }> = ({ exp }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 grid-border-b group hover:bg-ink/[0.01] transition-colors duration-300">
      <div className="lg:col-span-3 p-6 lg:p-10 2xl:p-12 lg:grid-border-r">
        <span className="text-[10px] font-sans font-bold uppercase tracking-widest opacity-40 block mb-2">{exp.period}</span>
        <h4 className="text-xl font-serif font-bold italic leading-tight">{exp.company}</h4>
        {exp.location && (
          <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-muted mt-1">{exp.location}</p>
        )}
      </div>
      <div className="lg:col-span-9 p-6 lg:p-10 2xl:p-12">
        <h5 className="text-xs font-sans font-bold uppercase tracking-widest mb-6 text-accent">{exp.role}</h5>
        <div className="max-w-3xl">
          <ul className="space-y-3">
            {exp.description.map((item, i) => (
              <li key={i} className="text-sm font-sans text-ink/70 leading-relaxed relative pl-4">
                <span className="absolute left-0 top-2.5 w-1.5 h-[1px] bg-line"></span>
                {item}
              </li>
            ))}
          </ul>
          {exp.skills && (
            <div className="mt-8 flex gap-3 items-center">
              <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-muted">Expertise</span>
              <p className="text-[10px] font-sans text-muted/60 italic">
                {exp.skills.join(' • ')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="grid grid-cols-1 lg:grid-cols-12 grid-border-b relative overflow-hidden">
      <div className="lg:col-span-2 p-6 lg:p-10 2xl:p-12 lg:grid-border-r text-[10px] font-sans font-bold uppercase tracking-widest text-muted">
        03
      </div>
      <div className="lg:col-span-10 p-6 lg:p-10 2xl:p-12 relative">
        {/* Background Label */}
        <div className="absolute top-10 right-10 hidden lg:block">
          <span className="text-[8px] font-sans font-bold uppercase tracking-widest text-muted/30 vertical-text">STORYTELLER</span>
        </div>
        
        <div className="max-w-4xl">
          <p className="text-2xl lg:text-5xl font-serif font-bold uppercase tracking-[-0.04em] leading-[1] italic mb-12">
            Multidisciplinary storyteller combining journalism, filmmaking, and digital media to craft narratives that drive cultural impact.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-line">
            <p className="text-sm font-sans text-ink opacity-80 leading-relaxed">
              Senior at Northwestern University, studying Journalism at Medill and Film & Television. Seeking opportunities in entertainment, marketing, and journalism.
            </p>
            <div className="flex items-center gap-6">
              <div className="w-12 h-[1px] bg-accent" />
              <p className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-accent">
                Northwestern '24
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LetsWork = () => {
  return (
    <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 grid-border-b bg-ink text-paper">
      <div className="lg:col-span-2 p-6 lg:p-10 2xl:p-12 lg:grid-border-r border-paper/10 text-[10px] font-sans font-bold uppercase tracking-widest text-paper/40">
        04
      </div>
      <div className="lg:col-span-10 p-6 lg:p-10 2xl:p-12">
        <div className="max-w-4xl">
          <h2 className="text-[12vw] lg:text-[10vw] font-serif font-bold uppercase leading-[0.8] tracking-[-0.06em] italic mb-16">
            Let's Work<br />Together
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <div className="space-y-8">
              <p className="text-xl lg:text-2xl font-serif italic text-paper/80 leading-relaxed">
                Currently open to freelance opportunities, creative collaborations, and full-time roles in media and entertainment.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#" 
                  className="group flex items-center gap-3 border border-paper/20 px-8 py-4 rounded-full font-sans font-bold uppercase text-xs tracking-widest hover:bg-paper hover:text-ink transition-all duration-300"
                >
                  <Download size={16} />
                  Download CV
                </a>
              </div>
            </div>
            
            <div className="flex flex-col justify-end space-y-6">
              <div className="space-y-4">
                <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-paper/40">Socials</p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/saifeddinelahmar/' },
                    { label: 'Instagram', href: 'https://www.instagram.com/saifeddine.lahmar/' }
                  ].map((platform) => (
                    <a 
                      key={platform.label}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-3 border-b border-paper/10 text-lg font-serif italic hover:text-accent transition-colors"
                    >
                      {platform.label}
                      <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <footer className="p-6 lg:p-10 2xl:p-12 border-t border-line">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-sans font-bold uppercase tracking-widest text-muted">
        <div className="flex gap-8">
          <span className="opacity-40">Based in Chicago / Evanston</span>
        </div>
        <div>
          © 2024 Saifeddine Lahmar
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-white relative">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,56,39,0.08),transparent_36%),radial-gradient(circle_at_85%_90%,rgba(255,255,255,0.04),transparent_30%)]" />
      <Header />
      <div className="relative z-10">
        <Hero />
      </div>
      <main className="site-shell lg:grid-border-l lg:grid-border-r relative z-10">
        
        <SectionHeader number="01" title="Selected Works" id="work" />
        <div>
          {PROJECTS.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>

        <SectionHeader number="02" title="Experience" id="resume" />
        <div>
          {EXPERIENCE.map((exp) => (
            <ExperienceItem key={exp.id} exp={exp} />
          ))}
        </div>
        
        <SectionHeader number="03" title="About" id="about" />
        <About />
        
        <LetsWork />
        <Contact />
      </main>
    </div>
  );
}
