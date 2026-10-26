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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const t = dict[lang];

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang;
    if (saved === "id" || saved === "en") setLang(saved);

    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Fetch live job tracking stats from JobTrail Neon DB
    fetch("https://jobtracker-kjmw.vercel.app/api/public/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.applications !== undefined) {
          setJobStats({
            applications: data.applications,
            interviews: data.interviews || 0,
          });
        }
      })
      .catch((err) => console.error("Failed to fetch job stats:", err));

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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

  const resumeUrl =
    lang === "id"
      ? "https://drive.google.com/file/d/1IBG1j5z5CY1x_6139-bURoyCCEjZkwEQ/view?usp=sharing"
      : "https://drive.google.com/file/d/1h_s4sBnCvEn8VgMihjvjM5f4Gp8cO6Qc/view?usp=sharing";

  return (
    <>
      {/* ============================================
          FIXED EDGE-TO-EDGE BLUR NAVBAR (VERCEL / APPLE STYLE)
      ============================================= */}
      <header className="site-header-fixed">
        <div className="site-header-inner">
          <a
            href="#"
            className="site-nav-brand"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Gryven Alverdo"
          >
            <span className="site-brand-name">Gryven Alverdo</span>
            <span className="site-brand-dot">.</span>
          </a>

          <nav className="site-nav-links">
            <a href="#suite" className="site-nav-link">
              {lang === "en" ? "The Suite" : "Ekosistem"}
            </a>
            <a href="#experience" className="site-nav-link">
              {lang === "en" ? "Journey" : "Pengalaman"}
            </a>
            <a href="#skills" className="site-nav-link">
              {lang === "en" ? "Stack" : "Keahlian"}
            </a>
            <a href="#contact" className="site-nav-link">
              {lang === "en" ? "Contact" : "Kontak"}
            </a>
          </nav>

          <div className="site-nav-right">
            <button onClick={toggleLang} className="lang-toggle" aria-label="Toggle language">
              {lang === "en" ? "EN / ID" : "ID / EN"}
            </button>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: "0.45rem 1rem", fontSize: "0.8rem", borderRadius: "8px" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
              <span>CV</span>
            </a>
          </div>
        </div>
      </header>

      <main className="portfolio-wrapper">
        {/* ============================================
            HERO SECTION
        ============================================= */}
        <section className="hero-section">
          <div className="hero-content">
            <RevealWrapper delay={0}>
              <div className="hero-eyebrow">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                <span>{t.hero.badge}</span>
              </div>
            </RevealWrapper>

            <RevealWrapper delay={50}>
              <h1 className="hero-title">
                {t.hero.hi} <span className="hero-gradient-text">Gryven Alverdo Gunawan.</span>
              </h1>
            </RevealWrapper>

            <RevealWrapper delay={100}>
              <p className="hero-desc">{t.hero.sub}</p>
            </RevealWrapper>

            <RevealWrapper delay={130}>
              <div className="hero-highlights-strip">
                <div className="hero-highlight-item">
                  <span className="hero-highlight-val">3.88 GPA</span>
                  <span className="hero-highlight-lbl">{lang === "id" ? "Lulusan CS Terbaik" : "Honors CS Grad"}</span>
                </div>
                <div className="hero-highlight-divider" />
                <div className="hero-highlight-item">
                  <span className="hero-highlight-val">3 Shipped</span>
                  <span className="hero-highlight-lbl">{lang === "id" ? "Alat Suite Dibangun" : "Suite Tools Built"}</span>
                </div>
                <div className="hero-highlight-divider" />
                <div className="hero-highlight-item">
                  <span className="hero-highlight-val">Laravel 11</span>
                  <span className="hero-highlight-lbl">{lang === "id" ? "Web Prod Hotel Claro" : "Prod Hotel Web"}</span>
                </div>
              </div>
            </RevealWrapper>

            <RevealWrapper delay={160}>
              <div className="hero-actions">
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary hero-btn-cv">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <span>{lang === "id" ? "Lihat CV Saya" : "View My Resume"}</span>
                </a>
                <div className="hero-social-actions">
                  <a href="https://github.com/gryvnalvrdo" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    <span>GitHub</span>
                  </a>
                  <a href="https://www.linkedin.com/in/gryven-alverdo-gunawan-7283ab262/" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </RevealWrapper>
          </div>

          <RevealWrapper delay={100}>
            <div
              className="hero-avatar-card"
              onClick={() => setIsPhotoPopupOpen(true)}
              title={lang === "id" ? "Klik untuk memperbesar foto profil" : "Click to view full photo"}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setIsPhotoPopupOpen(true); }}
            >
              <div className="hero-avatar-glow" />
              <div className="hero-avatar-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/photo.jpeg" alt="Gryven Alverdo Gunawan" className="hero-avatar-img" />
                <div className="hero-avatar-badge">
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 8px #38bdf8" }} />
                  <span>{lang === "id" ? "Makassar · Terbuka Relokasi" : "Makassar · Open to Relocate"}</span>
                </div>
              </div>
              <div className="hero-avatar-online-dot" />
            </div>
          </RevealWrapper>
        </section>

        {/* ============================================
            SECTION 1: THE JOB HUNTING SUITE (STAR OF SHOW)
        ============================================= */}
        <section id="suite" className="portfolio-section">
          <RevealWrapper delay={0}>
            <div className="section-header">
              <div className="section-eyebrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
                <span>{t.ecosystem.label}</span>
              </div>
              <h2 className="section-title">
                {t.ecosystem.title1} <span className="hero-gradient-text">{t.ecosystem.title2}</span>
              </h2>
              <p className="section-desc">{t.ecosystem.desc}</p>
            </div>
          </RevealWrapper>

          {/* 1.1 INTERACTIVE PIPELINE ARCHITECTURE FLOW */}
          <RevealWrapper delay={50}>
            <div className="pipeline-flow">
              <Link href="/autoapply" className="pipeline-card">
                <span className="pipeline-step-badge">01 · DISCOVERY</span>
                <div className="pipeline-card-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2">
                    <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                    <circle cx="12" cy="5" r="2"></circle>
                    <path d="M12 7v4"></path>
                  </svg>
                  AutoApply Flow
                </div>
                <span className="pipeline-card-sub">
                  {lang === "id" ? "Scrape & filter lowongan 24/7" : "Scrapes & filters listings"}
                </span>
              </Link>

              <span className="pipeline-arrow">→</span>

              <a href="https://jobtracker-kjmw.vercel.app/demo" target="_blank" rel="noopener noreferrer" className="pipeline-card">
                <span className="pipeline-step-badge">02 · TRACKING</span>
                <div className="pipeline-card-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                  JobTrail
                </div>
                <span className="pipeline-card-sub">
                  {lang === "id" ? "Kanban, analitik & database" : "Kanban, metrics & database"}
                </span>
              </a>

              <span className="pipeline-arrow">→</span>

              <Link href="/covercraft" className="pipeline-card">
                <span className="pipeline-step-badge">03 · AI GENERATION</span>
                <div className="pipeline-card-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  CoverCraft
                </div>
                <span className="pipeline-card-sub">
                  {lang === "id" ? "Surat lamaran ATS instan" : "ATS-friendly cover letter AI"}
                </span>
              </Link>
            </div>
          </RevealWrapper>

          {/* 1.2 THREE SUITE PROJECTS */}
          <div className="projects-grid">
            {/* PROJECT 1: JOBTRAIL */}
            <RevealWrapper delay={100}>
              <div className="project-card-modern" style={{ background: "linear-gradient(145deg, rgba(15, 23, 42, 0.7) 0%, rgba(6, 182, 212, 0.04) 100%)" }}>
                <div className="project-header-top">
                  <div className="project-pill-badge cyan">
                    <span className="project-pill-dot" />
                    <span>Full-Stack SaaS</span>
                  </div>
                  <span className="project-index-tag">01 · Live</span>
                </div>
                <h3 className="project-card-title">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                  {t.projects.jobtrail.title}
                </h3>
                <p className="project-card-desc">{t.projects.jobtrail.desc}</p>
                <div className="project-tags-list">
                  <span className="project-tag-item">Next.js 15</span>
                  <span className="project-tag-item">Prisma 7</span>
                  <span className="project-tag-item">PostgreSQL (Neon)</span>
                  <span className="project-tag-item">NextAuth</span>
                </div>
                <div className="project-btn-row">
                  <a
                    href="https://jobtracker-kjmw.vercel.app/demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: "center" }}
                  >
                    <span>{t.projects.jobtrail.btn1}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </RevealWrapper>

            {/* PROJECT 2: COVERCRAFT */}
            <RevealWrapper delay={150}>
              <div className="project-card-modern" style={{ background: "linear-gradient(145deg, rgba(15, 23, 42, 0.7) 0%, rgba(167, 139, 250, 0.04) 100%)" }}>
                <div className="project-header-top">
                  <div className="project-pill-badge purple">
                    <span className="project-pill-dot" />
                    <span>AI Micro-Tool</span>
                  </div>
                  <span className="project-index-tag">02 · Instant</span>
                </div>
                <h3 className="project-card-title">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="m9 15 2 2 4-4" />
                  </svg>
                  {t.projects.covercraft.title}
                </h3>
                <p className="project-card-desc">{t.projects.covercraft.desc}</p>
                <div className="project-tags-list">
                  <span className="project-tag-item">Gemini AI</span>
                  <span className="project-tag-item">Next.js 15</span>
                  <span className="project-tag-item">Prompt Engineering</span>
                  <span className="project-tag-item">Tailwind</span>
                </div>
                <div className="project-btn-row">
                  <Link
                    href="/covercraft"
                    className="btn-primary"
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
                      color: "#fff",
                      boxShadow: "0 4px 15px -2px rgba(167, 139, 250, 0.35)",
                    }}
                  >
                    <span>{t.projects.covercraft.btn1}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </RevealWrapper>

            {/* PROJECT 3: AUTOAPPLY FLOW */}
            <RevealWrapper delay={200}>
              <div className="project-card-modern" style={{ background: "linear-gradient(145deg, rgba(15, 23, 42, 0.7) 0%, rgba(16, 185, 129, 0.04) 100%)" }}>
                <div className="project-header-top">
                  <div className="project-pill-badge emerald">
                    <span className="project-pill-dot" />
                    <span>Automation Agent</span>
                  </div>
                  <span className="project-index-tag">03 · n8n</span>
                </div>
                <h3 className="project-card-title">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  {t.projects.autoapply.title}
                </h3>
                <p className="project-card-desc">{t.projects.autoapply.desc}</p>
                <div className="project-tags-list">
                  <span className="project-tag-item">n8n Workflow</span>
                  <span className="project-tag-item">Cron Scheduler</span>
                  <span className="project-tag-item">Webhooks</span>
                  <span className="project-tag-item">Telegram Bot</span>
                </div>
                <div className="project-btn-row">
                  <Link
                    href="/autoapply"
                    className="btn-primary"
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      color: "#fff",
                      boxShadow: "0 4px 15px -2px rgba(16, 185, 129, 0.35)",
                    }}
                  >
                    <span>{t.projects.autoapply.btn1}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </RevealWrapper>
          </div>

          {/* 1.3 LIVE ECOSYSTEM PROOF & TELEMETRY */}
          <RevealWrapper delay={250}>
            <div className="pulse-panel">
              <div className="pulse-header">
                <div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#38bdf8", marginBottom: "0.3rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                    <span>{t.liveStats?.badge || "Ecosystem in Action · Live Telemetry"}</span>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
                    {t.liveStats?.source || "Real-time sync from my active job hunting database & automated bots:"}
                  </div>
                </div>
                <div className="pulse-live-badge">
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981", animation: "pulse-green 2s infinite" }} />
                  <span>{t.liveStats?.pill || "PostgreSQL Live Sync"}</span>
                </div>
              </div>

              <div className="pulse-grid">
                <div className="pulse-card">
                  <div className="pulse-icon-box">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                    </svg>
                  </div>
                  <div className="pulse-number">{jobStats.applications > 0 ? `${jobStats.applications}+` : "18+"}</div>
                  <div className="pulse-title">{t.liveStats?.apps || "Total Applications Sent"}</div>
                  <div className="pulse-sub">{t.liveStats?.appsSub || "Stored in Neon PostgreSQL"}</div>
                </div>

                <div className="pulse-card">
                  <div className="pulse-icon-box" style={{ color: "#a78bfa" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="22" y1="12" x2="18" y2="12"></line>
                      <line x1="6" y1="12" x2="2" y2="12"></line>
                      <line x1="12" y1="6" x2="12" y2="2"></line>
                      <line x1="12" y1="22" x2="12" y2="18"></line>
                    </svg>
                  </div>
                  <div className="pulse-number">{jobStats.interviews > 0 ? jobStats.interviews : "1"}</div>
                  <div className="pulse-title">{t.liveStats?.interviews || "Active Interview Stages"}</div>
                  <div className="pulse-sub">{t.liveStats?.interviewsSub || "Currently in pipeline"}</div>
                </div>

                <div className="pulse-card">
                  <div className="pulse-icon-box" style={{ color: "#38bdf8" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  </div>
                  <div className="pulse-number">{t.liveStats?.automationVal || "Every 6 Hours"}</div>
                  <div className="pulse-title">{t.liveStats?.automation || "Automated Job Scouting"}</div>
                  <div className="pulse-sub">{t.liveStats?.automationSub || "n8n scans listings 24/7"}</div>
                </div>

                <div className="pulse-card">
                  <div className="pulse-icon-box" style={{ color: "#f43f5e" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"></path>
                    </svg>
                  </div>
                  <div className="pulse-number">{t.liveStats?.speedVal || "< 3 Seconds"}</div>
                  <div className="pulse-title">{t.liveStats?.speed || "AI Cover Letter Speed"}</div>
                  <div className="pulse-sub">{t.liveStats?.speedSub || "Gemini 2.5 Flash Engine"}</div>
                </div>
              </div>
            </div>
          </RevealWrapper>
        </section>

        {/* ============================================
            SECTION 2: EXPERIENCE & EDUCATION
        ============================================= */}
        <section id="experience" className="portfolio-section">
          <RevealWrapper delay={0}>
            <div className="section-header">
              <div className="section-eyebrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span>{t.experience.label}</span>
              </div>
              <h2 className="section-title">
                {t.experience.title1} <span className="hero-gradient-text">{t.experience.title2}</span>
              </h2>
            </div>
          </RevealWrapper>

          <div className="timeline-list">
            {t.experience.items.map((item, idx) => (
              <RevealWrapper delay={idx * 100} key={idx}>
                <div className="timeline-card">
                  <div className="timeline-top">
                    <div className="timeline-role">
                      <span>{item.title}</span>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: "0.74rem",
                            padding: "0.25rem 0.65rem",
                            borderRadius: "6px",
                            background: "rgba(56, 189, 248, 0.12)",
                            color: "#38bdf8",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            border: "1px solid rgba(56, 189, 248, 0.25)",
                            fontWeight: 600,
                          }}
                        >
                          <span>{t.experience.liveDemo || "Live Demo"}</span>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </a>
                      )}
                    </div>
                    <span className="timeline-date">{item.date}</span>
                  </div>

                  <div className="timeline-org">{item.org}</div>

                  <ul className="timeline-bullets">
                    {item.desc.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </section>

        {/* ============================================
            SECTION 3: TECHNICAL STACK
        ============================================= */}
        <section id="skills" className="portfolio-section">
          <RevealWrapper delay={0}>
            <div className="section-header">
              <div className="section-eyebrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                <span>{t.skills.label}</span>
              </div>
              <h2 className="section-title">
                {t.skills.title1} <span className="hero-gradient-text">{t.skills.title2}</span>
              </h2>
            </div>
          </RevealWrapper>

          <div className="stack-grid">
            <RevealWrapper delay={50}>
              <div className="stack-card">
                <div className="stack-category-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2">
                    <polyline points="4 7 4 4 20 4 20 7"></polyline>
                    <line x1="9" y1="20" x2="15" y2="20"></line>
                    <line x1="12" y1="4" x2="12" y2="20"></line>
                  </svg>
                  Languages
                </div>
                <div className="stack-pills">
                  {["TypeScript", "JavaScript", "Python", "PHP", "SQL", "HTML5 / CSS3"].map((s) => (
                    <span key={s} className="stack-pill">{s}</span>
                  ))}
                </div>
              </div>
            </RevealWrapper>

            <RevealWrapper delay={100}>
              <div className="stack-card">
                <div className="stack-category-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                  Frontend
                </div>
                <div className="stack-pills">
                  {["Next.js 15", "React 19", "Tailwind CSS", "CSS Modules", "Responsive UI"].map((s) => (
                    <span key={s} className="stack-pill">{s}</span>
                  ))}
                </div>
              </div>
            </RevealWrapper>

            <RevealWrapper delay={150}>
              <div className="stack-card">
                <div className="stack-category-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2">
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                  </svg>
                  Backend & DB
                </div>
                <div className="stack-pills">
                  {["Node.js", "Laravel 11", "Prisma 7", "PostgreSQL", "Neon DB", "REST APIs"].map((s) => (
                    <span key={s} className="stack-pill">{s}</span>
                  ))}
                </div>
              </div>
            </RevealWrapper>

            <RevealWrapper delay={200}>
              <div className="stack-card">
                <div className="stack-category-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                  AI & Tools
                </div>
                <div className="stack-pills">
                  {["Gemini AI", "PyTorch (ML)", "n8n Automation", "Git & GitHub", "Linux", "Vercel"].map((s) => (
                    <span key={s} className="stack-pill">{s}</span>
                  ))}
                </div>
              </div>
            </RevealWrapper>
          </div>
        </section>

        {/* ============================================
            SECTION 4: CONTACT / HIRE ME
        ============================================= */}
        <section id="contact" className="portfolio-section">
          <RevealWrapper delay={0}>
            <div className="contact-callout">
              <h2 className="contact-title">
                {t.contact.title1} <span className="hero-gradient-text">{t.contact.title2}</span>
              </h2>
              <p className="contact-desc">{t.contact.desc}</p>
              <div className="contact-btns">
                <a href="mailto:gryvnalvrdo@gmail.com" className="btn-primary" style={{ padding: "0.85rem 2rem", fontSize: "1rem" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  {t.contact.btn}
                </a>
                <a href="https://www.linkedin.com/in/gryven-alverdo-gunawan-7283ab262/" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: "0.85rem 1.6rem" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  LinkedIn
                </a>
                <a href="https://github.com/gryvnalvrdo" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: "0.85rem 1.6rem" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </RevealWrapper>
        </section>

        {/* ============================================
            PORTFOLIO FOOTER
        ============================================= */}
        <footer className="portfolio-footer">
          <div>
            © 2026 <strong>Gryven Alverdo Gunawan</strong> · Software Engineer · Makassar, Indonesia
          </div>
          <div className="footer-social-row">
            <a
              href="https://github.com/gryvnalvrdo"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon-btn"
              aria-label="GitHub profile"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/gryven-alverdo-gunawan-7283ab262/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon-btn"
              aria-label="LinkedIn profile"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:gryvnalvrdo@gmail.com"
              className="footer-icon-btn"
              aria-label="Email Gryven"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>Email</span>
            </a>
          </div>
        </footer>
      </main>

      {/* FLOATING BACK TO TOP BUTTON */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`floating-back-to-top ${showScrollTop ? "visible" : ""}`}
        aria-label="Back to top"
        title="Scroll to top"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
        <span>Top</span>
      </button>

      {/* PHOTO POPUP MODAL */}
      <div className={`photo-popup-overlay ${isPhotoPopupOpen ? "active" : ""}`} onClick={() => setIsPhotoPopupOpen(false)}>
        <div className="photo-popup-content" onClick={(e) => e.stopPropagation()}>
          <button className="photo-popup-close" onClick={() => setIsPhotoPopupOpen(false)} aria-label="Close photo">×</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photo.jpeg" alt="Gryven Alverdo Gunawan" className="photo-popup-img" />
        </div>
      </div>
    </>
  );
}
