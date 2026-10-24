import { PAIRS_DATA } from '../../data/logicData.js';
import { shuffleArray } from '../../core/randomizer.js';
import { speakText } from '../../core/tts.js';

export class PairsGame {
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
    this.pool = shuffleArray(PAIRS_DATA);
    this.engine.initStars('pairs-stars-container', 10);
    this.loadLevel(this.level);
  }

  loadLevel(lvl) {
    this.isInputLocked = false;
    document.getElementById('pairs-level').innerText = lvl;

    const data = this.pool[lvl - 1];
    this.currentData = data;

    // Target display
    document.getElementById('pairs-instruction-text').innerText = data.prompt;
    document.getElementById('pairs-target-icon').innerText = data.target.icon;
    document.getElementById('pairs-target-name').innerText = data.target.name;

    const blankSlot = document.getElementById('pairs-slot-blank');
    blankSlot.classList.remove('matched');
    document.getElementById('pairs-blank-icon').innerText = '❓';
    document.getElementById('pairs-blank-name').innerText = 'Pasangannya?';

    // Pilihan 3 benda (1 benar + 2 distractor)
    const allChoices = [data.correctChoice, ...data.distractors];
    this.choices = shuffleArray(allChoices);
    this.selectedChoice = Math.floor(Math.random() * this.choices.length);

    const container = document.getElementById('pairs-choices-container');
    container.innerHTML = '';
    this.choices.forEach((choice, idx) => {
      const card = document.createElement('div');
      card.className = `pairs-choice-card ${idx === this.selectedChoice ? 'focused' : ''}`;
      card.id = `pairs-choice-${idx}`;
      card.innerHTML = `
        <div class="pairs-choice-icon">${choice.icon}</div>
        <div class="pairs-choice-name">${choice.name}</div>
      `;
      card.addEventListener('click', () => {
        this.selectedChoice = idx;
        this.updateFocus();
        this.handleKey('Enter');
      });
      container.appendChild(card);
    });

    speakText(`Tingkat ${lvl}. ${data.prompt}`);
    this.engine.reportTVState();
  }

  updateFocus() {
    document.querySelectorAll('.pairs-choice-card').forEach((card, idx) => {
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
      speakText(this.currentData.prompt);
    } else if (key === 'Enter' || key === ' ') {
      const chosen = this.choices[this.selectedChoice];
      const card = document.getElementById(`pairs-choice-${this.selectedChoice}`);

      if (chosen.id === this.currentData.correctChoice.id) {
        this.isInputLocked = true;
        card.classList.add('correct');
        this.engine.sound.playCorrect();
        this.engine.confetti.fire(35);
        this.engine.updateStar(this.level, 'pairs-stars-container');

        // Isi slot target
        const blankSlot = document.getElementById('pairs-slot-blank');
        blankSlot.classList.add('matched');
        document.getElementById('pairs-blank-icon').innerText = chosen.icon;
        document.getElementById('pairs-blank-name').innerText = chosen.name;

        speakText(`Pintar sekali! ${this.currentData.reason}`);

        setTimeout(() => {
          if (this.level >= 10) {
            this.engine.showVictory();
          } else {
            this.showCelebration(`Pasangan Serasi Ditemukan!`, () => {
              this.level++;
              this.loadLevel(this.level);
            });
          }
        }, 1200);
      } else {
        card.classList.add('wrong');
        this.engine.sound.playOops();
        speakText(`${chosen.name} bukan pasangan yang tepat untuk ${this.currentData.target.name}. Ayo cari lagi ya!`);
        setTimeout(() => card.classList.remove('wrong'), 500);
      }
    }
  }
}
