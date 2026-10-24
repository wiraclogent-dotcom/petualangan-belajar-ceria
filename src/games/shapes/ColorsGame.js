import { COLORS_DATA } from '../../data/shapesData.js';
import { shuffleArray } from '../../core/randomizer.js';
import { speakText } from '../../core/tts.js';

export class ColorsGame {
  constructor(engine) {
    this.engine = engine;
    this.level = 1;
    this.choices = [];
    this.selectedChoice = 0;
    this.pool = [];
    this.currentTarget = null;
    this.isInputLocked = false;
  }

  start() {
    this.level = 1;
    this.pool = shuffleArray(COLORS_DATA);
    this.engine.initStars('color-stars-container', 20);
    this.loadLevel(this.level);
  }

  loadLevel(lvl) {
    this.isInputLocked = false;
    document.getElementById('color-level').innerText = lvl;

    const target = this.pool[lvl - 1];
    this.currentTarget = target;

    // Render target display
    document.getElementById('color-splash-preview').innerHTML = `<span style="font-size: 4rem;">${target.icon}</span>`;
    document.getElementById('color-prompt-badge').innerHTML = `<span style="color: ${target.hex};">${target.name.toUpperCase()}</span> / ${target.english.toUpperCase()}`;
    document.getElementById('color-instruction-text').innerText = `Manakah warna ${target.name}?`;

    // Buat 3 pilihan warna (1 benar + 2 distractor)
    const otherColors = COLORS_DATA.filter(c => c.id !== target.id);
    const shuffledOthers = shuffleArray(otherColors);
    this.choices = shuffleArray([target, shuffledOthers[0], shuffledOthers[1]]);
    this.selectedChoice = Math.floor(Math.random() * this.choices.length);

    const container = document.getElementById('color-choices-container');
    container.innerHTML = '';
    this.choices.forEach((choice, idx) => {
      const card = document.createElement('div');
      card.className = `color-card-choice ${idx === this.selectedChoice ? 'focused' : ''}`;
      card.id = `color-choice-${idx}`;
      card.innerHTML = `
        <div class="color-swatch-circle" style="background: ${choice.hex};"></div>
        <div class="color-name-label">${choice.name}</div>
      `;
      card.addEventListener('click', () => {
        this.selectedChoice = idx;
        this.updateFocus();
        this.handleKey('Enter');
      });
      container.appendChild(card);
    });

    speakText(`Manakah warna ${target.name}? ${target.english}!`);
    this.engine.reportTVState();
  }

  updateFocus() {
    document.querySelectorAll('.color-card-choice').forEach((card, idx) => {
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
      const card = document.getElementById(`color-choice-${this.selectedChoice}`);

      if (chosen.id === this.currentTarget.id) {
        this.isInputLocked = true;
        card.classList.add('correct');
        this.engine.sound.playCorrect();
        this.engine.confetti.fire(35);
        this.engine.updateStar(this.level, 'color-stars-container');

        speakText(`Pintar sekali! Ini warna ${chosen.name}! ${chosen.english}!`);

        setTimeout(() => {
          if (this.level >= 20) {
            this.engine.showVictory();
          } else if (this.level === 10) {
            this.engine.showCheckpoint(() => {
              this.level++;
              this.loadLevel(this.level);
            });
          } else {
            this.engine.showCelebration(`Warna ${chosen.name} Berhasil Ditemukan!`, () => {
              this.level++;
              this.loadLevel(this.level);
            });
          }
        }, 1100);
      } else {
        // Anti-tebak: Kunci input, visual oops, penjelasan vokal, regenerasi warna baru
        this.isInputLocked = true;
        card.classList.add('wrong');
        this.engine.sound.playOops();
        speakText(`Itu warna ${chosen.name}. Coba cari warna yang baru ini ya!`);

        setTimeout(() => {
          const candidates = COLORS_DATA.filter(c => c.id !== this.currentTarget.id);
          const newColor = candidates[Math.floor(Math.random() * candidates.length)] || this.currentTarget;
          this.pool[this.level - 1] = newColor;
          this.loadLevel(this.level);
        }, 1300);
      }
    }
  }
}
