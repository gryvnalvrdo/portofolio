"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/useLanguage";
import { useTheme } from "@/lib/useTheme";

export default function CoverCraftPage() {
  const [theme, toggleTheme] = useTheme();
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [yourName, setYourName] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [background, setBackground] = useState("");
  const [isScraping, setIsScraping] = useState(false);
  const [isParsingPdf, setIsParsingPdf] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info";
    msg: string;
  } | null>(null);

  const [tone, setTone] = useState("professional");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [lang, toggleLang] = useLanguage();
  const [jobId, setJobId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedToJobTrail, setSavedToJobTrail] = useState(false);
  const [copied, setCopied] = useState(false);
  const [prefilled, setPrefilled] = useState(false);

  const t = {
    en: {
      back: "Portfolio",
      chip: "Stage 03: AI Cover Letter Studio",
      title1: "Personalized ",
      title2: "Cover Letters in Seconds",
      desc: "Paste a job description or link, upload your PDF resume, and generate a tailored cover letter ready for applications. Syncs directly with JobTrail.",
      sampleBtn: "Load Sample Job",
      note: "Connected with Stage 02:",
      prefilled:
        "Job details received from JobTrail. Review below and click Generate.",
      step1: "Step 1: Job Details",
      jobTitleLabel: "Job Title",
      jobTitlePh: "e.g. Software Engineer",
      companyLabel: "Company Name",
      companyPh: "e.g. Tech Company",
      jobDescLabel: "Job Description",
      scraping: "Reading job description from link...",
      scrapingPh: "Fetching job details...",
      jobDescPh: "Paste the job description here...",
      step2: "Step 2: Your Resume & Background",
      nameLabel: "Your Name",
      namePh: "e.g. Gryven Alverdo Gunawan",
      roleLabel: "Target Role",
      rolePh: "Software Engineer",
      bgLabel: "Background & Key Experience",
      parsing: "Reading PDF file...",
      upload: "Upload CV (PDF)",
      bgPh: "Paste your resume summary here, or upload a PDF CV above...",
      step3: "Step 3: Writing Style",
      btnGen: "Generate Cover Letter",
      btnLoading: "Writing your cover letter...",
      loadingMsg: "Reviewing job requirements and drafting your letter...",
      resReady: "Your Cover Letter is Ready",
      copy: "Copy Text",
      copied: "Copied",
      download: "Download .txt",
      saveBtn: "Save to JobTrail",
      savingBtn: "Saving...",
      savedBtn: "Saved to JobTrail",
      regen: "Regenerate",
      ecoTitle: "Connected Job Hunting Suite",
      ecoDesc:
        "CoverCraft receives job details from JobTrail (02) and saves finished cover letters right back to your tracker.",
      ecoBtn1: "01: AutoApply Flow",
      ecoBtn2: "02: JobTrail",
      ecoBtn3: "03: CoverCraft",
    },
    id: {
      back: "Portofolio",
      chip: "Tahap 03: Studio Cover Letter AI",
      title1: "Buat Cover Letter ",
      title2: "dalam Hitungan Detik",
      desc: "Tempelkan deskripsi lowongan, unggah CV PDF Anda, dan hasilkan surat lamaran personalisasi yang siap kirim. Terhubung langsung dengan JobTrail.",
      sampleBtn: "Isi Contoh Loker",
      note: "Terhubung dengan Tahap 02:",
      prefilled:
        "Detail lowongan diterima dari JobTrail. Periksa di bawah lalu klik Buat Cover Letter.",
      step1: "Langkah 1: Detail Pekerjaan",
      jobTitleLabel: "Posisi Pekerjaan",
      jobTitlePh: "contoh: Software Engineer",
      companyLabel: "Nama Perusahaan",
      companyPh: "contoh: Perusahaan Teknologi",
      jobDescLabel: "Deskripsi Pekerjaan",
      scraping: "Mengambil detail loker dari tautan...",
      scrapingPh: "Mengambil teks lowongan...",
      jobDescPh: "Tempelkan deskripsi pekerjaan di sini...",
      step2: "Langkah 2: CV & Latar Belakang Anda",
      nameLabel: "Nama Anda",
      namePh: "contoh: Gryven Alverdo Gunawan",
      roleLabel: "Peran yang Dituju",
      rolePh: "Software Engineer",
      bgLabel: "Ringkasan Pengalaman & Keahlian",
      parsing: "Membaca file PDF...",
      upload: "Unggah CV (PDF)",
      bgPh: "Tempel ringkasan CV di sini, atau unggah file PDF di atas...",
      step3: "Langkah 3: Gaya Penulisan",
      btnGen: "Buat Cover Letter",
      btnLoading: "Menyusun surat lamaran...",
      loadingMsg: "Memahami kebutuhan lowongan dan menyusun surat Anda...",
      resReady: "Cover Letter Anda Siap",
      copy: "Salin Teks",
      copied: "Tersalin",
      download: "Unduh .txt",
      saveBtn: "Simpan ke JobTrail",
      savingBtn: "Menyimpan...",
      savedBtn: "Tersimpan di JobTrail",
      regen: "Buat Ulang",
      ecoTitle: "Ekosistem Job Hunting Suite",
      ecoDesc:
        "CoverCraft menerima detail lowongan dari JobTrail (02) dan menyimpan surat yang selesai kembali ke pelacak lamaran Anda.",
      ecoBtn1: "01: AutoApply Flow",
      ecoBtn2: "02: JobTrail",
      ecoBtn3: "03: CoverCraft",
    },
  }[lang];

  const scrapeUrl = useCallback(
    async (url: string) => {
      setIsScraping(true);
      try {
        const res = await fetch("/api/scrape", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.text) {
            setJobDesc(data.text);
            setNotification({
              type: "success",
              msg:
                lang === "id"
                  ? "Deskripsi lowongan berhasil diekstrak dari URL."
                  : "Job description extracted from URL.",
            });
            setTimeout(() => setNotification(null), 4000);
          } else {
            setNotification({
              type: "error",
              msg:
                lang === "id"
                  ? "Tidak dapat mengekstrak teks dari URL ini. Silakan tempel manual."
                  : "Could not extract text from this URL. Please paste manually.",
            });
          }
        } else {
          setNotification({
            type: "error",
            msg:
              lang === "id"
                ? "Situs tujuan memblokir scraping otomatis. Silakan tempel manual."
                : "Target website blocks automated scraping. Please paste manually.",
          });
        }
      } catch (e) {
        console.error("Scraping failed", e);
        setNotification({ type: "error", msg: "Error connecting to scraper endpoint." });
      }
      setIsScraping(false);
    },
    [lang]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let job = params.get("job") || "";
    let comp = params.get("company") || "";
    const url = params.get("url");
    const id = params.get("id");

    if ((comp.toLowerCase() === "company" || !comp) && job.includes(":")) {
      const parts = job.split(":");
      comp = parts[0].trim();
      job = parts.slice(1).join(":").trim();
    }

    queueMicrotask(() => {
      if (id) setJobId(id);
      if (job || comp || id) {
        if (job) {
          setJobTitle(job);
          setTargetRole(job);
        }
        if (comp) setCompany(comp);
        setPrefilled(true);
      }
      if (url) {
        void scrapeUrl(url);
      }
    });
  }, [scrapeUrl]);

  function fillSampleData() {
    setJobTitle("Full-Stack Software Engineer");
    setCompany("Tech Company");
    setTargetRole("Software Engineer");
    setYourName("Gryven Alverdo Gunawan");
    setBackground(
      "Informatics Engineering graduate (GPA 3.88/4.00) with production experience building Next.js 15 + Prisma 7 + PostgreSQL SaaS applications (JobTrail), Laravel 11 + Midtrans hospitality reservation systems (Hotel Claro Makassar), and automated n8n webhook pipelines."
    );
    setJobDesc(
      "We are seeking a Full-Stack Software Engineer to build high-performance web applications and resilient backend services. Responsibilities include designing scalable React/Next.js frontends, building REST APIs, and optimizing PostgreSQL queries with Prisma."
    );
    setNotification({
      type: "info",
      msg:
        lang === "id"
          ? "Contoh data Software Engineer berhasil dimuat."
          : "Sample Software Engineer context loaded.",
    });
    setTimeout(() => setNotification(null), 4000);
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
            const lines = data.text
              .split(/[\r\n]+/)
              .map((l: string) => l.trim())
              .filter(
                (l: string) =>
                  l.length > 0 && !l.includes("---Page") && !l.includes("----")
              );

            if (lines.length > 0) {
              let possibleName = lines[0];
              if (
                possibleName.toLowerCase().includes("resume") ||
                possibleName.toLowerCase().includes("curriculum vitae")
              ) {
                if (lines.length > 1) possibleName = lines[1];
              }
              possibleName = possibleName.split(/[\w.-]+@[\w.-]+\.\w+/)[0].trim();
              possibleName = possibleName.split(/[|,-]/)[0].trim();

              if (possibleName.length > 2 && possibleName.length <= 40) {
                setYourName(possibleName);
              }
            }
          }
          setNotification({
            type: "success",
            msg:
              lang === "id"
                ? "File CV PDF berhasil diekstrak."
                : "PDF resume parsed successfully.",
          });
          setTimeout(() => setNotification(null), 4000);
        }
      } else {
        const data = await res.json();
        setNotification({ type: "error", msg: data.error || "Failed to parse PDF" });
      }
    } catch (e) {
      console.error("Upload failed", e);
      setNotification({ type: "error", msg: "Error uploading PDF file" });
    }
    setIsParsingPdf(false);
    e.target.value = "";
  }

  const toneMap: Record<string, string> = {
    professional: "formal, confident, and results-oriented",
    enthusiastic: "enthusiastic and passionate while remaining professional",
    concise: "brief and direct, 3 paragraphs max",
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
    { id: "professional", label: lang === "id" ? "Profesional" : "Professional" },
    { id: "enthusiastic", label: lang === "id" ? "Antusias" : "Enthusiastic" },
    { id: "concise", label: lang === "id" ? "Singkat (3 Paragraf)" : "Concise (3 Paragraphs)" },
    { id: "creative", label: lang === "id" ? "Kreatif" : "Creative" },
  ];

  async function saveToJobTrail() {
    if (!jobId || !result) return;
    setIsSaving(true);
    try {
      const res = await fetch(
        `https://jobtracker-kjmw.vercel.app/api/public/applications/${jobId}/cover-letter`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ coverLetter: result }),
        }
      );
      if (res.ok) {
        setSavedToJobTrail(true);
      } else {
        setNotification({ type: "error", msg: "Failed to sync cover letter to JobTrail." });
      }
    } catch (e) {
      console.error(e);
      setNotification({ type: "error", msg: "Error connecting to JobTrail API." });
    }
    setIsSaving(false);
  }

  return (
    <>
      <style>{`
        .cc-body { background: var(--bg); color: var(--text); font-family: var(--font-sans); min-height: 100vh; }
        .cc-container { max-width: 900px; margin: 0 auto; padding: 0 1.5rem; position: relative; z-index: 1; }
        .cc-hero { text-align: center; padding: 3.25rem 0 2rem; }
        .cc-chip { display: inline-flex; align-items: center; gap: .5rem; background: var(--amber-bg); border: 1px solid var(--amber-bdr); border-radius: 6px; padding: .32rem .85rem; font-family: var(--font-mono); font-size: .72rem; color: var(--amber-l); font-weight: 700; margin-bottom: 1.15rem; }
        .cc-hero h1 { font-family: var(--font-display); font-size: clamp(1.9rem, 4.5vw, 2.85rem); font-weight: 700; line-height: 1.12; margin-bottom: .85rem; color: var(--text); letter-spacing: -0.025em; }
        .cc-hero h1 span { color: var(--amber-l); }
        .cc-hero p { color: var(--muted); font-size: .96rem; max-width: 600px; margin: 0 auto 1.25rem; line-height: 1.68; }
        .cc-ecosystem-note { display: inline-flex; align-items: center; gap: .5rem; background: var(--surface); border: 1px solid var(--border-strong); border-radius: 8px; padding: .5rem 1rem; font-family: var(--font-mono); font-size: .76rem; color: var(--text-2); }
        .cc-ecosystem-note a { color: var(--indigo-l); text-decoration: none; font-weight: 700; }
        .cc-ecosystem-note a:hover { text-decoration: underline; }
        .cc-prefill { background: var(--emerald-bg); border: 1px solid var(--emerald-bdr); border-radius: 10px; padding: .75rem 1rem; font-family: var(--font-mono); font-size: .78rem; color: var(--emerald-l); margin-bottom: 1rem; }
        .cc-card { background: var(--surface); border: 1px solid var(--border-strong); border-radius: 16px; padding: 1.85rem; margin: 1.25rem 0; }
        .cc-step-label { font-family: var(--font-mono); font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--amber-l); margin-bottom: .85rem; }
        .cc-sample-btn { background: var(--amber-bg); border: 1px solid var(--amber-bdr); color: var(--amber-l); font-family: var(--font-mono); font-size: 0.74rem; font-weight: 600; padding: 0.42rem 0.85rem; min-height: 36px; border-radius: 7px; cursor: pointer; transition: all 0.2s; }
        .cc-sample-btn:hover { background: rgba(245, 158, 11, 0.2); }
        .cc-upload-btn { cursor: pointer; font-family: var(--font-mono); font-size: 0.74rem; font-weight: 600; color: var(--indigo-l); background: var(--indigo-bg); border: 1px solid var(--indigo-bdr); padding: 0.35rem 0.75rem; border-radius: 7px; display: inline-flex; align-items: center; gap: 0.35rem; transition: all 0.2s; }
        .cc-upload-btn:hover { background: rgba(99, 102, 241, 0.22); color: #ffffff; }
        .cc-input { width: 100%; background: var(--bg); border: 1px solid var(--border-strong); border-radius: 10px; padding: .72rem 1rem; font-size: .88rem; font-family: inherit; color: var(--text); outline: none; transition: border-color .2s; }
        .cc-input:focus { border-color: var(--amber); }
        .cc-textarea { resize: vertical; min-height: 120px; line-height: 1.6; }
        .cc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: .85rem; }
        @media (max-width: 768px) { .cc-grid { grid-template-columns: 1fr; gap: .95rem; } }
        .cc-group { display: flex; flex-direction: column; gap: .38rem; }
        .cc-group.full { grid-column: 1 / -1; }
        .cc-label { font-size: .8rem; font-weight: 600; color: var(--text-2); }
        .cc-label span { color: var(--amber-l); }
        .cc-divider { border: none; border-top: 1px solid var(--border); margin: 1.35rem 0; }
        .cc-tone-row { display: flex; gap: .5rem; flex-wrap: wrap; }
        .cc-tone-opt { display: none; }
        .cc-tone-label { display: flex; align-items: center; justify-content: center; padding: .48rem .95rem; min-height: 40px; border-radius: 8px; border: 1px solid var(--border-strong); font-size: .8rem; font-weight: 500; cursor: pointer; transition: all .2s; color: var(--text-2); background: var(--surface2); user-select: none; }
        .cc-tone-opt:checked + .cc-tone-label { background: var(--amber-bg); border-color: var(--amber); color: var(--amber-l); font-weight: 700; }
        .cc-error { background: rgba(239,68,68,.12); border: 1px solid rgba(239,68,68,.3); border-radius: 10px; padding: .7rem 1rem; font-size: .83rem; color: #f87171; margin-top: .75rem; }
        .cc-btn-generate { width: 100%; padding: .9rem; min-height: 46px; background: var(--amber); border: none; border-radius: 10px; font-family: var(--font-display); font-size: .92rem; font-weight: 700; color: #0a0d14; cursor: pointer; transition: all .2s; margin-top: 1.25rem; }
        .cc-btn-generate:hover:not(:disabled) { background: var(--amber-l); transform: translateY(-1px); }
        .cc-btn-generate:disabled { opacity: .55; cursor: not-allowed; }
        .cc-loading { text-align: center; padding: 2.25rem 0; }
        .cc-spinner { width: 38px; height: 38px; border: 3px solid rgba(245,158,11,.2); border-top-color: var(--amber); border-radius: 50%; animation: spin .8s linear infinite; margin: 0 auto .75rem; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .cc-loading p { color: var(--muted); font-family: var(--font-mono); font-size: .82rem; }
        .cc-result { margin-top: 1.75rem; }
        .cc-result-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: .85rem; flex-wrap: wrap; gap: .5rem; }
        .cc-result-title { font-family: var(--font-mono); font-size: .78rem; font-weight: 700; color: var(--emerald-l); letter-spacing: 0.06em; }
        .cc-result-actions { display: flex; gap: .5rem; flex-wrap: wrap; }
        .cc-action-btn { display: inline-flex; align-items: center; justify-content: center; gap: .4rem; padding: .48rem .9rem; min-height: 38px; border-radius: 8px; border: 1px solid var(--border-strong); background: var(--surface2); color: var(--text); font-family: var(--font-mono); font-size: .76rem; font-weight: 600; cursor: pointer; transition: all .2s; }
        .cc-action-btn:hover { background: var(--surface3); }
        .cc-action-btn.success { border-color: var(--emerald); color: var(--emerald-l); background: var(--emerald-bg); }
        .cc-result-content { background: var(--bg); border: 1px solid var(--border-strong); border-radius: 12px; padding: 1.4rem; font-size: .9rem; line-height: 1.7; white-space: pre-wrap; color: var(--text); max-height: 500px; overflow-y: auto; }

        @media (max-width: 640px) {
          .cc-container { padding: 0 1rem; }
          .cc-hero { padding: 1.75rem 0 1.25rem; }
          .cc-card { padding: 1.25rem 1rem; border-radius: 14px; }
          .cc-input { font-size: 16px; }
          .cc-tone-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.45rem; }
          .cc-result-actions { display: grid; grid-template-columns: 1fr 1fr; width: 100%; }
          .cc-action-btn { width: 100%; }
        }
      `}</style>

      <div className="cc-body">
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
              <span style={{ color: "var(--amber-l)" }}>03</span>
              <span>CoverCraft</span>
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

        <div className="cc-container">
          <section className="cc-hero">
            <div className="cc-chip">{t.chip}</div>
            <h1>
              {t.title1} <span>{t.title2}</span>
            </h1>
            <p>{t.desc}</p>
            <div className="cc-ecosystem-note">
              <span>{t.note}</span>
              <a
                href="https://jobtracker-kjmw.vercel.app/demo"
                target="_blank"
                rel="noopener noreferrer"
              >
                02: JobTrail SaaS Demo
              </a>
            </div>
          </section>

          {notification && (
            <div
              style={{
                padding: "0.75rem 1.15rem",
                borderRadius: "10px",
                marginBottom: "1.25rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background:
                  notification.type === "error"
                    ? "rgba(239, 68, 68, 0.14)"
                    : notification.type === "success"
                    ? "var(--emerald-bg)"
                    : "var(--amber-bg)",
                border: `1px solid ${
                  notification.type === "error"
                    ? "rgba(239, 68, 68, 0.35)"
                    : notification.type === "success"
                    ? "var(--emerald-bdr)"
                    : "var(--amber-bdr)"
                }`,
                color:
                  notification.type === "error"
                    ? "#f87171"
                    : notification.type === "success"
                    ? "var(--emerald-l)"
                    : "var(--amber-l)",
              }}
            >
              <span>{notification.msg}</span>
              <button
                onClick={() => setNotification(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "inherit",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  padding: "0 0.4rem",
                }}
              >
                ×
              </button>
            </div>
          )}

          {prefilled && <div className="cc-prefill">{t.prefilled}</div>}

          <div className="cc-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <p className="cc-step-label" style={{ margin: 0 }}>
                {t.step1}
              </p>
              <button type="button" onClick={fillSampleData} className="cc-sample-btn">
                {t.sampleBtn}
              </button>
            </div>

            <div className="cc-grid">
              <div className="cc-group">
                <label className="cc-label">
                  {t.jobTitleLabel} <span>*</span>
                </label>
                <input
                  className="cc-input"
                  placeholder={t.jobTitlePh}
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              <div className="cc-group">
                <label className="cc-label">
                  {t.companyLabel} <span>*</span>
                </label>
                <input
                  className="cc-input"
                  placeholder={t.companyPh}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="cc-group full">
                <label className="cc-label">
                  {t.jobDescLabel} <span>*</span>
                  {isScraping && (
                    <span
                      style={{
                        color: "var(--indigo-l)",
                        marginLeft: "10px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                      }}
                    >
                      {t.scraping}
                    </span>
                  )}
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
                <input
                  className="cc-input"
                  placeholder={t.namePh}
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                />
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.35rem",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  <label className="cc-label" style={{ marginBottom: 0 }}>
                    {t.bgLabel}
                  </label>
                  <label className="cc-upload-btn">
                    <span>{isParsingPdf ? t.parsing : t.upload}</span>
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
                  <input
                    type="radio"
                    name="tone"
                    id={`tone-${toneOpt.id}`}
                    className="cc-tone-opt"
                    checked={tone === toneOpt.id}
                    onChange={() => setTone(toneOpt.id)}
                  />
                  <label htmlFor={`tone-${toneOpt.id}`} className="cc-tone-label">
                    {toneOpt.label}
                  </label>
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
              <div className="cc-spinner" />
              <p>{t.loadingMsg}</p>
            </div>
          )}

          {result && !loading && (
            <div className="cc-result">
              <div className="cc-result-header">
                <div className="cc-result-title">{t.resReady}</div>
                <div className="cc-result-actions">
                  <button
                    className={`cc-action-btn ${copied ? "success" : ""}`}
                    onClick={copyResult}
                  >
                    {copied ? t.copied : t.copy}
                  </button>
                  <button className="cc-action-btn" onClick={downloadResult}>
                    {t.download}
                  </button>
                  {jobId && (
                    <button
                      className={`cc-action-btn ${savedToJobTrail ? "success" : ""}`}
                      onClick={saveToJobTrail}
                      disabled={isSaving || savedToJobTrail}
                    >
                      {savedToJobTrail
                        ? t.savedBtn
                        : isSaving
                        ? t.savingBtn
                        : t.saveBtn}
                    </button>
                  )}
                  <button
                    className="cc-action-btn"
                    onClick={() => {
                      setResult("");
                      generate();
                    }}
                  >
                    {t.regen}
                  </button>
                </div>
              </div>
              <div className="cc-result-content">{result}</div>
            </div>
          )}

          <div className="subpage-ecosystem">
            <h3>{t.ecoTitle}</h3>
            <p>{t.ecoDesc}</p>
            <div className="subpage-eco-flow">
              <Link href="/autoapply" className="subpage-eco-item">
                {t.ecoBtn1}
              </Link>
              <a
                href="https://jobtracker-kjmw.vercel.app/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="subpage-eco-item"
              >
                {t.ecoBtn2}
              </a>
              <span className="subpage-eco-item active">{t.ecoBtn3}</span>
            </div>
          </div>
        </div>

        <footer className="subpage-footer">
          <div className="subpage-footer-inner">
            <div className="subpage-footer-brand">
              Gryven Alverdo Gunawan
            </div>
            <p className="subpage-footer-desc">
              {lang === "en"
                ? "Web Applications, Automation Workflows, and AI Tools."
                : "Aplikasi Web, Alur Otomasi, dan Sistem AI."}
            </p>
            <div className="subpage-footer-links">
              <Link href="/" className="subpage-footer-link">
                {lang === "en" ? "Back to Portfolio" : "Kembali ke Portofolio"}
              </Link>
              <a
                href="https://github.com/gryvnalvrdo"
                target="_blank"
                rel="noopener noreferrer"
                className="subpage-footer-link"
              >
                GitHub Profile
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
