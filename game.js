/**
 * Dino Hitung Ceria - Game TV untuk Anak Usia 4 Tahun
 * Kontrol: Tombol Panah (Kiri, Kanan, Atas) & Tombol OK (Enter) Remote TV
 */

// ==========================================
// 1. DESAIN SVG DINOSAURUS LUCU & WARNA-WARNI
// ==========================================
const DINO_SVGS = [
  // 1. T-Rex Hijau Lucu
  `<svg viewBox="0 0 160 160" width="130" height="130">
    <ellipse cx="80" cy="95" rx="42" ry="48" fill="#4ade80" />
    <circle cx="95" cy="55" r="32" fill="#4ade80" />
    <path d="M 115 50 Q 140 55 125 70 Z" fill="#4ade80" />
    <circle cx="106" cy="48" r="8" fill="#ffffff" />
    <circle cx="108" cy="48" r="4.5" fill="#1e293b" />
    <circle cx="109" cy="46" r="1.5" fill="#ffffff" />
    <ellipse cx="118" cy="62" rx="5" ry="3" fill="#fb7185" opacity="0.6" />
    <path d="M 100 68 Q 115 78 126 68" stroke="#166534" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <!-- Perut Kuning Cerah -->
    <ellipse cx="72" cy="102" rx="26" ry="32" fill="#fef08a" />
    <!-- Tangan Mungil -->
    <path d="M 96 90 Q 110 92 108 98" stroke="#4ade80" stroke-width="8" stroke-linecap="round" fill="none" />
    <!-- Kaki -->
    <ellipse cx="65" cy="142" rx="14" ry="9" fill="#22c55e" />
    <ellipse cx="90" cy="142" rx="14" ry="9" fill="#22c55e" />
    <!-- Ekor Lucu -->
    <path d="M 45 110 Q 20 120 15 100 Q 25 90 48 95 Z" fill="#4ade80" />
  </svg>`,

  // 2. Brachiosaurus Leher Panjang Kuning
  `<svg viewBox="0 0 160 160" width="130" height="130">
    <ellipse cx="65" cy="110" rx="45" ry="35" fill="#facc15" />
    <!-- Leher Melengkung Tinggi -->
    <path d="M 75 105 Q 98 60 92 35 Q 82 30 75 40 Q 82 65 62 100 Z" fill="#facc15" />
    <!-- Kepala -->
    <circle cx="94" cy="34" r="16" fill="#facc15" />
    <circle cx="99" cy="31" r="5" fill="#ffffff" />
    <circle cx="100" cy="31" r="3" fill="#1e293b" />
    <circle cx="101" cy="30" r="1" fill="#ffffff" />
    <path d="M 95 40 Q 104 44 106 38" stroke="#854d0e" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <!-- Bintik Ceria di Punggung -->
    <circle cx="48" cy="98" r="6" fill="#f97316" />
    <circle cx="62" cy="95" r="8" fill="#f97316" />
    <circle cx="42" cy="115" r="5" fill="#f97316" />
    <!-- Kaki-kaki -->
    <rect x="40" y="130" width="14" height="20" rx="7" fill="#eab308" />
    <rect x="75" y="130" width="14" height="20" rx="7" fill="#eab308" />
    <!-- Ekor -->
    <path d="M 30 115 Q 12 110 8 125 Q 18 130 35 125 Z" fill="#facc15" />
  </svg>`,

  // 3. Triceratops Biru Ceria
  `<svg viewBox="0 0 160 160" width="130" height="130">
    <!-- Badan -->
    <ellipse cx="75" cy="105" rx="42" ry="36" fill="#38bdf8" />
    <!-- Mahkota Tanduk -->
    <circle cx="105" cy="70" r="28" fill="#0284c7" />
    <!-- Kepala -->
    <circle cx="110" cy="78" r="22" fill="#38bdf8" />
    <!-- Tanduk Putih Lucu -->
    <polygon points="120,55 126,40 128,58" fill="#f8fafc" />
    <polygon points="102,48 106,32 110,50" fill="#f8fafc" />
    <polygon points="128,78 138,76 128,84" fill="#f8fafc" />
    <!-- Mata & Pipi -->
    <circle cx="116" cy="72" r="5" fill="#ffffff" />
    <circle cx="117" cy="72" r="3" fill="#0f172a" />
    <ellipse cx="110" cy="85" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6" />
    <path d="M 118 85 Q 124 90 128 85" stroke="#0369a1" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <!-- Kaki -->
    <rect x="52" y="128" width="15" height="18" rx="7" fill="#0284c7" />
    <rect x="85" y="128" width="15" height="18" rx="7" fill="#0284c7" />
    <!-- Ekor -->
    <path d="M 40 115 Q 15 122 18 105 Q 28 102 42 106 Z" fill="#38bdf8" />
  </svg>`,

  // 4. Stegosaurus Ungu / Oranye dengan Duri Punggung Bulat
  `<svg viewBox="0 0 160 160" width="130" height="130">
    <!-- Duri Punggung Daun Oranye -->
    <ellipse cx="50" cy="65" rx="10" ry="16" fill="#fb923c" transform="rotate(-15 50 65)" />
    <ellipse cx="72" cy="58" rx="11" ry="18" fill="#fb923c" />
    <ellipse cx="94" cy="65" rx="10" ry="16" fill="#fb923c" transform="rotate(15 94 65)" />
    <!-- Badan -->
    <ellipse cx="72" cy="105" rx="45" ry="35" fill="#c084fc" />
    <!-- Kepala -->
    <ellipse cx="120" cy="108" rx="16" ry="12" fill="#c084fc" />
    <circle cx="124" cy="104" r="4.5" fill="#ffffff" />
    <circle cx="125" cy="104" r="2.5" fill="#1e1b4b" />
    <path d="M 122 112 Q 128 116 132 112" stroke="#6b21a8" stroke-width="2.5" fill="none" />
    <!-- Kaki -->
    <rect x="48" y="128" width="14" height="18" rx="6" fill="#9333ea" />
    <rect x="82" y="128" width="14" height="18" rx="6" fill="#9333ea" />
    <!-- Ekor berujung duri -->
    <path d="M 35 110 Q 12 112 10 95 Q 22 98 38 102 Z" fill="#c084fc" />
    <circle cx="10" cy="95" r="4" fill="#fb923c" />
  </svg>`
];

