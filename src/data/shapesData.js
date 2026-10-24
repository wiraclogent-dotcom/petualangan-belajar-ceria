/**
 * Data Bentuk Geometri, Warna Ceria, dan Perbandingan Ukuran (20 Tingkat - Cambridge Early Years)
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
  },
  {
    id: 'trapezoid',
    name: 'Trapesium',
    english: 'Trapezoid',
    color: '#14b8a6',
    svg: `<svg viewBox="0 0 100 100" width="70" height="70"><polygon points="30,20 70,20 90,80 10,80" fill="#14b8a6"/><circle cx="42" cy="48" r="4.5" fill="#fff"/><circle cx="58" cy="48" r="4.5" fill="#fff"/><path d="M 44 62 Q 50 70 56 62" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>`,
    silhouette: `<svg viewBox="0 0 100 100" width="85" height="85"><polygon points="30,20 70,20 90,80 10,80" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/></svg>`
  },
  {
    id: 'semicircle',
    name: 'Setengah Lingkaran',
    english: 'Semi-circle',
    color: '#f43f5e',
    svg: `<svg viewBox="0 0 100 100" width="70" height="70"><path d="M 12 70 A 38 38 0 0 1 88 70 Z" fill="#f43f5e"/><circle cx="40" cy="52" r="4.5" fill="#fff"/><circle cx="60" cy="52" r="4.5" fill="#fff"/><path d="M 44 62 Q 50 68 56 62" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
    silhouette: `<svg viewBox="0 0 100 100" width="85" height="85"><path d="M 12 70 A 38 38 0 0 1 88 70 Z" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/></svg>`
  },
  {
    id: 'pentagon',
    name: 'Segi Lima',
    english: 'Pentagon',
    color: '#8b5cf6',
    svg: `<svg viewBox="0 0 100 100" width="70" height="70"><polygon points="50,12 88,40 74,84 26,84 12,40" fill="#8b5cf6"/><circle cx="40" cy="48" r="4.5" fill="#fff"/><circle cx="60" cy="48" r="4.5" fill="#fff"/><path d="M 44 62 Q 50 70 56 62" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>`,
    silhouette: `<svg viewBox="0 0 100 100" width="85" height="85"><polygon points="50,12 88,40 74,84 26,84 12,40" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/></svg>`
  },
  {
    id: 'octagon',
    name: 'Segi Delapan',
    english: 'Octagon',
    color: '#dc2626',
    svg: `<svg viewBox="0 0 100 100" width="70" height="70"><polygon points="30,12 70,12 88,30 88,70 70,88 30,88 12,70 12,30" fill="#dc2626"/><circle cx="40" cy="46" r="4.5" fill="#fff"/><circle cx="60" cy="46" r="4.5" fill="#fff"/><path d="M 44 60 Q 50 68 56 60" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>`,
    silhouette: `<svg viewBox="0 0 100 100" width="85" height="85"><polygon points="30,12 70,12 88,30 88,70 70,88 30,88 12,70 12,30" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/></svg>`
  },
  {
    id: 'cross',
    name: 'Tanda Tambah',
    english: 'Cross',
    color: '#10b981',
    svg: `<svg viewBox="0 0 100 100" width="70" height="70"><polygon points="35,10 65,10 65,35 90,35 90,65 65,65 65,90 35,90 35,65 10,65 10,35 35,35" fill="#10b981"/><circle cx="44" cy="46" r="4" fill="#fff"/><circle cx="56" cy="46" r="4" fill="#fff"/><path d="M 46 56 Q 50 62 54 56" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
    silhouette: `<svg viewBox="0 0 100 100" width="85" height="85"><polygon points="35,10 65,10 65,35 90,35 90,65 65,65 65,90 35,90 35,65 10,65 10,35 35,35" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/></svg>`
  },
  {
    id: 'arrow_shape',
    name: 'Panah',
    english: 'Arrow',
    color: '#0284c7',
    svg: `<svg viewBox="0 0 100 100" width="70" height="70"><polygon points="50,10 90,50 65,50 65,90 35,90 35,50 10,50" fill="#0284c7"/><circle cx="45" cy="42" r="4" fill="#fff"/><circle cx="55" cy="42" r="4" fill="#fff"/><path d="M 46 58 Q 50 64 54 58" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
    silhouette: `<svg viewBox="0 0 100 100" width="85" height="85"><polygon points="50,10 90,50 65,50 65,90 35,90 35,50 10,50" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/></svg>`
  },
  {
    id: 'cube',
    name: 'Kubus Kotak',
    english: 'Cube',
    color: '#f59e0b',
    svg: `<svg viewBox="0 0 100 100" width="70" height="70"><polygon points="50,12 88,32 50,52 12,32" fill="#fbbf24"/><polygon points="12,32 50,52 50,90 12,70" fill="#d97706"/><polygon points="50,52 88,32 88,70 50,90" fill="#f59e0b"/><circle cx="44" cy="62" r="4" fill="#fff"/><circle cx="58" cy="62" r="4" fill="#fff"/></svg>`,
    silhouette: `<svg viewBox="0 0 100 100" width="85" height="85"><polygon points="50,12 88,32 88,70 50,90 12,70 12,32" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/></svg>`
  },
  {
    id: 'cylinder',
    name: 'Tabung Kaleng',
    english: 'Cylinder',
    color: '#ec4899',
    svg: `<svg viewBox="0 0 100 100" width="70" height="70"><rect x="22" y="30" width="56" height="50" fill="#db2777"/><ellipse cx="50" cy="80" rx="28" ry="12" fill="#db2777"/><ellipse cx="50" cy="30" rx="28" ry="12" fill="#f472b6"/><circle cx="42" cy="52" r="4" fill="#fff"/><circle cx="58" cy="52" r="4" fill="#fff"/></svg>`,
    silhouette: `<svg viewBox="0 0 100 100" width="85" height="85"><rect x="22" y="30" width="56" height="50" fill="#94a3b8" opacity="0.35"/><ellipse cx="50" cy="80" rx="28" ry="12" fill="#94a3b8" opacity="0.35"/><ellipse cx="50" cy="30" rx="28" ry="12" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/></svg>`
  },
  {
    id: 'cone',
    name: 'Kerucut Corong',
    english: 'Cone',
    color: '#e11d48',
    svg: `<svg viewBox="0 0 100 100" width="70" height="70"><polygon points="50,10 82,78 18,78" fill="#e11d48"/><ellipse cx="50" cy="78" rx="32" ry="12" fill="#be123c"/><circle cx="44" cy="54" r="4" fill="#fff"/><circle cx="56" cy="54" r="4" fill="#fff"/></svg>`,
    silhouette: `<svg viewBox="0 0 100 100" width="85" height="85"><polygon points="50,10 82,78 18,78" fill="#94a3b8" opacity="0.35"/><ellipse cx="50" cy="78" rx="32" ry="12" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/></svg>`
  },
  {
    id: 'sphere',
    name: 'Bola Bulat',
    english: 'Sphere',
    color: '#3b82f6',
    svg: `<svg viewBox="0 0 100 100" width="70" height="70"><defs><radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%"><stop offset="0%" stop-color="#93c5fd"/><stop offset="60%" stop-color="#2563eb"/><stop offset="100%" stop-color="#1e3a8a"/></radialGradient></defs><circle cx="50" cy="50" r="42" fill="url(#sphereGrad)"/><circle cx="42" cy="46" r="4" fill="#fff"/><circle cx="58" cy="46" r="4" fill="#fff"/></svg>`,
    silhouette: `<svg viewBox="0 0 100 100" width="85" height="85"><circle cx="50" cy="50" r="42" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/></svg>`
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
  { id: 'black', name: 'Hitam', english: 'Black', hex: '#1e293b', icon: '🐈‍⬛', itemText: 'Kucing Hitam' },
  { id: 'cyan', name: 'Biru Langit Muda', english: 'Sky Blue / Cyan', hex: '#06b6d4', icon: '💧', itemText: 'Tetesan Air Biru Muda' },
  { id: 'lime', name: 'Hijau Lemon Muda', english: 'Lime Green', hex: '#84cc16', icon: '🍋', itemText: 'Jeruk Lemon Segar' },
  { id: 'gold', name: 'Kuning Emas', english: 'Gold', hex: '#d97706', icon: '🏆', itemText: 'Piala Emas Juara' },
  { id: 'silver', name: 'Perak Berkilau', english: 'Silver', hex: '#94a3b8', icon: '🪙', itemText: 'Koin Logam Perak' },
  { id: 'indigo', name: 'Biru Nila Gelap', english: 'Indigo / Navy', hex: '#1e1b4b', icon: '🌌', itemText: 'Langit Malam Gelap' },
  { id: 'magenta', name: 'Merah Fanta / Magenta', english: 'Magenta', hex: '#d946ef', icon: '🪅', itemText: 'Balon Pesta Ceria' },
  { id: 'grey', name: 'Abu-Abu Sejuk', english: 'Grey', hex: '#64748b', icon: '🐘', itemText: 'Gajah Abu-abu' },
  { id: 'beige', name: 'Warna Krem Lembut', english: 'Beige / Cream', hex: '#fef08a', icon: '🍞', itemText: 'Roti Gandum Krem' },
  { id: 'turquoise', name: 'Hijau Toska Indah', english: 'Turquoise', hex: '#0d9488', icon: '🦚', itemText: 'Bulu Burung Merak' },
  { id: 'maroon', name: 'Merah Marun Pekat', english: 'Maroon', hex: '#881337', icon: '🍷', itemText: 'Buah Delima Merah Marun' }
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
  },
  {
    id: 11,
    question: 'Manakah benda yang LEBIH PANAS?',
    speechQuestion: 'Manakah benda yang lebih panas?',
    correctId: 'fire_hot',
    reason: 'Tepat sekali! Kobaran api itu sangat panas membakar, sedangkan es batu itu dingin!',
    items: [
      { id: 'fire_hot', name: 'Api Membara', icon: '🔥', scale: 'scale-large', desc: 'Sangat Panas' },
      { id: 'ice_cube', name: 'Es Batu', icon: '🧊', scale: 'scale-small', desc: 'Dingin Beku' }
    ]
  },
  {
    id: 12,
    question: 'Manakah makanan yang LEBIH DINGIN?',
    speechQuestion: 'Manakah makanan yang lebih dingin membeku?',
    correctId: 'icecream_cold',
    reason: 'Pintar! Es krim itu beku dingin menyegarkan, sedangkan sup itu hangat beruap!',
    items: [
      { id: 'soup_warm', name: 'Sup Hangat', icon: '🥣', scale: 'scale-medium', desc: 'Hangat Beruap' },
      { id: 'icecream_cold', name: 'Es Krim Cone', icon: '🍦', scale: 'scale-small', desc: 'Dingin Beku' }
    ]
  },
  {
    id: 13,
    question: 'Manakah tempat yang LEBIH LUAS?',
    speechQuestion: 'Manakah tempat yang lebih luas untuk berlari?',
    correctId: 'field_wide',
    reason: 'Hebat! Lapangan rumput sangat luas membentang, sedangkan kamar tidur lebih sempit!',
    items: [
      { id: 'field_wide', name: 'Lapangan Bola', icon: '⚽', scale: 'scale-wide', desc: 'Sangat Luas' },
      { id: 'bedroom', name: 'Kamar Tidur', icon: '🛏️', scale: 'scale-small', desc: 'Lebih Sempit' }
    ]
  },
  {
    id: 14,
    question: 'Manakah cahaya yang LEBIH TERANG?',
    speechQuestion: 'Manakah cahaya yang lebih terang benderang?',
    correctId: 'sun_bright',
    reason: 'Juara! Matahari siang menyinari seluruh bumi, sedangkan lilin sinarnya kecil!',
    items: [
      { id: 'sun_bright', name: 'Matahari', icon: '☀️', scale: 'scale-large', desc: 'Terang Benderang' },
      { id: 'candle_small', name: 'Lilin Kecil', icon: '🕯️', scale: 'scale-small', desc: 'Cahaya Redup' }
    ]
  },
  {
    id: 15,
    question: 'Manakah tempat air yang LEBIH DALAM?',
    speechQuestion: 'Manakah tempat air yang lebih dalam?',
    correctId: 'ocean_deep',
    reason: 'Benar sekali! Lautan samudra sangat dalam, sedangkan genangan air sangat dangkal!',
    items: [
      { id: 'ocean_deep', name: 'Lautan Biru', icon: '🌊', scale: 'scale-large', desc: 'Sangat Dalam' },
      { id: 'puddle_shallow', name: 'Genangan Air', icon: '💧', scale: 'scale-small', desc: 'Dangkal di Jalan' }
    ]
  },
  {
    id: 16,
    question: 'Manakah benda yang LEBIH TEBAL?',
    speechQuestion: 'Manakah benda yang lebih tebal lembarannya?',
    correctId: 'thick_book',
    reason: 'Luar biasa! Kamus tebal punya ratusan halaman, sedangkan selembar kertas sangat tipis!',
    items: [
      { id: 'thick_book', name: 'Kamus Tebal', icon: '📕', scale: 'scale-large', desc: 'Sangat Tebal' },
      { id: 'paper_thin', name: 'Selembar Kertas', icon: '📄', scale: 'scale-small', desc: 'Tipis Ringan' }
    ]
  },
  {
    id: 17,
    question: 'Manakah benda yang LEBIH TIPIS?',
    speechQuestion: 'Manakah yang lebih tipis?',
    correctId: 'leaf_thin',
    reason: 'Pintar! Daun pohon sangat tipis melayang, sedangkan balok kayu tebal dan padat!',
    items: [
      { id: 'wood_block', name: 'Balok Kayu', icon: '🪵', scale: 'scale-medium', desc: 'Tebal Padat' },
      { id: 'leaf_thin', name: 'Daun Pohon', icon: '🍃', scale: 'scale-small', desc: 'Lebih Tipis' }
    ]
  },
  {
    id: 18,
    question: 'Manakah hewan yang terbang LEBIH TINGGI?',
    speechQuestion: 'Manakah yang dapat berada lebih tinggi di angkasa?',
    correctId: 'eagle_high',
    reason: 'Hebat! Burung elang terbang tinggi menembus awan, sedangkan katak hanya melompat rendah!',
    items: [
      { id: 'eagle_high', name: 'Burung Elang', icon: '🦅', scale: 'scale-tall', desc: 'Terbang Tinggi' },
      { id: 'frog_low', name: 'Katak Kolam', icon: '🐸', scale: 'scale-short', desc: 'Lompat Rendah' }
    ]
  },
  {
    id: 19,
    question: 'Manakah keranjang yang isinya LEBIH BANYAK apel?',
    speechQuestion: 'Manakah yang isinya lebih banyak buah apel?',
    correctId: 'many_apples',
    reason: 'Tepat sekali! Keranjang ini berisi 8 apel banyak, yang satunya hanya ada 2 sedikit!',
    items: [
      { id: 'few_apples', name: '2 Apel', icon: '🍎🍎', scale: 'scale-small', desc: 'Sedikit (2)' },
      { id: 'many_apples', name: '8 Apel', icon: '🍎🍎🍎🍎', scale: 'scale-medium', desc: 'Banyak (8)' }
    ]
  },
  {
    id: 20,
    question: 'Manakah kendaraan yang melaju LEBIH CEPAT?',
    speechQuestion: 'Manakah kendaraan yang melaju paling cepat di dunia?',
    correctId: 'jet_plane',
    reason: 'Juara umum! Pesawat jet supersonik terbang sangat cepat secepat kilat!',
    items: [
      { id: 'jet_plane', name: 'Pesawat Jet', icon: '🚀', scale: 'scale-large', desc: 'Sangat Cepat' },
      { id: 'tricycle', name: 'Sepeda Roda Tiga', icon: '🚲', scale: 'scale-small', desc: 'Lambat Santai' }
    ]
  }
];
