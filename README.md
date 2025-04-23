# Travel Dashboard – GDGOC TELKOM BANDUNG

Sebuah proyek dashboard web untuk manajemen perjalanan wisata, dikembangkan sebagai bagian dari *Product Design Requirement (PRD)* program Web Development GDGOC-Telkom Bandung. Aplikasi ini dilengkapi fitur autentikasi, dashboard admin, halaman CRUD, dan berbagai fitur tambahan.

## Anggota Kelompok

- [Nashir Resta Fauzian](https://github.com/NRestFzn) [607062400083]
- [Fauzan Zulfa Muhammad](https://github.com/zoovasoup) [103022400032]
- [Kaisar Rayfa Al Baihaqqi](https://github.com/kaisaaru) [103022400110]
- [Muhammad Hafizh](https://github.com/Gimerbone) [103012400078]

## List Feature
- Autentikasi dengan Email/Password dan Google Sign-in
- Dashboard admin, login/register, dan landing page responsif dengan navigasi sidebar
- Halaman CRUD untuk:
    - Destinasi Wisata
    - Paket Liburan
    - Data User
    - Data Booking
- Validasi form dan konfirmasi sebelum hapus
- Pencarian & pagination data
- Proteksi route berdasarkan autentikasi
- Cek kuota otomatis sebelum booking
- Tampilan dropdown profil dengan logout
- Dukungan mode mobile dan desktop
- Light/Dark Mode pada Admin Dashboard

## Cara Menjalankan Aplikasi

### Untuk Pengguna Umum (Live Deployment)

- Click [Link ini](https://tubes-gdgoc-black.vercel.app/)
- atau kunjungi https://tubes-gdgoc-black.vercel.app/

### Untuk Pengembangan (Development Mode)

1. **Clone Repository**
   ```bash
   git clone https://github.com/NRestFzn/tubes-gdgoc.git
   cd tubes-gdgoc
   git checkout dev
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   
3. **Setup Firebase**
   - Buat project di [Firebase Console](https://console.firebase.google.com/)
   - Aktifkan **Authentication** (Email/Password)
   - Konfigurasi **Firestore**
   - Tambahkan konfigurasi Firebase ke file `.env` atau langsung di `firebase.js`

4. **Jalankan Aplikasi**
   ```bash
   npm run dev
   ```
   
5. **Deploy (Opsional)**
   - Hubungkan ke [Vercel](https://vercel.com/) dan deploy langsung dari GitHub.
   
### Akses URL
   ```bash
   '/' - Homepage
   '/sign-in'/ - Halaman login untuk masuk ke admin dashboard
   '/admin/destination' - Halaman admin untuk mengelola destinasi
   '/admin/vacation' - Halaman admin untuk mengelola wisata
   '/admin/user' - Halaman admin untuk mengelola user
   '/admin/booking' - Halaman admin untuk mengelola booking
   ```

## Teknologi yang Digunakan
- **React.js** – Library utama UI
- **Tailwind CSS** – Styling modern & cepat
- **ShadCN UI** – Komponen UI modular
- **Ant Design (Ant UI)** – Komponen tambahan
- **Firebase** – Autentikasi & database
- **React Router DOM** – Navigasi antar halaman
- **Vercel** – Deployment platform
- **Git & GitHub** – Version control & kolaborasi

## Notes 
- 
- 
