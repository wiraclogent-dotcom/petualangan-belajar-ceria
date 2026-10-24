/**
 * Data Bentuk 2D Geometri, Warna Ceria, dan Perbandingan Ukuran (Cambridge Early Years)
 */
export const SHAPES_DATA = [
  {
    id: 'circle',
    name: 'Lingkaran',
    english: 'Circle',
    color: '#f43f5e',
    svg: `<svg viewBox="0 0 100 100" width="70" height="70"><circle cx="50" cy="50" r="42" fill="#f43f5e"/><circle cx="38" cy="42" r="5" fill="#fff"/><circle cx="62" cy="42" r="5" fill="#fff"/><path d="M 40 60 Q 50 72 60 60" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`,
    silhouette: `<svg viewBox="0 0 100 100" width="85" height="85"><circle cx="50" cy="50" r="42" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/></svg>`
  },
  {
    id: 'square',
    name: 'Persegi',
    english: 'Square',
    color: '#3b82f6',
    svg: `<svg viewBox="0 0 100 100" width="70" height="70"><rect x="14" y="14" width="72" height="72" rx="14" fill="#3b82f6"/><circle cx="38" cy="42" r="5" fill="#fff"/><circle cx="62" cy="42" r="5" fill="#fff"/><path d="M 40 60 Q 50 72 60 60" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`,
    silhouette: `<svg viewBox="0 0 100 100" width="85" height="85"><rect x="14" y="14" width="72" height="72" rx="14" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/></svg>`
  },
  {
    id: 'triangle',
    name: 'Segitiga',
    english: 'Triangle',
    color: '#22c55e',
    svg: `<svg viewBox="0 0 100 100" width="70" height="70"><polygon points="50,14 88,84 12,84" fill="#22c55e" stroke-linejoin="round" stroke="#22c55e" stroke-width="6"/><circle cx="42" cy="54" r="4.5" fill="#fff"/><circle cx="58" cy="54" r="4.5" fill="#fff"/><path d="M 44 68 Q 50 76 56 68" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>`,
    silhouette: `<svg viewBox="0 0 100 100" width="85" height="85"><polygon points="50,14 88,84 12,84" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'star',
    name: 'Bintang',
    english: 'Star',
    color: '#eab308',
    svg: `<svg viewBox="0 0 100 100" width="70" height="70"><polygon points="50,6 64,36 96,38 72,60 80,94 50,75 20,94 28,60 4,38 36,36" fill="#eab308" stroke-linejoin="round" stroke="#eab308" stroke-width="5"/><circle cx="43" cy="46" r="4" fill="#584200"/><circle cx="57" cy="46" r="4" fill="#584200"/><path d="M 44 56 Q 50 63 56 56" stroke="#584200" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
    silhouette: `<svg viewBox="0 0 100 100" width="85" height="85"><polygon points="50,6 64,36 96,38 72,60 80,94 50,75 20,94 28,60 4,38 36,36" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'rectangle',
    name: 'Persegi Panjang',
    english: 'Rectangle',
    color: '#a855f7',
    svg: `<svg viewBox="0 0 120 80" width="85" height="60"><rect x="10" y="10" width="100" height="60" rx="12" fill="#a855f7"/><circle cx="48" cy="36" r="4.5" fill="#fff"/><circle cx="72" cy="36" r="4.5" fill="#fff"/><path d="M 52 50 Q 60 58 68 50" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>`,
    silhouette: `<svg viewBox="0 0 120 80" width="100" height="70"><rect x="10" y="10" width="100" height="60" rx="12" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/></svg>`
  },
  {
    id: 'heart',
    name: 'Hati',
    english: 'Heart',
    color: '#ec4899',
    svg: `<svg viewBox="0 0 100 100" width="70" height="70"><path d="M 50 85 C 20 60 5 40 5 25 C 5 10 20 5 35 15 C 43 22 50 30 50 30 C 50 30 57 22 65 15 C 80 5 95 10 95 25 C 95 40 80 60 50 85 Z" fill="#ec4899"/><circle cx="35" cy="35" r="4.5" fill="#fff"/><circle cx="65" cy="35" r="4.5" fill="#fff"/><path d="M 42 50 Q 50 58 58 50" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>`,
    silhouette: `<svg viewBox="0 0 100 100" width="85" height="85"><path d="M 50 85 C 20 60 5 40 5 25 C 5 10 20 5 35 15 C 43 22 50 30 50 30 C 50 30 57 22 65 15 C 80 5 95 10 95 25 C 95 40 80 60 50 85 Z" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/></svg>`
  },
  {
    id: 'oval',
    name: 'Oval',
    english: 'Oval',
    color: '#06b6d4',
    svg: `<svg viewBox="0 0 100 100" width="70" height="70"><ellipse cx="50" cy="50" rx="35" ry="46" fill="#06b6d4"/><circle cx="42" cy="42" r="4.5" fill="#fff"/><circle cx="58" cy="42" r="4.5" fill="#fff"/><path d="M 44 58 Q 50 66 56 58" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>`,
    silhouette: `<svg viewBox="0 0 100 100" width="85" height="85"><ellipse cx="50" cy="50" rx="35" ry="46" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/></svg>`
  },
  {
    id: 'diamond',
    name: 'Belah Ketupat',
    english: 'Diamond',
    color: '#f97316',
    svg: `<svg viewBox="0 0 100 100" width="70" height="70"><polygon points="50,8 90,50 50,92 10,50" fill="#f97316"/><circle cx="42" cy="46" r="4.5" fill="#fff"/><circle cx="58" cy="46" r="4.5" fill="#fff"/><path d="M 44 60 Q 50 67 56 60" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>`,
    silhouette: `<svg viewBox="0 0 100 100" width="85" height="85"><polygon points="50,8 90,50 50,92 10,50" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/></svg>`
  },
  {
    id: 'crescent',
    name: 'Bulan Sabit',
    english: 'Crescent',
    color: '#fbbf24',
    svg: `<svg viewBox="0 0 100 100" width="70" height="70"><path d="M 65 10 A 42 42 0 1 0 65 90 A 32 32 0 0 1 65 10 Z" fill="#fbbf24"/><circle cx="40" cy="45" r="4.5" fill="#78350f"/><path d="M 36 58 Q 42 66 48 58" stroke="#78350f" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>`,
    silhouette: `<svg viewBox="0 0 100 100" width="85" height="85"><path d="M 65 10 A 42 42 0 1 0 65 90 A 32 32 0 0 1 65 10 Z" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/></svg>`
  },
  {
    id: 'hexagon',
    name: 'Segi Enam',
    english: 'Hexagon',
    color: '#6366f1',
    svg: `<svg viewBox="0 0 100 100" width="70" height="70"><polygon points="50,10 88,30 88,70 50,90 12,70 12,30" fill="#6366f1"/><circle cx="40" cy="45" r="4.5" fill="#fff"/><circle cx="60" cy="45" r="4.5" fill="#fff"/><path d="M 44 60 Q 50 67 56 60" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>`,
    silhouette: `<svg viewBox="0 0 100 100" width="85" height="85"><polygon points="50,10 88,30 88,70 50,90 12,70 12,30" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/></svg>`
  }
];

export const COLORS_DATA = [
  { id: 'red', name: 'Merah', english: 'Red', hex: '#ef4444', icon: '🍎', itemText: 'Apel Merah' },
  { id: 'blue', name: 'Biru', english: 'Blue', hex: '#3b82f6', icon: '🚙', itemText: 'Mobil Biru' },
  { id: 'yellow', name: 'Kuning', english: 'Yellow', hex: '#eab308', icon: '⭐', itemText: 'Bintang Kuning' },
  { id: 'green', name: 'Hijau', english: 'Green', hex: '#22c55e', icon: '🍃', itemText: 'Daun Hijau' },
  { id: 'orange', name: 'Jingga / Oranye', english: 'Orange', hex: '#f97316', icon: '🍊', itemText: 'Jeruk Oranye' },
  { id: 'purple', name: 'Ungu', english: 'Purple', hex: '#a855f7', icon: '🍇', itemText: 'Anggur Ungu' },
  { id: 'pink', name: 'Merah Muda', english: 'Pink', hex: '#ec4899', icon: '🌸', itemText: 'Bunga Merah Muda' },
  { id: 'brown', name: 'Cokelat', english: 'Brown', hex: '#92400e', icon: '🐻', itemText: 'Beruang Cokelat' },
  { id: 'white', name: 'Putih', english: 'White', hex: '#e2e8f0', icon: '🥛', itemText: 'Susu Putih' },
  { id: 'black', name: 'Hitam', english: 'Black', hex: '#1e293b', icon: '🐈‍⬛', itemText: 'Kucing Hitam' }
];

export const COMPARE_DATA = [
  {
    id: 1,
    question: 'Manakah hewan yang LEBIH BESAR?',
    speechQuestion: 'Manakah hewan yang lebih besar?',
    correctId: 'elephant',
    reason: 'Hebat! Gajah badannya sangat besar, sedangkan tikus badannya kecil!',
    items: [
      { id: 'elephant', name: 'Gajah', icon: '🐘', scale: 'scale-large', desc: 'Badan Besar' },
      { id: 'mouse', name: 'Tikus', icon: '🐭', scale: 'scale-small', desc: 'Badan Kecil' }
    ]
  },
  {
    id: 2,
    question: 'Manakah hewan yang LEBIH KECIL?',
    speechQuestion: 'Manakah hewan yang lebih kecil?',
    correctId: 'ant',
    reason: 'Pintar sekali! Semut bertubuh mungil, sedangkan singa bertubuh besar!',
    items: [
      { id: 'lion', name: 'Singa', icon: '🦁', scale: 'scale-large', desc: 'Badan Besar' },
      { id: 'ant', name: 'Semut', icon: '🐜', scale: 'scale-small', desc: 'Badan Kecil' }
    ]
  },
  {
    id: 3,
    question: 'Manakah yang LEBIH PANJANG?',
    speechQuestion: 'Manakah benda yang lebih panjang?',
    correctId: 'ruler',
    reason: 'Luar biasa! Penggaris itu panjang, sedangkan rautan itu pendek!',
    items: [
      { id: 'ruler', name: 'Penggaris', icon: '📏', scale: 'scale-wide', desc: 'Lebih Panjang' },
      { id: 'sharpener', name: 'Rautan', icon: '🪒', scale: 'scale-small', desc: 'Lebih Pendek' }
    ]
  },
  {
    id: 4,
    question: 'Manakah yang LEBIH BANYAK?',
    speechQuestion: 'Manakah yang isinya lebih banyak permen?',
    correctId: 'many_candies',
    reason: 'Juara! Toples ini berisi 5 permen banyak, yang satunya hanya 1 sedikit!',
    items: [
      { id: 'few_candies', name: '1 Permen', icon: '🍬', scale: 'scale-small', desc: 'Sedikit (1)' },
      { id: 'many_candies', name: '5 Permen', icon: '🍬🍬🍬', scale: 'scale-medium', desc: 'Banyak (5)' }
    ]
  },
  {
    id: 5,
    question: 'Manakah yang LEBIH TINGGI?',
    speechQuestion: 'Manakah hewan yang lebih tinggi?',
    correctId: 'giraffe',
    reason: 'Hebat! Jerapah lehernya sangat tinggi, sedangkan kelinci pendek!',
    items: [
      { id: 'giraffe', name: 'Jerapah', icon: '🦒', scale: 'scale-tall', desc: 'Tinggi Sekali' },
      { id: 'rabbit', name: 'Kelinci', icon: '🐰', scale: 'scale-short', desc: 'Lebih Pendek' }
    ]
  },
  {
    id: 6,
    question: 'Manakah yang LEBIH PENDEK?',
    speechQuestion: 'Manakah hewan yang lebih pendek?',
    correctId: 'caterpillar',
    reason: 'Tepat sekali! Ulat mungil lebih pendek daripada ular yang panjang!',
    items: [
      { id: 'snake', name: 'Ular', icon: '🐍', scale: 'scale-wide', desc: 'Panjang Menjalar' },
      { id: 'caterpillar', name: 'Ulat', icon: '🐛', scale: 'scale-small', desc: 'Pendek Mungil' }
    ]
  },
  {
    id: 7,
    question: 'Manakah yang LEBIH SEDIKIT?',
    speechQuestion: 'Manakah piring yang kuenya lebih sedikit?',
    correctId: 'few_cookies',
    reason: 'Bagus sekali! Piring ini hanya ada 2 kue sedikit, yang satu lagi ada 6 banyak!',
    items: [
      { id: 'many_cookies', name: '6 Kue', icon: '🍪🍪🍪', scale: 'scale-medium', desc: 'Banyak (6)' },
      { id: 'few_cookies', name: '2 Kue', icon: '🍪', scale: 'scale-small', desc: 'Sedikit (2)' }
    ]
  },
  {
    id: 8,
    question: 'Manakah yang LEBIH BERAT?',
    speechQuestion: 'Manakah benda yang lebih berat?',
    correctId: 'rock',
    reason: 'Benar! Batu besar sangat berat, sedangkan bulu burung sangat ringan!',
    items: [
      { id: 'rock', name: 'Batu Besar', icon: '🪨', scale: 'scale-large', desc: 'Sangat Berat' },
      { id: 'feather', name: 'Bulu Burung', icon: '🪶', scale: 'scale-small', desc: 'Sangat Ringan' }
    ]
  },
  {
    id: 9,
    question: 'Manakah yang LEBIH CEPAT?',
    speechQuestion: 'Manakah yang melaju lebih cepat?',
    correctId: 'racecar',
    reason: 'Hebat! Mobil balap melaju kencang, sedangkan siput berjalan lambat!',
    items: [
      { id: 'racecar', name: 'Mobil Balap', icon: '🏎️', scale: 'scale-large', desc: 'Melaju Kencang' },
      { id: 'snail', name: 'Siput', icon: '🐌', scale: 'scale-small', desc: 'Berjalan Lambat' }
    ]
  },
  {
    id: 10,
    question: 'Manakah bangunan yang LEBIH TINGGI?',
    speechQuestion: 'Manakah bangunan yang lebih tinggi?',
    correctId: 'tower',
    reason: 'Juara! Gedung menara bertingkat tinggi menjulang ke awan!',
    items: [
      { id: 'tower', name: 'Gedung Menara', icon: '🏙️', scale: 'scale-tall', desc: 'Tinggi Menjulang' },
      { id: 'cottage', name: 'Rumah Kecil', icon: '🏡', scale: 'scale-short', desc: 'Lebih Rendah' }
    ]
  }
];
