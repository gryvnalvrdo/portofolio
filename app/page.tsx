"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import RevealWrapper from "@/components/RevealWrapper";
import { dict, SuiteSystemKey } from "../lib/dictionary";
import { useLanguage } from "../lib/useLanguage";
import { useTheme } from "../lib/useTheme";

type SectionId = "suite" | "experience" | "contact";

export default function Home() {
  const [lang, toggleLang] = useLanguage();
  const [theme, toggleTheme] = useTheme();
  const [activeSection, setActiveSection] = useState<SectionId>("suite");
  const [activeSystem, setActiveSystem] = useState<SuiteSystemKey>("autoapply");
  const [expandedMobileSys, setExpandedMobileSys] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const t = dict[lang];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 320);

      const sectionIds: SectionId[] = ["suite", "experience", "contact"];
      const triggerLine = window.scrollY + 240;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= triggerLine) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setIsPhotoPopupOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen || isPhotoPopupOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, isPhotoPopupOpen]);

  const handleEmailAction = (e: React.MouseEvent<HTMLAnchorElement>) => {
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

  const totalStages = t.suite.systems.length;
  const currentSystemIndex = t.suite.systems.findIndex(
    (s) => s.id === activeSystem
  );
  const safeIndex = currentSystemIndex >= 0 ? currentSystemIndex : 0;
  const currentSystem = t.suite.systems[safeIndex];
  const prevSystem =
    t.suite.systems[(safeIndex - 1 + totalStages) % totalStages];
  const nextSystem = t.suite.systems[(safeIndex + 1) % totalStages];

  const closeAndNavigate = (id: SectionId) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuickJump = (target: string, system?: SuiteSystemKey) => {
    if (system) {
      setActiveSystem(system);
      setExpandedMobileSys(system);
      const mobileCard = document.getElementById(`mobile-card-${system}`);
      if (mobileCard && mobileCard.offsetHeight > 0) {
        mobileCard.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ============================================
          CLEAN STICKY HEADER (WITH TOP-LEFT HAMBURGER ON MOBILE)
      ============================================= */}
      <header className="site-header-fixed">
        <div className="site-header-inner">
          <div className="site-header-left">
            <button
              type="button"
              className="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <a
              href="#"
              className="site-nav-brand"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span>Gryven Alverdo</span>
            </a>
          </div>

          <nav className="site-nav-links" aria-label="Primary Navigation">
            <a
              href="#suite"
              className={`site-nav-link ${activeSection === "suite" ? "active" : ""}`}
            >
              {t.nav.projects}
            </a>
            <a
              href="#experience"
              className={`site-nav-link ${activeSection === "experience" ? "active" : ""}`}
            >
              {t.nav.experience}
            </a>
            <a
              href="#contact"
              className={`site-nav-link ${activeSection === "contact" ? "active" : ""}`}
            >
              {t.nav.contact}
            </a>
          </nav>

          <div className="site-nav-right">
            <button
              type="button"
              onClick={toggleTheme}
              className="icon-toggle-btn"
              aria-label={theme === "dark" ? t.nav.themeLight : t.nav.themeDark}
              title={theme === "dark" ? t.nav.themeLight : t.nav.themeDark}
            >
              {theme === "dark" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <button
              type="button"
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
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* MOBILE LEFT SLIDE-IN DRAWER */}
      <div
        className={`mobile-drawer-overlay ${mobileMenuOpen ? "open" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <aside
        className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`}
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-hdr">
          <span className="site-nav-brand">
            <span>Gryven Alverdo</span>
          </span>
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="mobile-drawer-nav">
          <a
            href="#suite"
            onClick={(e) => {
              e.preventDefault();
              closeAndNavigate("suite");
            }}
            className={`mobile-drawer-link ${activeSection === "suite" ? "active" : ""}`}
          >
            <span>{t.nav.projects}</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </a>
          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault();
              closeAndNavigate("experience");
            }}
            className={`mobile-drawer-link ${activeSection === "experience" ? "active" : ""}`}
          >
            <span>{t.nav.experience}</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              closeAndNavigate("contact");
            }}
            className={`mobile-drawer-link ${activeSection === "contact" ? "active" : ""}`}
          >
            <span>{t.nav.contact}</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </a>
        </nav>

        <div className="mobile-drawer-footer">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ width: "100%" }}
          >
            <span>{t.nav.resume} (PDF)</span>
          </a>
        </div>
      </aside>

      <main className="portfolio-wrapper">
        {/* ============================================
            HERO SECTION (EQUAL-HEIGHT 2-COLUMN SYMMETRIC GRID)
        ============================================= */}
        <section className="hero-section">
          <RevealWrapper delay={0} style={{ height: "100%" }}>
            <div className="hero-left-col" style={{ height: "100%" }}>
              <div>
                <h1 className="hero-name">{t.hero.name}</h1>
                <p className="hero-headline">{t.hero.headline}</p>
                <p className="hero-desc">{t.hero.sub}</p>
              </div>

              <div>
                <div className="hero-metrics-row">
                  {t.hero.highlights.map((m) => (
                    <div className="hero-metric-box" key={m.label}>
                      <div className="hero-metric-val">{m.value}</div>
                      <div className="hero-metric-lbl">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="hero-actions">
                  <a href="#suite" className="btn-primary">
                    <span>{t.hero.exploreCta}</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                      <path d="M12 5v14" />
                      <path d="m19 12-7 7-7-7" />
                    </svg>
                  </a>

                  <a href="#contact" className="btn-secondary">
                    <span>{t.hero.contactCta}</span>
                  </a>
                </div>
              </div>
            </div>
          </RevealWrapper>

          <RevealWrapper delay={60} className="hero-reveal-right" style={{ height: "100%" }}>
            <aside className="hero-right-col" style={{ height: "100%" }}>
              <div className="hero-identity-row">
                <button
                  type="button"
                  className="hero-avatar-btn"
                  onClick={() => setIsPhotoPopupOpen(true)}
                  aria-label="Enlarge profile photo"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/photo.jpeg"
                    alt="Gryven Alverdo Gunawan"
                    className="hero-avatar-img"
                  />
                </button>

                <div className="hero-identity-meta">
                  <div>
                    <div className="hero-id-name">{t.hero.name}</div>
                    <div className="hero-id-sub">{t.hero.profileSubtitle}</div>
                  </div>
                  <div className="hero-id-loc">{t.hero.profileLocation}</div>
                </div>
              </div>

              <div className="hero-index-box">
                <div className="hero-index-hdr">
                  <span>{t.hero.quickIndexTitle}</span>
                  <span>{t.hero.quickIndexCount}</span>
                </div>

                <div className="hero-index-list">
                  {t.hero.quickIndex.map((item) => (
                    <button
                      type="button"
                      key={item.code}
                      onClick={() => handleQuickJump(item.target, item.system)}
                      className="hero-index-item"
                    >
                      <div className="hero-index-left">
                        <span className={`hero-index-code ${item.theme}`}>
                          {item.code}
                        </span>
                        <span className="hero-index-name">{item.name}</span>
                      </div>
                      <span className="hero-index-type">{item.type}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </RevealWrapper>
        </section>

        {/* ============================================
            SECTION 1: PERSONAL & RESEARCH PROJECTS
            (Hotel Claro lives cleanly in Experience to avoid duplication!)
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
            {/* DESKTOP INTERACTIVE PIPELINE VIEW */}
            <div className="suite-desktop-view">
              <div className="subsection-bar">
                <span className="subsection-label">{t.suite.suiteSubheader}</span>
                <span className="subsection-hint">{t.suite.suiteInstruction}</span>
              </div>

              <div
                className="pipeline-selector-grid"
                role="tablist"
                aria-label="Job Hunting Suite"
              >
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
                          <span className="pipeline-node-domain">{sys.category}</span>
                        </div>
                        <div className="pipeline-node-name">{sys.name}</div>
                        <div className="pipeline-node-desc">{sys.shortDesc}</div>
                      </button>

                      {idx < t.suite.systems.length - 1 && (
                        <div className="pipeline-connector" aria-hidden="true">
                          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 7h15" />
                            <path d="m12 2 5 5-5 5" />
                          </svg>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              <div
                className="inspector-panel"
                data-theme={currentSystem.theme}
                role="tabpanel"
              >
                <div
                  key={currentSystem.id}
                  className="inspector-body-grid inspector-animate-content"
                >
                  <div>
                    <span className={`inspector-domain-pill ${currentSystem.theme}`}>
                      {currentSystem.index}: {currentSystem.category}
                    </span>

                    <h3 className="inspector-headline">
                      {currentSystem.name}: {currentSystem.headline}
                    </h3>

                    <p className="inspector-problem">{currentSystem.overview}</p>

                    <ul className="inspector-points">
                      {currentSystem.highlights.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>

                    <div className="inspector-stack-row">
                      {currentSystem.tools.map((tech) => (
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
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
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
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </Link>
                      )}

                      {currentSystem.secondaryBtn && (
                        <a
                          href={currentSystem.secondaryBtn.href}
                          target={currentSystem.secondaryBtn.external ? "_blank" : undefined}
                          rel={
                            currentSystem.secondaryBtn.external
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="btn-outline"
                        >
                          <span>{currentSystem.secondaryBtn.label}</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flow-summary-card">
                    <div className="flow-summary-title">{currentSystem.flowTitle}</div>
                    {currentSystem.flowSteps.map((step) => (
                      <div className="flow-step-row" key={step.label}>
                        <span className="flow-step-label">{step.label}</span>
                        <span className="flow-step-val">{step.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clean Previous / Next Stage Stepper Bar */}
                <div className="inspector-stepper-bar">
                  <button
                    type="button"
                    className="stepper-nav-btn"
                    onClick={() => setActiveSystem(prevSystem.id)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M19 12H5" />
                      <path d="m12 19-7-7 7-7" />
                    </svg>
                    <span>
                      {t.suite.prevStepLabel}
                      <span className="stepper-step-name">
                        : {prevSystem.index} {prevSystem.name}
                      </span>
                    </span>
                  </button>

                  <span className="stepper-dots">
                    {currentSystem.index} / 0{totalStages}
                  </span>

                  <button
                    type="button"
                    className="stepper-nav-btn"
                    onClick={() => setActiveSystem(nextSystem.id)}
                  >
                    <span>
                      {t.suite.nextStepLabel}
                      <span className="stepper-step-name">
                        : {nextSystem.index} {nextSystem.name}
                      </span>
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* MOBILE-NATIVE VERTICAL PROJECT FEED (ALL 3 CARDS IMMEDIATELY ACCESSIBLE) */}
            <div className="suite-mobile-view">
              <div className="subsection-bar">
                <span className="subsection-label">{t.suite.suiteSubheader}</span>
              </div>

              <div className="mobile-projects-stack">
                {t.suite.systems.map((sys) => {
                  const isOpen = expandedMobileSys === sys.id;
                  return (
                    <article
                      key={sys.id}
                      id={`mobile-card-${sys.id}`}
                      className="mobile-project-card"
                      data-theme={sys.theme}
                    >
                      <div className="mobile-project-top">
                        <span className={`inspector-domain-pill ${sys.theme}`} style={{ marginBottom: 0 }}>
                          {sys.index}: {sys.category}
                        </span>
                      </div>

                      <h3 className="mobile-project-title">{sys.name}</h3>
                      <p className="mobile-project-summary">{sys.overview}</p>

                      <div className="mobile-project-cta-row">
                        {sys.primaryBtn.external ? (
                          <a
                            href={sys.primaryBtn.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`btn-theme-primary ${sys.theme}`}
                          >
                            <span>{sys.primaryBtn.label}</span>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                              <path d="M7 17L17 7" />
                              <path d="M7 7h10v10" />
                            </svg>
                          </a>
                        ) : (
                          <Link
                            href={sys.primaryBtn.href}
                            className={`btn-theme-primary ${sys.theme}`}
                          >
                            <span>{sys.primaryBtn.label}</span>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </Link>
                        )}

                        <button
                          type="button"
                          className="mobile-project-toggle-btn"
                          onClick={() =>
                            setExpandedMobileSys(isOpen ? null : sys.id)
                          }
                          aria-expanded={isOpen}
                        >
                          <span>
                            {isOpen ? t.suite.hideDetailsLabel : t.suite.showDetailsLabel}
                          </span>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            style={{
                              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "transform 0.22s ease",
                            }}
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                      </div>

                      {isOpen && (
                        <div className="mobile-project-details inspector-animate-content">
                          <ul className="inspector-points">
                            {sys.highlights.map((pt, i) => (
                              <li key={i}>{pt}</li>
                            ))}
                          </ul>

                          <div className="mobile-flow-mini-grid">
                            {sys.flowSteps.map((step) => (
                              <div className="flow-step-row" key={step.label}>
                                <span className="flow-step-label">{step.label}</span>
                                <span className="flow-step-val">{step.value}</span>
                              </div>
                            ))}
                          </div>

                          <div className="inspector-stack-row" style={{ marginBottom: sys.secondaryBtn ? "0.85rem" : 0 }}>
                            {sys.tools.map((tech) => (
                              <span className="inspector-stack-tag" key={tech}>
                                {tech}
                              </span>
                            ))}
                          </div>

                          {sys.secondaryBtn && (
                            <a
                              href={sys.secondaryBtn.href}
                              target={sys.secondaryBtn.external ? "_blank" : undefined}
                              rel={
                                sys.secondaryBtn.external
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="btn-outline"
                              style={{ width: "100%" }}
                            >
                              <span>{sys.secondaryBtn.label}</span>
                            </a>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </RevealWrapper>

          {/* DESKTOP ONLY: MELODY SIMILARITY DETECTOR */}
          <RevealWrapper delay={80}>
            <div id="melody-project" className="suite-desktop-view">
              <div className="subsection-bar">
                <span className="subsection-label">{t.suite.melody.sectionHeader}</span>
              </div>

              <div className="inspector-panel" data-theme={t.suite.melody.theme}>
                <div className="inspector-body-grid">
                  <div>
                    <span className={`inspector-domain-pill ${t.suite.melody.theme}`}>
                      {t.suite.melody.category}
                    </span>

                    <h3 className="inspector-headline">{t.suite.melody.name}</h3>
                    <p className="inspector-problem">{t.suite.melody.summary}</p>

                    <ul className="inspector-points">
                      {t.suite.melody.highlights.map((hl, idx) => (
                        <li key={idx}>{hl}</li>
                      ))}
                    </ul>

                    <div className="inspector-stack-row">
                      {t.suite.melody.tools.map((tech) => (
                        <span className="inspector-stack-tag" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="inspector-actions">
                      <a
                        href={t.suite.melody.primaryBtn.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn-theme-primary ${t.suite.melody.theme}`}
                      >
                        <span>{t.suite.melody.primaryBtn.label}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                          <path d="M7 17L17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="flow-summary-card">
                    <div className="flow-summary-title">{t.suite.melody.stepsTitle}</div>
                    {t.suite.melody.steps.map((step) => (
                      <div className="flow-step-row" key={step.label}>
                        <span className="flow-step-label">{step.label}</span>
                        <span className="flow-step-val">{step.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* MOBILE ONLY: MELODY SIMILARITY ACCORDION CARD (DEFAULT HIDDEN DETAILS) */}
            <div className="suite-mobile-view" style={{ marginTop: "0.5rem" }}>
              <div className="subsection-bar">
                <span className="subsection-label">{t.suite.melody.sectionHeader}</span>
              </div>

              <article
                id="mobile-card-melody"
                className="mobile-project-card"
                data-theme={t.suite.melody.theme}
              >
                <div className="mobile-project-top">
                  <span className={`inspector-domain-pill ${t.suite.melody.theme}`} style={{ marginBottom: 0 }}>
                    {t.suite.melody.category}
                  </span>
                </div>

                <h3 className="mobile-project-title">{t.suite.melody.name}</h3>
                <p className="mobile-project-summary">{t.suite.melody.summary}</p>

                <div className="mobile-project-cta-row">
                  <a
                    href={t.suite.melody.primaryBtn.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-theme-primary ${t.suite.melody.theme}`}
                  >
                    <span>{t.suite.melody.primaryBtn.label}</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>

                  <button
                    type="button"
                    className="mobile-project-toggle-btn"
                    onClick={() =>
                      setExpandedMobileSys(
                        expandedMobileSys === "melody" ? null : "melody"
                      )
                    }
                    aria-expanded={expandedMobileSys === "melody"}
                  >
                    <span>
                      {expandedMobileSys === "melody"
                        ? t.suite.hideDetailsLabel
                        : t.suite.showDetailsLabel}
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      style={{
                        transform:
                          expandedMobileSys === "melody"
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.22s ease",
                      }}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>

                {expandedMobileSys === "melody" && (
                  <div className="mobile-project-details inspector-animate-content">
                    <ul className="inspector-points">
                      {t.suite.melody.highlights.map((hl, idx) => (
                        <li key={idx}>{hl}</li>
                      ))}
                    </ul>

                    <div className="mobile-flow-mini-grid">
                      {t.suite.melody.steps.map((step) => (
                        <div className="flow-step-row" key={step.label}>
                          <span className="flow-step-label">{step.label}</span>
                          <span className="flow-step-val">{step.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="inspector-stack-row" style={{ marginBottom: 0 }}>
                      {t.suite.melody.tools.map((tech) => (
                        <span className="inspector-stack-tag" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            </div>
          </RevealWrapper>
        </section>

        {/* ============================================
            SECTION 2: EXPERIENCE, INTERNSHIP WORK (HOTEL CLARO) & EDUCATION
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
              <RevealWrapper delay={idx * 60} key={item.role}>
                <article
                  className={`timeline-card ${item.isFeaturedHotel ? "featured-hotel" : ""}`}
                >
                  <div className="timeline-top">
                    <h3 className="timeline-role">{item.role}</h3>
                    <span className="timeline-period">{item.period}</span>
                  </div>

                  <div className="timeline-meta-row">
                    <span className="timeline-org">{item.org}</span>
                    <span className="timeline-loc">{item.location}</span>
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
                        className="btn-theme-primary gold"
                      >
                        <span>{t.experience.liveDemo}</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
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
            SECTION 3: UNIFIED CONTACT & FOOTER (SLIM & COMPACT)
        ============================================= */}
        <section id="contact" className="unified-contact-section">
          <RevealWrapper delay={0}>
            <div className="contact-card-clean">
              <div className="contact-header-row">
                <div className="section-eyebrow">{t.contact.label}</div>
                <h2 className="contact-title">{t.contact.title}</h2>
                <p className="contact-desc">{t.contact.desc}</p>
              </div>

              <div className="contact-channels-grid">
                <a
                  href="mailto:gryvnalvrdo@gmail.com"
                  onClick={handleEmailAction}
                  className="contact-channel-card"
                >
                  <div className="contact-channel-left">
                    <span className="contact-channel-icon" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    <div className="contact-channel-info">
                      <div className="contact-channel-label">{t.contact.emailLabel}</div>
                      <div className="contact-channel-value">gryvnalvrdo@gmail.com</div>
                    </div>
                  </div>
                  <svg className="contact-channel-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>

                <a
                  href="https://wa.me/6281258576431"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel-card"
                >
                  <div className="contact-channel-left">
                    <span className="contact-channel-icon" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                    </span>
                    <div className="contact-channel-info">
                      <div className="contact-channel-label">{t.contact.whatsappLabel}</div>
                      <div className="contact-channel-value">+62 812-5857-6431</div>
                    </div>
                  </div>
                  <svg className="contact-channel-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/in/gryven-alverdo-gunawan-7283ab262/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel-card"
                >
                  <div className="contact-channel-left">
                    <span className="contact-channel-icon" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </span>
                    <div className="contact-channel-info">
                      <div className="contact-channel-label">{t.contact.linkedinLabel}</div>
                      <div className="contact-channel-value">Gryven Alverdo Gunawan</div>
                    </div>
                  </div>
                  <svg className="contact-channel-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>

                <a
                  href="https://github.com/gryvnalvrdo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel-card"
                >
                  <div className="contact-channel-left">
                    <span className="contact-channel-icon" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    </span>
                    <div className="contact-channel-info">
                      <div className="contact-channel-label">{t.contact.githubLabel}</div>
                      <div className="contact-channel-value">github.com/gryvnalvrdo</div>
                    </div>
                  </div>
                  <svg className="contact-channel-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </div>
          </RevealWrapper>
        </section>
      </main>

      {/* FLOATING BACK TO TOP BUTTON */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`floating-back-to-top ${showScrollTop ? "visible" : ""}`}
        aria-label="Back to top"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M18 15l-6-6-6 6" />
        </svg>
        <span>{t.nav.top}</span>
      </button>

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
