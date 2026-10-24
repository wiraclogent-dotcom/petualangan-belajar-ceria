import { ALPHABET_DATA } from '../../data/alphabetData.js';
import { speakText, cancelSpeech } from '../../core/tts.js';

export class TrainGame {
  constructor(engine) {
    this.engine = engine;
    this.alphabetIndex = 0;
  }

  start() {
    this.alphabetIndex = 0;
    if (this.engine.voice) {
      this.engine.voice.stopListening();
    }
    this.renderCard();
  }

  renderCard() {
    const item = ALPHABET_DATA[this.alphabetIndex];
    document.getElementById('current-letter-index').innerText = this.alphabetIndex + 1;
    document.getElementById('letter-giant').innerText = item.letter;
    document.getElementById('letter-illustration').innerHTML = `<img src="assets/images/alphabet/${item.file}" alt="${item.word}">`;
    document.getElementById('letter-word').innerText = item.word;
    document.getElementById('letter-phonic').innerText = item.phonic;

    this.engine.sound.playNavigate();
    speakText(item.phonic);
    this.engine.reportTVState();
  }

  triggerVoiceInput() {
    if (!this.engine.voice) return;

    cancelSpeech();
    const item = ALPHABET_DATA[this.alphabetIndex];

    this.engine.voice.startListening({
      targetWord: item.word,
      targetLetter: item.letter,
      hintText: `Katakan: "${item.word}" atau "${item.letter}"`,
      onMatch: (spoken, isMatch) => {
        if (isMatch) {
          this.engine.sound.playCorrect();
          this.engine.confetti.fire(35);
          speakText(`Pintar sekali! ${item.word}!`);

          const card = document.getElementById('alphabet-card');
          if (card) {
            card.classList.add('correct');
            setTimeout(() => card.classList.remove('correct'), 1200);
          }

          // Otomatis pindah ke gerbong huruf selanjutnya setelah 1.8 detik
          setTimeout(() => {
            if (this.engine.currentView === 'GAME_ALPHABET' && this.alphabetIndex < ALPHABET_DATA.length - 1) {
              this.alphabetIndex++;
              this.renderCard();
            }
          }, 1800);
        } else {
          speakText(`Ayo coba lagi, ucapkan ${item.word}!`);
        }
      },
      onError: (err) => {
        console.warn('Voice error in TrainGame:', err);
      }
    });
  }

  handleKey(key) {
    if (this.engine.voice && this.engine.voice.isListening && (key === 'ArrowLeft' || key === 'ArrowRight')) {
      this.engine.voice.stopListening();
    }

    if (key === 'ArrowLeft') {
      if (this.alphabetIndex > 0) {
        this.alphabetIndex--;
        this.renderCard();
      }
    } else if (key === 'ArrowRight') {
      if (this.alphabetIndex < ALPHABET_DATA.length - 1) {
        this.alphabetIndex++;
        this.renderCard();
      }
    } else if (key === 'ArrowUp') {
      // Tombol Mic / Panah Atas remote untuk tirukan suara
      this.triggerVoiceInput();
    } else if (key === 'Enter' || key === ' ') {
      const item = ALPHABET_DATA[this.alphabetIndex];
      speakText(item.phonic);
    }
  }
}
