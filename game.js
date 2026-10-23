/**
 * Petualangan Belajar Ceria - Platform Edukasi TV Anak
 * Modul: Menu Utama (Hub), Hitung Dino, Tambah Bergambar, & Kereta Abjad A-Z
 */

// ==============================================
// 1. DATA ASSETS & KAMUS PEMBELAJARAN
// ==============================================

const DINO_SVGS = [
  // 1. T-Rex Hijau Lucu
  `<svg viewBox="0 0 160 160" width="105" height="105">
    <ellipse cx="80" cy="95" rx="42" ry="48" fill="#4ade80" />
    <circle cx="95" cy="55" r="32" fill="#4ade80" />
    <path d="M 115 50 Q 140 55 125 70 Z" fill="#4ade80" />
    <circle cx="106" cy="48" r="8" fill="#ffffff" />
    <circle cx="108" cy="48" r="4.5" fill="#1e293b" />
    <circle cx="109" cy="46" r="1.5" fill="#ffffff" />
    <ellipse cx="118" cy="62" rx="5" ry="3" fill="#fb7185" opacity="0.6" />
    <path d="M 100 68 Q 115 78 126 68" stroke="#166534" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <ellipse cx="72" cy="102" rx="26" ry="32" fill="#fef08a" />
    <path d="M 96 90 Q 110 92 108 98" stroke="#4ade80" stroke-width="8" stroke-linecap="round" fill="none" />
    <ellipse cx="65" cy="142" rx="14" ry="9" fill="#22c55e" />
    <ellipse cx="90" cy="142" rx="14" ry="9" fill="#22c55e" />
    <path d="M 45 110 Q 20 120 15 100 Q 25 90 48 95 Z" fill="#4ade80" />
  </svg>`,

  // 2. Brachiosaurus Leher Panjang Kuning
  `<svg viewBox="0 0 160 160" width="105" height="105">
    <ellipse cx="65" cy="110" rx="45" ry="35" fill="#facc15" />
    <path d="M 75 105 Q 98 60 92 35 Q 82 30 75 40 Q 82 65 62 100 Z" fill="#facc15" />
    <circle cx="94" cy="34" r="16" fill="#facc15" />
    <circle cx="99" cy="31" r="5" fill="#ffffff" />
    <circle cx="100" cy="31" r="3" fill="#1e293b" />
    <circle cx="101" cy="30" r="1" fill="#ffffff" />
    <path d="M 95 40 Q 104 44 106 38" stroke="#854d0e" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <circle cx="48" cy="98" r="6" fill="#f97316" />
    <circle cx="62" cy="95" r="8" fill="#f97316" />
    <circle cx="42" cy="115" r="5" fill="#f97316" />
    <rect x="40" y="130" width="14" height="20" rx="7" fill="#eab308" />
    <rect x="75" y="130" width="14" height="20" rx="7" fill="#eab308" />
    <path d="M 30 115 Q 12 110 8 125 Q 18 130 35 125 Z" fill="#facc15" />
  </svg>`,

  // 3. Triceratops Biru Ceria
  `<svg viewBox="0 0 160 160" width="105" height="105">
    <ellipse cx="75" cy="105" rx="42" ry="36" fill="#38bdf8" />
    <circle cx="105" cy="70" r="28" fill="#0284c7" />
    <circle cx="110" cy="78" r="22" fill="#38bdf8" />
    <polygon points="120,55 126,40 128,58" fill="#f8fafc" />
    <polygon points="102,48 106,32 110,50" fill="#f8fafc" />
    <polygon points="128,78 138,76 128,84" fill="#f8fafc" />
    <circle cx="116" cy="72" r="5" fill="#ffffff" />
    <circle cx="117" cy="72" r="3" fill="#0f172a" />
    <ellipse cx="110" cy="85" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6" />
    <path d="M 118 85 Q 124 90 128 85" stroke="#0369a1" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <rect x="52" y="128" width="15" height="18" rx="7" fill="#0284c7" />
    <rect x="85" y="128" width="15" height="18" rx="7" fill="#0284c7" />
    <path d="M 40 115 Q 15 122 18 105 Q 28 102 42 106 Z" fill="#38bdf8" />
  </svg>`,

  // 4. Stegosaurus Ungu Lucu
  `<svg viewBox="0 0 160 160" width="105" height="105">
    <ellipse cx="50" cy="65" rx="10" ry="16" fill="#fb923c" transform="rotate(-15 50 65)" />
    <ellipse cx="72" cy="58" rx="11" ry="18" fill="#fb923c" />
    <ellipse cx="94" cy="65" rx="10" ry="16" fill="#fb923c" transform="rotate(15 94 65)" />
    <ellipse cx="72" cy="105" rx="45" ry="35" fill="#c084fc" />
    <ellipse cx="120" cy="108" rx="16" ry="12" fill="#c084fc" />
    <circle cx="124" cy="104" r="4.5" fill="#ffffff" />
    <circle cx="125" cy="104" r="2.5" fill="#1e1b4b" />
    <path d="M 122 112 Q 128 116 132 112" stroke="#6b21a8" stroke-width="2.5" fill="none" />
    <rect x="48" y="128" width="14" height="18" rx="6" fill="#9333ea" />
    <rect x="82" y="128" width="14" height="18" rx="6" fill="#9333ea" />
    <path d="M 35 110 Q 12 112 10 95 Q 22 98 38 102 Z" fill="#c084fc" />
    <circle cx="10" cy="95" r="4" fill="#fb923c" />
  </svg>`
];

const NUMBER_WORDS = [
  "", "Satu", "Dua", "Tiga", "Empat", "Lima",
  "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh",
  "Sebelas", "Dua Belas", "Tiga Belas", "Empat Belas"
];

// Data Alfabet A - Z untuk Balita dengan Vektor SVG Microsoft Fluent
const ALPHABET_DATA = [
  { file: "a.svg", letter: "A", word: "APEL", phonic: "A! A untuk Apel" },
  { file: "b.svg", letter: "B", word: "BEBEK", phonic: "B! B untuk Bebek" },
  { file: "c.svg", letter: "C", word: "CERI", phonic: "C! C untuk Ceri" },
  { file: "d.svg", letter: "D", word: "DINO", phonic: "D! D untuk Dinosaurus" },
  { file: "e.svg", letter: "E", word: "ELANG", phonic: "E! E untuk Elang" },
  { file: "f.svg", letter: "F", word: "FLAMINGO", phonic: "F! F untuk Flamingo" },
  { file: "g.svg", letter: "G", word: "GAJAH", phonic: "G! G untuk Gajah" },
  { file: "h.svg", letter: "H", word: "HIU", phonic: "H! H untuk Hiu" },
  { file: "i.svg", letter: "I", word: "IKAN", phonic: "I! I untuk Ikan" },
  { file: "j.svg", letter: "J", word: "JERAPAH", phonic: "J! J untuk Jerapah" },
  { file: "k.svg", letter: "K", word: "KUCING", phonic: "K! K untuk Kucing" },
  { file: "l.svg", letter: "L", word: "LUMBA", phonic: "L! L untuk Lumba-lumba" },
  { file: "m.svg", letter: "M", word: "MOBIL", phonic: "M! M untuk Mobil" },
  { file: "n.svg", letter: "N", word: "NANAS", phonic: "N! N untuk Nanas" },
  { file: "o.svg", letter: "O", word: "ORANGUTAN", phonic: "O! O untuk Orangutan" },
  { file: "p.svg", letter: "P", word: "PESAWAT", phonic: "P! P untuk Pesawat" },
  { file: "q.svg", letter: "Q", word: "MAHKOTA", phonic: "Q! Q untuk Mahkota Ratu" },
  { file: "r.svg", letter: "R", word: "ROKET", phonic: "R! R untuk Roket" },
  { file: "s.svg", letter: "S", word: "SINGA", phonic: "S! S untuk Singa" },
  { file: "t.svg", letter: "T", word: "TRUK", phonic: "T! T untuk Truk" },
  { file: "u.svg", letter: "U", word: "UDANG", phonic: "U! U untuk Udang" },
  { file: "v.svg", letter: "V", word: "BIOLA", phonic: "V! V untuk Biola" },
  { file: "w.svg", letter: "W", word: "WORTEL", phonic: "W! W untuk Wortel" },
  { file: "x.svg", letter: "X", word: "MUSIK", phonic: "X! X untuk Tangga Nada" },
  { file: "y.svg", letter: "Y", word: "YOYO", phonic: "Y! Y untuk Yoyo" },
  { file: "z.svg", letter: "Z", word: "ZEBRA", phonic: "Z! Z untuk Zebra" }
];

