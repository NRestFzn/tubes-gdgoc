# TUBES GDGOC TELKOM BANDUNG - Travel Dashboard

## Deskripsi

Ini adalah proyek dashboard web yang dikembangkan untuk memenuhi _Product Design Requirement (PRD)_ dari program Web Development GDGOC-Telkom Bandung. Aplikasi ini mencakup fitur autentikasi, navigasi dashboard, serta halaman CRUD yang berfungsi penuh. Desain UI bersifat bebas namun harus tetap memperhatikan user experience dan fungsionalitas sesuai dengan ketentuan PRD.

### Anggota Kelompok

- Nashir Resta Fauzian (607062400083)
- Fauzan Zulfa Muhammad (103022400032)
- Kaisar Rayfa Al Baihaqqi (103022400110)
-

## Cara Menjalankan Aplikasi

1. **Clone repository**

   ```bash
   git clone https://github.com/NRestFzn/tubes-gdgoc.git
   cd tubes-gdgoc
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup Firebase**

   - Buat project di [Firebase Console](https://console.firebase.google.com/)
   - Aktifkan **Authentication** (Email/Password)
   - Buat dan konfigurasi **Firestore** database
   - Tambahkan konfigurasi Firebase ke dalam file `.env` atau langsung di file `firebase.js`

4. **Jalankan aplikasi**

   ```bash
   npm run dev
   ```

5. **Akses URL**

   ```bash
   '/' - Homepage
   '/sign-in'/ - Halaman login untuk masuk ke admin dashboard
   '/admin/destination' - Halaman admin untuk mengelola destinasi
   '/admin/vacation' - Halaman admin untuk mengelola wisata
   '/admin/user' - Halaman admin untuk mengelola user
   '/admin/booking' - Halaman admin untuk mengelola booking
   ```

## Teknologi yang Digunakan

- **React.js** – Library utama untuk membangun UI.
- **Tailwind CSS** – Styling cepat dan efisien.
- **ShadCN** - Componen Library.
- **AntDesign** -
- **Firebase** – Backend dan autentikasi.
- **React Router DOM** – Routing antar halaman.
- **Vercel** – Deployment platform.
- **TanStack React-Query** – Fetching data.
- **Git & GitHub** – Version control dan kolaborasi.
