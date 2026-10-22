import { profile } from "@/data/content";
import { Arrow } from "./Arrow";
export function Footer() {
  return (
    <footer id="contact" className="contact-section">
      <div className="section-kicker">
        <span className="eyebrow">06 / The next connection</span>
        <span className="status-dot" />
      </div>
      <div className="contact-main">
        <h2>
          Good things begin
          <br />
          with a <em>conversation.</em>
        </h2>
        <a
          className="contact-arrow"
          href={`mailto:${profile.email}`}
          aria-label="Email Rawad Zeidan"
        >
          <Arrow diagonal />
        </a>
      </div>
      <div className="contact-details">
        <p>
          Software development. Web & application projects.
          <br />
          Backend & APIs. Creative AI collaborations.
        </p>
        <a className="email-link" href={`mailto:${profile.email}`}>
          {profile.email}
          <Arrow diagonal />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Rawad Zeidan</span>
        <span>Built with intention. Based in Lebanon.</span>
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub <Arrow diagonal />
        </a>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
