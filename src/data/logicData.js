/**
 * Data Lab Logika Cambridge: Detektif Benda, Urutan Cerita, Detektif Pasangan, Phonics, dan Sight Words
 */
export const ODD_DATA = [
  {
    id: 1,
    categoryName: 'Buah-buahan',
    items: [
      { id: 'apple', name: 'Apel', icon: '🍎', isOdd: false },
      { id: 'banana', name: 'Pisang', icon: '🍌', isOdd: false },
      { id: 'strawberry', name: 'Stroberi', icon: '🍓', isOdd: false },
      { id: 'car', name: 'Mobil', icon: '🚗', isOdd: true, reason: 'Mobil adalah kendaraan, yang lain buah-buahan!' }
    ],
    hint: 'Manakah benda yang bukan buah-buahan?'
  },
  {
    id: 2,
    categoryName: 'Hewan Laut',
    items: [
      { id: 'fish', name: 'Ikan', icon: '🐟', isOdd: false },
      { id: 'octopus', name: 'Gurita', icon: '🐙', isOdd: false },
      { id: 'crab', name: 'Kepiting', icon: '🦀', isOdd: false },
      { id: 'eagle', name: 'Burung', icon: '🦅', isOdd: true, reason: 'Burung terbang di langit, yang lain hidup di laut!' }
    ],
    hint: 'Manakah hewan yang tidak berenang di laut?'
  },
  {
    id: 3,
    categoryName: 'Benda Panas',
    items: [
      { id: 'fire', name: 'Api', icon: '🔥', isOdd: false },
      { id: 'sun', name: 'Matahari', icon: '☀️', isOdd: false },
      { id: 'candle', name: 'Lilin', icon: '🕯️', isOdd: false },
      { id: 'icecream', name: 'Es Krim', icon: '🍦', isOdd: true, reason: 'Es krim itu dingin, sedangkan yang lain panas!' }
    ],
    hint: 'Manakah benda yang dingin membeku?'
  },
  {
    id: 4,
    categoryName: 'Alat Belajar',
    items: [
      { id: 'pencil', name: 'Pensil', icon: '✏️', isOdd: false },
      { id: 'book', name: 'Buku', icon: '📚', isOdd: false },
      { id: 'ruler', name: 'Penggaris', icon: '📏', isOdd: false },
      { id: 'basketball', name: 'Bola', icon: '🏀', isOdd: true, reason: 'Bola untuk olahraga, yang lain alat untuk belajar!' }
    ],
    hint: 'Manakah yang bukan peralatan belajar sekolah?'
  },
  {
    id: 5,
    categoryName: 'Hewan Peliharaan',
    items: [
      { id: 'cat', name: 'Kucing', icon: '🐱', isOdd: false },
      { id: 'dog', name: 'Anjing', icon: '🐶', isOdd: false },
      { id: 'rabbit', name: 'Kelinci', icon: '🐰', isOdd: false },
      { id: 'lion', name: 'Singa', icon: '🦁', isOdd: true, reason: 'Singa hewan buas liar, yang lain hewan peliharaan jinak!' }
    ],
    hint: 'Manakah hewan liar yang hidup di rimba hutan?'
  },
  {
    id: 6,
    categoryName: 'Pakaian & Busana',
    items: [
      { id: 'shirt', name: 'Baju', icon: '👕', isOdd: false },
      { id: 'pants', name: 'Celana', icon: '👖', isOdd: false },
      { id: 'cap', name: 'Topi', icon: '🧢', isOdd: false },
      { id: 'spoon', name: 'Sendok', icon: '🥄', isOdd: true, reason: 'Sendok adalah alat makan, yang lain pakaian!' }
    ],
    hint: 'Manakah benda yang bukan pakaian untuk dipakai?'
  },
  {
    id: 7,
    categoryName: 'Sayuran Sehat',
    items: [
      { id: 'carrot', name: 'Wortel', icon: '🥕', isOdd: false },
      { id: 'broccoli', name: 'Brokoli', icon: '🥦', isOdd: false },
      { id: 'corn', name: 'Jagung', icon: '🌽', isOdd: false },
      { id: 'plane', name: 'Pesawat', icon: '✈️', isOdd: true, reason: 'Pesawat kendaraan terbang di langit, yang lain sayuran!' }
    ],
    hint: 'Manakah benda yang bukan sayuran sehat?'
  },
  {
    id: 8,
    categoryName: 'Benda di Langit',
    items: [
      { id: 'moon', name: 'Bulan', icon: '🌙', isOdd: false },
      { id: 'star', name: 'Bintang', icon: '⭐', isOdd: false },
      { id: 'cloud', name: 'Awan', icon: '☁️', isOdd: false },
      { id: 'shoe', name: 'Sepatu', icon: '👟', isOdd: true, reason: 'Sepatu alas kaki untuk berjalan, yang lain ada di langit!' }
    ],
    hint: 'Manakah yang tidak ada di langit tinggi?'
  },
  {
    id: 9,
    categoryName: 'Alat Musik',
    items: [
      { id: 'guitar', name: 'Gitar', icon: '🎸', isOdd: false },
      { id: 'trumpet', name: 'Terompet', icon: '🎺', isOdd: false },
      { id: 'drum', name: 'Drum', icon: '🥁', isOdd: false },
      { id: 'glass', name: 'Gelas', icon: '🥛', isOdd: true, reason: 'Gelas tempat untuk minum air, yang lain alat musik bernyanyi!' }
    ],
    hint: 'Manakah yang bukan alat musik berbunyi merdu?'
  },
  {
    id: 10,
    categoryName: 'Hewan Bisa Terbang',
    items: [
      { id: 'bird', name: 'Burung', icon: '🐦', isOdd: false },
      { id: 'butterfly', name: 'Kupu-kupu', icon: '🦋', isOdd: false },
      { id: 'bee', name: 'Lebah', icon: '🐝', isOdd: false },
      { id: 'turtle', name: 'Kura-kura', icon: '🐢', isOdd: true, reason: 'Kura-kura berjalan lambat di tanah, yang lain punya sayap dan terbang!' }
    ],
    hint: 'Manakah hewan yang tidak bisa terbang di udara?'
  }
];

