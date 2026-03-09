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
] as const;

type FontOption = (typeof FONT_OPTIONS)[number];
type FontKey = FontOption["key"];
const SPLASH_SESSION_KEY = "saif-portfolio-splash-seen";

const PRELUDE_DELAY_MS = 1000;
const CAMERA_UI_DELAY_MS = 1600;
const VIDEO_DELAY_MS = 2200;
const SPLASH_MEDIA = {
  video: "/media/intro-cinematic.mp4",
  boot: "/media/camera-boot.mp3",
  shutter: "/media/camera-shutter.mp3",
  ambient: "/media/ambient-doc.mp3",
} as const;

const NAME_REVEAL_MS = 3600;
const ENTER_REVEAL_MS = NAME_REVEAL_MS + 650;

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
  const [elapsed, setElapsed] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const bootAudioRef = useRef<HTMLAudioElement | null>(null);
  const shutterAudioRef = useRef<HTMLAudioElement | null>(null);
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);

  const showGrain = elapsed >= PRELUDE_DELAY_MS;
  const showCameraUi = elapsed >= CAMERA_UI_DELAY_MS;
  const showVideo = elapsed >= VIDEO_DELAY_MS;
  const showName = elapsed >= NAME_REVEAL_MS;
  const showEnter = elapsed >= ENTER_REVEAL_MS;

  const ensureAudioContext = () => {
    if (typeof window === "undefined") return null;
    if (audioContextRef.current) return audioContextRef.current;
    const context = new window.AudioContext();
    audioContextRef.current = context;
    return context;
  };

  const playBootFallback = () => {
    const context = ensureAudioContext();
    if (!context) return;
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(380, now + 0.34);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(680, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.06, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

    osc.connect(filter).connect(gain).connect(context.destination);
    osc.start(now);
    osc.stop(now + 0.45);
  };

  const playShutterFallback = () => {
    const context = ensureAudioContext();
    if (!context) return;
    const now = context.currentTime;

    const osc = context.createOscillator();
    const oscGain = context.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.18);
    oscGain.gain.setValueAtTime(0.0001, now);
    oscGain.gain.exponentialRampToValueAtTime(0.045, now + 0.01);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
    osc.connect(oscGain).connect(context.destination);
    osc.start(now);
    osc.stop(now + 0.2);

    const noiseBuffer = context.createBuffer(1, context.sampleRate * 0.16, context.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let index = 0; index < output.length; index += 1) {
      output[index] = (Math.random() * 2 - 1) * 0.28;
    }
    const noise = context.createBufferSource();
    const band = context.createBiquadFilter();
    const noiseGain = context.createGain();
    band.type = "bandpass";
    band.frequency.setValueAtTime(1200, now);
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.04, now + 0.008);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
    noise.buffer = noiseBuffer;
    noise.connect(band).connect(noiseGain).connect(context.destination);
    noise.start(now);
    noise.stop(now + 0.18);
  };

  const playRealSound = (audioRef: { current: HTMLAudioElement | null }, volume: number, loop = false) => {
    const audio = audioRef.current;
    if (!audio) return false;
    audio.loop = loop;
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play().catch(() => undefined);
    return true;
  };

  const playBootSound = () => {
    const playedReal = playRealSound(bootAudioRef, 0.28);
    if (!playedReal) {
      playBootFallback();
    }
  };

  const playShutterSound = () => {
    const playedReal = playRealSound(shutterAudioRef, 0.5);
    if (!playedReal) {
      playShutterFallback();
    }
  };

  const startAmbient = () => {
    const ambientAudio = ambientAudioRef.current;
    if (ambientAudio) {
      ambientAudio.loop = true;
      ambientAudio.volume = 0.045;
      ambientAudio.play().catch(() => undefined);
      return;
    }

    const context = ensureAudioContext();
    if (!context || ambientSourceRef.current) return;

    const length = context.sampleRate * 2;
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const channel = buffer.getChannelData(0);

    for (let index = 0; index < length; index += 1) {
      channel[index] = (Math.random() * 2 - 1) * 0.09;
    }

    const source = context.createBufferSource();
    const lowpass = context.createBiquadFilter();
    const gain = context.createGain();

    source.buffer = buffer;
    source.loop = true;
    lowpass.type = "lowpass";
    lowpass.frequency.value = 240;
    gain.gain.value = 0.008;

    source.connect(lowpass).connect(gain).connect(context.destination);
    source.start();

    ambientSourceRef.current = source;
    ambientGainRef.current = gain;
  };

  const stopAmbient = () => {
    if (ambientAudioRef.current) {
      ambientAudioRef.current.pause();
      ambientAudioRef.current.currentTime = 0;
    }
    ambientSourceRef.current?.stop();
    ambientSourceRef.current?.disconnect();
    ambientGainRef.current?.disconnect();
    ambientSourceRef.current = null;
    ambientGainRef.current = null;
  };

  const completeSplash = () => {
    if (isExiting) return;
    setIsExiting(true);
    playShutterSound();
    stopAmbient();
    window.setTimeout(() => {
      onComplete();
    }, 760);
  };

  useEffect(() => {
    if (!visible) return;
    const start = performance.now();

    const loop = window.setInterval(() => {
      setElapsed(Math.max(0, performance.now() - start));
    }, 33);

    return () => window.clearInterval(loop);
  }, [visible]);

  useEffect(() => {
    if (!visible || elapsed < PRELUDE_DELAY_MS || elapsed > PRELUDE_DELAY_MS + 80) return;
    ensureAudioContext()?.resume().catch(() => undefined);
    playBootSound();
  }, [visible, elapsed]);

  useEffect(() => {
    if (!visible || elapsed < VIDEO_DELAY_MS || elapsed > VIDEO_DELAY_MS + 80) return;
    startAmbient();
  }, [visible, elapsed]);

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        completeSplash();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible, isExiting]);

  useEffect(() => {
    return () => {
      stopAmbient();
      audioContextRef.current?.close().catch(() => undefined);
      audioContextRef.current = null;
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onClick={completeSplash}
          className="fixed inset-0 z-[120] overflow-hidden bg-black text-ink"
          role="button"
          tabIndex={0}
          aria-label="Skip intro"
        >
          <audio ref={bootAudioRef} preload="auto" src={SPLASH_MEDIA.boot} />
          <audio ref={shutterAudioRef} preload="auto" src={SPLASH_MEDIA.shutter} />
          <audio ref={ambientAudioRef} preload="metadata" src={SPLASH_MEDIA.ambient} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showVideo && !videoError ? 1 : 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {!videoError ? (
              <motion.video
                className="h-full w-full object-cover"
                autoPlay
                muted
                playsInline
                loop
                preload="none"
                poster="/hero-image.jpg"
                onError={() => setVideoError(true)}
                initial={{ scale: 1.06 }}
                animate={{ scale: 1.14 }}
                transition={{ duration: 14, ease: "linear" }}
              >
                <source src={SPLASH_MEDIA.video} type="video/mp4" />
              </motion.video>
            ) : (
              <img src="/hero-image.jpg" alt="Cinematic fallback" className="h-full w-full object-cover opacity-55" />
            )}
          </motion.div>

          <div className="cinematic-vignette pointer-events-none absolute inset-0" />
          <div className="cinematic-soft-light pointer-events-none absolute inset-0" />
          {showGrain && <div className="cinematic-grain pointer-events-none absolute inset-0 opacity-50" />}

          {showCameraUi && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="pointer-events-none absolute inset-0"
            >
              <div className="absolute inset-6 border border-white/10 md:inset-10" />
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />
              <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-white/10" />
              <motion.div
                initial={{ scale: 0.8, opacity: 0.25 }}
                animate={{ scale: [0.8, 1.03, 0.95, 1], opacity: [0.3, 0.7, 0.45, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25"
              />
              <div className="absolute left-5 top-5 flex items-center gap-3 text-[11px] font-sans uppercase tracking-[0.28em] text-white/75 sm:left-8 sm:top-7">
                <span className="flex items-center gap-2 text-accent">
                  <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgba(255,56,39,0.95)]" /> REC
                </span>
                <span>00:00:01</span>
              </div>
            </motion.div>
          )}

          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={showName ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="text-4xl font-serif font-bold uppercase tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                  {SPLASH_NAME}
                </h1>
              </motion.div>

              <motion.button
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={showEnter ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onClick={(event) => {
                  event.stopPropagation();
                  completeSplash();
                }}
                className="mt-10 border-b border-white/75 pb-1 text-sm font-sans uppercase tracking-[0.22em] text-white hover:text-accent hover:border-accent transition-colors"
              >
                Enter Portfolio →
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {showName && !isExiting && elapsed < NAME_REVEAL_MS + 1100 && (
              <motion.div
                initial={{ scale: 0, opacity: 0.85 }}
                animate={{ scale: 2.2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85, ease: [0.55, 0, 0.15, 1] }}
                className="pointer-events-none absolute inset-0 m-auto h-[130vmax] w-[130vmax] rounded-full border border-white/20"
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isExiting && (
              <motion.div
                initial={{ clipPath: "circle(120% at 50% 50%)", opacity: 0 }}
                animate={{ clipPath: "circle(0% at 50% 50%)", opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.72, ease: [0.7, 0, 0.3, 1] }}
                className="pointer-events-none absolute inset-0 bg-black"
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="site-shell relative z-[60] flex justify-between items-center py-5 lg:py-8 2xl:py-10 mix-blend-difference text-white">
        <Link to="/" className="text-xs sm:text-sm font-sans font-bold tracking-[0.22em] sm:tracking-[0.3em] uppercase pr-4">
          Saifeddine Lahmar
        </Link>
        <div className="flex items-center gap-3">
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

const HomePage = () => (
  <>
    <Header />
    <Hero />

    <main className="site-shell py-12 sm:py-14 lg:py-20 space-y-14 sm:space-y-18 lg:space-y-24">
      <section id="intro" className="pt-2">
        <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.18em] text-muted mb-8">Intro</p>
        <p className="max-w-5xl text-xl sm:text-2xl lg:text-[2.15rem] font-serif italic leading-[1.3] lg:leading-[1.25] text-ink/90">
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
                  <p className="text-sm lg:text-base font-sans italic text-ink/70 leading-relaxed">{item.description}</p>
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
              <li key={award} className="text-base lg:text-lg font-serif italic text-ink/85 leading-relaxed break-words">
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
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,56,39,0.08),transparent_36%),radial-gradient(circle_at_85%_90%,rgba(255,255,255,0.04),transparent_30%)]" />
      <SplashScreen visible={showSplash} onComplete={handleSplashComplete} />
      <div className="relative z-10">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/creative-work" element={<CreativeWorkPage />} />
          <Route path="/journalism-work" element={<JournalismWorkPage />} />
          <Route path="/work-experience" element={<WorkExperiencePage />} />
        </Routes>
      </div>
    </div>
  );
}
