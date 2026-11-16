"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/lib/useLanguage";

interface LiveJobItem {
  id: string;
  companyName: string;
  position: string;
  status: string;
  appliedDate: string;
}

export default function AutoApplyPage() {
  const [lang, toggleLang] = useLanguage();
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
      chip: "STAGE 01: EVENT-DRIVEN INGESTION AGENT (N8N)",
      title1: "Automated 24/7 ",
      title2: "Job Discovery & Webhook Ingestion",
      desc: "An n8n automation pipeline that polls remote engineering RSS feeds every 6 hours, filters listings via a JavaScript keyword matcher, deduplicates entries, and ingests matched jobs into JobTrail via authenticated HTTP POST webhooks.",
      btn1: "Download workflow.json",
      btn2: "Open JobTrail Public Board",
      how: "SECTION 01: PIPELINE ARCHITECTURE",
      pipe: "6-Node Execution Topology",
      pipeDesc:
        "Every 6 hours, the workflow executes autonomously, streaming filtered opportunities from RSS sources into your JobTrail PostgreSQL database and Telegram.",
      tableTime: "Timestamp",
      tableCompany: "Company",
      tablePosition: "Position Ingested",
      tableStatus: "State",
      monitoring: "CACHED TELEMETRY (60S)",
      liveActivity: "Live Agent Telemetry (JobTrail Public API)",
      connecting: "Connecting to JobTrail telemetry endpoint...",
      noActivity: "No recent automated ingestions.",
      errorLoad: "Telemetry service is temporarily unreachable. Showing cached or fallback state.",
      refreshBtn: "Refresh",

      flow1Title: "Schedule Trigger",
      flow1Desc: "Executes every 6 hours autonomously",
      flow1Badge: "Cron (6h)",
      flow1Conn: "triggers",
      flow2Title: "Parallel RSS Fetch",
      flow2Desc: "WeWorkRemotely Programming & Back-End feeds",
      flow2Badge: "RSS Read",
      flow2Conn: "raw items",
      flow3Title: "Keyword Filter",
      flow3Desc: "Matches Software Engineer, Next.js, Python, Full-Stack",
      flow3Badge: "JS Code Node",
      flow3Conn: "matched",
      flow4Title: "Ingest to JobTrail",
      flow4Desc: "POST /api/auto-apply (X-AutoApply-Secret)",
      flow4Badge: "HTTP Webhook",
      flow4Conn: "alert",
      flow5Title: "Telegram Push",
      flow5Desc: "Instant Markdown alert per new listing",
      flow5Badge: "Telegram API",

      featLabel: "SECTION 02: CAPABILITIES",
      featTitle: "Engineering Specifications",
      features: [
        {
          code: "INGEST",
          title: "Parallel Multi-Feed Polling",
          desc: "Simultaneously reads Remote Programming and Back-End RSS streams every 6 hours without manual intervention.",
        },
        {
          code: "FILTER",
          title: "JavaScript Code Node Matching",
          desc: "Evaluates job titles against configurable engineering keywords (Next.js, Python, TypeScript, Full-Stack, Backend).",
        },
        {
          code: "WEBHOOK",
          title: "Authenticated JobTrail Ingestion",
          desc: "Pushes structured JSON payloads to JobTrail via HTTP POST secured by the X-AutoApply-Secret header.",
        },
        {
          code: "DEDUP",
          title: "Idempotent Database Deduplication",
          desc: "Backed by Prisma $transaction and the ProcessedJob table so previously seen jobs are never duplicated across runs.",
        },
        {
          code: "NOTIFY",
          title: "Telegram Markdown Alerts",
          desc: "Dispatches formatted push notifications with company, role, and direct application URL.",
        },
        {
          code: "CONFIG",
          title: "Environment-Driven Setup",
          desc: "All secrets, target URLs, and Telegram chat IDs are externalized as environment variables.",
        },
      ],

      quickLabel: "SECTION 03: DEPLOYMENT",
      quickTitle: "Self-Host or Import in n8n",
      quickDesc:
        "Import workflow.json into any n8n instance and configure the environment variables below.",
      comment1: "# 1. Clone the repository",
      comment2:
        "# 2. Import workflow.json into n8n\n#    n8n > Workflows > Import from File > workflow.json",
      comment3: "# 3. Configure environment variables",
      comment4: "# 4. Activate workflow schedule trigger",
      thVar: "Environment Variable",
      thDesc: "Purpose",
      envVars: [
        ["JOBTRAIL_API_URL", "Target JobTrail endpoint (https://jobtracker-kjmw.vercel.app/api/auto-apply)"],
        ["AUTOAPPLY_SECRET", "Shared secret validated against X-AutoApply-Secret header"],
        ["TELEGRAM_BOT_TOKEN", "Telegram Bot token issued by @BotFather"],
        ["TELEGRAM_CHAT_ID", "Destination Telegram chat ID for instant alerts"],
        ["KEYWORDS", "Comma-separated role & stack keywords for filtering"],
      ],

      ecoTitle: "Connected Job Hunting Suite",
      ecoDesc:
        "AutoApply Flow is Stage 01 of the pipeline, ingesting listings into JobTrail (Stage 02), which deep-links into CoverCraft (Stage 03).",
      ecoBtn1: "01: AutoApply Flow",
      ecoBtn2: "02: JobTrail SaaS",
      ecoBtn3: "03: CoverCraft AI",
    },
    id: {
      back: "Portofolio",
      chip: "TAHAP 01: AGEN INGESTI OTOMATIS (N8N)",
      title1: "Otomasi 24/7 ",
      title2: "Penemuan Loker & Ingesti Webhook",
      desc: "Pipeline otomasi n8n yang memantau feed RSS lowongan engineering setiap 6 jam, menyaring posisi melalui JavaScript Code Node, mencegah duplikasi data, dan mengirim loker yang cocok ke JobTrail melalui webhook HTTP POST terautentikasi.",
      btn1: "Unduh workflow.json",
      btn2: "Buka Live Board JobTrail",
      how: "BAGIAN 01: ARSITEKTUR PIPELINE",
      pipe: "Topologi Eksekusi 6-Node",
      pipeDesc:
        "Setiap 6 jam, alur kerja berjalan mandiri, mengalirkan lowongan yang relevan dari sumber RSS langsung ke database PostgreSQL JobTrail dan Telegram.",
      tableTime: "Waktu",
      tableCompany: "Perusahaan",
      tablePosition: "Posisi Terdeteksi",
      tableStatus: "Status",
      monitoring: "TELEMETRI CACHE (60D)",
      liveActivity: "Telemetri Agen Live (JobTrail Public API)",
      connecting: "Menghubungkan ke endpoint telemetri JobTrail...",
      noActivity: "Belum ada aktivitas ingesti terbaru.",
      errorLoad: "Layanan telemetri sementara tidak dapat dijangkau.",
      refreshBtn: "Muat Ulang",

      flow1Title: "Pemicu Jadwal",
      flow1Desc: "Berjalan otomatis setiap 6 jam",
      flow1Badge: "Cron (6 Jam)",
      flow1Conn: "memicu",
      flow2Title: "Ambil RSS Paralel",
      flow2Desc: "Feed WeWorkRemotely Programming & Back-End",
      flow2Badge: "RSS Read",
      flow2Conn: "data mentah",
      flow3Title: "Filter Kata Kunci",
      flow3Desc: "Mencocokkan Software Engineer, Next.js, Python, Full-Stack",
      flow3Badge: "JS Code Node",
      flow3Conn: "cocok",
      flow4Title: "Kirim ke JobTrail",
      flow4Desc: "POST /api/auto-apply (X-AutoApply-Secret)",
      flow4Badge: "HTTP Webhook",
      flow4Conn: "notifikasi",
      flow5Title: "Notifikasi Telegram",
      flow5Desc: "Pesan instan Markdown untuk tiap loker baru",
      flow5Badge: "Telegram API",

      featLabel: "BAGIAN 02: KAPABILITAS",
      featTitle: "Spesifikasi Teknis",
      features: [
        {
          code: "INGEST",
          title: "Pemantauan Multi-Feed Paralel",
          desc: "Membaca stream RSS Remote Programming dan Back-End secara bersamaan setiap 6 jam tanpa intervensi manual.",
        },
        {
          code: "FILTER",
          title: "Penyaringan JavaScript Code Node",
          desc: "Mengevaluasi judul lowongan terhadap kata kunci stack (Next.js, Python, TypeScript, Full-Stack, Backend).",
        },
        {
          code: "WEBHOOK",
          title: "Ingesti Terautentikasi ke JobTrail",
          desc: "Mengirim payload JSON terstruktur ke JobTrail melalui HTTP POST yang diamankan header X-AutoApply-Secret.",
        },
        {
          code: "DEDUP",
          title: "Deduplikasi Database Idempoten",
          desc: "Didukung transaksi Prisma $transaction dan tabel ProcessedJob agar lowongan yang pernah diproses tidak pernah ganda.",
        },
        {
          code: "NOTIFY",
          title: "Peringatan Markdown Telegram",
          desc: "Mengirimkan notifikasi push berisi nama perusahaan, posisi, dan tautan langsung.",
        },
        {
          code: "CONFIG",
          title: "Konfigurasi Berbasis Environment",
          desc: "Seluruh kunci rahasia, URL endpoint, dan ID Telegram dikelola via environment variables.",
        },
      ],

      quickLabel: "BAGIAN 03: DEPLOYMENT",
      quickTitle: "Impor & Jalankan di n8n",
      quickDesc:
        "Impor file workflow.json ke instans n8n Anda dan atur variabel environment di bawah ini.",
      comment1: "# 1. Clone repositori",
      comment2:
        "# 2. Impor workflow.json ke n8n\n#    n8n > Workflows > Import from File > workflow.json",
      comment3: "# 3. Atur environment variables",
      comment4: "# 4. Aktifkan trigger jadwal workflow",
      thVar: "Variabel Environment",
      thDesc: "Fungsi",
      envVars: [
        ["JOBTRAIL_API_URL", "Endpoint JobTrail tujuan (https://jobtracker-kjmw.vercel.app/api/auto-apply)"],
        ["AUTOAPPLY_SECRET", "Kunci rahasia yang divalidasi terhadap header X-AutoApply-Secret"],
        ["TELEGRAM_BOT_TOKEN", "Token bot dari @BotFather di Telegram"],
        ["TELEGRAM_CHAT_ID", "ID chat Telegram untuk menerima notifikasi"],
        ["KEYWORDS", "Kata kunci posisi & teknologi dipisahkan koma"],
      ],

      ecoTitle: "Ekosistem Job Hunting Suite",
      ecoDesc:
        "AutoApply Flow adalah Tahap 01 dari pipeline, mengirimkan lowongan ke JobTrail (Tahap 02), yang kemudian terhubung ke CoverCraft (Tahap 03).",
      ecoBtn1: "01: AutoApply Flow",
      ecoBtn2: "02: JobTrail SaaS",
      ecoBtn3: "03: CoverCraft AI",
    },
  }[lang];

  return (
    <>
      <style>{`
        .aa-body { background: var(--bg); color: var(--text); font-family: var(--font-sans); min-height: 100vh; }
        .aa-container { max-width: 1000px; margin: 0 auto; padding: 0 1.5rem; position: relative; z-index: 1; }
        .aa-hero { padding: 3.5rem 0 2.5rem; text-align: center; }
        .aa-chip { display: inline-flex; align-items: center; gap: .45rem; background: var(--emerald-bg); border: 1px solid var(--emerald-bdr); border-radius: 6px; padding: .32rem .8rem; font-family: var(--font-mono); font-size: .72rem; color: var(--emerald-l); font-weight: 700; margin-bottom: 1.15rem; }
        .aa-hero h1 { font-family: var(--font-display); font-size: clamp(1.9rem, 4.5vw, 2.85rem); font-weight: 700; line-height: 1.12; margin-bottom: .85rem; color: var(--text); letter-spacing: -0.025em; }
        .aa-hero h1 span { color: var(--emerald-l); }
        .aa-hero p { color: var(--muted); font-size: .96rem; max-width: 640px; margin: 0 auto 1.75rem; line-height: 1.7; }
        .aa-hero-actions { display: flex; justify-content: center; gap: .75rem; flex-wrap: wrap; }
        .aa-btn-primary { display: inline-flex; align-items: center; gap: .5rem; padding: .75rem 1.4rem; min-height: 44px; background: var(--emerald); border: none; border-radius: 9px; color: #04130d; font-family: var(--font-display); font-size: .88rem; font-weight: 700; text-decoration: none; transition: all .2s; cursor: pointer; }
        .aa-btn-primary:hover { background: var(--emerald-l); transform: translateY(-1px); }
        .aa-btn-outline { display: inline-flex; align-items: center; gap: .5rem; padding: .75rem 1.4rem; min-height: 44px; background: var(--surface); border: 1px solid var(--border-strong); border-radius: 9px; color: var(--text); font-family: var(--font-display); font-size: .88rem; font-weight: 600; text-decoration: none; transition: all .2s; }
        .aa-btn-outline:hover { background: var(--surface2); border-color: var(--emerald-bdr); color: var(--emerald-l); }
        .aa-section { padding: 3rem 0; }
        .aa-section + .aa-section { border-top: 1px solid var(--border); }
        .aa-section-label { font-family: var(--font-mono); font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--emerald-l); margin-bottom: .45rem; }
        .aa-section-title { font-family: var(--font-display); font-size: clamp(1.45rem, 3vw, 1.95rem); font-weight: 700; line-height: 1.2; margin-bottom: .6rem; color: var(--text); }
        .aa-section-desc { color: var(--muted); font-size: .9rem; line-height: 1.7; max-width: 640px; margin-bottom: 2rem; }

        .aa-flow { display: flex; align-items: stretch; justify-content: center; flex-wrap: wrap; gap: 0; margin: 2rem 0; }
        .aa-node { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.15rem 1rem; text-align: left; width: 162px; flex-shrink: 0; display: flex; flex-direction: column; justify-content: space-between; gap: .4rem; }
        .aa-node.highlight { border-color: var(--emerald); background: linear-gradient(180deg, rgba(16,185,129,0.1) 0%, var(--surface) 100%); }
        .aa-node-step { font-family: var(--font-mono); font-size: .68rem; font-weight: 700; color: var(--emerald-l); }
        .aa-node h4 { font-family: var(--font-display); font-size: .88rem; font-weight: 700; color: var(--text); }
        .aa-node p { font-size: .74rem; color: var(--muted); line-height: 1.4; }
        .aa-node-badge { display: inline-block; width: fit-content; margin-top: .35rem; padding: .15rem .48rem; border-radius: 5px; font-family: var(--font-mono); font-size: .64rem; font-weight: 600; background: var(--surface2); color: var(--text-2); border: 1px solid var(--border); }
        .aa-node.highlight .aa-node-badge { background: var(--emerald); color: #04130d; border-color: var(--emerald); font-weight: 700; }
        .aa-connect { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0 .3rem; gap: .15rem; flex-shrink: 0; }
        .aa-connect-line { width: 26px; height: 2px; background: var(--border-strong); }
        .aa-connect-label { font-family: var(--font-mono); font-size: .58rem; color: var(--muted-2); white-space: nowrap; }
        @media (max-width: 900px) {
          .aa-flow { flex-direction: column; align-items: center; }
          .aa-node { width: 100%; max-width: 360px; }
          .aa-connect { padding: .25rem 0; }
          .aa-connect-line { width: 2px; height: 18px; }
        }

        .aa-features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: .9rem; }
        .aa-feature { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem; }
        .aa-feature-code { font-family: var(--font-mono); font-size: .68rem; font-weight: 700; color: var(--emerald-l); background: var(--emerald-bg); border: 1px solid var(--emerald-bdr); padding: .15rem .45rem; border-radius: 5px; display: inline-block; margin-bottom: .6rem; }
        .aa-feature h3 { font-family: var(--font-display); font-size: .95rem; font-weight: 700; margin-bottom: .35rem; color: var(--text); }
        .aa-feature p { font-size: .83rem; color: var(--muted); line-height: 1.55; }

        .aa-code-block { background: #0d121d; border: 1px solid var(--border-strong); border-radius: 12px; padding: 1.15rem 1.35rem; font-family: var(--font-mono); font-size: .78rem; color: var(--text-2); overflow-x: auto; line-height: 1.7; }
        .aa-code-block .comment { color: var(--muted-2); }
        .aa-code-block .key { color: var(--indigo-l); }
        .aa-code-block .str { color: var(--emerald-l); }

        .aa-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        .aa-table th { text-align: left; padding: .65rem 1rem; font-family: var(--font-mono); font-size: .74rem; font-weight: 600; color: var(--muted); border-bottom: 1px solid var(--border); }
        .aa-table td { padding: .65rem 1rem; font-size: .83rem; border-bottom: 1px solid var(--border); }
        .aa-table td:first-child { font-family: var(--font-mono); font-size: .76rem; color: var(--emerald-l); }
        .aa-table td:last-child { color: var(--muted); }

        .live-feed-container { background: var(--surface); border: 1px solid var(--emerald-bdr); border-radius: 14px; padding: 1.35rem; margin-bottom: 3rem; }
        .live-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px solid var(--border); padding-bottom: .85rem; flex-wrap: wrap; gap: .5rem; }
        .live-title { font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: var(--text); display: flex; align-items: center; gap: 0.5rem; }
        .live-indicator { display: inline-block; width: 8px; height: 8px; background-color: var(--emerald); border-radius: 50%; box-shadow: 0 0 8px var(--emerald); animation: pulse-green 2s infinite; }
        .live-status-text { font-family: var(--font-mono); font-size: 0.7rem; color: var(--emerald-l); font-weight: 700; letter-spacing: 0.06em; }
        .live-table-wrapper { display: block; overflow-x: auto; }
        .live-table { width: 100%; min-width: 500px; border-collapse: collapse; font-family: var(--font-mono); font-size: 0.78rem; }
        .live-table th { text-align: left; padding: 0.65rem 0.85rem; color: var(--muted); font-weight: 600; border-bottom: 1px solid var(--border); }
        .live-table td { padding: 0.8rem 0.85rem; color: var(--text-2); border-bottom: 1px solid var(--border); }
        .live-company { color: var(--text); font-weight: 600; font-family: var(--font-sans); }
        .live-position { color: var(--emerald-l); }
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
          .live-mobile-pos { font-family: var(--font-mono); font-size: 0.78rem; color: var(--emerald-l); }
          .live-mobile-meta { display: flex; align-items: center; justify-content: space-between; font-family: var(--font-mono); font-size: 0.68rem; color: var(--muted); margin-top: 0.2rem; padding-top: 0.35rem; border-top: 1px dashed var(--border); }
          .aa-table thead { display: none; }
          .aa-table, .aa-table tbody, .aa-table tr, .aa-table td { display: block; width: 100%; }
          .aa-table tr { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 0.75rem; margin-bottom: 0.55rem; }
          .aa-table td { padding: 0.15rem 0; border: none; }
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
              <span style={{ color: "var(--emerald-l)" }}>01</span>
              <span>AutoApply Flow</span>
            </div>

            <div className="site-nav-right">
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
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.76rem",
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
                          <span>WEBHOOK INGESTED</span>
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

            <div className="aa-flow">
              <div className="aa-node">
                <span className="aa-node-step">NODE 01</span>
                <h4>{t.flow1Title}</h4>
                <p>{t.flow1Desc}</p>
                <span className="aa-node-badge">{t.flow1Badge}</span>
              </div>
              <div className="aa-connect">
                <div className="aa-connect-line" />
                <span className="aa-connect-label">{t.flow1Conn}</span>
              </div>
              <div className="aa-node">
                <span className="aa-node-step">NODE 02</span>
                <h4>{t.flow2Title}</h4>
                <p>{t.flow2Desc}</p>
                <span className="aa-node-badge">{t.flow2Badge}</span>
              </div>
              <div className="aa-connect">
                <div className="aa-connect-line" />
                <span className="aa-connect-label">{t.flow2Conn}</span>
              </div>
              <div className="aa-node">
                <span className="aa-node-step">NODE 03</span>
                <h4>{t.flow3Title}</h4>
                <p>{t.flow3Desc}</p>
                <span className="aa-node-badge">{t.flow3Badge}</span>
              </div>
              <div className="aa-connect">
                <div className="aa-connect-line" />
                <span className="aa-connect-label">{t.flow3Conn}</span>
              </div>
              <div className="aa-node highlight">
                <span className="aa-node-step">NODE 04</span>
                <h4>{t.flow4Title}</h4>
                <p>{t.flow4Desc}</p>
                <span className="aa-node-badge">{t.flow4Badge}</span>
              </div>
              <div className="aa-connect">
                <div className="aa-connect-line" />
                <span className="aa-connect-label">{t.flow4Conn}</span>
              </div>
              <div className="aa-node">
                <span className="aa-node-step">NODE 05</span>
                <h4>{t.flow5Title}</h4>
                <p>{t.flow5Desc}</p>
                <span className="aa-node-badge">{t.flow5Badge}</span>
              </div>
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

          <section className="aa-section">
            <p className="aa-section-label">{t.quickLabel}</p>
            <h2 className="aa-section-title">{t.quickTitle}</h2>
            <p className="aa-section-desc">{t.quickDesc}</p>

            <div className="aa-code-block">
              <span className="comment">{t.comment1}</span>
              {"\n"}git clone https://github.com/gryvnalvrdo/autoapply-flow{"\n\n"}
              <span className="comment">{t.comment2}</span>
              {"\n\n"}
              <span className="comment">{t.comment3}</span>
              {"\n"}
              <span className="key">JOBTRAIL_API_URL</span>=
              <span className="str">https://jobtracker-kjmw.vercel.app/api/auto-apply</span>
              {"\n"}
              <span className="key">AUTOAPPLY_SECRET</span>=
              <span className="str">your-secret-key</span>
              {"\n"}
              <span className="key">TELEGRAM_BOT_TOKEN</span>=
              <span className="str">your-bot-token</span>
              {"\n"}
              <span className="key">TELEGRAM_CHAT_ID</span>=
              <span className="str">your-chat-id</span>
              {"\n\n"}
              <span className="comment">{t.comment4}</span>
            </div>

            <table className="aa-table">
              <thead>
                <tr>
                  <th>{t.thVar}</th>
                  <th>{t.thDesc}</th>
                </tr>
              </thead>
              <tbody>
                {t.envVars.map(([k, v]) => (
                  <tr key={k}>
                    <td>{k}</td>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              Gryven Alverdo Gunawan<span style={{ color: "var(--amber)" }}>.</span>
            </div>
            <p className="subpage-footer-desc">
              {lang === "en"
                ? "Full-Stack Software Engineer: Next.js, Laravel, and AI Automation Pipelines."
                : "Full-Stack Software Engineer: Next.js, Laravel, dan Pipeline Otomasi AI."}
            </p>
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
            <div className="subpage-footer-copy">
              © 2026 Gryven Alverdo Gunawan
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