export const SEQUENCE_DATA = [
  {
    id: 1,
    title: 'Kelahiran Bayi Dino',
    step1: { icon: '🥚', text: '1. Telur Utuh' },
    step2: { icon: '🐣', text: '2. Telur Retak' },
    targetPrompt: 'Setelah telur retak, apa yang keluar?',
    correctChoice: { id: 'dino', icon: '🦖', text: 'Bayi Dino Menetas!' },
    distractors: [
      { id: 'stone', icon: '🪨', text: 'Batu Sungai' },
      { id: 'glass', icon: '🥛', text: 'Gelas Air' }
    ],
    explanation: 'Pintar sekali! Setelah telur retak, bayi dinosaurus menetas keluar!'
  },
  {
    id: 2,
    title: 'Menanam Bunga Cantik',
    step1: { icon: '🌱', text: '1. Biji di Pot' },
    step2: { icon: '💧', text: '2. Disiram Air' },
    targetPrompt: 'Setelah disiram air, apa yang tumbuh?',
    correctChoice: { id: 'flower', icon: '🌸', text: 'Bunga Mekar Indah!' },
    distractors: [
      { id: 'spoon', icon: '🥄', text: 'Sendok Makan' },
      { id: 'truck', icon: '🚚', text: 'Mobil Truk' }
    ],
    explanation: 'Hebat! Setelah biji disiram air, bunga cantik mekar berseri!'
  },
  {
    id: 3,
    title: 'Es Krim Terkena Panas',
    step1: { icon: '🍦', text: '1. Es Krim Dingin' },
    step2: { icon: '☀️', text: '2. Terik Matahari' },
    targetPrompt: 'Kena panas matahari, apa yang terjadi pada es krim?',
    correctChoice: { id: 'melt', icon: '🫠', text: 'Es Krim Meleleh!' },
    distractors: [
      { id: 'palm', icon: '🌴', text: 'Pohon Kelapa' },
      { id: 'star', icon: '⭐', text: 'Bintang Emas' }
    ],
    explanation: 'Tepat sekali! Karena panas terik matahari, es krim jadi meleleh!'
  },
  {
    id: 4,
    title: 'Mencuci Baju Berlumpur',
    step1: { icon: '🧦', text: '1. Baju Kotor' },
    step2: { icon: '🧼', text: '2. Cuci di Mesin' },
    targetPrompt: 'Setelah dicuci sabun, bagaimana bajunya?',
    correctChoice: { id: 'clean', icon: '✨', text: 'Baju Bersih & Wangi!' },
    distractors: [
      { id: 'fish', icon: '🐟', text: 'Ikan Berenang' },
      { id: 'plane', icon: '✈️', text: 'Pesawat Terbang' }
    ],
    explanation: 'Luar biasa! Setelah dicuci bersih, baju jadi harum dan berkilau!'
  },
  {
    id: 5,
    title: 'Metamorfosis Kupu-Kupu',
    step1: { icon: '🐛', text: '1. Ulat Makan Daun' },
    step2: { icon: '🪵', text: '2. Jadi Kepompong' },
    targetPrompt: 'Setelah tidur di kepompong, ulat berubah jadi apa?',
    correctChoice: { id: 'butterfly', icon: '🦋', text: 'Kupu-Kupu Indah!' },
    distractors: [
      { id: 'skate', icon: '🛼', text: 'Sepatu Roda' },
      { id: 'moon', icon: '🌙', text: 'Bulan Sabit' }
    ],
    explanation: 'Juara! Dari dalam kepompong, keluarlah kupu-kupu yang sangat indah!'
  },
  {
    id: 6,
    title: 'Menggosok Gigi Bersih',
    step1: { icon: '🪥', text: '1. Sikat Berbusa' },
    step2: { icon: '🚰', text: '2. Kumur Air Bersih' },
    targetPrompt: 'Setelah sikat gigi dan kumur, bagaimana giginya?',
    correctChoice: { id: 'clean_teeth', icon: '✨', text: 'Gigi Bersih & Sehat!' },
    distractors: [
      { id: 'football', icon: '⚽', text: 'Bola Tendang' },
      { id: 'tree', icon: '🌳', text: 'Pohon Rimbun' }
    ],
    explanation: 'Hebat! Setelah sikat gigi dan kumur, gigimu jadi putih bersih dan sehat!'
  },
  {
    id: 7,
    title: 'Membuat Roti Hangat',
    step1: { icon: '🌾', text: '1. Gandum & Tepung' },
    step2: { icon: '🍞', text: '2. Panggang di Oven' },
    targetPrompt: 'Setelah dipanggang matang, jadi makanan apa?',
    correctChoice: { id: 'sandwich', icon: '🥪', text: 'Roti Lezat Siap Makan!' },
    distractors: [
      { id: 'bike', icon: '🚲', text: 'Sepeda Onthel' },
      { id: 'rain', icon: '🌧️', text: 'Hujan Deras' }
    ],
    explanation: 'Pintar! Dari tepung dan dipanggang di oven, terciptalah roti yang harum dan lezat!'
  },
  {
    id: 8,
    title: 'Hujan dan Pelangi Indah',
    step1: { icon: '☁️', text: '1. Awan Mendung' },
    step2: { icon: '🌧️', text: '2. Turun Hujan' },
    targetPrompt: 'Setelah hujan reda dan matahari bersinar, muncul apa?',
    correctChoice: { id: 'rainbow', icon: '🌈', text: 'Muncul Pelangi Indah!' },
    distractors: [
      { id: 'door', icon: '🚪', text: 'Pintu Kayu' },
      { id: 'hammer', icon: '🔨', text: 'Palu Besi' }
    ],
    explanation: 'Tepat sekali! Setelah hujan reda dan disinari cahaya matahari, muncul pelangi berwarna-warni!'
  },
  {
    id: 9,
    title: 'Menyerut Pensil Tumpul',
    step1: { icon: '✏️', text: '1. Pensil Tumpul' },
    step2: { icon: '⚙️', text: '2. Putar di Serutan' },
    targetPrompt: 'Setelah diserut, bagaimana pensilnya?',
    correctChoice: { id: 'sharp_pencil', icon: '📝', text: 'Pensil Tajam Siap Tulis!' },
    distractors: [
      { id: 'apple', icon: '🍎', text: 'Apel Manis' },
      { id: 'boat', icon: '⛵', text: 'Perahu Layar' }
    ],
    explanation: 'Luar biasa! Pensil yang diserut jadi runcing tajam dan siap untuk belajar menulis!'
  },
  {
    id: 10,
    title: 'Pesta Ulang Tahun Ceria',
    step1: { icon: '🎂', text: '1. Nyalakan Lilin Kue' },
    step2: { icon: '🕯️', text: '2. Tiup Lilin Bersama' },
    targetPrompt: 'Setelah lilin ditiup, apa yang dilakukan?',
    correctChoice: { id: 'presents', icon: '🎁', text: 'Buka Kado & Bergembira!' },
    distractors: [
      { id: 'rock', icon: '🪨', text: 'Batu Sungai' },
      { id: 'truck', icon: '🚂', text: 'Kereta Api' }
    ],
    explanation: 'Hore juara! Lilin ditiup, semua tepuk tangan gembira dan membuka hadiah ulang tahun!'
  }
];

