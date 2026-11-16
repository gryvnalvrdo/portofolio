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
      sub: "Informatics Engineering graduate from Universitas Atma Jaya Makassar. I build end-to-end digital products, from hotel reservation platforms and SaaS dashboards to automated workflows and audio AI tools.",
      exploreCta: "Explore Projects",
      contactCta: "Contact Me",
    },
    suite: {
      label: "Featured Work",
      title: "Connected Systems & Real-World Web Applications",
      desc: "A selection of applications I built to solve real problems, ranging from an automated job-search ecosystem to hospitality booking platforms and AI audio analysis.",
      suiteSubheader: "Job Hunting Suite (3 Connected Tools)",
      suiteInstruction: "Select any stage below to see how each application works and connects:",
      nextStepPrefix: "Next Stage:",
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
            { label: "Generate", value: "Gemini AI drafts a tailored, ATS-friendly letter" },
            { label: "Save", value: "Copy, download, or sync directly to your tracker" },
          ],
          tools: ["Gemini AI", "Next.js", "PDF Reader", "Web Extractor"],
          primaryBtn: { label: "Open CoverCraft", href: "/covercraft" },
        },
      ] as SuiteSystemItem[],
      otherSubheader: "Independent Production & Research Applications",
      featuredApps: [
        {
          id: "hotel-claro",
          theme: "gold",
          category: "Hospitality & Booking Platform",
          name: "Hotel Claro Makassar Website",
          summary:
            "A complete hotel information and room booking platform built from scratch during my internship. Designed so guests can browse rooms, check real-time date availability, and complete reservations online, while hotel staff manage rooms and bookings through a separate admin console.",
          highlights: [
            "Multi-step reservation flow with automatic date availability and guest capacity checks",
            "Supports online payment processing via Midtrans as well as Pay-at-Hotel with digital invoices",
            "Dedicated admin dashboard for staff to update room stock, facilities, and booking statuses safely",
            "Mobile-friendly layout designed in a warm luxury navy and gold visual style",
          ],
          tools: ["Laravel 11", "PHP", "SQL Database", "Midtrans Payment", "Responsive UI"],
          primaryBtn: {
            label: "Visit Hotel Website",
            href: "https://hotel-web-iota-pink.vercel.app/",
            external: true,
          },
        },
        {
          id: "melody-similarity",
          theme: "sky",
          category: "AI Audio & Plagiarism Search",
          name: "Melody Similarity Detector",
          summary:
            "An AI-powered audio search web application that analyzes uploaded songs and finds tracks with similar melodies. Built to distinguish true melodic similarity across different keys, tempos, and instruments while showing visual pitch comparisons that anyone can inspect.",
          highlights: [
            "Separates vocals and melody from drums so background beats do not skew comparisons",
            "Provides clear similarity scores alongside visual melody contour comparisons",
            "Validated against 15 real-world music copyright cases with 80% alignment",
            "Web interface where users can upload audio files and inspect segment-by-segment matches",
          ],
          tools: ["Python", "PyTorch", "Flask Web App", "FAISS Search", "Audio Processing"],
          primaryBtn: {
            label: "View Project on GitHub",
            href: "https://github.com/gryvnalvrdo/melody-similarity",
            external: true,
          },
        },
      ] as FeaturedProjectItem[],
    },
    experience: {
      label: "Experience & Education",
      title: "Background & Track Record",
      desc: "Hands-on experience building production software and supporting daily IT operations, backed by a strong academic foundation in Informatics Engineering.",
      liveDemo: "Visit Live Site",
      items: [
        {
          period: "Aug 2025 to Oct 2025",
          role: "IT Support Intern & Web Developer",
          org: "Hotel Claro Makassar",
          location: "Makassar, Indonesia",
          bullets: [
            "Built and deployed a full-stack hotel reservation and information website from scratch, covering both the public guest booking experience and the internal admin management console.",
            "Managed live production hosting, performance fixes, and ongoing maintenance on Linux servers.",
            "Resolved hardware, network, and software issues across front-office, admin, and operational departments to keep daily hotel workflows running smoothly.",
          ],
          tags: ["Laravel 11", "PHP", "SQL", "Linux Hosting", "IT Support"],
          link: "https://hotel-web-iota-pink.vercel.app/",
        },
        {
          period: "2022 to 2026",
          role: "B.S. in Informatics Engineering",
          org: "Universitas Atma Jaya Makassar",
          location: "GPA 3.88 / 4.00",
          bullets: [
            "Graduated with Cum Laude honors (GPA 3.88 / 4.00) with a focus on web engineering and machine learning.",
            "Developed multiple practical software projects ranging from full-stack web applications and automated workflows to deep learning audio similarity systems.",
          ],
          tags: ["Informatics Engineering", "GPA 3.88 / 4.00", "Web Development", "Machine Learning"],
          link: "",
        },
      ],
    },
    contact: {
      label: "Contact",
      title: "Get in Touch",
      desc: "Feel free to reach out via email, WhatsApp, or LinkedIn for software engineering opportunities, project collaborations, or technical discussions.",
      copyBtn: "Copy Email",
      copiedBtn: "Email Copied",
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
      sub: "Lulusan Teknik Informatika Universitas Atma Jaya Makassar. Saya merancang dan membangun berbagai sistem nyata, mulai dari website reservasi hotel dan dashboard SaaS hingga alur kerja otomatis dan aplikasi pencarian kemiripan melodi berbasis AI.",
      exploreCta: "Lihat Proyek",
      contactCta: "Hubungi Saya",
    },
    suite: {
      label: "Karya Utama",
      title: "Aplikasi Web & Sistem yang Saling Terhubung",
      desc: "Berbagai aplikasi yang saya bangun untuk menyelesaikan kebutuhan nyata, mulai dari ekosistem pencarian kerja otomatis hingga sistem reservasi perhotelan dan analisis audio AI.",
      suiteSubheader: "Job Hunting Suite (3 Aplikasi Terhubung)",
      suiteInstruction: "Pilih salah satu tahap di bawah ini untuk melihat cara kerja dan fungsinya:",
      nextStepPrefix: "Tahap Berikutnya:",
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
      otherSubheader: "Aplikasi Produksi & Riset Lainnya",
      featuredApps: [
        {
          id: "hotel-claro",
          theme: "gold",
          category: "Sistem Reservasi & Perhotelan",
          name: "Website Hotel Claro Makassar",
          summary:
            "Platform informasi dan pemesanan kamar hotel yang dibangun dari nol selama masa magang. Tamu dapat melihat katalog kamar, mengecek ketersediaan tanggal secara langsung, dan memesan online, sementara staf hotel mengelola stok kamar dan pesanan lewat halaman admin terpisah.",
          highlights: [
            "Alur pemesanan multi-kamar dengan pengecekan ketersediaan tanggal dan kapasitas tamu otomatis",
            "Mendukung pembayaran online via Midtrans maupun bayar di hotel lengkap dengan bukti invoice",
            "Dashboard admin khusus agar staf dapat memperbarui stok kamar, fasilitas, dan status pesanan dengan aman",
            "Tampilan elegan bertema biru dongker dan emas yang nyaman diakses dari ponsel maupun desktop",
          ],
          tools: ["Laravel 11", "PHP", "Database SQL", "Pembayaran Midtrans", "UI Responsif"],
          primaryBtn: {
            label: "Kunjungi Website Hotel",
            href: "https://hotel-web-iota-pink.vercel.app/",
            external: true,
          },
        },
        {
          id: "melody-similarity",
          theme: "sky",
          category: "Pencarian Kemiripan Melodi AI",
          name: "Melody Similarity Detector",
          summary:
            "Aplikasi web berbasis AI yang menganalisis file audio untuk menemukan lagu dengan melodi yang mirip. Dirancang agar tetap akurat meskipun lagu memiliki kunci nada, tempo, atau instrumen yang berbeda, disertai grafik perbandingan nada yang mudah dipahami.",
          highlights: [
            "Memisahkan vokal dan melodi dari suara drum agar ritme latar tidak mengacaukan hasil analisis",
            "Menampilkan skor kemiripan lengkap dengan visualisasi perbandingan nada secara jelas",
            "Diuji terhadap 15 kasus sengketa hak cipta musik nyata dengan tingkat kesesuaian 80%",
            "Antarmuka web untuk mengunggah file audio dan memeriksa kecocokan per segmen waktu",
          ],
          tools: ["Python", "PyTorch", "Flask Web", "Pencarian FAISS", "Pengolahan Audio"],
          primaryBtn: {
            label: "Lihat Proyek di GitHub",
            href: "https://github.com/gryvnalvrdo/melody-similarity",
            external: true,
          },
        },
      ] as FeaturedProjectItem[],
    },
    experience: {
      label: "Pengalaman & Pendidikan",
      title: "Rekam Jejak & Latar Belakang",
      desc: "Pengalaman membangun aplikasi web produksi dan menangani dukungan operasional IT, didukung latar belakang akademik Teknik Informatika.",
      liveDemo: "Lihat Website Live",
      items: [
        {
          period: "Agustus 2025 s/d Oktober 2025",
          role: "IT Support Intern & Web Developer",
          org: "Hotel Claro Makassar",
          location: "Makassar, Indonesia",
          bullets: [
            "Merancang, membangun, dan men-deploy website informasi serta reservasi hotel dari nol, mencakup halaman tamu dan dashboard admin internal.",
            "Mengelola hosting server produksi serta melakukan perbaikan performa dan pemeliharaan berkelanjutan.",
            "Menangani kendala perangkat keras, jaringan, dan perangkat lunak lintas departemen agar operasional harian hotel berjalan lancar.",
          ],
          tags: ["Laravel 11", "PHP", "SQL", "Server Linux", "IT Support"],
          link: "https://hotel-web-iota-pink.vercel.app/",
        },
        {
          period: "2022 s/d 2026",
          role: "S1 Teknik Informatika",
          org: "Universitas Atma Jaya Makassar",
          location: "IPK 3.88 / 4.00",
          bullets: [
            "Lulus dengan predikat Cum Laude (IPK 3.88 / 4.00) dengan fokus pada pengembangan web dan pembelajaran mesin (machine learning).",
            "Membangun berbagai sistem perangkat lunak nyata mulai dari aplikasi web bisnis, alur otomasi, hingga sistem deteksi kemiripan melodi.",
          ],
          tags: ["Teknik Informatika", "IPK 3.88 / 4.00", "Pengembangan Web", "Machine Learning"],
          link: "",
        },
      ],
    },
    contact: {
      label: "Kontak",
      title: "Hubungi Saya",
      desc: "Silakan hubungi saya melalui email, WhatsApp, atau LinkedIn untuk peluang kerja, kolaborasi proyek, maupun diskusi teknis.",
      copyBtn: "Salin Email",
      copiedBtn: "Email Tersalin",
      emailLabel: "Email",
      whatsappLabel: "WhatsApp",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      copyright: "Gryven Alverdo Gunawan. Makassar, Indonesia.",
    },
  },
};
