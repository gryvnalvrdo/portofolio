"use client";

import Link from "next/link";

import { useState, useEffect } from "react";

export default function AutoApplyPage() {
  const [lang, setLang] = useState("en");

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
      title1: "Automate Your ",
      title2: "Job Discovery",
      desc: "An n8n workflow that monitors LinkedIn, Glints, and Kalibrr every 6 hours, filters jobs by your criteria, and automatically adds matching listings to JobTrail — so you never miss a relevant opportunity.",
      btn1: "📥 Download Workflow JSON",
      btn2: "View in JobTrail ↗",
      how: "How It Works",
      pipe: "The Automation Pipeline",
      pipeDesc: "Every 6 hours, the workflow runs automatically. Jobs flow from discovery to your JobTrail dashboard without you lifting a finger."
    },
    id: {
      back: "← Kembali ke Portofolio",
      title1: "Otomatisasi ",
      title2: "Pencarian Loker",
      desc: "Alur kerja n8n yang memantau LinkedIn, Glints, dan Kalibrr setiap 6 jam, memfilter loker sesuai kriteria Anda, dan otomatis menambahkannya ke JobTrail — agar tidak ada peluang yang terlewat.",
      btn1: "📥 Unduh Workflow JSON",
      btn2: "Lihat di JobTrail ↗",
      how: "Cara Kerjanya",
      pipe: "Pipa Otomatisasi",
      pipeDesc: "Setiap 6 jam, alur kerja berjalan otomatis. Lowongan pekerjaan mengalir dari penemuan hingga ke dasbor JobTrail Anda tanpa perlu repot."
    }
  }[lang as "en" | "id"];

  return (
    <>
      <style>{`
        .aa-body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; min-height: 100vh; }
        .aa-nav { position:sticky; top:0; z-index:100; background:rgba(2,6,23,0.85); backdrop-filter:blur(20px); border:none; padding:.9rem 0; }
        .aa-nav-inner { max-width:1000px; margin:0 auto; padding:0 1.5rem; display:flex; align-items:center; justify-content:space-between; gap:1rem; }
        .aa-logo { font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:1.1rem; text-decoration:none; color:var(--text); }
        .aa-nav-links { display:flex; gap:.5rem; }
        .aa-nav-link { display:flex; align-items:center; gap:.35rem; padding:.4rem .85rem; border-radius:8px; border:1px solid var(--border); background:var(--surface2); color:var(--text); text-decoration:none; font-size:.8rem; font-weight:500; transition:all .2s; white-space:nowrap; }
        .aa-nav-link:hover { background:var(--border); }
        .aa-container { max-width:1000px; margin:0 auto; padding:0 1.5rem; position:relative; z-index:1; }
        .aa-hero { padding:4rem 0 3rem; text-align:center; }
        .aa-chip { display:inline-flex; align-items:center; gap:.45rem; background:var(--surface2); border:1px solid var(--border); border-radius:100px; padding:.35rem 1rem; font-size:.78rem; color:var(--text); font-weight:500; margin-bottom:1.25rem; }
        .aa-hero h1 { font-family:'Space Grotesk',sans-serif; font-size:clamp(2rem,5vw,3rem); font-weight:700; line-height:1.1; margin-bottom:.9rem; color:var(--text); }
        .aa-hero p { color:var(--muted); font-size:1rem; max-width:580px; margin:0 auto 2rem; line-height:1.75; }
        .aa-hero-actions { display:flex; justify-content:center; gap:1rem; flex-wrap:wrap; }
        .aa-btn-primary { display:inline-flex; align-items:center; gap:.5rem; padding:.8rem 1.6rem; background:var(--primary); border:none; border-radius:8px; color:var(--bg); font-family:'Space Grotesk',sans-serif; font-size:.9rem; font-weight:600; text-decoration:none; transition:all .2s; cursor:pointer; }
        .aa-btn-primary:hover { background:var(--primary-l); transform:translateY(-1px); }
        .aa-btn-outline { display:inline-flex; align-items:center; gap:.5rem; padding:.8rem 1.6rem; background:transparent; border:1px solid var(--border); border-radius:8px; color:var(--primary); font-family:'Space Grotesk',sans-serif; font-size:.9rem; font-weight:600; text-decoration:none; transition:all .2s; }
        .aa-btn-outline:hover { background:rgba(255,255,255,0.05); border-color:var(--border-hover); }
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
        .aa-node.highlight .aa-node-badge { background:var(--primary); color:var(--bg); border-color:var(--primary); }
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
        .aa-code-block { background:#111; border:1px solid var(--border); border-radius:12px; padding:1.25rem 1.5rem; font-family:'Courier New',monospace; font-size:.85rem; color:#e2e8f0; overflow-x:auto; line-height:1.7; }
        .aa-code-block .comment { color:#64748b; }
        .aa-code-block .key { color:#a78bfa; }
        .aa-code-block .val { color:#67e8f9; }
        .aa-code-block .str { color:#6ee7b7; }

        /* ENV VARS TABLE */
        .aa-table { width:100%; border-collapse:collapse; margin-top:1rem; }
        .aa-table th { text-align:left; padding:.65rem 1rem; font-size:.8rem; font-weight:600; color:var(--muted); border-bottom:1px solid var(--border); }
        .aa-table td { padding:.65rem 1rem; font-size:.85rem; border-bottom:1px solid var(--border); }
        .aa-table td:first-child { font-family:'Courier New',monospace; color:var(--text); }
        .aa-table td:last-child { color:var(--muted); }
        .aa-table tr:last-child td { border-bottom:none; }

        /* ECOSYSTEM */
        .aa-ecosystem { background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:2rem; text-align:center; margin:2rem 0; }
        .aa-ecosystem h3 { font-family:'Inter',sans-serif; font-size:1.1rem; font-weight:600; margin-bottom:.65rem; color:var(--text); }
        .aa-ecosystem p { font-size:.9rem; color:var(--muted); line-height:1.7; max-width:580px; margin:0 auto 1.25rem; }
        .aa-eco-flow { display:flex; align-items:center; justify-content:center; gap:.45rem; flex-wrap:wrap; }
        .aa-eco-item { background:var(--surface2); border:1px solid var(--border); border-radius:8px; padding:.42rem .9rem; font-size:.85rem; font-weight:500; text-decoration:none; color:var(--text); transition:all .2s; }
        .aa-eco-item:hover { background:var(--border); }
        .aa-eco-item.active { background:var(--primary); border-color:var(--primary); color:var(--bg); }
        .aa-eco-arrow { color:var(--muted-2); }
        footer { border-top:1px solid var(--border); padding:2rem 0; text-align:center; font-size:.85rem; color:var(--muted); }
        footer a { color:var(--text); text-decoration:underline; }
      `}</style>

      <div className="aa-body">
        <nav className="aa-nav">
          <div className="aa-nav-inner">
            <Link href="/" style={{ color: "var(--muted)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}>
              {t.back}
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="aa-logo">🤖 AutoApply Flow</div>
              <button onClick={toggleLang} className="lang-toggle" style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}>
                {lang === "en" ? "EN / ID" : "ID / EN"}
              </button>
            </div>
          </div>
        </nav>

        <div className="aa-container">
          {/* HERO */}
          <section className="aa-hero">
            <div className="aa-chip">🤖 n8n Workflow · Open Source · Import-Ready</div>
            <h1>{t.title1} <span>{t.title2}</span></h1>
            <p>{t.desc}</p>
            <div className="aa-hero-actions">
              <a href="/autoapply-workflow.json" download="autoapply-workflow.json" className="aa-btn-primary">
                {t.btn1}
              </a>
              <a href="https://jobtracker-kjmw.vercel.app" target="_blank" rel="noopener" className="aa-btn-outline">
                {t.btn2}
              </a>
            </div>
          </section>

          {/* WORKFLOW DIAGRAM */}
          <section className="aa-section">
            <p className="aa-section-label">{t.how}</p>
            <h2 className="aa-section-title">{t.pipe}</h2>
            <p className="aa-section-desc">
              {t.pipeDesc}
            </p>

            <div className="aa-flow">
              <div className="aa-node">
                <span className="aa-node-icon">⏰</span>
                <h4>Schedule Trigger</h4>
                <p>Runs every 6 hours automatically</p>
                <span className="aa-node-badge">Cron</span>
              </div>
              <div className="aa-connect">
                <div className="aa-connect-line"></div>
                <span className="aa-connect-label">triggers</span>
              </div>
              <div className="aa-node">
                <span className="aa-node-icon">🔍</span>
                <h4>Fetch Jobs</h4>
                <p>LinkedIn RSS + Glints + Kalibrr APIs</p>
                <span className="aa-node-badge">HTTP Request</span>
              </div>
              <div className="aa-connect">
                <div className="aa-connect-line"></div>
                <span className="aa-connect-label">raw data</span>
              </div>
              <div className="aa-node">
                <span className="aa-node-icon">🧹</span>
                <h4>Filter Jobs</h4>
                <p>Keywords, location, salary range</p>
                <span className="aa-node-badge">Code Node</span>
              </div>
              <div className="aa-connect">
                <div className="aa-connect-line"></div>
                <span className="aa-connect-label">matched</span>
              </div>
              <div className="aa-node highlight">
                <span className="aa-node-icon">📋</span>
                <h4>Add to JobTrail</h4>
                <p>POST to JobTrail API endpoint</p>
                <span className="aa-node-badge">API Integration</span>
              </div>
              <div className="aa-connect">
                <div className="aa-connect-line"></div>
                <span className="aa-connect-label">notify</span>
              </div>
              <div className="aa-node">
                <span className="aa-node-icon">📱</span>
                <h4>Telegram Alert</h4>
                <p>Instant notification for each new job</p>
                <span className="aa-node-badge">Telegram Bot</span>
              </div>
            </div>
          </section>

          {/* FEATURES */}
          <section className="aa-section">
            <p className="aa-section-label">Features</p>
            <h2 className="aa-section-title">What the Workflow Does</h2>
            <div className="aa-features-grid">
              {[
                { icon: "🔄", title: "Multi-Source Monitoring", desc: "Simultaneously monitors LinkedIn RSS feed, Glints, and Kalibrr every 6 hours for new Software Engineer listings." },
                { icon: "🎯", title: "Smart Keyword Filtering", desc: "Filters jobs by configurable keywords (software engineer, Next.js, Python, etc.) and location (Indonesia + Remote)." },
                { icon: "🔗", title: "JobTrail Integration", desc: "Automatically sends matched jobs to JobTrail via HTTP POST — they appear in your dashboard instantly." },
                { icon: "📱", title: "Telegram Notifications", desc: "Sends a formatted Telegram message for every new match with job title, company, and direct link." },
                { icon: "🔁", title: "Deduplication", desc: "Tracks job URLs already added to prevent duplicate entries in JobTrail across runs." },
                { icon: "⚙️", title: "Easy Configuration", desc: "All settings (keywords, location, API endpoints) are environment variables — no code changes needed." },
              ].map((f) => (
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
            <p className="aa-section-label">Quick Start</p>
            <h2 className="aa-section-title">Deploy in 10 Minutes</h2>
            <p className="aa-section-desc">Import the workflow JSON into any n8n instance (cloud or self-hosted) and set your environment variables.</p>

            <div className="aa-code-block">
              <span className="comment"># 1. Clone the repo</span>{"\n"}
              git clone https://github.com/gryvnalvrdo/autoapply-flow{"\n\n"}
              <span className="comment"># 2. Import workflow.json into n8n</span>{"\n"}
              <span className="comment">#    n8n → Workflows → Import → Select workflow.json</span>{"\n\n"}
              <span className="comment"># 3. Set environment variables in n8n</span>{"\n"}
              <span className="key">JOBTRAIL_API_URL</span>=<span className="str">https://jobtracker-kjmw.vercel.app/api/auto-apply</span>{"\n"}
              <span className="key">AUTOAPPLY_SECRET</span>=<span className="str">your-secret-key</span>{"\n"}
              <span className="key">TELEGRAM_BOT_TOKEN</span>=<span className="str">your-bot-token</span>{"\n"}
              <span className="key">TELEGRAM_CHAT_ID</span>=<span className="str">your-chat-id</span>{"\n\n"}
              <span className="comment"># 4. Activate the workflow and watch jobs flow in!</span>
            </div>

            <br />
            <table className="aa-table">
              <thead>
                <tr>
                  <th>Variable</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["JOBTRAIL_API_URL", "Your JobTrail deployment URL + /api/auto-apply"],
                  ["AUTOAPPLY_SECRET", "Secret key to authenticate the incoming webhook"],
                  ["TELEGRAM_BOT_TOKEN", "From @BotFather on Telegram (optional)"],
                  ["TELEGRAM_CHAT_ID", "Your Telegram chat ID for notifications (optional)"],
                  ["KEYWORDS", "Comma-separated job keywords to filter by"],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <td>{k}</td>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* ECOSYSTEM */}
          <div className="aa-ecosystem">
            <h3>🔗 Part of the Job Hunting Suite</h3>
            <p>AutoApply Flow feeds job listings directly into <strong>JobTrail</strong>, which then connects to <strong>CoverCraft</strong> for AI-generated cover letters. Three tools, one seamless pipeline.</p>
            <div className="aa-eco-flow">
              <span className="aa-eco-item active">🤖 AutoApply Flow</span>
              <span className="aa-eco-arrow">→</span>
              <a href="https://jobtracker-kjmw.vercel.app" target="_blank" rel="noopener" className="aa-eco-item">📋 JobTrail</a>
              <span className="aa-eco-arrow">→</span>
              <Link href="/covercraft" className="aa-eco-item">✨ CoverCraft</Link>
              <span className="aa-eco-arrow">→</span>
              <span className="aa-eco-item">🎯 You Get Hired</span>
            </div>
          </div>
        </div>

        <footer>
          <div className="aa-container">
            Built by <a href="/">Gryven Alverdo Gunawan</a> ·{" "}
            <a href="https://github.com/gryvnalvrdo/autoapply-flow" target="_blank" rel="noopener">GitHub</a> ·
            Part of the Job Hunting Suite
          </div>
        </footer>
      </div>
    </>
  );
}
