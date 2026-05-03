import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { PROJECTS } from "../constants";

export default function CreativeWorkPage() {
  return (
    <main className="site-shell min-h-screen pt-28 pb-16 space-y-10 lg:space-y-14">
      <div className="pb-8 border-b border-line/60 space-y-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-sans font-medium uppercase tracking-wider text-muted/80">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <Link to="/#work" className="hover:text-accent transition-colors">Work</Link>
          <span>/</span>
          <span className="text-ink">Creative Work</span>
        </nav>
        <div>
          <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted">Work Page</p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold uppercase tracking-tight">Creative Work</h1>
          <p className="text-sm font-sans italic text-ink/70 mt-3 max-w-xl">Selected film and visual storytelling pieces built for audience impact.</p>
        </div>
      </div>

      <motion.section 
        className="grid grid-cols-1 gap-10 lg:gap-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2, delayChildren: 0.1 }}
      >
        {PROJECTS.map((project) => (
          <motion.article 
            key={project.id} 
            className="border-b border-line/50 pb-8 lg:pb-12"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full object-cover aspect-video mb-6 lg:mb-8 bg-line/20 rounded-sm"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full aspect-video mb-6 lg:mb-8 bg-gradient-to-br from-[#0a0a0a] to-[#141414] rounded-sm flex items-center justify-center relative overflow-hidden border border-line/40">
                <span className="relative z-10 text-xs font-sans font-medium uppercase tracking-[0.4em] text-muted/70 text-center px-4">
                  {project.year.toLowerCase().includes("production") || project.year.toLowerCase().includes("development") ? "In Production" : "Project Archive"}
                </span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs font-sans font-bold uppercase tracking-widest text-muted mb-5">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-6xl font-serif font-bold uppercase tracking-[-0.03em] leading-tight lg:leading-[1.1] mb-4 break-words">{project.title}</h2>
            <p className="text-base font-serif italic text-ink/80 leading-relaxed mb-6 max-w-4xl">{project.description}</p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-sans font-bold uppercase tracking-widest text-accent border-b border-accent pb-1 hover:text-white transition-colors"
              >
                Open Project
              </a>
            )}
          </motion.article>
        ))}
      </motion.section>
    </main>
  );
}
