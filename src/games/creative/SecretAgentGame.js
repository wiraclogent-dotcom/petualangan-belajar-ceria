/**
 * SecretAgentGame.js
 * Game 2: Secret Agent Vault (Brankas Rahasia)
 * 
 * Game kriptografi edukatif pencocokan angka ke huruf untuk anak 4 tahun.
 * Membuka brankas robot dengan tombol angka remote TV (1, 2, 3, 4) atau D-Pad.
 */

import { SECRET_AGENT_LEVELS } from '../../data/secretAgentData.js';
import { speakText, cancelSpeech } from '../../core/tts.js';

export class SecretAgentGame {
  constructor(engine) {
    this.engine = engine;
    this.level = 1;
    this.currentData = null;
    this.currentStepIdx = 0;
    this.selectedCipherIdx = 0;
    this.enteredLetters = [];
    this.isInputLocked = false;
    this.isVaultOpen = false;
  }

  start() {
    this.level = 1;
    if (this.engine.voice) {
      this.engine.voice.stopListening();
    }
    this.engine.initStars('secret-agent-stars-container', 12);
    this.loadLevel(this.level);
  }

  loadLevel(lvl) {
    this.level = lvl;
    this.currentStepIdx = 0;
    this.selectedCipherIdx = 0;
    this.enteredLetters = [];
    this.isInputLocked = false;
    this.isVaultOpen = false;

    const data = SECRET_AGENT_LEVELS.find(d => d.level === lvl) || SECRET_AGENT_LEVELS[0];
    this.currentData = data;

    // 1. Header Information
    const lvlEl = document.getElementById('secret-agent-level');
    if (lvlEl) lvlEl.innerText = lvl;

    const instructionEl = document.getElementById('secret-agent-instruction-text');
    if (instructionEl) instructionEl.innerText = data.title;

    // 2. Render Panggung Brankas Robotik
    this.renderVault();

    // 3. Render Papan Kode Sandi Angka (Cipher Pad)
    this.renderCipherPad();

    // 4. Update Remote TV Hint
    this.updateRemoteHint();

    // 5. Suara Pembuka Ramah Anak
    speakText(`Misi ${lvl}. Cocokkan kode untuk membuka brankas ${data.meaning}!`);

    this.engine.reportTVState();
  }

