import { Link } from "react-router-dom";
import { EXPERIENCE } from "../constants";

export default function WorkExperiencePage() {
  return (
    <main className="site-shell min-h-screen pt-28 pb-16 space-y-10 lg:space-y-14">
      <div className="pb-8 border-b border-line/60 space-y-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-sans font-medium uppercase tracking-wider text-muted/80">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <Link to="/#work" className="hover:text-accent transition-colors">Work</Link>
          <span>/</span>
          <span className="text-ink">Work Experience</span>
        </nav>
        <div>
          <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted">Work Page</p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold uppercase tracking-tight">Work Experience</h1>
          <p className="text-sm font-sans italic text-ink/70 mt-3 max-w-xl">Career journey across media, marketing, and storytelling operations.</p>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-9 lg:gap-11">
        {EXPERIENCE.map((exp) => (
          <article key={exp.id} className="border-b border-line/50 pb-8 lg:pb-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 mb-4">
              <h2 className="text-2xl sm:text-3xl lg:text-6xl font-serif font-bold uppercase tracking-[-0.03em] leading-[0.95] lg:leading-[0.92] break-words">{exp.company}</h2>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted">{exp.period}</span>
            </div>
            <p className="text-xs font-sans font-bold uppercase tracking-widest text-accent mb-5">{exp.role}</p>
            <ul className="space-y-2.5 text-base font-serif text-ink/82 leading-relaxed max-w-4xl">
              {exp.description.map((item, index) => (
                <li key={`${exp.id}-${index}`}>• {item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
