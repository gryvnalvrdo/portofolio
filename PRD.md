# Product Requirements Document (PRD) v2.1
## Portfolio Web Redesign, Ecosystem Theme Alignment & Domain-Specific Engineering Showcase

**Dokumen**: PRD v2.1  
**Tanggal**: 16 November 2026  
**Target Aplikasi**: Next.js `16.3.5` + React `19.2.8` (`portfolio`) beserta integrasi visual dan teknis dengan **JobTrail**, **CoverCraft**, **AutoApply Flow**, dan **Hotel Claro Makassar**.  
**Tujuan Utama**: Mengubah portofolio dari tampilan generik ("AI slop") yang seragam dan berulang-ulang menjadi portofolio **Precision Software Engineering** yang:
1. **Bebas Repetisi (*Zero Redundancy*)** di Header, Hero, Projects, dan Contact/Footer.
2. **Bebas Tanda Baca & Simbol AI (*Zero AI Punctuation & Symbols*)** seperti *em-dash*, *en-dash*, garis miring ganda `//`, panah ASCII, dan emoji dekoratif.
3. **Tidak Menyamaratakan Proyek & Skills (*Domain-Specific Differentiation*)**: setiap web/sistem ditampilkan sesuai jenis produk, arsitektur nyata, tema warna asli, dan keahlian spesifik yang digunakan.
4. **Memiliki Header Adaptif & Mobile-First UX Kelas Produksi**.

---

## 1. Audit Karakteristik Asli Tiap Web di Ekosistem Portofolio

Hasil inspeksi langsung pada repositori dan kode sumber keempat proyek menunjukkan bahwa masing-masing memiliki **domain produk**, **arsitektur teknis**, dan **identitas tema visual** yang berbeda, sehingga tidak boleh disamaratakan ke dalam kartu atau daftar skill yang generik:

### 1.1 JobTrail (`jobtracker-kjmw.vercel.app`, Repo: `job tracker`)
- **Jenis Web**: **Full-Stack B2C SaaS: Job Application CRM, Kanban & Analytics Dashboard**.
- **Tema & Identitas Visual Asli**:
  - Canvas: Deep Carbon (`#0f1117` dark / `#f8fafc` light mode via `data-theme="light"`), Surface `#1a1d27` / `#22263a`, Border `#2e3348`.
  - Brand Accent: **Indigo (`#6366f1`) & Violet (`#8b5cf6`)**, ditambah warna status semantik: *Applied* (`#6366f1`), *Screening* (`#8b5cf6`), *Interview* (`#f59e0b`), *Offer* (`#10b981`), *Rejected* (`#ef4444`).
- **Arsitektur & Skills Spesifik**:
  - **Frontend & State**: Next.js 15 (App Router, Server Components, Server Actions), React 19, Tailwind CSS v4, **Recharts** (*Funnel/Donut StatusChart* dan *MonthlyChart*), Dual View (*Filterable List + Kanban Board*), CSV Exporter, **React Hook Form + Zod**.
  - **Backend, Auth & Database**: **Prisma 7** (`@prisma/adapter-neon`) + **Neon Serverless PostgreSQL**, **NextAuth v5** + `bcryptjs` + *One-Click Demo Auto-Login* (`/demo`), serta transaksi database (`prisma.$transaction`) dan tabel dedup `ProcessedJob`.
  - **Testing & Quality**: **Vitest** (`vitest` + `@vitest/coverage-v8`).
  - **Public API & Telemetry**: `/public/live` (Read-Only Live Agent Board), `GET /api/public/jobs`, `POST /api/auto-apply`, dan `POST /api/public/applications/[id]/cover-letter`.

### 1.2 CoverCraft (`/covercraft`, Terintegrasi di `portfolio`)
- **Jenis Web**: **AI Document Generation Micro-App & Automated Context Scraper**.
- **Tema & Identitas Visual Asli**:
  - Canvas: Warm Dark Slate (`#0d1117` / `#161b22`), Border tipis struktural, aksen **Amber (`#f59e0b`) & Indigo (`#818cf8`)**.
  - Form 3-langkah interaktif (*Job Context, Candidate Profile, Tone Calibration & Live Output*).
- **Arsitektur & Skills Spesifik**:
  - **AI & Prompt Engineering**: Integrasi **Google Gemini API** (`/api/generate`) dengan kontrol 4 *tone* (*Professional, Enthusiastic, Concise, Creative*) tanpa wajib login.
  - **Document & Web Extraction**: Server-side **PDF Resume Parser** (`/api/parse-cv` dengan `pdf2json` dan ekstraksi heuristik nama/profil) serta **Job Description Web Scraper** (`/api/scrape` dengan `cheerio`).
  - **Cross-App Deep Linking**: Menerima parameter `?job=&company=&url=&id=` langsung dari tombol *"Generate Cover Letter"* di halaman detail lamaran JobTrail, mengambil isi lowongan otomatis, dan menyimpan hasilnya kembali ke database JobTrail via API.

