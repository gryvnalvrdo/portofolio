# Engineering Portfolio UI/UX & Domain-Aware Skill (`skills.md`)

> **Target**: Standar desain, arsitektur informasi, gaya bahasa, dan diferensiasi domain untuk portofolio **IT Developer / Software Engineer (Gryven Alverdo Gunawan)**.  
> **Prinsip Inti**:
> 1. **Zero AI Slop & Zero AI Punctuation**: Bebas gradient text berulang, bebas emoji dekoratif, dan bebas tanda baca khas AI seperti tanda hubung panjang (*em-dash* / *en-dash*) atau simbol pseudo-code aneh di UI.
> 2. **Zero Repetition (DRY UX)**: Tombol CV hanya di Header; GitHub/LinkedIn/Email hanya di Unified Contact Footer; proyek tidak diduplikasi antara diagram pipeline dan kartu di bawahnya.
> 3. **Domain-Specific Differentiation (Jangan Sama Ratakan Semua Web)**: Setiap proyek dan kelompok keahlian harus merepresentasikan jenis produk, arsitektur, dan tema visual aslinya.
> 4. **Mobile-First Ergonomics**: Navigasi selalu terjangkau via Bottom Floating Dock, informasi lokasi dan role selalu tampil di layar pertama mobile.

---

## 1. Aturan Ketat Gaya Bahasa: Bebas Tanda Baca AI & Simbol Aneh

Teks dan elemen antarmuka yang dihasilkan AI sering kali mudah dikenali karena penggunaan tanda baca dan simbol dekoratif yang berlebihan. Patuhi aturan berikut di seluruh halaman dan kamus teks (`lib/dictionary.ts`):

### 1.1 Larangan Tanda Hubung AI (*Em-Dash* & *En-Dash*)
- **LARANGAN**: Jangan pernah menggunakan *em-dash* (`—`), *en-dash* (`–`), atau tanda strip penghubung kalimat bergaya esai AI di dalam judul, subjudul, deskripsi proyek, maupun daftar pengalaman.
- **ATURAN**: Gunakan struktur kalimat manusia yang lugas dengan tanda koma (`,`), titik (`.`), titik dua (`:`), atau tanda kurung `( )`.
  - Salah (Gaya AI): `"Each project was built for a distinct domain—ranging from SaaS to ERP—using modern tools."`
  - Benar (Lugas & Natural): `"Each project was built for a distinct domain, ranging from SaaS to ERP, using modern tools."`
  - Salah (Gaya AI): `"2025.08 – 2025.10"` atau `"Aug 2025 — Oct 2025"`
  - Benar (Natural): `"Aug 2025 to Oct 2025"` (EN) atau `"Ags 2025 s/d Okt 2025"` (ID).

### 1.2 Larangan Simbol Pseudo-Code & ASCII Aneh di UI
- **LARANGAN**: Jangan menaruh simbol-simbol dekoratif yang tidak perlu di dalam label UI, heading, atau tombol:
  - Dilarang memakai garis miring ganda seperti `01 // ENGINEERED SYSTEMS` atau `// CAPABILITIES`.
  - Dilarang memakai panah teks/ASCII seperti `───►`, `→`, `←`, `↗` di dalam string teks tombol.
  - Dilarang memakai titik tengah (`·`) secara berlebihan di judul atau badge (misal `01 · AutoApply · Live · n8n`).
  - Dilarang memakai simbol prompt terminal palsu seperti `$` di depan alamat email atau simbol bullet karakter aneh seperti `▸`.
- **ATURAN**:
  - Gunakan label bersih seperti `SECTION 01: ENGINEERED SYSTEMS` atau `STEP 01: TARGET JOB CONTEXT`.
  - Gunakan komponen **ikon SVG asli** untuk panah navigasi, tautan eksternal, dan ikon email.
  - Gunakan lingkaran CSS murni (`border-radius: 50%`) untuk indikator *bullet list*.

