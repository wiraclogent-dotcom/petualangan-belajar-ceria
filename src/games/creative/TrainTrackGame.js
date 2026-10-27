import { TRAIN_TRACK_LEVELS, TRACK_PIECES_META } from '../../data/trainTrackData.js';
import { getTrackPieceSVG, getRailwayArenaSVG } from './trackSvgHelper.js';
import { speakText, cancelSpeech } from '../../core/tts.js';

export class TrainTrackGame {
  constructor(engine) {
    this.engine = engine;
    this.level = 1;
    this.currentData = null;
    this.phase = 'CHOOSE_TRACK'; // 'CHOOSE_TRACK' | 'DRIVING'
    this.selectedChoiceIdx = 0;
    this.placedPiece = null;
    this.isInputLocked = false;
    this.animFrameId = null;
  }

  start() {
    this.level = 1;
    if (this.engine.voice) {
      this.engine.voice.stopListening();
    }
    this.engine.initStars('train-track-stars-container', 15);
    this.loadLevel(this.level);
  }

  loadLevel(lvl) {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    this.level = lvl;
    this.phase = 'CHOOSE_TRACK';
    this.isInputLocked = false;
    this.placedPiece = null;
    this.selectedChoiceIdx = 0;

    const data = TRAIN_TRACK_LEVELS.find(d => d.level === lvl) || TRAIN_TRACK_LEVELS[0];
    this.currentData = data;

    // 1. Update Header Indikator
    const lvlEl = document.getElementById('train-track-level');
    if (lvlEl) lvlEl.innerText = lvl;

    const instructionEl = document.getElementById('train-track-instruction-text');
    if (instructionEl) instructionEl.innerText = data.title;

    // 2. Render Panggung Arena Vektor SVG Terpadu
    this.renderRailwayArena();

    // 3. Render 3 Balok Kayu Pilihan Rel
    this.renderChoices();

    // 4. Update Petunjuk Remote TV
    this.updateRemoteHint();

    // 5. Suara Pembuka Singkat Ceria
    speakText(`Tingkat ${lvl}. Pasang kepingan rel!`);

    this.engine.reportTVState();
  }

  renderRailwayArena() {
    const arena = document.getElementById('train-track-arena');
    if (!arena) return;

    arena.innerHTML = getRailwayArenaSVG(this.currentData, this.placedPiece);

    // Posisikan lokomotif di titik awal jalur motion path
    const path = document.getElementById('train-motion-path');
    const loco = document.getElementById('toy-locomotive');
    if (path && loco) {
      try {
        const totalLen = path.getTotalLength();
        const startPt = path.getPointAtLength(0);
        const lookAheadDist = Math.min(6, totalLen);
        const pt2 = path.getPointAtLength(lookAheadDist);
        const angle = Math.atan2(pt2.y - startPt.y, pt2.x - startPt.x) * (180 / Math.PI);
        let transformStr = `translate(${startPt.x}, ${startPt.y}) rotate(${angle})`;
        if (angle > 90 || angle < -90) {
          transformStr += ' scale(1, -1)';
        }
        loco.setAttribute('transform', transformStr);
      } catch (err) {
        // Fallback jika headless belum menghitung total length
      }
    }
  }

  renderChoices() {
    const container = document.getElementById('train-track-choices-container');
    if (!container) return;

    container.innerHTML = '';
    const choices = this.currentData.choices;

    choices.forEach((letter, idx) => {
      const isFocused = (this.phase === 'CHOOSE_TRACK' && idx === this.selectedChoiceIdx);

      const card = document.createElement('div');
      card.className = `track-choice-card ${isFocused ? 'focused' : ''}`;
      card.id = `track-choice-${idx}`;

      card.innerHTML = `
        <span class="choice-num-badge">${idx + 1}</span>
        <div class="choice-track-preview">
          ${getTrackPieceSVG(letter, { width: 130, height: 130, isSilhouette: false })}
        </div>
      `;

      card.addEventListener('click', () => {
        if (!this.isInputLocked && this.phase === 'CHOOSE_TRACK') {
          this.selectedChoiceIdx = idx;
          this.updateFocus();
          this.handleChoiceSelect(idx);
        }
      });

      container.appendChild(card);
    });
  }

