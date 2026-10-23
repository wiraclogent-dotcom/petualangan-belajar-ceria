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

  fire(amount = 60) {
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

    this.initViews();
    this.attachEvents();
  }

  initViews() {
    this.showView('HUB');
    this.updateHubFocus();
  }

  showView(viewName) {
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
      case 'GAME_ALPHABET':
        document.getElementById('view-game-alphabet').classList.add('active');
        this.initAlphabetGame();
        break;
    }
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
    } else if (key === 'ArrowRight' && this.hubIndex < 2) {
      this.hubIndex++;
      this.sound.playNavigate();
      this.updateHubFocus();
    } else if (key === 'Enter' || key === ' ') {
      this.sound.playNavigate();
      if (this.hubIndex === 0) {
        this.showView('MENU_MATH');
      } else if (this.hubIndex === 1) {
        this.showView('GAME_ALPHABET');
      } else if (this.hubIndex === 2) {
        speakText("Segera hadir! Petualangan warna dan bentuk!");
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
    } else if (key === 'ArrowUp') {
      this.showView('HUB');
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

  initStars(containerId) {
    const cont = document.getElementById(containerId);
    cont.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
      const star = document.createElement('span');
      star.classList.add('star');
      star.id = `${containerId}-star-${i}`;
      star.innerText = '★';
      cont.appendChild(star);
    }
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
    } else if (key === 'Enter' || key === ' ') {
      const item = ALPHABET_DATA[this.alphabetIndex];
      speakText(item.phonic);
    } else if (key === 'ArrowUp') {
      this.showView('HUB');
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
  // 8. GLOBAL EVENT LISTENERS (TV REMOTE & KEYBOARD)
  // ==============================================
  attachEvents() {
    window.addEventListener('keydown', (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space', 'Enter'].includes(e.key)) {
        e.preventDefault();
      }

      // Tombol Back di Remote TV (Escape)
      if (e.key === 'Escape' || e.key === 'Backspace') {
        if (this.currentView === 'GAME_COUNTING' || this.currentView === 'GAME_ADDITION') {
          this.showView('MENU_MATH');
        } else if (this.currentView === 'MENU_MATH' || this.currentView === 'GAME_ALPHABET') {
          this.showView('HUB');
        }
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
        case 'GAME_ALPHABET':
          this.handleAlphabetKey(e.key);
          break;
      }
    });

    // Event Klik Mouse / Touch
    document.querySelectorAll('.game-exit-btn').forEach(btn => {
      btn.addEventListener('click', () => this.showView('HUB'));
    });

    document.getElementById('math-back-btn').addEventListener('click', () => {
      this.showView('HUB');
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
    document.querySelectorAll('.sub-card').forEach((card, idx) => {
      card.addEventListener('click', () => {
        this.mathIndex = idx;
        this.updateMathFocus();
        this.handleMathKey('Enter');
      });
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new LearningHub();
});
