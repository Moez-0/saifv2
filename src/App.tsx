import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import CreativeWorkPage from "./pages/CreativeWorkPage";
import JournalismWorkPage from "./pages/JournalismWorkPage";
import WorkExperiencePage from "./pages/WorkExperiencePage";

const FONT_OPTIONS = [
  { key: "default", label: "Current", className: "font-theme-default" },
  { key: "nicholas", label: "Nicholas", className: "font-theme-nicholas" },
  { key: "sakire", label: "Sakire", className: "font-theme-sakire" },
] as const;

type FontOption = (typeof FONT_OPTIONS)[number];
type FontKey = FontOption["key"];

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

const SplashScreen = ({ visible }: { visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[120] bg-paper overflow-hidden flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 1.2, opacity: 0.2 }}
          animate={{ scale: 1, opacity: 0.5 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,56,39,0.18),transparent_42%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.08),transparent_48%)]"
        />

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 h-[3px] w-full bg-accent origin-left"
        />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 1.02 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center px-6"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ delay: 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-muted mb-3"
          >
            Portfolio
          </motion.p>

          <div className="overflow-hidden">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-serif font-bold uppercase tracking-[-0.04em] leading-[0.9] text-ink">
              {SPLASH_NAME.split("").map((char, index) => (
                <motion.span
                  key={`${char}-${index}`}
                  initial={{ y: "120%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-120%", opacity: 0 }}
                  transition={{
                    delay: 0.18 + index * 0.025,
                    duration: 0.52,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const WORK_LINKS = [
  {
    title: "Creative Work",
    description: "Films, branded videos, and visual storytelling projects.",
    href: "/creative-work",
  },
  {
    title: "Journalism Work",
    description: "Interviews, editorial work, and reported multimedia stories.",
    href: "/journalism-work",
  },
  {
    title: "Work Experience",
    description: "Professional roles, responsibilities, and impact across teams.",
    href: "/work-experience",
  },
];

const AWARDS = [
  "TED-Ed Student Talks contributor recognized for impactful storytelling",
  "Produced high-engagement interview series with global leaders",
  "Directed and delivered festival media campaigns across Africa",
  "Led multi-team content launches in education and brand marketing",
];

const LOGOS = [
  { src: "/logos/aspen_institue.jpg", alt: "Aspen Institute" },
  { src: "/logos/bezos_family_foundation.png", alt: "Bezos Family Foundation" },
  { src: "/logos/dino_marketing_group.jpg", alt: "Dino Marketing Group" },
  { src: "/logos/northwestern_uni.jpg", alt: "Northwestern University" },
  { src: "/logos/south_african_festival.png", alt: "South African Ideas Festival" },
  { src: "/logos/ted.jpg", alt: "TED" },
];

const LOGO_LOOP = [...LOGOS, ...LOGOS, ...LOGOS];

const Header = ({ activeFont, onSwitchFont }: { activeFont: FontKey; onSwitchFont: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeLabel = FONT_OPTIONS.find((font) => font.key === activeFont)?.label ?? "Current";

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="site-shell relative z-[60] flex justify-between items-center py-5 lg:py-8 2xl:py-10 mix-blend-difference text-white">
        <Link to="/" className="text-xs sm:text-sm font-sans font-bold tracking-[0.22em] sm:tracking-[0.3em] uppercase pr-4">
          Saifeddine Lahmar
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={onSwitchFont}
            className="px-3 py-1.5 border border-white/45 text-xs font-sans font-bold uppercase tracking-[0.18em] hover:border-accent hover:text-accent transition-colors"
            aria-label="Switch portfolio font"
          >
            {activeLabel}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-accent hover:opacity-80 transition-all duration-300 transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper rounded-full"
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
            { label: "Achievements", href: "#achievements" },
            { label: "Worked At", href: "#companies" },
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
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[14vw] sm:text-[13vw] lg:text-[12vw] 2xl:text-[11rem] font-serif font-bold leading-[0.82] sm:leading-[0.78] lg:leading-[0.74] tracking-[-0.03em] sm:tracking-[-0.04em] lg:tracking-[-0.05em] uppercase text-ink"
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

const HomePage = ({ activeFont, onSwitchFont }: { activeFont: FontKey; onSwitchFont: () => void }) => (
  <>
    <Header activeFont={activeFont} onSwitchFont={onSwitchFont} />
    <Hero />

    <main className="site-shell py-12 sm:py-14 lg:py-20 space-y-14 sm:space-y-18 lg:space-y-24">
      <section id="intro" className="pt-2">
        <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.18em] text-muted mb-8">Intro</p>
        <p className="max-w-5xl text-xl sm:text-2xl lg:text-[2.15rem] font-serif leading-[1.3] lg:leading-[1.25] text-ink/90">
          I am a multidisciplinary storyteller focused on building meaningful media across film, journalism, and digital campaigns. I blend sharp reporting instincts with cinematic direction to help brands and communities communicate with clarity, purpose, and cultural relevance. From producing interviews with global leaders to directing audience-focused visuals, I create stories that move people and deliver measurable impact. I thrive in collaborative teams, adapt quickly to new contexts, and bring strong execution from concept to final delivery. Guided by curiosity and responsibility, I keep shaping narratives that inform, inspire, and open space for dialogue across diverse audiences worldwide every single day.
        </p>
      </section>

      <section id="tedx-video" className="border-t border-line/60 pt-8 lg:pt-10">
        <div className="flex items-center justify-between mb-4">
          <span />
          <span className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.18em] text-accent">Featured</span>
        </div>
        <div className="overflow-hidden rounded-sm">
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/barOSeHnRwo"
              title="TEDx Video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section id="work" className="border-t border-line/60 pt-8 lg:pt-10">
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
                  <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted mb-3">0{index + 1}</p>
                  <h2 className="text-3xl sm:text-4xl lg:text-7xl font-serif font-bold uppercase tracking-[-0.03em] leading-[0.92] lg:leading-[0.9] mb-3 break-words">{item.title}</h2>
                  <p className="text-sm lg:text-base font-sans text-ink/70 leading-relaxed">{item.description}</p>
                </div>
                <ArrowUpRight size={20} className="text-accent mt-2 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="achievements" className="border-t border-line/60 pt-8 lg:pt-10">
        <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.18em] text-muted mb-8">Achievements & Awards</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          {AWARDS.map((award) => (
              <li key={award} className="text-base lg:text-lg font-serif text-ink/85 leading-relaxed break-words">
                {award}
              </li>
          ))}
        </ul>
      </section>

      <section id="companies" className="border-t border-line/60 pt-8 lg:pt-10">
        <p className="text-3xl lg:text-5xl font-serif font-bold uppercase tracking-[-0.03em] mb-8">Worked At</p>
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
                className="h-12 sm:h-14 lg:h-20 w-auto object-contain opacity-85 hover:opacity-100 transition-opacity"
              />
            ))}
          </motion.div>
        </div>
      </section>

      <section id="contact" className="border-t border-line/60 pt-8 lg:pt-10 pb-4">
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
      </section>
    </main>
    <Footer />
  </>
);

