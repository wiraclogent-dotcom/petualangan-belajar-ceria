import { ODD_DATA } from '../../data/logicData.js';
import { shuffleArray } from '../../core/randomizer.js';
import { speakText } from '../../core/tts.js';

export class OddGame {
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
    this.pool = shuffleArray(ODD_DATA);
    this.engine.initStars('odd-stars-container', 20);
    this.loadLevel(this.level);
  }

  loadLevel(lvl) {
    this.isInputLocked = false;
    document.getElementById('odd-level').innerText = lvl;

    const data = this.pool[lvl - 1];
    this.currentData = data;

    // Acak posisi 4 kartu
    this.choices = shuffleArray(data.items);
    this.selectedChoice = Math.floor(Math.random() * this.choices.length);

    const container = document.getElementById('odd-choices-container');
    container.innerHTML = '';
    this.choices.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = `odd-card-choice ${idx === this.selectedChoice ? 'focused' : ''}`;
      card.id = `odd-choice-${idx}`;
      card.innerHTML = `
        <div class="odd-icon">${item.icon}</div>
        <div class="odd-name">${item.name}</div>
      `;
      card.addEventListener('click', () => {
        this.selectedChoice = idx;
        this.updateFocus();
        this.handleKey('Enter');
      });
      container.appendChild(card);
    });

    speakText(`Tingkat ${lvl}. ${data.hint}`);
    this.engine.reportTVState();
  }

  updateFocus() {
    document.querySelectorAll('.odd-card-choice').forEach((card, idx) => {
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
    } else if (key === 'Enter' || key === ' ') {
      const chosen = this.choices[this.selectedChoice];
      const card = document.getElementById(`odd-choice-${this.selectedChoice}`);

      if (chosen.isOdd) {
        this.isInputLocked = true;
        card.classList.add('correct');
        this.engine.sound.playCorrect();
        this.engine.confetti.fire(35);
        this.engine.updateStar(this.level, 'odd-stars-container');

        speakText(`Hebat sekali! ${chosen.reason}`);

        setTimeout(() => {
          if (this.level >= 20) {
            this.engine.showVictory();
          } else if (this.level === 10) {
            this.engine.showCheckpoint(() => {
              this.level++;
              this.loadLevel(this.level);
            });
          } else {
            this.engine.showCelebration(`Detektif Cilik Berhasil Menemukan Jawaban!`, () => {
              this.level++;
              this.loadLevel(this.level);
            });
          }
        }, 1200);
      } else {
        // Anti-tebak: Kunci input, visual oops, penjelasan kategori, regenerasi soal detektif baru
        this.isInputLocked = true;
        card.classList.add('wrong');
        this.engine.sound.playOops();
        speakText(`${chosen.name} adalah ${this.currentData.categoryName}. Ayo cari yang berbeda di tantangan baru ini ya!`);

        setTimeout(() => {
          const candidates = ODD_DATA.filter(o => o.id !== this.currentData.id);
          const newOdd = candidates[Math.floor(Math.random() * candidates.length)] || this.currentData;
          this.pool[this.level - 1] = newOdd;
          this.loadLevel(this.level);
        }, 1300);
      }
    }
  }
}