### 1.3 Larangan Emoji Dekoratif & Gradient Text Berulang
- **LARANGAN**: Jangan meletakkan emoji di tombol CTA, eyebrow section, card badge, atau label filter. Jangan memasang `.hero-gradient-text` pada setiap judul `h2`.
- **ATURAN**: Gunakan warna teks solid kontras tinggi (`#f8fafc`) untuk seluruh judul section dan batasi warna aksen hanya pada elemen status/interaktif.

---

## 2. Domain-Aware Project & Skill Differentiation (Jangan Sama Ratakan!)

Portofolio ini menaungi **4 sistem berbeda** yang dibangun untuk domain yang berbeda. Saat mendesain UI, menulis deskripsi, maupun memetakan *tech stack*, **wajib membedakan karakter dan keahlian tiap sistem**:

### 2.1 Matriks Identitas & Tema Tiap Web

| Sistem / Web | Domain & Jenis Aplikasi | Tema & Aksen Visual Asli | Keahlian & Arsitektur Inti yang Ditonjolkan |
| :--- | :--- | :--- | :--- |
| **01: AutoApply Flow** (`/autoapply`) | **Event-Driven Automation Agent & Ingestion Pipeline** | **Emerald (`#10b981`)** dengan gaya *Telemetry / Node Pipeline* | `n8n Workflow`, `Cron (Every 6h)`, `RSS Feed Ingestion`, `JS Code Node Filtering`, `Webhook POST (/api/auto-apply + X-AutoApply-Secret)`, `Idempotent Deduplication`, `Telegram Bot API` |
| **02: JobTrail** (`jobtracker-kjmw.vercel.app`) | **Full-Stack B2C SaaS: Job CRM, Kanban & Analytics** | **Indigo & Violet (`#6366f1` / `#818cf8`)** pada Carbon Dark (`#0f1117`) | `Next.js 15 (App Router & Server Actions)`, `React 19`, `Prisma 7 ORM`, `Neon Serverless PostgreSQL`, `NextAuth v5 (One-Click Demo Login)`, `Recharts (Funnel & Monthly Analytics)`, `Kanban + List View`, `Zod`, `Vitest` |
| **03: CoverCraft** (`/covercraft`) | **AI Document Generator & Context Scraper Micro-App** | **Amber (`#f59e0b`)** pada Warm Slate (`#0d1117`) | `Google Gemini API`, `Structured Prompt Engineering (4 Tones)`, `Server-Side PDF CV Parser (pdf2json)`, `URL Job Scraper (cheerio)`, `Deep-Link Query Params & Webhook Sync to JobTrail` |
| **04: Hotel Claro Makassar** (`hotel-web-iota-pink.vercel.app`) | **Hospitality Reservation, Payment Gateway & Property Management ERP** | **Luxury Gold (`#C9962A` / `#E8B84B`) & Deep Navy (`#0C1526`)** | `Laravel 11 (PHP MVC & Blade)`, `Multi-Room Availability & Capacity Engine`, `Midtrans Payment Gateway & Webhook Callback`, `Promo Code Engine`, `Admin Inventory & Booking CMS`, `Linux Production Server` |

### 2.2 Aturan Penyajian Tech Stack (`#skills`)
- **LARANGAN**: Jangan hanya membuat 4 kotak generik (`Languages`, `Frontend`, `Backend`, `Tools`) berisi pill teks datar tanpa konteks.
- **ATURAN**:
  - Kelompokkan dan filter stack berdasarkan **Domain Engineering** (`SaaS & Modern Web`, `Hospitality ERP`, `AI & Document Parsing`, `Automation & Infra`).
  - Setiap teknologi wajib mencantumkan **Peran Teknisnya** (misal: `Serverless DB & Prisma 7 Adapter`, `Payment Gateway Webhook`, `PDF Text Extraction`) serta **Atribusi Proyek Nyata** (`JobTrail`, `Hotel Claro`, `CoverCraft`, `AutoApply`, atau `Academic ML`).

