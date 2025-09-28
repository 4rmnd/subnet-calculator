# Kalkulator Subnet

![Kalkulator Subnet]

Aplikasi web kalkulator subnet modern dan ramah pengguna yang dibangun dengan React dan Vite. Alat ini membantu administrator jaringan, mahasiswa IT, dan profesional melakukan berbagai perhitungan alamat IP dengan cepat dan efisien.

## Fitur

### Konverter IP
Mudah mengkonversi antara alamat IP desimal dan representasi binernya. Alat ini memvalidasi input dan memberikan pesan kesalahan yang jelas untuk format yang tidak valid.

### Detektor Kelas IP
Identifikasi kelas alamat IP (A, B, C, D, atau E) dan lihat informasi detail tentang setiap kelas, termasuk rentang alamat dan subnet mask default.

### Kalkulator Jaringan
Hitung parameter jaringan penting dari alamat IP dan notasi CIDR, termasuk:
- ID Jaringan
- Alamat broadcast
- Alamat host pertama dan terakhir yang dapat digunakan
- Jumlah total host yang dapat digunakan
- Subnet mask dalam format desimal

### Kalkulator Subnet
Konversi antara notasi CIDR dan subnet mask. Termasuk tabel referensi praktis dari konfigurasi subnet umum dengan kapasitas host yang sesuai.

### Kalkulator VLSM
Implementasikan Variable Length Subnet Masking untuk mengalokasikan ruang alamat secara efisien berdasarkan kebutuhan jaringan tertentu. Fitur meliputi:
- Perhitungan subnet otomatis berdasarkan kebutuhan host
- Opsi penugasan CIDR manual untuk pengguna tingkat lanjut
- Hasil alokasi subnet detail dengan ID jaringan, alamat broadcast, dan rentang IP yang dapat digunakan

### Visualisasi Jaringan
Buat representasi visual dari topologi jaringan Anda dengan diagram interaktif. Ekspor diagram jaringan Anda sebagai gambar PNG atau dokumen PDF untuk dokumentasi dan presentasi.

## Memulai

### Prasyarat
- Node.js (v14 atau lebih tinggi)
- npm atau yarn

### Instalasi

1. Klon repositori
   ```
   git clone https://github.com/username-anda/subnet-calculator.git
   cd subnet-calculator
   ```

2. Instal dependensi
   ```
   npm install
   # atau
   yarn
   ```

3. Mulai server pengembangan
   ```
   npm run dev
   # atau
   yarn dev
   ```

4. Buka browser Anda dan navigasikan ke `http://localhost:5173`

### Membangun untuk Produksi

```
npm run build
# atau
yarn build
```

File yang dibangun akan berada di direktori `dist`, siap untuk di-deploy ke layanan hosting statis apa pun.

## Teknologi yang Digunakan

- **React** - Pustaka UI untuk membangun antarmuka pengguna
- **Vite** - Alat frontend generasi berikutnya untuk pengembangan lebih cepat
- **Tailwind CSS** - Framework CSS utility-first untuk styling
- **React Router** - Untuk navigasi antara alat kalkulator yang berbeda
- **ReactFlow** - Untuk diagram visualisasi jaringan interaktif
- **html-to-image & jsPDF** - Untuk mengekspor visualisasi dan laporan

## Struktur Proyek

```
├── public/               # Aset statis
├── src/
│   ├── components/       # Komponen React
│   │   ├── IpClassDetector.jsx
│   │   ├── IpConverter.jsx
│   │   ├── Navigation.jsx
│   │   ├── NetworkCalculator.jsx
│   │   ├── NetworkVisualization.jsx
│   │   ├── SubnetCalculator.jsx
│   │   └── VlsmCalculator.jsx
│   ├── context/          # React context untuk manajemen state
│   │   └── ThemeContext.jsx
│   ├── utils/            # Fungsi utilitas
│   │   ├── exportUtils.js
│   │   └── ipUtils.js
│   ├── App.jsx           # Komponen aplikasi utama
│   └── main.jsx          # Titik masuk aplikasi
└── index.html            # Template HTML
```

## Tips Penggunaan

- Untuk Konverter IP, pastikan Anda memasukkan alamat IP yang valid dalam format `xxx.xxx.xxx.xxx`
- Saat menggunakan Kalkulator VLSM, atur subnet Anda dari yang terbesar hingga terkecil untuk alokasi optimal
- Alat Visualisasi Jaringan bekerja paling baik untuk jaringan dengan hingga 20 subnet
- Gunakan fungsionalitas ekspor untuk menyimpan perhitungan Anda untuk tujuan dokumentasi

## Kontribusi

Kontribusi sangat diterima! Jangan ragu untuk membuka isu atau mengirimkan pull request untuk membantu meningkatkan alat ini.