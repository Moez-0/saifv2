import { Link } from "react-router-dom";
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

      <section className="grid grid-cols-1 gap-12 lg:gap-16">
        {PROJECTS.map((project, index) => (
          <article key={project.id} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
            <img
              src={project.imageUrl}
              alt={project.title}
              className={`w-full h-full object-cover aspect-video ${index % 2 === 0 ? "lg:col-span-7" : "lg:col-span-5 lg:order-last"}`}
              referrerPolicy="no-referrer"
            />
            <div className={`p-6 lg:p-10 flex flex-col gap-5 ${index % 2 === 0 ? "lg:col-span-5" : "lg:col-span-7"}`}>
              <div className="flex items-center justify-between text-[10px] font-sans font-bold uppercase tracking-widest text-muted">
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif font-bold uppercase tracking-tight leading-[0.95] lg:leading-[0.92] break-words">{project.title}</h2>
              <p className="text-sm font-sans italic text-ink/80 leading-relaxed">{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-[10px] font-sans font-bold uppercase tracking-widest text-accent border-b border-accent pb-1 hover:opacity-70 transition-opacity"
                >
                  Open Project
                </a>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
