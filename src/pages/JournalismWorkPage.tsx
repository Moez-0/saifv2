import { Link } from "react-router-dom";

const JOURNALISM_ITEMS = [
  {
    id: "j1",
    title: "Leadership Through Listening",
    outlet: "TED-Ed Student Talks",
    year: "2024",
    summary:
      "Interview and content collaboration highlighting youth leadership, communication skills, and educational storytelling.",
    href: "https://www.youtube.com/watch?v=barOSeHnRwo",
  },
  {
    id: "j2",
    title: "Action Forum Coverage",
    outlet: "The Aspen Institute",
    year: "2025",
    summary:
      "Produced interview-driven narratives and event communications focused on global issues and social impact themes.",
  },
  {
    id: "j3",
    title: "Campus Stories and Features",
    outlet: "Northwestern Projects",
    year: "2023-2024",
    summary:
      "Developed short-form reporting and digital stories blending student voices, culture, and multimedia production.",
  },
];

export default function JournalismWorkPage() {
  return (
    <main className="site-shell min-h-screen pt-28 pb-16 space-y-10 lg:space-y-14">
      <div className="pb-8 border-b border-line/60 space-y-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-sans font-medium uppercase tracking-wider text-muted/80">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <Link to="/#work" className="hover:text-accent transition-colors">Work</Link>
          <span>/</span>
          <span className="text-ink">Journalism Work</span>
        </nav>
        <div>
          <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted">Work Page</p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold uppercase tracking-tight">Journalism Work</h1>
          <p className="text-sm font-sans italic text-ink/70 mt-3 max-w-xl">Reporting, interviews, and multimedia storytelling with editorial depth.</p>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-10 lg:gap-12">
        {JOURNALISM_ITEMS.map((item, index) => (
          <article key={item.id} className="border-b border-line/50 pb-8 lg:pb-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[10px] font-sans font-bold uppercase tracking-widest text-muted mb-5">
              <span>{item.outlet}</span>
              <span>{item.year}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-6xl font-serif font-bold uppercase tracking-[-0.03em] leading-[0.95] lg:leading-[0.92] mb-4 break-words">{item.title}</h2>
            <p className="text-base font-serif italic text-ink/80 leading-relaxed mb-5 max-w-3xl">{item.summary}</p>
            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-sans font-bold uppercase tracking-widest text-accent border-b border-accent pb-1 hover:opacity-70 transition-opacity"
              >
                View Story
              </a>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