// ==============================================
// 2. SISTEM AUDIO RAMAH ANAK (WEB AUDIO API)
// ==============================================
class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playNavigate() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(587.33, this.ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }

  playCount(index) {
    this.init();
    const scale = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25];
    const freq = scale[(index - 1) % scale.length];
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.32);
  }

  playCorrect() {
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.37);
      }, i * 90);
    });
  }

  playOops() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.22);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.24);
  }

  playVictory() {
    this.init();
    const melody = [
      { f: 392, d: 0.15 }, { f: 523, d: 0.15 }, { f: 659, d: 0.15 },
      { f: 784, d: 0.35 }, { f: 659, d: 0.15 }, { f: 784, d: 0.6 }
    ];
    let time = 0;
    melody.forEach((note) => {
      setTimeout(() => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + note.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + note.d);
      }, time * 1000);
      time += note.d + 0.05;
    });
  }
}

function speakText(text) {
  if (!text) return;
  window.lastSpokenText = text;
  console.log("TV_SPEECH:" + text);

  // 1. Prioritaskan Android Native Text-to-Speech Bridge (Khusus Android TV & APK)
  if (window.AndroidTTS && typeof window.AndroidTTS.speak === 'function') {
    try {
      window.AndroidTTS.speak(text);
      return;
    } catch (e) {
      console.warn('Native AndroidTTS failed, fallback to Web Speech:', e);
    }
  }

  // 2. Web Speech API (Untuk Browser PC / Chrome / Edge)
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.log('Speech synthesis unavailable');
    }
  }
}

// Efek Konfeti Bintang
class ConfettiCannon {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.isRunning = false;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  fire(amount = 25) {
    const colors = ['#f43f5e', '#38bdf8', '#facc15', '#4ade80', '#c084fc', '#fb923c'];
    for (let i = 0; i < amount; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: this.canvas.height / 2,
        vx: (Math.random() - 0.5) * 20,
        vy: -Math.random() * 16 - 8,
        size: Math.random() * 12 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        opacity: 1
      });
    }

    if (!this.isRunning) {
      this.isRunning = true;
      this.loop();
    }
  }

  loop() {
    if (!this.isRunning) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.5;
      p.rotation += p.rotSpeed;
      p.opacity -= 0.01;

      if (p.opacity <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.loop());
    } else {
      this.isRunning = false;
    }
  }
}


// ==============================================
// 2.2 DATA BENTUK 2D (CAMBRIDGE EARLY YEARS)
// ==============================================
const SHAPES_DATA = [
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
    silhouette: `<svg viewBox="0 0 120 80" width="100" height="70"><rect x="10" y="10" width="100" height="60" rx="12" fill="#94a3b8" opacity="0.35" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/></svg>`  },
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

// ==============================================
// 2.3 DATA WARNA CERIA (CAMBRIDGE EARLY YEARS)
// ==============================================
const COLORS_DATA = [
  {
    id: 'red',
    name: 'Merah',
    english: 'Red',
    hex: '#ef4444',
    icon: '🍎',
    itemText: 'Apel Merah'
  },
  {
    id: 'blue',
    name: 'Biru',
    english: 'Blue',
    hex: '#3b82f6',
    icon: '🚙',
    itemText: 'Mobil Biru'
  },
  {
    id: 'yellow',
    name: 'Kuning',
    english: 'Yellow',
    hex: '#eab308',
    icon: '⭐',
    itemText: 'Bintang Kuning'
  },
  {
    id: 'green',
    name: 'Hijau',
    english: 'Green',
    hex: '#22c55e',
    icon: '🍃',
    itemText: 'Daun Hijau'
  },
  {
    id: 'orange',
    name: 'Jingga / Oranye',
    english: 'Orange',
    hex: '#f97316',
    icon: '🍊',
    itemText: 'Jeruk Oranye'
  },
  {
    id: 'purple',
    name: 'Ungu',
    english: 'Purple',
    hex: '#a855f7',
    icon: '🍇',
    itemText: 'Anggur Ungu'  },
  {
    id: 'pink',
    name: 'Merah Muda',
    english: 'Pink',
    hex: '#ec4899',
    icon: '🌸',
    itemText: 'Bunga Merah Muda'
  },
  {
    id: 'brown',
    name: 'Cokelat',
    english: 'Brown',
    hex: '#92400e',
    icon: '🐻',
    itemText: 'Beruang Cokelat'
  },
  {
    id: 'white',
    name: 'Putih',
    english: 'White',
    hex: '#e2e8f0',
    icon: '🥛',
    itemText: 'Susu Putih'
  },
  {
    id: 'black',
    name: 'Hitam',
    english: 'Black',
    hex: '#1e293b',
    icon: '🐈‍⬛',
    itemText: 'Kucing Hitam'
  }
];


// ==============================================
// 2.4 DATA DETEKTIF BENDA (ODD ONE OUT)
// ==============================================
const ODD_DATA = [
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
    hint: 'Manakah hewan liar yang hidup di rimba hutan?'  },
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

// ==============================================
// 2.5 DATA DETEKTIF WAKTU (URUTAN CERITA)
// ==============================================
const SEQUENCE_DATA = [
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
    explanation: 'Juara! Dari dalam kepompong, keluarlah kupu-kupu yang sangat indah!'  },
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


