# 📐 Spesifikasi Desain & Standar Interaksi TV: Petualangan Belajar Ceria

Dokumen ini adalah acuan baku (*Single Source of Truth*) untuk desain antarmuka, pemetaan tombol remote TV, dan arsitektur permainan pada platform **Petualangan Belajar Ceria**.

---

## 1. Standar Navigasi Remote TV (Remote Control Specification)

Sistem input TV harus konsisten, dapat diprediksi (*predictable*), dan ramah motorik anak usia 4 tahun.

| Tombol Remote | Aksi Global | Catatan Interaksi |
| :--- | :--- | :--- |
| **Panah Kiri (◀) / Kanan (▶)** | Navigasi Horizontal | Memilih kartu menu, memilih telur jawaban, atau membalik halaman alfabet. |
| **Tombol OK / Tengah (Enter)** | Konfirmasi / Aksi Utama | Memilih permainan, mengonfirmasi jawaban telur, atau mengulang bunyi suara fonik. |
| **Tombol BACK (Kembali / ↩)** | **Navigasi Mundur (MANDATORI)** | **Selalu kembali ke layar sebelumnya.** Tidak boleh digantikan oleh tombol panah. |
| **Panah Atas (▲)** | Fitur Bantuan Edukasi | Menjalankan fitur *"Bantu Hitung"* pada permainan matematika. |
| **Panah Bawah (▼)** | Cadangan Interaksi | Direservasi untuk aksi opsi tambahan di masa mendatang. |

---

## 2. Hirarki Layar & Aturan Tombol Back (Navigation Hierarchy)

Navigasi tombol `Back` harus mengikuti tumpukan (*stack*) terstruktur berikut:

```
[Level 0: Menu Utama (Hub)] 
       ▲
       │ (Tombol Back)
[Level 1: Sub-Menu Kategori (contoh: Matematika)]
       ▲
       │ (Tombol Back)
[Level 2: Arena Permainan (contoh: Hitung Dino / Tambah)]
```

* **Di Arena Permainan (Level 2):** Menekan tombol **Back** kembali ke **Sub-Menu Kategori**.
* **Di Sub-Menu Kategori (Level 1):** Menekan tombol **Back** kembali ke **Menu Utama (Hub)**.
* **Di Menu Utama (Level 0):** Menekan tombol **Back** memicu notifikasi keluar dari aplikasi secara aman.
* **Jika Pop-up Selebrasi / Bintang sedang terbuka:** Menekan tombol **Back** atau **OK** langsung menutup pop-up dan lanjut ke tingkat berikutnya.

---

## 3. Desain Antarmuka (10-Foot UI Standard)

Layar TV ruang keluarga dilihat dari jarak 2–3 meter. Seluruh elemen harus mematuhi aturan visual berikut:

### A. Tipografi & Skala
* **Root Font Size:** `13.5px` (Responsif terhadap viewport TV 1080p).
* **Font Family:** `Fredoka One` (Judul & Angka) dan `Nunito` (Teks Penjelas).
* **Ukuran Angka Pilihan:** Minimal `3.8rem` (ekstra tebal dan kontras).

### B. Indikator Fokus Remote (Focus Ring)
* Elemen yang sedang dipilih harus memiliki umpan balik visual yang mencolok:
  * Pembesaran skala: `scale(1.08)` hingga `scale(1.12)`.
  * Garis tepi bercahaya tebal (*pulsing glow*): Warna Emas `#ffe600` dan Cyan `#00f0ff`.
  * Bayangan tebal (*deep drop-shadow*) untuk memberi efek kedalaman 3D.

### C. Tata Letak Bebas Tabrakan (No Overlap Layout)
* **Bar Petunjuk Remote (`.hint-text`):** **Wajib selalu berada di baris terbawah layar**, di bawah kartu pilihan atau telur jawaban, dengan jarak margin aman minimal `14px`.
* **Safe Area Margin:** Seluruh konten utama harus memiliki jarak aman minimal `36px` dari tepi layar untuk mencegah *overscan clipping* pada TV lama.

---

## 4. Standar Grafis & Aset Edukasi (Asset Pipeline)

1. **Ilustrasi Objek & Huruf:**
   * Wajib menggunakan **Microsoft Fluent Emoji (Format Vektor SVG)**.
   * Disimpan secara lokal di folder `assets/images/alphabet/*.svg` untuk memastikan dukungan 100% offline.
   * Dilengkapi sistem *pre-caching* di memori agar pergantian huruf berjalan instan tanpa jeda *loading*.
2. **Karakter Dinosaurus & UI Game:**
   * Menggunakan format SVG inline atau dari **Kenney Assets (CC0)**.
   * Mengutamakan bentuk organik ceria dan warna-warni kontras tinggi.

---

## 5. Filosofi Pengalaman Belajar Anak 4 Tahun (Child Psychology)

1. **Zero-Frustration / Tidak Ada Kalah:**
   * Jika anak salah memilih angka, tidak ada suara dengungan (*buzzer*) menyeramkan dan skor tidak berkurang.
   * Kartu hanya bergoyang lembut (*gentle cartoon wobble*) dan narator berkata: *"Coba hitung lagi ya!"*.
2. **Umpan Balik Positif Instan:**
   * Setiap jawaban benar disambut dengan akord musik ceria, karakter melompat, bintang terkumpul, dan semburan konfeti warna-warni.
3. **Narasi Suara Bahasa Indonesia:**
   * Seluruh teks utama dibacakan dengan artikulasi santai dan ramah anak.

---

## 6. Standar Audio & Narasi Suara (Voice & Audio Pipeline)

1. **Arsitektur Dual Voice Engine (PC vs TV):**
   * **PC / Desktop Browser:** Menggunakan browser W3C **Web Speech API** (`window.speechSynthesis`) dengan aksen Bahasa Indonesia (`id-ID`).
   * **Android TV / APK:** Karena Android System WebView tidak mendukung Web Speech API secara native, aplikasi mengintegrasikan **Native Android TextToSpeech Bridge (`window.AndroidTTS`)** via `@JavascriptInterface` yang terhubung ke mesin Google TTS (`com.google.android.tts`).
   * Deklarasi `<queries><intent><action android:name="android.intent.action.TTS_SERVICE" /></intent></queries>` wajib dicantumkan pada `AndroidManifest.xml` untuk kompatibilitas Android 11+ (API 30+).

2. **Sintesis Efek Suara (Web Audio API):**
   * Seluruh efek suara navigasi (geser, ketuk telur, nada benar, nada riang selebrasi) disintesis secara matematis menggunakan Web Audio API Oscillator (bebas jeda file audio eksternal dan 100% instan).
