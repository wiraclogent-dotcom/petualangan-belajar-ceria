/**
 * Kurikulum Coding Pre-Reader (Usia 4 Tahun) - Cambridge & MIT ScratchJr Aligned
 * 20 Tingkat Petualangan Algoritma & Orientasi Spasial
 * 
 * Grid Directions: 
 * 0: 'up', 1: 'right', 2: 'down', 3: 'left'
 */
export const CODING_DATA = [
  // --- TINGKAT 1 - 4: STRAIGHT SEQUENCING (1 - 3 LANGKAH MAJU) ---
  {
    level: 1,
    title: 'Langkah Pertama',
    gridSize: 4,
    dinoStart: { x: 0, y: 1, dir: 1 }, // hadap kanan
    target: { x: 1, y: 1, type: 'apple', icon: '🍎', name: 'Apel Merah' },
    obstacles: [],
    allowedBlocks: ['forward'],
    maxBlocks: 3,
    hint: 'Bantu Dino melangkah 1 kali maju untuk memetik apel merah!'
  },
  {
    level: 2,
    title: 'Dua Langkah Ceria',
    gridSize: 4,
    dinoStart: { x: 0, y: 2, dir: 1 },
    target: { x: 2, y: 2, type: 'banana', icon: '🍌', name: 'Pisang Manis' },
    obstacles: [],
    allowedBlocks: ['forward'],
    maxBlocks: 4,
    hint: 'Pisangnya ada di depan! Masukkan 2 balok maju ya!'
  },
  {
    level: 3,
    title: 'Tiga Langkah Panjang',
    gridSize: 4,
    dinoStart: { x: 0, y: 1, dir: 1 },
    target: { x: 3, y: 1, type: 'watermelon', icon: '🍉', name: 'Semangka Segar' },
    obstacles: [],
    allowedBlocks: ['forward'],
    maxBlocks: 5,
    hint: 'Wah, semangkanya segar! Masukkan 3 balok maju ke buah semangka!'
  },
  {
    level: 4,
    title: 'Melangkah Turun',
    gridSize: 4,
    dinoStart: { x: 2, y: 0, dir: 2 }, // hadap bawah
    target: { x: 2, y: 3, type: 'strawberry', icon: '🍓', name: 'Stroberi Manis' },
    obstacles: [],
    allowedBlocks: ['forward'],
    maxBlocks: 5,
    hint: 'Dino menghadap ke bawah. Masukkan balok maju untuk berjalan lurus ke stroberi!'
  },

  // --- TINGKAT 5 - 8: TURNING & ORIENTASI SPASIAL (HURUF L & HINDARI BATU) ---
  {
    level: 5,
    title: 'Belok ke Kanan',
    gridSize: 4,
    dinoStart: { x: 1, y: 1, dir: 1 }, // hadap kanan
    target: { x: 2, y: 2, type: 'apple', icon: '🍎', name: 'Apel Merah' },
    obstacles: [{ x: 3, y: 1, type: 'rock', icon: '🪨' }],
    allowedBlocks: ['forward', 'turn_right'],
    maxBlocks: 5,
    hint: 'Ada batu di depan! Maju 1 langkah, lalu putar kanan dan maju lagi!'
  },
  {
    level: 6,
    title: 'Belok ke Kiri',
    gridSize: 4,
    dinoStart: { x: 1, y: 2, dir: 1 }, // hadap kanan
    target: { x: 2, y: 1, type: 'cherry', icon: '🍒', name: 'Ceri Merah' },
    obstacles: [{ x: 3, y: 2, type: 'rock', icon: '🪨' }],
    allowedBlocks: ['forward', 'turn_left'],
    maxBlocks: 5,
    hint: 'Ada batu menghalangi! Maju, lalu putar kiri menuju buah ceri!'
  },
  {
    level: 7,
    title: 'Jalan Berkelok L',
    gridSize: 4,
    dinoStart: { x: 0, y: 3, dir: 0 }, // hadap atas
    target: { x: 2, y: 1, type: 'mango', icon: '🥭', name: 'Mangga Harum' },
    obstacles: [{ x: 0, y: 0, type: 'rock', icon: '🪨' }, { x: 1, y: 2, type: 'tree', icon: '🌳' }],
    allowedBlocks: ['forward', 'turn_right', 'turn_left'],
    maxBlocks: 6,
    hint: 'Ayo buatkan jalan: Maju dua kali, putar kanan, lalu maju ke buah mangga!'
  },
  {
    level: 8,
    title: 'Dua Belokan Pintar',
    gridSize: 4,
    dinoStart: { x: 0, y: 1, dir: 1 },
    target: { x: 2, y: 3, type: 'orange', icon: '🍊', name: 'Jeruk Manis' },
    obstacles: [{ x: 1, y: 2, type: 'rock', icon: '🪨' }],
    allowedBlocks: ['forward', 'turn_right', 'turn_left'],
    maxBlocks: 7,
    hint: 'Hindari batu di tengah ya! Buat jalan melingkari batu!'
  },

  // --- TINGKAT 9 - 12: ZIG-ZAG & DETEKTIF JALUR BEBAS RINTANGAN ---
  {
    level: 9,
    title: 'Jalur Zig-Zag',
    gridSize: 4,
    dinoStart: { x: 0, y: 0, dir: 1 },
    target: { x: 3, y: 3, type: 'pineapple', icon: '🍍', name: 'Nanas Madu' },
    obstacles: [{ x: 1, y: 1, type: 'rock', icon: '🪨' }, { x: 2, y: 2, type: 'rock', icon: '🪨' }],
    allowedBlocks: ['forward', 'turn_right', 'turn_left'],
    maxBlocks: 8,
    hint: 'Ada batu di tengah jalan! Ayo susun langkah berliku menuju nanas madu!'
  },
  {
    level: 10,
    title: 'Taman Batu Berliku',
    gridSize: 5,
    dinoStart: { x: 0, y: 2, dir: 1 },
    target: { x: 4, y: 2, type: 'grape', icon: '🍇', name: 'Anggur Ungu' },
    obstacles: [{ x: 2, y: 2, type: 'tree', icon: '🌳' }, { x: 2, y: 1, type: 'rock', icon: '🪨' }],
    allowedBlocks: ['forward', 'turn_right', 'turn_left'],
    maxBlocks: 9,
    hint: 'Pohon besar menghalangi jalan lurus! Arahkan Dino memutar lewat bawah!'
  },
  {
    level: 11,
    title: 'Lorong Sempit',
    gridSize: 5,
    dinoStart: { x: 0, y: 0, dir: 2 }, // hadap bawah
    target: { x: 4, y: 4, type: 'watermelon', icon: '🍉', name: 'Semangka Merah' },
    obstacles: [{ x: 0, y: 3, type: 'rock', icon: '🪨' }, { x: 2, y: 1, type: 'rock', icon: '🪨' }, { x: 3, y: 3, type: 'rock', icon: '🪨' }],
    allowedBlocks: ['forward', 'turn_right', 'turn_left'],
    maxBlocks: 9,
    hint: 'Perhatikan lorong yang aman! Jangan sampai Dino menabrak batu ya!'
  },
  {
    level: 12,
    title: 'Memilih Jalan Terbaik',
    gridSize: 5,
    dinoStart: { x: 1, y: 4, dir: 0 }, // hadap atas
    target: { x: 3, y: 0, type: 'strawberry', icon: '🍓', name: 'Stroberi Manis' },
    obstacles: [{ x: 1, y: 1, type: 'rock', icon: '🪨' }, { x: 3, y: 2, type: 'tree', icon: '🌳' }],
    allowedBlocks: ['forward', 'turn_right', 'turn_left'],
    maxBlocks: 9,
    hint: 'Ada dua jalan ke atas! Pilih jalan yang tidak ada batu dan pohonnya!'
  },

  // --- TINGKAT 13 - 16: MULTI-OBJECTIVE (AMBIL KUNCI 🔑 LALU BUKA SARANG 🚪) ---
  {
    level: 13,
    title: 'Kunci Sarang Emas',
    gridSize: 4,
    dinoStart: { x: 0, y: 0, dir: 1 },
    target: { x: 3, y: 3, type: 'nest', icon: '🏡', name: 'Sarang Nyaman' },
    bonusItem: { x: 2, y: 0, type: 'key', icon: '🔑', name: 'Kunci Pintu' },
    obstacles: [{ x: 2, y: 2, type: 'rock', icon: '🪨' }],
    allowedBlocks: ['forward', 'turn_right', 'turn_left'],
    maxBlocks: 9,
    hint: 'Ambil kunci emas di atas dulu, baru Dino bisa pulang ke rumah sarang!'
  },
  {
    level: 14,
    title: 'Bekal Buah Pulang',
    gridSize: 5,
    dinoStart: { x: 0, y: 2, dir: 1 },
    target: { x: 4, y: 2, type: 'nest', icon: '🏡', name: 'Sarang Dino' },
    bonusItem: { x: 2, y: 0, type: 'apple', icon: '🍎', name: 'Apel Merah' },
    obstacles: [{ x: 2, y: 2, type: 'water', icon: '🌊' }],
    allowedBlocks: ['forward', 'turn_right', 'turn_left'],
    maxBlocks: 9,
    hint: 'Ambil bekal buah apel di atas dan hindari genangan air menuju sarang!'
  },
  {
    level: 15,
    title: 'Misi Penyelamatan Telur',
    gridSize: 5,
    dinoStart: { x: 0, y: 4, dir: 0 }, // hadap atas
    target: { x: 4, y: 0, type: 'nest', icon: '🏡', name: 'Sarang Induk' },
    bonusItem: { x: 0, y: 0, type: 'egg', icon: '🥚', name: 'Telur Kecil' },
    obstacles: [{ x: 2, y: 1, type: 'rock', icon: '🪨' }, { x: 2, y: 3, type: 'rock', icon: '🪨' }],
    allowedBlocks: ['forward', 'turn_right', 'turn_left'],
    maxBlocks: 10,
    hint: 'Selamatkan telur kecil di pojok atas, lalu bawa ke sarang induk!'
  },
  {
    level: 16,
    title: 'Labirin Pulau Kunci',
    gridSize: 5,
    dinoStart: { x: 2, y: 4, dir: 0 },
    target: { x: 2, y: 0, type: 'nest', icon: '🏡', name: 'Gerbang Istana' },
    bonusItem: { x: 4, y: 2, type: 'key', icon: '🔑', name: 'Kunci Ajaib' },
    obstacles: [{ x: 2, y: 2, type: 'rock', icon: '🪨' }, { x: 1, y: 2, type: 'tree', icon: '🌳' }],
    allowedBlocks: ['forward', 'turn_right', 'turn_left'],
    maxBlocks: 10,
    hint: 'Kunci istana ada di sebelah kanan! Ayo ambil kuncinya sebelum ke istana!'
  },

  // --- TINGKAT 17 - 20: JUMP OVER OBSTACLES & MASTERY ---
  {
    level: 17,
    title: 'Lompatan Pertama',
    gridSize: 4,
    dinoStart: { x: 0, y: 1, dir: 1 },
    target: { x: 3, y: 1, type: 'banana', icon: '🍌', name: 'Pisang Emas' },
    obstacles: [{ x: 1, y: 1, type: 'water', icon: '🌊' }],
    allowedBlocks: ['forward', 'jump'],
    maxBlocks: 4,
    hint: 'Ada kubangan air! Gunakan balok lompat untuk melompati air!'
  },
  {
    level: 18,
    title: 'Lompat dan Belok',
    gridSize: 5,
    dinoStart: { x: 0, y: 2, dir: 1 },
    target: { x: 3, y: 0, type: 'apple', icon: '🍎', name: 'Apel Lezat' },
    obstacles: [{ x: 1, y: 2, type: 'water', icon: '🌊' }, { x: 2, y: 1, type: 'rock', icon: '🪨' }],
    allowedBlocks: ['forward', 'turn_left', 'jump'],
    maxBlocks: 6,
    hint: 'Lompati kubangan air, lalu putar kiri menuju buah apel!'
  },
  {
    level: 19,
    title: 'Dua Lompatan Berani',
    gridSize: 5,
    dinoStart: { x: 0, y: 0, dir: 1 },
    target: { x: 4, y: 4, type: 'mango', icon: '🥭', name: 'Mangga Emas' },
    obstacles: [{ x: 1, y: 0, type: 'water', icon: '🌊' }, { x: 3, y: 2, type: 'water', icon: '🌊' }],
    allowedBlocks: ['forward', 'turn_right', 'turn_left', 'jump'],
    maxBlocks: 8,
    hint: 'Lompati air dua kali dan berbeloklah di jalan yang tepat!'
  },
  {
    level: 20,
    title: 'Grand Master Dino Coder',
    gridSize: 5,
    dinoStart: { x: 0, y: 4, dir: 0 }, // hadap atas
    target: { x: 4, y: 0, type: 'trophy', icon: '🏆', name: 'Piala Juara Coding' },
    bonusItem: { x: 0, y: 0, type: 'key', icon: '🔑', name: 'Kunci Juara' },
    obstacles: [{ x: 2, y: 0, type: 'rock', icon: '🪨' }, { x: 2, y: 2, type: 'water', icon: '🌊' }, { x: 2, y: 4, type: 'rock', icon: '🪨' }],
    allowedBlocks: ['forward', 'turn_right', 'turn_left', 'jump'],
    maxBlocks: 10,
    hint: 'Tantangan terakhir Juara Coding! Ambil kunci emas dan raih piala juara!'
  }
];
