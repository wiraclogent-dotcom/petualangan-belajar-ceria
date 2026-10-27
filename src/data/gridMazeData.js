/**
 * gridMazeData.js
 * 15 Misi Patroli Labirin Abjad (Grid Maze Patrol)
 * 
 * Didesain khusus untuk logika spasial anak 4 tahun (pre-reader):
 * - Kendalikan mobil patroli (🚓) dengan remote D-Pad (▲ ▼ ◀ ▶)
 * - Telusuri jejak huruf target (misal 'A' untuk 🍎 Apel) dari Start 🚩 ke Goal 🏁
 * - Menginjak ubin huruf membunyikan fonik & menyalakan lampu jalan
 */

export const GRID_MAZE_LEVELS = [
  // Level 1: A - Apel
  {
    level: 1,
    title: 'Patroli Jejak Huruf A (Apel)',
    targetLetter: 'A',
    clue: { icon: '🍎', name: 'APEL', sound: 'A-a-apel!', goalName: 'Kebun Apel', goalIcon: '🎪' },
    cols: 5, rows: 4,
    start: { x: 0, y: 0 },
    goal: { x: 4, y: 3 },
    // S: start, T: target letter, W: wall/bush, G: goal
    layout: [
      ['S', 'T', 'W', 'W', 'W'],
      ['W', 'T', 'T', 'W', 'W'],
      ['W', 'W', 'T', 'T', 'W'],
      ['W', 'W', 'W', 'T', 'G']
    ]
  },
  // Level 2: B - Bebek
  {
    level: 2,
    title: 'Patroli Jejak Huruf B (Bebek)',
    targetLetter: 'B',
    clue: { icon: '🦆', name: 'BEBEK', sound: 'B-b-bebek!', goalName: 'Danau Bebek', goalIcon: '🏖️' },
    cols: 5, rows: 4,
    start: { x: 0, y: 3 },
    goal: { x: 4, y: 0 },
    layout: [
      ['W', 'W', 'W', 'T', 'G'],
      ['W', 'T', 'T', 'T', 'W'],
      ['T', 'T', 'W', 'W', 'W'],
      ['S', 'W', 'W', 'W', 'W']
    ]
  },
  // Level 3: C - Ceri
  {
    level: 3,
    title: 'Patroli Jejak Huruf C (Ceri)',
    targetLetter: 'C',
    clue: { icon: '🍒', name: 'CERI', sound: 'C-c-ceri!', goalName: 'Kedai Ceri', goalIcon: '🍧' },
    cols: 5, rows: 4,
    start: { x: 0, y: 0 },
    goal: { x: 0, y: 3 },
    layout: [
      ['S', 'T', 'T', 'T', 'W'],
      ['W', 'W', 'W', 'T', 'W'],
      ['W', 'W', 'W', 'T', 'W'],
      ['G', 'T', 'T', 'T', 'W']
    ]
  },
  // Level 4: D - Domba
  {
    level: 4,
    title: 'Patroli Jejak Huruf D (Domba)',
    targetLetter: 'D',
    clue: { icon: '🐑', name: 'DOMBA', sound: 'D-d-domba!', goalName: 'Padang Rumput', goalIcon: '🏡' },
    cols: 5, rows: 4,
    start: { x: 0, y: 0 },
    goal: { x: 4, y: 3 },
    layout: [
      ['S', 'T', 'T', 'W', 'W'],
      ['W', 'W', 'T', 'T', 'W'],
      ['W', 'W', 'W', 'T', 'T'],
      ['W', 'W', 'W', 'W', 'G']
    ]
  },
  // Level 5: E - Elang
  {
    level: 5,
    title: 'Patroli Jejak Huruf E (Elang)',
    targetLetter: 'E',
    clue: { icon: '🦅', name: 'ELANG', sound: 'E-e-elang!', goalName: 'Puncak Elang', goalIcon: '🏔️' },
    cols: 5, rows: 4,
    start: { x: 4, y: 0 },
    goal: { x: 0, y: 3 },
    layout: [
      ['W', 'W', 'T', 'T', 'S'],
      ['W', 'W', 'T', 'W', 'W'],
      ['T', 'T', 'T', 'W', 'W'],
      ['G', 'W', 'W', 'W', 'W']
    ]
  },
  // Level 6: F - Flamingo
  {
    level: 6,
    title: 'Patroli Jejak Huruf F (Flamingo)',
    targetLetter: 'F',
    clue: { icon: '🦩', name: 'FLAMINGO', sound: 'F-f-flamingo!', goalName: 'Pulau Flamingo', goalIcon: '🏝️' },
    cols: 5, rows: 4,
    start: { x: 0, y: 3 },
    goal: { x: 4, y: 0 },
    layout: [
      ['W', 'T', 'T', 'T', 'G'],
      ['W', 'T', 'W', 'W', 'W'],
      ['T', 'T', 'W', 'W', 'W'],
      ['S', 'W', 'W', 'W', 'W']
    ]
  },
  // Level 7: G - Gajah
  {
    level: 7,
    title: 'Patroli Jejak Huruf G (Gajah)',
    targetLetter: 'G',
    clue: { icon: '🐘', name: 'GAJAH', sound: 'G-g-gajah!', goalName: 'Taman Safari', goalIcon: '🏞️' },
    cols: 5, rows: 4,
    start: { x: 0, y: 0 },
    goal: { x: 4, y: 3 },
    layout: [
      ['S', 'T', 'W', 'W', 'W'],
      ['W', 'T', 'T', 'T', 'W'],
      ['W', 'W', 'W', 'T', 'W'],
      ['W', 'W', 'W', 'T', 'G']
    ]
  },
  // Level 8: H - Helikopter
  {
    level: 8,
    title: 'Patroli Jejak Huruf H (Helikopter)',
    targetLetter: 'H',
    clue: { icon: '🚁', name: 'HELIKOPTER', sound: 'H-h-helikopter!', goalName: 'Helipad Bandara', goalIcon: '🛸' },
    cols: 5, rows: 4,
    start: { x: 0, y: 0 },
    goal: { x: 4, y: 0 },
    layout: [
      ['S', 'W', 'W', 'W', 'G'],
      ['T', 'W', 'W', 'W', 'T'],
      ['T', 'T', 'T', 'T', 'T'],
      ['W', 'W', 'W', 'W', 'W']
    ]
  },
  // Level 9: I - Ikan
  {
    level: 9,
    title: 'Patroli Jejak Huruf I (Ikan)',
    targetLetter: 'I',
    clue: { icon: '🐟', name: 'IKAN', sound: 'I-i-ikan!', goalName: 'Akuarium Laut', goalIcon: '🐠' },
    cols: 5, rows: 4,
    start: { x: 2, y: 0 },
    goal: { x: 2, y: 3 },
    layout: [
      ['W', 'W', 'S', 'W', 'W'],
      ['W', 'W', 'T', 'W', 'W'],
      ['W', 'W', 'T', 'W', 'W'],
      ['W', 'W', 'G', 'W', 'W']
    ]
  },
  // Level 10: J - Jeruk
  {
    level: 10,
    title: 'Patroli Jejak Huruf J (Jeruk)',
    targetLetter: 'J',
    clue: { icon: '🍊', name: 'JERUK', sound: 'J-j-jeruk!', goalName: 'Pasar Buah', goalIcon: '🧺' },
    cols: 5, rows: 4,
    start: { x: 3, y: 0 },
    goal: { x: 0, y: 2 },
    layout: [
      ['W', 'W', 'W', 'S', 'W'],
      ['W', 'W', 'W', 'T', 'W'],
      ['G', 'T', 'T', 'T', 'W'],
      ['W', 'W', 'W', 'W', 'W']
    ]
  },
  // Level 11: K - Kucing
  {
    level: 11,
    title: 'Patroli Jejak Huruf K (Kucing)',
    targetLetter: 'K',
    clue: { icon: '🐱', name: 'KUCING', sound: 'K-k-kucing!', goalName: 'Rumah Kucing', goalIcon: '🧶' },
    cols: 5, rows: 4,
    start: { x: 0, y: 0 },
    goal: { x: 4, y: 3 },
    layout: [
      ['S', 'T', 'T', 'W', 'W'],
      ['W', 'W', 'T', 'W', 'W'],
      ['W', 'W', 'T', 'T', 'W'],
      ['W', 'W', 'W', 'T', 'G']
    ]
  },
  // Level 12: L - Lemon
  {
    level: 12,
    title: 'Patroli Jejak Huruf L (Lemon)',
    targetLetter: 'L',
    clue: { icon: '🍋', name: 'LEMON', sound: 'L-l-lemon!', goalName: 'Kedai Jus Segar', goalIcon: '🍹' },
    cols: 5, rows: 4,
    start: { x: 0, y: 0 },
    goal: { x: 4, y: 3 },
    layout: [
      ['S', 'W', 'W', 'W', 'W'],
      ['T', 'W', 'W', 'W', 'W'],
      ['T', 'W', 'W', 'W', 'W'],
      ['T', 'T', 'T', 'T', 'G']
    ]
  },
  // Level 13: M - Mobil
  {
    level: 13,
    title: 'Patroli Jejak Huruf M (Mobil)',
    targetLetter: 'M',
    clue: { icon: '🚗', name: 'MOBIL', sound: 'M-m-mobil!', goalName: 'Garasi Juara', goalIcon: '🏁' },
    cols: 5, rows: 4,
    start: { x: 0, y: 3 },
    goal: { x: 4, y: 3 },
    layout: [
      ['W', 'T', 'W', 'T', 'W'],
      ['T', 'W', 'T', 'W', 'T'],
      ['T', 'W', 'W', 'W', 'T'],
      ['S', 'W', 'W', 'W', 'G']
    ]
  },
  // Level 14: N - Nanas
  {
    level: 14,
    title: 'Patroli Jejak Huruf N (Nanas)',
    targetLetter: 'N',
    clue: { icon: '🍍', name: 'NANAS', sound: 'N-n-nanas!', goalName: 'Pondok Nanas', goalIcon: '🌴' },
    cols: 5, rows: 4,
    start: { x: 0, y: 3 },
    goal: { x: 4, y: 0 },
    layout: [
      ['W', 'W', 'W', 'T', 'G'],
      ['W', 'W', 'T', 'T', 'W'],
      ['T', 'T', 'W', 'W', 'W'],
      ['S', 'W', 'W', 'W', 'W']
    ]
  },
  // Level 15: P - Pesawat
  {
    level: 15,
    title: 'Patroli Jejak Huruf P (Pesawat)',
    targetLetter: 'P',
    clue: { icon: '🚀', name: 'PESAWAT', sound: 'P-p-pesawat!', goalName: 'Stasiun Antariksa', goalIcon: '🌌' },
    cols: 5, rows: 4,
    start: { x: 0, y: 3 },
    goal: { x: 0, y: 0 },
    layout: [
      ['G', 'T', 'T', 'W', 'W'],
      ['T', 'W', 'T', 'W', 'W'],
      ['T', 'T', 'T', 'W', 'W'],
      ['S', 'W', 'W', 'W', 'W']
    ]
  }
];
