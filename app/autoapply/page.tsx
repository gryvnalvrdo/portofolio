"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function AutoApplyPage() {
  const [lang, setLang] = useState("en");
  const [liveJobs, setLiveJobs] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("https://jobtracker-kjmw.vercel.app/api/public/jobs");
        const data = await res.json();
        if (data.success && data.jobs) {
          setLiveJobs(data.jobs);
        }
      } catch (err) {
        console.error("Failed to fetch live jobs:", err);
      } finally {
        setIsFetching(false);
      }
    };
    
    fetchJobs();
    const interval = setInterval(fetchJobs, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "id" || saved === "en") setLang(saved);
  }, []);

  const toggleLang = () => {
    const next = lang === "en" ? "id" : "en";
    setLang(next);
    localStorage.setItem("lang", next);
  };

  const t = {
    en: {
      back: "← Back to Portfolio",
      chip: "🤖 n8n Workflow · Open Source · Import Ready",
      title1: "Automate Your ",
      title2: "Job Discovery",
      desc: "An n8n workflow that monitors LinkedIn, Glints, and Kalibrr every 6 hours, filters jobs by your criteria, and automatically adds matching listings to JobTrail so you never miss a relevant opportunity.",
      btn1: "📥 Download Workflow JSON",
      btn2: "View in JobTrail ↗",
      how: "How It Works",
      pipe: "The Automation Pipeline",
      pipeDesc: "Every 6 hours, the workflow runs automatically. Jobs flow from discovery to your JobTrail dashboard without you lifting a finger.",
      tableTime: "Time",
      tableCompany: "Company",
      tablePosition: "Position Found",
      tableStatus: "Status",
      monitoring: "Monitoring 24/7",
      liveActivity: "Live Agent Activity",
      connecting: "Connecting to agent...",
      noActivity: "No recent activity.",
      scrollHint: "⇄ Scroll horizontally to view full feed",
      
      flow1Title: "Schedule Trigger",
      flow1Desc: "Runs every 6 hours automatically",
      flow1Badge: "Cron",
      flow1Conn: "triggers",
      flow2Title: "Fetch Jobs",
      flow2Desc: "LinkedIn RSS + Glints + Kalibrr APIs",
      flow2Badge: "HTTP Request",
      flow2Conn: "raw data",
      flow3Title: "Filter Jobs",
      flow3Desc: "Keywords, location, salary range",
      flow3Badge: "Code Node",
      flow3Conn: "matched",
      flow4Title: "Add to JobTrail",
      flow4Desc: "POST to JobTrail API endpoint",
      flow4Badge: "API Integration",
      flow4Conn: "notify",
      flow5Title: "Telegram Alert",
      flow5Desc: "Instant notification for each new job",
      flow5Badge: "Telegram Bot",

      featLabel: "Features",
      featTitle: "What the Workflow Does",
      features: [
        { icon: "🔄", title: "Multi-Source Monitoring", desc: "Simultaneously monitors LinkedIn RSS feed, Glints, and Kalibrr every 6 hours for new listings." },
        { icon: "🎯", title: "Smart Keyword Filtering", desc: "Filters jobs by configurable keywords (Next.js, Python, TypeScript, etc.) and location (Indonesia + Remote)." },
        { icon: "🔗", title: "JobTrail Integration", desc: "Automatically sends matched jobs to JobTrail via HTTP POST and displays them in your dashboard instantly." },
        { icon: "📱", title: "Telegram Notifications", desc: "Sends a formatted Telegram message for every new match with job title, company, and direct link." },
        { icon: "🔁", title: "Deduplication", desc: "Tracks job URLs already added to prevent duplicate entries in JobTrail across runs." },
        { icon: "⚙️", title: "Easy Configuration", desc: "All settings (keywords, location, API endpoints) are environment variables with no code changes needed." },
      ],

      quickLabel: "Quick Start",
      quickTitle: "Deploy in 10 Minutes",
      quickDesc: "Import the workflow JSON into any n8n instance (cloud or self-hosted) and set your environment variables.",
      comment1: "# 1. Clone the repo",
      comment2: "# 2. Import workflow.json into n8n\n#    n8n → Workflows → Import → Select workflow.json",
      comment3: "# 3. Set environment variables in n8n",
      comment4: "# 4. Activate the workflow and watch jobs flow in!",
      thVar: "Variable",
      thDesc: "Description",
      envVars: [
        ["JOBTRAIL_API_URL", "Your JobTrail deployment URL + /api/auto-apply"],
        ["AUTOAPPLY_SECRET", "Secret key to authenticate the incoming webhook"],
        ["TELEGRAM_BOT_TOKEN", "From @BotFather on Telegram (optional)"],
        ["TELEGRAM_CHAT_ID", "Your Telegram chat ID for notifications (optional)"],
        ["KEYWORDS", "Comma-separated job keywords to filter by"],
      ],

      ecoTitle: "🔗 Part of the Job Hunting Suite",
      ecoDesc: "AutoApply Flow feeds job listings directly into JobTrail, which then connects to CoverCraft for AI-generated cover letters. Three tools, one seamless pipeline.",
      ecoBtn1: "🤖 AutoApply Flow",
      ecoBtn2: "📋 JobTrail",
      ecoBtn3: "✨ CoverCraft",
      ecoBtn4: "🎯 You Get Hired",
      footerBuilt: "Built by",
      footerPart: "Part of the Job Hunting Suite"
    },
    id: {
      back: "← Kembali ke Portofolio",
      chip: "🤖 Workflow n8n · Open Source · Siap Pakai",
      title1: "Otomatisasi ",
      title2: "Pencarian Loker",
      desc: "Alur kerja n8n yang memantau LinkedIn, Glints, dan Kalibrr setiap 6 jam, memfilter loker sesuai kriteria Anda, dan otomatis menambahkannya ke JobTrail agar tidak ada peluang yang terlewat.",
      btn1: "📥 Unduh Workflow JSON",
      btn2: "Lihat di JobTrail ↗",
      how: "Cara Kerjanya",
      pipe: "Pipa Otomatisasi",
      pipeDesc: "Setiap 6 jam, alur kerja berjalan otomatis. Lowongan pekerjaan mengalir dari penemuan hingga ke dasbor JobTrail Anda tanpa perlu repot.",
      tableTime: "Waktu",
      tableCompany: "Perusahaan",
      tablePosition: "Posisi Ditemukan",
      tableStatus: "Status",
      monitoring: "Memantau 24/7",
      liveActivity: "Aktivitas Live Agent",
      connecting: "Menghubungkan ke agent...",
      noActivity: "Tidak ada aktivitas terbaru.",
      scrollHint: "⇄ Geser secara horizontal untuk melihat data lengkap",

      flow1Title: "Pemicu Jadwal",
      flow1Desc: "Berjalan otomatis setiap 6 jam",
      flow1Badge: "Cron",
      flow1Conn: "memicu",
      flow2Title: "Ambil Lowongan",
      flow2Desc: "API LinkedIn RSS + Glints + Kalibrr",
      flow2Badge: "HTTP Request",
      flow2Conn: "data mentah",
      flow3Title: "Filter Lowongan",
      flow3Desc: "Kata kunci, lokasi, rentang gaji",
      flow3Badge: "Code Node",
      flow3Conn: "cocok",
      flow4Title: "Kirim ke JobTrail",
      flow4Desc: "POST ke endpoint API JobTrail",
      flow4Badge: "Integrasi API",
      flow4Conn: "notifikasi",
      flow5Title: "Notifikasi Telegram",
      flow5Desc: "Pemberitahuan instan untuk setiap loker baru",
      flow5Badge: "Bot Telegram",

      featLabel: "Fitur",
      featTitle: "Cara Kerja Alur Otomasi",
      features: [
        { icon: "🔄", title: "Pemantauan Multi Sumber", desc: "Secara bersamaan memantau feed RSS LinkedIn, Glints, dan Kalibrr setiap 6 jam untuk lowongan baru." },
        { icon: "🎯", title: "Filter Kata Kunci Cerdas", desc: "Memfilter loker berdasarkan kata kunci yang dapat diatur (Next.js, Python, TypeScript, dll.) dan lokasi (Indonesia + Remote)." },
        { icon: "🔗", title: "Integrasi JobTrail", desc: "Secara otomatis mengirimkan loker yang cocok ke JobTrail via HTTP POST dan langsung tampil di dasbor Anda." },
        { icon: "📱", title: "Notifikasi Telegram", desc: "Mengirim pesan Telegram terformat untuk setiap lowongan baru lengkap dengan judul, perusahaan, dan tautan langsung." },
        { icon: "🔁", title: "Pencegahan Duplikasi", desc: "Melacak URL pekerjaan yang sudah ditambahkan agar tidak ada data ganda di JobTrail." },
        { icon: "⚙️", title: "Konfigurasi Mudah", desc: "Semua pengaturan (kata kunci, lokasi, endpoint API) berupa environment variables tanpa perlu ubah kode." },
      ],

      quickLabel: "Mulai Cepat",
      quickTitle: "Pasang dalam 10 Menit",
      quickDesc: "Impor file JSON alur kerja ke instans n8n mana pun (cloud atau self-hosted) dan atur environment variables Anda.",
      comment1: "# 1. Clone repositori",
      comment2: "# 2. Impor workflow.json ke n8n\n#    n8n → Workflows → Import → Pilih workflow.json",
      comment3: "# 3. Pasang environment variables di n8n",
      comment4: "# 4. Aktifkan alur kerja dan amati lowongan masuk otomatis!",
      thVar: "Variabel",
      thDesc: "Deskripsi",
      envVars: [
        ["JOBTRAIL_API_URL", "URL deployment JobTrail Anda + /api/auto-apply"],
        ["AUTOAPPLY_SECRET", "Kunci rahasia untuk autentikasi webhook yang masuk"],
        ["TELEGRAM_BOT_TOKEN", "Dari @BotFather di Telegram (opsional)"],
        ["TELEGRAM_CHAT_ID", "ID obrolan Telegram Anda untuk notifikasi (opsional)"],
        ["KEYWORDS", "Kata kunci pekerjaan dipisahkan koma untuk filter"],
      ],

      ecoTitle: "🔗 Bagian dari Job Hunting Suite",
      ecoDesc: "AutoApply Flow menyalurkan lowongan kerja langsung ke JobTrail, yang kemudian terhubung ke CoverCraft untuk membuat cover letter berbasis AI. Tiga alat, satu alur kerja terpadu.",
      ecoBtn1: "🤖 AutoApply Flow",
      ecoBtn2: "📋 JobTrail",
      ecoBtn3: "✨ CoverCraft",
      ecoBtn4: "🎯 Anda Diterima",
      footerBuilt: "Dibuat oleh",
      footerPart: "Bagian dari Job Hunting Suite"
    }
  }[lang as "en" | "id"];

  return (
    <>
      <style>{`
        .aa-body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; min-height: 100vh; }
        .aa-container { max-width:1000px; margin:0 auto; padding:0 1.5rem; position:relative; z-index:1; }
        .aa-hero { padding:4rem 0 3rem; text-align:center; }
        .aa-chip { display:inline-flex; align-items:center; gap:.45rem; background:var(--surface2); border:1px solid var(--border); border-radius:100px; padding:.35rem 1rem; font-size:.78rem; color:var(--text); font-weight:500; margin-bottom:1.25rem; }
        .aa-hero h1 { font-family:'Space Grotesk',sans-serif; font-size:clamp(2rem,5vw,3rem); font-weight:700; line-height:1.1; margin-bottom:.9rem; color:var(--text); }
        .aa-hero p { color:var(--muted); font-size:1rem; max-width:580px; margin:0 auto 2rem; line-height:1.75; }
        .aa-hero-actions { display:flex; justify-content:center; gap:1rem; flex-wrap:wrap; }
        .aa-btn-primary { display:inline-flex; align-items:center; gap:.5rem; padding:.8rem 1.6rem; background:linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border:none; border-radius:8px; color:#ffffff; font-family:'Space Grotesk',sans-serif; font-size:.9rem; font-weight:600; text-decoration:none; transition:all .2s; cursor:pointer; box-shadow:0 4px 14px -2px rgba(217, 119, 6, 0.35); }
        .aa-btn-primary:hover { transform:translateY(-1px); box-shadow:0 8px 22px -4px rgba(217, 119, 6, 0.5); color:#ffffff; }
        .aa-btn-outline { display:inline-flex; align-items:center; gap:.5rem; padding:.8rem 1.6rem; background:#ffffff; border:1px solid rgba(15,23,42,0.12); border-radius:8px; color:var(--text); font-family:'Space Grotesk',sans-serif; font-size:.9rem; font-weight:600; text-decoration:none; transition:all .2s; box-shadow:0 2px 6px rgba(0,0,0,0.03); }
        .aa-btn-outline:hover { background:var(--surface2); border-color:var(--border-hover); color:#b45309; }
        .aa-section { padding:3.5rem 0; }
        .aa-section + .aa-section { border-top:1px solid var(--border); }
        .aa-section-label { font-size:.68rem; font-weight:600; text-transform:uppercase; letter-spacing:.18em; color:var(--muted); margin-bottom:.65rem; display:flex; align-items:center; gap:.5rem; }
        .aa-section-label::after { content:''; flex:1; height:1px; background:var(--border); max-width:60px; }
        .aa-section-title { font-family:'Space Grotesk',sans-serif; font-size:clamp(1.5rem,3vw,2rem); font-weight:700; line-height:1.2; margin-bottom:.75rem; color:var(--text); }
        .aa-section-desc { color:var(--muted); font-size:.9rem; line-height:1.75; max-width:620px; margin-bottom:2.5rem; }

        /* WORKFLOW DIAGRAM */
        .aa-flow { display:flex; align-items:center; justify-content:center; flex-wrap:wrap; gap:0; margin:2.5rem 0; }
        .aa-node { background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:1.5rem 1.25rem; text-align:center; width:160px; flex-shrink:0; position:relative; transition:all .2s; }
        .aa-node:hover { border-color:var(--border-hover); transform:translateY(-2px); }
        .aa-node-icon { font-size:1.75rem; display:block; margin-bottom:.5rem; }
        .aa-node h4 { font-family:'Inter',sans-serif; font-size:.85rem; font-weight:600; margin-bottom:.3rem; color:var(--text); }
        .aa-node p { font-size:.75rem; color:var(--muted); line-height:1.4; }
        .aa-node-badge { display:inline-block; margin-top:.6rem; padding:.15rem .5rem; border-radius:6px; font-size:.65rem; font-weight:600; background:var(--surface2); color:var(--text); border:1px solid var(--border); }
        .aa-node.highlight { border-color:var(--primary); }
        .aa-node.highlight .aa-node-badge { background:var(--primary); color:#ffffff; border-color:var(--primary); }
        .aa-connect { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:0 .35rem; gap:.15rem; flex-shrink:0; }
        .aa-connect-line { width:32px; height:2px; background:var(--border); position:relative; }
        .aa-connect-line::after { content:''; position:absolute; right:-1px; top:50%; transform:translateY(-50%); width:0; height:0; border-left:5px solid var(--border); border-top:3px solid transparent; border-bottom:3px solid transparent; }
        .aa-connect-label { font-size:.6rem; color:var(--muted); white-space:nowrap; text-align:center; }
        @media (max-width:900px) { .aa-flow { flex-direction:column; align-items:center; } .aa-connect { flex-direction:column; padding:.35rem 0; } .aa-connect-line { width:2px; height:24px; background:var(--border); } .aa-connect-line::after { right:50%; top:auto; bottom:-1px; transform:translateX(50%); border-left:3px solid transparent; border-right:3px solid transparent; border-top:5px solid var(--border); border-bottom:none; } }

        /* FEATURES */
        .aa-features-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:1rem; }
        .aa-feature { background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:1.4rem; transition:border-color .2s; }
        .aa-feature:hover { border-color:var(--border-hover); }
        .aa-feature-icon { font-size:1.5rem; margin-bottom:.75rem; display:block; }
        .aa-feature h3 { font-family:'Inter',sans-serif; font-size:.95rem; font-weight:600; margin-bottom:.4rem; color:var(--text); }
        .aa-feature p { font-size:.85rem; color:var(--muted); line-height:1.6; }

        /* CODE BLOCK */
        .aa-code-block { background:#1e293b; border:1px solid var(--border); border-radius:12px; padding:1.25rem 1.5rem; font-family:'Courier New',monospace; font-size:.85rem; color:#e2e8f0; overflow-x:auto; line-height:1.7; }
        .aa-code-block .comment { color:#94a3b8; }
        .aa-code-block .key { color:#a5b4fc; }
        .aa-code-block .val { color:#fbbf24; }
        .aa-code-block .str { color:#34d399; }

        /* ENV VARS TABLE */
        .aa-table { width:100%; border-collapse:collapse; margin-top:1rem; }
        .aa-table th { text-align:left; padding:.65rem 1rem; font-size:.8rem; font-weight:600; color:var(--muted); border-bottom:1px solid var(--border); }
        .aa-table td { padding:.65rem 1rem; font-size:.85rem; border-bottom:1px solid var(--border); }
        .aa-table td:first-child { font-family:'Courier New',monospace; color:var(--text); }
        .aa-table td:last-child { color:var(--muted); }
        .aa-table tr:last-child td { border-bottom:none; }

        /* LIVE FEED */
        .live-feed-container { background: #ffffff; border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; margin-top: 3rem; box-shadow: 0 4px 25px rgba(0,0,0,0.04); position: relative; overflow: hidden; }
        .live-feed-container::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--primary), transparent); animation: scan 3s linear infinite; }
        @keyframes scan { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } }
        .live-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(15,23,42,0.08); padding-bottom: 1rem; }
        .live-title { font-family: 'Space Grotesk', sans-serif; font-size: 1.1rem; font-weight: 600; color: var(--text); display: flex; align-items: center; gap: 0.5rem; }
        .live-indicator { display: inline-block; width: 10px; height: 10px; background-color: #ef4444; border-radius: 50%; box-shadow: 0 0 10px #ef4444; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 1; box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); } 70% { opacity: 0.5; box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
        .live-status-text { font-size: 0.8rem; color: #dc2626; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
        
        .live-table-wrapper { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .live-table { width: 100%; min-width: 500px; border-collapse: collapse; font-family: 'Courier New', monospace; font-size: 0.85rem; }
        .live-table th { text-align: left; padding: 0.75rem 1rem; color: #64748b; font-weight: 600; border-bottom: 1px solid rgba(15,23,42,0.08); }
        .live-table td { padding: 1rem; color: #475569; border-bottom: 1px solid rgba(15,23,42,0.06); }
        .live-table tr:hover td { background: #faf8f5; }
        .live-company { color: var(--text); font-weight: 600; font-family: 'Inter', sans-serif; }
        .live-position { color: #d97706; }
        .live-badge { display: inline-flex; align-items: center; padding: 0.25rem 0.6rem; border-radius: 100px; font-size: 0.75rem; font-weight: 600; font-family: 'Inter', sans-serif; }
        .live-badge.saved { background: rgba(217, 119, 6, 0.1); color: #d97706; border: 1px solid rgba(217, 119, 6, 0.25); }
        .live-badge.applied { background: rgba(16, 185, 129, 0.1); color: #059669; border: 1px solid rgba(16, 185, 129, 0.2); }
        .live-badge.rejected { background: rgba(239, 68, 68, 0.1); color: #dc2626; border: 1px solid rgba(239, 68, 68, 0.2); }

        .live-mobile-cards { display: none; }

        @media (max-width: 600px) {
          .aa-container { padding: 0 1rem; }
          .aa-hero { padding: 1.5rem 0 1rem; }
          .aa-hero h1 { font-size: 1.55rem !important; line-height: 1.25 !important; margin-bottom: 0.75rem !important; }
          .aa-hero p { font-size: 0.88rem !important; line-height: 1.55 !important; margin-bottom: 1.25rem !important; }
          .aa-chip { font-size: 0.72rem; padding: 0.3rem 0.75rem; margin-bottom: 0.85rem; max-width: 100%; white-space: normal; text-align: center; }
          .aa-section { padding: 2.25rem 0; }
          .aa-section-title { font-size: 1.35rem !important; line-height: 1.25 !important; margin-bottom: 0.5rem; }
          .aa-section-desc { font-size: 0.85rem; margin-bottom: 1.5rem; }
          .aa-node { width: 100%; max-width: 320px; padding: 1.15rem 1rem; }
          .aa-hero-actions { flex-direction: column; width: 100%; }
          .aa-btn-primary, .aa-btn-outline { width: 100%; justify-content: center; text-align: center; }

          /* Responsive Live Feed */
          .live-feed-container { padding: 1rem 0.85rem; border-radius: 14px; margin-top: 2rem; }
          .live-header { flex-direction: column; align-items: flex-start; gap: 0.4rem; margin-bottom: 1rem; padding-bottom: 0.75rem; }
          .live-table-wrapper { display: none; }
          .live-mobile-cards { display: flex; flex-direction: column; gap: 0.65rem; }
          .live-mobile-item {
            background: #faf8f5;
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 0.85rem 0.95rem;
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
          }
          .live-mobile-row-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
          }
          .live-mobile-company {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 700;
            font-size: 0.95rem;
            color: #0f172a;
          }
          .live-mobile-pos {
            font-size: 0.85rem;
            color: var(--primary);
            font-weight: 500;
          }
          .live-mobile-meta {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.74rem;
            color: var(--muted);
            margin-top: 0.2rem;
            padding-top: 0.4rem;
            border-top: 1px dashed rgba(15, 23, 42, 0.08);
          }
          .live-mobile-tag {
            background: #ffffff;
            border: 1px solid rgba(15, 23, 42, 0.1);
            border-radius: 4px;
            padding: 0.1rem 0.45rem;
            font-size: 0.68rem;
            font-weight: 600;
            color: var(--text-2);
          }

          /* Responsive Env Vars Table */
          .aa-table thead { display: none; }
          .aa-table, .aa-table tbody, .aa-table tr, .aa-table td { display: block; width: 100%; }
          .aa-table tr {
            background: #faf8f5;
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 0.75rem 0.85rem;
            margin-bottom: 0.65rem;
          }
          .aa-table td { padding: 0.2rem 0; border: none; }
          .aa-table td:first-child { font-size: 0.8rem; font-weight: 700; color: var(--primary); word-break: break-all; }
          .aa-table td:last-child { font-size: 0.78rem; color: var(--muted); }
        }
      `}</style>

      <div className="aa-body">
        <nav className="subpage-nav">
          <div className="subpage-nav-inner">
            <Link href="/" className="subpage-back-link" aria-label={lang === 'en' ? 'Back to Portfolio' : 'Kembali ke Portofolio'}>
              <span className="subpage-back-icon">←</span>
              <span>{lang === 'en' ? 'Portfolio' : 'Portofolio'}</span>
            </Link>

            <div className="subpage-brand-badge">
              <span>🤖</span>
              <span>AutoApply Flow</span>
            </div>

            <div className="site-nav-right">
              <button onClick={toggleLang} className="lang-toggle" aria-label="Toggle language">
                {lang === "en" ? "EN · ID" : "ID · EN"}
              </button>
            </div>
          </div>
        </nav>

        <div className="aa-container">
          {/* HERO */}
          <section className="aa-hero">
            <div className="aa-chip">{t.chip}</div>
            <h1>{t.title1} <span>{t.title2}</span></h1>
            <p>{t.desc}</p>
            <div className="aa-hero-actions">
              <a href="/autoapply-workflow.json" download="autoapply-workflow.json" className="aa-btn-primary">
                {t.btn1}
              </a>
              <a href="https://jobtracker-kjmw.vercel.app/public/live" target="_blank" rel="noopener" className="aa-btn-outline">
                {t.btn2}
              </a>
            </div>
          </section>

          {/* WORKFLOW DIAGRAM */}
          <section className="aa-section">
            
            {/* LIVE FEED WIDGET */}
            <div className="live-feed-container">
              <div className="live-header">
                <div className="live-title">
                  <span className="live-indicator"></span>
                  {t.liveActivity}
                </div>
                <div className="live-status-text">{t.monitoring}</div>
              </div>

              {/* Desktop Table View */}
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
                      <tr><td colSpan={4} style={{ textAlign: "center", padding: "2rem" }}>{t.connecting}</td></tr>
                    ) : liveJobs.length === 0 ? (
                      <tr><td colSpan={4} style={{ textAlign: "center", padding: "2rem" }}>{t.noActivity}</td></tr>
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
                              {new Date(job.appliedDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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

              {/* Mobile Card Feed View */}
              <div className="live-mobile-cards">
                {isFetching && liveJobs.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "1.5rem", color: "var(--muted)", fontSize: "0.85rem" }}>
                    {t.connecting}
                  </div>
                ) : liveJobs.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "1.5rem", color: "var(--muted)", fontSize: "0.85rem" }}>
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
                          <span>🕒 {new Date(job.appliedDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          <span className="live-mobile-tag">Scraped & Logged</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <p className="aa-section-label" style={{ marginTop: "4rem" }}>{t.how}</p>
            <h2 className="aa-section-title">{t.pipe}</h2>
            <p className="aa-section-desc">
              {t.pipeDesc}
            </p>

            <div className="aa-flow">
              <div className="aa-node">
                <span className="aa-node-icon">⏰</span>
                <h4>{t.flow1Title}</h4>
                <p>{t.flow1Desc}</p>
                <span className="aa-node-badge">{t.flow1Badge}</span>
              </div>
              <div className="aa-connect">
                <div className="aa-connect-line"></div>
                <span className="aa-connect-label">{t.flow1Conn}</span>
              </div>
              <div className="aa-node">
                <span className="aa-node-icon">🔍</span>
                <h4>{t.flow2Title}</h4>
                <p>{t.flow2Desc}</p>
                <span className="aa-node-badge">{t.flow2Badge}</span>
              </div>
              <div className="aa-connect">
                <div className="aa-connect-line"></div>
                <span className="aa-connect-label">{t.flow2Conn}</span>
              </div>
              <div className="aa-node">
                <span className="aa-node-icon">🧹</span>
                <h4>{t.flow3Title}</h4>
                <p>{t.flow3Desc}</p>
                <span className="aa-node-badge">{t.flow3Badge}</span>
              </div>
              <div className="aa-connect">
                <div className="aa-connect-line"></div>
                <span className="aa-connect-label">{t.flow3Conn}</span>
              </div>
              <div className="aa-node highlight">
                <span className="aa-node-icon">📋</span>
                <h4>{t.flow4Title}</h4>
                <p>{t.flow4Desc}</p>
                <span className="aa-node-badge">{t.flow4Badge}</span>
              </div>
              <div className="aa-connect">
                <div className="aa-connect-line"></div>
                <span className="aa-connect-label">{t.flow4Conn}</span>
              </div>
              <div className="aa-node">
                <span className="aa-node-icon">📱</span>
                <h4>{t.flow5Title}</h4>
                <p>{t.flow5Desc}</p>
                <span className="aa-node-badge">{t.flow5Badge}</span>
              </div>
            </div>
          </section>

          {/* FEATURES */}
          <section className="aa-section">
            <p className="aa-section-label">{t.featLabel}</p>
            <h2 className="aa-section-title">{t.featTitle}</h2>
            <div className="aa-features-grid">
              {t.features.map((f) => (
                <div className="aa-feature" key={f.title}>
                  <span className="aa-feature-icon">{f.icon}</span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SETUP */}
          <section className="aa-section">
            <p className="aa-section-label">{t.quickLabel}</p>
            <h2 className="aa-section-title">{t.quickTitle}</h2>
            <p className="aa-section-desc">{t.quickDesc}</p>

            <div className="aa-code-block">
              <span className="comment">{t.comment1}</span>{"\n"}
              git clone https://github.com/gryvnalvrdo/autoapply-flow{"\n\n"}
              <span className="comment">{t.comment2}</span>{"\n\n"}
              <span className="comment">{t.comment3}</span>{"\n"}
              <span className="key">JOBTRAIL_API_URL</span>=<span className="str">https://jobtracker-kjmw.vercel.app/api/auto-apply</span>{"\n"}
              <span className="key">AUTOAPPLY_SECRET</span>=<span className="str">your-secret-key</span>{"\n"}
              <span className="key">TELEGRAM_BOT_TOKEN</span>=<span className="str">your-bot-token</span>{"\n"}
              <span className="key">TELEGRAM_CHAT_ID</span>=<span className="str">your-chat-id</span>{"\n\n"}
              <span className="comment">{t.comment4}</span>
            </div>

            <br />
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

          {/* ECOSYSTEM */}
          <div className="subpage-ecosystem">
            <h3><span>⚡</span> {t.ecoTitle}</h3>
            <p>{t.ecoDesc}</p>
            <div className="subpage-eco-flow">
              <span className="subpage-eco-item active">
                <span>🤖</span> {t.ecoBtn1}
              </span>
              <span className="subpage-eco-arrow">→</span>
              <a href="https://jobtracker-kjmw.vercel.app/demo" target="_blank" rel="noopener noreferrer" className="subpage-eco-item">
                <span>📋</span> {t.ecoBtn2}
              </a>
              <span className="subpage-eco-arrow">→</span>
              <Link href="/covercraft" className="subpage-eco-item">
                <span>✨</span> {t.ecoBtn3}
              </Link>
              <span className="subpage-eco-arrow">→</span>
              <span className="subpage-eco-item">
                <span>🎯</span> {t.ecoBtn4}
              </span>
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
                ? "Full-Stack Engineer & AI Automations Developer. Building high-impact production systems."
                : "Software Engineer Full-Stack & Otomasi AI. Membangun sistem produksi nyata bernilai tinggi."}
            </p>
            <div className="subpage-footer-links">
              <Link href="/" className="subpage-footer-link">
                <span>←</span> {lang === "en" ? "Back to Portfolio" : "Ke Portofolio"}
              </Link>
              <a href="https://github.com/gryvnalvrdo/autoapply-flow" target="_blank" rel="noopener noreferrer" className="subpage-footer-link">
                GitHub Repository ↗
              </a>
              <a href="https://www.linkedin.com/in/gryven-alverdo-gunawan-7283ab262/" target="_blank" rel="noopener noreferrer" className="subpage-footer-link">
                LinkedIn ↗
              </a>
            </div>
            <div className="subpage-footer-copy">
              © {new Date().getFullYear()} Gryven Alverdo Gunawan. {lang === "en" ? "All rights reserved." : "Hak cipta dilindungi."}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