export const PAIRS_DATA = [
  {
    id: 1,
    target: { id: 'key', name: 'KUNCI', icon: '🔑' },
    prompt: 'Benda apakah pasangan dari KUNCI?',
    correctChoice: { id: 'lock', name: 'Gembok', icon: '🔒' },
    distractors: [
      { id: 'shoe', name: 'Sepatu', icon: '👟' },
      { id: 'book', name: 'Buku', icon: '📚' }
    ],
    reason: 'Kunci berpasangan dengan gembok untuk membuka pintu!'
  },
  {
    id: 2,
    target: { id: 'toothbrush', name: 'SIKAT GIGI', icon: '🪥' },
    prompt: 'Benda apakah pasangan dari SIKAT GIGI?',
    correctChoice: { id: 'toothpaste', name: 'Pasta Gigi', icon: '🧴' },
    distractors: [
      { id: 'cap', name: 'Topi', icon: '🧢' },
      { id: 'spoon', name: 'Sendok', icon: '🥄' }
    ],
    reason: 'Sikat gigi membutuhkan pasta gigi agar gigi bersih bersinar!'
  },
  {
    id: 3,
    target: { id: 'bird', name: 'BURUNG', icon: '🐦' },
    prompt: 'Di manakah sarang tempat tinggal BURUNG?',
    correctChoice: { id: 'nest', name: 'Sarang', icon: '🪺' },
    distractors: [
      { id: 'car', name: 'Mobil', icon: '🚗' },
      { id: 'chair', name: 'Kursi', icon: '🪑' }
    ],
    reason: 'Burung terbang pulang ke sarangnya yang hangat!'
  },
  {
    id: 4,
    target: { id: 'rain', name: 'HUJAN', icon: '🌧️' },
    prompt: 'Saat HUJAN turun, kita memakai apa?',
    correctChoice: { id: 'umbrella', name: 'Payung', icon: '☂️' },
    distractors: [
      { id: 'ball', name: 'Bola', icon: '⚽' },
      { id: 'pillow', name: 'Bantal', icon: '🛋️' }
    ],
    reason: 'Saat hujan turun, kita memakai payung agar tetap kering!'
  },
  {
    id: 5,
    target: { id: 'socks', name: 'KAUS KAKI', icon: '🧦' },
    prompt: 'KAUS KAKI dipakai berpasangan dengan apa?',
    correctChoice: { id: 'shoes', name: 'Sepatu', icon: '👟' },
    distractors: [
      { id: 'cup', name: 'Gelas', icon: '🥛' },
      { id: 'broom', name: 'Sapu', icon: '🧹' }
    ],
    reason: 'Kaus kaki berpasangan dengan sepatu agar kaki nyaman!'
  },
  {
    id: 6,
    target: { id: 'bee', name: 'LEBAH', icon: '🐝' },
    prompt: 'LEBAH suka hinggap mencari nektar di mana?',
    correctChoice: { id: 'flower', name: 'Bunga', icon: '🌸' },
    distractors: [
      { id: 'pencil', name: 'Pensil', icon: '✏️' },
      { id: 'pan', name: 'Wajan', icon: '🍳' }
    ],
    reason: 'Lebah hinggap di bunga manis untuk menghisap madu!'
  },
  {
    id: 7,
    target: { id: 'pencil', name: 'PENSIL', icon: '✏️' },
    prompt: 'PENSIL digunakan untuk menulis di mana?',
    correctChoice: { id: 'notebook', name: 'Buku Tulis', icon: '📖' },
    distractors: [
      { id: 'shirt', name: 'Baju', icon: '👕' },
      { id: 'tire', name: 'Ban Truk', icon: '🛞' }
    ],
    reason: 'Pensil digunakan untuk menulis dan menggambar di buku tulis!'
  },
  {
    id: 8,
    target: { id: 'baby', name: 'BAYI', icon: '👶' },
    prompt: 'BAYI meminum susu lezat menggunakan apa?',
    correctChoice: { id: 'baby_bottle', name: 'Botol Susu', icon: '🍼' },
    distractors: [
      { id: 'hammer', name: 'Palu', icon: '🔨' },
      { id: 'scissors', name: 'Gunting', icon: '✂️' }
    ],
    reason: 'Bayi meminum susu hangat dari botol susunya!'
  },
  {
    id: 9,
    target: { id: 'spoon', name: 'SENDOK', icon: '🥄' },
    prompt: 'SENDOK makan selalu berpasangan dengan apa?',
    correctChoice: { id: 'fork', name: 'Garpu', icon: '🍴' },
    distractors: [
      { id: 'key', name: 'Kunci', icon: '🔑' },
      { id: 'guitar', name: 'Gitar', icon: '🎸' }
    ],
    reason: 'Sendok berpasangan dengan garpu saat kita makan enak!'
  },
  {
    id: 10,
    target: { id: 'fish', name: 'IKAN', icon: '🐟' },
    prompt: 'IKAN berenang lincah di dalam apa?',
    correctChoice: { id: 'water', name: 'Air Kolam', icon: '🌊' },
    distractors: [
      { id: 'bed', name: 'Kasur', icon: '🛏️' },
      { id: 'tv', name: 'Televisi', icon: '📺' }
    ],
    reason: 'Ikan berenang riang gembira di dalam air!'
  }
];

