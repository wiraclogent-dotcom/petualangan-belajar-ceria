import { SEQUENCE_DATA } from '../../data/logicData.js';
import { shuffleArray } from '../../core/randomizer.js';
import { speakText } from '../../core/tts.js';

export class SequenceGame {
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
    this.pool = shuffleArray(SEQUENCE_DATA);
    this.engine.initStars('sequence-stars-container', 20);
    this.loadLevel(this.level);
  }

  loadLevel(lvl) {
    this.isInputLocked = false;
    document.getElementById('sequence-level').innerText = lvl;

    const data = this.pool[lvl - 1];
    this.currentData = data;

    // Render 3 petak urutan cerita (Langkah 1, Langkah 2, dan Slot 3)
    const strip = document.getElementById('sequence-story-strip');
    strip.innerHTML = `
      <div class="sequence-step-card">
        <span class="sequence-step-badge">Mulai</span>
        <div class="sequence-step-icon">${data.step1.icon}</div>
        <div class="sequence-step-text">${data.step1.text}</div>
      </div>
      <div class="sequence-arrow">➜</div>
      <div class="sequence-step-card">
        <span class="sequence-step-badge">Lalu</span>
        <div class="sequence-step-icon">${data.step2.icon}</div>
        <div class="sequence-step-text">${data.step2.text}</div>
      </div>
      <div class="sequence-arrow">➜</div>
      <div class="sequence-step-card target-slot" id="sequence-target-slot">
        <span class="sequence-step-badge">Hasilnya?</span>
        <div class="sequence-step-icon">❓</div>
        <div class="sequence-step-text">Pilih Lanjutan</div>
      </div>
    `;

    // Buat 3 pilihan jawaban (1 benar + 2 distractor)
    const allChoices = [data.correctChoice, ...data.distractors];
    this.choices = shuffleArray(allChoices);
    this.selectedChoice = Math.floor(Math.random() * this.choices.length);

    const container = document.getElementById('sequence-choices-container');
    container.innerHTML = '';
    this.choices.forEach((choice, idx) => {
      const card = document.createElement('div');
      card.className = `sequence-choice-card ${idx === this.selectedChoice ? 'focused' : ''}`;
      card.id = `sequence-choice-${idx}`;
      card.innerHTML = `
        <div class="seq-icon">${choice.icon}</div>
        <div class="seq-name">${choice.text}</div>
      `;
      card.addEventListener('click', () => {
        this.selectedChoice = idx;
        this.updateFocus();
        this.handleKey('Enter');
      });
      container.appendChild(card);
    });

    speakText(`Cerita ${data.title}. ${data.targetPrompt}`);
    this.engine.reportTVState();
  }

  updateFocus() {
    document.querySelectorAll('.sequence-choice-card').forEach((card, idx) => {
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
    } else if (key === 'Enter' || key === ' ') {
      const chosen = this.choices[this.selectedChoice];
      const card = document.getElementById(`sequence-choice-${this.selectedChoice}`);

      if (chosen.id === this.currentData.correctChoice.id) {
        this.isInputLocked = true;
        card.classList.add('correct');
        this.engine.sound.playCorrect();
        this.engine.confetti.fire(35);
        this.engine.updateStar(this.level, 'sequence-stars-container');

        // Isi slot target
        const slot = document.getElementById('sequence-target-slot');
        slot.classList.add('filled');
        slot.innerHTML = `
          <span class="sequence-step-badge" style="background: #16a34a;">3. Selesai!</span>
          <div class="sequence-step-icon">${chosen.icon}</div>
          <div class="sequence-step-text" style="color: #15803d; font-weight: 900;">${chosen.text}</div>
        `;

        speakText(this.currentData.explanation);

        setTimeout(() => {
          if (this.level >= 20) {
            this.engine.showVictory();
          } else if (this.level === 10) {
            this.engine.showCheckpoint(() => {
              this.level++;
              this.loadLevel(this.level);
            });
          } else {
            this.engine.showCelebration(`Urutan Cerita Berhasil Disusun!`, () => {
              this.level++;
              this.loadLevel(this.level);
            });
          }
        }, 1200);
      } else {
        // Anti-tebak: Kunci input, visual oops, penjelasan vokal, regenerasi cerita baru
        this.isInputLocked = true;
        card.classList.add('wrong');
        this.engine.sound.playOops();
        speakText(`Belum tepat sayang. Coba perhatikan urutan cerita yang baru ini ya!`);

        setTimeout(() => {
          const candidates = SEQUENCE_DATA.filter(s => s.id !== this.currentData.id);
          const newSeq = candidates[Math.floor(Math.random() * candidates.length)] || this.currentData;
          this.pool[this.level - 1] = newSeq;
          this.loadLevel(this.level);
        }, 1300);
      }
    }
  }
}