  updateFocus() {
    const choices = this.currentData.choices;
    choices.forEach((_, idx) => {
      const card = document.getElementById(`track-choice-${idx}`);
      if (card) {
        if (this.phase === 'CHOOSE_TRACK' && idx === this.selectedChoiceIdx) {
          card.classList.add('focused');
        } else {
          card.classList.remove('focused');
        }
      }
    });

    this.engine.reportTVState();
  }

  updateRemoteHint() {
    const hintEl = document.getElementById('train-track-hint-text');
    if (!hintEl) return;

    hintEl.innerHTML = `
      <span class="remote-hint-badge">1</span>
      <span class="remote-hint-badge">2</span>
      <span class="remote-hint-badge">3</span> Pasang Rel &nbsp;|&nbsp;
      <span class="remote-hint-badge">▲ ▼</span> Geser &nbsp;|&nbsp;
      <span class="remote-hint-badge">OK</span> Pasang &nbsp;|&nbsp;
      <span class="remote-hint-badge">↩ Back</span> Keluar
    `;
  }

  handleChoiceSelect(choiceIdx) {
    if (this.isInputLocked || this.phase !== 'CHOOSE_TRACK') return;

    const chosenLetter = this.currentData.choices[choiceIdx];
    const correctLetter = this.currentData.correctLetter;
    const card = document.getElementById(`track-choice-${choiceIdx}`);

    if (chosenLetter === correctLetter) {
      // 1. JAWABAN BENAR: Kepingan rel mengunci magnetik, kereta langsung melaju!
      this.isInputLocked = true;
      this.phase = 'DRIVING';
      this.placedPiece = chosenLetter;
      if (card) card.classList.add('correct');

      // Efek suara klik magnetik kayu kokoh
      this.engine.sound.playTrackSnap();

      // Render ulang arena dengan rel terpasang rapi
      this.renderRailwayArena();

      // Kereta meluncur dengan animasi 60FPS mulus di atas rel
      this.driveTrainAlongPath();
    } else {
      // 2. JAWABAN SALAH: Getar halus balok kayu
      if (card) card.classList.add('wrong');
      this.engine.sound.playOops();

      setTimeout(() => {
        if (card) card.classList.remove('wrong');
        this.engine.reportTVState();
      }, 550);
    }
  }

  driveTrainAlongPath() {
    cancelSpeech();

    const path = document.getElementById('train-motion-path');
    const loco = document.getElementById('toy-locomotive');
    const smokeContainer = document.getElementById('smoke-container');
    const meta = TRACK_PIECES_META[this.placedPiece] || { soundDesc: 'Tuuut-tuuut!' };

    if (!path || !loco) {
      // Fallback jika elemen tidak ditemukan
      this.onArrivalAtStation();
      return;
    }

    let totalLen = 0;
    try {
      totalLen = path.getTotalLength();
    } catch (e) {
      totalLen = 600;
    }

    // Suara peluit awal lokomotif berangkat
    this.engine.sound.playTrainWhistle();
    this.engine.sound.playTrainChug(6);

    const duration = 2500; // 2.5 detik meluncur anggun
    const startTime = performance.now();
    let hasPlayedPhonics = false;
    let lastSmokeTime = 0;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(1, Math.max(0, elapsed / duration));

      // Kurva percepatan & perlambatan halus (smooth ease-in-out)
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const currentDist = ease * totalLen;

      try {
        const pt = path.getPointAtLength(currentDist);
        const lookAhead = Math.min(totalLen, currentDist + 4);
        const pt2 = path.getPointAtLength(lookAhead);
        const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI);

        let transformStr = `translate(${pt.x}, ${pt.y}) rotate(${angle})`;
        if (angle > 90 || angle < -90) {
          transformStr += ' scale(1, -1)';
        }
        loco.setAttribute('transform', transformStr);

        // Emit partikel asap uap putih lembut dari cerobong
        if (smokeContainer && (currentTime - lastSmokeTime > 140) && t < 0.9) {
          lastSmokeTime = currentTime;
          this.emitSmokePuff(smokeContainer, pt.x, pt.y, angle);
        }
      } catch (err) {}

      // Saat melewati kepingan huruf rel di tengah lintasan: Suara Fonik Uap Alami!
      if (!hasPlayedPhonics && t >= 0.45) {
        hasPlayedPhonics = true;
        this.engine.sound.playSteamPhonics(this.placedPiece);
        speakText(meta.soundDesc);
      }

