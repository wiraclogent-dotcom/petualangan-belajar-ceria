import { PHONICS_DATA } from '../../data/logicData.js';
import { shuffleArray } from '../../core/randomizer.js';
import { speakText, cancelSpeech } from '../../core/tts.js';

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
    if (this.engine.voice) {
      this.engine.voice.stopListening();
    }
    this.pool = shuffleArray(PHONICS_DATA);
    this.engine.initStars('phonics-stars-container', 20);
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
        if (this.isInputLocked) return;
        this.selectedChoice = idx;
        this.updateFocus();
        this.handleKey('Enter');
      });
      container.appendChild(card);
    });

    speakText(`Dengarkan bunyinya: ${data.soundHint}. Manakah huruf ${data.letter}?`);
    this.engine.reportTVState();
  }

  updateFocus() {
    document.querySelectorAll('.phonics-choice-card').forEach((card, idx) => {
      if (idx === this.selectedChoice) card.classList.add('focused');
      else card.classList.remove('focused');
    });
    this.engine.reportTVState();
  }

  triggerVoiceInput() {
    if (this.isInputLocked || !this.engine.voice) return;

    cancelSpeech();
    const data = this.currentData;

    this.engine.voice.startListening({
      targetWord: data.soundHint,
      targetLetter: data.letter,
      hintText: `Katakan huruf "${data.letter}"`,
      onMatch: (spoken, isMatch) => {
        if (this.isInputLocked) return;

        // 1. Cek kecocokan langsung dengan target jawaban
        if (isMatch) {
          const targetIdx = this.choices.indexOf(data.letter);
          if (targetIdx !== -1) {
            this.selectedChoice = targetIdx;
            this.updateFocus();
            this.handleKey('Enter');
            return;
          }
        }

        // 2. Cek apakah ucapan anak menyebut salah satu pilihan lain di layar
        let matchedChoiceIdx = -1;
        for (let i = 0; i < this.choices.length; i++) {
          const ch = this.choices[i];
          if (this.engine.voice.fuzzyMatch(spoken, ch, ch)) {
            matchedChoiceIdx = i;
            break;
          }
        }

        if (matchedChoiceIdx !== -1) {
          this.selectedChoice = matchedChoiceIdx;
          this.updateFocus();
          this.handleKey('Enter');
        } else {
          speakText(`Hampir! Yuk dekatkan remote dan ucapkan huruf ${data.letter}!`);
        }
      },
      onNoMatch: () => {
        speakText(`Suaramu belum terdengar sayang. Yuk coba sebutkan huruf ${data.letter}!`);
      },
      onError: (err) => {
        console.warn('Voice error in PhonicsGame:', err);
      }
    });
  }

  handleKey(key) {
    if (this.isInputLocked) return;

    if (this.engine.voice && this.engine.voice.isListening && (key === 'ArrowLeft' || key === 'ArrowRight')) {
      this.engine.voice.stopListening();
    }

    if (key === 'ArrowLeft' && this.selectedChoice > 0) {
      this.selectedChoice--;
      this.engine.sound.playNavigate();
      this.updateFocus();
    } else if (key === 'ArrowRight' && this.selectedChoice < this.choices.length - 1) {
      this.selectedChoice++;
      this.engine.sound.playNavigate();
      this.updateFocus();
    } else if (key === 'ArrowUp') {
      // Tombol Mic / Panah Atas remote untuk bicara
      this.triggerVoiceInput();
    } else if (key === 'Enter' || key === ' ') {
      if (this.engine.voice) {
        this.engine.voice.stopListening();
      }

      const chosen = this.choices[this.selectedChoice];
      const card = document.getElementById(`phonics-choice-${this.selectedChoice}`);

      if (chosen === this.currentData.letter) {
        this.isInputLocked = true;
        if (card) card.classList.add('correct');
        this.engine.sound.playCorrect();
        this.engine.confetti.fire(35);
        this.engine.updateStar(this.level, 'phonics-stars-container');

        speakText(`Hebat sekali! Bunyi ${this.currentData.phoneme}, ini huruf ${chosen}!`);

        setTimeout(() => {
          if (this.level >= 20) {
            this.engine.showVictory();
          } else if (this.level === 10) {
            this.engine.showCheckpoint(() => {
              this.level++;
              this.loadLevel(this.level);
            });
          } else {
            this.engine.showCelebration(`Huruf ${chosen} Berhasil Ditemukan!`, () => {
              this.level++;
              this.loadLevel(this.level);
            });
          }
        }, 1200);
      } else {
        // Anti-tebak: Kunci input, visual oops, penjelasan suara fonik, lalu ganti pertanyaan baru
        this.isInputLocked = true;
        if (card) card.classList.add('wrong');
        this.engine.sound.playOops();
        speakText(`Itu huruf ${chosen}. Dengarkan bunyinya lagi: ${this.currentData.phoneme}. Sekarang coba dengarkan suara yang baru ini ya!`);

        setTimeout(() => {
          const candidates = PHONICS_DATA.filter(p => p.letter !== this.currentData.letter);
          const newPhonics = candidates[Math.floor(Math.random() * candidates.length)] || this.currentData;
          this.pool[this.level - 1] = newPhonics;
          this.loadLevel(this.level);
        }, 1300);
      }
    }
  }
}
