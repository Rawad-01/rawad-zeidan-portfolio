import { getFilmsForDisplay } from "@/lib/film-availability";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Signature } from "@/components/Signature";
import { SystemDiagram } from "@/components/SystemDiagram";
import { FilmGallery } from "@/components/FilmGallery";
import { Arrow } from "@/components/Arrow";
import {
  profile,
  projects,
  experience,
  capabilities,
  certificates,
} from "@/data/content";
export default function Home() {
  return (
    <div id="top">
      <Header />
      <main id="main">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-eyebrow">
            <span className="eyebrow">
              <span className="status-dot" />
              Software Developer & Creative Technologist
            </span>
            <span className="eyebrow hero-location">
              Based in Lebanon / Open to connection
            </span>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <h1 id="hero-heading">
                I build the
                <br />
                <span>systems.</span>
                <br />I create the <em>stories.</em>
              </h1>
              <p>
                I’m Rawad. I work across software, backend development, and
                quality assurance, and explore new ways to tell stories with AI.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">
                  Explore my work <Arrow />
                </a>
                <a
                  className="text-link"
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub <Arrow diagonal />
                </a>
              </div>
            </div>
            <Signature />
          </div>
          <div className="hero-foot">
            <span className="eyebrow">Logic meets imagination.</span>
            <a href="#work" className="scroll-link">
              Scroll to explore <span aria-hidden="true">↓</span>
            </a>
            <span className="eyebrow hero-index">
              Selected portfolio / 2026
            </span>
          </div>
        </section>
        <section
          id="work"
          className="work-section light-section"
          aria-labelledby="work-title"
        >
          <div className="section-kicker">
            <span className="eyebrow">01 / Selected engineering</span>
            <span className="eyebrow">A closer look at the work</span>
          </div>
          <div className="section-heading">
            <h2 id="work-title">
              Built on <em>logic.</em>
              <br />
              Shaped by purpose.
            </h2>
            <p>
              Two selected projects, examined through their implementation: a
              connected business workflow and an exploratory data study.
            </p>
          </div>
          <article className="featured-project">
            <div className="project-copy">
              <span className="project-number">
                01<span>/ FULL-STACK APPLICATION</span>
              </span>
              <h3>{projects[0].title}</h3>
              <p>{projects[0].description}</p>
              <ul className="tag-list" aria-label="Technologies">
                {projects[0].stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="project-note">
                <span className="tiny-label">THE ENGINEERING DETAIL</span>
                <p>
                  Checkout connects the sale, its line items, and stock
                  movements in one database transaction.
                </p>
              </div>
              <a href="/work/point-of-sale/" className="text-link case-link">
                Explore the implementation <Arrow diagonal />
              </a>
            </div>
            <a
              href="/work/point-of-sale/"
              className="project-visual"
              aria-label="Read Point of Sale and Inventory case study"
            >
              <SystemDiagram />
            </a>
          </article>
          <article className="secondary-project">
            <a
              className="ml-visual"
              href="/work/student-performance/"
              aria-label="Read Student Performance Clustering case study"
            >
              <div className="diagram-top">
                <span>Pattern / Perspective</span>
                <span>02</span>
              </div>
              <img
                src="/images/ml-kmeans-pca.png"
                width="612"
                height="470"
                alt="Saved notebook scatter plot of student clusters projected into two principal components"
                loading="lazy"
              />
              <span className="visual-caption">
                Original notebook output · PCA projection
              </span>
            </a>
            <div className="project-copy">
              <span className="project-number">
                02<span>/ MACHINE LEARNING STUDY</span>
              </span>
              <h3>{projects[1].title}</h3>
              <p>{projects[1].description}</p>
              <ul className="tag-list" aria-label="Technologies">
                {projects[1].stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <a
                href="/work/student-performance/"
                className="text-link case-link"
              >
                Read the study <Arrow diagonal />
              </a>
            </div>
          </article>
          <p className="work-footnote">
            Selected from local project source and saved notebook outputs.
            Detailed case studies distinguish implemented behavior from
            verification still needed.
          </p>
        </section>
        <section id="lab" className="lab-section" aria-labelledby="lab-title">
          <div className="section-kicker">
            <span className="eyebrow">02 / Creative lab</span>
            <span className="eyebrow">Independent AI films</span>
          </div>
          <div className="section-heading">
            <h2 id="lab-title">
              A different kind
              <br />
              of <em>output.</em>
            </h2>
            <div>
              <p>
                Beyond the code, I explore AI as a creative medium. These films
                bring together my own concepts, AI-generated imagery, and
                editing.
              </p>
              <span className="lab-byline">
                Two films. One independent creative process.
              </span>
            </div>
          </div>
          <FilmGallery films={getFilmsForDisplay()} />
        </section>
        <section
          id="about"
          className="about-section light-section"
          aria-labelledby="about-title"
        >
          <div className="section-kicker">
            <span className="eyebrow">03 / Beyond the code</span>
            <span className="eyebrow">The person behind the practice</span>
          </div>
          <div className="about-grid">
            <h2 id="about-title">
              A technical mind.
              <br />A creative <em>eye.</em>
            </h2>
            <div className="about-copy">
              <p className="lead">
                I’m Rawad Zeidan, a computer science graduate based in Lebanon.
                My work connects software development, careful testing, and
                creative experimentation.
              </p>
              <p>
                Through internships, I’ve developed backend APIs, tested
                authentication and data flows, and built responsive web pages.
                I’m interested in how reliable systems are put together, and how
                people experience them.
              </p>
              <p>
                That curiosity also takes me into AI-generated media, where I
                develop original concepts and shape generated footage into
                finished edits.
              </p>
              <div className="about-facts">
                <div>
                  <span className="tiny-label">EDUCATION</span>
                  <span>
                    BSc in Computer Science
                    <br />
                    MUBS University, Lebanon
                  </span>
                </div>
                <div>
                  <span className="tiny-label">LANGUAGES</span>
                  <span>Arabic · English · French</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="experience"
          className="experience-section light-section"
          aria-labelledby="experience-title"
        >
          <div className="section-kicker">
            <span className="eyebrow">04 / Professional journey</span>
          </div>
          <div className="section-heading">
            <h2 id="experience-title">
              Experience,
              <br />
              <em>in practice.</em>
            </h2>
            <p>
              Hands-on work across backend development, API quality assurance,
              and frontend delivery.
            </p>
          </div>
          <div className="timeline">
            {experience.map((job, index) => (
              <article className="experience-row" key={job.company}>
                <div className="experience-meta">
                  <span className="tiny-label">
                    0{index + 1} / {job.mode}
                  </span>
                  <span>{job.date}</span>
                </div>
                <div>
                  <h3>{job.company}</h3>
                  <p className="job-role">{job.role}</p>
                </div>
                <div>
                  <ul className="job-points">
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <ul className="tag-list">
                    {job.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section
          className="capabilities-section"
          aria-labelledby="capabilities-title"
        >
          <div className="section-kicker">
            <span className="eyebrow">05 / Toolkit & foundations</span>
            <span className="eyebrow">
              Always learning. Carefully applying.
            </span>
          </div>
          <div className="section-heading">
            <h2 id="capabilities-title">
              The tools.
              <br />
              The <em>thinking.</em>
            </h2>
            <p>
              A foundation in development and testing, with room for exploration
              in data and creative technology.
            </p>
          </div>
          <div className="capability-grid">
            {capabilities.map((item, i) => (
              <article key={item.title}>
                <span className="tiny-label">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.items}</p>
                <p className="capability-note">{item.note}</p>
              </article>
            ))}
          </div>
          <div className="education-block">
            <div>
              <span className="eyebrow">Education</span>
              <h3>
                Bachelor’s Degree
                <br />
                in Computer Science
              </h3>
              <p>MUBS University, Lebanon</p>
              <span className="tiny-label">October 2023 — August 2026</span>
            </div>
            <div>
              <span className="eyebrow">Continued learning</span>
              <div className="certifications">
                {certificates.map((c) => (
                  <article key={c.title}>
                    <div>
                      <h4>{c.title}</h4>
                      <p>
                        {c.issuer} · {c.subtitle}
                      </p>
                    </div>
                    <span className="tiny-label">{c.date}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