### 1.3 AutoApply Flow (`/autoapply`, Repo: `autoapply-flow`)
- **Jenis Sistem**: **Headless Event-Driven Automation Agent & Job Ingestion Pipeline (n8n + Live Telemetry)**.
- **Tema & Identitas Visual Asli**:
  - Terminal/Telemetry Dark UI dengan aksen **Emerald (`#10b981`)** untuk node aktif/pipeline dan indikator *Live Agent Polling* (`15s interval`).
- **Arsitektur & Skills Spesifik**:
  - **Workflow Orchestration**: **n8n** (`scheduleTrigger` setiap 6 jam, paralel `rssFeedRead` untuk *Remote Programming* dan *Back-End*, `code` node JavaScript untuk keyword matching, `filter` node, `httpRequest` webhook `POST /api/auto-apply` dengan header autentikasi `X-AutoApply-Secret`, dan `telegram` Markdown Bot Alert).
  - **Data Engineering**: Idempotent job ingestion (bekerja sama dengan tabel `ProcessedJob` di JobTrail agar tidak pernah mengirim duplikat lowongan meskipun dijalankan berulang setiap 6 jam).

### 1.4 Hotel Claro Makassar (`hotel-web-iota-pink.vercel.app`, Repo: `hotel-claro`)
- **Jenis Web**: **Full-Stack Hospitality Reservation, Payment Gateway & Property Management System (ERP/CMS Perhotelan)**.
- **Tema & Identitas Visual Asli**:
  - Canvas: **Deep Ocean Luxury Navy (`#0C1526` / `#08101E` / `#132035`)** berpadu dengan **Warm Hospitality Gold (`#C9962A` / `#E8B84B`)**.
  - Tipografi: *Playfair Display* (serif editorial mewah) + *Poppins* (fungsional).
- **Arsitektur & Skills Spesifik**:
  - **Framework & Pattern**: **Laravel 11 (PHP)** dengan arsitektur MVC penuh (`BookingController`, `RoomController`, `ConferenceController`, serta modul `Admin\DashboardController`, `Admin\InventoryController`, `Admin\RoomController`, `Admin\FacilityController`, `Admin\BookingController`).
  - **Reservation & Inventory Engine**: Multi-room booking cart (`room_details`), validasi stok kamar real-time berdasarkan rentang tanggal check-in/check-out (`getAvailableStock`), validasi kapasitas tamu terhadap jumlah dan tipe kamar, serta kalkulasi kode promo (`percent` / nominal).
  - **Payment & Notification**: Integrasi **Midtrans Payment Gateway** (webhook callback `/midtrans/callback`, opsi *Pay at Hotel*, cetak invoice `/booking/invoice/{id}`, dan email konfirmasi otomatis `BookingConfirmedMail`).
  - **Infrastructure**: Deployment dan manajemen server produksi berbasis **Linux** serta proteksi rute admin (`AdminAuth` middleware).

---

## 2. Spesifikasi Desain & UX Baru

### 2.1 Aturan Anti-Repetisi (*Single-Source-of-Truth UX*)
1. **CV / Resume**: Hanya berada di **Sticky Header** (`Resume` / `CV`), selalu terlihat di desktop maupun mobile, serta satu tautan utilitas di footer. Dihapus dari Hero.
2. **GitHub, LinkedIn & Email**: Dihapus dari Hero dan tidak lagi diduplikasi antara `#contact` dan `footer`. Digabung menjadi **1 Unified Terminal Contact & Footer** di bagian paling bawah halaman. Di Hero hanya ada CTA `Inspect Engineered Systems` dan tombol utilitas cepat `Copy Email` (`gryvnalvrdo@gmail.com`).
3. **Konsolidasi Proyek**: Menghapus duplikasi `.pipeline-flow` + `.projects-grid`. Diganti menjadi **Interactive System Inspector** untuk *Job Hunting Suite* (`01 AutoApply Flow`, `02 JobTrail`, `03 CoverCraft`) ditambah showcase khusus untuk **Production Hospitality System (Hotel Claro Makassar)**.

### 2.2 Aturan Bebas Tanda Baca AI & Simbol Aneh
- Seluruh kalimat di `lib/dictionary.ts`, `app/page.tsx`, `/autoapply`, dan `/covercraft` ditulis tanpa tanda hubung AI (*em-dash* / *en-dash*), tanpa simbol `//` di judul section, tanpa panah teks ASCII, dan tanpa emoji dekoratif.
- Panah navigasi dan indikator daftar menggunakan komponen SVG murni dan geometri CSS.

