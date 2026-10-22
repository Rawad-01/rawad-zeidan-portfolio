import { repositories } from "@/data/repositories";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Arrow } from "@/components/Arrow";
import { SystemDiagram } from "@/components/SystemDiagram";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return {
    title: p?.title,
    description: p?.description,
    ...(process.env.NEXT_PUBLIC_SITE_URL
      ? {
          alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/work/${slug}/`,
          },
          openGraph: {
            title: p?.title,
            description: p?.description,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/work/${slug}/`,
            type: "article",
            images: [
              {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/social-card.png`,
                width: 1200,
                height: 630,
                alt: "Rawad Zeidan - Systems x Stories",
              },
            ],
          },
        }
      : {}),
  };
}
export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const repository = repositories[slug];
  const other = projects.find((project) => project.slug !== slug);
  return (
    <div id="top">
      <Header />
      <main id="main" className="case-study">
        <div className="case-hero">
          <a className="back-link" href="/#work">
            ← All selected work
          </a>
          <div className="section-kicker">
            <span className="eyebrow">
              {p.number} / {p.category}
            </span>
            <span className="eyebrow">{p.scope}</span>
          </div>
          <h1>{p.title}</h1>
          <p className="case-deck">{p.shortTitle}</p>
          {repository?.status === "published" && (
            <a
              className="text-link"
              href={repository.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View source on GitHub <Arrow diagonal />
            </a>
          )}

          <ul className="tag-list">
            {p.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="case-content light-section">
          <div className="case-intro">
            <span className="eyebrow">Context / Approach</span>
            <div>
              <h2>
                The problem behind
                <br />
                the <em>project.</em>
              </h2>
              <p className="lead">{p.problem}</p>
              <p>{p.approach}</p>
            </div>
          </div>
          {p.slug === "point-of-sale" ? (
            <SystemDiagram />
          ) : (
            <figure className="case-figure">
              <img
                src="/images/ml-kmeans-pca.png"
                alt="Original saved K-Means cluster plot projected into PCA space"
                width="612"
                height="470"
              />
              <figcaption>
                Genuine saved notebook output. Two principal components compress
                the original feature space; visual distance is not proof of
                reliable segmentation.
              </figcaption>
            </figure>
          )}
          <div className="case-intro">
            <span className="eyebrow">Implementation</span>
            <div>
              <h2>
                What the code <em>does.</em>
              </h2>
              <ul className="feature-list">
                {p.features.map((f) => (
                  <li key={f}>
                    <span aria-hidden="true">↗</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="decision-section">
            <span className="eyebrow">Technical decisions</span>
            {p.decisions.map((d, i) => (
              <article key={d.title}>
                <span className="project-number">0{i + 1}</span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </article>
            ))}
          </div>
          <div className="case-intro">
            <span className="eyebrow">Result / Reflection</span>
            <div>
              <h2>
                A clear result.
                <br />
                An honest <em>boundary.</em>
              </h2>
              <p className="lead">{p.result}</p>
              <aside className="verification-note">
                <h3>Verification & next steps</h3>
                <p>{p.limitations}</p>
              </aside>
              <details className="evidence">
                <summary>Implementation evidence</summary>
                <ul>
                  {p.evidence.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </details>
            </div>
          </div>
          {other && (
            <a className="next-project" href={`/work/${other.slug}/`}>
              <span className="eyebrow">Next selected project</span>
              <span>
                {other.title}
                <Arrow diagonal />
              </span>
            </a>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
