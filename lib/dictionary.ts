export const dict = {
  en: {
    nav: {
      about: "About",
      suite: "The Suite",
      projects: "Projects",
      skills: "Skills",
      experience: "Experience",
      hire: "Hire Me",
    },
    hero: {
      badge: "Open to Work · Full-time & Remote",
      hi: "Hi, I'm",
      role: "Software Engineer",
      sub: "I build full-stack web apps and ML systems — from job trackers to plagiarism detectors. Currently job hunting, so I engineered the tools to do it better.",
      tagline: "\"I'm not just job hunting — I'm engineering the process.\"",
      viewProjects: "View Projects →",
      location: "📍 Makassar · Open to Remote",
      stats: {
        projects: "Major Projects",
        years: "Years Coding"
      }
    },
    about: {
      label: "About Me",
      title1: "A Developer Who's ",
      title2: "Engineering His Own Job Hunt",
      p1: "I'm a fresh graduate in Informatics Engineering from Universitas Atma Jaya Makassar (GPA 3.88/4.00), passionate about building practical tools that solve real problems.",
      p2: "During my internship at Hotel Claro Makassar, I served as both IT Support and Web Developer — handling everything from technical support to deploying the hotel's full website. This taught me to be adaptable, resourceful, and always deliver.",
      p3: "Right now, I'm actively looking for my next role as a Software Engineer. Instead of just sending resumes, I built a whole suite of tools to make the process smarter — and that became this portfolio.",
      highlightTitle: "💡 Why This Portfolio Exists",
      highlightText: "Every project here was born from a real need during my job search. JobTrail tracks my applications. AutoApply Flow automates discovery. CoverCraft generates tailored letters. These aren't just demo projects — they're tools I use daily.",
      side: [
        { title: "S1 Teknik Informatika", desc: "Universitas Atma Jaya Makassar · GPA 3.88/4.00 · 2022–2026" },
        { title: "IT Support Intern & Web Dev", desc: "Hotel Claro Makassar · Aug – Oct 2025" },
        { title: "Based in Makassar", desc: "Open to remote, hybrid, or relocation" },
        { title: "Languages", desc: "Bahasa Indonesia (native) · English (professional)" },
      ]
    },
    ecosystem: {
      label: "The Job Hunting Suite",
      title1: "Three Tools. ",
      title2: "One Ecosystem.",
      desc: "These three projects are not independent demos — they're a connected system I built to automate and optimize my own job search. Each tool feeds into the next, creating an end-to-end pipeline from job discovery to application delivery.",
      nodes: [
        { title: "AutoApply Flow", desc: "n8n workflow that monitors job boards and automatically sends new job listings to JobTrail" },
        { title: "JobTrail", desc: "Full-stack tracker to manage applications, track status, and analyze response rates with charts" },
        { title: "CoverCraft", desc: "AI-powered generator that creates personalized cover letters from job descriptions using Gemini" },
        { title: "You Get Hired", desc: "The full pipeline from discovery to personalized application, automated and optimized" },
      ],
      connectors: ["sends job data via HTTP POST", "passes job details via URL params", "you submit the application"],
      proofsTitle: "How They Actually Connect",
      proofs: [
        { title: "AutoApply Flow → JobTrail", desc: "The n8n workflow sends a POST request to JobTrail's internal API endpoint with job title, company, and URL. The job appears automatically in your JobTrail dashboard." },
        { title: "JobTrail → CoverCraft", desc: "On the JobTrail application detail page, a \"Generate Cover Letter\" button opens CoverCraft with the job title and company pre-filled via URL parameters." },
        { title: "One Dashboard to Track All", desc: "Every application — whether added manually or via AutoApply Flow — is tracked in JobTrail with status history, follow-up reminders, and response rate analytics." },
      ]
    },
    projects: {
      label: "Projects",
      title1: "The ",
      title2: "Job Hunting Suite",
      desc: "Three interconnected tools I built while actively job hunting. Each one solves a real problem I faced in the process.",
      jobtrail: {
        num: "Project 01 · Live App",
        title: "JobTrail",
        sub: "Full-Stack Job Application Tracker",
        desc: "A complete web app to track job applications from Applied → Offer. Features status history timeline, dashboard charts (bar + donut), response rate analytics, CSV export, follow-up reminders, and dark/light mode. Built with Next.js 15, Prisma 7, PostgreSQL on Neon, and NextAuth.js.",
        btn1: "🚀 Try Live Demo",
      },
      covercraft: {
        num: "Project 02 · AI-Powered",
        title: "CoverCraft",
        sub: "AI Cover Letter Generator",
        desc: "A privacy-first AI tool that generates personalized, ATS-friendly cover letters from any job description. Uses Gemini API (your own key — never stored). Supports 4 tones: Professional, Enthusiastic, Concise, and Creative. Pre-fills automatically when opened from JobTrail.",
        btn1: "🚀 Try CoverCraft",
      },
      autoapply: {
        num: "Project 03 · Automation",
        title: "AutoApply Flow",
        sub: "n8n Job Hunt Automation Workflow",
        desc: "An n8n workflow that monitors job boards (LinkedIn RSS, Kalibrr, Glints) for matching listings, filters by keywords and location, then automatically sends new jobs to JobTrail via webhook. Also sends Telegram/email notifications so you never miss a relevant opportunity.",
        btn1: "📖 View Workflow Docs",
      },
      melodysimilarity: {
        num: "Project 04 · Machine Learning",
        title: "Melody Similarity",
        sub: "AI Music Plagiarism & Cover Detector",
        desc: "A machine learning system that finds songs with similar melodies. Uses Demucs for drum removal and a custom CRNN (CNN + BiLSTM + Attention) model trained with NT-Xent contrastive loss on 5,000+ YouTube song pairs. Includes a Flask web interface and FAISS vector search.",
        btn1: "🎵 View GitHub Repo",
      }
    },
    skills: {
      label: "Tech Stack",
      title1: "What I ",
      title2: "Build With"
    },
    experience: {
      label: "Experience & Education",
      title1: "My ",
      title2: "Journey",
      items: [
        {
          date: "Aug 2025 – Oct 2025",
          title: "IT Support Intern & Web Developer",
          org: "Hotel Claro Makassar · Makassar, Indonesia",
          desc: [
            "Resolved hardware/software issues across departments, ensuring minimal operational downtime",
            "Developed and maintained the hotel's full-stack website (front-end + back-end) with Laravel 11",
            "Managed deployment and hosting on Linux production servers",
            "Built responsive, mobile-first UI with vanilla JS/CSS",
          ]
        },
        {
          date: "Jan 2026 – Jul 2026",
          title: "Melody Similarity Detector",
          org: "Personal Project · ML Research",
          desc: [
            "Scraped and preprocessed 5,000+ song pairs (original vs. cover/remix) from YouTube",
            "Designed custom CNN + BiLSTM architecture with attention pooling (4-3M parameters)",
            "Used CQT features and MoCo-style momentum encoder, trained on GPU (NVIDIA RTX 3060)",
            "Achieved 80%+ accuracy on 15 validated plagiarism cases with hard-negative mining",
          ]
        },
        {
          date: "2022 – 2026",
          title: "S1 Teknik Informatika",
          org: "Universitas Atma Jaya Makassar · GPA 3.88/4.00",
          desc: [
            "Specialized in web development and machine learning",
            "Graduated with honors from the Faculty of Informatics Engineering",
            "Built several full-stack applications and ML systems throughout the program",
          ]
        }
      ]
    },
    contact: {
      label: "Contact",
      title1: "Let's ",
      title2: "Work Together",
      chip: "Available for full-time positions · Open to remote globally",
      desc: "I'm actively seeking Software Engineer roles — full-time, remote, or hybrid. If you're building something meaningful and need a developer who ships fast, learns faster, and brings both web and ML skills to the table, let's talk.",
      btn: "Say Hello 👋"
    },
    footer: {
      built: "Designed & built by",
      part: "Part of the Job Hunting Suite — engineered to land the next role."
    }
  },
  id: {
    nav: {
      about: "Tentang",
      suite: "Suite",
      projects: "Proyek",
      skills: "Keahlian",
      experience: "Pengalaman",
      hire: "Rekrut Saya",
    },
    hero: {
      badge: "Siap Bekerja · Full-time & Remote",
      hi: "Halo, saya",
      role: "Software Engineer",
      sub: "Saya membangun aplikasi web full-stack dan sistem ML — dari pelacak lowongan kerja hingga pendeteksi plagiarisme. Saat ini sedang mencari pekerjaan, jadi saya merekayasa alat untuk melakukannya dengan lebih baik.",
      tagline: "\"Saya tidak sekadar mencari kerja — saya merekayasa prosesnya.\"",
      viewProjects: "Lihat Proyek →",
      location: "📍 Makassar · Siap Remote",
      stats: {
        projects: "Proyek Utama",
        years: "Tahun Ngoding"
      }
    },
    about: {
      label: "Tentang Saya",
      title1: "Developer yang ",
      title2: "Merekayasa Pencarian Kerjanya Sendiri",
      p1: "Saya adalah lulusan baru Teknik Informatika dari Universitas Atma Jaya Makassar (IPK 3.88/4.00), bersemangat dalam membangun alat praktis yang memecahkan masalah nyata.",
      p2: "Selama magang di Hotel Claro Makassar, saya menjabat sebagai IT Support sekaligus Web Developer — menangani segalanya mulai dari dukungan teknis hingga men-deploy website penuh hotel. Hal ini mengajari saya untuk mudah beradaptasi, banyak akal, dan selalu memberikan hasil terbaik.",
      p3: "Saat ini, saya sedang aktif mencari peran berikutnya sebagai Software Engineer. Daripada sekadar mengirimkan resume, saya membangun serangkaian alat lengkap untuk membuat prosesnya lebih cerdas — dan itulah yang menjadi portofolio ini.",
      highlightTitle: "💡 Mengapa Portofolio Ini Ada",
      highlightText: "Setiap proyek di sini lahir dari kebutuhan nyata selama saya mencari kerja. JobTrail melacak lamaran saya. AutoApply Flow mengotomatiskan penemuan loker. CoverCraft membuat surat lamaran (cover letter) yang disesuaikan. Ini bukan sekadar proyek demo — ini adalah alat yang saya gunakan setiap hari.",
      side: [
        { title: "S1 Teknik Informatika", desc: "Universitas Atma Jaya Makassar · IPK 3.88/4.00 · 2022–2026" },
        { title: "IT Support Intern & Web Dev", desc: "Hotel Claro Makassar · Ags – Okt 2025" },
        { title: "Berbasis di Makassar", desc: "Terbuka untuk remote, hybrid, atau relokasi" },
        { title: "Bahasa", desc: "Bahasa Indonesia (Penutur asli) · Inggris (Profesional)" },
      ]
    },
    ecosystem: {
      label: "Job Hunting Suite",
      title1: "Tiga Alat. ",
      title2: "Satu Ekosistem.",
      desc: "Ketiga proyek ini bukanlah demo independen — mereka adalah sistem terhubung yang saya bangun untuk mengotomatisasi dan mengoptimalkan pencarian kerja saya sendiri. Setiap alat memberikan masukan pada alat berikutnya, menciptakan alur ujung-ke-ujung mulai dari penemuan pekerjaan hingga pengiriman lamaran.",
      nodes: [
        { title: "AutoApply Flow", desc: "Alur kerja n8n yang memantau portal lowongan kerja & mengirim otomatis loker baru ke JobTrail" },
        { title: "JobTrail", desc: "Pelacak full-stack untuk mengelola lamaran, melacak status, dan analisis respons" },
        { title: "CoverCraft", desc: "Generator bertenaga AI untuk membuat cover letter personalisasi menggunakan Gemini" },
        { title: "Anda Diterima Kerja", desc: "Seluruh alur dari penemuan loker hingga lamaran kustomisasi, diotomatisasi & dioptimalkan" },
      ],
      connectors: ["kirim data loker via HTTP POST", "kirim detail loker via URL params", "anda mengirim lamaran"],
      proofsTitle: "Bagaimana Mereka Benar-Benar Terhubung",
      proofs: [
        { title: "AutoApply Flow → JobTrail", desc: "Workflow n8n mengirim permintaan POST ke endpoint API internal JobTrail dengan judul pekerjaan, perusahaan, dan URL. Pekerjaan ini muncul otomatis di dashboard JobTrail Anda." },
        { title: "JobTrail → CoverCraft", desc: "Di halaman detail lamaran JobTrail, tombol \"Generate Cover Letter\" membuka CoverCraft dengan judul pekerjaan & perusahaan terisi otomatis melalui URL." },
        { title: "Satu Dashboard untuk Semua", desc: "Setiap lamaran — baik ditambahkan secara manual maupun via AutoApply Flow — dilacak di JobTrail beserta riwayat status, pengingat follow-up, & analitik respons." },
      ]
    },
    projects: {
      label: "Proyek",
      title1: "The ",
      title2: "Job Hunting Suite",
      desc: "Tiga alat saling terhubung yang saya bangun selama aktif mencari kerja. Masing-masing menyelesaikan masalah nyata yang saya hadapi dalam prosesnya.",
      jobtrail: {
        num: "Proyek 01 · Aplikasi Live",
        title: "JobTrail",
        sub: "Full-Stack Job Application Tracker",
        desc: "Aplikasi web lengkap untuk melacak lamaran kerja dari Dilamar → Ditawarkan. Fitur termasuk timeline riwayat status, grafik dashboard, analitik tingkat respons, ekspor CSV, pengingat follow-up, & mode gelap/terang. Dibangun dengan Next.js 15, Prisma 7, PostgreSQL di Neon, & NextAuth.js.",
        btn1: "🚀 Coba Demo Live",
      },
      covercraft: {
        num: "Proyek 02 · Bertenaga AI",
        title: "CoverCraft",
        sub: "AI Cover Letter Generator",
        desc: "Alat AI mengutamakan privasi yang menghasilkan cover letter (surat lamaran) personalisasi & ramah-ATS. Menggunakan Gemini API (kunci Anda sendiri — tidak pernah disimpan). Mendukung 4 nada: Profesional, Antusias, Singkat, & Kreatif. Terisi otomatis ketika dibuka dari JobTrail.",
        btn1: "🚀 Coba CoverCraft",
      },
      autoapply: {
        num: "Proyek 03 · Otomatisasi",
        title: "AutoApply Flow",
        sub: "n8n Job Hunt Automation Workflow",
        desc: "Alur kerja n8n yang memantau portal kerja (LinkedIn RSS, Kalibrr, Glints) untuk daftar yang cocok, memfilter berdasarkan kata kunci & lokasi, lalu secara otomatis mengirimkan pekerjaan baru ke JobTrail via webhook. Juga mengirimkan notifikasi Telegram/email sehingga tidak terlewatkan.",
        btn1: "📖 Lihat Dok. Workflow",
      },
      melodysimilarity: {
        num: "Proyek 04 · Machine Learning",
        title: "Melody Similarity",
        sub: "AI Pendeteksi Plagiarisme Musik & Cover",
        desc: "Sistem machine learning yang menemukan lagu dengan melodi serupa. Menggunakan Demucs untuk menghapus suara drum dan model CRNN kustom (CNN + BiLSTM + Attention) yang dilatih dengan NT-Xent contrastive loss pada 5.000+ pasangan lagu YouTube. Dilengkapi antarmuka web Flask dan pencarian vektor FAISS.",
        btn1: "🎵 Lihat Repositori GitHub",
      }
    },
    skills: {
      label: "Tumpukan Teknologi",
      title1: "Teknologi yang ",
      title2: "Saya Gunakan"
    },
    experience: {
      label: "Pengalaman & Pendidikan",
      title1: "Perjalanan ",
      title2: "Saya",
      items: [
        {
          date: "Ags 2025 – Okt 2025",
          title: "IT Support Intern & Web Developer",
          org: "Hotel Claro Makassar · Makassar, Indonesia",
          desc: [
            "Menyelesaikan masalah perangkat keras/lunak di seluruh departemen, memastikan waktu operasional maksimal",
            "Mengembangkan dan mengelola situs web full-stack hotel (front-end + back-end) dengan Laravel 11",
            "Mengelola deployment dan hosting pada server produksi Linux",
            "Membangun UI responsif & mobile-first menggunakan vanilla JS/CSS",
          ]
        },
        {
          date: "Jan 2026 – Jul 2026",
          title: "Melody Similarity Detector",
          org: "Proyek Pribadi · Riset ML",
          desc: [
            "Melakukan scraping dan prapemrosesan pada 5.000+ pasangan lagu (asli vs cover/remix) dari YouTube",
            "Mendesain arsitektur CNN + BiLSTM kustom dengan attention pooling (4-3 juta parameter)",
            "Menggunakan fitur CQT dan momentum encoder ala MoCo, dilatih pada GPU (NVIDIA RTX 3060)",
            "Mencapai akurasi 80%+ pada 15 kasus plagiarisme tervalidasi menggunakan hard-negative mining",
          ]
        },
        {
          date: "2022 – 2026",
          title: "S1 Teknik Informatika",
          org: "Universitas Atma Jaya Makassar · IPK 3.88/4.00",
          desc: [
            "Mengkhususkan diri pada pengembangan web dan pembelajaran mesin (machine learning)",
            "Lulus dengan predikat pujian dari Fakultas Teknik Informatika",
            "Membangun berbagai aplikasi full-stack dan sistem ML selama masa perkuliahan",
          ]
        }
      ]
    },
    contact: {
      label: "Kontak",
      title1: "Mari ",
      title2: "Bekerja Sama",
      chip: "Tersedia untuk posisi full-time · Terbuka untuk remote global",
      desc: "Saya aktif mencari peran Software Engineer — full-time, remote, atau hybrid. Jika Anda sedang membangun sesuatu yang bermakna dan membutuhkan pengembang yang merilis dengan cepat, belajar lebih cepat, serta membawa keahlian web dan ML, mari berdiskusi.",
      btn: "Sapa Saya 👋"
    },
    footer: {
      built: "Dirancang & dibangun oleh",
      part: "Bagian dari Job Hunting Suite — direkayasa untuk mendapatkan peran selanjutnya."
    }
  }
};
