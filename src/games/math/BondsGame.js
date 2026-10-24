import { BONDS_DATA } from '../../data/mathData.js';
import { shuffleArray } from '../../core/randomizer.js';
import { speakText } from '../../core/tts.js';

export class BondsGame {
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
    this.pool = shuffleArray(BONDS_DATA);
    this.engine.initStars('bonds-stars-container', 10);
    this.loadLevel(this.level);
  }

  loadLevel(lvl) {
    this.level = lvl;
    this.isInputLocked = false;
    document.getElementById('bonds-level').innerText = lvl;

    const data = this.pool[lvl - 1];
    this.currentData = data;

    // Render persamaan
    document.getElementById('bonds-filled-num').innerText = data.filled;
    document.getElementById('bonds-blank-num').innerText = '?';

    // Render papan ten-frame 2x5 (10 slot)
    const board = document.getElementById('ten-frame-board');
    board.innerHTML = '';
    for (let i = 0; i < 10; i++) {
      const cell = document.createElement('div');
      cell.className = 'ten-frame-cell';
      cell.id = `ten-frame-cell-${i}`;
      if (i < data.filled) {
        cell.classList.add('filled');
        cell.innerHTML = '🥚';
      }
      board.appendChild(cell);
    }

    // Pilihan telur pelengkap 10 (1 benar + 2 distractor)
    const correctMissing = data.missing;
    const pool = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(n => n !== correctMissing);
    pool.sort((a, b) => Math.abs(a - correctMissing) - Math.abs(b - correctMissing));
    const wrong1 = pool[0];
    const wrong2 = pool[1] !== undefined ? pool[1] : (pool[2] || 1);
    this.choices = shuffleArray([correctMissing, wrong1, wrong2]);
    this.selectedChoice = Math.floor(Math.random() * this.choices.length);

    const container = document.getElementById('bonds-choices-container');
    container.innerHTML = '';
    this.choices.forEach((num, idx) => {
      const egg = document.createElement('div');
      egg.className = `egg-choice ${idx === this.selectedChoice ? 'focused' : ''}`;
      egg.id = `bonds-egg-${idx}`;
      egg.innerText = num;
      egg.addEventListener('click', () => {
        this.selectedChoice = idx;
        this.updateEggFocus();
        this.submitAnswer(num);
      });
      container.appendChild(egg);
    });

    speakText(`Tingkat ${lvl}. Ada ${data.filled} telur. ${data.hint}`);
    this.engine.reportTVState();
  }

  updateEggFocus() {
    document.querySelectorAll('#bonds-choices-container .egg-choice').forEach((egg, idx) => {
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
      speakText(`Ada ${this.currentData.filled} telur di sarang sepuluh. ${this.currentData.hint}`);
    } else if (key === 'Enter' || key === ' ') {
      const chosen = this.choices[this.selectedChoice];
      this.submitAnswer(chosen);
    }
  }

  submitAnswer(chosen) {
    if (this.isInputLocked) return;
    const egg = document.getElementById(`bonds-egg-${this.selectedChoice}`);
    const correct = this.currentData.missing;

    if (chosen === correct) {
      this.isInputLocked = true;
      egg.classList.add('correct');
      this.engine.sound.playCorrect();
      this.engine.confetti.fire(35);
      this.engine.updateStar(this.level, 'bonds-stars-container');

      // Update angka kosong
      document.getElementById('bonds-blank-num').innerText = chosen;

      // Isi sisa slot ten-frame dengan kilau bonus!
      for (let i = this.currentData.filled; i < 10; i++) {
        const cell = document.getElementById(`ten-frame-cell-${i}`);
        if (cell) {
          cell.classList.add('filled-bonus');
          cell.innerHTML = '✨';
        }
      }

      speakText(`Hebat sekali! Benar, ${this.currentData.formula}! Sahabat sepuluh yang kompak!`);

      setTimeout(() => {
        if (this.level >= 10) {
          this.engine.showVictory();
        } else {
          this.engine.showCelebration(`${this.currentData.formula}! Sahabat 10 Lengkap!`, () => {
            this.level++;
            this.loadLevel(this.level);
          });
        }
      }, 1200);
    } else {
      egg.classList.add('wrong');
      this.engine.sound.playOops();
      speakText(`${this.currentData.filled} ditambah ${chosen} belum sepuluh. Coba cari telur yang lain ya!`);
      setTimeout(() => egg.classList.remove('wrong'), 500);
    }
  }
}
