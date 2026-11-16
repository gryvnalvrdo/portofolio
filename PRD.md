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
3. **Navigasi Stepper Dua Arah (`Sebelumnya` & `Berikutnya`)**:
   - Pada panel inspektor *Job Hunting Suite*, ditambahkan tombol navigasi **Sebelumnya** dan **Berikutnya** beserta indikator posisi tahap (`01 / 03`).
2. **Pilihan Mode Dark & Light**:
   - Menambahkan tombol ganti tema (Gelap / Terang) di header yang berlaku di halaman utama maupun subpage `/autoapply` dan `/covercraft`.
3. **Navigasi Mobile (Hamburger Top-Left + Floating Back-to-Top)**:
   - Mengganti bottom dock dengan **tombol hamburger 3 garis di pojok kiri atas** yang membuka *slide-in drawer* dari sisi kiri.
   - Mengembalikan **tombol mengambang Back-to-Top** di pojok kanan bawah saat pengguna menggulir halaman.
4. **Penghapusan Matriks Pemetaan Teknologi**:
   - Menghilangkan section `#skills` (21 kartu pemetaan teknologi) agar halaman lebih ringkas, tidak repetitif, dan nyaman dibaca.
5. **Bahasa Umum yang Dipahami Semua Orang**:
   - Menulis ulang seluruh deskripsi proyek dan pengalaman kerja menggunakan bahasa umum yang berfokus pada manfaat bisnis dan cara kerja nyata, tanpa membuang jargon kode internal (`getAvailableStock`, `AdminAuth`, kode warna hex, dll.) ke pembaca awam.
6. **Penambahan Karya CV (`Melody Similarity Detector`) & Perapihan Contact/Footer**:
   - Menampilkan **Hotel Claro Makassar** dan **Melody Similarity Detector** dalam grid 2 kolom di bagian Sistem Unggulan.
   - Merapikan bagian Contact & Footer menjadi 4 kartu kanal kontak yang seimbang (**Email**, **WhatsApp**, **LinkedIn**, **GitHub**) dengan tata letak bersih di desktop dan mobile.
7. **Perbaikan Layout & Highlight pada `/autoapply`**:
   - Menghilangkan highlight permanen pada Node 4 yang membuatnya terlihat terkunci, serta menata kelima tahap alur kerja dalam grid 5 kolom sejajar di desktop agar Node 5 tidak turun baris.

---

## 2. Peningkatan Lintas Ekosistem Proyek

Pembaruan desain, `PRD.md`, `skills.md`, keamanan, dan UI/UX juga diterapkan langsung ke proyek terhubung lainnya di laptop:
1. **`portfolio`** (`portofolio.git`): Halaman utama, `/autoapply`, `/covercraft`, security headers, SSRF guard, rate limiting, error boundaries.
2. **`job tracker`** (`job_tracker.git`): JobTrail SaaS, perbaikan tampilan mobile top bar (tombol tambah & toggle bahasa/tema tetap mudah diakses), pembersihan gradient text/AI copy, keamanan webhook/IDOR, Edge CDN caching, dan `error.tsx`.
3. **`hotel-claro`** (`hotel-web.git`): Web Hotel Reservation & Management, perbaikan viewport `admin/login`, penghapusan AI punctuation di seluruh view, `APP_DEBUG=false`, `SecurityHeaders`, transaksi database `lockForUpdate()`, validasi harga server-side, dan halaman error `404`/`500`.
4. **`melody similarity`** (`melody-similarity.git`): AI Melody Plagiarism Detector, pembuatan `PRD.md` & `skills.md`, upgrade UI web (`web/index.html`) dengan mode Dark/Light tanpa gradient slop & emoji berlebih, serta security headers & sanitasi error pada Flask backend (`script/app.py`).
