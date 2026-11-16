export type SuiteSystemKey = "autoapply" | "jobtrail" | "covercraft";
export type AccentTheme = "emerald" | "indigo" | "amber" | "gold" | "sky";

export interface SuiteSystemItem {
  id: SuiteSystemKey;
  index: string;
  theme: AccentTheme;
  name: string;
  category: string;
  shortDesc: string;
  headline: string;
  overview: string;
  highlights: string[];
  flowTitle: string;
  flowSteps: { label: string; value: string }[];
  tools: string[];
  primaryBtn: { label: string; href: string; external?: boolean };
  secondaryBtn?: { label: string; href: string; external?: boolean };
}

export interface FeaturedProjectItem {
  id: string;
  theme: AccentTheme;
  category: string;
  name: string;
  summary: string;
  highlights: string[];
  tools: string[];
  primaryBtn: { label: string; href: string; external?: boolean };
}

export const dict = {
  en: {
    nav: {
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
      resume: "Resume",
      top: "Top",
      themeLight: "Light mode",
      themeDark: "Dark mode",
    },
    hero: {
      name: "Gryven Alverdo Gunawan",
      headline: "Building practical web applications, automation tools, and AI systems.",
      sub: "Informatics Engineering graduate from Universitas Atma Jaya Makassar. I build end-to-end digital products, ranging from hotel reservation platforms and tracking dashboards to automated workflows and audio AI tools.",
      exploreCta: "Explore Projects",
      contactCta: "Contact Me",
      profileSubtitle: "Universitas Atma Jaya Makassar",
      profileLocation: "Makassar, Indonesia",
      highlights: [
        { value: "4 Systems", label: "Web & AI Applications" },
        { value: "Automation", label: "n8n & AI Workflows" },
        { value: "Makassar", label: "Indonesia" },
      ],
      quickIndexTitle: "LIVE DEPLOYED SYSTEMS",
      quickIndexCount: "4 LIVE",
      quickIndex: [
        { code: "01", name: "AutoApply Flow", type: "Job Automation", theme: "emerald" as AccentTheme, target: "suite", system: "autoapply" as SuiteSystemKey },
        { code: "02", name: "JobTrail", type: "Application Tracker", theme: "indigo" as AccentTheme, target: "suite", system: "jobtrail" as SuiteSystemKey },
        { code: "03", name: "CoverCraft", type: "AI Cover Letters", theme: "amber" as AccentTheme, target: "suite", system: "covercraft" as SuiteSystemKey },
        { code: "04", name: "Hotel Claro Web", type: "Internship Work", theme: "gold" as AccentTheme, target: "experience" },
      ],
    },
    suite: {
      label: "Projects",
      title: "Personal & Research Applications",
      desc: "Applications I built to solve everyday problems, from an interconnected three-part job search suite to an AI audio similarity search system.",
      suiteSubheader: "Job Hunting Suite (3 Connected Tools)",
      suiteInstruction: "Select a stage below to inspect how each application works:",
      prevStepLabel: "Previous",
      nextStepLabel: "Next",
      systems: [
        {
          id: "autoapply" as SuiteSystemKey,
          index: "01",
          theme: "emerald" as AccentTheme,
          name: "AutoApply Flow",
          category: "Job Discovery Automation",
          shortDesc: "Finds matching job openings automatically every 6 hours",
          headline: "Automated Job Monitoring & Instant Alerts",
          overview:
            "Instead of checking multiple job websites manually every day, this workflow automatically scans remote job listings every 6 hours, filters positions that match target skills, prevents duplicate entries, saves them directly into JobTrail, and sends instant Telegram notifications.",
          highlights: [
            "Runs automatically on a 6-hour schedule without manual checks",
            "Filters job openings by role and relevant technical keywords",
            "Automatically skips duplicate listings that were already recorded",
            "Sends instant notifications to Telegram whenever a matching job is found",
          ],
          flowTitle: "How This Stage Works",
          flowSteps: [
            { label: "Schedule", value: "Checks job feeds automatically every 6 hours" },
            { label: "Filter", value: "Matches titles with software and web roles" },
            { label: "Sync", value: "Sends new openings securely to JobTrail" },
            { label: "Alert", value: "Delivers an instant message via Telegram" },
          ],
          tools: ["n8n Automation", "RSS Feeds", "Webhooks", "Telegram Bot"],
          primaryBtn: { label: "View Workflow & Live Activity", href: "/autoapply" },
          secondaryBtn: {
            label: "Open Public Feed",
            href: "https://jobtracker-kjmw.vercel.app/public/live",
            external: true,
          },
        },
        {
          id: "jobtrail" as SuiteSystemKey,
          index: "02",
          theme: "indigo" as AccentTheme,
          name: "JobTrail",
          category: "Job Tracker Web App",
          shortDesc: "Organizes applications with Kanban boards and progress charts",
          headline: "All-in-One Application Tracker & Progress Analytics",
          overview:
            "Replaces messy spreadsheets with an organized web dashboard. Users can track every application from Saved to Offer, switch between List and Kanban Board views, monitor interview response rates with visual charts, and get reminders when a follow-up is needed.",
          highlights: [
            "Tracks every stage of an application with a clear timeline history",
            "Supports both searchable List View and drag-friendly Kanban Board",
            "Visualizes response rates and monthly progress with interactive charts",
            "Includes one-click Demo Mode, CSV export, and direct CoverCraft integration",
          ],
          flowTitle: "Key Capabilities",
          flowSteps: [
            { label: "Access", value: "Secure login plus instant one-click Demo Mode" },
            { label: "Database", value: "Cloud PostgreSQL database with status history" },
            { label: "Analytics", value: "Charts for application funnel and monthly activity" },
            { label: "Integration", value: "Sends job details straight to CoverCraft" },
          ],
          tools: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Recharts"],
          primaryBtn: {
            label: "Try Live Demo",
            href: "https://jobtracker-kjmw.vercel.app/demo",
            external: true,
          },
          secondaryBtn: {
            label: "View Public Board",
            href: "https://jobtracker-kjmw.vercel.app/public/live",
            external: true,
          },
        },
        {
          id: "covercraft" as SuiteSystemKey,
          index: "03",
          theme: "amber" as AccentTheme,
          name: "CoverCraft",
          category: "AI Cover Letter Studio",
          shortDesc: "Reads your PDF resume and drafts tailored cover letters",
          headline: "Fast, Context-Aware Cover Letter Generator",
          overview:
            "Simplifies writing personalized cover letters for each application. Users can upload a PDF resume, paste a job description or link, choose a writing style, generate a tailored letter in seconds using Gemini AI, and save the finished letter directly back to JobTrail.",
          highlights: [
            "Reads uploaded PDF resumes automatically to extract key background details",
            "Can fetch job descriptions directly from supported job posting links",
            "Offers four writing tones: Professional, Enthusiastic, Concise, and Creative",
            "Allows instant copy, text download, and one-click saving to JobTrail",
          ],
          flowTitle: "Simple 3-Step Workflow",
          flowSteps: [
            { label: "Job Info", value: "Enter role details or pre-fill from JobTrail" },
            { label: "Resume", value: "Upload a PDF CV or paste your summary" },
            { label: "Generate", value: "Gemini AI drafts a tailored letter" },
            { label: "Save", value: "Copy, download, or sync directly to your tracker" },
          ],
          tools: ["Gemini AI", "Next.js", "PDF Reader", "Web Extractor"],
          primaryBtn: { label: "Open CoverCraft", href: "/covercraft" },
        },
      ] as SuiteSystemItem[],
      melody: {
        sectionHeader: "AI Audio Research Project",
        id: "melody-similarity",
        theme: "sky" as AccentTheme,
        category: "AI Audio & Plagiarism Search",
        name: "Melody Similarity Detector",
        summary:
          "An AI-powered audio search web application that analyzes uploaded songs or YouTube links and finds tracks with similar melodies. Built to stay accurate even across different keys, tempos, or instruments, while showing clear visual pitch comparisons that anyone can inspect.",
        highlights: [
          "Separates vocals and melody from drums so background beats do not skew comparisons",
          "Provides clear similarity scores alongside visual melody contour comparisons",
          "Validated against 15 real-world music copyright cases with 80% alignment",
          "Web interface where users can upload audio files and inspect segment-by-segment matches",
        ],
        stepsTitle: "How Detection Works",
        steps: [
          { label: "Input", value: "Upload an audio file or paste a YouTube link" },
          { label: "Separation", value: "Isolates melody and vocals from background drums" },
          { label: "Comparison", value: "Matches melodic segments against the song index" },
          { label: "Verification", value: "Play side-by-side clips with visual pitch curves" },
        ],
        tools: ["Python", "PyTorch", "Flask Web App", "FAISS Search", "Audio Processing"],
        primaryBtn: {
          label: "View Project on GitHub",
          href: "https://github.com/gryvnalvrdo/melody-similarity",
          external: true,
        },
      },
    },
    experience: {
      label: "Experience & Education",
      title: "Work Experience, Internship Project & Education",
      desc: "Real-world experience building a production hotel booking website and supporting daily IT operations, alongside a degree in Informatics Engineering.",
      liveDemo: "Visit Hotel Website",
      items: [
        {
          period: "Aug 2025 to Oct 2025",
          role: "IT Support Intern & Web Developer",
          org: "Hotel Claro Makassar",
          location: "Makassar, Indonesia",
          isFeaturedHotel: true,
          bullets: [
            "Built and launched a complete hotel information and room booking website from scratch, letting guests check room availability, choose dates, and reserve online.",
            "Created a separate admin dashboard for hotel staff to manage room stock, facilities, and guest bookings without disrupting the live guest experience.",
            "Integrated online payment options (Midtrans) alongside Pay-at-Hotel with digital booking invoices, and managed live hosting on Linux servers.",
            "Resolved daily hardware, network, and software issues across front-office, admin, and operational hotel departments.",
          ],
          tags: ["Laravel 11", "PHP", "SQL Database", "Midtrans Payment", "Linux Hosting", "IT Support"],
          link: "https://hotel-web-iota-pink.vercel.app/",
        },
        {
          period: "2022 to 2026",
          role: "B.S. in Informatics Engineering",
          org: "Universitas Atma Jaya Makassar",
          location: "Makassar, Indonesia",
          isFeaturedHotel: false,
          bullets: [
            "Completed undergraduate studies in Informatics Engineering with a focus on web development and machine learning.",
            "Built multiple practical software projects ranging from business web applications and automated workflows to deep learning audio similarity systems.",
          ],
          tags: ["Informatics Engineering", "Web Development", "Machine Learning"],
          link: "",
        },
      ],
    },
    contact: {
      label: "Contact",
      title: "Get in Touch",
      desc: "Reach out directly through any of the channels below.",
      emailLabel: "Email",
      whatsappLabel: "WhatsApp",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      copyright: "Gryven Alverdo Gunawan. Makassar, Indonesia.",
    },
  },
  id: {
    nav: {
      projects: "Proyek",
      experience: "Pengalaman",
      contact: "Kontak",
      resume: "CV",
      top: "Atas",
      themeLight: "Mode Terang",
      themeDark: "Mode Gelap",
    },
    hero: {
      name: "Gryven Alverdo Gunawan",
      headline: "Membangun aplikasi web, sistem otomasi, dan alat AI yang siap digunakan.",
      sub: "Lulusan Teknik Informatika Universitas Atma Jaya Makassar. Saya merancang dan membangun berbagai sistem nyata, mulai dari website reservasi hotel dan dashboard pelacak lamaran hingga alur kerja otomatis dan aplikasi pencarian kemiripan melodi berbasis AI.",
      exploreCta: "Lihat Proyek",
      contactCta: "Hubungi Saya",
      profileSubtitle: "Universitas Atma Jaya Makassar",
      profileLocation: "Makassar, Indonesia",
      highlights: [
        { value: "4 Sistem", label: "Aplikasi Web & AI" },
        { value: "Otomasi", label: "Alur Kerja n8n & AI" },
        { value: "Makassar", label: "Indonesia" },
      ],
      quickIndexTitle: "SISTEM AKTIF (LIVE)",
      quickIndexCount: "4 LIVE",
      quickIndex: [
        { code: "01", name: "AutoApply Flow", type: "Otomasi Loker", theme: "emerald" as AccentTheme, target: "suite", system: "autoapply" as SuiteSystemKey },
        { code: "02", name: "JobTrail", type: "Pelacak Lamaran", theme: "indigo" as AccentTheme, target: "suite", system: "jobtrail" as SuiteSystemKey },
        { code: "03", name: "CoverCraft", type: "Cover Letter AI", theme: "amber" as AccentTheme, target: "suite", system: "covercraft" as SuiteSystemKey },
        { code: "04", name: "Website Hotel Claro", type: "Karya Magang", theme: "gold" as AccentTheme, target: "experience" },
      ],
    },
    suite: {
      label: "Proyek",
      title: "Aplikasi Pribadi & Proyek Riset",
      desc: "Berbagai aplikasi yang saya bangun untuk menyelesaikan kebutuhan nyata, mulai dari ekosistem pencarian kerja tiga tahap hingga sistem deteksi kemiripan melodi berbasis AI.",
      suiteSubheader: "Job Hunting Suite (3 Aplikasi Terhubung)",
      suiteInstruction: "Pilih salah satu tahap di bawah ini untuk melihat cara kerja dan fungsinya:",
      prevStepLabel: "Sebelumnya",
      nextStepLabel: "Berikutnya",
      systems: [
        {
          id: "autoapply" as SuiteSystemKey,
          index: "01",
          theme: "emerald" as AccentTheme,
          name: "AutoApply Flow",
          category: "Otomasi Pencarian Loker",
          shortDesc: "Mencari lowongan yang sesuai secara otomatis setiap 6 jam",
          headline: "Pemantauan Lowongan Otomatis & Notifikasi Instan",
          overview:
            "Menggantikan proses mengecek banyak situs lowongan secara manual. Alur otomatis ini memindai lowongan kerja setiap 6 jam, menyaring posisi yang sesuai keahlian, mencegah data ganda, menyimpannya ke JobTrail, dan mengirim pemberitahuan langsung ke Telegram.",
          highlights: [
            "Berjalan otomatis setiap 6 jam tanpa perlu dicek secara manual",
            "Menyaring lowongan berdasarkan posisi dan kata kunci yang ditargetkan",
            "Mencegah masuknya lowongan ganda yang sudah pernah tersimpan",
            "Mengirim notifikasi cepat ke Telegram saat lowongan baru ditemukan",
          ],
          flowTitle: "Alur Kerja Singkat",
          flowSteps: [
            { label: "Jadwal", value: "Memeriksa daftar lowongan otomatis tiap 6 jam" },
            { label: "Saring", value: "Mencocokkan posisi software dan web developer" },
            { label: "Kirim", value: "Memasukkan lowongan baru ke database JobTrail" },
            { label: "Notifikasi", value: "Mengirim pesan instan melalui bot Telegram" },
          ],
          tools: ["Otomasi n8n", "RSS Feed", "Webhook", "Bot Telegram"],
          primaryBtn: { label: "Lihat Alur & Aktivitas Live", href: "/autoapply" },
          secondaryBtn: {
            label: "Buka Daftar Publik",
            href: "https://jobtracker-kjmw.vercel.app/public/live",
            external: true,
          },
        },
        {
          id: "jobtrail" as SuiteSystemKey,
          index: "02",
          theme: "indigo" as AccentTheme,
          name: "JobTrail",
          category: "Aplikasi Pelacak Lamaran",
          shortDesc: "Mengelola lamaran kerja dengan papan Kanban dan grafik progres",
          headline: "Dashboard Pelacak Lamaran & Statistik Progres",
          overview:
            "Menggantikan pencatatan manual di spreadsheet dengan dashboard web yang rapi. Pengguna dapat melacak status tiap lamaran dari tahap tersimpan hingga diterima, beralih antara tampilan daftar dan papan Kanban, serta memantau tingkat respons melalui grafik.",
          highlights: [
            "Mencatat riwayat perubahan status tiap lamaran secara kronologis",
            "Menyediakan tampilan Daftar berfilter maupun papan Kanban per status",
            "Menampilkan grafik progres bulanan dan pengingat tindak lanjut (follow-up)",
            "Dilengkapi mode Demo sekali klik, ekspor CSV, dan integrasi ke CoverCraft",
          ],
          flowTitle: "Fitur Utama",
          flowSteps: [
            { label: "Akses", value: "Login aman dan mode Demo langsung tanpa daftar" },
            { label: "Penyimpanan", value: "Database cloud terstruktur beserta riwayat status" },
            { label: "Statistik", value: "Grafik konversi lamaran dan aktivitas bulanan" },
            { label: "Integrasi", value: "Mengirim detail lowongan langsung ke CoverCraft" },
          ],
          tools: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Recharts"],
          primaryBtn: {
            label: "Coba Demo Live",
            href: "https://jobtracker-kjmw.vercel.app/demo",
            external: true,
          },
          secondaryBtn: {
            label: "Lihat Papan Publik",
            href: "https://jobtracker-kjmw.vercel.app/public/live",
            external: true,
          },
        },
        {
          id: "covercraft" as SuiteSystemKey,
          index: "03",
          theme: "amber" as AccentTheme,
          name: "CoverCraft",
          category: "Generator Cover Letter AI",
          shortDesc: "Membaca CV PDF dan menyusun surat lamaran yang sesuai",
          headline: "Pembuat Surat Lamaran Personalisasi Berbasis AI",
          overview:
            "Mempermudah pembuatan surat lamaran kerja yang disesuaikan untuk tiap perusahaan. Pengguna cukup mengunggah CV PDF, menempelkan deskripsi atau tautan lowongan, memilih gaya bahasa, lalu Gemini AI menyusun draf yang bisa langsung disalin atau disimpan ke JobTrail.",
          highlights: [
            "Membaca file CV PDF secara otomatis untuk merangkum latar belakang pelamar",
            "Dapat mengambil deskripsi pekerjaan langsung dari tautan lowongan",
            "Tersedia 4 pilihan gaya penulisan: Profesional, Antusias, Singkat, dan Kreatif",
            "Mendukung salin cepat, unduh file teks, dan simpan langsung ke JobTrail",
          ],
          flowTitle: "Alur Penggunaan 3 Langkah",
          flowSteps: [
            { label: "Info Loker", value: "Isi detail posisi atau terisi otomatis dari JobTrail" },
            { label: "Profil CV", value: "Unggah CV PDF atau tempel ringkasan pengalaman" },
            { label: "Susun AI", value: "Gemini AI menyusun surat lamaran yang relevan" },
            { label: "Simpan", value: "Salin teks, unduh, atau simpan kembali ke pelacak" },
          ],
          tools: ["Gemini AI", "Next.js", "Pembaca PDF", "Ekstraktor Web"],
          primaryBtn: { label: "Buka CoverCraft", href: "/covercraft" },
        },
      ] as SuiteSystemItem[],
      melody: {
        sectionHeader: "Proyek Riset Audio AI",
        id: "melody-similarity",
        theme: "sky" as AccentTheme,
        category: "Pencarian Kemiripan Melodi AI",
        name: "Melody Similarity Detector",
        summary:
          "Aplikasi web berbasis AI yang menganalisis file audio atau link YouTube untuk menemukan lagu dengan melodi yang mirip. Dirancang agar tetap akurat meskipun lagu memiliki kunci nada, tempo, atau instrumen yang berbeda, disertai grafik perbandingan nada yang mudah dipahami.",
        highlights: [
          "Memisahkan vokal dan melodi dari suara drum agar ritme latar tidak mengacaukan hasil analisis",
          "Menampilkan skor kemiripan lengkap dengan visualisasi perbandingan nada secara jelas",
          "Diuji terhadap 15 kasus sengketa hak cipta musik nyata dengan tingkat kesesuaian 80%",
          "Antarmuka web untuk mengunggah file audio dan memeriksa kecocokan per segmen waktu",
        ],
        stepsTitle: "Cara Kerja Deteksi",
        steps: [
          { label: "Masukan", value: "Unggah file audio atau masukkan link YouTube" },
          { label: "Pemisahan", value: "Memisahkan melodi utama dari suara drum latar" },
          { label: "Pencocokan", value: "Mencari kemiripan melodi di database lagu" },
          { label: "Verifikasi", value: "Putar klip berdampingan dengan grafik nada" },
        ],
        tools: ["Python", "PyTorch", "Flask Web", "Pencarian FAISS", "Pengolahan Audio"],
        primaryBtn: {
          label: "Lihat Proyek di GitHub",
          href: "https://github.com/gryvnalvrdo/melody-similarity",
          external: true,
        },
      },
    },
    experience: {
      label: "Pengalaman & Pendidikan",
      title: "Pengalaman Kerja, Proyek Magang & Pendidikan",
      desc: "Pengalaman nyata membangun website reservasi hotel dan menangani dukungan operasional IT, disertai latar belakang pendidikan Teknik Informatika.",
      liveDemo: "Kunjungi Website Hotel",
      items: [
        {
          period: "Agustus 2025 s/d Oktober 2025",
          role: "IT Support Intern & Web Developer",
          org: "Hotel Claro Makassar",
          location: "Makassar, Indonesia",
          isFeaturedHotel: true,
          bullets: [
            "Merancang, membangun, dan meluncurkan website informasi serta reservasi kamar hotel dari nol, sehingga tamu dapat mengecek ketersediaan tanggal dan memesan kamar secara online.",
            "Membangun halaman admin terpisah bagi staf hotel untuk memperbarui stok kamar, fasilitas, dan status pemesanan tanpa mengganggu pengunjung yang sedang memesan.",
            "Menyediakan pembayaran online via Midtrans maupun bayar di hotel lengkap dengan bukti invoice digital, serta mengelola hosting di server Linux.",
            "Menangani berbagai kendala perangkat keras, jaringan, dan perangkat lunak di bagian front office, admin, dan operasional hotel agar aktivitas harian tetap lancar.",
          ],
          tags: ["Laravel 11", "PHP", "Database SQL", "Pembayaran Midtrans", "Server Linux", "IT Support"],
          link: "https://hotel-web-iota-pink.vercel.app/",
        },
        {
          period: "2022 s/d 2026",
          role: "S1 Teknik Informatika",
          org: "Universitas Atma Jaya Makassar",
          location: "Makassar, Indonesia",
          isFeaturedHotel: false,
          bullets: [
            "Menyelesaikan studi sarjana Teknik Informatika dengan fokus pada pengembangan aplikasi web dan pembelajaran mesin.",
            "Membangun berbagai proyek perangkat lunak nyata mulai dari aplikasi web bisnis dan alur otomasi hingga sistem deteksi kemiripan melodi.",
          ],
          tags: ["Teknik Informatika", "Pengembangan Web", "Machine Learning"],
          link: "",
        },
      ],
    },
    contact: {
      label: "Kontak",
      title: "Hubungi Saya",
      desc: "Silakan hubungi langsung melalui salah satu saluran di bawah ini.",
      emailLabel: "Email",
      whatsappLabel: "WhatsApp",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      copyright: "Gryven Alverdo Gunawan. Makassar, Indonesia.",
    },
  },
};
