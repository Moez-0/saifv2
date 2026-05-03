import { Link } from "react-router-dom";
import { motion } from "motion/react";

const DESIGN_ITEMS = [
  {
    id: "d1",
    title: "Graphic Design - Aspen Global Leadership Network",
    category: "Graphic Design",
    year: "2025",
    summary: "Visual design and graphics for the Aspen Global Leadership Network.",
    href: "https://www.instagram.com/p/DMYDp3MxPj2/?img_index=3&igsh=MWtvbnhuaWJ3MG4wNg==",
  },
  {
    id: "d2",
    title: "The AI Inclusion Imperative: What We Must Do Now",
    category: "Web Design",
    year: "2025",
    summary: "Web design for Aspen Institute article.",
    href: "https://www.aspeninstitute.org/blog-posts/the-ai-inclusion-imperative-what-we-must-do-now/",
  },
  {
    id: "d3",
    title: "Aspen Global Leadership Network",
    category: "Web Design",
    year: "2025",
    summary: "Web design and platform updates for the Aspen Global Leadership Network.",
    href: "https://www.aspeninstitute.org/programs/aspen-global-leadership-network/",
  },
];

export default function DesignWorkPage() {
  return (
    <main className="site-shell min-h-screen pt-28 pb-16 space-y-10 lg:space-y-14">
      <div className="pb-8 border-b border-line/60 space-y-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-sans font-medium uppercase tracking-wider text-muted/80">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <Link to="/#work" className="hover:text-accent transition-colors">Work</Link>
          <span>/</span>
          <span className="text-ink">Design Work</span>
        </nav>
        <div>
          <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted">Work Page</p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold uppercase tracking-tight">Design Work</h1>
          <p className="text-sm font-sans italic text-ink/70 mt-3 max-w-xl">Graphic and web design for brands and organizations.</p>
        </div>
      </div>

      <motion.section 
        className="grid grid-cols-1 gap-10 lg:gap-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2, delayChildren: 0.1 }}
      >
        {DESIGN_ITEMS.map((item) => (
          <motion.article 
            key={item.id} 
            className="border-b border-line/50 pb-8 lg:pb-12"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs font-sans font-bold uppercase tracking-widest text-muted mb-5">
              <span>{item.category}</span>
              <span>{item.year}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-6xl font-serif font-bold uppercase tracking-[-0.03em] leading-tight lg:leading-[1.1] mb-4 break-words">{item.title}</h2>
            <p className="text-base font-serif italic text-ink/80 leading-relaxed mb-6 max-w-3xl">{item.summary}</p>
            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-sans font-bold uppercase tracking-widest text-accent border-b border-accent pb-1 hover:text-white transition-colors"
              >
                View Work
              </a>
            )}
          </motion.article>
        ))}
      </motion.section>
    </main>
  );
}
