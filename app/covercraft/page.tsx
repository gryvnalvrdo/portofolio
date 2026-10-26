"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CoverCraftPage() {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [yourName, setYourName] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [background, setBackground] = useState("");
  const [isScraping, setIsScraping] = useState(false);
  const [isParsingPdf, setIsParsingPdf] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error" | "info"; msg: string } | null>(null);

  const [tone, setTone] = useState("professional");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [lang, setLang] = useState("en");
  const [jobId, setJobId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedToJobTrail, setSavedToJobTrail] = useState(false);

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
      chip: "⚡ Powered by Gemini AI · Free & Instant · No Sign-up",
      title1: "Write ",
      title2: "Standout Cover Letters",
      title3: "in Seconds",
      desc: "Paste a job description and Gemini AI generates a personalized, ATS-friendly cover letter in seconds. Integrated with JobTrail for seamless one-click workflows.",
      sampleBtn: "💡 Fill Sample Job",
      note: "🔗 Part of Gryven's Job Hunting Suite — works best with",
      prefilled: "✅ Job details pre-filled from JobTrail. Review and hit Generate!",
      step1: "Step 1 — Job Details",
      jobTitleLabel: "Job Title",
      jobTitlePh: "e.g. Software Engineer",
      companyLabel: "Company Name",
      companyPh: "e.g. Google",
      jobDescLabel: "Job Description",
      scraping: "Fetching from URL...",
      scrapingPh: "Scraping URL...",
      jobDescPh: "Paste the full job description here...",
      step2: "Step 2 — About You",
      nameLabel: "Your Name",
      namePh: "e.g. Gryven Alverdo Gunawan",
      roleLabel: "Target Role",
      rolePh: "Software Engineer",
      bgLabel: "Your Background & Key Skills",
      parsing: "Reading PDF...",
      upload: "📄 Upload CV (PDF)",
      bgPh: "Paste your Resume text here, or upload a PDF above...",
      step3: "Step 3 — Tone & Style",
      btnGen: "✨ Generate Cover Letter",
      btnLoading: "Crafting your letter...",
      loadingMsg: "Analyzing job description and crafting your letter...",
      resReady: "✅ Your Cover Letter is Ready",
      copy: "📋 Copy",
      copied: "✅ Copied!",
      download: "⬇️ Download",
      saveBtn: "💾 Save to JobTrail",
      savingBtn: "⏳ Saving...",
      savedBtn: "✅ Saved to JobTrail",
      regen: "🔄 Regenerate",
      ecoTitle: "🔗 Part of the Job Hunting Suite",
      ecoDesc1: "CoverCraft works alongside",
      ecoDesc2: "and",
      ecoDesc3: "— three tools built by one developer actively engineering his job search.",
      ecoBtn1: "🤖 AutoApply Flow",
      ecoBtn2: "📋 JobTrail",
      ecoBtn3: "✨ CoverCraft",
      ecoBtn4: "🎯 You Get Hired",
      footer1: "Built by",
      footer2: "Part of the Job Hunting Suite"
    },
    id: {
      back: "← Kembali ke Portofolio",
      chip: "⚡ Ditenagai Gemini AI · Gratis & Instan · Tanpa Daftar",
      title1: "Tulis ",
      title2: "Cover Letter Memukau",
      title3: "dalam Hitungan Detik",
      desc: "Tempelkan deskripsi pekerjaan dan Gemini AI akan menghasilkan cover letter personalisasi yang ramah-ATS dalam hitungan detik. Terintegrasi langsung dengan JobTrail.",
      sampleBtn: "💡 Isi Contoh Loker",
      note: "🔗 Bagian dari Job Hunting Suite Gryven — sangat cocok dipadukan dengan",
      prefilled: "✅ Detail pekerjaan terisi otomatis dari JobTrail. Periksa lalu klik Generate!",
      step1: "Langkah 1 — Detail Pekerjaan",
      jobTitleLabel: "Posisi Pekerjaan",
      jobTitlePh: "contoh: Software Engineer",
      companyLabel: "Nama Perusahaan",
      companyPh: "contoh: Google",
      jobDescLabel: "Deskripsi Pekerjaan",
      scraping: "Mengambil dari URL...",
      scrapingPh: "Sedang mengambil data...",
      jobDescPh: "Tempelkan deskripsi pekerjaan selengkapnya di sini...",
      step2: "Langkah 2 — Tentang Anda",
      nameLabel: "Nama Anda",
      namePh: "contoh: Gryven Alverdo Gunawan",
      roleLabel: "Peran yang Dituju",
      rolePh: "Software Engineer",
      bgLabel: "Latar Belakang & Keahlian Utama",
      parsing: "Membaca PDF...",
      upload: "📄 Unggah CV (PDF)",
      bgPh: "Tempel teks Resume Anda di sini, atau unggah PDF di atas...",
      step3: "Langkah 3 — Gaya & Nada",
      btnGen: "✨ Buat Cover Letter",
      btnLoading: "Sedang merangkai surat...",
      loadingMsg: "Menganalisis deskripsi pekerjaan dan merangkai surat Anda...",
      resReady: "✅ Cover Letter Anda Siap",
      copy: "📋 Salin",
      copied: "✅ Tersalin!",
      download: "⬇️ Unduh",
      saveBtn: "💾 Simpan ke JobTrail",
      savingBtn: "⏳ Menyimpan...",
      savedBtn: "✅ Tersimpan ke JobTrail",
      regen: "🔄 Buat Ulang",
      ecoTitle: "🔗 Bagian dari Job Hunting Suite",
      ecoDesc1: "CoverCraft bekerja berdampingan dengan",
      ecoDesc2: "dan",
      ecoDesc3: "— tiga alat yang dibangun oleh seorang developer untuk mengotomatisasi pencarian kerjanya.",
      ecoBtn1: "🤖 AutoApply Flow",
      ecoBtn2: "📋 JobTrail",
      ecoBtn3: "✨ CoverCraft",
      ecoBtn4: "🎯 Anda Diterima",
      footer1: "Dibuat oleh",
      footer2: "Bagian dari Job Hunting Suite"
    }
  }[lang as "en" | "id"];

  const [copied, setCopied] = useState(false);
  const [prefilled, setPrefilled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let job = params.get("job") || "";
    let comp = params.get("company") || "";
    const url = params.get("url");
    const id = params.get("id");

    if (id) setJobId(id);

    // Smart heuristic: If company passed as generic "Company" and job string is "RealCompany: Role"
    if ((comp.toLowerCase() === "company" || !comp) && job.includes(":")) {
      const parts = job.split(":");
      comp = parts[0].trim();
      job = parts.slice(1).join(":").trim();
    }

    if (job || comp || id) {
      if (job) {
        setJobTitle(job);
        setTargetRole(job);
      }
      if (comp) setCompany(comp);
      setPrefilled(true);
    }
    if (url) {
      scrapeUrl(url);
    }
  }, []);

  function fillSampleData() {
    setJobTitle("Full-Stack Software Engineer");
    setCompany("Tech Company / Startup");
    setTargetRole("Software Engineer");
    setYourName("Gryven Alverdo Gunawan");
    setBackground(
      "Fresh graduate in Informatics Engineering (GPA 3.88/4.00) with hands-on experience in Next.js 15, TypeScript, PostgreSQL, Prisma, Python, and automated webhook workflows with n8n. Previously served as IT Support & Web Developer at Hotel Claro Makassar, maintaining full-stack production systems."
    );
    setJobDesc(
      "We are seeking a Full-Stack Software Engineer to build high-performance web applications and resilient backend services. Responsibilities include designing scalable React/Next.js frontends, building APIs, and optimizing database queries on PostgreSQL. Qualifications: Strong proficiency in TypeScript, React, Next.js, and SQL."
    );
    setNotification({
      type: "info",
      msg: lang === "id" ? "Contoh data lowongan berhasil diisi! Silakan klik Buat Cover Letter." : "Sample job data filled! Click Generate Cover Letter to test.",
    });
    setTimeout(() => setNotification(null), 5000);
  }

  async function scrapeUrl(url: string) {
    setIsScraping(true);
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.text) {
          setJobDesc(data.text);
          setNotification({ type: "success", msg: lang === "id" ? "Deskripsi lowongan berhasil diambil dari URL!" : "Job description fetched from URL!" });
          setTimeout(() => setNotification(null), 4000);
        } else {
          setNotification({ type: "error", msg: lang === "id" ? "Gagal mengambil teks dari URL ini. Silakan copy-paste manual." : "Failed to extract text from this URL. Please copy-paste manually." });
        }
      } else {
        setNotification({ type: "error", msg: lang === "id" ? "Website ini memblokir scraping otomatis. Silakan copy-paste deskripsi manual." : "This website blocks automated scraping. Please copy-paste manually." });
      }
    } catch (e) {
      console.error("Scraping failed", e);
      setNotification({ type: "error", msg: "Error connecting to scraping service." });
    }
    setIsScraping(false);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsParsingPdf(true);
    const formData = new FormData();
    formData.append("cv", file);

    try {
      const res = await fetch("/api/parse-cv", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        if (data.text) {
          setBackground(data.text);
          if (data.name) {
            setYourName(data.name);
          } else {
            // Auto-extract name using a simple heuristic
            const lines = data.text.split(/[\r\n]+/)
              .map((l: string) => l.trim())
              .filter((l: string) => l.length > 0 && !l.includes("---Page") && !l.includes("----"));
            
            if (lines.length > 0) {
              let possibleName = lines[0];
              // Skip headers like 'Resume' or 'CV'
              if (possibleName.toLowerCase().includes("resume") || possibleName.toLowerCase().includes("curriculum vitae")) {
                if (lines.length > 1) possibleName = lines[1];
              }
              // Remove email addresses or phone numbers if they are on the same line
              possibleName = possibleName.split(/[\w.-]+@[\w.-]+\.\w+/)[0].trim(); // strip email
              possibleName = possibleName.split(/[|,-]/)[0].trim(); // strip separators often used for phone numbers
              
              // Just take a reasonable length
              if (possibleName.length > 2 && possibleName.length <= 40) {
                setYourName(possibleName);
              }
            }
          }
          setNotification({ type: "success", msg: lang === "id" ? "CV PDF berhasil diproses!" : "CV parsed successfully!" });
          setTimeout(() => setNotification(null), 4000);
        }
      } else {
        const data = await res.json();
        setNotification({ type: "error", msg: data.error || "Failed to parse PDF" });
      }
    } catch (e) {
      console.error("Upload failed", e);
      setNotification({ type: "error", msg: "Error uploading file" });
    }
    setIsParsingPdf(false);
    // Reset input so the same file can be selected again
    e.target.value = "";
  }

  const toneMap: Record<string, string> = {
    professional: "formal, confident, and results-oriented",
    enthusiastic: "enthusiastic and passionate while remaining professional",
    concise: "brief and direct — 3 paragraphs max",
    creative: "creative and memorable while maintaining professionalism",
  };

  async function generate() {
    setErrorMsg("");
    if (!jobTitle) return setErrorMsg("Please enter the job title.");
    if (!company) return setErrorMsg("Please enter the company name.");
    if (!jobDesc) return setErrorMsg("Please paste the job description.");

    setLoading(true);
    setResult("");

    const prompt = `You are an expert career coach. Write a ${toneMap[tone]} cover letter for:
- Applicant: ${yourName || "the applicant"}
- Role: ${targetRole || jobTitle} at ${company}

BACKGROUND:
${background || "A passionate professional ready to contribute."}

JOB DESCRIPTION:
${jobDesc}

RULES:
1. You MUST write a complete, professional cover letter consisting of 3-4 paragraphs.
2. DO NOT output the rules, just write the letter itself.
3. IMPORTANT: DO NOT include any sender address or contact info header at the top. The VERY FIRST text you output must be "Dear Hiring Manager,".
4. If the background or job description is very short, creatively expand on it to make a compelling 250-word letter.
5. Sound human, authentic, and confident.
6. Sign off with the applicant's name at the bottom.`;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `API Error ${res.status}`);
      }
      const data = await res.json();
      setResult(data.result);
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
    { id: "professional", label: lang === "id" ? "💼 Profesional" : "💼 Professional" },
    { id: "enthusiastic", label: lang === "id" ? "🔥 Antusias" : "🔥 Enthusiastic" },
    { id: "concise", label: lang === "id" ? "⚡ Singkat" : "⚡ Concise" },
    { id: "creative", label: lang === "id" ? "🎨 Kreatif" : "🎨 Creative" },
  ];

  async function saveToJobTrail() {
    if (!jobId || !result) return;
    setIsSaving(true);
    try {
      const res = await fetch(`https://jobtracker-kjmw.vercel.app/api/public/applications/${jobId}/cover-letter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coverLetter: result })
      });
      if (res.ok) {
        setSavedToJobTrail(true);
      } else {
        alert("Failed to save to JobTrail.");
      }
    } catch (e) {
      console.error(e);
      alert("Error saving to JobTrail.");
    }
    setIsSaving(false);
  }

  return (
    <>
      <style>{`
        .cc-body { background: #07070f; color: #e2e8f0; font-family: 'Inter', sans-serif; min-height: 100vh; }
        .cc-body::before {
          content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background: radial-gradient(ellipse 80% 60% at 20% -10%, rgba(124,58,237,.15) 0%, transparent 60%),
                      radial-gradient(ellipse 60% 50% at 80% 110%, rgba(6,182,212,.1) 0%, transparent 60%);
        }
        .cc-nav-fixed { position: sticky; top: 0; z-index: 100; background: rgba(7,7,15,.85); backdrop-filter: blur(20px); padding: .9rem 0; }
        .cc-nav-inner { max-width: 900px; margin: 0 auto; padding: 0 1.5rem; display: flex; align-items: center; justify-content: space-between; }
        @media (max-width: 600px) {
          .cc-nav-inner { padding: 0 1rem; }
          .cc-back-text { display: none; }
          .cc-badge, .lang-toggle { font-size: 0.7rem; padding: 0.25rem 0.5rem; }
          .cc-container { padding: 0 1rem; }
          .cc-hero { padding: 2rem 0 1.5rem; }
          .cc-card { padding: 1.25rem 1rem; border-radius: 14px; margin: 1rem 0; }
          .cc-input { font-size: 16px; /* Prevents iOS auto-zoom on focus */ }
          .cc-tone-label { padding: 0.45rem 0.75rem; font-size: 0.76rem; }
          .cc-action-btn { flex: 1 1 calc(50% - 0.4rem); justify-content: center; padding: 0.65rem 0.5rem; font-size: 0.78rem; text-align: center; }
          .cc-result-actions { width: 100%; }
        }
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
        .cc-nav { display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 0; margin-bottom: 3rem; border: none; }
        .cc-logo, .cc-nav-brand { font-family: 'Space Grotesk', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--text); text-decoration: none; display: flex; align-items: center; gap: .5rem; }
        .cc-badge { background: var(--surface2); color: var(--text); padding: .35rem .75rem; border-radius: 99px; font-size: .75rem; font-weight: 500; border: 1px solid var(--border); display: flex; align-items: center; gap: .5rem; }
        .cc-badge .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--text); }
        .cc-hero { text-align: center; margin-bottom: 3rem; }
        .cc-hero h1 { font-family: 'Space Grotesk', sans-serif; font-size: 2.75rem; font-weight: 700; color: var(--text); margin-bottom: .75rem; letter-spacing: -0.02em; }
        .cc-hero p { color: var(--muted); font-size: 1.05rem; max-width: 500px; margin: 0 auto; line-height: 1.6; }
        .cc-chip { display: inline-flex; align-items: center; gap: .5rem; background: var(--surface2); border: 1px solid var(--border); border-radius: 100px; padding: .35rem 1rem; font-size: .8rem; color: var(--text); font-weight: 500; margin-bottom: 1.25rem; }
        .cc-ecosystem-note { display: inline-flex; align-items: center; gap: .6rem; background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; padding: .65rem 1.2rem; font-size: .82rem; color: var(--muted); margin-top: 1rem; }
        .cc-ecosystem-note a { color: var(--text); text-decoration: underline; font-weight: 500; }
        .cc-prefill { background: rgba(16,185,129,.1); border: 1px solid rgba(16,185,129,.3); border-radius: 10px; padding: .7rem 1rem; font-size: .82rem; color: #6ee7b7; margin-bottom: 1rem; }
        .cc-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 2rem; margin: 1.5rem 0; }
        .cc-step-label { font-family: 'Space Grotesk', sans-serif; font-size: .68rem; font-weight: 600; text-transform: uppercase; letter-spacing: .15em; color: var(--muted); margin-bottom: .85rem; }
        .cc-apikey-box { background: var(--surface2); border: 1px solid var(--border); border-radius: 14px; padding: 1.2rem; margin-bottom: 1.5rem; }
        .cc-apikey-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: .65rem; }
        .cc-apikey-hdr h3 { font-family: 'Space Grotesk', sans-serif; font-size: .9rem; font-weight: 600; color: var(--text); }
        .cc-apikey-hdr a { font-size: .75rem; color: var(--muted); text-decoration: none; }
        .cc-apikey-hdr a:hover { color: var(--text); }
        .cc-input-row { display: flex; gap: .5rem; }
        .cc-input { width: 100%; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: .7rem 1rem; font-size: .88rem; font-family: inherit; color: var(--text); outline: none; transition: border-color .2s, box-shadow .2s; }
        .cc-input:focus { border-color: var(--text); box-shadow: 0 0 0 2px var(--border); }
        .cc-textarea { resize: none; min-height: 120px; line-height: 1.6; }
        .cc-toggle-btn { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); border-radius: 8px; padding: .7rem .9rem; color: #94a3b8; cursor: pointer; font-size: .82rem; white-space: nowrap; transition: all .2s; flex-shrink: 0; }
        .cc-toggle-btn:hover { background: rgba(255,255,255,.1); color: #e2e8f0; }
        .cc-hint { font-size: .73rem; color: rgba(148,163,184,.6); margin-top: .25rem; }
        .cc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: .85rem; }
        @media (max-width: 768px) { .cc-grid { grid-template-columns: 1fr; gap: 1rem; } }
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
        .cc-loading p { color: var(--muted); font-size: .9rem; }
        .cc-result { margin-top: 2rem; animation: fadeUp .4s ease; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .cc-result-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; flex-wrap: wrap; gap: .5rem; }
        .cc-result-title { font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 600; color: var(--text); }
        .cc-result-actions { display: flex; gap: .5rem; flex-wrap: wrap; }
        .cc-action-btn { display: flex; align-items: center; gap: .4rem; padding: .5rem 1rem; border-radius: 8px; border: 1px solid var(--border); background: var(--surface2); color: var(--text); font-size: .85rem; font-weight: 500; cursor: pointer; transition: all .2s; font-family: inherit; }
        .cc-action-btn:hover { background: var(--border); }
        .cc-action-btn.success { border-color: var(--emerald); color: var(--emerald); }
        .cc-result-content { background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; font-size: .9rem; line-height: 1.7; white-space: pre-wrap; color: var(--text); max-height: 500px; overflow-y: auto; }
        
        .cc-ecosystem { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 2rem; margin: 2rem 0; text-align: center; }
        .cc-ecosystem h3 { font-family: 'Inter', sans-serif; font-size: 1.1rem; font-weight: 600; margin-bottom: .75rem; color: var(--text); }
        .cc-ecosystem p { font-size: .9rem; color: var(--muted); line-height: 1.6; max-width: 580px; margin: 0 auto 1.5rem; }
        .cc-flow { display: flex; align-items: center; justify-content: center; gap: .5rem; flex-wrap: wrap; }
        .cc-flow-item { background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; padding: .5rem 1rem; font-size: .85rem; font-weight: 500; text-decoration: none; color: var(--text); transition: all .2s; }
        .cc-flow-item:hover { background: var(--border); }
        .cc-flow-item.active { background: var(--primary); border-color: var(--primary); color: var(--bg); }
        .cc-arrow { color: var(--muted-2); }
        footer { border-top: 1px solid var(--border); padding: 2rem 0; text-align: center; font-size: .85rem; color: var(--muted); }
        footer a { color: var(--text); text-decoration: underline; }
      `}</style>

      <div className="cc-body">
        <nav className="cc-nav-fixed" style={{ borderBottom: 'none' }}>
          <div className="cc-nav-inner">
            <Link href="/" style={{ color: "var(--muted)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <span>←</span> <span className="cc-back-text">{lang === 'en' ? 'Back to Portfolio' : 'Kembali ke Portofolio'}</span>
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="cc-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--surface2)', borderRadius: '99px', border: '1px solid var(--border)' }}>
                <div className="dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text)' }}></div>
                CoverCraft
              </div>
              <button onClick={toggleLang} className="lang-toggle" style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: '6px', cursor: 'pointer' }}>
                {lang === "en" ? "EN / ID" : "ID / EN"}
              </button>
            </div>
          </div>
        </nav>
        <div className="cc-container">
          <section className="cc-hero">
            <div className="cc-chip">{t.chip}</div>
            <h1>{t.title1} <span>{t.title2}</span><br />{t.title3}</h1>
            <p>{t.desc}</p>
            <div className="cc-ecosystem-note">
              {t.note}{" "}
              <a href="https://jobtracker-kjmw.vercel.app/demo" target="_blank" rel="noopener">JobTrail Demo ↗</a>
            </div>
          </section>

          {notification && (
            <div style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: notification.type === 'error' ? 'rgba(239, 68, 68, 0.15)' : notification.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(56, 189, 248, 0.15)',
              border: `1px solid ${notification.type === 'error' ? 'rgba(239, 68, 68, 0.3)' : notification.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(56, 189, 248, 0.3)'}`,
              color: notification.type === 'error' ? '#f87171' : notification.type === 'success' ? '#34d399' : '#38bdf8',
              animation: 'fadeUp 0.3s ease'
            }}>
              <span>{notification.msg}</span>
              <button onClick={() => setNotification(null)} style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '1.2rem', padding: '0 0.5rem' }}>×</button>
            </div>
          )}

          {prefilled && (
            <div className="cc-prefill">{t.prefilled}</div>
          )}

          <div className="cc-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <p className="cc-step-label" style={{ margin: 0 }}>{t.step1}</p>
              <button 
                type="button" 
                onClick={fillSampleData}
                style={{
                  background: 'rgba(56, 189, 248, 0.1)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  color: '#38bdf8',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.2s'
                }}
              >
                {t.sampleBtn}
              </button>
            </div>
            <div className="cc-grid">
              <div className="cc-group">
                <label className="cc-label">{t.jobTitleLabel} <span>*</span></label>
                <input className="cc-input" placeholder={t.jobTitlePh} value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
              </div>
              <div className="cc-group">
                <label className="cc-label">{t.companyLabel} <span>*</span></label>
                <input className="cc-input" placeholder={t.companyPh} value={company} onChange={(e) => setCompany(e.target.value)} />
              </div>
              <div className="cc-group full">
                <label className="cc-label">
                  {t.jobDescLabel} <span>*</span> 
                  {isScraping && <span style={{ color: "#a78bfa", marginLeft: "10px", fontWeight: "normal", fontSize: "0.75rem" }}>{t.scraping}</span>}
                </label>
                <textarea 
                  className="cc-input cc-textarea" 
                  rows={6} 
                  placeholder={isScraping ? t.scrapingPh : t.jobDescPh} 
                  value={jobDesc} 
                  onChange={(e) => setJobDesc(e.target.value)} 
                  disabled={isScraping}
                />
              </div>
            </div>

            <hr className="cc-divider" />
            <p className="cc-step-label">{t.step2}</p>
            <div className="cc-grid">
              <div className="cc-group">
                <label className="cc-label">{t.nameLabel}</label>
                <input className="cc-input" placeholder={t.namePh} value={yourName} onChange={(e) => setYourName(e.target.value)} />
              </div>
              <div className="cc-group">
                <label className="cc-label">{t.roleLabel}</label>
                <input 
                  className="cc-input" 
                  placeholder={t.rolePh} 
                  value={targetRole} 
                  onChange={(e) => setTargetRole(e.target.value)} 
                />
              </div>
              <div className="cc-group full">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "0.35rem" }}>
                  <label className="cc-label" style={{ marginBottom: 0 }}>{t.bgLabel}</label>
                  <label style={{ 
                    cursor: "pointer", 
                    fontSize: "0.75rem", 
                    color: "#a78bfa", 
                    background: "rgba(124,58,237,.1)", 
                    padding: "0.3rem 0.6rem", 
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem"
                  }}>
                    {isParsingPdf ? t.parsing : t.upload}
                    <input 
                      type="file" 
                      accept=".pdf" 
                      style={{ display: "none" }} 
                      onChange={handleFileUpload} 
                      disabled={isParsingPdf}
                    />
                  </label>
                </div>
                <textarea 
                  className="cc-input cc-textarea" 
                  rows={5} 
                  placeholder={t.bgPh} 
                  value={background} 
                  onChange={(e) => setBackground(e.target.value)} 
                  disabled={isParsingPdf}
                />
              </div>
            </div>

            <hr className="cc-divider" />
            <p className="cc-step-label">{t.step3}</p>
            <div className="cc-tone-row">
              {tones.map((toneOpt) => (
                <span key={toneOpt.id}>
                  <input type="radio" name="tone" id={`tone-${toneOpt.id}`} className="cc-tone-opt" checked={tone === toneOpt.id} onChange={() => setTone(toneOpt.id)} />
                  <label htmlFor={`tone-${toneOpt.id}`} className="cc-tone-label">{toneOpt.label}</label>
                </span>
              ))}
            </div>

            {errorMsg && <div className="cc-error">{errorMsg}</div>}

            <button className="cc-btn-generate" onClick={generate} disabled={loading}>
              {loading ? t.btnLoading : t.btnGen}
            </button>
          </div>

          {loading && (
            <div className="cc-loading">
              <div className="cc-spinner"></div>
              <p>{t.loadingMsg}</p>
            </div>
          )}

          {result && !loading && (
            <div className="cc-result">
              <div className="cc-result-header">
                <div className="cc-result-title">{t.resReady}</div>
                <div className="cc-result-actions">
                  <button className={`cc-action-btn ${copied ? "success" : ""}`} onClick={copyResult}>
                    {copied ? t.copied : t.copy}
                  </button>
                  <button className="cc-action-btn" onClick={downloadResult}>{t.download}</button>
                  {jobId && (
                    <button
                      className={`cc-action-btn ${savedToJobTrail ? "success" : ""}`}
                      onClick={saveToJobTrail}
                      disabled={isSaving || savedToJobTrail}
                    >
                      {savedToJobTrail ? t.savedBtn : isSaving ? t.savingBtn : t.saveBtn}
                    </button>
                  )}
                  <button className="cc-action-btn" onClick={() => { setResult(""); generate(); }}>{t.regen}</button>
                </div>
              </div>
              <div className="cc-result-content">{result}</div>
            </div>
          )}

          <div className="cc-ecosystem">
            <h3>{t.ecoTitle}</h3>
            <p>{t.ecoDesc1} <strong>JobTrail</strong> {t.ecoDesc2} <strong>AutoApply Flow</strong> {t.ecoDesc3}</p>
            <div className="cc-flow">
              <Link href="/autoapply" className="cc-flow-item">{t.ecoBtn1}</Link>
              <span className="cc-arrow">→</span>
              <a href="https://jobtracker-kjmw.vercel.app/demo" target="_blank" rel="noopener" className="cc-flow-item">{t.ecoBtn2}</a>
              <span className="cc-arrow">→</span>
              <span className="cc-flow-item active">{t.ecoBtn3}</span>
              <span className="cc-arrow">→</span>
              <span className="cc-flow-item">{t.ecoBtn4}</span>
            </div>
          </div>
        </div>

        <footer>
          <div className="cc-container">
            {t.footer1} <a href="/">Gryven Alverdo Gunawan</a> ·{" "}
            <a href="https://github.com/gryvnalvrdo" target="_blank" rel="noopener">GitHub</a> ·
            {t.footer2}
          </div>
        </footer>
      </div>
    </>
  );
}