// Kata Indonesia untuk angka 1 - 10
const NUMBER_WORDS = [
  "", "Satu", "Dua", "Tiga", "Empat", "Lima",
  "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh"
];

// ==========================================
// 2. SISTEM AUDIO RAMAH ANAK (WEB AUDIO API)
// ==========================================
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

  // Nada geser tombol remote (Kiri / Kanan)
  playNavigate() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(587.33, this.ctx.currentTime + 0.08); // A4 ke D5
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }

  // Nada saat menghitung dinosaurus (1.. 2.. 3..)
  playCount(index) {
    this.init();
    // Skala tangga nada ceria Do Re Mi Fa Sol La Si Do
    const scale = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25];
    const freq = scale[(index - 1) % scale.length];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.36);
  }

  // Nada gembira saat jawaban BENAR! (Akord Kemenangan Ceria)
  playCorrect() {
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.42);
      }, i * 90);
    });
  }

  // Suara lembut saat belum tepat (Tidak menyeramkan, seperti kartun lucu)
  playOops() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.26);
  }

  // Suara terompet kemenangan besar saat tamat tingkat 10
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

// Bantuan Suara Bicara Bahasa Indonesia (Web Speech API)
function speakText(text) {
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel(); // batalkan suara sebelumnya jika ada
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95; // sedikit santai untuk anak
      utterance.pitch = 1.25; // suara sedikit ceria / ramah
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.log('Speech synthesis unsupported or restricted');
    }
  }
}