export const PHONICS_DATA = [
  { level: 1, letter: 'B', soundHint: 'Be! B untuk Bebek', choices: ['A', 'B', 'C'] },
  { level: 2, letter: 'M', soundHint: 'Em! M untuk Mobil', choices: ['N', 'M', 'W'] },
  { level: 3, letter: 'S', soundHint: 'Es! S untuk Singa', choices: ['S', 'C', 'Z'] },
  { level: 4, letter: 'A', soundHint: 'A! A untuk Apel', choices: ['O', 'A', 'E'] },
  { level: 5, letter: 'K', soundHint: 'Ka! K untuk Kucing', choices: ['H', 'K', 'L'] },
  { level: 6, letter: 'D', soundHint: 'De! D untuk Dinosaurus', choices: ['B', 'P', 'D'] },
  { level: 7, letter: 'P', soundHint: 'Pe! P untuk Pesawat', choices: ['P', 'Q', 'R'] },
  { level: 8, letter: 'I', soundHint: 'I! I untuk Ikan', choices: ['T', 'I', 'L'] },
  { level: 9, letter: 'R', soundHint: 'Er! R untuk Roket', choices: ['R', 'P', 'B'] },
  { level: 10, letter: 'Z', soundHint: 'Zet! Z untuk Zebra', choices: ['N', 'S', 'Z'] }
];

