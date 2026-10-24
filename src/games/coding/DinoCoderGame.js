import { CODING_DATA } from '../../data/codingData.js';
import { speakText, cancelSpeech } from '../../core/tts.js';

export class DinoCoderGame {
  constructor(engine) {
    this.engine = engine;
    this.level = 1;
    this.currentData = null;
    this.programRibbon = [];
    this.palette = ['forward', 'turn_right', 'turn_left', 'jump'];
    this.selectedPaletteIdx = 0;
    this.controlZone = 'PALETTE'; // 'PALETTE' | 'ACTIONS'
    this.selectedActionIdx = 0;   // 0: RUN, 1: DELETE, 2: CLEAR
    this.isExecuting = false;
    this.isInputLocked = false;
    this.hasBonusItem = false;

    // Dino state pada grid
    this.dinoPos = { x: 0, y: 0, dir: 1 };
  }

  start() {
    this.level = 1;
    this.engine.initStars('coding-stars-container', 20);
    this.loadLevel(this.level);
  }

  loadLevel(lvl) {
    this.level = lvl;
    this.isExecuting = false;
    this.isInputLocked = false;
    this.hasBonusItem = false;
    this.programRibbon = [];
    this.controlZone = 'PALETTE';
    this.selectedPaletteIdx = 0;
    this.selectedActionIdx = 0;

    const data = CODING_DATA.find(d => d.level === lvl) || CODING_DATA[0];
    this.currentData = data;
    this.palette = data.allowedBlocks;
    this.dinoPos = { ...data.dinoStart };

    // Update Header Info
    const lvlEl = document.getElementById('coding-level');
    if (lvlEl) lvlEl.innerText = lvl;
    const titleEl = document.getElementById('coding-title-text');
    if (titleEl) titleEl.innerText = data.title;
    const promptEl = document.getElementById('coding-prompt-text');
    if (promptEl) promptEl.innerText = `🎯 Target: ${data.target.name}`;

    // Render Grid & Tray
    this.renderGrid();
    this.renderPalette();
    this.renderRibbon();
    this.updateFocus();

    speakText(`Tingkat ${lvl}. ${data.hint}`);
    this.engine.reportTVState();
  }

  renderGrid() {
    const data = this.currentData;
    const gridEl = document.getElementById('coding-grid-arena');
    if (!gridEl) return;

    gridEl.innerHTML = '';
    gridEl.style.gridTemplateColumns = `repeat(${data.gridSize}, 1fr)`;
    gridEl.style.gridTemplateRows = `repeat(${data.gridSize}, 1fr)`;

    for (let y = 0; y < data.gridSize; y++) {
      for (let x = 0; x < data.gridSize; x++) {
        const cell = document.createElement('div');
        cell.className = 'coding-grid-cell';
        cell.id = `coding-cell-${x}-${y}`;

        // Cek Obstacle
        const obs = data.obstacles.find(o => o.x === x && o.y === y);
        if (obs) {
          cell.classList.add(`obs-${obs.type}`);
          cell.innerHTML = `<span class="cell-entity">${obs.icon}</span>`;
        }

        // Cek Bonus Item (misal Kunci)
        if (data.bonusItem && data.bonusItem.x === x && data.bonusItem.y === y && !this.hasBonusItem) {
          cell.classList.add('cell-bonus');
          cell.innerHTML = `<span class="cell-entity pulse-item">${data.bonusItem.icon}</span>`;
        }

        // Cek Target (Buah / Sarang)
        if (data.target.x === x && data.target.y === y) {
          cell.classList.add('cell-target');
          cell.innerHTML = `<span class="cell-entity bounce-target">${data.target.icon}</span>`;
        }

        // Dino Pos
        if (this.dinoPos.x === x && this.dinoPos.y === y) {
          cell.classList.add('cell-dino');
          cell.innerHTML = this.getDinoHTML(this.dinoPos.dir);
        }

        gridEl.appendChild(cell);
      }
    }
  }

