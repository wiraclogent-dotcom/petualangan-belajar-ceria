import { PHONICS_DATA } from '../../data/logicData.js';
import { shuffleArray } from '../../core/randomizer.js';
import { speakText } from '../../core/tts.js';

export class PhonicsGame {
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
    this.pool = shuffleArray(PHONICS_DATA);
    this.engine.initStars('phonics-stars-container', 10);
    this.loadLevel(this.level);
  }

  loadLevel(lvl) {
    this.level = lvl;
    this.isInputLocked = false;
    document.getElementById('phonics-level').innerText = lvl;

    const data = this.pool[lvl - 1];
    this.currentData = data;

    document.getElementById('phonics-instruction-text').innerText = `Manakah huruf ${data.letter}?`;
    document.getElementById('phonics-prompt-text').innerText = `🎯 Dengarkan suaranya: "${data.soundHint}"`;

    // Acak 3 pilihan huruf
    this.choices = shuffleArray(data.choices);
    this.selectedChoice = Math.floor(Math.random() * this.choices.length);

    const container = document.getElementById('phonics-choices-container');
    container.innerHTML = '';
    this.choices.forEach((char, idx) => {
      const card = document.createElement('div');
      card.className = `phonics-choice-card ${idx === this.selectedChoice ? 'focused' : ''}`;
      card.id = `phonics-choice-${idx}`;
      card.innerText = char;
      card.addEventListener('click', () => {
        this.selectedChoice = idx;
        this.updateFocus();
        this.handleKey('Enter');
      });
      container.appendChild(card);
    });

    speakText(`Manakah huruf ${data.letter}? ${data.soundHint}`);
    this.engine.reportTVState();
  }

  updateFocus() {
    document.querySelectorAll('.phonics-choice-card').forEach((card, idx) => {
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
      speakText(`Manakah huruf ${this.currentData.letter}? ${this.currentData.soundHint}`);
    } else if (key === 'Enter' || key === ' ') {
      const chosen = this.choices[this.selectedChoice];
      const card = document.getElementById(`phonics-choice-${this.selectedChoice}`);

      if (chosen === this.currentData.letter) {
        this.isInputLocked = true;
        card.classList.add('correct');
        this.engine.sound.playCorrect();
        this.engine.confetti.fire(35);
        this.engine.updateStar(this.level, 'phonics-stars-container');

        speakText(`Hebat sekali! Benar, ini huruf ${chosen}!`);

        setTimeout(() => {
          if (this.level >= 10) {
            this.engine.showVictory();
          } else {
            this.engine.showCelebration(`Huruf ${chosen} Berhasil Ditemukan!`, () => {
              this.level++;
              this.loadLevel(this.level);
            });
          }
        }, 1200);
      } else {
        card.classList.add('wrong');
        this.engine.sound.playOops();
        speakText(`Itu huruf ${chosen}. Ayo cari huruf ${this.currentData.letter} ya!`);
        setTimeout(() => card.classList.remove('wrong'), 500);
      }
    }
  }
}
