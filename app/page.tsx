"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import RevealWrapper from "@/components/RevealWrapper";
import { dict, SuiteSystemKey, StackDomainKey } from "../lib/dictionary";
import { useLanguage } from "../lib/useLanguage";

type SectionId = "suite" | "experience" | "skills" | "contact";

export default function Home() {
  const [lang, toggleLang] = useLanguage();
  const [activeSection, setActiveSection] = useState<SectionId>("suite");
  const [activeSystem, setActiveSystem] = useState<SuiteSystemKey>("autoapply");
  const [activeStackDomain, setActiveStackDomain] = useState<StackDomainKey>("all");
  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const t = dict[lang];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 360);

      const sectionIds: SectionId[] = ["suite", "experience", "skills", "contact"];
      const triggerLine = window.scrollY + 240;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= triggerLine) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isPhotoPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPhotoPopupOpen]);

  const copyEmailToClipboard = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("gryvnalvrdo@gmail.com").catch(() => {});
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2600);
    }
  };

  const handleComposeEmail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    copyEmailToClipboard();
    const isMobile =
      typeof navigator !== "undefined" &&
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      e.preventDefault();
      window.open(
        "https://mail.google.com/mail/?view=cm&fs=1&to=gryvnalvrdo@gmail.com",
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const resumeUrl =
    lang === "id"
      ? "https://drive.google.com/file/d/1uL_tACRRxVAA1-R53nNOybsOGDPXvhVg/view?usp=drive_link"
      : "https://drive.google.com/file/d/1zX5yMg_YAA_XN-gP7eA7DFYSzin1OQuq/view?usp=drive_link";

  const currentSystemIndex = t.suite.systems.findIndex((s) => s.id === activeSystem);
  const currentSystem = t.suite.systems[currentSystemIndex] || t.suite.systems[0];
  const nextSystem =
    t.suite.systems[(currentSystemIndex + 1) % t.suite.systems.length];

  const filteredStack =
    activeStackDomain === "all"
      ? t.skills.items
      : t.skills.items.filter((item) => item.domain === activeStackDomain);

  const countByDomain = (domain: StackDomainKey) =>
    domain === "all"
      ? t.skills.items.length
      : t.skills.items.filter((item) => item.domain === domain).length;

  const jumpToSystem = (code: string) => {
    if (code === "01") setActiveSystem("autoapply");
    if (code === "02") setActiveSystem("jobtrail");
    if (code === "03") setActiveSystem("covercraft");
    if (code === "04") {
      const claroEl = document.getElementById("claro-spotlight");
      if (claroEl) {
        claroEl.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    const suiteEl = document.getElementById("suite");
    if (suiteEl) suiteEl.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ============================================
          ADAPTIVE STICKY HEADER (DESKTOP + MOBILE TOP BAR)
      ============================================= */}
      <header className="site-header-fixed">
        <div className="site-header-inner">
          <div className="site-brand-group">
            <a
              href="#"
              className="site-nav-brand"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Gryven Alverdo Gunawan"
            >
              <span className="site-brand-monogram">GA</span>
              <span>Gryven Alverdo</span>
              <span className="site-brand-dot">.</span>
            </a>

            <div className="header-status-pill">
              <span className="header-status-dot" />
              <span>{t.nav.status}</span>
            </div>
          </div>

          <nav className="site-nav-links" aria-label="Primary Navigation">
            <a
              href="#suite"
              className={`site-nav-link ${activeSection === "suite" ? "active" : ""}`}
            >
              <span className="site-nav-link-idx">01</span>
              <span>{t.nav.systems}</span>
            </a>
            <a
              href="#experience"
              className={`site-nav-link ${activeSection === "experience" ? "active" : ""}`}
            >
              <span className="site-nav-link-idx">02</span>
              <span>{t.nav.journey}</span>
            </a>
            <a
              href="#skills"
              className={`site-nav-link ${activeSection === "skills" ? "active" : ""}`}
            >
              <span className="site-nav-link-idx">03</span>
              <span>{t.nav.stack}</span>
            </a>
            <a
              href="#contact"
              className={`site-nav-link ${activeSection === "contact" ? "active" : ""}`}
            >
              <span className="site-nav-link-idx">04</span>
              <span>{t.nav.contact}</span>
            </a>
          </nav>

          <div className="site-nav-right">
            <button
              onClick={toggleLang}
              className="lang-toggle"
              aria-label="Toggle language"
            >
              <span className={lang === "en" ? "lang-toggle-active" : ""}>EN</span>
              <span>/</span>
              <span className={lang === "id" ? "lang-toggle-active" : ""}>ID</span>
            </button>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="site-header-cv-btn"
            >
              <span>{t.nav.resume}</span>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main className="portfolio-wrapper">
        {/* ============================================
            HERO SECTION (SUBSTANCE + TELEMETRY, NO DUPLICATE SOCIALS)
        ============================================= */}
        <section className="hero-section">
          <div className="hero-content">
            {/* Mobile-First Identity Header (Visible on < 768px) */}
            <div className="hero-mobile-identity">
              <div
                className="hero-mobile-avatar"
                onClick={() => setIsPhotoPopupOpen(true)}
                role="button"
                tabIndex={0}
                aria-label="Open profile photo"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setIsPhotoPopupOpen(true);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/photo.jpeg" alt="Gryven Alverdo Gunawan" />
              </div>
              <div className="hero-mobile-meta">
                <div className="hero-mobile-name">{t.hero.name}</div>
                <div className="hero-mobile-role">{t.hero.role}</div>
                <div className="hero-mobile-loc">
                  <span className="header-status-dot" />
                  <span>{t.hero.location}</span>
                </div>
              </div>
            </div>

            <RevealWrapper delay={0}>
              <div className="hero-eyebrow">
                <span className="header-status-dot" />
                <span>{t.hero.eyebrow}</span>
              </div>

              <h1 className="hero-title">
                <span className="hero-title-name">{t.hero.name}</span>
                <span className="hero-title-lead">{t.hero.headlineLead} </span>
                <span className="hero-title-accent">{t.hero.headlineAccent}</span>
              </h1>

              <p className="hero-desc">{t.hero.sub}</p>
            </RevealWrapper>

            <RevealWrapper delay={60}>
              <div className="hero-metrics-grid">
                {t.hero.metrics.map((m) => (
                  <div className="hero-metric-card" key={m.label}>
                    <div className="hero-metric-val">{m.value}</div>
                    <div className="hero-metric-lbl">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="hero-actions">
                <a href="#suite" className="btn-primary">
                  <span>{t.hero.exploreCta}</span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14" />
                    <path d="m19 12-7 7-7-7" />
                  </svg>
                </a>

                <button
                  type="button"
                  onClick={copyEmailToClipboard}
                  className={`btn-secondary ${emailCopied ? "copied" : ""}`}
                >
                  {emailCopied ? (
                    <>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{t.hero.emailCopied}</span>
                    </>
                  ) : (
                    <>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>{t.hero.copyEmail}</span>
                    </>
                  )}
                </button>
              </div>
            </RevealWrapper>
          </div>

          {/* Desktop Right Column: Profile + Clickable Ecosystem Index */}
          <RevealWrapper delay={100}>
            <aside className="hero-profile-panel">
              <div className="hero-profile-top">
                <div
                  className="hero-avatar-trigger"
                  onClick={() => setIsPhotoPopupOpen(true)}
                  title={lang === "id" ? "Klik untuk memperbesar foto" : "Click to enlarge photo"}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setIsPhotoPopupOpen(true);
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/photo.jpeg"
                    alt="Gryven Alverdo Gunawan"
                    className="hero-avatar-img"
                  />
                </div>
                <div className="hero-profile-meta">
                  <div className="hero-profile-name">{t.hero.name}</div>
                  <div className="hero-profile-role">{t.hero.role}</div>
                  <div className="hero-location-badge">
                    <span className="hero-location-dot" />
                    <span>{t.hero.location}</span>
                  </div>
                </div>
              </div>

              <div className="hero-telemetry-box">
                <div className="hero-telemetry-hdr">
                  <span>{t.hero.telemetryTitle}</span>
                  <span>4 / 4 LIVE</span>
                </div>
                <div className="hero-telemetry-list">
                  {t.hero.telemetryItems.map((item) => (
                    <button
                      type="button"
                      key={item.code}
                      onClick={() => jumpToSystem(item.code)}
                      className="hero-telemetry-item"
                    >
                      <div className="hero-telemetry-left">
                        <span className={`hero-telemetry-code ${item.theme}`}>
                          {item.code}
                        </span>
                        <span className="hero-telemetry-name">{item.name}</span>
                      </div>
                      <span className="hero-telemetry-type">{item.type}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </RevealWrapper>
        </section>

        {/* ============================================
            SECTION 1: ENGINEERED SYSTEMS (#suite)
            Part A: Interactive Job Hunting Suite Inspector (01 -> 02 -> 03)
            Part B: Enterprise & Hospitality ERP Spotlight (04 Hotel Claro)
        ============================================= */}
        <section id="suite" className="portfolio-section">
          <RevealWrapper delay={0}>
            <div className="section-header">
              <div className="section-eyebrow">{t.suite.label}</div>
              <h2 className="section-title">{t.suite.title}</h2>
              <p className="section-desc">{t.suite.desc}</p>
            </div>
          </RevealWrapper>

          <RevealWrapper delay={40}>
            <div className="subsection-bar">
              <span className="subsection-label">{t.suite.suiteSubheader}</span>
              <span className="subsection-hint">{t.suite.suiteInstruction}</span>
            </div>

            {/* 3-Stage Interactive Pipeline Selector (No Duplicate Cards Below!) */}
            <div className="pipeline-selector-grid" role="tablist" aria-label="Job Hunting Suite Pipeline">
              {t.suite.systems.map((sys, idx) => {
                const isActive = sys.id === activeSystem;
                return (
                  <React.Fragment key={sys.id}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      data-theme={sys.theme}
                      className={`pipeline-node-btn ${isActive ? "active" : ""}`}
                      onClick={() => setActiveSystem(sys.id)}
                    >
                      <div className="pipeline-node-top">
                        <span className="pipeline-node-idx">{sys.index}</span>
                        <span className="pipeline-node-domain">{sys.domainBadge}</span>
                      </div>
                      <div className="pipeline-node-name">{sys.name}</div>
                      <div className="pipeline-node-desc">{sys.shortDesc}</div>
                    </button>

                    {idx < t.suite.systems.length - 1 && (
                      <div className="pipeline-connector" aria-hidden="true">
                        <span className="pipeline-connector-protocol">
                          {idx === 0 ? t.suite.protocol1 : t.suite.protocol2}
                        </span>
                        <span className="pipeline-connector-line">
                          <svg width="20" height="12" viewBox="0 0 20 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 6h18" />
                            <path d="m14 1 5 5-5 5" />
                          </svg>
                        </span>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Active System Master-Detail Inspector Panel */}
            <div className="inspector-panel" data-theme={currentSystem.theme} role="tabpanel">
              <div className="inspector-left">
                <div className="inspector-top-badges">
                  <span className={`inspector-domain-pill ${currentSystem.theme}`}>
                    {currentSystem.index}: {currentSystem.domainBadge}
                  </span>
                  <span className="inspector-runtime-pill">{currentSystem.runtimeTag}</span>
                </div>

                <h3 className="inspector-headline">
                  {currentSystem.name}: {currentSystem.headline}
                </h3>

                <p className="inspector-problem">{currentSystem.problemSolved}</p>

                <ul className="inspector-points">
                  {currentSystem.architecturePoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>

                <div className="inspector-stack-row">
                  {currentSystem.stack.map((tech) => (
                    <span className="inspector-stack-tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="inspector-actions">
                  {currentSystem.primaryBtn.external ? (
                    <a
                      href={currentSystem.primaryBtn.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn-theme-primary ${currentSystem.theme}`}
                    >
                      <span>{currentSystem.primaryBtn.label}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={currentSystem.primaryBtn.href}
                      className={`btn-theme-primary ${currentSystem.theme}`}
                    >
                      <span>{currentSystem.primaryBtn.label}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  )}

                  {currentSystem.secondaryBtn && (
                    <a
                      href={currentSystem.secondaryBtn.href}
                      target={currentSystem.secondaryBtn.external ? "_blank" : undefined}
                      rel={currentSystem.secondaryBtn.external ? "noopener noreferrer" : undefined}
                      className="btn-outline"
                    >
                      <span>{currentSystem.secondaryBtn.label}</span>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </a>
                  )}

                  <button
                    type="button"
                    className="inspector-next-btn"
                    onClick={() => setActiveSystem(nextSystem.id)}
                  >
                    {t.suite.nextStepPrefix} {nextSystem.index} {nextSystem.name}
                  </button>
                </div>
              </div>

              <div className="contract-terminal">
                <div>
                  <div className="contract-terminal-hdr">
                    <div className="contract-terminal-title">
                      {currentSystem.contractTitle}
                    </div>
                    <div className="contract-terminal-meta">
                      {currentSystem.contractMeta}
                    </div>
                  </div>

                  <div className="contract-rows">
                    {currentSystem.contractLines.map((row) => (
                      <div className="contract-row" key={row.label}>
                        <span className="contract-key">{row.label}</span>
                        <span className="contract-val">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealWrapper>

          {/* PART B: ENTERPRISE & HOSPITALITY PRODUCTION SYSTEM (HOTEL CLARO MAKASSAR) */}
          <RevealWrapper delay={80}>
            <div id="claro-spotlight">
              <div className="subsection-bar">
                <span className="subsection-label">{t.suite.claro.sectionHeader}</span>
              </div>

              <div className="claro-spotlight-card">
                <div className="inspector-left">
                  <div className="inspector-top-badges">
                    <span className="inspector-domain-pill gold">
                      {t.suite.claro.index}: {t.suite.claro.domainBadge}
                    </span>
                    <span className="inspector-runtime-pill">
                      {t.suite.claro.runtimeTag}
                    </span>
                  </div>

                  <h3 className="inspector-headline">{t.suite.claro.name}</h3>
                  <p className="inspector-problem">{t.suite.claro.desc}</p>

                  <ul className="inspector-points">
                    {t.suite.claro.highlights.map((hl, i) => (
                      <li key={i}>{hl}</li>
                    ))}
                  </ul>

                  <div className="inspector-stack-row">
                    {t.suite.claro.stack.map((tech) => (
                      <span className="inspector-stack-tag" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="inspector-actions">
                    <a
                      href={t.suite.claro.primaryBtn.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-theme-primary gold"
                    >
                      <span>{t.suite.claro.primaryBtn.label}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="contract-terminal">
                  <div>
                    <div className="contract-terminal-hdr">
                      <div className="contract-terminal-title">
                        {t.suite.claro.contractTitle}
                      </div>
                      <div className="contract-terminal-meta">
                        {t.suite.claro.contractMeta}
                      </div>
                    </div>

                    <div className="contract-rows">
                      {t.suite.claro.contractLines.map((row) => (
                        <div className="contract-row" key={row.label}>
                          <span className="contract-key">{row.label}</span>
                          <span className="contract-val">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealWrapper>
        </section>

        {/* ============================================
            SECTION 2: EXPERIENCE & EDUCATION (#experience)
        ============================================= */}
        <section id="experience" className="portfolio-section">
          <RevealWrapper delay={0}>
            <div className="section-header">
              <div className="section-eyebrow">{t.experience.label}</div>
              <h2 className="section-title">{t.experience.title}</h2>
              <p className="section-desc">{t.experience.desc}</p>
            </div>
          </RevealWrapper>

          <div className="timeline-list">
            {t.experience.items.map((item, idx) => (
              <RevealWrapper delay={idx * 70} key={item.role}>
                <article className="timeline-card">
                  <div className="timeline-top">
                    <h3 className="timeline-role">{item.role}</h3>
                    <span className="timeline-period">{item.period}</span>
                  </div>

                  <div className="timeline-meta-row">
                    <span className="timeline-org">{item.org}</span>
                    <span className="timeline-loc">{item.location}</span>
                    <span className="timeline-domain-badge">{item.badge}</span>
                  </div>

                  <ul className="timeline-bullets">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>

                  <div className="timeline-footer">
                    <div className="timeline-tags">
                      {item.tags.map((tag) => (
                        <span className="timeline-tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="timeline-demo-link"
                      >
                        <span>{t.experience.liveDemo}</span>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                        >
                          <path d="M7 17L17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                      </a>
                    )}
                  </div>
                </article>
              </RevealWrapper>
            ))}
          </div>
        </section>

        {/* ============================================
            SECTION 3: DOMAIN-SPECIFIC ARCHITECTURE STACK (#skills)
        ============================================= */}
        <section id="skills" className="portfolio-section">
          <RevealWrapper delay={0}>
            <div className="section-header">
              <div className="section-eyebrow">{t.skills.label}</div>
              <h2 className="section-title">{t.skills.title}</h2>
              <p className="section-desc">{t.skills.desc}</p>
            </div>
          </RevealWrapper>

          <RevealWrapper delay={40}>
            <div className="stack-filter-bar" role="tablist" aria-label="Filter technologies by domain">
              {t.skills.categories.map((cat) => {
                const isSelected = activeStackDomain === cat.id;
                return (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    key={cat.id}
                    onClick={() => setActiveStackDomain(cat.id)}
                    className={`stack-filter-btn ${isSelected ? "active" : ""}`}
                  >
                    <span>{cat.label}</span>
                    <span className="stack-filter-count">
                      {countByDomain(cat.id)}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="stack-domain-grid">
              {filteredStack.map((skill) => (
                <div className="stack-skill-card" key={skill.name}>
                  <div className="stack-skill-top">
                    <span className="stack-skill-name">{skill.name}</span>
                    <span className={`stack-skill-project ${skill.theme}`}>
                      {skill.project}
                    </span>
                  </div>
                  <p className="stack-skill-role">{skill.role}</p>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </section>

        {/* ============================================
            SECTION 4: UNIFIED TERMINAL CONTACT & FOOTER (#contact)
            Single-Source-of-Truth for Email, GitHub, LinkedIn, Resume
        ============================================= */}
        <section id="contact" className="unified-contact-section">
          <RevealWrapper delay={0}>
            <div className="contact-command-card">
              <div className="contact-status-bar">
                <span className="header-status-dot" />
                <span>{t.contact.availability}</span>
              </div>

              <h2 className="contact-title">{t.contact.title}</h2>
              <p className="contact-desc">{t.contact.desc}</p>

              <div className="contact-email-terminal">
                <div className="contact-email-address">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--amber-l)"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>gryvnalvrdo@gmail.com</span>
                </div>

                <div className="contact-email-actions">
                  <button
                    type="button"
                    onClick={copyEmailToClipboard}
                    className={`btn-secondary ${emailCopied ? "copied" : ""}`}
                  >
                    {emailCopied ? (
                      <>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{t.contact.copiedBtn}</span>
                      </>
                    ) : (
                      <>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        <span>{t.contact.copyBtn}</span>
                      </>
                    )}
                  </button>

                  <a
                    href="mailto:gryvnalvrdo@gmail.com"
                    onClick={handleComposeEmail}
                    className="btn-primary"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>{t.contact.composeBtn}</span>
                  </a>
                </div>
              </div>

              <footer className="contact-footer-bar">
                <div className="contact-copyright">
                  © 2026 {t.contact.copyright}
                </div>

                <div className="contact-external-links">
                  <a
                    href="https://github.com/gryvnalvrdo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-ext-link"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.1"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    <span>GitHub</span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/gryven-alverdo-gunawan-7283ab262/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-ext-link"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.1"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-ext-link"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.1"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span>{t.nav.resume} PDF</span>
                  </a>
                </div>
              </footer>
            </div>
          </RevealWrapper>
        </section>
      </main>

      {/* ============================================
          MOBILE FLOATING BOTTOM DOCK (< 768px Thumb Zone)
      ============================================= */}
      <nav className="mobile-bottom-dock" aria-label="Mobile Bottom Navigation">
        <a
          href="#suite"
          className={`mobile-dock-link ${activeSection === "suite" ? "active" : ""}`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          <span>{t.nav.systems}</span>
        </a>

        <a
          href="#experience"
          className={`mobile-dock-link ${activeSection === "experience" ? "active" : ""}`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          <span>{t.nav.journey}</span>
        </a>

        <a
          href="#skills"
          className={`mobile-dock-link ${activeSection === "skills" ? "active" : ""}`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span>{t.nav.stack}</span>
        </a>

        <a
          href="#contact"
          className={`mobile-dock-link ${activeSection === "contact" ? "active" : ""}`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span>{t.nav.contact}</span>
        </a>

        {showScrollTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mobile-dock-top-btn"
            aria-label="Scroll to top"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
            <span>{t.nav.top}</span>
          </button>
        )}
      </nav>

      {/* PHOTO POPUP MODAL */}
      <div
        className={`photo-popup-overlay ${isPhotoPopupOpen ? "active" : ""}`}
        onClick={() => setIsPhotoPopupOpen(false)}
      >
        <div
          className="photo-popup-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="photo-popup-close"
            onClick={() => setIsPhotoPopupOpen(false)}
            aria-label="Close photo"
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photo.jpeg"
            alt="Gryven Alverdo Gunawan"
            className="photo-popup-img"
          />
        </div>
      </div>
    </>
  );
}
