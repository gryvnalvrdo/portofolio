# Product Requirements Document (PRD) v3.0
## Portfolio Web & Connected Ecosystem Upgrade

**Dokumen**: PRD v3.0  
**Tanggal**: 16 November 2026  
**Kontak Terverifikasi (dari CV)**:
- Email: `gryvnalvrdo@gmail.com`
- WhatsApp: `+62 812-5857-6431` (`https://wa.me/6281258576431`)
- LinkedIn: `https://www.linkedin.com/in/gryven-alverdo-7283ab262/`
- GitHub: `https://github.com/gryvnalvrdo`

---

## 1. Penyempurnaan Berdasarkan Evaluasi UX & Screenshot

1. **Hero 2 Kolom Seimbang (Tanpa Status "Siap Kerja", "Full-Stack", "Remote/Relokasi", maupun IPK)**:
   - Kolom kiri dan kanan Hero dibuat berukuran seimbang (`1fr 1fr`, `align-items: stretch`).
   - Menghapus badge `Siap Kerja (SE)`, `Full-Stack Software Engineer`, `Siap Remote & Relokasi`, serta angka `IPK` dari Hero, kartu profil, dan bagian pendidikan. Identitas cukup menampilkan `Universitas Atma Jaya Makassar` dan `Makassar, Indonesia`.
2. **Penghapusan Duplikasi Website Hotel Claro**:
   - Karena Website Hotel Claro Makassar merupakan karya dari masa magang, maka ditampilkan **1 kali secara utuh di bagian Pengalaman Kerja**, sementara bagian Proyek menampilkan **Job Hunting Suite** (`AutoApply Flow`, `JobTrail`, `CoverCraft`) dan **Melody Similarity Detector**.
3. **Navigasi Stepper Dua Arah (`Sebelumnya` & `Berikutnya`) & Transisi Halus**:
   - Pada panel inspektor *Job Hunting Suite*, ditambahkan tombol navigasi **Sebelumnya** dan **Berikutnya** beserta indikator posisi tahap (`01 / 03`) serta animasi pertukaran konten dan animasi pindah halaman (`template.tsx` + `scroll-padding-top`).
4. **Header Solid Anti-Transparan & Brand Bersih**:
   - Menghilangkan efek transparan pada header fixed/sticky agar teks kartu yang di-scroll di bawahnya tidak membayang menembus header.
   - Menghapus titik di akhir nama brand `Gryven Alverdo` dan menghilangkan tombol `Salin Email` baik di Hero maupun di Contact.
5. **Hero Desktop Proporsional (4 Sistem Live) & POV Mobile Khusus**:
   - Memperbesar tampilan foto profil `/photo.jpeg` di kartu kanan desktop dan merapatkan daftar indeks `4 LIVE` (`AutoApply Flow`, `JobTrail`, `CoverCraft`, `Website Hotel Claro`) agar tidak menyisakan ruang kosong di tengah kartu serta jujur terhadap sistem yang benar-benar ter-deploy (`Melody Similarity` tetap di bagian Proyek sebagai proyek riset/GitHub).
   - Membuat tata letak **Mobile POV** tersendiri (`<= 768px`): navbar mobile ramping tanpa tabrakan elemen, kartu profil ringkas horizontal tampil lebih dulu di bagian atas dengan pintasan `2x2`, dan teks pengenalan bernapas lega tanpa kotak kaku ganda.
6. **Pilihan Mode Dark & Light & Grid Kontak Ramping**:
   - Tombol ganti tema (Gelap / Terang) berlaku di halaman utama maupun subpage `/autoapply` dan `/covercraft`.
   - Bagian Contact & Footer dirampingkan menjadi baris tautan horizontal kompak (**Email**, **WhatsApp**, **LinkedIn**, **GitHub**) tanpa area kosong berlebih.
7. **Navigasi Mobile (Hamburger Top-Left + Floating Back-to-Top)**:
   - Tombol hamburger 3 garis di pojok kiri atas membuka *slide-in drawer* dari sisi kiri (lengkap dengan akses CV PDF), disertai **tombol mengambang Back-to-Top** di pojok kanan bawah saat pengguna menggulir halaman.
8. **Penghapusan Matriks Pemetaan Teknologi & Bahasa Umum**:
   - Menghilangkan section pemetaan teknologi berlebihan dan menulis seluruh deskripsi dalam bahasa umum yang mudah dimengerti.
9. **Perbaikan Layout `/autoapply`**:
   - Menghilangkan highlight permanen pada Node 4 yang membuatnya terlihat terkunci, serta menata kelima tahap alur kerja dalam grid 5 kolom sejajar di desktop.

---

## 2. Peningkatan Lintas Ekosistem Proyek

Pembaruan desain, `PRD.md`, `skills.md`, keamanan, dan UI/UX juga diterapkan langsung ke proyek terhubung lainnya di laptop:
1. **`portfolio`** (`portofolio.git`): Halaman utama, `/autoapply`, `/covercraft`, security headers, SSRF guard, rate limiting, error boundaries.
2. **`job tracker`** (`job_tracker.git`): JobTrail SaaS, perbaikan tampilan mobile top bar (tombol tambah & toggle bahasa/tema tetap mudah diakses), pembersihan gradient text/AI copy, keamanan webhook/IDOR, Edge CDN caching, dan `error.tsx`.
3. **`hotel-claro`** (`hotel-web.git`): Web Hotel Reservation & Management, perbaikan viewport `admin/login`, penghapusan AI punctuation di seluruh view, `APP_DEBUG=false`, `SecurityHeaders`, transaksi database `lockForUpdate()`, validasi harga server-side, dan halaman error `404`/`500`.
4. **`melody similarity`** (`melody-similarity.git`): AI Melody Plagiarism Detector, pembuatan `PRD.md` & `skills.md`, upgrade UI web (`web/index.html`) dengan mode Dark/Light tanpa gradient slop & emoji berlebih, serta security headers & sanitasi error pada Flask backend (`script/app.py`).