export default function App() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [activeFont, setActiveFont] = useState<FontKey>("default");

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
    setShowSplash(true);
    const timeoutId = window.setTimeout(() => {
      setShowSplash(false);
    }, 1600);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname]);

  const switchFont = () => {
    setActiveFont((current) => {
      const currentIndex = FONT_OPTIONS.findIndex((font) => font.key === current);
      const nextIndex = (currentIndex + 1) % FONT_OPTIONS.length;
      return FONT_OPTIONS[nextIndex].key;
    });
  };

  return (
    <div className={`min-h-screen bg-paper text-ink selection:bg-accent selection:text-white relative ${FONT_OPTIONS.find((font) => font.key === activeFont)?.className ?? "font-theme-default"}`}>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,56,39,0.08),transparent_36%),radial-gradient(circle_at_85%_90%,rgba(255,255,255,0.04),transparent_30%)]" />
      <SplashScreen visible={showSplash} />
      <div className="relative z-10">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage activeFont={activeFont} onSwitchFont={switchFont} />} />
          <Route path="/creative-work" element={<CreativeWorkPage />} />
          <Route path="/journalism-work" element={<JournalismWorkPage />} />
          <Route path="/work-experience" element={<WorkExperiencePage />} />
        </Routes>
      </div>
    </div>
  );
}
