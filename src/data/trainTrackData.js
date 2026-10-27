/**
 * Data Level Permainan: Train Track Architect
 * Mengajarkan anak analisis spasial bentuk geometri huruf (I, L, T, X, C, U, S, H)
 * dengan logika arah sambungan rel yang 100% konsisten dan realistis.
 */

export const TRACK_PIECES_META = {
  'I': {
    letter: 'I',
    name: 'Rel Lurus',
    phoneme: 'Iiiiiii',
    soundDesc: 'Iiiiiiiiii-tuut-tuut!',
    layoutType: 'vertical'
  },
  'L': {
    letter: 'L',
    name: 'Rel Belok Siku',
    phoneme: 'Llllllll',
    soundDesc: 'Llllllllll-tuut-tuut!',
    layoutType: 'corner-bottom-right'
  },
  'C': {
    letter: 'C',
    name: 'Rel Lengkung',
    phoneme: 'Cccchhhh',
    soundDesc: 'Cccchhhhhh-tuut-tuut!',
    layoutType: 'loop-right'
  },
  'S': {
    letter: 'S',
    name: 'Rel Berkelok',
    phoneme: 'Ssssssss',
    soundDesc: 'Ssssssssss-tuut-tuut!',
    layoutType: 'snake-diagonal'
  },
  'T': {
    letter: 'T',
    name: 'Rel Cabang',
    phoneme: 'T-t-t-t',
    soundDesc: 'T-t-t-t-tuuut-tuut!',
    layoutType: 't-junction'
  },
  'U': {
    letter: 'U',
    name: 'Rel Putar Balik',
    phoneme: 'Uuuuuuuu',
    soundDesc: 'Uuuuuuuuuu-tuut-tuut!',
    layoutType: 'u-loop'
  },
  'X': {
    letter: 'X',
    name: 'Rel Silang',
    phoneme: 'Eks-eks',
    soundDesc: 'Eks-eks-tuut-tuut!',
    layoutType: 'crossing'
  },
  'H': {
    letter: 'H',
    name: 'Rel Jembatan',
    phoneme: 'Hhhhhhhh',
    soundDesc: 'Hhhhhhhhhh-tuut-tuut!',
    layoutType: 'bridge-h'
  }
};

export const TRAIN_TRACK_LEVELS = [
  {
    level: 1,
    title: 'Rel Lurus Menuju Kebun Jeruk',
    targetLetter: 'I',
    layoutType: 'vertical',
    startStation: 'Stasiun Lembah 🌲',
    endStation: 'Kebun Jeruk 🍊',
    choices: ['I', 'L', 'C'],
    correctLetter: 'I'
  },
  {
    level: 2,
    title: 'Belokan Siku ke Danau Biru',
    targetLetter: 'L',
    layoutType: 'corner-bottom-right',
    startStation: 'Kaki Bukit ⛰️',
    endStation: 'Danau Biru ⛵',
    choices: ['I', 'L', 'S'],
    correctLetter: 'L'
  },
  {
    level: 3,
    title: 'Lengkungan Teluk Pelangi',
    targetLetter: 'C',
    layoutType: 'loop-right',
    startStation: 'Dermaga Utara ⚓',
    endStation: 'Teluk Pelangi 🌈',
    choices: ['T', 'C', 'I'],
    correctLetter: 'C'
  },
  {
    level: 4,
    title: 'Jalur Berkelok Puncak Pinus',
    targetLetter: 'S',
    layoutType: 'snake-diagonal',
    startStation: 'Puncak Pinus 🌲',
    endStation: 'Lembah Bunga 🌸',
    choices: ['S', 'I', 'L'],
    correctLetter: 'S'
  },
  {
    level: 5,
    title: 'Persimpangan Menara Stasiun',
    targetLetter: 'T',
    layoutType: 't-junction',
    startStation: 'Depo Utama 🏢',
    endStation: 'Menara Jam 🕰️',
    choices: ['X', 'T', 'U'],
    correctLetter: 'T'
  },
  {
    level: 6,
    title: 'Putar Balik Lembah Bunga',
    targetLetter: 'U',
    layoutType: 'u-loop',
    startStation: 'Taman Barat 🌻',
    endStation: 'Gazebo Bintang ⭐',
    choices: ['I', 'U', 'S'],
    correctLetter: 'U'
  },
  {
    level: 7,
    title: 'Perlintasan Silang Kereta Kilat',
    targetLetter: 'X',
    layoutType: 'crossing',
    startStation: 'Gerbang Barat 🛤️',
    endStation: 'Stasiun Timur 🚀',
    choices: ['X', 'T', 'H'],
    correctLetter: 'X'
  },
  {
    level: 8,
    title: 'Jembatan Sungai Kembar',
    targetLetter: 'H',
    layoutType: 'bridge-h',
    startStation: 'Tepi Sungai 🌊',
    endStation: 'Mercusuar 🗼',
    choices: ['C', 'L', 'H'],
    correctLetter: 'H'
  },
  {
    level: 9,
    title: 'Jalur Lurus Hutan Bambu',
    targetLetter: 'I',
    layoutType: 'vertical',
    startStation: 'Pos Hutan 🎋',
    endStation: 'Air Terjun 💦',
    choices: ['L', 'I', 'U'],
    correctLetter: 'I'
  },
  {
    level: 10,
    title: 'Tikungan Menuju Istana Awan',
    targetLetter: 'L',
    layoutType: 'corner-bottom-right',
    startStation: 'Kaki Tebing 🏔️',
    endStation: 'Istana Awan ☁️',
    choices: ['S', 'L', 'T'],
    correctLetter: 'L'
  },
  {
    level: 11,
    title: 'Rel Berliku Mata Air Hangat',
    targetLetter: 'S',
    layoutType: 'snake-diagonal',
    startStation: 'Kawah Belerang ♨️',
    endStation: 'Mata Air Emas ✨',
    choices: ['S', 'C', 'X'],
    correctLetter: 'S'
  },
  {
    level: 12,
    title: 'Cabang Jalur Pelabuhan Kapal',
    targetLetter: 'T',
    layoutType: 't-junction',
    startStation: 'Gudang Kereta 📦',
    endStation: 'Dermaga Feri 🚢',
    choices: ['T', 'I', 'H'],
    correctLetter: 'T'
  },
  {
    level: 13,
    title: 'Lengkungan Danau Teratai',
    targetLetter: 'C',
    layoutType: 'loop-right',
    startStation: 'Paviliun Danau 🪷',
    endStation: 'Pondok Angin 🛖',
    choices: ['U', 'C', 'L'],
    correctLetter: 'C'
  },
  {
    level: 14,
    title: 'Putaran Balik Sirkuit Ceria',
    targetLetter: 'U',
    layoutType: 'u-loop',
    startStation: 'Garis Start 🏁',
    endStation: 'Podium Juara 🏆',
    choices: ['I', 'S', 'U'],
    correctLetter: 'U'
  },
  {
    level: 15,
    title: 'Perlintasan Silang Pesta Juara',
    targetLetter: 'X',
    layoutType: 'crossing',
    startStation: 'Karnaval Ria 🎪',
    endStation: 'Pesta Kembang Api 🎆',
    choices: ['X', 'T', 'H'],
    correctLetter: 'X'
  }
];