// ==========================================
// 3. EFEK PERAYAAN KONFETI BINTANG
// ==========================================
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

  fire(amount = 70) {
    const colors = ['#f43f5e', '#38bdf8', '#facc15', '#4ade80', '#c084fc', '#fb923c'];
    for (let i = 0; i < amount; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: this.canvas.height / 2,
        vx: (Math.random() - 0.5) * 22,
        vy: -Math.random() * 18 - 8,
        size: Math.random() * 14 + 8,
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
      p.vy += 0.5; // gravitasi
      p.rotation += p.rotSpeed;
      p.opacity -= 0.008;

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

// ==========================================
// 4. LOGIKA UTAMA PERMAINAN (10 TINGKAT)
// ==========================================
class DinoGame {
  constructor() {
    this.sound = new SoundFX();
    this.confetti = new ConfettiCannon(document.getElementById('confetti-canvas'));

    // State Game
    this.currentLevel = 1;
    this.totalLevels = 10;
    this.correctCount = 1;
    this.selectedChoiceIndex = 1; // Mulai dari pilihan tengah
    this.choices = [];
    this.isInputLocked = false;
    this.gameState = 'START'; // 'START', 'PLAYING', 'CELEBRATION', 'VICTORY'

    // DOM Elements
    this.dinoArena = document.getElementById('dino-arena');
    this.choicesContainer = document.getElementById('choices-container');
    this.levelIndicator = document.getElementById('current-level');
    this.starsContainer = document.getElementById('stars-container');
    this.instructionText = document.getElementById('instruction-text');

    this.startOverlay = document.getElementById('start-overlay');
    this.celebrationOverlay = document.getElementById('celebration-overlay');
    this.victoryOverlay = document.getElementById('victory-overlay');

    this.celebrationTitle = document.getElementById('celebration-title');
    this.celebrationMessage = document.getElementById('celebration-message');

    this.initStars();
    this.attachEventListeners();
  }

  // Membuat 10 slot bintang di atas
  initStars() {
    this.starsContainer.innerHTML = '';
    for (let i = 1; i <= this.totalLevels; i++) {
      const star = document.createElement('span');
      star.classList.add('star');
      star.id = `star-${i}`;
      star.innerText = '★';
      this.starsContainer.appendChild(star);
    }
  }

  // Mulai Permainan
  startGame() {
    this.startOverlay.classList.remove('active');
    this.gameState = 'PLAYING';
    this.currentLevel = 1;
    this.resetStars();
    this.loadLevel(this.currentLevel);
  }

  resetStars() {
    document.querySelectorAll('.star').forEach(s => s.classList.remove('earned'));
  }

  // Memuat Level Tertentu
  loadLevel(level) {
    this.currentLevel = level;
    this.levelIndicator.innerText = level;
    this.isInputLocked = false;

    // Menentukan jumlah dinosaurus pada level ini:
    // Level 1: 1 dino, Level 2: 2 dino, ..., Level 10: 10 dino
    this.correctCount = level;

    // Render Dinosaurus
    this.renderDinosaurs(this.correctCount);

    // Siapkan 3 pilihan angka telur (1 benar, 2 pengecoh yang dekat & tidak negatif)
    this.generateChoices(this.correctCount);

    // Reset fokus remote ke telur tengah (indeks 1)
    this.selectedChoiceIndex = 1;
    this.updateChoiceFocus();

    // Suara sapaan awal level
    speakText(`Tingkat ${level}. Ada berapa dinosaurus?`);
  }

  // Tampilkan dinosaurus ke arena
  renderDinosaurs(count) {
    this.dinoArena.innerHTML = '';
    this.dinoArena.classList.remove('sparse', 'dense');

    if (count <= 3) {
      this.dinoArena.classList.add('sparse');
    } else if (count >= 7) {
      this.dinoArena.classList.add('dense');
    }

    for (let i = 1; i <= count; i++) {
      const card = document.createElement('div');
      card.classList.add('dino-card');
      card.id = `dino-${i}`;

      // Tag nomor (untuk fitur "Bantu Hitung")
      const tag = document.createElement('div');
      tag.classList.add('dino-number-tag');
      tag.innerText = i;
      card.appendChild(tag);

      // Gambar dinosaurus acak dari 4 jenis
      const randomDinoSvg = DINO_SVGS[(i - 1) % DINO_SVGS.length];
      const svgContainer = document.createElement('div');
      svgContainer.innerHTML = randomDinoSvg;
      card.appendChild(svgContainer);

      // Bisa diklik juga jika anak menunjuk layar sentuh / mouse
      card.addEventListener('click', () => {
        this.sound.playCount(i);
        card.classList.add('counted');
        speakText(NUMBER_WORDS[i]);
      });

      this.dinoArena.appendChild(card);
    }
  }

  // Generate 3 pilihan jawaban (1 jawaban benar + 2 pilihan salah unik)
  generateChoices(correct) {
    const wrongOptions = [];
    const pool = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(n => n !== correct);

    // Prioritaskan angka yang selisih 1 atau 2 agar menantang secara edukatif
    pool.sort((a, b) => Math.abs(a - correct) - Math.abs(b - correct));

    // Ambil 2 angka acak terdekat
    const candidates = pool.slice(0, 4).sort(() => Math.random() - 0.5);
    wrongOptions.push(candidates[0], candidates[1]);

    // Gabungkan dan acak susunan 3 telur
    this.choices = [correct, wrongOptions[0], wrongOptions[1]].sort(() => Math.random() - 0.5);

    // Render ke HTML
    this.choicesContainer.innerHTML = '';
    this.choices.forEach((num, index) => {
      const egg = document.createElement('div');
      egg.classList.add('egg-choice');
      egg.id = `choice-${index}`;
      egg.innerText = num;

      // Event klik mouse / touch
      egg.addEventListener('click', () => {
        this.selectedChoiceIndex = index;
        this.updateChoiceFocus();
        this.submitAnswer();
      });

      this.choicesContainer.appendChild(egg);
    });
  }

  // Update visual fokus telur saat navigasi remote (Kiri / Kanan)
  updateChoiceFocus() {
    document.querySelectorAll('.egg-choice').forEach((egg, idx) => {
      if (idx === this.selectedChoiceIndex) {
        egg.classList.add('focused');
      } else {
        egg.classList.remove('focused');
      }
    });
  }

  // Geser pilihan dengan remote
  moveFocus(direction) {
    if (this.isInputLocked || this.gameState !== 'PLAYING') return;

    if (direction === 'left' && this.selectedChoiceIndex > 0) {
      this.selectedChoiceIndex--;
      this.sound.playNavigate();
      this.updateChoiceFocus();
    } else if (direction === 'right' && this.selectedChoiceIndex < this.choices.length - 1) {
      this.selectedChoiceIndex++;
      this.sound.playNavigate();
      this.updateChoiceFocus();
    }
  }

  // Fitur "Bantu Hitung" (Tekan Panah Atas di Remote)
  // Menghitung dinosaurus 1 per 1 secara otomatis dengan animasi & suara
  countAlong() {
    if (this.isInputLocked || this.gameState !== 'PLAYING') return;
    this.isInputLocked = true;

    const cards = document.querySelectorAll('.dino-card');
    cards.forEach(c => c.classList.remove('counted'));

    let current = 0;
    const interval = setInterval(() => {
      if (current < cards.length) {
        const card = cards[current];
        card.classList.add('counted');
        const num = current + 1;
        this.sound.playCount(num);
        speakText(NUMBER_WORDS[num]);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          this.isInputLocked = false;
        }, 600);
      }
    }, 750);
  }

  // Memeriksa Jawaban saat tombol OK ditekan
  submitAnswer() {
    if (this.isInputLocked || this.gameState !== 'PLAYING') return;

    const selectedEgg = document.getElementById(`choice-${this.selectedChoiceIndex}`);
    const chosenNumber = this.choices[this.selectedChoiceIndex];

    if (chosenNumber === this.correctCount) {
      // JAWABAN BENAR!
      this.handleCorrectAnswer(selectedEgg);
    } else {
      // JAWABAN SALAH (Ramah & Tidak Menghukum)
      this.handleWrongAnswer(selectedEgg);
    }
  }

  handleCorrectAnswer(eggElement) {
    this.isInputLocked = true;
    eggElement.classList.add('correct');
    this.sound.playCorrect();
    this.confetti.fire(70);

    // Bintang pencapaian level ini menyala
    const star = document.getElementById(`star-${this.currentLevel}`);
    if (star) star.classList.add('earned');

    // Buat semua dino melompat gembira
    document.querySelectorAll('.dino-card').forEach(d => {
      d.classList.add('counted');
    });

    const praiseWords = ['Hebat sekali!', 'Pintar!', 'Luar biasa!', 'Benar sekali!'];
    const randomPraise = praiseWords[Math.floor(Math.random() * praiseWords.length)];
    speakText(`${randomPraise} Ada ${this.correctCount} dinosaurus!`);

    setTimeout(() => {
      if (this.currentLevel >= this.totalLevels) {
        // TUNTAS SEMUA 10 LEVEL!
        this.showVictoryScreen();
      } else {
        // Lanjut ke level berikutnya
        this.showCelebrationScreen();
      }
    }, 1200);
  }

  handleWrongAnswer(eggElement) {
    this.sound.playOops();
    eggElement.classList.add('wrong');
    speakText("Hampir tepat! Coba hitung lagi ya.");

    setTimeout(() => {
      eggElement.classList.remove('wrong');
    }, 600);
  }

  // Tampilkan Popup Selebrasi antar level
  showCelebrationScreen() {
    this.gameState = 'CELEBRATION';
    this.celebrationTitle.innerText = "HEBAT SEKALI! ⭐";
    this.celebrationMessage.innerText = `Benar! Ada ${this.correctCount} Dinosaurus!`;
    this.celebrationOverlay.classList.add('active');
  }

  nextLevel() {
    this.celebrationOverlay.classList.remove('active');
    this.gameState = 'PLAYING';
    this.loadLevel(this.currentLevel + 1);
  }

  // Layar Kemenangan Akhir (Level 10 Selesai)
  showVictoryScreen() {
    this.gameState = 'VICTORY';
    this.sound.playVictory();
    this.confetti.fire(160);
    this.victoryOverlay.classList.add('active');
    speakText("Hore! Selamat! Kamu berhasil menyelesaikan semua tingkat dinosaurus!");
  }

  restartGame() {
    this.victoryOverlay.classList.remove('active');
    this.startGame();
  }

  // ==========================================
  // 5. PENDETEKSI REMOTE TV & KEYBOARD
  // ==========================================
  attachEventListeners() {
    window.addEventListener('keydown', (e) => {
      // Mencegah scroll default browser TV
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space', 'Enter'].includes(e.key)) {
        e.preventDefault();
      }

      // 1. Jika masih di Layar Awal
      if (this.gameState === 'START') {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          this.startGame();
        }
        return;
      }

      // 2. Jika di Pop-up Selebrasi Level
      if (this.gameState === 'CELEBRATION') {
        if (e.key === 'Enter' || e.key === ' ') {
          this.nextLevel();
        }
        return;
      }

      // 3. Jika di Pop-up Kemenangan Akhir
      if (this.gameState === 'VICTORY') {
        if (e.key === 'Enter' || e.key === ' ') {
          this.restartGame();
        }
        return;
      }

      // 4. Jika sedang bermain (PLAYING)
      if (this.gameState === 'PLAYING') {
        switch (e.key) {
          case 'ArrowLeft':
            this.moveFocus('left');
            break;
          case 'ArrowRight':
            this.moveFocus('right');
            break;
          case 'ArrowUp':
            this.countAlong();
            break;
          case 'Enter':
          case ' ':
            this.submitAnswer();
            break;
        }
      }
    });

    // Event Listener Klik untuk Tombol-tombol di Layar
    document.getElementById('start-btn').addEventListener('click', () => this.startGame());
    document.getElementById('next-level-btn').addEventListener('click', () => this.nextLevel());
    document.getElementById('restart-btn').addEventListener('click', () => this.restartGame());
  }
}

// Inisialisasi game saat dokumen siap
window.addEventListener('DOMContentLoaded', () => {
  window.game = new DinoGame();
});
