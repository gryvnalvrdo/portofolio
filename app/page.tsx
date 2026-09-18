"use client";

import { useEffect, useRef, useState } from "react";
import "./globals.css";
import { dict } from "../lib/dictionary";

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<"en" | "id">("en");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const t = dict[lang];

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_lang");
    if (saved === "id" || saved === "en") setLang(saved);
    else if (navigator.language.startsWith("id")) setLang("id");
  }, []);

  const toggleLang = () => {
    const next = lang === "en" ? "id" : "en";
    setLang(next);
    localStorage.setItem("portfolio_lang", next);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    // re-observe on language change because dom might update
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observerRef.current?.observe(el));
    
    return () => observerRef.current?.disconnect();
  }, [lang]);

  return (
    <>
      {/* ========== NAVBAR ========== */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container navbar-inner">
          <a href="#hero" className="nav-logo">GAG.</a>
          <ul className="nav-links">
            <li><a href="#about">{t.nav.about}</a></li>
            <li><a href="#ecosystem">{t.nav.suite}</a></li>
            <li><a href="#projects">{t.nav.projects}</a></li>
            <li><a href="#skills">{t.nav.skills}</a></li>
            <li><a href="#experience">{t.nav.experience}</a></li>
            <li><a href="#contact" className="nav-cta">{t.nav.hire}</a></li>
            <li>
              <button 
                onClick={toggleLang}
                className="ml-2 px-2 py-1 text-xs font-semibold rounded-md border border-[var(--border)] hover:border-[var(--primary)] text-[var(--muted)] hover:text-[var(--text)] transition-colors bg-white/5"
              >
                {lang === "en" ? "ID" : "EN"}
              </button>
            </li>
          </ul>
          
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={toggleLang}
              className="px-2 py-1 text-xs font-semibold rounded-md border border-[var(--border)] text-[var(--muted)] bg-white/5"
            >
              {lang === "en" ? "ID" : "EN"}
            </button>
            <button className="nav-hamburger" aria-label="Menu">
              <span/><span/><span/>
            </button>
          </div>
        </div>
      </nav>

      {/* ========== HERO ========== */}
      <section id="hero" className="hero">
        <div className="container">
          <div className="hero-grid">
            {/* Left content */}
            <div>
              <div className="hero-badge">
                <div className="dot"></div>
                {t.hero.badge}
              </div>

              <h1>
                {t.hero.hi}{" "}
                <span className="gradient-text">Gryven</span>
                <br />
                {t.hero.role}
              </h1>

              <p className="hero-sub">{t.hero.sub}</p>
              <p className="hero-tagline">{t.hero.tagline}</p>

              <div className="hero-actions">
                <a href="#projects" className="btn-primary">
                  {t.hero.viewProjects}
                </a>
                <a
                  href="https://www.linkedin.com/in/gryven-alverdo-7283ab262/"
                  target="_blank"
                  rel="noopener"
                  className="btn-outline"
                >
                  LinkedIn ↗
                </a>
              </div>

              <div className="hero-socials">
                <a
                  href="https://github.com/gryvnalvrdo"
                  target="_blank"
                  rel="noopener"
                  className="social-link"
                  title="GitHub"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/gryven-alverdo-7283ab262/"
                  target="_blank"
                  rel="noopener"
                  className="social-link"
                  title="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="mailto:gryvenalvrdo@gmail.com"
                  className="social-link"
                  title="Email"
                >
                  ✉️
                </a>
              </div>

              <div className="hero-stats">
                <div className="hero-stat">
                  <span className="hero-stat-val">3.88</span>
                  <span className="hero-stat-label">GPA / 4.00</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-val">3+</span>
                  <span className="hero-stat-label">{t.hero.stats.projects}</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-val">2</span>
                  <span className="hero-stat-label">{t.hero.stats.years}</span>
                </div>
              </div>
            </div>

            {/* Right: Photo */}
            <div className="hero-photo-wrap">
              <div className="hero-photo-ring"></div>
              <div className="hero-photo-ring-inner"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photo.jpg"
                alt="Gryven Alverdo Gunawan"
                className="hero-photo"
              />
              <div className="hero-photo-badge">
                {t.hero.location}
              </div>
            </div>
          </div>

          <div className="tech-badges">
            {["Next.js", "TypeScript", "Python", "PyTorch", "Laravel", "PostgreSQL", "Prisma", "n8n"].map(
              (t) => (
                <span key={t} className="tech-badge">
                  {t}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-text reveal">
              <p className="section-label">{t.about.label}</p>
              <h2 className="section-title">
                {t.about.title1}
                <span className="gradient-text">{t.about.title2}</span>
              </h2>
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>

              <div className="highlight-box">
                <h4>{t.about.highlightTitle}</h4>
                <p>{t.about.highlightText}</p>
              </div>
            </div>

            <div className="about-side reveal reveal-delay-2">
              {[
                { icon: "🎓", ...t.about.side[0] },
                { icon: "💼", ...t.about.side[1] },
                { icon: "📍", ...t.about.side[2] },
                { icon: "🌐", ...t.about.side[3] },
              ].map((item) => (
                <div className="info-card" key={item.title}>
                  <div className="info-icon">{item.icon}</div>
                  <div className="info-content">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== ECOSYSTEM ========== */}
      <section id="ecosystem" className="ecosystem-section">
        <div className="container">
          <div className="ecosystem-intro reveal">
            <p className="section-label">{t.ecosystem.label}</p>
            <h2 className="section-title">
              {t.ecosystem.title1}
              <span className="gradient-text">{t.ecosystem.title2}</span>
            </h2>
            <p>{t.ecosystem.desc}</p>
          </div>

          {/* Flow Diagram */}
          <div className="eco-flow reveal">
            <div className="eco-node">
              <span className="eco-node-num">1</span>
              <span className="eco-node-icon">🤖</span>
              <h3>{t.ecosystem.nodes[0].title}</h3>
              <p>{t.ecosystem.nodes[0].desc}</p>
              <span className="eco-node-tag">n8n · RSS · Webhooks</span>
            </div>

            <div className="eco-connector">
              <div className="eco-arrow-line"></div>
              <span className="eco-connector-label" dangerouslySetInnerHTML={{__html: t.ecosystem.connectors[0].replace('via', '<br/>via')}}></span>
            </div>

            <div className="eco-node">
              <span className="eco-node-num">2</span>
              <span className="eco-node-icon">📋</span>
              <h3>{t.ecosystem.nodes[1].title}</h3>
              <p>{t.ecosystem.nodes[1].desc}</p>
              <span className="eco-node-tag">Next.js · Prisma · PostgreSQL</span>
            </div>

            <div className="eco-connector">
              <div className="eco-arrow-line"></div>
              <span className="eco-connector-label" dangerouslySetInnerHTML={{__html: t.ecosystem.connectors[1].replace('via', '<br/>via')}}></span>
            </div>

            <div className="eco-node">
              <span className="eco-node-num">3</span>
              <span className="eco-node-icon">✨</span>
              <h3>{t.ecosystem.nodes[2].title}</h3>
              <p>{t.ecosystem.nodes[2].desc}</p>
              <span className="eco-node-tag">Gemini API · JavaScript</span>
            </div>

            <div className="eco-connector">
              <div className="eco-arrow-line"></div>
              <span className="eco-connector-label" dangerouslySetInnerHTML={{__html: t.ecosystem.connectors[2].replace('the', '<br/>the')}}></span>
            </div>

            <div className="eco-node">
              <span className="eco-node-num">🎯</span>
              <span className="eco-node-icon">🏆</span>
              <h3>{t.ecosystem.nodes[3].title}</h3>
              <p>{t.ecosystem.nodes[3].desc}</p>
              <span className="eco-node-tag">Mission Complete</span>
            </div>
          </div>

          {/* Connection Proofs */}
          <div className="reveal">
            <p className="section-label" style={{marginTop: "2rem"}}>{t.ecosystem.proofsTitle}</p>
            <div className="connection-proofs">
              {[
                { icon: "🔗", tag: 'POST /api/applications', ...t.ecosystem.proofs[0] },
                { icon: "🔗", tag: '?job=...&company=...', ...t.ecosystem.proofs[1] },
                { icon: "📊", tag: 'Response Rate Analytics', ...t.ecosystem.proofs[2] },
              ].map((p) => (
                <div className="proof-card" key={p.title}>
                  <div className="proof-icon">{p.icon}</div>
                  <div className="proof-content">
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                    <span className="proof-tag">{p.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROJECTS ========== */}
      <section id="projects">
        <div className="container">
          <div className="reveal">
            <p className="section-label">{t.projects.label}</p>
            <h2 className="section-title">
              {t.projects.title1}
              <span className="gradient-text">{t.projects.title2}</span>
            </h2>
            <p style={{ color: "var(--muted)", maxWidth: 600, marginTop: "0.5rem", marginBottom: "0.5rem" }}>
              {t.projects.desc}
            </p>
          </div>

          <div className="projects-grid">
            {/* Project 1 — JobTrail */}
            <div className="project-card reveal">
              <div className="project-img-placeholder">📋</div>
              <div className="project-body">
                <p className="project-num">{t.projects.jobtrail.num}</p>
                <h3 className="project-title">{t.projects.jobtrail.title}</h3>
                <p className="project-sub">{t.projects.jobtrail.sub}</p>
                <p className="project-desc">{t.projects.jobtrail.desc}</p>
                <div className="project-tags">
                  {["Next.js 15", "TypeScript", "Prisma 7", "PostgreSQL", "NextAuth.js", "Recharts", "Zod"].map(
                    (tg) => <span className="tag" key={tg}>{tg}</span>
                  )}
                </div>
                <div className="project-actions">
                  <a href="https://jobtracker-kjmw.vercel.app" target="_blank" rel="noopener" className="project-btn project-btn-primary">
                    {t.projects.jobtrail.btn1}
                  </a>
                  <a href="https://github.com/gryvnalvrdo/job_tracker" target="_blank" rel="noopener" className="project-btn project-btn-secondary">
                    GitHub →
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2 — CoverCraft */}
            <div className="project-card reveal reveal-delay-1">
              <div className="project-img-placeholder">✨</div>
              <div className="project-body">
                <p className="project-num">{t.projects.covercraft.num}</p>
                <h3 className="project-title">{t.projects.covercraft.title}</h3>
                <p className="project-sub">{t.projects.covercraft.sub}</p>
                <p className="project-desc">{t.projects.covercraft.desc}</p>
                <div className="project-tags">
                  {["Gemini API", "JavaScript", "HTML/CSS", "REST API", "Privacy-first"].map(
                    (tg) => <span className="tag" key={tg}>{tg}</span>
                  )}
                </div>
                <div className="project-actions">
                  <a href="/covercraft" className="project-btn project-btn-primary">
                    {t.projects.covercraft.btn1}
                  </a>
                  <a href="https://github.com/gryvnalvrdo/covercraft" target="_blank" rel="noopener" className="project-btn project-btn-secondary">
                    GitHub →
                  </a>
                </div>
              </div>
            </div>

            {/* Project 3 — AutoApply Flow */}
            <div className="project-card reveal reveal-delay-2">
              <div className="project-img-placeholder">🤖</div>
              <div className="project-body">
                <p className="project-num">{t.projects.autoapply.num}</p>
                <h3 className="project-title">{t.projects.autoapply.title}</h3>
                <p className="project-sub">{t.projects.autoapply.sub}</p>
                <p className="project-desc">{t.projects.autoapply.desc}</p>
                <div className="project-tags">
                  {["n8n", "Webhooks", "RSS Feed", "REST API", "Automation", "Telegram Bot"].map(
                    (tg) => <span className="tag" key={tg}>{tg}</span>
                  )}
                </div>
                <div className="project-actions">
                  <a href="/autoapply" className="project-btn project-btn-primary">
                    {t.projects.autoapply.btn1}
                  </a>
                  <a href="https://github.com/gryvnalvrdo/autoapply-flow" target="_blank" rel="noopener" className="project-btn project-btn-secondary">
                    GitHub →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SKILLS ========== */}
      <section id="skills">
        <div className="container">
          <div className="reveal">
            <p className="section-label">{t.skills.label}</p>
            <h2 className="section-title">
              {t.skills.title1} <span className="gradient-text">{t.skills.title2}</span>
            </h2>
          </div>

          <div className="skills-grid">
            {[
              { icon: "⚡", title: "Languages", skills: ["Python", "TypeScript", "JavaScript", "PHP", "HTML/CSS"] },
              { icon: "🌐", title: "Web Frameworks", skills: ["Next.js 15", "Laravel 11", "Flask", "React", "Blade"] },
              { icon: "🗄️", title: "Databases & ORM", skills: ["PostgreSQL", "MySQL", "SQLite", "Prisma 7", "Eloquent ORM"] },
              { icon: "🧠", title: "ML & Data", skills: ["PyTorch", "NumPy", "Pandas", "Librosa", "FAISS", "CNN+BiLSTM"] },
              { icon: "🔧", title: "Tools & DevOps", skills: ["Git", "GitHub Actions", "Vercel", "n8n", "Vite", "REST API"] },
              { icon: "🔐", title: "Auth & APIs", skills: ["NextAuth.js v5", "JWT", "Zod", "React Hook Form", "Gemini API"] },
            ].map((cat) => (
              <div className="skill-category reveal" key={cat.title}>
                <div className="skill-cat-header">
                  <div className="skill-cat-icon">{cat.icon}</div>
                  <span className="skill-cat-title">{cat.title}</span>
                </div>
                <div className="skill-list">
                  {cat.skills.map((s) => (
                    <span className="skill-item" key={s}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== EXPERIENCE ========== */}
      <section id="experience">
        <div className="container">
          <div className="reveal">
            <p className="section-label">{t.experience.label}</p>
            <h2 className="section-title">
              {t.experience.title1} <span className="gradient-text">{t.experience.title2}</span>
            </h2>
          </div>

          <div className="timeline">
            {t.experience.items.map((item, idx) => (
              <div className="timeline-item reveal" key={idx}>
                <div className="timeline-dot">{["💼", "🧪", "🎓"][idx]}</div>
                <div className="timeline-content">
                  <p className="timeline-date">{item.date}</p>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-org">{item.org}</p>
                  <ul className="timeline-desc">
                    {item.desc.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-inner reveal">
            <p className="section-label" style={{ justifyContent: "center" }}>{t.contact.label}</p>
            <h2 className="section-title">
              {t.contact.title1} <span className="gradient-text">{t.contact.title2}</span>
            </h2>
            <div className="availability-chip">
              <div className="dot"></div>
              {t.contact.chip}
            </div>
            <p>{t.contact.desc}</p>

            <div className="contact-links">
              <a href="mailto:gryvenalvrdo@gmail.com" className="contact-link">✉️ gryvenalvrdo@gmail.com</a>
              <a href="https://www.linkedin.com/in/gryven-alverdo-7283ab262/" target="_blank" rel="noopener" className="contact-link">💼 LinkedIn</a>
              <a href="https://github.com/gryvnalvrdo" target="_blank" rel="noopener" className="contact-link">🐙 GitHub</a>
            </div>

            <a href="mailto:gryvenalvrdo@gmail.com" className="btn-primary" style={{ display: "inline-flex", margin: "0 auto" }}>
              {t.contact.btn}
            </a>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer>
        <div className="container">
          <p>
            {t.footer.built}{" "}
            <a href="#hero">Gryven Alverdo Gunawan</a> · 2026 ·{" "}
            <a href="https://github.com/gryvnalvrdo/portofolio" target="_blank" rel="noopener">
              GitHub
            </a>
          </p>
          <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", opacity: 0.6 }}>
            {t.footer.part}
          </p>
        </div>
      </footer>
    </>
  );
}