  renderVault() {
    const container = document.getElementById('secret-agent-vault-stage');
    if (!container) return;

    const d = this.currentData;
    const letters = d.word.split('');
    const curTargetSlotIndex = d.lockedIndices[this.currentStepIdx];

    let slotsHtml = letters.map((ch, idx) => {
      const isLocked = d.lockedIndices.includes(idx);
      const lockedStep = d.lockedIndices.indexOf(idx);
      const isFilled = isLocked && lockedStep < this.currentStepIdx;
      const isCurrentActive = isLocked && idx === curTargetSlotIndex;

      let displayChar = ch;
      let slotClass = 'slot-letter';

      if (isLocked) {
        if (isFilled) {
          displayChar = this.enteredLetters[lockedStep] || ch;
          slotClass += ' slot-filled';
        } else if (isCurrentActive) {
          displayChar = '?';
          slotClass += ' slot-active-lock';
        } else {
          displayChar = '?';
          slotClass += ' slot-pending-lock';
        }
      } else {
        slotClass += ' slot-revealed';
      }

      return `
        <div class="vault-word-slot ${slotClass}" id="vault-slot-${idx}">
          <span class="slot-char">${displayChar}</span>
          ${isCurrentActive ? '<div class="slot-scan-beam"></div>' : ''}
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="agent-vault-cabinet ${this.isVaultOpen ? 'door-open' : ''}">
        <!-- Dinding Brankas Baja Robotik -->
        <div class="vault-metal-frame">
          <!-- Baut-baut Baja Sudut -->
          <span class="vault-bolt bolt-tl">⚙️</span>
          <span class="vault-bolt bolt-tr">⚙️</span>
          <span class="vault-bolt bolt-bl">⚙️</span>
          <span class="vault-bolt bolt-br">⚙️</span>

          <!-- Papan Monitor Clue Gambar & Kata Sandi -->
          <div class="vault-screen-panel">
            <div class="vault-clue-badge">
              <span class="clue-icon">${d.icon}</span>
              <span class="clue-label">${d.meaning}</span>
            </div>

            <!-- Deretan Slot Huruf -->
            <div class="vault-slots-container">
              ${slotsHtml}
            </div>
          </div>

          <!-- Roda Gigi Putar Brankas (Vault Wheel Dial) -->
          <div class="vault-lock-mechanism">
            <div class="vault-dial-wheel ${this.isVaultOpen ? 'spinning' : ''}" id="vault-dial-wheel">
              <div class="wheel-spoke spoke-1"></div>
              <div class="wheel-spoke spoke-2"></div>
              <div class="wheel-spoke spoke-3"></div>
              <div class="wheel-center-core">
                <span class="lock-status-icon">${this.isVaultOpen ? '🔓' : '🔒'}</span>
              </div>
            </div>
            <div class="vault-status-led ${this.isVaultOpen ? 'led-green' : 'led-amber'}">
              <span>${this.isVaultOpen ? 'AKSES DIBUKA!' : 'MASUKKAN KODE'}</span>
            </div>
          </div>

          <!-- Bagian Dalam Brankas (Hadiah Terbuka) -->
          <div class="vault-interior-vault" style="display: ${this.isVaultOpen ? 'flex' : 'none'};">
            <div class="secret-reward-sparkle">✨ ⭐ ✨</div>
            <div class="secret-reward-content">
              <span class="reward-title">HARTA RAHASIA DITEMUKAN!</span>
              <span class="reward-item">${d.secretReward}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderCipherPad() {
    const container = document.getElementById('secret-agent-cipher-container');
    if (!container) return;

    const pad = this.currentData.cipherPad;

    container.innerHTML = pad.map((item, idx) => {
      const isFocused = (idx === this.selectedCipherIdx);
      return `
        <div class="cipher-key-card ${isFocused ? 'focused' : ''}" id="cipher-key-${idx}" data-idx="${idx}">
          <div class="key-number-badge">${item.num}</div>
          <div class="key-letter-display">${item.letter}</div>
        </div>
      `;
    }).join('');

    // Click events
    pad.forEach((_, idx) => {
      const el = document.getElementById(`cipher-key-${idx}`);
      if (el) {
        el.addEventListener('click', () => {
          if (!this.isInputLocked) {
            this.selectedCipherIdx = idx;
            this.updateCipherFocus();
            this.handleCipherInput(idx);
          }
        });
      }
    });
  }

  updateCipherFocus() {
    const pad = this.currentData.cipherPad;
    pad.forEach((_, idx) => {
      const el = document.getElementById(`cipher-key-${idx}`);
      if (el) {
        if (idx === this.selectedCipherIdx) {
          el.classList.add('focused');
        } else {
          el.classList.remove('focused');
        }
      }
    });
    this.engine.reportTVState();
  }

  updateRemoteHint() {
    const hintEl = document.getElementById('secret-agent-hint-text');
    if (!hintEl) return;

    hintEl.innerHTML = `
      <span class="remote-hint-badge">1</span>
      <span class="remote-hint-badge">2</span>
      <span class="remote-hint-badge">3</span>
      ${this.currentData.cipherPad.length >= 4 ? '<span class="remote-hint-badge">4</span>' : ''}
      Kunci Sandi &nbsp;|&nbsp;
      <span class="remote-hint-badge">▲ ▼</span>
      <span class="remote-hint-badge">◀ ▶</span> Geser &nbsp;|&nbsp;
      <span class="remote-hint-badge">OK</span> Masukkan &nbsp;|&nbsp;
      <span class="remote-hint-badge">↩ Back</span> Keluar
    `;
  }

  handleCipherInput(cipherIdx) {
    if (this.isInputLocked || this.isVaultOpen) return;

    const key = this.currentData.cipherPad[cipherIdx];
    const expectedNum = this.currentData.targetSequence[this.currentStepIdx];
    const cardEl = document.getElementById(`cipher-key-${cipherIdx}`);

    if (this.engine.sound) {
      this.engine.sound.playVaultKeypad(800 + cipherIdx * 150);
    }

    if (key.num === expectedNum) {
      // 1. JAWABAN BENAR: Huruf mengunci ke slot
      this.enteredLetters.push(key.letter);
      this.currentStepIdx++;

      if (cardEl) {
        cardEl.classList.add('correct');
        setTimeout(() => cardEl.classList.remove('correct'), 500);
      }

      // Suara fonik huruf
      speakText(key.sound);

      // Re-render panggung untuk menampilkan huruf yang baru masuk
      this.renderVault();

      // Cek apakah seluruh kode sandi sudah terpecahkan
      if (this.currentStepIdx >= this.currentData.targetSequence.length) {
        this.unlockVault();
      }
    } else {
      // 2. JAWABAN SALAH: Getar merah & suara oops
      if (cardEl) {
        cardEl.classList.add('wrong');
        setTimeout(() => cardEl.classList.remove('wrong'), 550);
      }
      if (this.engine.sound) {
        this.engine.sound.playOops();
      }
      speakText('Coba lihat bentuk hurufnya lagi!');
    }
  }

  unlockVault() {
    this.isInputLocked = true;
    this.isVaultOpen = true;

    cancelSpeech();

    // Suara roda mekanik dan kait baja membuka
    if (this.engine.sound) {
      this.engine.sound.playVaultUnlock();
    }

    // Render pintu terbuka & harta karun
    this.renderVault();

    // Efek perayaan konfeti & bintang
    setTimeout(() => {
      if (this.engine.sound) this.engine.sound.playCorrect();
      if (this.engine.confetti) this.engine.confetti.fire(40);
      this.engine.updateStar(this.level, 'secret-agent-stars-container');

      speakText(`Luar biasa! Brankas terbuka! Kamu mendapatkan ${this.currentData.secretReward}!`);
    }, 600);

    // Otomatis lanjut ke tingkat berikutnya
    setTimeout(() => {
      if (this.level >= 12) {
        this.engine.showVictory(12);
      } else {
        this.level++;
        this.loadLevel(this.level);
      }
    }, 2800);
  }

  handleKey(key) {
    if (this.isInputLocked) return;

    const pad = this.currentData.cipherPad;

    // 1. Tombol Angka Remote TV Langsung (1, 2, 3, 4)
    if (['1', 'Digit1', 'Numpad1'].includes(key) && pad.length >= 1) {
      this.selectedCipherIdx = 0;
      this.updateCipherFocus();
      this.handleCipherInput(0);
      return;
    }
    if (['2', 'Digit2', 'Numpad2'].includes(key) && pad.length >= 2) {
      this.selectedCipherIdx = 1;
      this.updateCipherFocus();
      this.handleCipherInput(1);
      return;
    }
    if (['3', 'Digit3', 'Numpad3'].includes(key) && pad.length >= 3) {
      this.selectedCipherIdx = 2;
      this.updateCipherFocus();
      this.handleCipherInput(2);
      return;
    }
    if (['4', 'Digit4', 'Numpad4'].includes(key) && pad.length >= 4) {
      this.selectedCipherIdx = 3;
      this.updateCipherFocus();
      this.handleCipherInput(3);
      return;
    }

    // 2. Tombol Arah D-Pad (Atas / Bawah / Kiri / Kanan)
    if (['ArrowUp', 'Up', 'ArrowLeft', 'Left'].includes(key)) {
      if (this.selectedCipherIdx > 0) {
        this.selectedCipherIdx--;
        if (this.engine.sound) this.engine.sound.playNavigate();
        this.updateCipherFocus();
      }
      return;
    }
    if (['ArrowDown', 'Down', 'ArrowRight', 'Right'].includes(key)) {
      if (this.selectedCipherIdx < pad.length - 1) {
        this.selectedCipherIdx++;
        if (this.engine.sound) this.engine.sound.playNavigate();
        this.updateCipherFocus();
      }
      return;
    }

    // 3. Tombol OK / Enter
    if (['Enter', 'NumpadEnter', ' '].includes(key)) {
      this.handleCipherInput(this.selectedCipherIdx);
      return;
    }

    // 4. Tombol Back / Keluar
    if (['Escape', 'Backspace', 'GoBack'].includes(key)) {
      this.engine.navigateBack();
    }
  }
}