---

## 3. Single-Source-of-Truth UX (Aturan Anti-Repetisi)

1. **CV / Resume**:
   - Hanya muncul di **Sticky Header** (`Resume` / `CV`), selalu terlihat di desktop dan mobile, serta satu tautan utilitas di baris bawah footer.
   - Tidak boleh ada tombol `View My Resume` kedua di dalam Hero.
2. **Kontak & Profil Sosial (`Email`, `GitHub`, `LinkedIn`)**:
   - Hanya muncul lengkap di **1 Unified Contact & Footer Section** di bagian paling bawah halaman.
   - Di Hero hanya boleh ada tombol `Inspect Engineered Systems` (scroll ke `#suite`) dan tombol utilitas `Copy Email` (`gryvnalvrdo@gmail.com` dengan feedback salin instan).
   - Tidak boleh ada pemisahan kotak `#contact` dan `footer` yang mengulang link `GitHub`, `LinkedIn`, dan `Email` dua kali berurutan.
3. **Interactive System Inspector (Bukan Pipeline + Kartu Berulang)**:
   - Di `#suite`, jangan merender 3 kartu pipeline lalu 3 kartu proyek yang sama di bawahnya.
   - Gunakan **1 Interactive Pipeline Inspector**: 3 node di atas (`01 AutoApply Flow`, `02 JobTrail`, `03 CoverCraft`) berfungsi sebagai pemilih (*selector*) yang mengubah isi panel detail arsitektur di bawahnya secara dinamis dan menyesuaikan warna aksen panel sesuai tema asli aplikasi yang dipilih.
   - Di bawah inspektor *Job Hunting Suite*, tampilkan **Featured Production System: Hotel Claro Makassar** dengan aksen Navy/Gold khasnya.

---

## 4. Standar Header & Mobile-First UX (Prioritas Tertinggi)

1. **Top Header Mobile (`< 768px`)**:
   - Menampilkan identitas `Gryven Alverdo.`, toggle `EN / ID`, dan tombol **`CV`** (tidak boleh disembunyikan dengan `display: none`).
2. **Bottom Floating Glass Navigation Dock (`< 768px`)**:
   - Berisi 4 item navigasi dengan *active scroll-spy* (`Systems`, `Experience`, `Architecture`, `Contact`) dan tombol cepat `Top` saat halaman di-scroll.
   - Menghormati `env(safe-area-inset-bottom)` dan memberi ruang aman di bagian bawah halaman.
3. **Mobile Hero Tanpa Crop Hack & Tanpa Kehilangan Info**:
   - Avatar tampil proporsional berdampingan dengan nama, role (`Full-Stack Software Engineer`), dan lokasi (`Makassar, Indonesia (Open to Remote & Relocation)`).
   - Tidak boleh memakai `transform: scale(1.48)` yang memotong foto secara paksa dan tidak boleh menyembunyikan informasi lokasi di layar mobile.

---

## 5. Checklist Verifikasi Wajib

- [ ] Apakah seluruh teks bebas dari tanda hubung AI (*em-dash* / *en-dash*), bebas simbol `//`, bebas panah ASCII, dan bebas emoji dekoratif?
- [ ] Apakah setiap web (`AutoApply`, `JobTrail`, `CoverCraft`, `Hotel Claro`) sudah memiliki warna aksen, deskripsi arsitektur, dan daftar keahlian spesifik sesuai kode sumber aslinya?
- [ ] Apakah duplikasi tombol CV, GitHub, LinkedIn, Email, dan duplikasi 6-kartu `#suite` sudah 100% dihilangkan?
- [ ] Apakah di layar mobile (`375px` s/d `430px`) tombol `CV`, lokasi `Makassar`, dan *Bottom Navigation Dock* tampil dan berfungsi mulus?
- [ ] Apakah `npm run lint` dan `npm run build` berjalan sukses tanpa error?