  getDinoHTML(dir) {
    // 0: up (0deg), 1: right (90deg), 2: down (180deg), 3: left (270deg)
    const degMap = [0, 90, 180, 270];
    const deg = degMap[dir] || 0;
    return `
      <div class="dino-avatar-token" style="transform: rotate(${deg}deg);">
        <svg viewBox="0 0 160 160" width="60" height="60">
          <ellipse cx="80" cy="95" rx="38" ry="44" fill="#4ade80" />
          <circle cx="95" cy="55" r="28" fill="#4ade80" />
          <path d="M 115 50 Q 140 55 125 70 Z" fill="#4ade80" />
          <circle cx="106" cy="48" r="7" fill="#ffffff" />
          <circle cx="108" cy="48" r="4" fill="#1e293b" />
          <ellipse cx="72" cy="102" rx="22" ry="28" fill="#fef08a" />
          <ellipse cx="65" cy="142" rx="12" ry="8" fill="#22c55e" />
          <ellipse cx="90" cy="142" rx="12" ry="8" fill="#22c55e" />
          <path d="M 45 110 Q 20 120 15 100 Q 25 90 48 95 Z" fill="#4ade80" />
        </svg>
      </div>
    `;
  }

  renderPalette() {
    const paletteEl = document.getElementById('coding-palette-list');
    if (!paletteEl) return;
    paletteEl.innerHTML = '';

    const labels = {
      'forward': { icon: '⬆️', text: 'Maju' },
      'turn_right': { icon: '↪️', text: 'Kanan' },
      'turn_left': { icon: '↩️', text: 'Kiri' },
      'jump': { icon: '🦘', text: 'Lompat' }
    };

    this.palette.forEach((blockType, idx) => {
      const btn = document.createElement('div');
      btn.className = `palette-block-btn ${this.controlZone === 'PALETTE' && idx === this.selectedPaletteIdx ? 'focused' : ''}`;
      btn.id = `palette-btn-${idx}`;
      const item = labels[blockType] || { icon: '❓', text: blockType };
      btn.innerHTML = `<span class="block-icon">${item.icon}</span> <span class="block-label">${item.text}</span>`;
      btn.addEventListener('click', () => {
        if (this.isInputLocked || this.isExecuting) return;
        this.controlZone = 'PALETTE';
        this.selectedPaletteIdx = idx;
        this.updateFocus();
        this.addBlockToRibbon(blockType);
      });
      paletteEl.appendChild(btn);
    });
  }

  renderRibbon() {
    const ribbonEl = document.getElementById('coding-program-ribbon');
    if (!ribbonEl) return;
    ribbonEl.innerHTML = '';

    const labels = {
      'forward': { icon: '⬆️', text: 'Maju' },
      'turn_right': { icon: '↪️', text: 'Putar Kanan' },
      'turn_left': { icon: '↩️', text: 'Putar Kiri' },
      'jump': { icon: '🦘', text: 'Lompat' }
    };

    if (this.programRibbon.length === 0) {
      ribbonEl.innerHTML = `<div class="ribbon-placeholder">Pita perintah kosong. Pilih balok di bawah untuk memberi langkah Dino!</div>`;
      return;
    }

    this.programRibbon.forEach((cmd, idx) => {
      const chip = document.createElement('div');
      chip.className = 'program-block-chip';
      chip.id = `program-chip-${idx}`;
      const item = labels[cmd] || { icon: '❓', text: cmd };
      chip.innerHTML = `
        <span class="chip-step-num">${idx + 1}</span>
        <span class="chip-icon">${item.icon}</span>
        <span class="chip-text">${item.text}</span>
      `;
      ribbonEl.appendChild(chip);
    });
  }

  updateFocus() {
    // 1. Palette Focus
    document.querySelectorAll('.palette-block-btn').forEach((btn, idx) => {
      if (this.controlZone === 'PALETTE' && idx === this.selectedPaletteIdx) {
        btn.classList.add('focused');
      } else {
        btn.classList.remove('focused');
      }
    });

    // 2. Action Buttons Focus (0: RUN, 1: DELETE)
    const runBtn = document.getElementById('coding-run-btn');
    const delBtn = document.getElementById('coding-delete-btn');
    if (runBtn) {
      if (this.controlZone === 'ACTIONS' && this.selectedActionIdx === 0) runBtn.classList.add('focused');
      else runBtn.classList.remove('focused');
    }
    if (delBtn) {
      if (this.controlZone === 'ACTIONS' && this.selectedActionIdx === 1) delBtn.classList.add('focused');
      else delBtn.classList.remove('focused');
    }

    this.engine.reportTVState();
  }

  addBlockToRibbon(blockType) {
    if (this.isInputLocked || this.isExecuting) return;
    if (this.programRibbon.length >= this.currentData.maxBlocks) {
      this.engine.sound.playOops();
      speakText(`Pita perintah sudah penuh! Tekan tombol Jalankan untuk mencoba ya!`);
      return;
    }

    this.programRibbon.push(blockType);
    this.engine.sound.playNavigate();
    this.renderRibbon();

    // Auto scroll ribbon to the right
    const ribbonEl = document.getElementById('coding-program-ribbon');
    if (ribbonEl) ribbonEl.scrollLeft = ribbonEl.scrollWidth;
  }

