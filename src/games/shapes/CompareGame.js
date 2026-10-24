import { COMPARE_DATA } from '../../data/shapesData.js';
import { shuffleArray } from '../../core/randomizer.js';
import { speakText } from '../../core/tts.js';

export class CompareGame {
  constructor(engine) {
    this.engine = engine;
    this.level = 1;
    this.choices = [];
    this.selectedChoice = 0;
    this.pool = [];
    this.currentData = null;
    this.isInputLocked = false;
  }

  start() {
    this.level = 1;
    this.pool = shuffleArray(COMPARE_DATA);
    this.engine.initStars('compare-stars-container', 20);
    this.loadLevel(this.level);
  }

  loadLevel(lvl) {
    this.isInputLocked = false;
    document.getElementById('compare-level').innerText = lvl;

    const data = this.pool[lvl - 1];
    this.currentData = data;

    document.getElementById('compare-instruction-text').innerText = data.question;
    document.getElementById('compare-prompt-text').innerText = `👀 ${data.question}`;

    // Acak posisi item pilihan
    this.choices = shuffleArray(data.items);
    this.selectedChoice = Math.floor(Math.random() * this.choices.length);

    const container = document.getElementById('compare-choices-container');
    container.innerHTML = '';
    this.choices.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = `compare-card-item ${idx === this.selectedChoice ? 'focused' : ''}`;
      card.id = `compare-choice-${idx}`;
      card.innerHTML = `
        <div class="compare-item-icon ${item.scale}">${item.icon}</div>
        <div class="compare-item-name">${item.name}</div>
        <div class="compare-item-desc">${item.desc || ''}</div>
      `;
      card.addEventListener('click', () => {
        this.selectedChoice = idx;
        this.updateFocus();
        this.handleKey('Enter');
      });
      container.appendChild(card);
    });

    speakText(`Tingkat ${lvl}. ${data.speechQuestion}`);
    this.engine.reportTVState();
  }

  updateFocus() {
    document.querySelectorAll('.compare-card-item').forEach((card, idx) => {
      if (idx === this.selectedChoice) card.classList.add('focused');
      else card.classList.remove('focused');
    });
    this.engine.reportTVState();
  }

  handleKey(key) {
    if (this.isInputLocked) return;

    if (key === 'ArrowLeft' && this.selectedChoice > 0) {
      this.selectedChoice--;
      this.engine.sound.playNavigate();
      this.updateFocus();
    } else if (key === 'ArrowRight' && this.selectedChoice < this.choices.length - 1) {
      this.selectedChoice++;
      this.engine.sound.playNavigate();
      this.updateFocus();
    } else if (key === 'ArrowUp') {
      speakText(this.currentData.speechQuestion);
    } else if (key === 'Enter' || key === ' ') {
      const chosen = this.choices[this.selectedChoice];
      const card = document.getElementById(`compare-choice-${this.selectedChoice}`);

      if (chosen.id === this.currentData.correctId) {
        this.isInputLocked = true;
        card.classList.add('correct');
        this.engine.sound.playCorrect();
        this.engine.confetti.fire(35);
        this.engine.updateStar(this.level, 'compare-stars-container');

        speakText(this.currentData.reason);

        setTimeout(() => {
          if (this.level >= 20) {
            this.engine.showVictory();
          } else if (this.level === 10) {
            this.engine.showCheckpoint(() => {
              this.level++;
              this.loadLevel(this.level);
            });
          } else {
            this.engine.showCelebration(`Hebat! ${chosen.name} Jawaban yang Tepat!`, () => {
              this.level++;
              this.loadLevel(this.level);
            });
          }
        }, 1200);
      } else {
        // Anti-tebak: Kunci input, visual oops, penjelasan vokal, regenerasi soal perbandingan baru
        this.isInputLocked = true;
        card.classList.add('wrong');
        this.engine.sound.playOops();
        speakText(`Belum tepat sayang. Coba perhatikan perbandingan yang baru ini ya!`);

        setTimeout(() => {
          const candidates = COMPARE_DATA.filter(c => c.id !== this.currentData.id);
          const newComp = candidates[Math.floor(Math.random() * candidates.length)] || this.currentData;
          this.pool[this.level - 1] = newComp;
          this.loadLevel(this.level);
        }, 1300);
      }
    }
  }
}