### 2.3 Penyesuaian Tema Per-Web (*Theme-Aware Showcase*)
Di dalam portofolio, setiap proyek memiliki **Domain Signature Accent** yang mencerminkan tema asli webnya saat diinspeksi:
- **01: AutoApply Flow** *(Automation & Ingestion Agent)* memakai aksen **Emerald (`#10b981`)**.
- **02: JobTrail** *(Full-Stack SaaS CRM & Analytics)* memakai aksen **Indigo/Violet (`#6366f1` / `#818cf8`)** sesuai tema asli `jobtracker-kjmw.vercel.app`.
- **03: CoverCraft** *(AI Document & Scraper Micro-App)* memakai aksen **Amber (`#f59e0b`)**.
- **04: Hotel Claro Makassar** *(Hospitality Reservation & Management ERP)* memakai aksen **Luxury Gold & Deep Navy (`#C9962A` / `#132035`)** sesuai tema asli `hotel-web-iota-pink.vercel.app`.

### 2.4 Header Adaptif & Mobile Bottom Dock
- **Desktop**: Brand `Gryven Alverdo.` + status badge `Open to SE Roles`, link navigasi dengan *active scroll-spy* (`Systems`, `Experience`, `Architecture`, `Contact`), toggle bahasa `EN / ID`, dan tombol `Resume`.
- **Mobile (`< 768px`)**:
  - Top bar ringkas: `Gryven Alverdo.`, toggle `EN / ID`, dan tombol **`CV`** yang tetap tampil.
  - **Bottom Floating Glass Dock**: Navigasi `Systems`, `Experience`, `Architecture`, `Contact` + tombol `Top` (saat scroll) di area *thumb zone* bawah layar dengan dukungan `env(safe-area-inset-bottom)`.
  - **Mobile Hero**: Kartu identitas horizontal di atas Hero menampilkan foto proporsional, nama, role, dan lokasi `Makassar, Indonesia (Open to Remote & Relocation)` tanpa terpotong.

---

## 3. Keamanan Hosting, Penanganan Error & Skalabilitas Traffic Tinggi

1. **HTTP Security Headers (Next.js & Laravel)**:
   - Mengaktifkan `poweredByHeader: false` dan header keamanan (`X-Content-Type-Options: nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`) di `portfolio/next.config.ts`, `job tracker/next.config.ts`, dan `hotel-claro/app/Http/Middleware/SecurityHeaders.php`.
   - Menonaktifkan `APP_DEBUG` (`"false"`) pada `hotel-claro/vercel.json` agar stack trace maupun variabel `.env` tidak pernah bocor ke publik saat terjadi error.
2. **Proteksi API, SSRF & Validasi Server-Side**:
   - **SSRF Guard (`/api/scrape`)**: Validasi URL melalui `validateExternalUrl()` di `lib/security.ts` untuk memblokir skema non-HTTP/HTTPS serta IP internal/metadata cloud (`localhost`, `127.0.0.1`, `169.254.169.254`, `10.x`, `172.16-31.x`, `192.168.x`), termasuk re-validasi tujuan redirect.
   - **Validasi File & Payload (`/api/parse-cv`, `/api/generate`)**: Pembatasan ukuran PDF maks 4 MB, pengecekan magic bytes `%PDF-`, batas panjang prompt (15.000 karakter), serta `AbortSignal.timeout`.
   - **Proteksi Webhook & IDOR (`job tracker` & `hotel-claro`)**: Menghapus fallback secret hardcoded di `/api/auto-apply` (memakai `crypto.timingSafeEqual`), membatasi endpoint publik CoverCraft sync hanya untuk akun demo/owner, menghitung ulang harga kamar dan jumlah malam di server pada `BookingController::store()` (tidak mempercayai `price` dari JSON client), dan verifikasi signature Midtrans dengan `hash_equals()` yang idempoten.
3. **Resilience & Pemulihan Error (*Error Boundaries*)**:
   - Menyediakan `app/error.tsx`, `app/global-error.tsx`, dan `app/not-found.tsx` pada Next.js serta `resources/views/errors/404.blade.php` dan `500.blade.php` pada Laravel agar kegagalan runtime/jaringan menampilkan halaman pemulihan yang bersih dan ramah pengguna.
4. **Ketahanan Saat Traffic Tinggi (*High Concurrency*)**:
   - **Rate Limiting**: Pembatasan request per IP pada endpoint AI/PDF/Scraper (`portfolio`) serta `throttle` middleware pada booking dan login admin (`hotel-claro`).
   - **Edge CDN Caching & Polling Hemat Resource**: Endpoint telemetri publik JobTrail (`/api/public/jobs` & `/api/public/stats`) memakai `Cache-Control: public, s-maxage=30, stale-while-revalidate=60` agar lonjakan pengunjung ditangani Vercel Edge CDN tanpa membebani Neon PostgreSQL, sementara `/autoapply` mem-pause polling (interval 60 detik) saat tab browser tidak aktif.
   - **Pencegahan Double Booking**: `BookingController::store()` memakai `DB::transaction` dengan `lockForUpdate()` saat mengecek stok kamar agar tidak terjadi *overbooking* ketika banyak tamu memesan kamar terakhir bersamaan.
