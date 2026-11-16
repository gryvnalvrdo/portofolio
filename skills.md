# Engineering Portfolio UI/UX & Standards Skill (`skills.md`)

> **Target**: Standar desain, arsitektur informasi, gaya bahasa, keamanan, dan pengalaman mobile untuk portofolio **Gryven Alverdo Gunawan**.

---

## 1. Larangan UI Generik, Label Jabatan di Depan, dan Simbol AI

1. **Jangan Memasang Label "Full-Stack / Siap Kerja / Remote & Relokasi" atau IPK di Tampilan Depan**:
   - Dilarang memasang badge status seperti `Siap Kerja (SE)`, `Available for Work`, atau `Siap Remote & Relokasi` di header maupun kartu Hero.
   - Dilarang menampilkan label `Full-Stack Software Engineer` atau angka `IPK 3.88 / 4.00` di atas judul maupun di kartu profil depan. Cukup tampilkan identitas bersih (`Gryven Alverdo Gunawan`, `Universitas Atma Jaya Makassar`, `Makassar, Indonesia`).
   - Pastikan dua kolom Hero (`kiri` dan `kanan`) memiliki tinggi dan proporsi ukuran yang seimbang (`align-items: stretch`, `grid-template-columns: 1fr 1fr`).
   - Jangan menduplikasi proyek magang (**Hotel Claro Makassar**) di bagian Proyek sekaligus di bagian Pengalaman: tempatkan karya magang hotel secara utuh di bagian **Pengalaman**, sedangkan bagian **Proyek** difokuskan pada proyek pribadi dan riset (**Job Hunting Suite** dan **Melody Similarity Detector**).
   - Pada inspektor pipeline bertahap, sediakan navigasi dua arah (**Sebelumnya** dan **Berikutnya**) yang rapi.
2. **Bahasa Umum yang Mudah Dimengerti Semua Orang**:
   - Dilarang menulis nama fungsi internal (`getAvailableStock`, `AdminAuth`), kode hex CSS (`#0C1526`), atau nama operator database (`Prisma $transaction`) di dalam deskripsi portofolio utama.
   - Jelaskan manfaat, fungsi nyata, dan hasil setiap sistem dengan bahasa yang langsung dipahami oleh HR, manajer proyek, klien bisnis, maupun developer.
3. **Bebas Tanda Baca AI & Simbol Aneh**:
   - Dilarang memakai tanda hubung panjang (*em-dash* `—` / *en-dash* `–`), garis miring ganda (`//`), panah ASCII (`───►`), prompt palsu (`$`), atau emoji dekoratif di tombol dan badge.
   - Gunakan ikon SVG vektor untuk panah, tema, dan tautan eksternal.
4. **Tanpa Pemetaan Teknologi Berlebihan**:
   - Jangan membuat grid 20+ kartu pemetaan teknologi yang terasa padat dan berulang. Cukup tampilkan ringkasan teknologi secara rapi di dalam masing-masing proyek dan pengalaman.

---

## 2. Single-Source-of-Truth UX & Dual Theme Support

1. **Zero Repetition**:
   - Tombol **CV** berada di Header dan di menu mobile (tidak diduplikasi di Hero).
   - Kontak lengkap (**Email**, **WhatsApp**, **LinkedIn**, **GitHub**) dikonsentrasikan dalam **1 Unified Contact & Footer Section** dengan tata letak simetris dan bersih.
   - Ekosistem *Job Hunting Suite* (`01 AutoApply Flow`, `02 JobTrail`, `03 CoverCraft`) ditampilkan dalam **1 Interactive Pipeline Inspector** tanpa mengulang kartu proyek di bawahnya.
   - Karya utama lainnya (**Hotel Claro Makassar** dan **Melody Similarity Detector**) ditampilkan dalam grid 2 kolom yang seimbang.
2. **Dark & Light Mode (`data-theme`)**:
   - Portofolio dan seluruh subpage wajib mendukung mode **Dark** dan **Light** yang persisten di `localStorage` dengan rasio kontras teks yang nyaman di kedua tema.
3. **Interaksi Pipeline yang Jujur (Tanpa Node Terkunci)**:
   - Pada diagram alur `/autoapply`, semua tahap harus tertata sejajar rapi tanpa ada node anak yatim yang turun baris, dan tidak boleh ada satu node (seperti Node 4) yang terlihat terkunci/aktif permanen secara visual tanpa alasan.

---

## 3. Mobile-First Navigation & Ergonomi (Prioritas Utama)

1. **Top-Left 3-Line Hamburger Menu (`< 768px`)**:
   - Tombol menu 3 garis diletakkan di **kiri atas** header mobile (di samping nama brand) dan membuka **slide-in drawer dari kiri** yang berisi navigasi section (`Projects`, `Experience`, `Contact`) serta akses `CV`, pilihan bahasa (`EN / ID`), dan tema (`Dark / Light`).
   - Wajib mendukung penutupan lewat klik backdrop dan tombol `Escape`.
2. **Floating Back-to-Top Button**:
   - Tombol mengambang `Top` di pojok kanan bawah muncul otomatis saat halaman di-scroll ke bawah untuk memudahkan kembali ke atas di layar panjang maupun mobile.

---

## 4. Keamanan Hosting, Error Handling & Skalabilitas

1. **Zero Secret Leakage & Security Headers**:
   - Nonaktifkan `poweredByHeader` dan pasang `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, dan `Strict-Transport-Security`.
2. **Proteksi Endpoint Publik**:
   - Endpoint AI/PDF/Scraper wajib memiliki **Rate Limiter per IP**, batas ukuran payload/file, validasi *magic bytes* `%PDF-`, dan **SSRF URL Guard** (`validateExternalUrl`).
3. **Graceful Error Boundaries & High-Traffic Cache**:
   - Sediakan `error.tsx`, `global-error.tsx`, dan `not-found.tsx` serta kurangi frekuensi polling dengan memeriksa `document.visibilityState === "visible"`.
