/**
 * roboSorterData.js
 * 15 Misi Pabrik Pemilah Robotik (Robo-Factory Sorter)
 * 
 * Didesain khusus untuk logika anak 4 tahun (pre-reader):
 * - Level 1-9: Garis Lurus (Straight) vs Garis Melengkung (Curved)
 * - Level 10-15: Bentuk Tertutup/Punya Lubang (Closed) vs Bentuk Terbuka (Open)
 */

export const ROBO_SORTER_LEVELS = [
  // --- KATEGORI 1: LURUS vs MELENGKUNG (Level 1-9) ---
  {
    level: 1,
    title: 'Pilah Huruf: Lurus atau Melengkung?',
    targetLetter: 'I',
    categoryType: 'straight-vs-curved',
    leftBin: {
      type: 'straight',
      name: 'GARIS LURUS',
      icon: '📏',
      shapeSvg: '<line x1="25" y1="5" x2="25" y2="45" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>',
      hintKey: '◀ KIRI (1)'
    },
    rightBin: {
      type: 'curved',
      name: 'GARIS LENGKUNG',
      icon: '⭕',
      shapeSvg: '<circle cx="25" cy="25" r="18" fill="none" stroke="#fb923c" stroke-width="8"/>',
      hintKey: 'KANAN ▶ (2)'
    },
    correctBin: 'left',
    phonics: 'Huruf Iii! Tegak lurus seperti tiang!',
    successSound: 'Luar biasa! Huruf I lurus masuk tong biru!'
  },
  {
    level: 2,
    title: 'Pilah Huruf: Lurus atau Melengkung?',
    targetLetter: 'O',
    categoryType: 'straight-vs-curved',
    leftBin: {
      type: 'straight',
      name: 'GARIS LURUS',
      icon: '📏',
      shapeSvg: '<line x1="25" y1="5" x2="25" y2="45" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>',
      hintKey: '◀ KIRI (1)'
    },
    rightBin: {
      type: 'curved',
      name: 'GARIS LENGKUNG',
      icon: '⭕',
      shapeSvg: '<circle cx="25" cy="25" r="18" fill="none" stroke="#fb923c" stroke-width="8"/>',
      hintKey: 'KANAN ▶ (2)'
    },
    correctBin: 'right',
    phonics: 'Huruf Ooo! Melengkung bulat seperti donat!',
    successSound: 'Hebat! Huruf O melengkung masuk tong jingga!'
  },
  {
    level: 3,
    title: 'Pilah Huruf: Lurus atau Melengkung?',
    targetLetter: 'L',
    categoryType: 'straight-vs-curved',
    leftBin: {
      type: 'straight',
      name: 'GARIS LURUS',
      icon: '📏',
      shapeSvg: '<line x1="25" y1="5" x2="25" y2="45" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>',
      hintKey: '◀ KIRI (1)'
    },
    rightBin: {
      type: 'curved',
      name: 'GARIS LENGKUNG',
      icon: '⭕',
      shapeSvg: '<circle cx="25" cy="25" r="18" fill="none" stroke="#fb923c" stroke-width="8"/>',
      hintKey: 'KANAN ▶ (2)'
    },
    correctBin: 'left',
    phonics: 'Huruf Lll! Garis lurus tegak dan mendatar!',
    successSound: 'Tepat sekali! Huruf L garisnya lurus!'
  },
  {
    level: 4,
    title: 'Pilah Huruf: Lurus atau Melengkung?',
    targetLetter: 'C',
    categoryType: 'straight-vs-curved',
    leftBin: {
      type: 'straight',
      name: 'GARIS LURUS',
      icon: '📏',
      shapeSvg: '<line x1="25" y1="5" x2="25" y2="45" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>',
      hintKey: '◀ KIRI (1)'
    },
    rightBin: {
      type: 'curved',
      name: 'GARIS LENGKUNG',
      icon: '⭕',
      shapeSvg: '<circle cx="25" cy="25" r="18" fill="none" stroke="#fb923c" stroke-width="8"/>',
      hintKey: 'KANAN ▶ (2)'
    },
    correctBin: 'right',
    phonics: 'Huruf Ccc! Melengkung seperti bulan sabit!',
    successSound: 'Pintar! Huruf C melengkung indah!'
  },
  {
    level: 5,
    title: 'Pilah Huruf: Lurus atau Melengkung?',
    targetLetter: 'T',
    categoryType: 'straight-vs-curved',
    leftBin: {
      type: 'straight',
      name: 'GARIS LURUS',
      icon: '📏',
      shapeSvg: '<line x1="25" y1="5" x2="25" y2="45" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>',
      hintKey: '◀ KIRI (1)'
    },
    rightBin: {
      type: 'curved',
      name: 'GARIS LENGKUNG',
      icon: '⭕',
      shapeSvg: '<circle cx="25" cy="25" r="18" fill="none" stroke="#fb923c" stroke-width="8"/>',
      hintKey: 'KANAN ▶ (2)'
    },
    correctBin: 'left',
    phonics: 'Huruf Ttt! Tiang lurus beratap palang!',
    successSound: 'Bagus sekali! Huruf T semuanya lurus!'
  },
  {
    level: 6,
    title: 'Pilah Huruf: Lurus atau Melengkung?',
    targetLetter: 'S',
    categoryType: 'straight-vs-curved',
    leftBin: {
      type: 'straight',
      name: 'GARIS LURUS',
      icon: '📏',
      shapeSvg: '<line x1="25" y1="5" x2="25" y2="45" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>',
      hintKey: '◀ KIRI (1)'
    },
    rightBin: {
      type: 'curved',
      name: 'GARIS LENGKUNG',
      icon: '⭕',
      shapeSvg: '<circle cx="25" cy="25" r="18" fill="none" stroke="#fb923c" stroke-width="8"/>',
      hintKey: 'KANAN ▶ (2)'
    },
    correctBin: 'right',
    phonics: 'Huruf Sss! Melengkung liku-liku seperti ular!',
    successSound: 'Benar! Huruf S meliuk melengkung!'
  },
  {
    level: 7,
    title: 'Pilah Huruf: Lurus atau Melengkung?',
    targetLetter: 'H',
    categoryType: 'straight-vs-curved',
    leftBin: {
      type: 'straight',
      name: 'GARIS LURUS',
      icon: '📏',
      shapeSvg: '<line x1="25" y1="5" x2="25" y2="45" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>',
      hintKey: '◀ KIRI (1)'
    },
    rightBin: {
      type: 'curved',
      name: 'GARIS LENGKUNG',
      icon: '⭕',
      shapeSvg: '<circle cx="25" cy="25" r="18" fill="none" stroke="#fb923c" stroke-width="8"/>',
      hintKey: 'KANAN ▶ (2)'
    },
    correctBin: 'left',
    phonics: 'Huruf Hhh! Dua tiang lurus disambung jembatan!',
    successSound: 'Mantap! Huruf H tersusun dari garis lurus!'
  },
  {
    level: 8,
    title: 'Pilah Huruf: Lurus atau Melengkung?',
    targetLetter: 'U',
    categoryType: 'straight-vs-curved',
    leftBin: {
      type: 'straight',
      name: 'GARIS LURUS',
      icon: '📏',
      shapeSvg: '<line x1="25" y1="5" x2="25" y2="45" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>',
      hintKey: '◀ KIRI (1)'
    },
    rightBin: {
      type: 'curved',
      name: 'GARIS LENGKUNG',
      icon: '⭕',
      shapeSvg: '<circle cx="25" cy="25" r="18" fill="none" stroke="#fb923c" stroke-width="8"/>',
      hintKey: 'KANAN ▶ (2)'
    },
    correctBin: 'right',
    phonics: 'Huruf Uuu! Melengkung ke bawah seperti mangkuk!',
    successSound: 'Hebat! Huruf U dasarnya melengkung!'
  },
  {
    level: 9,
    title: 'Pilah Huruf: Lurus atau Melengkung?',
    targetLetter: 'E',
    categoryType: 'straight-vs-curved',
    leftBin: {
      type: 'straight',
      name: 'GARIS LURUS',
      icon: '📏',
      shapeSvg: '<line x1="25" y1="5" x2="25" y2="45" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>',
      hintKey: '◀ KIRI (1)'
    },
    rightBin: {
      type: 'curved',
      name: 'GARIS LENGKUNG',
      icon: '⭕',
      shapeSvg: '<circle cx="25" cy="25" r="18" fill="none" stroke="#fb923c" stroke-width="8"/>',
      hintKey: 'KANAN ▶ (2)'
    },
    correctBin: 'left',
    phonics: 'Huruf Eee! Tiang lurus dengan tiga cabang!',
    successSound: 'Keren! Huruf E garis lurus semua!'
  },

  // --- KATEGORI 2: TERTUTUP / LUBANG vs TERBUKA (Level 10-15) ---
  {
    level: 10,
    title: 'Pilah Huruf: Punya Lubang atau Terbuka?',
    targetLetter: 'O',
    categoryType: 'closed-vs-open',
    leftBin: {
      type: 'closed',
      name: 'PUNYA LUBANG',
      icon: '🕳️',
      shapeSvg: '<circle cx="25" cy="25" r="16" fill="#1e293b" stroke="#a855f7" stroke-width="7"/>',
      hintKey: '◀ KIRI (1)'
    },
    rightBin: {
      type: 'open',
      name: 'TERBUKA',
      icon: '👐',
      shapeSvg: '<path d="M 12 12 C 12 36, 38 36, 38 12" fill="none" stroke="#10b981" stroke-width="7" stroke-linecap="round"/>',
      hintKey: 'KANAN ▶ (2)'
    },
    correctBin: 'left',
    phonics: 'Huruf Ooo! Lingkaran utuh punya lubang di tengah!',
    successSound: 'Betul! Huruf O punya lubang tertutup!'
  },
  {
    level: 11,
    title: 'Pilah Huruf: Punya Lubang atau Terbuka?',
    targetLetter: 'C',
    categoryType: 'closed-vs-open',
    leftBin: {
      type: 'closed',
      name: 'PUNYA LUBANG',
      icon: '🕳️',
      shapeSvg: '<circle cx="25" cy="25" r="16" fill="#1e293b" stroke="#a855f7" stroke-width="7"/>',
      hintKey: '◀ KIRI (1)'
    },
    rightBin: {
      type: 'open',
      name: 'TERBUKA',
      icon: '👐',
      shapeSvg: '<path d="M 12 12 C 12 36, 38 36, 38 12" fill="none" stroke="#10b981" stroke-width="7" stroke-linecap="round"/>',
      hintKey: 'KANAN ▶ (2)'
    },
    correctBin: 'right',
    phonics: 'Huruf Ccc! Mulutnya terbuka lebar!',
    successSound: 'Tepat! Huruf C tidak ada lubangnya, terbuka!'
  },
  {
    level: 12,
    title: 'Pilah Huruf: Punya Lubang atau Terbuka?',
    targetLetter: 'D',
    categoryType: 'closed-vs-open',
    leftBin: {
      type: 'closed',
      name: 'PUNYA LUBANG',
      icon: '🕳️',
      shapeSvg: '<circle cx="25" cy="25" r="16" fill="#1e293b" stroke="#a855f7" stroke-width="7"/>',
      hintKey: '◀ KIRI (1)'
    },
    rightBin: {
      type: 'open',
      name: 'TERBUKA',
      icon: '👐',
      shapeSvg: '<path d="M 12 12 C 12 36, 38 36, 38 12" fill="none" stroke="#10b981" stroke-width="7" stroke-linecap="round"/>',
      hintKey: 'KANAN ▶ (2)'
    },
    correctBin: 'left',
    phonics: 'Huruf Ddd! Perutnya melengkung mengunci lubang!',
    successSound: 'Bagus! Huruf D punya ruang tertutup!'
  },
  {
    level: 13,
    title: 'Pilah Huruf: Punya Lubang atau Terbuka?',
    targetLetter: 'U',
    categoryType: 'closed-vs-open',
    leftBin: {
      type: 'closed',
      name: 'PUNYA LUBANG',
      icon: '🕳️',
      shapeSvg: '<circle cx="25" cy="25" r="16" fill="#1e293b" stroke="#a855f7" stroke-width="7"/>',
      hintKey: '◀ KIRI (1)'
    },
    rightBin: {
      type: 'open',
      name: 'TERBUKA',
      icon: '👐',
      shapeSvg: '<path d="M 12 12 C 12 36, 38 36, 38 12" fill="none" stroke="#10b981" stroke-width="7" stroke-linecap="round"/>',
      hintKey: 'KANAN ▶ (2)'
    },
    correctBin: 'right',
    phonics: 'Huruf Uuu! Atasnya terbuka lebar!',
    successSound: 'Cerdas! Huruf U terbuka di atas!'
  },
  {
    level: 14,
    title: 'Pilah Huruf: Punya Lubang atau Terbuka?',
    targetLetter: 'B',
    categoryType: 'closed-vs-open',
    leftBin: {
      type: 'closed',
      name: 'PUNYA LUBANG',
      icon: '🕳️',
      shapeSvg: '<circle cx="25" cy="25" r="16" fill="#1e293b" stroke="#a855f7" stroke-width="7"/>',
      hintKey: '◀ KIRI (1)'
    },
    rightBin: {
      type: 'open',
      name: 'TERBUKA',
      icon: '👐',
      shapeSvg: '<path d="M 12 12 C 12 36, 38 36, 38 12" fill="none" stroke="#10b981" stroke-width="7" stroke-linecap="round"/>',
      hintKey: 'KANAN ▶ (2)'
    },
    correctBin: 'left',
    phonics: 'Huruf Bbb! Punya dua lubang seperti kacamata!',
    successSound: 'Luar biasa! Huruf B punya dua lubang!'
  },
  {
    level: 15,
    title: 'Pilah Huruf: Punya Lubang atau Terbuka?',
    targetLetter: 'S',
    categoryType: 'closed-vs-open',
    leftBin: {
      type: 'closed',
      name: 'PUNYA LUBANG',
      icon: '🕳️',
      shapeSvg: '<circle cx="25" cy="25" r="16" fill="#1e293b" stroke="#a855f7" stroke-width="7"/>',
      hintKey: '◀ KIRI (1)'
    },
    rightBin: {
      type: 'open',
      name: 'TERBUKA',
      icon: '👐',
      shapeSvg: '<path d="M 12 12 C 12 36, 38 36, 38 12" fill="none" stroke="#10b981" stroke-width="7" stroke-linecap="round"/>',
      hintKey: 'KANAN ▶ (2)'
    },
    correctBin: 'right',
    phonics: 'Huruf Sss! Terbuka kedua ujungnya!',
    successSound: 'Hebat sekali! Semua misi pabrik telah selesai dengan gemilang!'
  }
];
