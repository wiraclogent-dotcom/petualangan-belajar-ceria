/**
 * Data Lab Logika Cambridge: Detektif Benda, Urutan Cerita, Detektif Pasangan, Phonics, dan Sight Words (20 Tingkat)
 */

export const ODD_DATA = [
  {
    id: 1,
    categoryName: 'Buah-buahan',
    items: [
      { id: 'apple', name: 'Apel', icon: '🍎', isOdd: false },
      { id: 'banana', name: 'Pisang', icon: '🍌', isOdd: false },
      { id: 'strawberry', name: 'Stroberi', icon: '🍓', isOdd: false },
      { id: 'car', name: 'Mobil', icon: '🚗', isOdd: true, reason: 'Mobil adalah kendaraan di jalan, yang lain buah-buahan manis!' }
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
      { id: 'eagle', name: 'Burung', icon: '🦅', isOdd: true, reason: 'Burung terbang di angkasa, yang lain hidup berenang di laut!' }
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
      { id: 'icecream', name: 'Es Krim', icon: '🍦', isOdd: true, reason: 'Es krim itu dingin beku, sedangkan yang lain panas membara!' }
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
      { id: 'basketball', name: 'Bola', icon: '🏀', isOdd: true, reason: 'Bola untuk bermain olahraga, yang lain alat untuk belajar!' }
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
      { id: 'lion', name: 'Singa', icon: '🦁', isOdd: true, reason: 'Singa hewan liar di rimba, yang lain hewan peliharaan jinak!' }
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
      { id: 'spoon', name: 'Sendok', icon: '🥄', isOdd: true, reason: 'Sendok adalah alat makan, yang lain pakaian untuk dipakai!' }
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
      { id: 'plane', name: 'Pesawat', icon: '✈️', isOdd: true, reason: 'Pesawat kendaraan terbang di langit, yang lain sayuran bergizi!' }
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
      { id: 'shoe', name: 'Sepatu', icon: '👟', isOdd: true, reason: 'Sepatu alas kaki untuk berjalan, yang lain ada di langit tinggi!' }
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
  },
  {
    id: 11,
    categoryName: 'Kendaraan Darat',
    items: [
      { id: 'bus', name: 'Bus', icon: '🚌', isOdd: false },
      { id: 'motor', name: 'Sepeda Motor', icon: '🏍️', isOdd: false },
      { id: 'car2', name: 'Mobil', icon: '🚗', isOdd: false },
      { id: 'ship', name: 'Kapal Laut', icon: '🚢', isOdd: true, reason: 'Kapal berlayar di laut, yang lain kendaraan di jalan darat!' }
    ],
    hint: 'Manakah kendaraan yang tidak melaju di jalan darat?'
  },
  {
    id: 12,
    categoryName: 'Peralatan Mandi',
    items: [
      { id: 'soap', name: 'Sabun', icon: '🧼', isOdd: false },
      { id: 'shampoo', name: 'Sampo', icon: '🧴', isOdd: false },
      { id: 'towel', name: 'Handuk', icon: '🛁', isOdd: false },
      { id: 'notebook2', name: 'Buku', icon: '📚', isOdd: true, reason: 'Buku untuk dibaca dan belajar, yang lain peralatan mandi agar harum!' }
    ],
    hint: 'Manakah benda yang bukan peralatan mandi?'
  },
  {
    id: 13,
    categoryName: 'Makanan Manis',
    items: [
      { id: 'donut', name: 'Donat', icon: '🍩', isOdd: false },
      { id: 'cake', name: 'Kue', icon: '🍰', isOdd: false },
      { id: 'choco', name: 'Cokelat', icon: '🍫', isOdd: false },
      { id: 'chili', name: 'Cabai', icon: '🌶️', isOdd: true, reason: 'Cabai rasanya pedas membakar, yang lain makanan manis lezat!' }
    ],
    hint: 'Manakah yang rasanya pedas dan bukan makanan manis?'
  },
  {
    id: 14,
    categoryName: 'Hewan Berkaki Empat',
    items: [
      { id: 'cow', name: 'Sapi', icon: '🐄', isOdd: false },
      { id: 'horse', name: 'Kuda', icon: '🐎', isOdd: false },
      { id: 'goat', name: 'Kambing', icon: '🐐', isOdd: false },
      { id: 'chicken', name: 'Ayam', icon: '🐔', isOdd: true, reason: 'Ayam punya dua kaki dan sayap, yang lain hewan berkaki empat!' }
    ],
    hint: 'Manakah hewan yang kakinya hanya ada dua?'
  },
  {
    id: 15,
    categoryName: 'Alat Kebersihan',
    items: [
      { id: 'broom', name: 'Sapu', icon: '🧹', isOdd: false },
      { id: 'bucket', name: 'Ember', icon: '🪣', isOdd: false },
      { id: 'trash', name: 'Tempat Sampah', icon: '🗑️', isOdd: false },
      { id: 'plate', name: 'Piring', icon: '🍽️', isOdd: true, reason: 'Piring untuk wadah makan lezat, yang lain alat pembersih rumah!' }
    ],
    hint: 'Manakah benda yang bukan alat untuk membersihkan rumah?'
  },
  {
    id: 16,
    categoryName: 'Barang Elektronik',
    items: [
      { id: 'tv_elec', name: 'Televisi', icon: '📺', isOdd: false },
      { id: 'fridge', name: 'Kulkas', icon: '🧊', isOdd: false },
      { id: 'lamp', name: 'Lampu', icon: '💡', isOdd: false },
      { id: 'pillow_odd', name: 'Bantal', icon: '🛋️', isOdd: true, reason: 'Bantal empuk untuk tidur, yang lain barang elektronik berdaya listrik!' }
    ],
    hint: 'Manakah benda yang tidak memakai tenaga listrik?'
  },
  {
    id: 17,
    categoryName: 'Hewan Buas Rimba',
    items: [
      { id: 'tiger', name: 'Harimau', icon: '🐅', isOdd: false },
      { id: 'croc', name: 'Buaya', icon: '🐊', isOdd: false },
      { id: 'bear', name: 'Beruang', icon: '🐻', isOdd: false },
      { id: 'rabbit2', name: 'Kelinci', icon: '🐰', isOdd: true, reason: 'Kelinci lucu pemakan wortel, yang lain hewan buas pemangsa!' }
    ],
    hint: 'Manakah hewan jinak kesayangan yang tidak buas?'
  },
  {
    id: 18,
    categoryName: 'Peralatan Makan',
    items: [
      { id: 'spoon2', name: 'Sendok', icon: '🥄', isOdd: false },
      { id: 'fork2', name: 'Garpu', icon: '🍴', isOdd: false },
      { id: 'bowl', name: 'Mangkuk', icon: '🥣', isOdd: false },
      { id: 'hat', name: 'Topi', icon: '🎩', isOdd: true, reason: 'Topi aksesoris di kepala, yang lain peralatan makan di meja!' }
    ],
    hint: 'Manakah benda yang bukan alat untuk makan?'
  },
  {
    id: 19,
    categoryName: 'Serangga Mungil',
    items: [
      { id: 'ant_odd', name: 'Semut', icon: '🐜', isOdd: false },
      { id: 'fly', name: 'Lalat', icon: '🪰', isOdd: false },
      { id: 'mosquito', name: 'Nyamuk', icon: '🦟', isOdd: false },
      { id: 'elephant_odd', name: 'Gajah', icon: '🐘', isOdd: true, reason: 'Gajah hewan raksasa berbelalai, yang lain serangga bertubuh mungil!' }
    ],
    hint: 'Manakah hewan berbadan besar yang bukan serangga?'
  },
  {
    id: 20,
    categoryName: 'Gejala Alam di Langit',
    items: [
      { id: 'rain_odd', name: 'Hujan', icon: '🌧️', isOdd: false },
      { id: 'lightning', name: 'Petir', icon: '⚡', isOdd: false },
      { id: 'rainbow_odd', name: 'Pelangi', icon: '🌈', isOdd: false },
      { id: 'robot', name: 'Robot', icon: '🤖', isOdd: true, reason: 'Robot mesin buatan manusia, yang lain gejala alam di langit luas!' }
    ],
    hint: 'Manakah yang bukan peristiwa alam di langit?'
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
  },
  {
    id: 11,
    title: 'Memasak Nasi Pulen',
    step1: { icon: '🌾', text: '1. Cuci Beras Bersih' },
    step2: { icon: '🍚', text: '2. Masak di Panci' },
    targetPrompt: 'Setelah beras matang dimasak, jadi apa?',
    correctChoice: { id: 'cooked_rice', icon: '🍛', text: 'Nasi Hangat Lezat Siap Makan!' },
    distractors: [
      { id: 'kite', icon: '🪁', text: 'Layang-layang' },
      { id: 'shoe_seq', icon: '👞', text: 'Sepatu Kulit' }
    ],
    explanation: 'Pintar sekali! Beras yang dimasak matang menjadi nasi pulen yang lezat untuk disantap!'
  },
  {
    id: 12,
    title: 'Mengirim Surat Kasih Sayang',
    step1: { icon: '✍️', text: '1. Tulis Surat Manis' },
    step2: { icon: '✉️', text: '2. Masukkan Amplop & Pos' },
    targetPrompt: 'Setelah dikirim pak pos, surat tiba di mana?',
    correctChoice: { id: 'delivered_letter', icon: '🏠', text: 'Sampai di Rumah Nenek!' },
    distractors: [
      { id: 'plane_seq', icon: '🚀', text: 'Roket Luar Angkasa' },
      { id: 'football_seq', icon: '⚽', text: 'Bola Sepak' }
    ],
    explanation: 'Hebat! Surat yang dikirim pak pos akhirnya tiba dengan selamat di rumah nenek tersayang!'
  },
  {
    id: 13,
    title: 'Membangun Menara Balok',
    step1: { icon: '🧱', text: '1. Kumpulkan Balok Kayu' },
    step2: { icon: '🏗️', text: '2. Susun Tinggi ke Atas' },
    targetPrompt: 'Setelah balok disusun rapi ke atas, jadi apa?',
    correctChoice: { id: 'castle_seq', icon: '🏰', text: 'Istana Balok Megah Berdiri!' },
    distractors: [
      { id: 'fish_seq', icon: '🐟', text: 'Ikan Koi' },
      { id: 'carrot_seq', icon: '🥕', text: 'Wortel Jingga' }
    ],
    explanation: 'Juara! Balok-balok kayu yang disusun tinggi kini menjadi istana mainan yang sangat megah!'
  },
  {
    id: 14,
    title: 'Mandi Pagi Segar',
    step1: { icon: '🚿', text: '1. Basahi Tubuh dengan Air' },
    step2: { icon: '🧼', text: '2. Gosok Sabun Harum' },
    targetPrompt: 'Setelah dibilas bersih, bagaimana tubuh kita?',
    correctChoice: { id: 'fresh_body', icon: '🌟', text: 'Badan Segar, Harum & Ceria!' },
    distractors: [
      { id: 'hammer_seq', icon: '🔨', text: 'Palu Besi' },
      { id: 'car_seq', icon: '🚗', text: 'Mobil Sedan' }
    ],
    explanation: 'Tepat sekali! Setelah mandi dan digosok sabun, tubuh kita menjadi harum, segar, dan sehat!'
  },
  {
    id: 15,
    title: 'Memakai Sepatu Rapi',
    step1: { icon: '🧦', text: '1. Pasang Kaus Kaki' },
    step2: { icon: '👟', text: '2. Masukkan Kaki ke Sepatu' },
    targetPrompt: 'Setelah kaki masuk, apa yang dilakukan pada tali sepatu?',
    correctChoice: { id: 'tie_shoes', icon: '🎀', text: 'Ikat Tali Sepatu Rapi Siap Jalan!' },
    distractors: [
      { id: 'moon_seq', icon: '🌙', text: 'Bulan Sabit' },
      { id: 'drum_seq', icon: '🥁', text: 'Alat Musik Drum' }
    ],
    explanation: 'Luar biasa! Setelah tali sepatu diikat rapi, kamu siap berangkat sekolah dengan aman!'
  },
  {
    id: 16,
    title: 'Memetik Buah Apel di Kebun',
    step1: { icon: '🌳', text: '1. Pohon Apel Berbuah' },
    step2: { icon: '🧺', text: '2. Petik ke Keranjang' },
    targetPrompt: 'Setelah apel dicuci bersih, apa yang kita lakukan?',
    correctChoice: { id: 'eat_apple', icon: '🍎', text: 'Nikmati Apel Segar & Manis!' },
    distractors: [
      { id: 'guitar_seq', icon: '🎸', text: 'Gitar Melodi' },
      { id: 'boat_seq', icon: '⛵', text: 'Perahu Layar' }
    ],
    explanation: 'Pintar! Apel merah yang dipetik dan dicuci bersih langsung bisa dinikmati dengan lezat!'
  },
  {
    id: 17,
    title: 'Balon Udara Terbang Tinggi',
    step1: { icon: '🎈', text: '1. Balon Udara di Lapangan' },
    step2: { icon: '🔥', text: '2. Nyalakan Api Pemanas' },
    targetPrompt: 'Setelah udara panas mengisi balon, apa yang terjadi?',
    correctChoice: { id: 'balloon_fly', icon: '☁️', text: 'Balon Terbang Tinggi ke Awan!' },
    distractors: [
      { id: 'anchor', icon: '⚓', text: 'Jangkar Kapal' },
      { id: 'cactus', icon: '🌵', text: 'Kaktus Berduri' }
    ],
    explanation: 'Hebat sekali! Udara panas membuat balon terangkat dan terbang menjelajah langit biru!'
  },
  {
    id: 18,
    title: 'Merapikan Tempat Tidur',
    step1: { icon: '⏰', text: '1. Bangun Pagi Segar' },
    step2: { icon: '🛏️', text: '2. Lipat Selimut Rapi' },
    targetPrompt: 'Setelah bantal ditata rapi, bagaimana kamarnya?',
    correctChoice: { id: 'clean_room', icon: '✨', text: 'Kamar Bersih & Nyaman Dilihat!' },
    distractors: [
      { id: 'bicycle', icon: '🚲', text: 'Sepeda Gunung' },
      { id: 'icecream_seq', icon: '🍦', text: 'Es Krim Vanila' }
    ],
    explanation: 'Juara! Anak pintar selalu merapikan tempat tidurnya sendiri agar kamar selalu bersih dan rapi!'
  },
  {
    id: 19,
    title: 'Membuat Segelas Jus Jeruk',
    step1: { icon: '🍊', text: '1. Kupas Jeruk Segar' },
    step2: { icon: '🥤', text: '2. Peras Air Jeruk Manis' },
    targetPrompt: 'Setelah air jeruk diperas ke dalam gelas, jadi apa?',
    correctChoice: { id: 'orange_juice', icon: '🍹', text: 'Segelas Jus Jeruk Manis & Segar!' },
    distractors: [
      { id: 'book_seq', icon: '📖', text: 'Buku Dongeng' },
      { id: 'umbrella_seq', icon: '☂️', text: 'Payung Hujan' }
    ],
    explanation: 'Tepat sekali! Air jeruk manis yang diperas menjadi minuman jus buah yang kaya vitamin C!'
  },
  {
    id: 20,
    title: 'Matahari Senja Terbenam',
    step1: { icon: '☀️', text: '1. Siang Hari yang Terik' },
    step2: { icon: '🌇', text: '2. Senja Lembayung Jingga' },
    targetPrompt: 'Setelah matahari tenggelam sempurna, waktu berganti jadi apa?',
    correctChoice: { id: 'night_stars', icon: '🌃', text: 'Malam Berbintang & Waktu Tidur!' },
    distractors: [
      { id: 'swimming', icon: '🏊', text: 'Berenang di Danau' },
      { id: 'lawnmower', icon: '🚜', text: 'Traktor Sawah' }
    ],
    explanation: 'Luar biasa! Setelah senja berganti malam, bintang-bintang bersinar dan saatnya beristirahat tidur nyenyak!'
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
  },
  {
    id: 11,
    target: { id: 'lamp', name: 'LAMPU MEJA', icon: '💡' },
    prompt: 'LAMPU MEJA dinyalakan dicolok ke mana?',
    correctChoice: { id: 'plug', name: 'Stopkontak', icon: '🔌' },
    distractors: [
      { id: 'apple_pair', name: 'Apel', icon: '🍎' },
      { id: 'hat_pair', name: 'Topi', icon: '🧢' }
    ],
    reason: 'Lampu meja dinyalakan dengan menghubungkan colokan ke stopkontak!'
  },
  {
    id: 12,
    target: { id: 'bed', name: 'KASUR TIDUR', icon: '🛏️' },
    prompt: 'KASUR TIDUR selalu berpasangan dengan apa?',
    correctChoice: { id: 'pillow_pair', name: 'Bantal Empuk', icon: '🛋️' },
    distractors: [
      { id: 'drum_pair', name: 'Drum', icon: '🥁' },
      { id: 'fork_pair', name: 'Garpu', icon: '🍴' }
    ],
    reason: 'Kasur empuk berpasangan dengan bantal agar tidur nyaman!'
  },
  {
    id: 13,
    target: { id: 'envelope', name: 'AMPLOP SURAT', icon: '✉️' },
    prompt: 'AMPLOP SURAT ditempelkan apa sebelum dikirim?',
    correctChoice: { id: 'stamp', name: 'Prangko', icon: '📮' },
    distractors: [
      { id: 'car_pair', name: 'Mobil', icon: '🚗' },
      { id: 'spoon_pair', name: 'Sendok', icon: '🥄' }
    ],
    reason: 'Amplop surat ditempeli prangko agar bisa diantar oleh pak pos!'
  },
  {
    id: 14,
    target: { id: 'hammer_pair', name: 'PALU BESI', icon: '🔨' },
    prompt: 'PALU BESI digunakan untuk memukul apa?',
    correctChoice: { id: 'nail', name: 'Paku', icon: '🔩' },
    distractors: [
      { id: 'glass_pair', name: 'Gelas', icon: '🥛' },
      { id: 'flower_pair', name: 'Bunga', icon: '🌸' }
    ],
    reason: 'Palu besi digunakan untuk memukul paku kayu dengan kuat!'
  },
  {
    id: 15,
    target: { id: 'book_pair', name: 'BUKU BACAAN', icon: '📚' },
    prompt: 'BUKU BACAAN disimpan dengan rapi di mana?',
    correctChoice: { id: 'bookshelf', name: 'Rak Buku', icon: '🪵' },
    distractors: [
      { id: 'fish_pair', name: 'Ikan', icon: '🐟' },
      { id: 'shoe_pair', name: 'Sepatu', icon: '👟' }
    ],
    reason: 'Buku-buku bacaan ditata rapi di atas rak buku perpustakaan!'
  },
  {
    id: 16,
    target: { id: 'pants_pair', name: 'CELANA PANJANG', icon: '👖' },
    prompt: 'CELANA PANJANG dipasangkan apa di pinggang?',
    correctChoice: { id: 'belt', name: 'Ikat Pinggang', icon: '🎗️' },
    distractors: [
      { id: 'cup_pair', name: 'Cangkir', icon: '☕' },
      { id: 'clock_pair', name: 'Jam Dinding', icon: '⏰' }
    ],
    reason: 'Celana panjang dipasangi ikat pinggang agar pas dan rapi!'
  },
  {
    id: 17,
    target: { id: 'raincoat', name: 'JAS HUJAN', icon: '🧥' },
    prompt: 'JAS HUJAN dipakai bersama apa saat banjir becek?',
    correctChoice: { id: 'boots', name: 'Sepatu Bot', icon: '👢' },
    distractors: [
      { id: 'guitar_pair', name: 'Gitar', icon: '🎸' },
      { id: 'pencil_pair', name: 'Pensil', icon: '✏️' }
    ],
    reason: 'Jas hujan dan sepatu bot melindungi tubuh kita dari cipratan air!'
  },
  {
    id: 18,
    target: { id: 'stove', name: 'KOMPOR DAPUR', icon: '🔥' },
    prompt: 'KOMPOR DAPUR digunakan untuk memasak dengan apa?',
    correctChoice: { id: 'pan_pair', name: 'Panci & Wajan', icon: '🍳' },
    distractors: [
      { id: 'pillow_pair2', name: 'Bantal', icon: '🛋️' },
      { id: 'kite_pair', name: 'Layangan', icon: '🪁' }
    ],
    reason: 'Kompor dapur memasak masakan lezat di dalam panci dan wajan!'
  },
  {
    id: 19,
    target: { id: 'glasses', name: 'KACAMATA', icon: '👓' },
    prompt: 'KACAMATA disimpan dengan aman di dalam apa?',
    correctChoice: { id: 'glasses_case', name: 'Kotak Kacamata', icon: '💼' },
    distractors: [
      { id: 'bucket_pair', name: 'Ember Air', icon: '🪣' },
      { id: 'tire_pair', name: 'Ban Mobil', icon: '🛞' }
    ],
    reason: 'Kacamata disimpan di dalam kotaknya agar kacanya tidak tergores!'
  },
  {
    id: 20,
    target: { id: 'whiteboard', name: 'PAPAN TULIS', icon: '📋' },
    prompt: 'PAPAN TULIS ditulis menggunakan apa?',
    correctChoice: { id: 'marker', name: 'Spidol Warna', icon: '🖊️' },
    distractors: [
      { id: 'soap_pair', name: 'Sabun Mandi', icon: '🧼' },
      { id: 'spoon_pair2', name: 'Sendok Makan', icon: '🥄' }
    ],
    reason: 'Papan tulis digunakan bapak ibu guru menulis dengan spidol warna!'
  }
];

export const PHONICS_DATA = [
  { level: 1, letter: 'B', soundHint: 'Bunyi /b/... beh, beh, Bebek!', phoneme: 'beh', choices: ['A', 'B', 'C'] },
  { level: 2, letter: 'M', soundHint: 'Bunyi /m/... mmm, mmm, Mobil!', phoneme: 'mmm', choices: ['N', 'M', 'W'] },
  { level: 3, letter: 'S', soundHint: 'Bunyi /s/... sss seperti ular, Singa!', phoneme: 'sss', choices: ['S', 'C', 'Z'] },
  { level: 4, letter: 'A', soundHint: 'Bunyi /a/... ah, ah, Apel!', phoneme: 'ah', choices: ['O', 'A', 'E'] },
  { level: 5, letter: 'K', soundHint: 'Bunyi /k/... keh, keh, Kucing!', phoneme: 'keh', choices: ['H', 'K', 'L'] },
  { level: 6, letter: 'D', soundHint: 'Bunyi /d/... deh, deh, Dinosaurus!', phoneme: 'deh', choices: ['B', 'P', 'D'] },
  { level: 7, letter: 'P', soundHint: 'Bunyi /p/... puh, puh, Pesawat!', phoneme: 'puh', choices: ['P', 'Q', 'R'] },
  { level: 8, letter: 'I', soundHint: 'Bunyi /i/... ih, ih, Ikan!', phoneme: 'ih', choices: ['T', 'I', 'L'] },
  { level: 9, letter: 'R', soundHint: 'Bunyi /r/... rrr seperti roket meluncur!', phoneme: 'rrr', choices: ['R', 'P', 'B'] },
  { level: 10, letter: 'Z', soundHint: 'Bunyi /z/... zzz dengung lebah, Zebra!', phoneme: 'zzz', choices: ['N', 'S', 'Z'] },
  { level: 11, letter: 'T', soundHint: 'Bunyi /t/... teh, teh, Truk!', phoneme: 'teh', choices: ['T', 'F', 'I'] },
  { level: 12, letter: 'L', soundHint: 'Bunyi /l/... lll, lll, Lumba-lumba!', phoneme: 'lll', choices: ['L', 'I', 'J'] },
  { level: 13, letter: 'N', soundHint: 'Bunyi /n/... nnn baling-baling, Nanas!', phoneme: 'nnn', choices: ['N', 'M', 'H'] },
  { level: 14, letter: 'U', soundHint: 'Bunyi /u/... uh, uh, Udang!', phoneme: 'uh', choices: ['U', 'V', 'O'] },
  { level: 15, letter: 'G', soundHint: 'Bunyi /g/... geh, geh, Gajah!', phoneme: 'geh', choices: ['G', 'C', 'Q'] },
  { level: 16, letter: 'H', soundHint: 'Bunyi /h/... hhh hembusan nafas, Hiu!', phoneme: 'hhh', choices: ['H', 'K', 'N'] },
  { level: 17, letter: 'J', soundHint: 'Bunyi /j/... jeh, jeh, Jerapah!', phoneme: 'jeh', choices: ['J', 'L', 'I'] },
  { level: 18, letter: 'C', soundHint: 'Bunyi /c/... ceh, ceh, Ceri!', phoneme: 'ceh', choices: ['C', 'G', 'O'] },
  { level: 19, letter: 'O', soundHint: 'Bunyi /o/... oh, oh, Orangutan!', phoneme: 'oh', choices: ['O', 'Q', 'D'] },
  { level: 20, letter: 'F', soundHint: 'Bunyi /f/... fff tiupan angin, Flamingo!', phoneme: 'fff', choices: ['F', 'E', 'T'] }
];

export const WORDS_DATA = [
  { level: 1, word: 'APEL', image: 'a.svg', helper: 'Buah manis warna merah', choices: ['APEL', 'AYAM', 'AWAN'] },
  { level: 2, word: 'BEBEK', image: 'b.svg', helper: 'Hewan kwek-kwek berenang', choices: ['BEBEK', 'BUKU', 'BALON'] },
  { level: 3, word: 'CERI', image: 'c.svg', helper: 'Buah kecil merah kembar', choices: ['CERI', 'CANGKIR', 'CELANA'] },
  { level: 4, word: 'DINO', image: 'd.svg', helper: 'Sahabat purba bertelur', choices: ['DINO', 'DOMBA', 'DURIAN'] },
  { level: 5, word: 'GAJAH', image: 'g.svg', helper: 'Hewan besar belalai panjang', choices: ['GAJAH', 'GITAR', 'GELAS'] },
  { level: 6, word: 'IKAN', image: 'i.svg', helper: 'Berenang lincah di air', choices: ['IKAN', 'ITIK', 'INTAN'] },
  { level: 7, word: 'KUCING', image: 'k.svg', helper: 'Hewan berbulu meong', choices: ['KUCING', 'KUDA', 'KERA'] },
  { level: 8, word: 'MOBIL', image: 'm.svg', helper: 'Kendaraan roda empat', choices: ['MOBIL', 'MATA', 'MEJA'] },
  { level: 9, word: 'PESAWAT', image: 'p.svg', helper: 'Terbang tinggi di awan', choices: ['PESAWAT', 'PINTU', 'POHON'] },
  { level: 10, word: 'SINGA', image: 's.svg', helper: 'Raja rimba bersuara aum', choices: ['SINGA', 'SAPI', 'SENDOK'] },
  { level: 11, word: 'HIU', image: 'h.svg', helper: 'Ikan perkasa di lautan', choices: ['HIU', 'HATI', 'HUJAN'] },
  { level: 12, word: 'JERAPAH', image: 'j.svg', helper: 'Hewan leher paling tinggi', choices: ['JERAPAH', 'JERUK', 'JAMUR'] },
  { level: 13, word: 'LUMBA', image: 'l.svg', helper: 'Sahabat laut lincah melompat', choices: ['LUMBA', 'LEBAH', 'LILIN'] },
  { level: 14, word: 'NANAS', image: 'n.svg', helper: 'Buah bersisik mahkota daun', choices: ['NANAS', 'NAGA', 'NASI'] },
  { level: 15, word: 'ORANGUTAN', image: 'o.svg', helper: 'Primata cerdas di pepohonan', choices: ['ORANGUTAN', 'ONTA', 'OMBAK'] },
  { level: 16, word: 'ROKET', image: 'r.svg', helper: 'Meluncur cepat ke angkasa', choices: ['ROKET', 'ROTI', 'RUSA'] },
  { level: 17, word: 'TRUK', image: 't.svg', helper: 'Mobil angkut muatan berat', choices: ['TRUK', 'TOPI', 'TALI'] },
  { level: 18, word: 'UDANG', image: 'u.svg', helper: 'Hewan laut berkulit jingga', choices: ['UDANG', 'ULAR', 'UNTA'] },
  { level: 19, word: 'WORTEL', image: 'w.svg', helper: 'Sayur jingga makanan kelinci', choices: ['WORTEL', 'WAJAN', 'WAYANG'] },
  { level: 20, word: 'ZEBRA', image: 'z.svg', helper: 'Kuda belang hitam dan putih', choices: ['ZEBRA', 'ZIGZAG', 'ZONA'] }
];
