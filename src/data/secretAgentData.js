/**
 * secretAgentData.js
 * Data Misi Permainan: Secret Agent Vault (Brankas Rahasia)
 * 
 * Melatih diskriminasi visual & kriptografi angka-ke-huruf untuk anak usia 4 tahun:
 * - Membedakan anatomi bentuk huruf (perut B vs P vs R, E vs F, dsb)
 * - Pemecahan sandi brankas robotik menggunakan tombol angka remote TV (1, 2, 3, 4)
 * - Tanpa beban mengeja kata, berbasis pencocokan visual dan fonik alami
 */

export const SECRET_AGENT_LEVELS = [
  {
    level: 1,
    title: 'Misi 1: Brankas Bola Emas',
    word: 'BOLA',
    icon: '⚽',
    meaning: 'Bola Tendang',
    // Slot yang terkunci (0-indexed)
    lockedIndices: [0], // Huruf 'B'
    cipherPad: [
      { num: 1, letter: 'B', sound: 'B-b-b Bola' },
      { num: 2, letter: 'P', sound: 'P-p-p' },
      { num: 3, letter: 'R', sound: 'R-r-r' }
    ],
    targetSequence: [1], // Tekan angka 1 (B)
    secretReward: '🏆 Piala Emas Rahasia'
  },
  {
    level: 2,
    title: 'Misi 2: Kotak Sandi Roti Hangat',
    word: 'ROTI',
    icon: '🍞',
    meaning: 'Roti Panggang',
    lockedIndices: [0], // Huruf 'R'
    cipherPad: [
      { num: 1, letter: 'B', sound: 'B-b-b' },
      { num: 2, letter: 'R', sound: 'R-r-r Roti' },
      { num: 3, letter: 'P', sound: 'P-p-p' }
    ],
    targetSequence: [2],
    secretReward: '🥐 Roti Super Lezat'
  },
  {
    level: 3,
    title: 'Misi 3: Peti Apel Kristal',
    word: 'APEL',
    icon: '🍎',
    meaning: 'Apel Merah Manis',
    lockedIndices: [0], // Huruf 'A'
    cipherPad: [
      { num: 1, letter: 'V', sound: 'V-v-v' },
      { num: 2, letter: 'H', sound: 'H-h-h' },
      { num: 3, letter: 'A', sound: 'A-a-a Apel' }
    ],
    targetSequence: [3],
    secretReward: '💎 Apel Kristal Ajaib'
  },
  {
    level: 4,
    title: 'Misi 4: Akuarium Robot Ikan',
    word: 'IKAN',
    icon: '🐟',
    meaning: 'Ikan Berenang',
    lockedIndices: [0], // Huruf 'I'
    cipherPad: [
      { num: 1, letter: 'T', sound: 'T-t-t' },
      { num: 2, letter: 'I', sound: 'I-i-i Ikan' },
      { num: 3, letter: 'L', sound: 'L-l-l' }
    ],
    targetSequence: [2],
    secretReward: '🤖 Robot Ikan Selam'
  },
  {
    level: 5,
    title: 'Misi 5: Pintu Laboratorium Bebek',
    word: 'BEBEK',
    icon: '🦆',
    meaning: 'Bebek Berenang',
    lockedIndices: [1], // Huruf 'E'
    cipherPad: [
      { num: 1, letter: 'F', sound: 'F-f-f' },
      { num: 2, letter: 'E', sound: 'E-e-e Bebek' },
      { num: 3, letter: 'L', sound: 'L-l-l' }
    ],
    targetSequence: [2],
    secretReward: '👑 Mahkota Bebek Emas'
  },
  {
    level: 6,
    title: 'Misi 6: Brankas Rahasia Kucing',
    word: 'KUCING',
    icon: '🐱',
    meaning: 'Kucing Imut',
    lockedIndices: [0], // Huruf 'K'
    cipherPad: [
      { num: 1, letter: 'K', sound: 'K-k-k Kucing' },
      { num: 2, letter: 'X', sound: 'Eks-eks' },
      { num: 3, letter: 'Y', sound: 'Ye-ye' }
    ],
    targetSequence: [1],
    secretReward: '🧶 Bola Benang Pelangi'
  },
  {
    level: 7,
    title: 'Misi 7: Garasi Mobil Patroli',
    word: 'MOBIL',
    icon: '🚗',
    meaning: 'Mobil Balap Keren',
    lockedIndices: [0], // Huruf 'M'
    cipherPad: [
      { num: 1, letter: 'W', sound: 'W-w-w' },
      { num: 2, letter: 'N', sound: 'N-n-n' },
      { num: 3, letter: 'M', sound: 'M-m-m Mobil' }
    ],
    targetSequence: [3],
    secretReward: '🏎️ Kunci Mobil Kilat'
  },
  {
    level: 8,
    title: 'Misi 8: Kapsul Balon Terbang',
    word: 'BALON',
    icon: '🎈',
    meaning: 'Balon Udara Ceria',
    lockedIndices: [3], // Huruf 'O'
    cipherPad: [
      { num: 1, letter: 'C', sound: 'C-c-c' },
      { num: 2, letter: 'Q', sound: 'Q-q-q' },
      { num: 3, letter: 'O', sound: 'O-o-o Balon' }
    ],
    targetSequence: [3],
    secretReward: '🌟 Bintang Balon Berkilau'
  },
  {
    level: 9,
    title: 'Misi 9: Lemari Buku Kuno (Sandi Ganda)',
    word: 'BUKU',
    icon: '📖',
    meaning: 'Buku Dongeng Ajaib',
    lockedIndices: [0, 2], // Huruf 'B' dan 'K'
    cipherPad: [
      { num: 1, letter: 'B', sound: 'B-b-b' },
      { num: 2, letter: 'K', sound: 'K-k-k Buku' },
      { num: 3, letter: 'D', sound: 'D-d-d' },
      { num: 4, letter: 'H', sound: 'H-h-h' }
    ],
    targetSequence: [1, 2], // Tekan 1 lalu 2
    secretReward: '📜 Peta Rahasia Agen'
  },
  {
    level: 10,
    title: 'Misi 10: Peti Pisang Raja (Sandi Ganda)',
    word: 'PISANG',
    icon: '🍌',
    meaning: 'Pisang Manis',
    lockedIndices: [0, 2], // Huruf 'P' dan 'S'
    cipherPad: [
      { num: 1, letter: 'P', sound: 'P-p-p' },
      { num: 2, letter: 'S', sound: 'S-s-s Pisang' },
      { num: 3, letter: 'B', sound: 'B-b-b' },
      { num: 4, letter: 'C', sound: 'C-c-c' }
    ],
    targetSequence: [1, 2],
    secretReward: '🍌 Pisang Emas Raksasa'
  },
  {
    level: 11,
    title: 'Misi 11: Gerbang Rumah Benteng (Sandi Ganda)',
    word: 'RUMAH',
    icon: '🏠',
    meaning: 'Rumah Agen Rahasia',
    lockedIndices: [0, 4], // Huruf 'R' dan 'H'
    cipherPad: [
      { num: 1, letter: 'R', sound: 'R-r-r' },
      { num: 2, letter: 'H', sound: 'H-h-h Rumah' },
      { num: 3, letter: 'P', sound: 'P-p-p' },
      { num: 4, letter: 'M', sound: 'M-m-m' }
    ],
    targetSequence: [1, 2],
    secretReward: '🏰 Benteng Kristal Agen'
  },
  {
    level: 12,
    title: 'Misi 12: Brankas Induk Pesawat Luar Angkasa',
    word: 'PESAWAT',
    icon: '✈️',
    meaning: 'Pesawat Agen Super',
    lockedIndices: [0, 1, 6], // Huruf 'P', 'E', dan 'T'
    cipherPad: [
      { num: 1, letter: 'P', sound: 'P-p-p' },
      { num: 2, letter: 'E', sound: 'E-e-e' },
      { num: 3, letter: 'T', sound: 'T-t-t Pesawat!' },
      { num: 4, letter: 'F', sound: 'F-f-f' }
    ],
    targetSequence: [1, 2, 3], // Tekan 1, lalu 2, lalu 3!
    secretReward: '🚀 Trofi Agen Legendaris'
  }
];
