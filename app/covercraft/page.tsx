"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CoverCraftPage() {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [yourName, setYourName] = useState("Gryven Alverdo Gunawan");
  const [background, setBackground] = useState(
    `Fresh graduate in Informatics Engineering (GPA 3.88/4.00) from Universitas Atma Jaya Makassar.

Experience: IT Support Intern & Web Developer at Hotel Claro Makassar (Aug-Oct 2025).

Key Projects:
- JobTrail: Full-stack job tracker (Next.js 15, Prisma, PostgreSQL, NextAuth.js)
- Melody Similarity Detector: ML plagiarism detection (PyTorch, CNN+BiLSTM, audio)
- Hotel Booking System: Full-stack reservation platform (Laravel 11, MySQL)

Skills: Python, JavaScript, TypeScript, Next.js, Laravel, Flask, PyTorch, PostgreSQL, Git`
  );
  const [tone, setTone] = useState("professional");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [prefilled, setPrefilled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const job = params.get("job");
    const co = params.get("company");
    if (job || co) {
      if (job) setJobTitle(job);
      if (co) setCompany(co);
      setPrefilled(true);
    }
  }, []);

  const toneMap: Record<string, string> = {
    professional: "formal, confident, and results-oriented",
    enthusiastic: "enthusiastic and passionate while remaining professional",
    concise: "brief and direct — 3 paragraphs max",
    creative: "creative and memorable while maintaining professionalism",
  };

  async function generate() {
    setErrorMsg("");
    if (!apiKey) return setErrorMsg("Please enter your Gemini API key.");
    if (!jobTitle) return setErrorMsg("Please enter the job title.");
    if (!company) return setErrorMsg("Please enter the company name.");
    if (!jobDesc) return setErrorMsg("Please paste the job description.");

    setLoading(true);
    setResult("");

    const prompt = `You are an expert career coach. Write a ${toneMap[tone]} cover letter for:
- Applicant: ${yourName || "the applicant"}
- Role: ${jobTitle} at ${company}

BACKGROUND:
${background}

JOB DESCRIPTION:
${jobDesc}

RULES:
1. Start with a compelling opening (not "I am writing to apply for")
2. Match 2-3 key job requirements to specific skills/experiences
3. Show genuine interest in ${company}
4. End with confident call to action
5. Keep to 3-4 paragraphs (250-350 words)
6. Sound human and authentic

Write ONLY the cover letter, starting with "Dear Hiring Manager,".`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.8, maxOutputTokens: 1024 },
          }),
        }
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || `API Error ${res.status}`);
      }
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("No response received. Try again.");
      setResult(text);
    } catch (err: unknown) {
      setErrorMsg(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
    setLoading(false);
  }

  function copyResult() {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function downloadResult() {
    const blob = new Blob([result], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `cover-letter-${company.toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
  }

  const tones = [
    { id: "professional", label: "💼 Professional" },
    { id: "enthusiastic", label: "🔥 Enthusiastic" },
    { id: "concise", label: "⚡ Concise" },
    { id: "creative", label: "🎨 Creative" },
  ];

  return (
    <>
      <style>{`
        .cc-body { background: #07070f; color: #e2e8f0; font-family: 'Inter', sans-serif; min-height: 100vh; }
        .cc-body::before {
          content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background: radial-gradient(ellipse 80% 60% at 20% -10%, rgba(124,58,237,.15) 0%, transparent 60%),
                      radial-gradient(ellipse 60% 50% at 80% 110%, rgba(6,182,212,.1) 0%, transparent 60%);
        }
        .cc-nav { position: sticky; top: 0; z-index: 100; background: rgba(7,7,15,.85); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(139,92,246,.18); padding: .9rem 0; }
        .cc-nav-inner { max-width: 900px; margin: 0 auto; padding: 0 1.5rem; display: flex; align-items: center; justify-content: space-between; }
        .cc-logo { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1.2rem; background: linear-gradient(135deg, #a78bfa, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-decoration: none; }
        .cc-badge { display: flex; align-items: center; gap: .5rem; font-size: .75rem; color: #94a3b8; background: rgba(124,58,237,.1); border: 1px solid rgba(139,92,246,.2); border-radius: 100px; padding: .3rem .8rem; }
        .cc-badge .dot { width: 6px; height: 6px; border-radius: 50%; background: #a78bfa; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
        .cc-container { max-width: 900px; margin: 0 auto; padding: 0 1.5rem; position: relative; z-index: 1; }
        .cc-hero { text-align: center; padding: 3.5rem 0 2rem; }
        .cc-chip { display: inline-flex; align-items: center; gap: .5rem; background: rgba(6,182,212,.1); border: 1px solid rgba(6,182,212,.3); border-radius: 100px; padding: .35rem 1rem; font-size: .8rem; color: #06b6d4; font-weight: 500; margin-bottom: 1.25rem; }
        .cc-hero h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2rem,5vw,3rem); font-weight: 700; line-height: 1.1; margin-bottom: .9rem; }
        .cc-hero h1 span { background: linear-gradient(135deg, #a78bfa, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .cc-hero p { color: #94a3b8; font-size: 1rem; max-width: 520px; margin: 0 auto 1.5rem; line-height: 1.7; }
        .cc-ecosystem-note { display: inline-flex; align-items: center; gap: .6rem; background: rgba(124,58,237,.08); border: 1px solid rgba(139,92,246,.2); border-radius: 12px; padding: .65rem 1.2rem; font-size: .82rem; color: #94a3b8; }
        .cc-ecosystem-note a { color: #a78bfa; text-decoration: none; font-weight: 500; }
        .cc-prefill { background: rgba(16,185,129,.1); border: 1px solid rgba(16,185,129,.3); border-radius: 10px; padding: .7rem 1rem; font-size: .82rem; color: #6ee7b7; margin-bottom: 1rem; }
        .cc-card { background: #0f0f1a; border: 1px solid rgba(139,92,246,.18); border-radius: 20px; padding: 2rem; margin: 1.5rem 0; }
        .cc-step-label { font-family: 'Space Grotesk', sans-serif; font-size: .68rem; font-weight: 600; text-transform: uppercase; letter-spacing: .15em; color: #a78bfa; margin-bottom: .85rem; }
        .cc-apikey-box { background: rgba(6,182,212,.05); border: 1px solid rgba(6,182,212,.2); border-radius: 14px; padding: 1.2rem; margin-bottom: 1.5rem; }
        .cc-apikey-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: .65rem; }
        .cc-apikey-hdr h3 { font-family: 'Space Grotesk', sans-serif; font-size: .9rem; font-weight: 600; color: #06b6d4; }
        .cc-apikey-hdr a { font-size: .75rem; color: #94a3b8; text-decoration: none; }
        .cc-apikey-hdr a:hover { color: #06b6d4; }
        .cc-input-row { display: flex; gap: .5rem; }
        .cc-input { width: 100%; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1); border-radius: 10px; padding: .7rem 1rem; font-size: .88rem; font-family: inherit; color: #e2e8f0; outline: none; transition: border-color .2s, box-shadow .2s; }
        .cc-input:focus { border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,.15); }
        .cc-textarea { resize: vertical; min-height: 90px; line-height: 1.6; }
        .cc-toggle-btn { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); border-radius: 8px; padding: .7rem .9rem; color: #94a3b8; cursor: pointer; font-size: .82rem; white-space: nowrap; transition: all .2s; flex-shrink: 0; }
        .cc-toggle-btn:hover { background: rgba(255,255,255,.1); color: #e2e8f0; }
        .cc-hint { font-size: .73rem; color: rgba(148,163,184,.6); margin-top: .25rem; }
        .cc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: .85rem; }
        @media (max-width: 600px) { .cc-grid { grid-template-columns: 1fr; } }
        .cc-group { display: flex; flex-direction: column; gap: .35rem; }
        .cc-group.full { grid-column: 1/-1; }
        .cc-label { font-size: .8rem; font-weight: 500; color: #94a3b8; }
        .cc-label span { color: #ef4444; }
        .cc-divider { border: none; border-top: 1px solid rgba(255,255,255,.06); margin: 1.25rem 0; }
        .cc-tone-row { display: flex; gap: .45rem; flex-wrap: wrap; }
        .cc-tone-opt { display: none; }
        .cc-tone-label { display: flex; align-items: center; gap: .3rem; padding: .38rem .85rem; border-radius: 8px; border: 1px solid rgba(255,255,255,.1); font-size: .78rem; cursor: pointer; transition: all .2s; color: #94a3b8; user-select: none; }
        .cc-tone-opt:checked + .cc-tone-label { background: rgba(124,58,237,.2); border-color: #7c3aed; color: #a78bfa; }
        .cc-error { background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.3); border-radius: 10px; padding: .7rem 1rem; font-size: .83rem; color: #fca5a5; margin-top: .75rem; }
        .cc-btn-generate { width: 100%; padding: .95rem; background: linear-gradient(135deg, #7c3aed, #6d28d9); border: none; border-radius: 12px; font-family: 'Space Grotesk', sans-serif; font-size: .95rem; font-weight: 600; color: white; cursor: pointer; transition: all .3s; margin-top: 1.25rem; position: relative; overflow: hidden; }
        .cc-btn-generate:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(124,58,237,.4); }
        .cc-btn-generate:disabled { opacity: .55; cursor: not-allowed; }
        .cc-loading { text-align: center; padding: 2.5rem 0; }
        .cc-spinner { width: 44px; height: 44px; border: 3px solid rgba(124,58,237,.2); border-top-color: #7c3aed; border-radius: 50%; animation: spin .8s linear infinite; margin: 0 auto .75rem; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .cc-loading p { color: #94a3b8; font-size: .88rem; }
        .cc-result { margin-top: 2rem; animation: fadeUp .5s ease; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .cc-result-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: .85rem; flex-wrap: wrap; gap: .5rem; }
        .cc-result-title { font-family: 'Space Grotesk', sans-serif; font-size: .95rem; font-weight: 600; color: #10b981; }
        .cc-result-actions { display: flex; gap: .45rem; flex-wrap: wrap; }
        .cc-action-btn { display: flex; align-items: center; gap: .35rem; padding: .48rem .95rem; border-radius: 8px; border: 1px solid rgba(139,92,246,.2); background: rgba(255,255,255,.04); color: #94a3b8; font-size: .8rem; cursor: pointer; transition: all .2s; font-family: inherit; }
        .cc-action-btn:hover { background: rgba(255,255,255,.08); color: #e2e8f0; }
        .cc-action-btn.success { border-color: #10b981; color: #10b981; }
        .cc-result-content { background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); border-radius: 14px; padding: 1.4rem; font-size: .88rem; line-height: 1.8; white-space: pre-wrap; color: #e2e8f0; max-height: 480px; overflow-y: auto; }
        .cc-result-content::-webkit-scrollbar { width: 4px; }
        .cc-result-content::-webkit-scrollbar-thumb { background: rgba(139,92,246,.3); border-radius: 4px; }
        .cc-ecosystem { background: linear-gradient(135deg,rgba(124,58,237,.1),rgba(6,182,212,.04)); border: 1px solid rgba(139,92,246,.18); border-radius: 20px; padding: 2rem; margin: 2rem 0; text-align: center; }
        .cc-ecosystem h3 { font-family: 'Space Grotesk', sans-serif; font-size: 1.05rem; font-weight: 700; margin-bottom: .65rem; }
        .cc-ecosystem p { font-size: .85rem; color: #94a3b8; line-height: 1.7; max-width: 580px; margin: 0 auto 1.25rem; }
        .cc-flow { display: flex; align-items: center; justify-content: center; gap: .45rem; flex-wrap: wrap; }
        .cc-flow-item { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 10px; padding: .45rem .95rem; font-size: .8rem; font-weight: 500; text-decoration: none; color: #e2e8f0; transition: all .2s; }
        .cc-flow-item:hover { background: rgba(124,58,237,.15); border-color: #7c3aed; }
        .cc-flow-item.active { background: rgba(124,58,237,.2); border-color: #7c3aed; color: #a78bfa; }
        .cc-arrow { color: #64748b; }
        footer { border-top: 1px solid rgba(255,255,255,.06); padding: 1.75rem 0; text-align: center; font-size: .8rem; color: #64748b; }
        footer a { color: #a78bfa; text-decoration: none; }
      `}</style>

      <div className="cc-body">
        <nav className="cc-nav">
          <div className="cc-nav-inner">
            <a href="/covercraft" className="cc-logo">✨ CoverCraft</a>
            <div className="cc-badge">
              <div className="dot"></div>
              Part of the Job Hunting Suite
            </div>
          </div>
        </nav>

        <div className="cc-container">
          <section className="cc-hero">
            <div className="cc-chip">⚡ Powered by Gemini AI · Free · No Sign-up</div>
            <h1>Write <span>Standout Cover Letters</span><br />in Seconds</h1>
            <p>Paste a job description and AI generates a personalized, ATS-friendly cover letter. Your API key stays in your browser — never stored.</p>
            <div className="cc-ecosystem-note">
              🔗 Part of <a href="/">Gryven&apos;s Job Hunting Suite</a> — works best with{" "}
              <a href="https://jobtracker-kjmw.vercel.app" target="_blank" rel="noopener">JobTrail ↗</a>
            </div>
          </section>

          {prefilled && (
            <div className="cc-prefill">✅ Job details pre-filled from JobTrail. Review and hit Generate!</div>
          )}

          <div className="cc-card">
            <p className="cc-step-label">Step 1 — Your Gemini API Key</p>
            <div className="cc-apikey-box">
              <div className="cc-apikey-hdr">
                <h3>🔑 Gemini API Key</h3>
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener">Get free key →</a>
              </div>
              <div className="cc-input-row">
                <input
                  type={showKey ? "text" : "password"}
                  className="cc-input"
                  placeholder="AIza..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <button className="cc-toggle-btn" onClick={() => setShowKey(!showKey)}>
                  {showKey ? "Hide" : "Show"}
                </button>
              </div>
              <p className="cc-hint">Your key is only used in your browser and never sent to our servers.</p>
            </div>

            <hr className="cc-divider" />
            <p className="cc-step-label">Step 2 — Job Details</p>
            <div className="cc-grid">
              <div className="cc-group">
                <label className="cc-label">Job Title <span>*</span></label>
                <input className="cc-input" placeholder="e.g. Software Engineer" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
              </div>
              <div className="cc-group">
                <label className="cc-label">Company Name <span>*</span></label>
                <input className="cc-input" placeholder="e.g. Google" value={company} onChange={(e) => setCompany(e.target.value)} />
              </div>
              <div className="cc-group full">
                <label className="cc-label">Job Description <span>*</span></label>
                <textarea className="cc-input cc-textarea" rows={6} placeholder="Paste the full job description here..." value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} />
              </div>
            </div>

            <hr className="cc-divider" />
            <p className="cc-step-label">Step 3 — About You</p>
            <div className="cc-grid">
              <div className="cc-group">
                <label className="cc-label">Your Name</label>
                <input className="cc-input" value={yourName} onChange={(e) => setYourName(e.target.value)} />
              </div>
              <div className="cc-group">
                <label className="cc-label">Target Role</label>
                <input className="cc-input" placeholder="Software Engineer" />
              </div>
              <div className="cc-group full">
                <label className="cc-label">Your Background &amp; Key Skills</label>
                <textarea className="cc-input cc-textarea" rows={5} value={background} onChange={(e) => setBackground(e.target.value)} />
              </div>
            </div>

            <hr className="cc-divider" />
            <p className="cc-step-label">Step 4 — Tone &amp; Style</p>
            <div className="cc-tone-row">
              {tones.map((t) => (
                <span key={t.id}>
                  <input type="radio" name="tone" id={`tone-${t.id}`} className="cc-tone-opt" checked={tone === t.id} onChange={() => setTone(t.id)} />
                  <label htmlFor={`tone-${t.id}`} className="cc-tone-label">{t.label}</label>
                </span>
              ))}
            </div>

            {errorMsg && <div className="cc-error">{errorMsg}</div>}

            <button className="cc-btn-generate" onClick={generate} disabled={loading}>
              {loading ? "Crafting your letter..." : "✨ Generate Cover Letter"}
            </button>
          </div>

          {loading && (
            <div className="cc-loading">
              <div className="cc-spinner"></div>
              <p>Analyzing job description and crafting your letter...</p>
            </div>
          )}

          {result && !loading && (
            <div className="cc-result">
              <div className="cc-result-header">
                <div className="cc-result-title">✅ Your Cover Letter is Ready</div>
                <div className="cc-result-actions">
                  <button className={`cc-action-btn ${copied ? "success" : ""}`} onClick={copyResult}>
                    {copied ? "✅ Copied!" : "📋 Copy"}
                  </button>
                  <button className="cc-action-btn" onClick={downloadResult}>⬇️ Download</button>
                  <button className="cc-action-btn" onClick={() => { setResult(""); generate(); }}>🔄 Regenerate</button>
                </div>
              </div>
              <div className="cc-result-content">{result}</div>
            </div>
          )}

          <div className="cc-ecosystem">
            <h3>🔗 Part of the Job Hunting Suite</h3>
            <p>CoverCraft works alongside <strong>JobTrail</strong> and <strong>AutoApply Flow</strong> — three tools built by one developer actively engineering his job search.</p>
            <div className="cc-flow">
              <Link href="/autoapply" className="cc-flow-item">🤖 AutoApply Flow</Link>
              <span className="cc-arrow">→</span>
              <a href="https://jobtracker-kjmw.vercel.app" target="_blank" rel="noopener" className="cc-flow-item">📋 JobTrail</a>
              <span className="cc-arrow">→</span>
              <span className="cc-flow-item active">✨ CoverCraft</span>
              <span className="cc-arrow">→</span>
              <span className="cc-flow-item">🎯 You Get Hired</span>
            </div>
          </div>
        </div>

        <footer>
          <div className="cc-container">
            Built by <a href="/">Gryven Alverdo Gunawan</a> ·{" "}
            <a href="https://github.com/gryvnalvrdo" target="_blank" rel="noopener">GitHub</a> ·
            Part of the Job Hunting Suite
          </div>
        </footer>
      </div>
    </>
  );
}
