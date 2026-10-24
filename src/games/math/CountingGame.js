import { DINO_SVGS, NUMBER_WORDS } from '../../data/dinos.js';
import { shuffleArray } from '../../core/randomizer.js';
import { speakText } from '../../core/tts.js';

export class CountingGame {
  constructor(engine) {
    this.engine = engine;
    this.level = 1;
    this.choices = [];
    this.selectedChoice = 0;
    this.targetPool = [];
    this.currentTarget = 1;
    this.isInputLocked = false;
  }

  start() {
    this.level = 1;
    this.targetPool = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    this.engine.initStars('stars-container', 10);
    this.loadLevel(this.level);
  }

  loadLevel(lvl) {
    this.level = lvl;
    this.isInputLocked = false;
    document.getElementById('current-level').innerText = lvl;

    const target = this.targetPool[lvl - 1];
    this.currentTarget = target;

    // Render Dino
    const arena = document.getElementById('dino-arena');
    arena.innerHTML = '';
    arena.classList.remove('sparse', 'dense');
    if (target <= 3) arena.classList.add('sparse');
    else if (target >= 7) arena.classList.add('dense');

    for (let i = 1; i <= target; i++) {
      const card = document.createElement('div');
      card.classList.add('dino-card');
      card.innerHTML = `
        <div class="dino-number-tag">${i}</div>
        <div>${DINO_SVGS[(i - 1) % DINO_SVGS.length]}</div>
      `;
      arena.appendChild(card);
    }

    // Pilihan Telur
    this.generateEggs(target);

    this.selectedChoice = Math.floor(Math.random() * 3);
    this.updateEggFocus();
    speakText(`Tingkat ${lvl}. Ada berapa dinosaurus?`);
    this.engine.reportTVState();
  }

  generateEggs(correct) {
    const pool = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(n => n !== correct);
    pool.sort((a, b) => Math.abs(a - correct) - Math.abs(b - correct));
    const wrong1 = pool[0];
    const wrong2 = pool[1] !== undefined ? pool[1] : (pool[2] || 1);
    this.choices = shuffleArray([correct, wrong1, wrong2]);

    const container = document.getElementById('choices-container');
    container.innerHTML = '';
    this.choices.forEach((num, idx) => {
      const egg = document.createElement('div');
      egg.classList.add('egg-choice');
      egg.id = `choices-container-egg-${idx}`;
      egg.innerText = num;
      egg.addEventListener('click', () => {
        this.selectedChoice = idx;
        this.updateEggFocus();
        this.submitAnswer(num);
      });
      container.appendChild(egg);
    });
  }

  updateEggFocus() {
    document.querySelectorAll('#choices-container .egg-choice').forEach((egg, idx) => {
      if (idx === this.selectedChoice) egg.classList.add('focused');
      else egg.classList.remove('focused');
    });
    this.engine.reportTVState();
  }

  handleKey(key) {
    if (this.isInputLocked) return;

    if (key === 'ArrowLeft' && this.selectedChoice > 0) {
      this.selectedChoice--;
      this.engine.sound.playNavigate();
      this.updateEggFocus();
    } else if (key === 'ArrowRight' && this.selectedChoice < this.choices.length - 1) {
      this.selectedChoice++;
      this.engine.sound.playNavigate();
      this.updateEggFocus();
    } else if (key === 'ArrowUp') {
      this.countAlong();
    } else if (key === 'Enter' || key === ' ') {
      const chosen = this.choices[this.selectedChoice];
      this.submitAnswer(chosen);
    }
  }

  countAlong() {
    if (this.isInputLocked) return;
    this.isInputLocked = true;
    const cards = document.querySelectorAll('#dino-arena .dino-card');
    cards.forEach(c => c.classList.remove('counted'));

    let cur = 0;
    const interval = setInterval(() => {
      if (cur < cards.length) {
        cards[cur].classList.add('counted');
        const n = cur + 1;
        this.engine.sound.playCount(n);
        speakText(NUMBER_WORDS[n]);
        cur++;
      } else {
        clearInterval(interval);
        setTimeout(() => { this.isInputLocked = false; }, 500);
      }
    }, 700);
  }

  submitAnswer(chosen) {
    if (this.isInputLocked) return;
    const egg = document.getElementById(`choices-container-egg-${this.selectedChoice}`);

    if (chosen === this.currentTarget) {
      this.isInputLocked = true;
      egg.classList.add('correct');
      this.engine.sound.playCorrect();
      this.engine.confetti.fire(60);

      this.engine.updateStar(this.level, 'stars-container');
      speakText(`Hebat! Ada ${this.currentTarget} dinosaurus!`);

      setTimeout(() => {
        if (this.level >= 10) {
          this.engine.showVictory();
        } else {
          this.engine.showCelebration(`Ada ${this.currentTarget} Dinosaurus!`, () => {
            this.level++;
            this.loadLevel(this.level);
          });
        }
      }, 1200);
    } else {
      egg.classList.add('wrong');
      this.engine.sound.playOops();
      speakText(`Bukan ${chosen}. Ayo hitung dinosaurusnya bersama!`);
      setTimeout(() => egg.classList.remove('wrong'), 500);
    }
  }
}
