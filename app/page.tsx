"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { dict } from "../lib/dictionary";

type Lang = "en" | "id";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [jobStats, setJobStats] = useState({ applications: 0, interviews: 0 });
  const t = dict[lang];

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang;
    if (saved === "id" || saved === "en") setLang(saved);

    // Fetch live job tracking stats
    fetch("https://jobtracker-kjmw.vercel.app/api/public/stats")
      .then(res => res.json())
      .then(data => {
        if (data && data.applications !== undefined) {
          setJobStats({ applications: data.applications, interviews: data.interviews || 0 });
        }
      })
      .catch(err => console.error("Failed to fetch job stats:", err));
  }, []);

  const toggleLang = () => {
    const next = lang === "en" ? "id" : "en";
    setLang(next);
    localStorage.setItem("lang", next);
  };

  return (
    <main className="bento-wrapper">
      <header className="bento-header">
        <span className="bento-brand">GA.</span>
        <button onClick={toggleLang} className="lang-toggle">
          {lang === "en" ? "EN / ID" : "ID / EN"}
        </button>
      </header>

      <div className="bento-grid">
        
        {/* BOX 1: HERO */}
        <div className="bento-box box-hero">
          <div className="hero-content">
            <span className="hero-badge">{t.hero.badge}</span>
            <h1 className="hero-title">
              {t.hero.hi}<br />
              <span className="gradient-text">Gryven Alverdo Gunawan.</span>
            </h1>
            <p className="hero-desc">{t.hero.sub}</p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-val">3.88</span>
                <span className="stat-label">GPA / 4.00</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">{jobStats.applications > 0 ? jobStats.applications : "3+"}</span>
                <span className="stat-label">{jobStats.applications > 0 ? t.hero.stats.applications : t.hero.stats.projects}</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">{jobStats.interviews > 0 ? jobStats.interviews : "2"}</span>
                <span className="stat-label">{jobStats.interviews > 0 ? t.hero.stats.interviews : t.hero.stats.years}</span>
              </div>
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <a 
                href={lang === "id" ? "https://drive.google.com/file/d/1IBG1j5z5CY1x_6139-bURoyCCEjZkwEQ/view?usp=sharing" : "https://drive.google.com/file/d/1h_s4sBnCvEn8VgMihjvjM5f4Gp8cO6Qc/view?usp=sharing"}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary" 
                style={{ padding: "0.8rem 1.5rem", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "linear-gradient(135deg, #a78bfa, #06b6d4)", color: "white", borderRadius: "10px", textDecoration: "none", fontWeight: 600 }}
              >
                📄 {lang === "id" ? "Lihat CV Saya" : "View My Resume"}
              </a>
            </div>
          </div>
          <div className="hero-photo-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photo.jpg" alt="Gryven" className="hero-photo" />
          </div>
        </div>

        {/* BOX 2: ECOSYSTEM */}
        <div className="bento-box box-ecosystem">
          <p className="box-label">{t.ecosystem.label}</p>
          <h2 className="box-title">{t.ecosystem.title1} <span className="gradient-text">{t.ecosystem.title2}</span></h2>
          <p className="box-desc">{t.ecosystem.desc}</p>
          <div className="eco-flow">
            <div className="eco-node">AutoApply Flow</div>
            <span className="eco-arrow">→</span>
            <div className="eco-node">JobTrail</div>
            <span className="eco-arrow">→</span>
            <div className="eco-node">CoverCraft</div>
          </div>
        </div>

        {/* BOX 3: PROJECT 1 */}
        <div className="bento-box box-project-1">
          <span className="project-num">{t.projects.jobtrail.num}</span>
          <h3 className="box-title">{t.projects.jobtrail.title}</h3>
          <p className="box-desc" style={{ marginBottom: "1rem" }}>{t.projects.jobtrail.desc}</p>
          <div className="project-tags">
            <span className="project-tag">Next.js 15</span>
            <span className="project-tag">Prisma 7</span>
            <span className="project-tag">PostgreSQL</span>
          </div>
          <div className="project-links">
            <a href="https://jobtracker-kjmw.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem" }}>
              {t.projects.jobtrail.btn1}
            </a>
          </div>
        </div>

        {/* BOX 4: PROJECT 2 */}
        <div className="bento-box box-project-2">
          <span className="project-num">{t.projects.covercraft.num}</span>
          <h3 className="box-title">{t.projects.covercraft.title}</h3>
          <p className="box-desc" style={{ marginBottom: "1rem" }}>{t.projects.covercraft.desc}</p>
          <div className="project-tags">
            <span className="project-tag">AI/Gemini</span>
            <span className="project-tag">Next.js</span>
            <span className="project-tag">Prompt Engineering</span>
          </div>
          <div className="project-links">
            <Link href="/covercraft" className="btn-primary" style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem" }}>
              {t.projects.covercraft.btn1}
            </Link>
          </div>
        </div>

        {/* BOX 5: PROJECT 3 */}
        <div className="bento-box box-project-3">
          <span className="project-num">{t.projects.autoapply.num}</span>
          <h3 className="box-title">{t.projects.autoapply.title}</h3>
          <p className="box-desc" style={{ marginBottom: "1rem" }}>{t.projects.autoapply.desc}</p>
          <div className="project-tags">
            <span className="project-tag">n8n</span>
            <span className="project-tag">Automation</span>
            <span className="project-tag">APIs & Webhooks</span>
          </div>
          <div className="project-links">
            <Link href="/autoapply" className="btn-primary" style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem" }}>
              {t.projects.autoapply.btn1}
            </Link>
          </div>
        </div>

        {/* BOX 6: SKILLS */}
        <div className="bento-box box-skills">
          <p className="box-label">{t.skills.label}</p>
          <h3 className="box-title">{t.skills.title1}<span className="gradient-text">{t.skills.title2}</span></h3>
          <div className="skills-grid">
            {["Next.js", "TypeScript", "Python", "PyTorch", "Laravel", "PostgreSQL", "Prisma", "n8n", "Tailwind"].map(skill => (
              <div key={skill} className="skill-item">{skill}</div>
            ))}
          </div>
        </div>

        {/* BOX 7: EXPERIENCE */}
        <div className="bento-box box-experience">
          <p className="box-label">{t.experience.label}</p>
          <h3 className="box-title">{t.experience.title1}<span className="gradient-text">{t.experience.title2}</span></h3>
          
          <div className="exp-list">
            {t.experience.items.map((item, i) => (
              <div className="exp-item" key={i}>
                <div className="exp-date">{item.date}</div>
                <h4 className="exp-title">{item.title}</h4>
                <div className="exp-org">{item.org}</div>
                <ul style={{ paddingLeft: "1.2rem", color: "var(--muted)", fontSize: "0.85rem" }}>
                  {item.desc.map((bullet, idx) => (
                    <li key={idx} style={{ marginBottom: "0.25rem" }}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOX 8: CONTACT */}
        <div className="bento-box box-contact">
          <h2 className="box-title" style={{ fontSize: "2rem" }}>
            {t.contact.title1}<span className="gradient-text">{t.contact.title2}</span>
          </h2>
          <p className="box-desc" style={{ maxWidth: "500px", margin: "1rem auto 2rem" }}>{t.contact.desc}</p>
          <div className="contact-btns">
            <a href="mailto:gryvnalvrdo@gmail.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
              {t.contact.btn}
            </a>
            <a href="https://github.com/gryvnalvrdo" target="_blank" rel="noopener noreferrer" className="btn-outline">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/gryven-alverdo-7283ab262/" target="_blank" rel="noopener noreferrer" className="btn-outline">
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
