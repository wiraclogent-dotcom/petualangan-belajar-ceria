import { WORDS_DATA } from '../../data/logicData.js';
import { shuffleArray } from '../../core/randomizer.js';
import { speakText, cancelSpeech } from '../../core/tts.js';

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
    if (this.engine.voice) {
      this.engine.voice.stopListening();
    }
    this.pool = shuffleArray(WORDS_DATA);
    this.engine.initStars('words-stars-container', 20);
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
        if (this.isInputLocked) return;
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

  triggerVoiceInput() {
    if (this.isInputLocked || !this.engine.voice) return;

    cancelSpeech();
    const data = this.currentData;

    this.engine.voice.startListening({
      targetWord: data.word,
      targetLetter: '',
      hintText: `Katakan kata: "${data.word}"`,
      onMatch: (spoken, isMatch) => {
        if (this.isInputLocked) return;

        // 1. Cek kecocokan langsung dengan target jawaban
        if (isMatch) {
          const targetIdx = this.choices.indexOf(data.word);
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
          const wordChoice = this.choices[i];
          if (this.engine.voice.fuzzyMatch(spoken, wordChoice, '')) {
            matchedChoiceIdx = i;
            break;
          }
        }

        if (matchedChoiceIdx !== -1) {
          this.selectedChoice = matchedChoiceIdx;
          this.updateFocus();
          this.handleKey('Enter');
        } else {
          speakText(`Hampir! Yuk dekatkan remote dan ucapkan kata ${data.word}!`);
        }
      },
      onNoMatch: () => {
        speakText(`Suaramu belum terdengar sayang. Yuk coba dekatkan remote dan bilang kata ${data.word}!`);
      },
      onError: (err) => {
        console.warn('Voice error in WordsGame:', err);
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
      // Tombol Mic / Panah Atas remote untuk membaca lisan
      this.triggerVoiceInput();
    } else if (key === 'Enter' || key === ' ') {
      if (this.engine.voice) {
        this.engine.voice.stopListening();
      }

      const chosen = this.choices[this.selectedChoice];
      const card = document.getElementById(`words-choice-${this.selectedChoice}`);

      if (chosen === this.currentData.word) {
        this.isInputLocked = true;
        if (card) card.classList.add('correct');
        this.engine.sound.playCorrect();
        this.engine.confetti.fire(35);
        this.engine.updateStar(this.level, 'words-stars-container');

        const spelled = chosen.split('').join(' ');
        speakText(`Pintar sekali! ${spelled}, ${chosen}!`);

        setTimeout(() => {
          if (this.level >= 20) {
            this.engine.showVictory();
          } else if (this.level === 10) {
            this.engine.showCheckpoint(() => {
              this.level++;
              this.loadLevel(this.level);
            });
          } else {
            this.engine.showCelebration(`Kata ${chosen} Berhasil Dibaca!`, () => {
              this.level++;
              this.loadLevel(this.level);
            });
          }
        }, 1200);
      } else {
        // Anti-tebak: Kunci input, visual oops, penjelasan vokal, regenerasi soal baru di tingkat ini
        this.isInputLocked = true;
        if (card) card.classList.add('wrong');
        this.engine.sound.playOops();
        speakText(`Itu kata ${chosen}. Sekarang coba perhatikan gambar yang baru ini ya!`);

        setTimeout(() => {
          const candidates = WORDS_DATA.filter(w => w.word !== this.currentData.word);
          const newWord = candidates[Math.floor(Math.random() * candidates.length)] || this.currentData;
          this.pool[this.level - 1] = newWord;
          this.loadLevel(this.level);
        }, 1300);
      }
    }
  }
}
