import { WORDS_DATA } from '../../data/logicData.js';
import { shuffleArray } from '../../core/randomizer.js';
import { speakText } from '../../core/tts.js';

export class WordsGame {
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
    this.pool = shuffleArray(WORDS_DATA);
    this.engine.initStars('words-stars-container', 10);
    this.loadLevel(this.level);
  }

  loadLevel(lvl) {
    this.level = lvl;
    this.isInputLocked = false;
    document.getElementById('words-level').innerText = lvl;

    const data = this.pool[lvl - 1];
    this.currentData = data;

    document.getElementById('words-image-wrapper').innerHTML = `<img src="assets/images/alphabet/${data.image}" alt="${data.word}">`;
    document.getElementById('words-helper-label').innerText = data.helper;
    document.getElementById('words-instruction-text').innerText = `Manakah tulisan kata ${data.word}?`;

    // Acak 3 pilihan kata
    this.choices = shuffleArray(data.choices);
    this.selectedChoice = Math.floor(Math.random() * this.choices.length);

    const container = document.getElementById('words-choices-container');
    container.innerHTML = '';
    this.choices.forEach((word, idx) => {
      const card = document.createElement('div');
      card.className = `words-choice-card ${idx === this.selectedChoice ? 'focused' : ''}`;
      card.id = `words-choice-${idx}`;
      card.innerText = word;
      card.addEventListener('click', () => {
        this.selectedChoice = idx;
        this.updateFocus();
        this.handleKey('Enter');
      });
      container.appendChild(card);
    });

    speakText(`Manakah kata ${data.word}? ${data.helper}`);
    this.engine.reportTVState();
  }

  updateFocus() {
    document.querySelectorAll('.words-choice-card').forEach((card, idx) => {
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
      speakText(`Manakah tulisan kata ${this.currentData.word}?`);
    } else if (key === 'Enter' || key === ' ') {
      const chosen = this.choices[this.selectedChoice];
      const card = document.getElementById(`words-choice-${this.selectedChoice}`);

      if (chosen === this.currentData.word) {
        this.isInputLocked = true;
        card.classList.add('correct');
        this.engine.sound.playCorrect();
        this.engine.confetti.fire(35);
        this.engine.updateStar(this.level, 'words-stars-container');

        const spelled = chosen.split('').join(' ');
        speakText(`Pintar sekali! ${spelled}, ${chosen}!`);

        setTimeout(() => {
          if (this.level >= 10) {
            this.engine.showVictory();
          } else {
            this.engine.showCelebration(`Kata ${chosen} Berhasil Dibaca!`, () => {
              this.level++;
              this.loadLevel(this.level);
            });
          }
        }, 1200);
      } else {
        card.classList.add('wrong');
        this.engine.sound.playOops();
        speakText(`Itu kata ${chosen}. Ayo cari kata ${this.currentData.word} ya!`);
        setTimeout(() => card.classList.remove('wrong'), 500);
      }
    }
  }
}
