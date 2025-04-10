TODO:
- search bar on admin dashboard
- limit get data
- dark mode (search bar, notification, modal)
- add rating on form
- search feature
- data filling
- deploy vercel
- default route
- route protection
- logout
- user profile picture
- user greeter
- 
  
### ✅ Spek Checklist

#### 🔐 Authentication – Login Page

- [x] Input: Email & Password
- [x] Bisa menampilkan/menyembunyikan password
- [x] Validasi input dan tampilkan error jika salah
- [x] Redirect ke Manage Destination jika login berhasil

Display
- [x] Dekstop Display
- [x] Responsive on Zoom
- [ ] Mobile UI

Add-ons (Optional)
-  [x] Google Sign-in
-  [ ] Dark Mode

#### 🧭 Navigation

**Profile Section**

- [x] Menampilkan nama dan foto user
- [x] Klik → dropdown muncul dengan opsi "Logout"
- [ ] Logout → redirect ke login page
- [x] Klik di luar dropdown → dropdown tertutup

**Sidebar Navigation**

- [x] Sidebar berisi item:
  - [x] Manage Destination
  - [x] Manage Vacation
  - [x] Manage User
  - [x] Manage Booking
- [x] Klik item → redirect ke halaman yang sesuai

#### 📋 CRUD Pages

**Manage Destination**

- [x] Tabel dengan kolom: City, Price, Discount, Country, Rating, Quota
- [x] Action: Tambah, Edit, Hapus, Search
- [x] Pagination jika data > 10
- [x] Validasi form
- [x] Konfirmasi sebelum hapus

**Manage Vacation**

- [x] Tabel dengan kolom: City, Country, Price, Day Trip, Rating, Quota
- [x] Action: Tambah, Edit, Hapus, Search
- [x] Pagination jika data > 10
- [x] Validasi form
- [x] Konfirmasi sebelum hapus
- [x] Validasi kuota sebelum tambah data

**Manage User**

- [x] Tabel dengan kolom: Name, Phone Number
- [x] Action: Tambah, Edit, Hapus, Search
- [x] Pagination jika data > 10

**Manage Booking**

- [x] Tabel dengan kolom: Name, Phone, Destination/Vacation
- [x] Tidak bisa tambah data jika kuota penuh
- [x] Action: Tambah, Edit, Hapus, Search
- [x] Validasi semua field

---

# TUBES GDGOC TELKOM BANDUNG - Travel Dashboard

## Deskripsi

Ini adalah proyek dashboard web yang dikembangkan untuk memenuhi _Product Design Requirement (PRD)_ dari program Web Development GDGOC-Telkom Bandung. Aplikasi ini mencakup fitur autentikasi, navigasi dashboard, serta halaman CRUD yang berfungsi penuh. Desain UI bersifat bebas namun harus tetap memperhatikan user experience dan fungsionalitas sesuai dengan ketentuan PRD.

### Anggota Kelompok

-
-
-
-

## Cara Menjalankan Aplikasi

1. **Clone repository**

   ```bash
   git clone https://github.com/username/nama-repo.git
   cd nama-repo
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

5. **Deploy (Opsional)**
   - Hubungkan dengan [Vercel](https://vercel.com/) dan deploy langsung dari GitHub repo.

## Teknologi yang Digunakan

- **React.js** – Library utama untuk membangun UI.
- **Tailwind CSS** – Styling cepat dan efisien.
- **ShadCN** - Componen Library.
- **Ant UI** -
- **Firebase** – Backend dan autentikasi.
- **React Router DOM** – Routing antar halaman.
- **Vercel** – Deployment platform.
- **Git & GitHub** – Version control dan kolaborasi.
