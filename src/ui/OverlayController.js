import { speakText } from '../core/tts.js';

export class OverlayController {
  constructor(engine) {
    this.engine = engine;
    this.isCelebrationActive = false;
    this.isVictoryActive = false;
    this.nextLevelCallback = null;
    this.celebrationEl = document.getElementById('celebration-overlay');
    this.celebrationMsgEl = document.getElementById('celebration-message');
    this.victoryEl = document.getElementById('victory-overlay');

    this.attachDomEvents();
  }

  attachDomEvents() {
    const nextBtn = document.getElementById('next-level-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.dismissCelebration();
      });
    }

    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.dismissVictory();
        this.engine.showView('HUB');
      });
    }
  }

  initStars(containerId, max = 10) {
    const cont = document.getElementById(containerId);
    if (!cont) return;
    cont.innerHTML = '';
    for (let i = 1; i <= max; i++) {
      const star = document.createElement('span');
      star.classList.add('star');
      star.id = `${containerId}-star-${i}`;
      star.innerText = '⭐';
      cont.appendChild(star);
    }
  }

  updateStar(lvl, containerId) {
    if (!containerId) return;
    const star = document.getElementById(`${containerId}-star-${lvl}`);
    if (star) {
      star.classList.add('earned');
    }
  }

  showCelebration(msg, onNextCallback) {
    this.isCelebrationActive = true;
    this.nextLevelCallback = onNextCallback;
    if (this.celebrationMsgEl) {
      this.celebrationMsgEl.innerText = msg;
    }
    if (this.celebrationEl) {
      this.celebrationEl.classList.add('active');
    }
    this.engine.reportTVState();
  }

  hideCelebration() {
    this.isCelebrationActive = false;
    if (this.celebrationEl) {
      this.celebrationEl.classList.remove('active');
    }
  }

  dismissCelebration() {
    if (!this.isCelebrationActive) return;
    this.isCelebrationActive = false;
    if (this.celebrationEl) {
      this.celebrationEl.classList.remove('active');
    }
    if (this.nextLevelCallback) {
      const cb = this.nextLevelCallback;
      this.nextLevelCallback = null;
      cb();
    }
    this.engine.reportTVState();
  }

  showVictory() {
    this.isVictoryActive = true;
    if (this.engine.sound) this.engine.sound.playVictory();
    if (this.engine.confetti) this.engine.confetti.fire(160);
    if (this.victoryEl) this.victoryEl.classList.add('active');
    speakText('Hore! Selamat! Kamu berhasil menyelesaikan semua tingkat!');
    this.engine.reportTVState();
  }

  hideVictory() {
    this.isVictoryActive = false;
    if (this.victoryEl) {
      this.victoryEl.classList.remove('active');
    }
  }

  dismissVictory() {
    if (!this.isVictoryActive) return;
    this.isVictoryActive = false;
    if (this.victoryEl) {
      this.victoryEl.classList.remove('active');
    }
    this.engine.reportTVState();
  }

  handleKey(key) {
    if (this.isCelebrationActive) {
      if (key === 'Enter' || key === ' ') {
        this.dismissCelebration();
      }
      return true;
    }

    if (this.isVictoryActive) {
      if (key === 'Enter' || key === ' ') {
        this.dismissVictory();
        this.engine.showView('HUB');
      }
      return true;
    }

    return false;
  }
}