  removeLastBlock() {
    if (this.isInputLocked || this.isExecuting) return;
    if (this.programRibbon.length === 0) return;

    this.programRibbon.pop();
    this.engine.sound.playNavigate();
    this.renderRibbon();
  }

  clearRibbon() {
    if (this.isInputLocked || this.isExecuting) return;
    this.programRibbon = [];
    this.dinoPos = { ...this.currentData.dinoStart };
    this.hasBonusItem = false;
    this.renderGrid();
    this.renderRibbon();
  }

  handleKey(key) {
    if (this.isInputLocked || this.isExecuting) return;

    if (key === 'ArrowUp') {
      if (this.controlZone === 'ACTIONS') {
        this.controlZone = 'PALETTE';
        this.engine.sound.playNavigate();
        this.updateFocus();
      } else {
        // Shortcut cepat: Tekan panah atas untuk langsung eksekusi kode!
        this.runProgram();
      }
    } else if (key === 'ArrowDown') {
      if (this.controlZone === 'PALETTE') {
        this.controlZone = 'ACTIONS';
        this.selectedActionIdx = 0; // Langsung ke tombol RUN
        this.engine.sound.playNavigate();
        this.updateFocus();
      }
    } else if (key === 'ArrowLeft') {
      if (this.controlZone === 'PALETTE' && this.selectedPaletteIdx > 0) {
        this.selectedPaletteIdx--;
        this.engine.sound.playNavigate();
        this.updateFocus();
      } else if (this.controlZone === 'ACTIONS' && this.selectedActionIdx > 0) {
        this.selectedActionIdx--;
        this.engine.sound.playNavigate();
        this.updateFocus();
      }
    } else if (key === 'ArrowRight') {
      if (this.controlZone === 'PALETTE' && this.selectedPaletteIdx < this.palette.length - 1) {
        this.selectedPaletteIdx++;
        this.engine.sound.playNavigate();
        this.updateFocus();
      } else if (this.controlZone === 'ACTIONS' && this.selectedActionIdx < 1) {
        this.selectedActionIdx++;
        this.engine.sound.playNavigate();
        this.updateFocus();
      }
    } else if (key === 'Enter' || key === ' ') {
      if (this.controlZone === 'PALETTE') {
        const chosenBlock = this.palette[this.selectedPaletteIdx];
        this.addBlockToRibbon(chosenBlock);
      } else if (this.controlZone === 'ACTIONS') {
        if (this.selectedActionIdx === 0) {
          this.runProgram();
        } else if (this.selectedActionIdx === 1) {
          this.removeLastBlock();
        }
      }
    } else if (key === 'Backspace' || key === 'Escape') {
      if (this.programRibbon.length > 0) {
        this.removeLastBlock();
      } else {
        this.engine.navigateBack();
      }
    }
  }

