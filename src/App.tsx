import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import CreativeWorkPage from "./pages/CreativeWorkPage";
import JournalismWorkPage from "./pages/JournalismWorkPage";
import DesignWorkPage from "./pages/DesignWorkPage";

const FONT_OPTIONS = [
  { key: "default", label: "Current", className: "font-theme-default" },
] as const;

type FontOption = (typeof FONT_OPTIONS)[number];
type FontKey = FontOption["key"];
const SPLASH_SESSION_KEY = "saif-portfolio-splash-seen";

// Splash screen settings
const NAME_REVEAL_MS = 3600;
const ENTER_REVEAL_MS = NAME_REVEAL_MS + 650;

const SectionFade = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <motion.section
    id={id}
    className={className}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.section>
);

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetScroll();
    const frameId = requestAnimationFrame(resetScroll);
    return () => cancelAnimationFrame(frameId);
  }, [location.key]);

  return null;
};

const SPLASH_NAME = "Saifeddine Lahmar";

const SplashScreen = ({ visible, onComplete }: { visible: boolean; onComplete: () => void }) => {
  useEffect(() => {
    if (!visible) return;
    
    const timer = window.setTimeout(() => {
      onComplete();
    }, NAME_REVEAL_MS);
    
    return () => window.clearTimeout(timer);
  }, [visible, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black text-white"
        >
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold uppercase tracking-[0.15em]"
          >
            {SPLASH_NAME}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const WORK_LINKS = [
  {
    title: "Film & TV Projects",
    description: "Fiction, documentary, and talk show productions.",
    href: "/creative-work",
  },
  {
    title: "Journalism Projects",
    description: "Interviews, editorial work, and reported multimedia stories.",
    href: "/journalism-work",
  },
  {
    title: "Design Work",
    description: "Graphic and web design for brands and organizations.",
    href: "/design-work",
  },
];

const EDUCATION = [
  "Northwestern University — Bachelor’s Degree",
  "Medill School of Journalism, Media, Integrated Marketing Communications",
  "School of Communication — Film & Television",
  "Buffett Institute Scholarship Recipient",
  "Bezos Family Foundation — Bezos Scholar",
];

const LOGOS = [
  { src: "/logos/aspen_institue.jpg", alt: "Aspen Institute" },
  { src: "/logos/bezos_family_foundation.png", alt: "Bezos Family Foundation" },
  { src: "/logos/dino_marketing_group.jpg", alt: "Dino Marketing Group" },
  { src: "/logos/northwestern_uni.jpg", alt: "Northwestern University" },
  { src: "/logos/ted.jpg", alt: "TED Conferences" },
];

const LOGO_LOOP = [...LOGOS, ...LOGOS, ...LOGOS];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="site-shell relative z-[60] flex justify-end items-center py-5 lg:py-8 2xl:py-10 mix-blend-difference text-ink">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-ink hover:text-accent transition-colors duration-300 transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={32} strokeWidth={1.5} /> : <Menu size={32} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={isOpen ? { clipPath: "circle(150% at 100% 0%)" } : { clipPath: "circle(0% at 100% 0%)" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 bg-paper text-ink flex flex-col justify-center items-center gap-6 lg:gap-10 z-50"
      >
        <div className="flex flex-col items-center gap-4 lg:gap-8">
          {[
            { label: "Intro", href: "#intro" },
            { label: "Work", href: "#work" },
            { label: "Education", href: "#education" },
            { label: "Brands & Orgs", href: "#companies" },
            { label: "Contact", href: "#contact" },
          ].map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="group relative text-3xl sm:text-4xl lg:text-7xl font-serif font-medium uppercase tracking-tighter"
            >
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={isOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
                className="relative z-10 group-hover:text-accent transition-colors duration-500"
              >
                {item.label}
              </motion.span>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-accent transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </div>
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
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img src="/hero-image.jpg" alt="Hero Background" className="w-full h-full object-cover opacity-40 scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent" />
      </motion.div>

      <div className="lg:col-span-8 p-6 lg:p-10 2xl:p-12 flex flex-col justify-end lg:grid-border-r pt-28 sm:pt-32 lg:pt-0 relative z-10">
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-[14vw] sm:text-[13vw] lg:text-[12vw] 2xl:text-[11rem] font-serif font-bold leading-[0.82] sm:leading-[0.78] lg:leading-[0.74] tracking-[-0.03em] sm:tracking-[-0.04em] lg:tracking-[-0.05em] uppercase text-ink mix-blend-difference"
        >
          Saifeddine<br />Lahmar
        </motion.h1>
      </div>

      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 sm:bottom-10 right-5 sm:right-6 lg:right-10 2xl:right-12 z-20 text-accent"
      >
        <ArrowDown size={28} strokeWidth={1} className="sm:w-8 sm:h-8" />
      </motion.div>
    </section>
  );
};

const Footer = () => (
  <footer className="site-shell p-6 lg:p-10 2xl:p-12 border-t border-line">
    <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-xs sm:text-sm font-sans font-bold uppercase tracking-widest text-muted">
      <div className="flex gap-8">
        <span className="opacity-80">Based in Chicago / Evanston</span>
      </div>
      <div>© 2026 Saifeddine Lahmar</div>
    </div>
  </footer>
);

// Video player is now inline

const HomePage = () => (
  <>
    <Header />
    <Hero />

    <main className="site-shell py-12 sm:py-14 lg:py-20 space-y-16 sm:space-y-24 lg:space-y-32">
      <SectionFade id="intro" className="pt-2">
        <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.18em] text-muted mb-8">Intro</p>
        <p className="max-w-5xl text-xl sm:text-2xl lg:text-[2.15rem] font-serif italic leading-[1.3] lg:leading-[1.25] text-ink/90">
          I am a multidisciplinary storyteller, writer-director, journalist, and marketing professional driven by a belief in the power of stories on and off the screen.
          <br /><br />
          Growing up across different parts of the world shaped the way I see, listen, and create. It made me sensitive to cultural nuance, aware of how messages land across different audiences, and committed to building work that can move between local specificity and global resonance.
          <br /><br />
          My experience spans filmmaking, journalism, digital marketing, social media, CRM, events, influencer strategy, and brand storytelling across agencies, businesses, nonprofits, educational institutions, and cultural organizations. I believe today’s media landscape requires a holistic understanding of both traditional and emerging platforms, combining creative instinct, strategic thinking, and analytical insight.
        </p>
      </SectionFade>

      <SectionFade id="tedx-video" className="border-t border-line/60 pt-10 lg:pt-14">
        <div className="flex items-center justify-between mb-4">
          <span />
          <span className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.18em] text-accent">Featured</span>
        </div>
        <div className="overflow-hidden rounded-sm max-w-4xl mx-auto mt-6 lg:mt-10">
          <div className="aspect-video w-full bg-line/20 rounded-sm overflow-hidden border border-line/40">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/barOSeHnRwo?rel=0&modestbranding=1"
              title="TEDx Video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </SectionFade>

      <SectionFade id="work" className="border-t border-line/60 pt-10 lg:pt-14">
        <div className="flex items-center justify-between gap-3 mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.18em] text-muted">Work</p>
          <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.18em] text-muted/70">Choose a page</p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:gap-10">
          {WORK_LINKS.map((item, index) => (
            <Link
              key={item.title}
              to={item.href}
              className="group block border-b border-line/50 pb-8 lg:pb-10 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="max-w-3xl">
                  <p className="text-xs font-sans font-bold uppercase tracking-widest text-muted mb-3">0{index + 1}</p>
                  <h2 className="text-3xl sm:text-4xl lg:text-7xl font-serif font-bold uppercase tracking-[-0.03em] leading-tight lg:leading-[1.1] mb-3 break-words">{item.title}</h2>
                  <p className="text-sm lg:text-base font-sans italic text-ink/70 leading-relaxed">{item.description}</p>
                </div>
                <ArrowUpRight size={20} className="text-accent mt-2 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </SectionFade>

      <SectionFade id="education" className="border-t border-line/60 pt-10 lg:pt-14">
        <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.18em] text-muted mb-8">Education & Recognition</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          {EDUCATION.map((edu) => (
              <li key={edu} className="text-base lg:text-lg font-serif italic text-ink/85 leading-relaxed break-words">
                {edu}
              </li>
          ))}
        </ul>
      </SectionFade>

      <SectionFade id="companies" className="border-t border-line/60 pt-10 lg:pt-14">
        <p className="text-3xl lg:text-5xl font-serif font-bold uppercase tracking-[-0.03em] mb-8">Brands & Organizations I’ve worked with</p>
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{ duration: 22, repeat: Infinity, repeatType: "loop", ease: "linear" }}
            className="flex items-center gap-8 sm:gap-12 lg:gap-20 w-max"
          >
            {LOGO_LOOP.map((logo, index) => (
              <img
                key={`${logo.src}-${index}`}
                src={logo.src}
                alt={logo.alt}
                className="h-12 sm:h-14 lg:h-20 w-auto object-contain opacity-60 grayscale brightness-[200%] contrast-[120%] hover:opacity-100 hover:grayscale-0 hover:brightness-100 hover:contrast-100 transition-all duration-500"
              />
            ))}
          </motion.div>
        </div>
      </SectionFade>

      <SectionFade id="contact" className="border-t border-line/60 pt-10 lg:pt-14 pb-12 lg:pb-20">
        <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.18em] text-muted mb-8">Contact</p>
        <h2 className="text-[14vw] sm:text-[12vw] lg:text-[8vw] font-serif font-bold uppercase leading-[0.9] lg:leading-[0.85] tracking-[-0.05em] mb-8 sm:mb-10">
            Let&apos;s Connect
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-sans text-ink/80">
          <a href="mailto:slahmar@u.northwestern.edu" className="text-xl sm:text-2xl lg:text-3xl font-serif hover:text-accent transition-colors break-all">
              slahmar@u.northwestern.edu
          </a>
          <div className="flex flex-col gap-3 items-start md:items-end">
            <a href="https://www.linkedin.com/in/saifeddinelahmar/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                LinkedIn
            </a>
            <a href="https://www.instagram.com/saifeddine.lahmar/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                Instagram
            </a>
          </div>
        </div>
      </SectionFade>
    </main>
    <Footer />
  </>
);

export default function App() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [location.key]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const splashSeen = window.sessionStorage.getItem(SPLASH_SESSION_KEY);
    setShowSplash(!splashSeen);
  }, []);

  const handleSplashComplete = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(SPLASH_SESSION_KEY, "true");
    }
    setShowSplash(false);
  };

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-white relative font-theme-default">
      <SplashScreen visible={showSplash} onComplete={handleSplashComplete} />
      <div className="relative z-10">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/creative-work" element={<CreativeWorkPage />} />
          <Route path="/journalism-work" element={<JournalismWorkPage />} />
          <Route path="/design-work" element={<DesignWorkPage />} />
        </Routes>
      </div>
    </div>
  );
}
