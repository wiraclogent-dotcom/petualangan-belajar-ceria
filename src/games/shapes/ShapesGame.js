import { SHAPES_DATA } from '../../data/shapesData.js';
import { shuffleArray } from '../../core/randomizer.js';
import { speakText } from '../../core/tts.js';

export class ShapesGame {
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
    this.pool = shuffleArray(SHAPES_DATA);
    this.engine.initStars('shape-stars-container', 10);
    this.loadLevel(this.level);
  }

  loadLevel(lvl) {
    this.level = lvl;
    this.isInputLocked = false;
    document.getElementById('shape-level').innerText = lvl;

    const target = this.pool[lvl - 1];
    this.currentTarget = target;

    // Render siluet sarang
    const slot = document.getElementById('shape-nest-slot');
    slot.classList.remove('matched');
    document.getElementById('shape-nest-outline').innerHTML = target.silhouette;
    document.getElementById('shape-nest-label').innerText = `Sarang ${target.name}`;

    // Buat 3 pilihan bentuk (1 benar + 2 distractor)
    const otherShapes = SHAPES_DATA.filter(s => s.id !== target.id);
    const shuffledOthers = shuffleArray(otherShapes);
    this.choices = shuffleArray([target, shuffledOthers[0], shuffledOthers[1]]);
    this.selectedChoice = Math.floor(Math.random() * this.choices.length);

    const container = document.getElementById('shape-choices-container');
    container.innerHTML = '';
    this.choices.forEach((choice, idx) => {
      const card = document.createElement('div');
      card.className = `shape-card-choice ${idx === this.selectedChoice ? 'focused' : ''}`;
      card.id = `shape-choice-${idx}`;
      card.innerHTML = `
        <div class="shape-preview">${choice.svg}</div>
        <div class="shape-name-tag">${choice.name}</div>
      `;
      card.addEventListener('click', () => {
        this.selectedChoice = idx;
        this.updateFocus();
        this.handleKey('Enter');
      });
      container.appendChild(card);
    });

    speakText(`Bentuk apakah yang cocok di sarang? Pasang ${target.name}! ${target.english}!`);
    this.engine.reportTVState();
  }

  updateFocus() {
    document.querySelectorAll('.shape-card-choice').forEach((card, idx) => {
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
      const card = document.getElementById(`shape-choice-${this.selectedChoice}`);

      if (chosen.id === this.currentTarget.id) {
        this.isInputLocked = true;
        card.classList.add('correct');
        this.engine.sound.playCorrect();
        this.engine.confetti.fire(35);
        this.engine.updateStar(this.level, 'shape-stars-container');

        const slot = document.getElementById('shape-nest-slot');
        slot.classList.add('matched');
        document.getElementById('shape-nest-outline').innerHTML = chosen.svg;
        document.getElementById('shape-nest-label').innerText = `${chosen.name} Pas!`;

        speakText(`Pintar sekali! Bentuk ${chosen.name}! ${chosen.english}!`);

        setTimeout(() => {
          if (this.level >= 10) {
            this.engine.showVictory();
          } else {
            this.engine.showCelebration(`Bentuk ${chosen.name} Masuk ke Sarang!`, () => {
              this.level++;
              this.loadLevel(this.level);
            });
          }
        }, 1100);
      } else {
        card.classList.add('wrong');
        this.engine.sound.playOops();
        speakText(`Coba cari bentuk ${this.currentTarget.name} ya!`);
        setTimeout(() => card.classList.remove('wrong'), 500);
      }
    }
  }
}