  async runProgram() {
    if (this.isExecuting || this.isInputLocked) return;

    if (this.programRibbon.length === 0) {
      speakText('Masukkan balok perintah dulu ya sayang!');
      return;
    }

    this.isExecuting = true;
    this.isInputLocked = true;
    cancelSpeech();

    // Reset posisi awal sebelum eksekusi
    this.dinoPos = { ...this.currentData.dinoStart };
    this.hasBonusItem = false;
    this.renderGrid();

    speakText('Dino melangkah!');

    // Eksekusi tiap balok perintah secara asinkron
    for (let i = 0; i < this.programRibbon.length; i++) {
      const cmd = this.programRibbon[i];

      // Highlight chip aktif di ribbon
      document.querySelectorAll('.program-block-chip').forEach((c, idx) => {
        if (idx === i) c.classList.add('executing');
        else c.classList.remove('executing');
      });

      // Sound per langkah
      this.engine.sound.playNavigate();

      // Hitung aksi
      let collision = false;
      let collisionMsg = '';

      if (cmd === 'forward') {
        const next = this.getNextPos(this.dinoPos, 1);
        if (this.isValidCell(next)) {
          this.dinoPos.x = next.x;
          this.dinoPos.y = next.y;
        } else {
          collision = true;
          collisionMsg = 'Dino terhalang rintangan!';
        }
      } else if (cmd === 'turn_right') {
        this.dinoPos.dir = (this.dinoPos.dir + 1) % 4;
      } else if (cmd === 'turn_left') {
        this.dinoPos.dir = (this.dinoPos.dir + 3) % 4;
      } else if (cmd === 'jump') {
        const next = this.getNextPos(this.dinoPos, 2);
        if (this.isValidCell(next)) {
          this.dinoPos.x = next.x;
          this.dinoPos.y = next.y;
        } else {
          collision = true;
          collisionMsg = 'Dino tidak bisa melompat ke sana!';
        }
      }

      // Render Dino di posisi baru
      this.renderGrid();

      // Cek apakah mengambil bonus item (misal Kunci)
      const data = this.currentData;
      if (data.bonusItem && !this.hasBonusItem && this.dinoPos.x === data.bonusItem.x && this.dinoPos.y === data.bonusItem.y) {
        this.hasBonusItem = true;
        this.engine.sound.playCorrect();
        speakText(`Kunci berhasil diambil! Sekarang cari sarangnya!`);
        this.renderGrid();
      }

      // Jika terjadi tabrakan / keluar batas
      if (collision) {
        this.engine.sound.playOops();
        const chip = document.getElementById(`program-chip-${i}`);
        if (chip) chip.classList.add('error');

        speakText(`Oh-oh! Dino tersandung di langkah ke ${i + 1}. Ayo periksa balokmu dan coba lagi ya!`);
        await new Promise(r => setTimeout(r, 1600));

        // Kembalikan Dino ke posisi semula agar anak bisa debug
        this.dinoPos = { ...this.currentData.dinoStart };
        this.hasBonusItem = false;
        this.renderGrid();
        document.querySelectorAll('.program-block-chip').forEach(c => c.classList.remove('executing'));
        this.isExecuting = false;
        this.isInputLocked = false;
        return;
      }

      // Jeda 650ms agar anak bisa melihat langkahnya
      await new Promise(r => setTimeout(r, 650));
    }

    // Selesai eksekusi semua balok: Cek apakah sampai di Target
    document.querySelectorAll('.program-block-chip').forEach(c => c.classList.remove('executing'));
    const data = this.currentData;

    // Prasyarat jika ada bonus item tapi belum diambil
    if (data.bonusItem && !this.hasBonusItem && this.dinoPos.x === data.target.x && this.dinoPos.y === data.target.y) {
      this.engine.sound.playOops();
      speakText('Sarang masih terkunci! Kamu harus ambil kuncinya terlebih dahulu!');
      this.dinoPos = { ...this.currentData.dinoStart };
      this.renderGrid();
      this.isExecuting = false;
      this.isInputLocked = false;
      return;
    }

    if (this.dinoPos.x === data.target.x && this.dinoPos.y === data.target.y) {
      // BERHASIL!
      this.engine.sound.playCorrect();
      this.engine.confetti.fire(60);
      this.engine.updateStar(this.level, 'coding-stars-container');

      speakText(`Hebat sekali! Kodemu berhasil membawa Dino ke ${data.target.name}!`);

      setTimeout(() => {
        if (this.level >= 20) {
          this.engine.showVictory();
        } else if (this.level === 10) {
          this.engine.showCheckpoint(() => {
            this.level++;
            this.loadLevel(this.level);
          });
        } else {
          this.engine.showCelebration(`Dino Berhasil Menemukan ${data.target.name}!`, () => {
            this.level++;
            this.loadLevel(this.level);
          });
        }
      }, 1200);
    } else {
      // Belum sampai target
      this.engine.sound.playOops();
      speakText(`Dino sudah selesai berjalan, tapi ${data.target.name} masih ada di depan! Tambahkan langkah lagi ya!`);
      this.dinoPos = { ...this.currentData.dinoStart };
      this.hasBonusItem = false;
      this.renderGrid();
      this.isExecuting = false;
      this.isInputLocked = false;
    }
  }

  getNextPos(pos, steps) {
    let nx = pos.x;
    let ny = pos.y;
    if (pos.dir === 0) ny -= steps;      // Atas
    else if (pos.dir === 1) nx += steps; // Kanan
    else if (pos.dir === 2) ny += steps; // Bawah
    else if (pos.dir === 3) nx -= steps; // Kiri
    return { x: nx, y: ny };
  }

  isValidCell(pos) {
    const data = this.currentData;
    // Cek batas grid
    if (pos.x < 0 || pos.x >= data.gridSize || pos.y < 0 || pos.y >= data.gridSize) {
      return false;
    }
    // Cek rintangan batu / pohon / air
    const obs = data.obstacles.find(o => o.x === pos.x && o.y === pos.y);
    if (obs) {
      return false;
    }
    return true;
  }
}
