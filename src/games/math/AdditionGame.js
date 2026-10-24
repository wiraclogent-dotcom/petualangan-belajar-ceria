import { DINO_SVGS } from '../../data/dinos.js';
import { ADDITION_PROBLEMS } from '../../data/mathData.js';
import { shuffleArray } from '../../core/randomizer.js';
import { speakText } from '../../core/tts.js';

export class AdditionGame {
  constructor(engine) {
    this.engine = engine;
    this.level = 1;
    this.num1 = 1;
    this.num2 = 1;
    this.total = 2;
    this.choices = [];
    this.selectedChoice = 0;
    this.pool = [];
    this.isInputLocked = false;
  }

  start() {
    this.level = 1;
    this.pool = shuffleArray(ADDITION_PROBLEMS);
    this.engine.initStars('add-stars-container', 10);
    this.loadLevel(this.level);
  }

  loadLevel(lvl) {
    this.level = lvl;
    this.isInputLocked = false;
    document.getElementById('add-level').innerText = lvl;

    const curProblem = this.pool[lvl - 1];
    this.num1 = curProblem.a;
    this.num2 = curProblem.b;
    this.total = curProblem.a + curProblem.b;

    // Render Grup 1 & Grup 2 Dino
    const g1 = document.getElementById('add-group-1');
    const g2 = document.getElementById('add-group-2');
    g1.innerHTML = '';
    g2.innerHTML = '';

    for (let i = 0; i < this.num1; i++) {
      g1.innerHTML += DINO_SVGS[0]; // T-Rex Hijau
    }
    for (let i = 0; i < this.num2; i++) {
      g2.innerHTML += DINO_SVGS[1]; // Brachio Kuning
    }

    // Pilihan Telur
    this.generateEggs(this.total);

    this.selectedChoice = Math.floor(Math.random() * 3);
    this.updateEggFocus();
    speakText(`Tingkat ${lvl}. ${this.num1} ditambah ${this.num2}, totalnya berapa?`);
    this.engine.reportTVState();
  }

  generateEggs(correct) {
    const pool = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(n => n !== correct);
    pool.sort((a, b) => Math.abs(a - correct) - Math.abs(b - correct));
    const wrong1 = pool[0];
    const wrong2 = pool[1] !== undefined ? pool[1] : (pool[2] || 1);
    this.choices = shuffleArray([correct, wrong1, wrong2]);

    const container = document.getElementById('add-choices-container');
    container.innerHTML = '';
    this.choices.forEach((num, idx) => {
      const egg = document.createElement('div');
      egg.classList.add('egg-choice');
      egg.id = `add-choices-container-egg-${idx}`;
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
    document.querySelectorAll('#add-choices-container .egg-choice').forEach((egg, idx) => {
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
      speakText(`${this.num1} dinosaurus hijau ditambah ${this.num2} dinosaurus kuning.`);
    } else if (key === 'Enter' || key === ' ') {
      const chosen = this.choices[this.selectedChoice];
      this.submitAnswer(chosen);
    }
  }

  submitAnswer(chosen) {
    if (this.isInputLocked) return;
    const egg = document.getElementById(`add-choices-container-egg-${this.selectedChoice}`);

    if (chosen === this.total) {
      this.isInputLocked = true;
      egg.classList.add('correct');
      this.engine.sound.playCorrect();
      this.engine.confetti.fire(60);

      this.engine.updateStar(this.level, 'add-stars-container');
      speakText(`Pintar sekali! ${this.num1} ditambah ${this.num2} sama dengan ${this.total}!`);

      setTimeout(() => {
        if (this.level >= 10) {
          this.engine.showVictory();
        } else {
          this.engine.showCelebration(`Benar! ${this.num1} + ${this.num2} = ${this.total}!`, () => {
            this.level++;
            this.loadLevel(this.level);
          });
        }
      }, 1200);
    } else {
      this.engine.sound.playOops();
      egg.classList.add('wrong');
      speakText("Coba hitung lagi ya!");
      setTimeout(() => egg.classList.remove('wrong'), 500);
    }
  }
}