export const WORDS_DATA = [
  { level: 1, word: 'APEL', image: 'a.svg', helper: 'Buah manis warna merah', choices: ['APEL', 'AYAM', 'AWAN'] },
  { level: 2, word: 'BEBEK', image: 'b.svg', helper: 'Hewan kwek-kwek berenang', choices: ['BEBEK', 'BUKU', 'BALON'] },
  { level: 3, word: 'CERI', image: 'c.svg', helper: 'Buah kecil merah kembar', choices: ['CERI', 'CANGKIR', 'CELANA'] },
  { level: 4, word: 'DINO', image: 'd.svg', helper: 'Sahabat purba kita', choices: ['DINO', 'DOMBA', 'DURIAN'] },
  { level: 5, word: 'GAJAH', image: 'g.svg', helper: 'Hewan besar belalai panjang', choices: ['GAJAH', 'GITAR', 'GELAS'] },
  { level: 6, word: 'IKAN', image: 'i.svg', helper: 'Berenang lincah di air', choices: ['IKAN', 'ITIK', 'INTAN'] },
  { level: 7, word: 'KUCING', image: 'k.svg', helper: 'Hewan berbulu meong', choices: ['KUCING', 'KUDA', 'KERA'] },
  { level: 8, word: 'MOBIL', image: 'm.svg', helper: 'Kendaraan roda empat', choices: ['MOBIL', 'MATA', 'MEJA'] },
  { level: 9, word: 'PESAWAT', image: 'p.svg', helper: 'Terbang tinggi di awan', choices: ['PESAWAT', 'PINTU', 'POHON'] },
  { level: 10, word: 'SINGA', image: 's.svg', helper: 'Raja rimba bersuara aum', choices: ['SINGA', 'SAPI', 'SENDOK'] }
];
