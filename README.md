# 🌟 Petualangan Belajar Ceria - Platform Edukasi TV Anak (Persiapan Masuk SD)

Platform edukasi interaktif ramah anak berbasis kurikulum **Cambridge Early Years / Primary Stage 1** yang dirancang khusus untuk layar Smart TV menggunakan **Remote TV** (atau keyboard di PC/Laptop).

👉 **Live Web Version (GitHub Pages):** [https://wiraclogent-dotcom.github.io/petualangan-belajar-ceria/](https://wiraclogent-dotcom.github.io/petualangan-belajar-ceria/)

---

## 🎮 12 Modul Permainan Edukasi (4 Domain Utama)

Setiap permainan memiliki **10 tingkat tantangan adaptif** dengan **Anti-Pattern Dynamic Randomization Engine** (posisi pilihan dan urutan soal selalu diacak setiap kali dibuka agar anak fokus pada konsep pemahaman, bukan sekadar menghafal pola tombol).

### 1. 🧮 Matematika & Logika Bilangan
* **Hitung Dinosaurus (1–10):** Visual counting dinosaurus lucu padang rumput ceria dengan fitur Bantu Hitung.
* **Tambah Bergambar (1–10):** Konsep penjumlahan konkret menggabungkan dua kelompok dinosaurus (hijau + kuning).
* **Sahabat 10 (*Number Bonds to 10*):** Visualisasi papan sarang 10 slot (*Ten-Frame*) untuk melengkapi pasangan bilangan menuju angka 10.

### 2. 🔤 Literasi & Dunia Abjad
* **Kereta Abjad A–Z:** Flashcard interaktif 26 alfabet dengan ilustrasi vektor Microsoft Fluent Emoji dan pelafalan fonik bahasa Indonesia.
* **Tebak Suara Huruf (*Phonics*):** Melatih kepekaan fonemik anak dengan mencocokkan bunyi huruf dengan bentuk simbolnya.
* **Tebak Kata Bergambar:** Mengenali susunan kata sederhana dari benda sehari-hari (Apel, Bebek, Kucing, dll).

### 3. 🎨 Warna, Bentuk & Spasial
* **Sarang Bentuk Ajaib:** Mengenal 8 bentuk geometri dasar (Lingkaran, Persegi, Segitiga, Bintang, Oval, dll) beserta siluetnya.
* **Kuas Warna Ceria:** Mengenal 10 warna ceria disertai nama dwibahasa (Bahasa Indonesia & Bahasa Inggris).
* **Banding Ukuran (*Comparison*):** Konsep perbandingan visual besar vs kecil, panjang vs pendek, tinggi vs rendah.

### 4. 🧠 Laboratorium Nalar & Logika
* **Detektif Benda (*Odd One Out*):** Mengidentifikasi benda yang berbeda kategori (klasifikasi taksonomi sederhana).
* **Urutan Cerita (*Sequencing*):** Melatih pemikiran sebab-akibat dengan melengkapi 3 langkah tahapan kejadian.
* **Detektif Pasangan (*Association*):** Menghubungkan benda yang berpasangan secara fungsional (sepatu & kaos kaki, lebah & madu, dll).

---

## 🕹️ Standar Kontrol Remote TV (10-Foot UI)

| Tombol Remote TV | Fungsi Navigasi |
| :--- | :--- |
| **Panah Kiri (◀) / Kanan (▶)** | Berpindah fokus antar kartu menu / pilihan jawaban |
| **Tombol OK / Tengah (Enter)** | Membuka game / mengonfirmasi jawaban / bunyikan suara |
| **Tombol BACK (Kembali / ↩)** | **Hirarki Mundur:** Game ➔ Sub-Menu ➔ Portal Hub ➔ Keluar |
| **Panah Atas (▲)** | Ulang instruksi suara / fitur bantuan hitung |

---

## 📂 Struktur Folder Proyek

```
askagame/
├── src/                       # Source code modular ES Modules
│   ├── core/                  # Engine inti (soundFX, TTS, randomizer, confetti)
│   ├── data/                  # Data kurikulum Cambridge (matematika, abjad, bentuk, logika)
│   ├── games/                 # 12 kelas permainan mandiri
│   ├── ui/                    # HubController & OverlayController
│   ├── styles/                # CSS responsif Smart TV 1080p
│   └── main.js                # App coordinator, remote event dispatcher & TV state
├── public/                    # Aset statis SVG gambar huruf & UI
├── docs/                      # Dokumentasi & panduan desain
│   ├── design.md              # Spesifikasi baku antarmuka 10-foot UI TV
│   ├── README.md              # Catatan dokumentasi
│   └── screenshots/           # Arsip screenshot verifikasi TV
├── tools/                     # Skrip TV Controller CLI & ADB Bridge
├── android/                   # Native Android TV wrapper (APK)
├── index.html                 # Entry point Vite
├── vite.config.js             # Konfigurasi bundler
├── jalankan-game.bat          # Pintasan menjalankan server dev lokal
└── install-ke-tv.bat          # Pintasan pasang APK ke TV via ADB Wi-Fi
```

---

## 🚀 Panduan Pengembangan & Menjalankan

### Persyaratan
* **Node.js:** v18+ atau v20+

### Perintah Utama
```bash
# 1. Jalankan development server dengan HMR & akses Wi-Fi lokal
npm run dev

# 2. Build untuk production (dist/ ~80KB bundle)
npm run build

# 3. Preview hasil build production
npm run preview
```

### Menguji Langsung ke Xiaomi Smart TV
```bash
# Status game TV (JSON <150ms)
node tools/tv_controller.js state

# Kirim tombol remote (left, right, ok, back, up, down)
node tools/tv_controller.js key ok

# Tangkap layar langsung dari TV
node tools/tv_controller.js shot
```
