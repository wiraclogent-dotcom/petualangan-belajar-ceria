/**
 * RoboSorterGame.js
 * Game 3: Robo-Factory Sorter (Pabrik Pemilah Robotik)
 * 
 * Game pemilahan visual spasial & anatomi huruf untuk anak 4 tahun (pre-reader).
 * Menggunakan remote TV (◀ / ▶ atau angka 1 / 2) untuk mengarahkan piston pemilah
 * huruf ke tong Garis Lurus (📏) vs Tong Garis Melengkung (⭕), atau Punya Lubang (🕳️) vs Terbuka (👐).
 */

import { ROBO_SORTER_LEVELS } from '../../data/roboSorterData.js';
import { speakText, cancelSpeech } from '../../core/tts.js';

export class RoboSorterGame {
  constructor(engine) {
    this.engine = engine;
    this.level = 1;
    this.currentData = null;
    this.isInputLocked = false;
    this.selectedSide = 'left';
  }

  start() {
    this.level = 1;
    if (this.engine.voice) {
      this.engine.voice.stopListening();
    }
    this.engine.initStars('robo-sorter-stars-container', 15);
    this.loadLevel(this.level);
  }

  loadLevel(lvl) {
    this.level = lvl;
    this.isInputLocked = false;
    this.selectedSide = 'left';

    const data = ROBO_SORTER_LEVELS.find(d => d.level === lvl) || ROBO_SORTER_LEVELS[0];
    this.currentData = data;

    // 1. Header Information
    const lvlEl = document.getElementById('robo-sorter-level');
    if (lvlEl) lvlEl.innerText = lvl;

    const instructionEl = document.getElementById('robo-sorter-instruction-text');
    if (instructionEl) instructionEl.innerText = data.title;

    // 2. Render Panggung Pabrik Pemilah
    this.renderFactoryStage();

    // 3. Suara Pengantar Ramah Anak
    if (this.engine.sound) {
      this.engine.sound.playFactoryBelt();
    }
    speakText(data.phonics);

    this.engine.reportTVState();
  }

  renderFactoryStage() {
    const container = document.getElementById('robo-sorter-arena');
    if (!container) return;

    const d = this.currentData;

    container.innerHTML = `
      <div class="factory-stage-wrapper">
        <!-- Chute Kiri (Tong Pemilah 1) -->
        <aside class="sorter-chute chute-left ${this.selectedSide === 'left' ? 'side-focused' : ''}" id="chute-left">
          <div class="chute-funnel">
            <div class="chute-rim"></div>
            <div class="chute-indicator">
              <span class="chute-icon">${d.leftBin.icon}</span>
              <div class="chute-shape-svg">
                <svg viewBox="0 0 50 50" width="50" height="50">
                  ${d.leftBin.shapeSvg}
                </svg>
              </div>
              <span class="chute-name">${d.leftBin.name}</span>
            </div>
            <div class="chute-remote-tag">
              <span class="remote-btn-pill">◀ KIRI</span>
              <span class="remote-num-pill">1</span>
            </div>
          </div>
          <div class="chute-bin-body chute-blue-glow"></div>
        </aside>

        <!-- Area Konveyor Tengah & Palet Huruf -->
        <main class="sorter-center-conveyor">
          <!-- Laser Scanner Pengenal Bentuk di Atas -->
          <div class="factory-scanner-head">
            <div class="scanner-light-strip"></div>
            <span class="scanner-status-label">PENGAMAT BENTUK HURUF</span>
          </div>

          <!-- Jalur Konveyor Berputar -->
          <div class="conveyor-track-assembly">
            <div class="conveyor-rollers">
              <span class="roller-gear">⚙️</span>
              <span class="roller-gear">⚙️</span>
              <span class="roller-gear">⚙️</span>
              <span class="roller-gear">⚙️</span>
              <span class="roller-gear">⚙️</span>
            </div>

            <!-- Palet Mekanik Pembawa Huruf -->
            <div class="conveyor-pallet enter-drop" id="conveyor-pallet">
              <div class="pallet-clamp clamp-left"></div>
              <div class="pallet-letter-card" id="pallet-letter-card">
                <span class="pallet-char">${d.targetLetter}</span>
              </div>
              <div class="pallet-clamp clamp-right"></div>
            </div>

            <!-- Piston Pemilah Kiri & Kanan -->
            <div class="pusher-ram ram-left" id="pusher-ram-left"></div>
            <div class="pusher-ram ram-right" id="pusher-ram-right"></div>
          </div>
        </main>

        <!-- Chute Kanan (Tong Pemilah 2) -->
        <aside class="sorter-chute chute-right ${this.selectedSide === 'right' ? 'side-focused' : ''}" id="chute-right">
          <div class="chute-funnel">
            <div class="chute-rim"></div>
            <div class="chute-indicator">
              <span class="chute-icon">${d.rightBin.icon}</span>
              <div class="chute-shape-svg">
                <svg viewBox="0 0 50 50" width="50" height="50">
                  ${d.rightBin.shapeSvg}
                </svg>
              </div>
              <span class="chute-name">${d.rightBin.name}</span>
            </div>
            <div class="chute-remote-tag">
              <span class="remote-btn-pill">KANAN ▶</span>
              <span class="remote-num-pill">2</span>
            </div>
          </div>
          <div class="chute-bin-body chute-orange-glow"></div>
        </aside>
      </div>
    `;

    // Pasang click events untuk preview / mouse
    const leftEl = document.getElementById('chute-left');
    if (leftEl) {
      leftEl.addEventListener('click', () => this.sortItem('left'));
    }
    const rightEl = document.getElementById('chute-right');
    if (rightEl) {
      rightEl.addEventListener('click', () => this.sortItem('right'));
    }
  }

