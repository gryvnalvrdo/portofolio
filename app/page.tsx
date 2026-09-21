"use client";

import Link from "next/link";
import RevealWrapper from "@/components/RevealWrapper";
import { useState, useEffect } from "react";
import { dict } from "../lib/dictionary";

type Lang = "en" | "id";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [jobStats, setJobStats] = useState({ applications: 0, interviews: 0 });
  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = useState(false);
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

  useEffect(() => {
    if (isPhotoPopupOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isPhotoPopupOpen]);

  return (
    <>
      <main className="bento-wrapper">
        <header className="bento-header">
          <span className="bento-brand">GA.</span>
          <button onClick={toggleLang} className="lang-toggle">
            {lang === "en" ? "EN / ID" : "ID / EN"}
          </button>
        </header>

        <div className="bento-grid">
          
          {/* BOX 1: HERO */}
          <RevealWrapper delay={0} className="bento-box box-hero">
            <div className="hero-content">
              <span className="hero-badge">{t.hero.badge}</span>
              <h1 className="hero-title">
                {t.hero.hi}<br />
                <span className="gradient-text">Gryven Alverdo Gunawan.</span>
              </h1>
              <p className="hero-desc">{t.hero.sub}</p>
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
            <div className="hero-photo-wrap" onClick={() => setIsPhotoPopupOpen(true)} style={{ cursor: "pointer" }}>
              <div className="hero-photo-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/photo.jpeg" alt="Gryven Alverdo Gunawan" className="hero-photo" />
              </div>
            </div>
          </RevealWrapper>

          {/* BOX 2: ECOSYSTEM */}
          <RevealWrapper delay={100} className="bento-box box-ecosystem">
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
          </RevealWrapper>

          {/* BOX 3: PROJECT 1 */}
          <RevealWrapper delay={200} className="bento-box box-project-1">
            <span className="project-num">{t.projects.jobtrail.num}</span>
            <h3 className="box-title">{t.projects.jobtrail.title}</h3>
            <p className="box-desc" style={{ marginBottom: "1rem" }}>{t.projects.jobtrail.desc}</p>
            <div className="project-tags">
              <span className="project-tag">Next.js 15</span>
              <span className="project-tag">Prisma 7</span>
              <span className="project-tag">PostgreSQL</span>
            </div>
            <div className="project-links">
              <a href="https://jobtracker-kjmw.vercel.app/demo" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "0.6rem 1.25rem", fontSize: "0.85rem" }}>
                {t.projects.jobtrail.btn1}
              </a>
            </div>
          </RevealWrapper>

          {/* BOX 4: PROJECT 2 */}
          <RevealWrapper delay={300} className="bento-box box-project-2">
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
          </RevealWrapper>

          {/* BOX 5: PROJECT 3 */}
          <RevealWrapper delay={400} className="bento-box box-project-3">
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
          </RevealWrapper>

          {/* BOX 6: SKILLS */}
          <RevealWrapper delay={500} className="bento-box box-skills">
            <p className="box-label">{t.skills.label}</p>
            <h3 className="box-title">{t.skills.title1}<span className="gradient-text">{t.skills.title2}</span></h3>
            <div className="skills-grid">
              {["Next.js", "TypeScript", "Python", "PyTorch", "Laravel", "PostgreSQL", "Prisma", "n8n", "Tailwind"].map(skill => (
                <div key={skill} className="skill-item">{skill}</div>
              ))}
            </div>
          </RevealWrapper>

          {/* BOX 7: EXPERIENCE */}
          <RevealWrapper delay={600} className="bento-box box-experience">
            <p className="box-label">{t.experience.label}</p>
            <h3 className="box-title">{t.experience.title1}<span className="gradient-text">{t.experience.title2}</span></h3>
            
            <div className="exp-list">
              {t.experience.items.map((item, i) => (
                <div className="exp-item" key={i}>
                  <div className="exp-date">{item.date}</div>
                  <h4 className="exp-title" style={{ display: 'flex', alignItems: 'center' }}>
                    {item.title}
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" 
                         style={{ 
                           marginLeft: '14px', 
                           fontSize: '0.7rem',
                           padding: '4px 10px',
                           borderRadius: '6px',
                           background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
                           color: '#38bdf8',
                           textDecoration: 'none',
                           display: 'inline-flex',
                           alignItems: 'center',
                           border: '1px solid rgba(56, 189, 248, 0.3)',
                           boxShadow: '0 0 10px rgba(56, 189, 248, 0.1)',
                           transition: 'all 0.2s ease',
                           fontWeight: 600,
                           letterSpacing: '0.3px'
                         }}
                         onMouseOver={(e) => {
                           e.currentTarget.style.background = 'linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(59, 130, 246, 0.25) 100%)';
                           e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.5)';
                           e.currentTarget.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.2)';
                           e.currentTarget.style.transform = 'translateY(-1px)';
                         }}
                         onMouseOut={(e) => {
                           e.currentTarget.style.background = 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)';
                           e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.3)';
                           e.currentTarget.style.boxShadow = '0 0 10px rgba(56, 189, 248, 0.1)';
                           e.currentTarget.style.transform = 'translateY(0)';
                         }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </h4>
                  <div className="exp-org">{item.org}</div>
                  <ul style={{ paddingLeft: "1.2rem", color: "var(--muted)", fontSize: "0.85rem" }}>
                    {item.desc.map((bullet, idx) => (
                      <li key={idx} style={{ marginBottom: "0.25rem" }}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </RevealWrapper>

          {/* BOX 8: CONTACT */}
          <RevealWrapper delay={700} className="bento-box box-contact">
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
              <a href="https://www.linkedin.com/in/gryven-alverdo-gunawan-7283ab262/" target="_blank" rel="noopener noreferrer" className="btn-outline">
                LinkedIn
              </a>
            </div>
          </RevealWrapper>

        </div>
      </main>

      {/* Photo Popup Overlay (Outside of animated wrapper so position: fixed works) */}
      <div className={`photo-popup-overlay ${isPhotoPopupOpen ? "active" : ""}`} onClick={() => setIsPhotoPopupOpen(false)}>
        <div className="photo-popup-content" onClick={(e) => e.stopPropagation()}>
          <button className="photo-popup-close" onClick={() => setIsPhotoPopupOpen(false)}>×</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photo.jpeg" alt="Gryven Alverdo Gunawan" className="photo-popup-img" />
        </div>
      </div>
    </>
  );
}
