"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/lib/useLanguage";
import { useTheme } from "@/lib/useTheme";

interface LiveJobItem {
  id: string;
  companyName: string;
  position: string;
  status: string;
  appliedDate: string;
}

export default function AutoApplyPage() {
  const [lang, toggleLang] = useLanguage();
  const [theme, toggleTheme] = useTheme();
  const [liveJobs, setLiveJobs] = useState<LiveJobItem[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const fetchJobs = useCallback(async () => {
    try {
      const res = await fetch("https://jobtracker-kjmw.vercel.app/api/public/jobs", {
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setFetchError(false);
      if (data.success && Array.isArray(data.jobs)) {
        setLiveJobs(data.jobs);
      }
    } catch (err) {
      console.error("Failed to fetch live jobs:", err);
      setFetchError(true);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      void fetchJobs();
    }, 0);
    const interval = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        void fetchJobs();
      }
    }, 60_000);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [fetchJobs]);

  const t = {
    en: {
      back: "Portfolio",
      chip: "Stage 01: Job Discovery Automation",
      title1: "Automated 24/7 ",
      title2: "Job Monitoring & Alerts",
      desc: "An automated n8n workflow that checks remote job listings every 6 hours, filters openings that match target skills, prevents duplicates, saves new jobs into JobTrail, and sends instant Telegram notifications.",
      btn1: "Download workflow.json",
      btn2: "Open Public Live Board",
      how: "Workflow Steps",
      pipe: "5-Step Automation Pipeline",
      pipeDesc:
        "Every 6 hours, this workflow runs automatically to discover relevant openings and deliver them straight to JobTrail and Telegram.",
      tableTime: "Time",
      tableCompany: "Company",
      tablePosition: "Position Found",
      tableStatus: "Status",
      monitoring: "Synced every 60s",
      liveActivity: "Live Automated Job Feed",
      connecting: "Loading latest job entries...",
      noActivity: "No recent automated entries.",
      errorLoad: "Feed is temporarily unavailable. Please try refreshing.",
      refreshBtn: "Refresh",

      steps: [
        {
          step: "Step 01",
          title: "Scheduled Check",
          desc: "Runs automatically every 6 hours without manual action.",
          tag: "Timer",
        },
        {
          step: "Step 02",
          title: "Fetch Listings",
          desc: "Collects new remote software job listings from RSS feeds.",
          tag: "Job Feeds",
        },
        {
          step: "Step 03",
          title: "Smart Filter",
          desc: "Keeps openings matching target engineering keywords.",
          tag: "Filter",
        },
        {
          step: "Step 04",
          title: "Save to JobTrail",
          desc: "Sends unique listings securely into the JobTrail dashboard.",
          tag: "Sync",
        },
        {
          step: "Step 05",
          title: "Telegram Alert",
          desc: "Sends a formatted notification for every new match.",
          tag: "Notification",
        },
      ],

      featLabel: "Key Benefits",
      featTitle: "What This Automation Handles",
      features: [
        {
          code: "01",
          title: "Multi-Feed Monitoring",
          desc: "Scans multiple remote job feeds simultaneously on a 6-hour schedule.",
        },
        {
          code: "02",
          title: "Keyword Matching",
          desc: "Filters listings using customizable role and skill keywords.",
        },
        {
          code: "03",
          title: "Direct JobTrail Sync",
          desc: "Adds matching roles straight into your JobTrail tracker automatically.",
        },
        {
          code: "04",
          title: "Duplicate Prevention",
          desc: "Remembers previously processed listings so nothing is saved twice.",
        },
        {
          code: "05",
          title: "Instant Telegram Alerts",
          desc: "Notifies you immediately with company name, role, and direct apply link.",
        },
        {
          code: "06",
          title: "Easy Configuration",
          desc: "Keywords, endpoints, and bot tokens can be updated without editing code.",
        },
      ],

      ecoTitle: "Connected Job Hunting Suite",
      ecoDesc:
        "AutoApply Flow finds openings (01), saves them to JobTrail (02), and connects directly to CoverCraft (03) for tailored cover letters.",
      ecoBtn1: "01: AutoApply Flow",
      ecoBtn2: "02: JobTrail",
      ecoBtn3: "03: CoverCraft",
    },
    id: {
      back: "Portofolio",
      chip: "Tahap 01: Otomasi Pencarian Loker",
      title1: "Pemantauan Loker 24/7 ",
      title2: "& Notifikasi Otomatis",
      desc: "Alur kerja otomatis berbasis n8n yang memeriksa lowongan kerja setiap 6 jam, menyaring posisi sesuai keahlian, mencegah data ganda, menyimpannya ke JobTrail, dan mengirim notifikasi langsung ke Telegram.",
      btn1: "Unduh workflow.json",
      btn2: "Buka Papan Publik Live",
      how: "Alur Kerja",
      pipe: "Pipeline Otomasi 5 Tahap",
      pipeDesc:
        "Setiap 6 jam, alur kerja ini berjalan otomatis untuk menemukan lowongan yang relevan dan mengirimkannya langsung ke JobTrail serta Telegram.",
      tableTime: "Waktu",
      tableCompany: "Perusahaan",
      tablePosition: "Posisi Ditemukan",
      tableStatus: "Status",
      monitoring: "Sinkron tiap 60 detik",
      liveActivity: "Aktivitas Loker Otomatis",
      connecting: "Memuat data lowongan terbaru...",
      noActivity: "Belum ada aktivitas terbaru.",
      errorLoad: "Data sementara tidak dapat dimuat. Silakan coba muat ulang.",
      refreshBtn: "Muat Ulang",

      steps: [
        {
          step: "Tahap 01",
          title: "Jadwal Otomatis",
          desc: "Berjalan otomatis setiap 6 jam tanpa perlu dicek manual.",
          tag: "Timer",
        },
        {
          step: "Tahap 02",
          title: "Ambil Lowongan",
          desc: "Mengumpulkan daftar lowongan terbaru dari feed RSS.",
          tag: "Sumber Data",
        },
        {
          step: "Tahap 03",
          title: "Filter Kata Kunci",
          desc: "Menyaring posisi sesuai kata kunci peran yang dicari.",
          tag: "Penyaring",
        },
        {
          step: "Tahap 04",
          title: "Simpan ke JobTrail",
          desc: "Mengirim lowongan baru secara aman ke dashboard JobTrail.",
          tag: "Sinkronisasi",
        },
        {
          step: "Tahap 05",
          title: "Notifikasi Telegram",
          desc: "Mengirim pesan instan setiap kali ada lowongan yang cocok.",
          tag: "Notifikasi",
        },
      ],

      featLabel: "Keunggulan Utama",
      featTitle: "Apa Saja yang Ditangani Sistem Ini",
      features: [
        {
          code: "01",
          title: "Pemantauan Multi Sumber",
          desc: "Memeriksa beberapa sumber lowongan sekaligus secara rutin tiap 6 jam.",
        },
        {
          code: "02",
          title: "Penyaringan Kata Kunci",
          desc: "Menyaring lowongan berdasarkan kata kunci posisi dan keahlian.",
        },
        {
          code: "03",
          title: "Terhubung ke JobTrail",
          desc: "Memasukkan lowongan yang cocok langsung ke daftar lamaran JobTrail.",
        },
        {
          code: "04",
          title: "Bebas Data Ganda",
          desc: "Mencatat lowongan yang sudah diproses agar tidak masuk dua kali.",
        },
        {
          code: "05",
          title: "Notifikasi Cepat Telegram",
          desc: "Mengirim info perusahaan, posisi, dan tautan lamaran ke Telegram.",
        },
        {
          code: "06",
          title: "Konfigurasi Fleksibel",
          desc: "Kata kunci dan pengaturan dapat diubah lewat variabel tanpa ubah kode.",
        },
      ],

      ecoTitle: "Ekosistem Job Hunting Suite",
      ecoDesc:
        "AutoApply Flow menemukan lowongan (01), menyimpannya ke JobTrail (02), lalu terhubung ke CoverCraft (03) untuk menyusun surat lamaran.",
      ecoBtn1: "01: AutoApply Flow",
      ecoBtn2: "02: JobTrail",
      ecoBtn3: "03: CoverCraft",
    },
  }[lang];

  return (
    <>
      <style>{`
        .aa-body { background: var(--bg); color: var(--text); font-family: var(--font-sans); min-height: 100vh; }
        .aa-container { max-width: 1040px; margin: 0 auto; padding: 0 1.5rem; position: relative; z-index: 1; }
        .aa-hero { padding: 3.25rem 0 2.25rem; text-align: center; }
        .aa-chip { display: inline-flex; align-items: center; background: var(--emerald-bg); border: 1px solid var(--emerald-bdr); border-radius: 6px; padding: .32rem .8rem; font-family: var(--font-mono); font-size: .72rem; color: var(--emerald-l); font-weight: 700; margin-bottom: 1rem; }
        .aa-hero h1 { font-family: var(--font-display); font-size: clamp(1.85rem, 4.2vw, 2.75rem); font-weight: 700; line-height: 1.15; margin-bottom: .8rem; color: var(--text); }
        .aa-hero h1 span { color: var(--emerald-l); }
        .aa-hero p { color: var(--muted); font-size: .96rem; max-width: 620px; margin: 0 auto 1.65rem; line-height: 1.68; }
        .aa-hero-actions { display: flex; justify-content: center; gap: .75rem; flex-wrap: wrap; }
        .aa-btn-primary { display: inline-flex; align-items: center; gap: .5rem; padding: .75rem 1.4rem; min-height: 44px; background: #10b981; border: none; border-radius: 9px; color: #04130d; font-family: var(--font-display); font-size: .88rem; font-weight: 700; text-decoration: none; transition: all .2s; cursor: pointer; }
        .aa-btn-primary:hover { background: #34d399; transform: translateY(-1px); }
        .aa-btn-outline { display: inline-flex; align-items: center; gap: .5rem; padding: .75rem 1.4rem; min-height: 44px; background: var(--surface); border: 1px solid var(--border-strong); border-radius: 9px; color: var(--text); font-family: var(--font-display); font-size: .88rem; font-weight: 600; text-decoration: none; transition: all .2s; }
        .aa-btn-outline:hover { background: var(--surface2); border-color: var(--emerald-bdr); }
        .aa-section { padding: 2.75rem 0; }
        .aa-section + .aa-section { border-top: 1px solid var(--border); }
        .aa-section-label { font-family: var(--font-mono); font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--emerald-l); margin-bottom: .4rem; }
        .aa-section-title { font-family: var(--font-display); font-size: clamp(1.4rem, 3vw, 1.9rem); font-weight: 700; line-height: 1.2; margin-bottom: .55rem; color: var(--text); }
        .aa-section-desc { color: var(--muted); font-size: .9rem; line-height: 1.68; max-width: 640px; margin-bottom: 1.75rem; }

        /* Clean 5-column symmetric row on desktop, never wrapping Node 5 alone! */
        .aa-flow-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.75rem;
          margin: 1.5rem 0;
        }
        .aa-node {
          background: var(--surface);
          border: 1px solid var(--border-strong);
          border-radius: 12px;
          padding: 1.15rem 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 0.45rem;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .aa-node:hover {
          border-color: var(--emerald);
          transform: translateY(-2px);
        }
        .aa-node-step { font-family: var(--font-mono); font-size: .68rem; font-weight: 700; color: var(--emerald-l); text-transform: uppercase; }
        .aa-node h4 { font-family: var(--font-display); font-size: .92rem; font-weight: 700; color: var(--text); }
        .aa-node p { font-size: .78rem; color: var(--muted); line-height: 1.45; flex: 1; }
        .aa-node-badge { display: inline-block; width: fit-content; margin-top: .25rem; padding: .18rem .52rem; border-radius: 5px; font-family: var(--font-mono); font-size: .66rem; font-weight: 600; background: var(--surface2); color: var(--text-2); border: 1px solid var(--border); }

        @media (max-width: 960px) {
          .aa-flow-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .aa-flow-grid { grid-template-columns: 1fr; }
        }

        .aa-features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: .9rem; }
        @media (max-width: 900px) { .aa-features-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .aa-features-grid { grid-template-columns: 1fr; } }

        .aa-feature { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem; }
        .aa-feature-code { font-family: var(--font-mono); font-size: .68rem; font-weight: 700; color: var(--emerald-l); background: var(--emerald-bg); border: 1px solid var(--emerald-bdr); padding: .15rem .45rem; border-radius: 5px; display: inline-block; margin-bottom: .55rem; }
        .aa-feature h3 { font-family: var(--font-display); font-size: .95rem; font-weight: 700; margin-bottom: .35rem; color: var(--text); }
        .aa-feature p { font-size: .84rem; color: var(--muted); line-height: 1.55; }

        .live-feed-container { background: var(--surface); border: 1px solid var(--border-strong); border-radius: 14px; padding: 1.35rem; margin-bottom: 2.75rem; }
        .live-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px solid var(--border); padding-bottom: .85rem; flex-wrap: wrap; gap: .5rem; }
        .live-title { font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: var(--text); display: flex; align-items: center; gap: 0.5rem; }
        .live-indicator { display: inline-block; width: 8px; height: 8px; background-color: var(--emerald); border-radius: 50%; animation: pulse-green 2s infinite; }
        .live-status-text { font-family: var(--font-mono); font-size: 0.7rem; color: var(--emerald-l); font-weight: 700; }
        .live-table-wrapper { display: block; overflow-x: auto; }
        .live-table { width: 100%; min-width: 500px; border-collapse: collapse; font-size: 0.82rem; }
        .live-table th { text-align: left; padding: 0.65rem 0.85rem; color: var(--muted); font-family: var(--font-mono); font-size: 0.74rem; border-bottom: 1px solid var(--border); }
        .live-table td { padding: 0.8rem 0.85rem; color: var(--text-2); border-bottom: 1px solid var(--border); }
        .live-company { color: var(--text); font-weight: 600; }
        .live-position { color: var(--emerald-l); font-weight: 500; }
        .live-badge { display: inline-flex; align-items: center; padding: 0.18rem 0.55rem; border-radius: 5px; font-family: var(--font-mono); font-size: 0.68rem; font-weight: 600; }
        .live-badge.saved { background: var(--amber-bg); color: var(--amber-l); border: 1px solid var(--amber-bdr); }
        .live-badge.applied { background: var(--emerald-bg); color: var(--emerald-l); border: 1px solid var(--emerald-bdr); }
        .live-badge.rejected { background: rgba(239, 68, 68, 0.12); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.25); }
        .live-mobile-cards { display: none; }

        @media (max-width: 640px) {
          .aa-container { padding: 0 1rem; }
          .aa-hero { padding: 1.75rem 0 1.25rem; }
          .aa-hero-actions { flex-direction: column; width: 100%; }
          .aa-btn-primary, .aa-btn-outline { width: 100%; justify-content: center; }
          .live-table-wrapper { display: none; }
          .live-mobile-cards { display: flex; flex-direction: column; gap: 0.6rem; }
          .live-mobile-item { background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 0.8rem; display: flex; flex-direction: column; gap: 0.3rem; }
          .live-mobile-row-top { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
          .live-mobile-company { font-family: var(--font-display); font-weight: 700; font-size: 0.9rem; color: var(--text); }
          .live-mobile-pos { font-size: 0.82rem; color: var(--emerald-l); font-weight: 500; }
          .live-mobile-meta { display: flex; align-items: center; justify-content: space-between; font-family: var(--font-mono); font-size: 0.68rem; color: var(--muted); margin-top: 0.2rem; padding-top: 0.35rem; border-top: 1px dashed var(--border); }
        }
      `}</style>

      <div className="aa-body">
        <nav className="subpage-nav">
          <div className="subpage-nav-inner">
            <Link href="/" className="subpage-back-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>
              <span>{t.back}</span>
            </Link>

            <div className="subpage-brand-badge">
              <span>01: AutoApply Flow</span>
            </div>

            <div className="site-nav-right">
              <button
                type="button"
                onClick={toggleTheme}
                className="icon-toggle-btn"
                aria-label="Toggle color theme"
              >
                {theme === "dark" ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
              <button onClick={toggleLang} className="lang-toggle" aria-label="Toggle language">
                <span className={lang === "en" ? "lang-toggle-active" : ""}>EN</span>
                <span>/</span>
                <span className={lang === "id" ? "lang-toggle-active" : ""}>ID</span>
              </button>
            </div>
          </div>
        </nav>

        <div className="aa-container">
          <section className="aa-hero">
            <div className="aa-chip">{t.chip}</div>
            <h1>
              {t.title1} <span>{t.title2}</span>
            </h1>
            <p>{t.desc}</p>
            <div className="aa-hero-actions">
              <a
                href="/autoapply-workflow.json"
                download="autoapply-workflow.json"
                className="aa-btn-primary"
              >
                <span>{t.btn1}</span>
              </a>
              <a
                href="https://jobtracker-kjmw.vercel.app/public/live"
                target="_blank"
                rel="noopener noreferrer"
                className="aa-btn-outline"
              >
                <span>{t.btn2}</span>
              </a>
            </div>
          </section>

          <section className="aa-section">
            <div className="live-feed-container">
              <div className="live-header">
                <div className="live-title">
                  <span className="live-indicator" />
                  <span>{t.liveActivity}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  <div className="live-status-text">{t.monitoring}</div>
                  <button
                    type="button"
                    onClick={() => void fetchJobs()}
                    style={{
                      background: "var(--surface2)",
                      border: "1px solid var(--border-strong)",
                      color: "var(--text-2)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    {t.refreshBtn}
                  </button>
                </div>
              </div>

              {fetchError && liveJobs.length === 0 && (
                <div
                  style={{
                    marginBottom: "1rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "8px",
                    background: "var(--amber-bg)",
                    border: "1px solid var(--amber-bdr)",
                    color: "var(--amber-l)",
                    fontSize: "0.82rem",
                  }}
                >
                  {t.errorLoad}
                </div>
              )}

              <div className="live-table-wrapper">
                <table className="live-table">
                  <thead>
                    <tr>
                      <th>{t.tableTime}</th>
                      <th>{t.tableCompany}</th>
                      <th>{t.tablePosition}</th>
                      <th>{t.tableStatus}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isFetching && liveJobs.length === 0 ? (
                      <tr>
                        <td colSpan={4} style={{ textAlign: "center", padding: "1.75rem" }}>
                          {t.connecting}
                        </td>
                      </tr>
                    ) : liveJobs.length === 0 ? (
                      <tr>
                        <td colSpan={4} style={{ textAlign: "center", padding: "1.75rem" }}>
                          {t.noActivity}
                        </td>
                      </tr>
                    ) : (
                      liveJobs.map((job) => {
                        let displayCompany = job.companyName;
                        let displayPosition = job.position;
                        if (displayCompany === "Company" && displayPosition.includes(":")) {
                          const parts = displayPosition.split(":");
                          displayCompany = parts[0].trim();
                          displayPosition = parts.slice(1).join(":").trim();
                        }
                        return (
                          <tr key={job.id}>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {new Date(job.appliedDate).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>
                            <td className="live-company">{displayCompany}</td>
                            <td className="live-position">{displayPosition}</td>
                            <td>
                              <span className={`live-badge ${job.status.toLowerCase()}`}>
                                {job.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              <div className="live-mobile-cards">
                {isFetching && liveJobs.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "1.25rem", color: "var(--muted)", fontSize: "0.82rem" }}>
                    {t.connecting}
                  </div>
                ) : liveJobs.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "1.25rem", color: "var(--muted)", fontSize: "0.82rem" }}>
                    {t.noActivity}
                  </div>
                ) : (
                  liveJobs.map((job) => {
                    let displayCompany = job.companyName;
                    let displayPosition = job.position;
                    if (displayCompany === "Company" && displayPosition.includes(":")) {
                      const parts = displayPosition.split(":");
                      displayCompany = parts[0].trim();
                      displayPosition = parts.slice(1).join(":").trim();
                    }
                    return (
                      <div className="live-mobile-item" key={`mobile-${job.id}`}>
                        <div className="live-mobile-row-top">
                          <span className="live-mobile-company">{displayCompany}</span>
                          <span className={`live-badge ${job.status.toLowerCase()}`}>
                            {job.status}
                          </span>
                        </div>
                        <div className="live-mobile-pos">{displayPosition}</div>
                        <div className="live-mobile-meta">
                          <span>
                            {new Date(job.appliedDate).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          <span>SYNCED</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <p className="aa-section-label">{t.how}</p>
            <h2 className="aa-section-title">{t.pipe}</h2>
            <p className="aa-section-desc">{t.pipeDesc}</p>

            <div className="aa-flow-grid">
              {t.steps.map((st) => (
                <div className="aa-node" key={st.step}>
                  <div>
                    <span className="aa-node-step">{st.step}</span>
                    <h4 style={{ marginTop: "0.25rem" }}>{st.title}</h4>
                  </div>
                  <p>{st.desc}</p>
                  <span className="aa-node-badge">{st.tag}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="aa-section">
            <p className="aa-section-label">{t.featLabel}</p>
            <h2 className="aa-section-title">{t.featTitle}</h2>
            <div className="aa-features-grid">
              {t.features.map((f) => (
                <div className="aa-feature" key={f.title}>
                  <span className="aa-feature-code">{f.code}</span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="subpage-ecosystem">
            <h3>{t.ecoTitle}</h3>
            <p>{t.ecoDesc}</p>
            <div className="subpage-eco-flow">
              <span className="subpage-eco-item active">{t.ecoBtn1}</span>
              <a
                href="https://jobtracker-kjmw.vercel.app/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="subpage-eco-item"
              >
                {t.ecoBtn2}
              </a>
              <Link href="/covercraft" className="subpage-eco-item">
                {t.ecoBtn3}
              </Link>
            </div>
          </div>
        </div>

        <footer className="subpage-footer">
          <div className="subpage-footer-inner">
            <div className="subpage-footer-brand">
              Gryven Alverdo Gunawan
            </div>
            <div className="subpage-footer-links">
              <Link href="/" className="subpage-footer-link">
                {lang === "en" ? "Back to Portfolio" : "Kembali ke Portofolio"}
              </Link>
              <a
                href="https://github.com/gryvnalvrdo/autoapply-flow"
                target="_blank"
                rel="noopener noreferrer"
                className="subpage-footer-link"
              >
                GitHub Repository
              </a>
            </div>
            <div className="subpage-footer-copy">© 2026 Gryven Alverdo Gunawan</div>
          </div>
        </footer>
      </div>
    </>
  );
}