  updateSideHighlight() {
    const leftEl = document.getElementById('chute-left');
    const rightEl = document.getElementById('chute-right');
    if (leftEl && rightEl) {
      if (this.selectedSide === 'left') {
        leftEl.classList.add('side-focused');
        rightEl.classList.remove('side-focused');
      } else {
        rightEl.classList.add('side-focused');
        leftEl.classList.remove('side-focused');
      }
    }
  }

  sortItem(chosenSide) {
    if (this.isInputLocked) return;

    this.selectedSide = chosenSide;
    this.updateSideHighlight();

    const d = this.currentData;
    const pallet = document.getElementById('conveyor-pallet');
    const card = document.getElementById('pallet-letter-card');
    const targetChute = document.getElementById(`chute-${chosenSide}`);
    const pusher = document.getElementById(`pusher-ram-${chosenSide}`);

    // Suara desis piston bergerak
    if (this.engine.sound) {
      this.engine.sound.playPistonWhoosh(chosenSide);
    }

    if (pusher) {
      pusher.classList.add('fire-push');
      setTimeout(() => pusher.classList.remove('fire-push'), 450);
    }

    if (chosenSide === d.correctBin) {
      // --- 1. JAWABAN BENAR: Palet meluncur masuk tong ---
      this.isInputLocked = true;

      if (pallet) {
        pallet.classList.remove('enter-drop');
        pallet.classList.add(chosenSide === 'left' ? 'slide-into-left' : 'slide-into-right');
      }

      if (card) {
        card.classList.add('card-correct');
      }

      if (targetChute) {
        targetChute.classList.add('chute-success');
      }

      setTimeout(() => {
        if (this.engine.sound) this.engine.sound.playCorrect();
        if (this.engine.confetti) this.engine.confetti.fire(35);
        this.engine.updateStar(this.level, 'robo-sorter-stars-container');

        speakText(d.successSound);
      }, 350);

      // Transisi otomatis ke level berikutnya
      setTimeout(() => {
        if (this.level >= 15) {
          this.engine.showVictory(15);
        } else {
          this.level++;
          this.loadLevel(this.level);
        }
      }, 2600);
    } else {
      // --- 2. JAWABAN SALAH: Pantul balik & getar lembut ---
      if (pallet) {
        pallet.classList.remove('enter-drop');
        pallet.classList.add(chosenSide === 'left' ? 'reject-bounce-left' : 'reject-bounce-right');
        setTimeout(() => {
          pallet.classList.remove('reject-bounce-left', 'reject-bounce-right');
        }, 600);
      }

      if (targetChute) {
        targetChute.classList.add('chute-wrong');
        setTimeout(() => targetChute.classList.remove('chute-wrong'), 550);
      }

      if (this.engine.sound) {
        this.engine.sound.playOops();
      }

      const hintWord = (d.categoryType === 'straight-vs-curved') 
        ? (d.correctBin === 'left' ? 'bergaris lurus' : 'bergaris melengkung')
        : (d.correctBin === 'left' ? 'punya lubang' : 'berbentuk terbuka');

      speakText(`Coba perhatikan lagi, huruf ${d.targetLetter} bentuknya ${hintWord}!`);
    }
  }

  handleKey(key) {
    if (this.isInputLocked) return;

    // 1. Arah Kiri atau Tombol 1
    if (['ArrowLeft', 'Left', '1', 'Digit1', 'Numpad1'].includes(key)) {
      this.sortItem('left');
      return;
    }

    // 2. Arah Kanan atau Tombol 2
    if (['ArrowRight', 'Right', '2', 'Digit2', 'Numpad2'].includes(key)) {
      this.sortItem('right');
      return;
    }

    // 3. Tombol OK / Enter (mengeksekusi sisi yang sedang disorot)
    if (['Enter', 'NumpadEnter', ' '].includes(key)) {
      this.sortItem(this.selectedSide);
      return;
    }

    // 4. Tombol Back / Keluar
    if (['Escape', 'Backspace', 'GoBack'].includes(key)) {
      this.engine.navigateBack();
    }
  }
}