      if (t < 1) {
        this.animFrameId = requestAnimationFrame(animate);
      } else {
        this.animFrameId = null;
        this.onArrivalAtStation();
      }
    };

    this.animFrameId = requestAnimationFrame(animate);
  }

  emitSmokePuff(container, x, y, angleDeg) {
    if (!container) return;

    // Posisi relatif cerobong asap dari titik pusat lokomotif
    const rad = (angleDeg * Math.PI) / 180;
    const chimneyOffsetX = 24;
    const chimneyOffsetY = -28;
    const worldX = x + chimneyOffsetX * Math.cos(rad) - chimneyOffsetY * Math.sin(rad);
    const worldY = y + chimneyOffsetX * Math.sin(rad) + chimneyOffsetY * Math.cos(rad);

    const puff = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    puff.setAttribute('cx', worldX);
    puff.setAttribute('cy', worldY);
    puff.setAttribute('r', '5');
    puff.setAttribute('fill', 'rgba(255, 255, 255, 0.75)');
    puff.setAttribute('filter', 'blur(1px)');
    container.appendChild(puff);

    const startPuff = performance.now();
    const puffDuration = 600;

    const animatePuff = (now) => {
      const pElapsed = now - startPuff;
      const pT = Math.min(1, pElapsed / puffDuration);

      const curRadius = 5 + pT * 14;
      const curY = worldY - pT * 22;
      const curOpacity = 0.75 * (1 - pT);

      puff.setAttribute('r', curRadius);
      puff.setAttribute('cy', curY);
      puff.setAttribute('fill', `rgba(255, 255, 255, ${curOpacity})`);

      if (pT < 1) {
        requestAnimationFrame(animatePuff);
      } else {
        if (puff.parentNode) puff.parentNode.removeChild(puff);
      }
    };

    requestAnimationFrame(animatePuff);
  }

  onArrivalAtStation() {
    this.engine.sound.playTrainWhistle();
    this.engine.sound.playCorrect();
    this.engine.confetti.fire(35);
    this.engine.updateStar(this.level, 'train-track-stars-container');

    speakText(`Horeee! Kereta tiba di ${this.currentData.endStation}!`);

    // Transisi mulus otomatis ke tingkat berikutnya tanpa modal dialog yang mengganggu
    setTimeout(() => {
      if (this.level >= 15) {
        this.engine.showVictory(15);
      } else {
        this.level++;
        this.loadLevel(this.level);
      }
    }, 1300);
  }

  handleKey(key) {
    if (this.isInputLocked) return;

    if (this.phase === 'CHOOSE_TRACK') {
      // 1. Tombol Angka Remote TV Langsung (1, 2, 3)
      if (['1', 'Digit1', 'Numpad1'].includes(key) && this.currentData.choices.length >= 1) {
        this.selectedChoiceIdx = 0;
        this.updateFocus();
        this.handleChoiceSelect(0);
        return;
      }
      if (['2', 'Digit2', 'Numpad2'].includes(key) && this.currentData.choices.length >= 2) {
        this.selectedChoiceIdx = 1;
        this.updateFocus();
        this.handleChoiceSelect(1);
        return;
      }
      if (['3', 'Digit3', 'Numpad3'].includes(key) && this.currentData.choices.length >= 3) {
        this.selectedChoiceIdx = 2;
        this.updateFocus();
        this.handleChoiceSelect(2);
        return;
      }

      // 2. Tombol Arah D-Pad (Atas / Bawah / Kiri / Kanan)
      if (['ArrowUp', 'Up', 'ArrowLeft', 'Left'].includes(key)) {
        if (this.selectedChoiceIdx > 0) {
          this.selectedChoiceIdx--;
          this.engine.sound.playBoing();
          this.updateFocus();
        }
        return;
      }
      if (['ArrowDown', 'Down', 'ArrowRight', 'Right'].includes(key)) {
        if (this.selectedChoiceIdx < this.currentData.choices.length - 1) {
          this.selectedChoiceIdx++;
          this.engine.sound.playBoing();
          this.updateFocus();
        }
        return;
      }

      // 3. Tombol OK / Enter di Kartu Terpilih
      if (['Enter', 'NumpadEnter', ' '].includes(key)) {
        this.handleChoiceSelect(this.selectedChoiceIdx);
        return;
      }
    }

    // 4. Tombol Back / Keluar ke Sub-Menu
    if (['Escape', 'Backspace', 'GoBack'].includes(key)) {
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }
      this.engine.navigateBack();
    }
  }
}
