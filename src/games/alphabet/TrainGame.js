import { ALPHABET_DATA } from '../../data/alphabetData.js';
import { speakText } from '../../core/tts.js';

export class TrainGame {
  constructor(engine) {
    this.engine = engine;
    this.alphabetIndex = 0;
  }

  start() {
    this.alphabetIndex = 0;
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

  handleKey(key) {
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
    } else if (key === 'Enter' || key === ' ' || key === 'ArrowUp') {
      const item = ALPHABET_DATA[this.alphabetIndex];
      speakText(item.phonic);
    }
  }
}