// ==============================================
// 2.6 DATA TEBAK SUARA HURUF (PHONICS QUIZ)
// ==============================================
const PHONICS_DATA = [
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

// ==============================================
// 2.7 DATA MEMBACA KATA BERGAMBAR (SIGHT WORDS)
// ==============================================
const WORDS_DATA = [
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

// ==============================================
// 3. CORE ROUTER & LEARNING HUB MANAGER
// ==============================================
class LearningHub {
  constructor() {
    this.sound = new SoundFX();
    this.confetti = new ConfettiCannon(document.getElementById('confetti-canvas'));

    // Current State
    this.currentView = 'HUB'; // 'HUB', 'MENU_MATH', 'GAME_COUNTING', 'GAME_ADDITION', 'GAME_ALPHABET'
    this.hubIndex = 0; // 0: Matematika, 1: Abjad, 2: Warna
    this.mathIndex = 0; // 0: Hitung, 1: Tambah
    this.alphabetSubIndex = 0; // 0: Kereta, 1: Phonics, 2: Words
    this.phonicsLevel = 1;
    this.phonicsChoices = [];
    this.phonicsSelectedChoice = 1;
    this.currentPhonicsData = null;

    this.wordsLevel = 1;
    this.wordsChoices = [];
    this.wordsSelectedChoice = 1;
    this.currentWordsData = null;
    this.alphabetIndex = 0; // 0 - 25

    // Game Counting State
    this.countLevel = 1;
    this.countChoices = [];
    this.countSelectedChoice = 1;
    this.isInputLocked = false;

    // Game Addition State
    this.addLevel = 1;
    this.addNum1 = 1;
    this.addNum2 = 1;
    this.addTotal = 2;
    this.addChoices = [];
    this.addSelectedChoice = 1;

    // Sub-Menu Shapes & Colors State
    this.shapesSubIndex = 0; // 0: Sarang Bentuk, 1: Kuas Warna
    this.shapeLevel = 1;
    this.shapeChoices = [];
    this.shapeSelectedChoice = 1;
    this.currentTargetShape = null;

    this.colorLevel = 1;
    this.colorChoices = [];
    this.colorSelectedChoice = 1;
    this.currentTargetColor = null;

    // Sub-Menu Logic Lab State
    this.logicSubIndex = 0; // 0: Odd One Out, 1: Sequence
    this.oddLevel = 1;
    this.oddChoices = [];
    this.oddSelectedChoice = 0;
    this.currentOddData = null;

    this.sequenceLevel = 1;
    this.sequenceChoices = [];
    this.sequenceSelectedChoice = 1;
    this.currentSequenceData = null;

    this.initViews();
    this.attachEvents();
  }

  initViews() {
    this.showView('HUB');
    this.updateHubFocus();
  }

  showView(viewName) {
    if (window.AndroidTTS && typeof window.AndroidTTS.stop === 'function') {
      try { window.AndroidTTS.stop(); } catch (e) {}
    this.reportTVState();
    }
    if ('speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
    this.currentView = viewName;
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById('celebration-overlay').classList.remove('active');
    document.getElementById('victory-overlay').classList.remove('active');

    switch (viewName) {
      case 'HUB':
        document.getElementById('view-hub').classList.add('active');
        this.updateHubFocus();
        speakText("Pilih permainan seru!");
        break;
      case 'MENU_MATH':
        document.getElementById('view-menu-math').classList.add('active');
        this.updateMathFocus();
        speakText("Pilih permainan matematika!");
        break;
      case 'GAME_COUNTING':
        document.getElementById('view-game-counting').classList.add('active');
        this.initCountingGame();
        break;
      case 'GAME_ADDITION':
        document.getElementById('view-game-addition').classList.add('active');
        this.initAdditionGame();
        break;
            case 'MENU_ALPHABET':
        document.getElementById('view-menu-alphabet').classList.add('active');
        this.updateAlphabetMenuFocus();
        speakText("Dunia Abjad dan Literasi Ceria! Pilih permainan huruf!");
        break;
      case 'GAME_PHONICS':
        document.getElementById('view-game-phonics').classList.add('active');
        this.initPhonicsGame();
        break;
      case 'GAME_WORDS':
        document.getElementById('view-game-words').classList.add('active');
        this.initWordsGame();
        break;
      case 'GAME_ALPHABET':
        document.getElementById('view-game-alphabet').classList.add('active');
        this.initAlphabetGame();
        break;
      case 'MENU_SHAPES':
        document.getElementById('view-menu-shapes').classList.add('active');
        this.updateShapesMenuFocus();
        speakText("Pilih permainan warna dan bentuk!");
        break;
      case 'GAME_SHAPES':
        document.getElementById('view-game-shapes').classList.add('active');
        this.initShapesGame();
        break;
      case 'GAME_COLORS':
        document.getElementById('view-game-colors').classList.add('active');
        this.initColorsGame();
        break;
      case 'MENU_LOGIC':
        document.getElementById('view-menu-logic').classList.add('active');
        this.updateLogicMenuFocus();
        speakText("Laboratorium Logika Ceria! Pilih permainan nalar!");
        break;
      case 'GAME_ODD':
        document.getElementById('view-game-odd').classList.add('active');
        this.initOddGame();
        break;
      case 'GAME_SEQUENCE':
        document.getElementById('view-game-sequence').classList.add('active');
        this.initSequenceGame();
        break;
    }
    this.reportTVState();
  }

    getTVState() {
    let activeChoice = null;
    if (this.currentView === 'GAME_COUNTING') activeChoice = this.countSelectedChoice;
    else if (this.currentView === 'GAME_ADDITION') activeChoice = this.addSelectedChoice;
    else if (this.currentView === 'GAME_SHAPES') activeChoice = this.shapeSelectedChoice;
    else if (this.currentView === 'GAME_COLORS') activeChoice = this.colorSelectedChoice;
    else if (this.currentView === 'GAME_ODD') activeChoice = this.oddSelectedChoice;
    else if (this.currentView === 'GAME_SEQUENCE') activeChoice = this.sequenceSelectedChoice;
    else if (this.currentView === 'GAME_PHONICS') activeChoice = this.phonicsSelectedChoice;
    else if (this.currentView === 'GAME_WORDS') activeChoice = this.wordsSelectedChoice;

    return {
      view: this.currentView,
      hubIndex: this.hubIndex,
      mathIndex: this.mathIndex,
      alphabetSubIndex: this.alphabetSubIndex,
      shapesSubIndex: this.shapesSubIndex,
      logicSubIndex: this.logicSubIndex,
      activeChoice: activeChoice,
      countLevel: this.countLevel,
      addLevel: this.addLevel,
      phonicsLevel: this.phonicsLevel,
      wordsLevel: this.wordsLevel,
      shapeLevel: this.shapeLevel,
      colorLevel: this.colorLevel,
      oddLevel: this.oddLevel,
      sequenceLevel: this.sequenceLevel,
      isInputLocked: this.isInputLocked,
      isCelebrationActive: this.isCelebrationActive,
      isVictoryActive: this.isVictoryActive,
      lastSpeech: window.lastSpokenText || null
    };
  }

  reportTVState() {
    window.tvGame = this;
    const state = this.getTVState();
    console.log("TV_STATE:" + JSON.stringify(state));
    return state;
  }

  // --- 3.1 MENU UTAMA (HUB) LOGIC ---
  updateHubFocus() {
    document.querySelectorAll('.hub-card').forEach((card, idx) => {
      if (idx === this.hubIndex) {
        card.classList.add('focused');
      } else {
        card.classList.remove('focused');
      }
    });
  }

  handleHubKey(key) {
    if (key === 'ArrowLeft' && this.hubIndex > 0) {
      this.hubIndex--;
      this.sound.playNavigate();
      this.updateHubFocus();
    } else if (key === 'ArrowRight' && this.hubIndex < 3) {
      this.hubIndex++;
      this.sound.playNavigate();
      this.updateHubFocus();
    } else if (key === 'Enter' || key === ' ') {
      this.sound.playNavigate();
      if (this.hubIndex === 0) {
        this.showView('MENU_MATH');
      } else if (this.hubIndex === 1) {
        this.showView('MENU_ALPHABET');
      } else if (this.hubIndex === 2) {
        this.showView('MENU_SHAPES');
      } else if (this.hubIndex === 3) {
        this.showView('MENU_LOGIC');
      }
    }
  }

  
  // --- 3.2.1 SUB-MENU DUNIA ABJAD LOGIC ---
  updateAlphabetMenuFocus() {
    document.querySelectorAll('#alphabet-menu-grid .sub-card').forEach((card, idx) => {
      if (idx === this.alphabetSubIndex) {
        card.classList.add('focused');
      } else {
        card.classList.remove('focused');
      }
    });
  }

  handleAlphabetMenuKey(key) {
    if (key === 'ArrowLeft' && this.alphabetSubIndex > 0) {
      this.alphabetSubIndex--;
      this.sound.playNavigate();
      this.updateAlphabetMenuFocus();
    } else if (key === 'ArrowRight' && this.alphabetSubIndex < 2) {
      this.alphabetSubIndex++;
      this.sound.playNavigate();
      this.updateAlphabetMenuFocus();
    } else if (key === 'Enter' || key === ' ') {
      this.sound.playNavigate();
      if (this.alphabetSubIndex === 0) {
        this.showView('GAME_ALPHABET');
      } else if (this.alphabetSubIndex === 1) {
        this.showView('GAME_PHONICS');
      } else if (this.alphabetSubIndex === 2) {
        this.showView('GAME_WORDS');
      }
    }
  }

  // ==============================================
  // 6.1 GAME MODUL ABJAD 2: TEBAK SUARA HURUF (PHONICS)
  // ==============================================
  initPhonicsGame() {
    this.phonicsLevel = 1;
    this.initStars('phonics-stars-container', 10);
    this.loadPhonicsLevel(this.phonicsLevel);
  }

  loadPhonicsLevel(lvl) {
    this.isInputLocked = false;
    document.getElementById('phonics-level').innerText = lvl;
    const data = PHONICS_DATA[lvl - 1];
    this.currentPhonicsData = data;

    document.getElementById('phonics-instruction-text').innerText = `Manakah huruf ${data.letter}?`;
    document.getElementById('phonics-prompt-text').innerText = `🎯 Dengarkan suaranya: "${data.soundHint}"`;

    // Acak 3 pilihan huruf
    this.phonicsChoices = [...data.choices].sort(() => Math.random() - 0.5);
    this.phonicsSelectedChoice = 1;

    const container = document.getElementById('phonics-choices-container');
    container.innerHTML = '';
    this.phonicsChoices.forEach((char, idx) => {
      const card = document.createElement('div');
      card.className = `phonics-choice-card ${idx === this.phonicsSelectedChoice ? 'focused' : ''}`;
      card.id = `phonics-choice-${idx}`;
      card.innerText = char;
      card.addEventListener('click', () => {
        this.phonicsSelectedChoice = idx;
        this.updatePhonicsFocus();
        this.handlePhonicsKey('Enter');
      });
      container.appendChild(card);
    });

    speakText(`Manakah huruf ${data.letter}? ${data.soundHint}`);
  }

  updatePhonicsFocus() {
    document.querySelectorAll('.phonics-choice-card').forEach((card, idx) => {
      if (idx === this.phonicsSelectedChoice) {
        card.classList.add('focused');
    this.reportTVState();
      } else {
        card.classList.remove('focused');
      }
    });
  }

  handlePhonicsKey(key) {
    if (this.isInputLocked) return;

    if (key === 'ArrowLeft' && this.phonicsSelectedChoice > 0) {
      this.phonicsSelectedChoice--;
      this.sound.playNavigate();
      this.updatePhonicsFocus();
    } else if (key === 'ArrowRight' && this.phonicsSelectedChoice < this.phonicsChoices.length - 1) {
      this.phonicsSelectedChoice++;
      this.sound.playNavigate();
      this.updatePhonicsFocus();
    } else if (key === 'ArrowUp') {
      speakText(`Manakah huruf ${this.currentPhonicsData.letter}? ${this.currentPhonicsData.soundHint}`);
    } else if (key === 'Enter' || key === ' ') {
      const chosen = this.phonicsChoices[this.phonicsSelectedChoice];
      const card = document.getElementById(`phonics-choice-${this.phonicsSelectedChoice}`);

      if (chosen === this.currentPhonicsData.letter) {
        this.isInputLocked = true;
        card.classList.add('correct');
        this.sound.playCorrect();
        this.confetti.fire(35);
        this.updateStar(this.phonicsLevel, 'phonics-stars-container');

        speakText(`Hebat sekali! Benar, ini huruf ${chosen}!`);

        setTimeout(() => {
          if (this.phonicsLevel >= 10) {
            this.showVictory();
          } else {
            this.showCelebration(`Huruf ${chosen} Berhasil Ditemukan!`, () => {
              this.phonicsLevel++;
              this.loadPhonicsLevel(this.phonicsLevel);
            });
          }
        }, 1200);
      } else {
        card.classList.add('wrong');
        this.sound.playOops();
        speakText(`Itu huruf ${chosen}. Ayo cari huruf ${this.currentPhonicsData.letter} ya!`);
        setTimeout(() => card.classList.remove('wrong'), 500);
      }
    }
  }

  // ==============================================
  // 6.2 GAME MODUL ABJAD 3: MEMBACA KATA BERGAMBAR (WORDS)
  // ==============================================
  initWordsGame() {
    this.wordsLevel = 1;
    this.initStars('words-stars-container', 10);
    this.loadWordsLevel(this.wordsLevel);
  }

  loadWordsLevel(lvl) {
    this.isInputLocked = false;
    document.getElementById('words-level').innerText = lvl;
    const data = WORDS_DATA[lvl - 1];
    this.currentWordsData = data;

    document.getElementById('words-image-wrapper').innerHTML = `<img src="assets/images/alphabet/${data.image}" alt="${data.word}">`;
    document.getElementById('words-helper-label').innerText = data.helper;
    document.getElementById('words-instruction-text').innerText = `Manakah tulisan kata ${data.word}?`;

    // Acak 3 pilihan kata
    this.wordsChoices = [...data.choices].sort(() => Math.random() - 0.5);
    this.wordsSelectedChoice = 1;

    const container = document.getElementById('words-choices-container');
    container.innerHTML = '';
    this.wordsChoices.forEach((word, idx) => {
      const card = document.createElement('div');
      card.className = `words-choice-card ${idx === this.wordsSelectedChoice ? 'focused' : ''}`;
      card.id = `words-choice-${idx}`;
      card.innerText = word;
      card.addEventListener('click', () => {
        this.wordsSelectedChoice = idx;
        this.updateWordsFocus();
        this.handleWordsKey('Enter');
      });
      container.appendChild(card);
    });

    speakText(`Manakah kata ${data.word}? ${data.helper}`);
  }

  updateWordsFocus() {
    document.querySelectorAll('.words-choice-card').forEach((card, idx) => {
      if (idx === this.wordsSelectedChoice) {
        card.classList.add('focused');
    this.reportTVState();
      } else {
        card.classList.remove('focused');
      }
    });
  }

  handleWordsKey(key) {
    if (this.isInputLocked) return;

    if (key === 'ArrowLeft' && this.wordsSelectedChoice > 0) {
      this.wordsSelectedChoice--;
      this.sound.playNavigate();
      this.updateWordsFocus();
    } else if (key === 'ArrowRight' && this.wordsSelectedChoice < this.wordsChoices.length - 1) {
      this.wordsSelectedChoice++;
      this.sound.playNavigate();
      this.updateWordsFocus();
    } else if (key === 'ArrowUp') {
      speakText(`Manakah tulisan kata ${this.currentWordsData.word}?`);
    } else if (key === 'Enter' || key === ' ') {
      const chosen = this.wordsChoices[this.wordsSelectedChoice];
      const card = document.getElementById(`words-choice-${this.wordsSelectedChoice}`);

      if (chosen === this.currentWordsData.word) {
        this.isInputLocked = true;
        card.classList.add('correct');
        this.sound.playCorrect();
        this.confetti.fire(35);
        this.updateStar(this.wordsLevel, 'words-stars-container');

        // Dieja hurufnya
        const spelled = chosen.split('').join(' ');
        speakText(`Pintar sekali! ${spelled}, ${chosen}!`);

        setTimeout(() => {
          if (this.wordsLevel >= 10) {
            this.showVictory();
          } else {
            this.showCelebration(`Kata ${chosen} Berhasil Dibaca!`, () => {
              this.wordsLevel++;
              this.loadWordsLevel(this.wordsLevel);
            });
          }
        }, 1200);
      } else {
        card.classList.add('wrong');
        this.sound.playOops();
        speakText(`Itu kata ${chosen}. Ayo cari kata ${this.currentWordsData.word} ya!`);
        setTimeout(() => card.classList.remove('wrong'), 500);
      }
    }
  }

  // --- 3.2 SUB-MENU MATEMATIKA LOGIC ---
  updateMathFocus() {
    document.querySelectorAll('.sub-card').forEach((card, idx) => {
      if (idx === this.mathIndex) {
        card.classList.add('focused');
      } else {
        card.classList.remove('focused');
      }
    });
  }

  handleMathKey(key) {
    if (key === 'ArrowLeft' && this.mathIndex > 0) {
      this.mathIndex--;
      this.sound.playNavigate();
      this.updateMathFocus();
    } else if (key === 'ArrowRight' && this.mathIndex < 1) {
      this.mathIndex++;
      this.sound.playNavigate();
      this.updateMathFocus();
    } else if (key === 'Enter' || key === ' ') {
      this.sound.playNavigate();
      if (this.mathIndex === 0) {
        this.showView('GAME_COUNTING');
      } else if (this.mathIndex === 1) {
        this.showView('GAME_ADDITION');
      }
    }
  }

  // ==============================================
  // 4. GAME MODUL 1: HITUNG DINOSAURUS (1-10)
  // ==============================================
  initCountingGame() {
    this.countLevel = 1;
    this.initStars('stars-container');
    this.loadCountingLevel(this.countLevel);
  }

  initStars(containerId, max = 10) {
    const cont = document.getElementById(containerId);
    if (!cont) return;
    cont.innerHTML = '';
    for (let i = 1; i <= max; i++) {
      const star = document.createElement('span');
      star.classList.add('star');
      star.id = `${containerId}-star-${i}`;
      star.innerText = '★';
      cont.appendChild(star);
    }
  }

  updateStar(lvl, containerId) {
    if (!containerId) return;
    const star = document.getElementById(`${containerId}-star-${lvl}`);
    if (star) star.classList.add('earned');
  }

  loadCountingLevel(lvl) {
    this.countLevel = lvl;
    document.getElementById('current-level').innerText = lvl;
    this.isInputLocked = false;

    // Render Dino
    const arena = document.getElementById('dino-arena');
    arena.innerHTML = '';
    arena.classList.remove('sparse', 'dense');
    if (lvl <= 3) arena.classList.add('sparse');
    else if (lvl >= 7) arena.classList.add('dense');

    for (let i = 1; i <= lvl; i++) {
      const card = document.createElement('div');
      card.classList.add('dino-card');
      card.innerHTML = `
        <div class="dino-number-tag">${i}</div>
        <div>${DINO_SVGS[(i - 1) % DINO_SVGS.length]}</div>
      `;
      arena.appendChild(card);
    }

    // Pilihan Telur
    this.generateEggs('choices-container', lvl, (chosen) => {
      this.submitCountingAnswer(chosen);
    });

    this.countSelectedChoice = 1;
    this.updateEggFocus('choices-container', this.countSelectedChoice);
    speakText(`Tingkat ${lvl}. Ada berapa dinosaurus?`);
  }

  generateEggs(containerId, correct, onClickCallback) {
    const pool = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(n => n !== correct);
    pool.sort((a, b) => Math.abs(a - correct) - Math.abs(b - correct));
    const wrong1 = pool[0];
    const wrong2 = pool[1];
    const choices = [correct, wrong1, wrong2].sort(() => Math.random() - 0.5);

    if (containerId === 'choices-container') this.countChoices = choices;
    else this.addChoices = choices;

    const container = document.getElementById(containerId);
    container.innerHTML = '';
    choices.forEach((num, idx) => {
      const egg = document.createElement('div');
      egg.classList.add('egg-choice');
      egg.id = `${containerId}-egg-${idx}`;
      egg.innerText = num;
      egg.addEventListener('click', () => {
        if (containerId === 'choices-container') this.countSelectedChoice = idx;
        else this.addSelectedChoice = idx;
        this.updateEggFocus(containerId, idx);
        onClickCallback(num);
    this.reportTVState();
      });
      container.appendChild(egg);
    });
  }

  updateEggFocus(containerId, activeIdx) {
    document.querySelectorAll(`#${containerId} .egg-choice`).forEach((egg, idx) => {
      if (idx === activeIdx) egg.classList.add('focused');
      else egg.classList.remove('focused');
    });
  }

  handleCountingKey(key) {
    if (this.isInputLocked) return;

    if (key === 'ArrowLeft' && this.countSelectedChoice > 0) {
      this.countSelectedChoice--;
      this.sound.playNavigate();
      this.updateEggFocus('choices-container', this.countSelectedChoice);
    } else if (key === 'ArrowRight' && this.countSelectedChoice < 2) {
      this.countSelectedChoice++;
      this.sound.playNavigate();
      this.updateEggFocus('choices-container', this.countSelectedChoice);
    } else if (key === 'ArrowUp') {
      this.countAlong('dino-arena');
    } else if (key === 'Enter' || key === ' ') {
      const chosen = this.countChoices[this.countSelectedChoice];
      this.submitCountingAnswer(chosen);
    }
  }

  countAlong(arenaId) {
    if (this.isInputLocked) return;
    this.isInputLocked = true;
    const cards = document.querySelectorAll(`#${arenaId} .dino-card`);
    cards.forEach(c => c.classList.remove('counted'));

    let cur = 0;
    const interval = setInterval(() => {
      if (cur < cards.length) {
        cards[cur].classList.add('counted');
        const n = cur + 1;
        this.sound.playCount(n);
        speakText(NUMBER_WORDS[n]);
        cur++;
      } else {
        clearInterval(interval);
        setTimeout(() => { this.isInputLocked = false; }, 500);
      }
    }, 700);
  }

  submitCountingAnswer(chosen) {
    if (this.isInputLocked) return;
    const egg = document.getElementById(`choices-container-egg-${this.countSelectedChoice}`);

    if (chosen === this.countLevel) {
      this.isInputLocked = true;
      egg.classList.add('correct');
      this.sound.playCorrect();
      this.confetti.fire(60);

      const star = document.getElementById(`stars-container-star-${this.countLevel}`);
      if (star) star.classList.add('earned');

      speakText(`Hebat! Ada ${this.countLevel} dinosaurus!`);

      setTimeout(() => {
        if (this.countLevel >= 10) {
          this.showVictory();
        } else {
          this.showCelebration(`Benar! Ada ${this.countLevel} Dinosaurus!`, () => {
            this.loadCountingLevel(this.countLevel + 1);
          });
        }
      }, 1200);
    } else {
      this.sound.playOops();
      egg.classList.add('wrong');
      speakText("Coba hitung lagi ya!");
      setTimeout(() => egg.classList.remove('wrong'), 500);
    }
  }

  // ==============================================
  // 5. GAME MODUL 2: PENJUMLAHAN BERGAMBAR (ADDITION)
  // ==============================================
  initAdditionGame() {
    this.addLevel = 1;
    this.initStars('add-stars-container');
    this.loadAdditionLevel(this.addLevel);
  }

  loadAdditionLevel(lvl) {
    this.addLevel = lvl;
    document.getElementById('add-level').innerText = lvl;
    this.isInputLocked = false;

    // Soal bergambar bertahap untuk anak 4 tahun
    const additionProblems = [
      { a: 1, b: 1 }, // Lvl 1: 1 + 1 = 2
      { a: 2, b: 1 }, // Lvl 2: 2 + 1 = 3
      { a: 1, b: 2 }, // Lvl 3: 1 + 2 = 3
      { a: 2, b: 2 }, // Lvl 4: 2 + 2 = 4
      { a: 3, b: 1 }, // Lvl 5: 3 + 1 = 4
      { a: 3, b: 2 }, // Lvl 6: 3 + 2 = 5
      { a: 2, b: 3 }, // Lvl 7: 2 + 3 = 5
      { a: 4, b: 1 }, // Lvl 8: 4 + 1 = 5
      { a: 3, b: 3 }, // Lvl 9: 3 + 3 = 6
      { a: 4, b: 2 }  // Lvl 10: 4 + 2 = 6
    ];

    const curProblem = additionProblems[lvl - 1];
    this.addNum1 = curProblem.a;
    this.addNum2 = curProblem.b;
    this.addTotal = curProblem.a + curProblem.b;

    // Render Grup 1 & Grup 2 Dino
    const g1 = document.getElementById('add-group-1');
    const g2 = document.getElementById('add-group-2');
    g1.innerHTML = '';
    g2.innerHTML = '';

    for (let i = 0; i < this.addNum1; i++) {
      g1.innerHTML += DINO_SVGS[0]; // T-Rex Hijau
    }
    for (let i = 0; i < this.addNum2; i++) {
      g2.innerHTML += DINO_SVGS[1]; // Brachio Kuning
    }

    // Pilihan Telur
    this.generateEggs('add-choices-container', this.addTotal, (chosen) => {
      this.submitAdditionAnswer(chosen);
    });

    this.addSelectedChoice = 1;
    this.updateEggFocus('add-choices-container', this.addSelectedChoice);
    speakText(`${this.addNum1} ditambah ${this.addNum2}, totalnya berapa?`);
  }

  handleAdditionKey(key) {
    if (this.isInputLocked) return;

    if (key === 'ArrowLeft' && this.addSelectedChoice > 0) {
      this.addSelectedChoice--;
      this.sound.playNavigate();
      this.updateEggFocus('add-choices-container', this.addSelectedChoice);
    } else if (key === 'ArrowRight' && this.addSelectedChoice < 2) {
      this.addSelectedChoice++;
      this.sound.playNavigate();
      this.updateEggFocus('add-choices-container', this.addSelectedChoice);
    } else if (key === 'ArrowUp') {
      speakText(`${this.addNum1} dinosaurus hijau ditambah ${this.addNum2} dinosaurus kuning.`);
    } else if (key === 'Enter' || key === ' ') {
      const chosen = this.addChoices[this.addSelectedChoice];
      this.submitAdditionAnswer(chosen);
    }
  }

  submitAdditionAnswer(chosen) {
    if (this.isInputLocked) return;
    const egg = document.getElementById(`add-choices-container-egg-${this.addSelectedChoice}`);

    if (chosen === this.addTotal) {
      this.isInputLocked = true;
      egg.classList.add('correct');
      this.sound.playCorrect();
      this.confetti.fire(60);

      const star = document.getElementById(`add-stars-container-star-${this.addLevel}`);
      if (star) star.classList.add('earned');

      speakText(`Pintar sekali! ${this.addNum1} ditambah ${this.addNum2} sama dengan ${this.addTotal}!`);

      setTimeout(() => {
        if (this.addLevel >= 10) {
          this.showVictory();
        } else {
          this.showCelebration(`Benar! ${this.addNum1} + ${this.addNum2} = ${this.addTotal}!`, () => {
            this.loadAdditionLevel(this.addLevel + 1);
          });
        }
      }, 1200);
    } else {
      this.sound.playOops();
      egg.classList.add('wrong');
      speakText("Coba hitung lagi ya!");
      setTimeout(() => egg.classList.remove('wrong'), 500);
    }
  }

  // ==============================================
  // 6. GAME MODUL 3: DUNIA ABJAD A - Z
  // ==============================================
  initAlphabetGame() {
    this.alphabetIndex = 0;
    this.renderAlphabetCard();
  }

  renderAlphabetCard() {
    const item = ALPHABET_DATA[this.alphabetIndex];
    document.getElementById('current-letter-index').innerText = this.alphabetIndex + 1;
    document.getElementById('letter-giant').innerText = item.letter;
    document.getElementById('letter-illustration').innerHTML = `<img src="assets/images/alphabet/${item.file}" alt="${item.word}">`;
    document.getElementById('letter-word').innerText = item.word;
    document.getElementById('letter-phonic').innerText = item.phonic;

    this.sound.playNavigate();
    speakText(item.phonic);
  }

  handleAlphabetKey(key) {
    if (key === 'ArrowLeft') {
      if (this.alphabetIndex > 0) {
        this.alphabetIndex--;
        this.renderAlphabetCard();
      }
    } else if (key === 'ArrowRight') {
      if (this.alphabetIndex < ALPHABET_DATA.length - 1) {
        this.alphabetIndex++;
        this.renderAlphabetCard();
      }
    } else if (key === 'Enter' || key === ' ' || key === 'ArrowUp') {
      const item = ALPHABET_DATA[this.alphabetIndex];
      speakText(item.phonic);
    }
  }


  // ==============================================
  // 6.1 SUB-MENU WARNA & BENTUK LOGIC
  // ==============================================
  updateShapesMenuFocus() {
    document.querySelectorAll('#shapes-menu-grid .sub-card').forEach((card, idx) => {
      if (idx === this.shapesSubIndex) {
        card.classList.add('focused');
      } else {
        card.classList.remove('focused');
      }
    });
  }

  handleShapesMenuKey(key) {
    if (key === 'ArrowLeft' && this.shapesSubIndex > 0) {
      this.shapesSubIndex--;
      this.sound.playNavigate();
      this.updateShapesMenuFocus();
    } else if (key === 'ArrowRight' && this.shapesSubIndex < 1) {
      this.shapesSubIndex++;
      this.sound.playNavigate();
      this.updateShapesMenuFocus();
    } else if (key === 'Enter' || key === ' ') {
      this.sound.playNavigate();
      if (this.shapesSubIndex === 0) {
        this.showView('GAME_SHAPES');
      } else if (this.shapesSubIndex === 1) {
        this.showView('GAME_COLORS');
      }
    }
  }

  // ==============================================
  // 6.2 GAME MODUL 4: SARANG BENTUK AJAIB
  // ==============================================
  initShapesGame() {
    this.shapeLevel = 1;
    this.initStars('shape-stars-container', 10);
    this.loadShapeLevel(this.shapeLevel);
  }

  loadShapeLevel(lvl) {
    this.isInputLocked = false;
    document.getElementById('shape-level').innerText = lvl;
    const target = SHAPES_DATA[lvl - 1];
    this.currentTargetShape = target;

    // Render siluet sarang
    const slot = document.getElementById('shape-nest-slot');
    slot.classList.remove('matched');
    document.getElementById('shape-nest-outline').innerHTML = target.silhouette;
    document.getElementById('shape-nest-label').innerText = `Sarang ${target.name}`;

    // Buat 3 pilihan bentuk (1 benar + 2 distractor)
    const otherShapes = SHAPES_DATA.filter(s => s.id !== target.id);
    const shuffledOthers = [...otherShapes].sort(() => Math.random() - 0.5);
    this.shapeChoices = [target, shuffledOthers[0], shuffledOthers[1]].sort(() => Math.random() - 0.5);
    this.shapeSelectedChoice = 1;

    const container = document.getElementById('shape-choices-container');
    container.innerHTML = '';
    this.shapeChoices.forEach((choice, idx) => {
      const card = document.createElement('div');
      card.className = `shape-card-choice ${idx === this.shapeSelectedChoice ? 'focused' : ''}`;
      card.id = `shape-choice-${idx}`;
      card.innerHTML = `
        <div class="shape-preview">${choice.svg}</div>
        <div class="shape-name-tag">${choice.name}</div>
      `;
      card.addEventListener('click', () => {
        this.shapeSelectedChoice = idx;
        this.updateShapeFocus();
        this.handleShapesKey('Enter');
      });
      container.appendChild(card);
    });

    speakText(`Bentuk apakah yang cocok di sarang? Pasang ${target.name}! ${target.english}!`);
  }

  updateShapeFocus() {
    document.querySelectorAll('.shape-card-choice').forEach((card, idx) => {
      if (idx === this.shapeSelectedChoice) {
        card.classList.add('focused');
    this.reportTVState();
      } else {
        card.classList.remove('focused');
      }
    });
  }

  handleShapesKey(key) {
    if (this.isInputLocked) return;

    if (key === 'ArrowLeft' && this.shapeSelectedChoice > 0) {
      this.shapeSelectedChoice--;
      this.sound.playNavigate();
      this.updateShapeFocus();
    } else if (key === 'ArrowRight' && this.shapeSelectedChoice < this.shapeChoices.length - 1) {
      this.shapeSelectedChoice++;
      this.sound.playNavigate();
      this.updateShapeFocus();
    } else if (key === 'Enter' || key === ' ') {
      const chosen = this.shapeChoices[this.shapeSelectedChoice];
      const card = document.getElementById(`shape-choice-${this.shapeSelectedChoice}`);
      if (chosen.id === this.currentTargetShape.id) {
        this.isInputLocked = true;
        card.classList.add('correct');
        this.sound.playCorrect();
        this.confetti.fire(35);
        this.updateStar(this.shapeLevel, 'shape-stars-container');

        const slot = document.getElementById('shape-nest-slot');
        slot.classList.add('matched');
        document.getElementById('shape-nest-outline').innerHTML = chosen.svg;
        document.getElementById('shape-nest-label').innerText = `${chosen.name} Pas!`;

        speakText(`Pintar sekali! Bentuk ${chosen.name}! ${chosen.english}!`);

        setTimeout(() => {
          if (this.shapeLevel >= 10) {
            this.showVictory();
          } else {
            this.showCelebration(`Bentuk ${chosen.name} Masuk ke Sarang!`, () => {
              this.shapeLevel++;
              this.loadShapeLevel(this.shapeLevel);
            });
          }
        }, 1100);
      } else {
        card.classList.add('wrong');
        this.sound.playOops();
        speakText(`Coba cari bentuk ${this.currentTargetShape.name} ya!`);
        setTimeout(() => card.classList.remove('wrong'), 500);
      }
    }
  }

  // ==============================================
  // 6.3 GAME MODUL 5: KUAS WARNA CERIA
  // ==============================================
  initColorsGame() {
    this.colorLevel = 1;
    this.initStars('color-stars-container', 10);
    this.loadColorLevel(this.colorLevel);
  }

  loadColorLevel(lvl) {
    this.isInputLocked = false;
    document.getElementById('color-level').innerText = lvl;
    const target = COLORS_DATA[lvl - 1];
    this.currentTargetColor = target;

    // Render target display
    document.getElementById('color-splash-preview').innerHTML = `<span style="font-size: 4rem;">${target.icon}</span>`;
    document.getElementById('color-prompt-badge').innerHTML = `<span style="color: ${target.hex};">${target.name.toUpperCase()}</span> / ${target.english.toUpperCase()}`;
    document.getElementById('color-instruction-text').innerText = `Manakah warna ${target.name}?`;

    // Buat 3 pilihan warna (1 benar + 2 distractor)
    const otherColors = COLORS_DATA.filter(c => c.id !== target.id);
    const shuffledOthers = [...otherColors].sort(() => Math.random() - 0.5);
    this.colorChoices = [target, shuffledOthers[0], shuffledOthers[1]].sort(() => Math.random() - 0.5);
    this.colorSelectedChoice = 1;

    const container = document.getElementById('color-choices-container');
    container.innerHTML = '';
    this.colorChoices.forEach((choice, idx) => {
      const card = document.createElement('div');
      card.className = `color-card-choice ${idx === this.colorSelectedChoice ? 'focused' : ''}`;
      card.id = `color-choice-${idx}`;
      card.innerHTML = `
        <div class="color-swatch-circle" style="background: ${choice.hex};"></div>
        <div class="color-name-label">${choice.name}</div>
      `;
      card.addEventListener('click', () => {
        this.colorSelectedChoice = idx;
        this.updateColorFocus();
        this.handleColorsKey('Enter');
      });
      container.appendChild(card);
    });

    speakText(`Manakah warna ${target.name}? ${target.english}!`);
  }

  updateColorFocus() {
    document.querySelectorAll('.color-card-choice').forEach((card, idx) => {
      if (idx === this.colorSelectedChoice) {
        card.classList.add('focused');
    this.reportTVState();
      } else {
        card.classList.remove('focused');
      }
    });
  }

  handleColorsKey(key) {
    if (this.isInputLocked) return;

    if (key === 'ArrowLeft' && this.colorSelectedChoice > 0) {
      this.colorSelectedChoice--;
      this.sound.playNavigate();
      this.updateColorFocus();
    } else if (key === 'ArrowRight' && this.colorSelectedChoice < this.colorChoices.length - 1) {
      this.colorSelectedChoice++;
      this.sound.playNavigate();
      this.updateColorFocus();
    } else if (key === 'Enter' || key === ' ') {
      const chosen = this.colorChoices[this.colorSelectedChoice];
      const card = document.getElementById(`color-choice-${this.colorSelectedChoice}`);
      if (chosen.id === this.currentTargetColor.id) {
        this.isInputLocked = true;
        card.classList.add('correct');
        this.sound.playCorrect();
        this.confetti.fire(35);
        this.updateStar(this.colorLevel, 'color-stars-container');

        speakText(`Pintar sekali! Ini warna ${chosen.name}! ${chosen.english}!`);

        setTimeout(() => {
          if (this.colorLevel >= 10) {
            this.showVictory();
          } else {
            this.showCelebration(`Warna ${chosen.name} Berhasil Ditemukan!`, () => {
              this.colorLevel++;
              this.loadColorLevel(this.colorLevel);
            });
          }
        }, 1100);
      } else {
        card.classList.add('wrong');
        this.sound.playOops();
        speakText(`Coba cari warna ${this.currentTargetColor.name} ya!`);
        setTimeout(() => card.classList.remove('wrong'), 500);
      }
    }
  }


  // ==============================================
  // 6.4 SUB-MENU LABORATORIUM LOGIKA CERIA
  // ==============================================
  updateLogicMenuFocus() {
    document.querySelectorAll('#logic-menu-grid .sub-card').forEach((card, idx) => {
      if (idx === this.logicSubIndex) {
        card.classList.add('focused');
      } else {
        card.classList.remove('focused');
      }
    });
  }

  handleLogicMenuKey(key) {
    if (key === 'ArrowLeft' && this.logicSubIndex > 0) {
      this.logicSubIndex--;
      this.sound.playNavigate();
      this.updateLogicMenuFocus();
    } else if (key === 'ArrowRight' && this.logicSubIndex < 1) {
      this.logicSubIndex++;
      this.sound.playNavigate();
      this.updateLogicMenuFocus();
    } else if (key === 'Enter' || key === ' ') {
      this.sound.playNavigate();
      if (this.logicSubIndex === 0) {
        this.showView('GAME_ODD');
      } else if (this.logicSubIndex === 1) {
        this.showView('GAME_SEQUENCE');
      }
    }
  }

  // ==============================================
  // 6.5 GAME MODUL 6: DETEKTIF BENDA (ODD ONE OUT)
  // ==============================================
  initOddGame() {
    this.oddLevel = 1;
    this.initStars('odd-stars-container', 10);
    this.loadOddLevel(this.oddLevel);
  }

  loadOddLevel(lvl) {
    this.isInputLocked = false;
    document.getElementById('odd-level').innerText = lvl;
    const data = ODD_DATA[lvl - 1];
    this.currentOddData = data;

    // Acak posisi 4 kartu
    this.oddChoices = [...data.items].sort(() => Math.random() - 0.5);
    this.oddSelectedChoice = 0;

    const container = document.getElementById('odd-choices-container');
    container.innerHTML = '';
    this.oddChoices.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = `odd-card-choice ${idx === this.oddSelectedChoice ? 'focused' : ''}`;
      card.id = `odd-choice-${idx}`;
      card.innerHTML = `
        <div class="odd-icon">${item.icon}</div>
        <div class="odd-name">${item.name}</div>
      `;
      card.addEventListener('click', () => {
        this.oddSelectedChoice = idx;
        this.updateOddFocus();
        this.handleOddKey('Enter');
      });
      container.appendChild(card);
    });

    speakText(`Tingkat ${lvl}. ${data.hint}`);
  }

  updateOddFocus() {
    document.querySelectorAll('.odd-card-choice').forEach((card, idx) => {
      if (idx === this.oddSelectedChoice) {
        card.classList.add('focused');
    this.reportTVState();
      } else {
        card.classList.remove('focused');
      }
    });
  }

  handleOddKey(key) {
    if (this.isInputLocked) return;

    if (key === 'ArrowLeft' && this.oddSelectedChoice > 0) {
      this.oddSelectedChoice--;
      this.sound.playNavigate();
      this.updateOddFocus();
    } else if (key === 'ArrowRight' && this.oddSelectedChoice < this.oddChoices.length - 1) {
      this.oddSelectedChoice++;
      this.sound.playNavigate();
      this.updateOddFocus();
    } else if (key === 'Enter' || key === ' ') {
      const chosen = this.oddChoices[this.oddSelectedChoice];
      const card = document.getElementById(`odd-choice-${this.oddSelectedChoice}`);

      if (chosen.isOdd) {
        this.isInputLocked = true;
        card.classList.add('correct');
        this.sound.playCorrect();
        this.confetti.fire(35);
        this.updateStar(this.oddLevel, 'odd-stars-container');

        speakText(`Hebat sekali! ${chosen.reason}`);

        setTimeout(() => {
          if (this.oddLevel >= 10) {
            this.showVictory();
          } else {
            this.showCelebration(`Detektif Cilik Berhasil Menemukan Jawaban!`, () => {
              this.oddLevel++;
              this.loadOddLevel(this.oddLevel);
            });
          }
        }, 1200);
      } else {
        card.classList.add('wrong');
        this.sound.playOops();
        speakText(`${chosen.name} adalah ${this.currentOddData.categoryName}. Ayo cari yang berbeda ya!`);
        setTimeout(() => card.classList.remove('wrong'), 500);
      }
    }
  }

  // ==============================================
  // 6.6 GAME MODUL 7: DETEKTIF WAKTU (URUTAN CERITA)
  // ==============================================
  initSequenceGame() {
    this.sequenceLevel = 1;
    this.initStars('sequence-stars-container', 10);
    this.loadSequenceLevel(this.sequenceLevel);
  }

  loadSequenceLevel(lvl) {
    this.isInputLocked = false;
    document.getElementById('sequence-level').innerText = lvl;
    const data = SEQUENCE_DATA[lvl - 1];
    this.currentSequenceData = data;

    // Render 3 petak urutan cerita (Langkah 1, Langkah 2, dan Slot 3)
    const strip = document.getElementById('sequence-story-strip');
    strip.innerHTML = `
      <div class="sequence-step-card">
        <span class="sequence-step-badge">Mulai</span>
        <div class="sequence-step-icon">${data.step1.icon}</div>
        <div class="sequence-step-text">${data.step1.text}</div>
      </div>
      <div class="sequence-arrow">➜</div>
      <div class="sequence-step-card">
        <span class="sequence-step-badge">Lalu</span>
        <div class="sequence-step-icon">${data.step2.icon}</div>
        <div class="sequence-step-text">${data.step2.text}</div>
      </div>
      <div class="sequence-arrow">➜</div>
      <div class="sequence-step-card target-slot" id="sequence-target-slot">
        <span class="sequence-step-badge">Hasilnya?</span>
        <div class="sequence-step-icon">❓</div>
        <div class="sequence-step-text">Pilih Lanjutan</div>
      </div>
    `;

    // Buat 3 pilihan jawaban (1 benar + 2 distractor)
    const allChoices = [data.correctChoice, ...data.distractors];
    this.sequenceChoices = [...allChoices].sort(() => Math.random() - 0.5);
    this.sequenceSelectedChoice = 1;

    const container = document.getElementById('sequence-choices-container');
    container.innerHTML = '';
    this.sequenceChoices.forEach((choice, idx) => {
      const card = document.createElement('div');
      card.className = `sequence-choice-card ${idx === this.sequenceSelectedChoice ? 'focused' : ''}`;
      card.id = `sequence-choice-${idx}`;
      card.innerHTML = `
        <div class="seq-icon">${choice.icon}</div>
        <div class="seq-name">${choice.text}</div>
      `;
      card.addEventListener('click', () => {
        this.sequenceSelectedChoice = idx;
        this.updateSequenceFocus();
        this.handleSequenceKey('Enter');
      });
      container.appendChild(card);
    });

    speakText(`Cerita ${data.title}. ${data.targetPrompt}`);
  }

  updateSequenceFocus() {
    document.querySelectorAll('.sequence-choice-card').forEach((card, idx) => {
      if (idx === this.sequenceSelectedChoice) {
        card.classList.add('focused');
    this.reportTVState();
      } else {
        card.classList.remove('focused');
      }
    });
  }

  handleSequenceKey(key) {
    if (this.isInputLocked) return;

    if (key === 'ArrowLeft' && this.sequenceSelectedChoice > 0) {
      this.sequenceSelectedChoice--;
      this.sound.playNavigate();
      this.updateSequenceFocus();
    } else if (key === 'ArrowRight' && this.sequenceSelectedChoice < this.sequenceChoices.length - 1) {
      this.sequenceSelectedChoice++;
      this.sound.playNavigate();
      this.updateSequenceFocus();
    } else if (key === 'Enter' || key === ' ') {
      const chosen = this.sequenceChoices[this.sequenceSelectedChoice];
      const card = document.getElementById(`sequence-choice-${this.sequenceSelectedChoice}`);

      if (chosen.id === this.currentSequenceData.correctChoice.id) {
        this.isInputLocked = true;
        card.classList.add('correct');
        this.sound.playCorrect();
        this.confetti.fire(35);
        this.updateStar(this.sequenceLevel, 'sequence-stars-container');

        // Isi slot target
        const slot = document.getElementById('sequence-target-slot');
        slot.classList.add('filled');
        slot.innerHTML = `
          <span class="sequence-step-badge" style="background: #16a34a;">3. Selesai!</span>
          <div class="sequence-step-icon">${chosen.icon}</div>
          <div class="sequence-step-text" style="color: #15803d; font-weight: 900;">${chosen.text}</div>
        `;

        speakText(this.currentSequenceData.explanation);

        setTimeout(() => {
          if (this.sequenceLevel >= 10) {
            this.showVictory();
          } else {
            this.showCelebration(`Urutan Cerita Berhasil Disusun!`, () => {
              this.sequenceLevel++;
              this.loadSequenceLevel(this.sequenceLevel);
            });
          }
        }, 1200);
      } else {
        card.classList.add('wrong');
        this.sound.playOops();
        speakText(`Coba pikirkan lagi, apa yang terjadi selanjutnya ya?`);
        setTimeout(() => card.classList.remove('wrong'), 500);
      }
    }
  }

  // ==============================================
  // 7. SELEBRASI & KEMENANGAN OVERLAY
  // ==============================================
  showCelebration(msg, onNextCallback) {
    this.isCelebrationActive = true;
    this.nextLevelCallback = onNextCallback;
    document.getElementById('celebration-message').innerText = msg;
    document.getElementById('celebration-overlay').classList.add('active');
  }

  showVictory() {
    this.isVictoryActive = true;
    this.sound.playVictory();
    this.confetti.fire(160);
    document.getElementById('victory-overlay').classList.add('active');
    speakText("Hore! Selamat! Kamu berhasil menyelesaikan semua tingkat!");
  }

  // ==============================================
  // 7. SISTEM NAVIGASI MUNDUR RESMI (REMOTE BACK KEY)
  // ==============================================
  navigateBack() {
    try {
      this.sound.playNavigate();
    } catch (e) {}

    if (window.AndroidTTS && typeof window.AndroidTTS.stop === 'function') {
      try { window.AndroidTTS.stop(); } catch (e) {}
    }
    if ('speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }

    // 1. Jika pop-up selebrasi sedang aktif, tutup pop-up
    if (this.isCelebrationActive) {
      this.isCelebrationActive = false;
      document.getElementById('celebration-overlay').classList.remove('active');
      return true;
    }
    if (this.isVictoryActive) {
      this.isVictoryActive = false;
      document.getElementById('victory-overlay').classList.remove('active');
      this.showView('HUB');
      return true;
    }

    // 2. Navigasi Berdasarkan Hirarki Layar (design.md)
    if (this.currentView === 'GAME_COUNTING' || this.currentView === 'GAME_ADDITION') {
      this.showView('MENU_MATH');
      return true;
    } else if (this.currentView === 'GAME_SHAPES' || this.currentView === 'GAME_COLORS') {
      this.showView('MENU_SHAPES');
      return true;
    } else if (this.currentView === 'GAME_ODD' || this.currentView === 'GAME_SEQUENCE') {
      this.showView('MENU_LOGIC');
      return true;
    } else if (this.currentView === 'GAME_ALPHABET' || this.currentView === 'GAME_PHONICS' || this.currentView === 'GAME_WORDS') {
      this.showView('MENU_ALPHABET');
      return true;
    } else if (this.currentView === 'MENU_MATH' || this.currentView === 'MENU_ALPHABET' || this.currentView === 'MENU_SHAPES' || this.currentView === 'MENU_LOGIC') {
      this.showView('HUB');
      return true;
    } else if (this.currentView === 'HUB') {
      // Sudah di Menu Utama paling awal, return false agar sistem Android tahu bisa keluar
      return false;
    }
    return false;
  }

  // ==============================================
  // 8. GLOBAL EVENT LISTENERS (TV REMOTE & KEYBOARD)
  // ==============================================
  attachEvents() {
    window.addEventListener('keydown', (e) => {
      // Cegah scrolling default remote TV
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space', 'Enter'].includes(e.key)) {
        e.preventDefault();
      }

      // TOMBOL BACK RESMI REMOTE TV (Escape, Backspace, GoBack, keyCode 4)
      if (e.key === 'Escape' || e.key === 'Backspace' || e.key === 'Back' || e.key === 'GoBack' || e.keyCode === 4 || e.keyCode === 27) {
        e.preventDefault();
        this.navigateBack();
        return;
      }

      // Jika Pop-up Aktif
      if (this.isCelebrationActive) {
        if (e.key === 'Enter' || e.key === ' ') {
          this.isCelebrationActive = false;
          document.getElementById('celebration-overlay').classList.remove('active');
          if (this.nextLevelCallback) this.nextLevelCallback();
        }
        return;
      }

      if (this.isVictoryActive) {
        if (e.key === 'Enter' || e.key === ' ') {
          this.isVictoryActive = false;
          document.getElementById('victory-overlay').classList.remove('active');
          this.showView('HUB');
        }
        return;
      }

      // Berdasarkan View yang Aktif
      switch (this.currentView) {
        case 'HUB':
          this.handleHubKey(e.key);
          break;
        case 'MENU_MATH':
          this.handleMathKey(e.key);
          break;
        case 'GAME_COUNTING':
          this.handleCountingKey(e.key);
          break;
        case 'GAME_ADDITION':
          this.handleAdditionKey(e.key);
          break;
        case 'MENU_ALPHABET':
          this.handleAlphabetMenuKey(e.key);
          break;
        case 'GAME_ALPHABET':
          this.handleAlphabetKey(e.key);
          break;
        case 'GAME_PHONICS':
          this.handlePhonicsKey(e.key);
          break;
        case 'GAME_WORDS':
          this.handleWordsKey(e.key);
          break;
        case 'MENU_SHAPES':
          this.handleShapesMenuKey(e.key);
          break;
        case 'GAME_SHAPES':
          this.handleShapesKey(e.key);
          break;
        case 'GAME_COLORS':
          this.handleColorsKey(e.key);
          break;
        case 'MENU_LOGIC':
          this.handleLogicMenuKey(e.key);
          break;
        case 'GAME_ODD':
          this.handleOddKey(e.key);
          break;
        case 'GAME_SEQUENCE':
          this.handleSequenceKey(e.key);
          break;
      }
    });

    // Event Klik Mouse / Touch
    document.querySelectorAll('.game-exit-btn').forEach(btn => {
      btn.addEventListener('click', () => this.navigateBack());
    });

    document.getElementById('math-back-btn').addEventListener('click', () => {
      this.navigateBack();
    });

    document.getElementById('next-level-btn').addEventListener('click', () => {
      this.isCelebrationActive = false;
      document.getElementById('celebration-overlay').classList.remove('active');
      if (this.nextLevelCallback) this.nextLevelCallback();
    });

    document.getElementById('restart-btn').addEventListener('click', () => {
      this.isVictoryActive = false;
      document.getElementById('victory-overlay').classList.remove('active');
      this.showView('HUB');
    });

    // Klik Kartu Hub
    document.querySelectorAll('.hub-card').forEach((card, idx) => {
      card.addEventListener('click', () => {
        this.hubIndex = idx;
        this.updateHubFocus();
        this.handleHubKey('Enter');
      });
    });

    // Klik Sub-Card Math
    document.querySelectorAll('#math-menu-grid .sub-card').forEach((card, idx) => {
      card.addEventListener('click', () => {
        this.mathIndex = idx;
        this.updateMathFocus();
        this.handleMathKey('Enter');
      });
    });

        // Klik Sub-Card Alphabet
    document.querySelectorAll('#alphabet-menu-grid .sub-card').forEach((card, idx) => {
      card.addEventListener('click', () => {
        this.alphabetSubIndex = idx;
        this.updateAlphabetMenuFocus();
        this.handleAlphabetMenuKey('Enter');
      });
    });

    const alphabetBack = document.getElementById('alphabet-back-btn');
    if (alphabetBack) {
      alphabetBack.addEventListener('click', () => this.navigateBack());
    }

    // Klik Sub-Card Shapes
    document.querySelectorAll('#shapes-menu-grid .sub-card').forEach((card, idx) => {
      card.addEventListener('click', () => {
        this.shapesSubIndex = idx;
        this.updateShapesMenuFocus();
        this.handleShapesMenuKey('Enter');
      });
    });

    const shapesBack = document.getElementById('shapes-back-btn');
    if (shapesBack) {
      shapesBack.addEventListener('click', () => this.navigateBack());
    }

    const logicBack = document.getElementById('logic-back-btn');
    if (logicBack) {
      logicBack.addEventListener('click', () => this.navigateBack());
    }

    document.querySelectorAll('#logic-menu-grid .sub-card').forEach((card, idx) => {
      card.addEventListener('click', () => {
        this.logicSubIndex = idx;
        this.updateLogicMenuFocus();
        this.handleLogicMenuKey('Enter');
      });
    });
  }
}

// Handler global yang dipanggil langsung oleh Android TV APK (MainActivity)
window.handleRemoteBack = () => {
  if (window.app) {
    return window.app.navigateBack();
  }
  return false;
};

window.addEventListener('DOMContentLoaded', () => {
  window.app = new LearningHub();
});
