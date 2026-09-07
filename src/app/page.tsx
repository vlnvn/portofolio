import { SiteHeader } from "@/components/site-header";
import { featuredProjects } from "@/content/projects";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <section className="opening shell" id="top" aria-labelledby="intro-title">
          <div className="intro">
            <h1 id="intro-title">Valensius Alven</h1>
            <p>Informatics Engineering student at Universitas Padjadjaran.</p>
            <p>Software, AI systems and student-led project work.</p>
            <div className="intro-links">
              <a href="https://github.com/vlnvn">GitHub</a>
              <a href="https://linkedin.com/in/valensiusalven">LinkedIn</a>
            </div>
          </div>
          <nav className="project-index" aria-label="Featured project index">
            {featuredProjects.map((project) => (
              <a key={project.id} href={project.href}>
                <strong>{project.name}</strong>
                <span>{project.indexContext}</span>
              </a>
            ))}
          </nav>
        </section>

        <section className="work shell" id="work" aria-labelledby="work-title">
          <h2 id="work-title">Selected work</h2>

          <article className="project-row" id="kairos">
            <div className="project-identity">
              <h3>KAIROS</h3>
              <p>
                Dispatcher decision-support for reviewing pickup promises within
                limited human review capacity.
              </p>
            </div>
            <div className="project-evidence">
              <p className="role">Team Lead</p>
              <p className="context">COMPFEST 18 AI Innovation Challenge, 2026</p>
              <ul>
                <li>CatBoost ranking evaluated on public LaDe pickup data</li>
                <li>
                  Personal work on input validation, invariant tests and
                  reproducibility records
                </li>
                <li>Dispatcher retains operational decisions</li>
              </ul>
              <p className="boundary">Local competition MVP; built with a team.</p>
              <a className="source-link" href="https://github.com/vlnvn/kairos-ai">
                Inspect KAIROS source
              </a>
            </div>
          </article>

          <article className="project-row project-row-preview" id="ayam-kalintang">
            <div className="project-identity">
              <h3>Ayam Kalintang</h3>
              <p>
                Self-order kiosk and staff tools built for Ayam Kalintang, a
                local culinary business.
              </p>
            </div>
            <div className="project-evidence">
              <p className="role">Full-Stack Engineer · Deputy Team Lead</p>
              <p className="context">Bakti BCA · Jan–Jul 2026 · completed July 2026</p>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
