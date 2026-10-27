import './styles/style.css';
import { SoundFX } from './core/soundFX.js';
import { ConfettiCannon } from './core/confetti.js';
import { speakText, cancelSpeech } from './core/tts.js';
import { HubController } from './ui/HubController.js';
import { OverlayController } from './ui/OverlayController.js';
import { VoiceController } from './core/voice.js';

import { CountingGame } from './games/math/CountingGame.js';
import { AdditionGame } from './games/math/AdditionGame.js';
import { BondsGame } from './games/math/BondsGame.js';

import { TrainGame } from './games/alphabet/TrainGame.js';
import { PhonicsGame } from './games/alphabet/PhonicsGame.js';
import { WordsGame } from './games/alphabet/WordsGame.js';

import { ShapesGame } from './games/shapes/ShapesGame.js';
import { ColorsGame } from './games/shapes/ColorsGame.js';
import { CompareGame } from './games/shapes/CompareGame.js';

import { OddGame } from './games/logic/OddGame.js';
import { SequenceGame } from './games/logic/SequenceGame.js';
import { PairsGame } from './games/logic/PairsGame.js';
import { TrainTrackGame } from './games/creative/TrainTrackGame.js';
import { SecretAgentGame } from './games/creative/SecretAgentGame.js';
import { RoboSorterGame } from './games/creative/RoboSorterGame.js';
import { GridMazeGame } from './games/creative/GridMazeGame.js';

export class LearningApp {
  constructor() {
    this.sound = new SoundFX();
    this.confetti = new ConfettiCannon(document.getElementById('confetti-canvas'));
    this.overlay = new OverlayController(this);
    this.hub = new HubController(this);
    this.voice = new VoiceController(this);

    this.currentView = 'HUB';

    this.games = {
      'GAME_COUNTING': new CountingGame(this),
      'GAME_ADDITION': new AdditionGame(this),
      'GAME_BONDS': new BondsGame(this),
      'GAME_ALPHABET': new TrainGame(this),
      'GAME_PHONICS': new PhonicsGame(this),
      'GAME_WORDS': new WordsGame(this),
      'GAME_SHAPES': new ShapesGame(this),
      'GAME_COLORS': new ColorsGame(this),
      'GAME_COMPARE': new CompareGame(this),
      'GAME_ODD': new OddGame(this),
      'GAME_SEQUENCE': new SequenceGame(this),
      'GAME_PAIRS': new PairsGame(this),
      'GAME_TRAIN_TRACK': new TrainTrackGame(this),
      'GAME_SECRET_AGENT': new SecretAgentGame(this),
      'GAME_ROBO_SORTER': new RoboSorterGame(this),
      'GAME_GRID_MAZE': new GridMazeGame(this)
    };

    this.attachEvents();
    this.initViews();
    this.initTVScaler();
  }

  initTVScaler() {
    const container = document.getElementById('game-container');
    if (!container) return;

    const adjustScale = () => {
      const isNativeTV = (window.innerWidth === 1280 && window.innerHeight === 720) || (window.AndroidTTS !== undefined);

      if (isNativeTV) {
        document.body.classList.add('is-tv-native');
        container.style.transform = '';
        return;
      }

      document.body.classList.remove('is-tv-native');
      const targetW = 1280;
      const targetH = 720;
      const paddingX = 48;
      const paddingY = 48;

      const availableW = Math.max(window.innerWidth - paddingX, 320);
      const availableH = Math.max(window.innerHeight - paddingY, 200);

      const scale = Math.min(availableW / targetW, availableH / targetH);
      container.style.transform = `scale(${scale})`;
    };

    window.addEventListener('resize', adjustScale);
    adjustScale();
  }

  // Overlay helper delegations
  initStars(containerId, max = 20) {
    this.overlay.initStars(containerId, max);
  }

  updateStar(lvl, containerId) {
    this.overlay.updateStar(lvl, containerId);
  }

  showCelebration(msg, onNextCallback) {
    this.overlay.showCelebration(msg, onNextCallback);
  }

  showCheckpoint(onNextCallback) {
    this.overlay.showCheckpoint(onNextCallback);
  }

  showVictory(starsCount) {
    this.overlay.showVictory(starsCount);
  }

  initViews() {
    this.showView('HUB');
  }

  showView(viewName) {
    cancelSpeech();
    if (this.voice) {
      this.voice.stopListening();
    }
    if (this.voice) {
      this.voice.stopListening();
    }

    this.currentView = viewName;
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    this.overlay.hideCelebration();
    this.overlay.hideVictory();

    switch (viewName) {
      case 'HUB':
        document.getElementById('view-hub').classList.add('active');
        this.hub.updateHubFocus();
        speakText('Pilih permainan seru!');
        break;
      case 'MENU_MATH':
        document.getElementById('view-menu-math').classList.add('active');
        this.hub.updateMathFocus();
        speakText('Pilih permainan matematika!');
        break;
      case 'GAME_COUNTING':
        document.getElementById('view-game-counting').classList.add('active');
        this.games.GAME_COUNTING.start();
        break;
      case 'GAME_ADDITION':
        document.getElementById('view-game-addition').classList.add('active');
        this.games.GAME_ADDITION.start();
        break;
      case 'GAME_BONDS':
        document.getElementById('view-game-bonds').classList.add('active');
        this.games.GAME_BONDS.start();
        break;
      case 'MENU_ALPHABET':
        document.getElementById('view-menu-alphabet').classList.add('active');
        this.hub.updateAlphabetMenuFocus();
        speakText('Dunia Abjad dan Literasi Ceria! Pilih permainan huruf!');
        break;
      case 'GAME_ALPHABET':
        document.getElementById('view-game-alphabet').classList.add('active');
        this.games.GAME_ALPHABET.start();
        break;
      case 'GAME_PHONICS':
        document.getElementById('view-game-phonics').classList.add('active');
        this.games.GAME_PHONICS.start();
        break;
      case 'GAME_WORDS':
        document.getElementById('view-game-words').classList.add('active');
        this.games.GAME_WORDS.start();
        break;
      case 'MENU_SHAPES':
        document.getElementById('view-menu-shapes').classList.add('active');
        this.hub.updateShapesMenuFocus();
        speakText('Pilih permainan warna dan bentuk!');
        break;
      case 'GAME_SHAPES':
        document.getElementById('view-game-shapes').classList.add('active');
        this.games.GAME_SHAPES.start();
        break;
      case 'GAME_COLORS':
        document.getElementById('view-game-colors').classList.add('active');
        this.games.GAME_COLORS.start();
        break;
      case 'GAME_COMPARE':
        document.getElementById('view-game-compare').classList.add('active');
        this.games.GAME_COMPARE.start();
        break;
      case 'MENU_LOGIC':
        document.getElementById('view-menu-logic').classList.add('active');
        this.hub.updateLogicMenuFocus();
        speakText('Laboratorium Logika Ceria! Pilih permainan nalar!');
        break;
      case 'GAME_ODD':
        document.getElementById('view-game-odd').classList.add('active');
        this.games.GAME_ODD.start();
        break;
      case 'GAME_SEQUENCE':
        document.getElementById('view-game-sequence').classList.add('active');
        this.games.GAME_SEQUENCE.start();
        break;
      case 'GAME_PAIRS':
        document.getElementById('view-game-pairs').classList.add('active');
        this.games.GAME_PAIRS.start();
        break;
      case 'MENU_CREATIVE':
        document.getElementById('view-menu-creative').classList.add('active');
        this.hub.updateCreativeMenuFocus();
        speakText('Tantangan Kreatif Ceria! Pilih misi seru!');
        break;
      case 'GAME_TRAIN_TRACK':
        document.getElementById('view-game-train-track').classList.add('active');
        this.games.GAME_TRAIN_TRACK.start();
        break;
      case 'GAME_SECRET_AGENT':
        document.getElementById('view-game-secret-agent').classList.add('active');
        this.games.GAME_SECRET_AGENT.start();
        break;
      case 'GAME_ROBO_SORTER':
        document.getElementById('view-game-robo-sorter').classList.add('active');
        this.games.GAME_ROBO_SORTER.start();
        break;
      case 'GAME_GRID_MAZE':
        document.getElementById('view-game-grid-maze').classList.add('active');
        this.games.GAME_GRID_MAZE.start();
        break;
    }

    this.reportTVState();
  }

  getTVState() {
    const activeGame = this.games[this.currentView];
    const activeChoice = activeGame && activeGame.selectedChoice !== undefined ? activeGame.selectedChoice : null;
    const isInputLocked = activeGame && activeGame.isInputLocked !== undefined ? activeGame.isInputLocked : false;

    return {
      view: this.currentView,
      hubIndex: this.hub.hubIndex,
      mathIndex: this.hub.mathIndex,
      alphabetSubIndex: this.hub.alphabetSubIndex,
      shapesSubIndex: this.hub.shapesSubIndex,
      logicSubIndex: this.hub.logicSubIndex,
      creativeSubIndex: this.hub.creativeSubIndex,
      activeChoice: activeChoice,
      countLevel: this.games.GAME_COUNTING ? this.games.GAME_COUNTING.level : 1,
      addLevel: this.games.GAME_ADDITION ? this.games.GAME_ADDITION.level : 1,
      bondsLevel: this.games.GAME_BONDS ? this.games.GAME_BONDS.level : 1,
      phonicsLevel: this.games.GAME_PHONICS ? this.games.GAME_PHONICS.level : 1,
      wordsLevel: this.games.GAME_WORDS ? this.games.GAME_WORDS.level : 1,
      shapeLevel: this.games.GAME_SHAPES ? this.games.GAME_SHAPES.level : 1,
      colorLevel: this.games.GAME_COLORS ? this.games.GAME_COLORS.level : 1,
      compareLevel: this.games.GAME_COMPARE ? this.games.GAME_COMPARE.level : 1,
      oddLevel: this.games.GAME_ODD ? this.games.GAME_ODD.level : 1,
      sequenceLevel: this.games.GAME_SEQUENCE ? this.games.GAME_SEQUENCE.level : 1,
      pairsLevel: this.games.GAME_PAIRS ? this.games.GAME_PAIRS.level : 1,
      trainTrackLevel: this.games.GAME_TRAIN_TRACK ? this.games.GAME_TRAIN_TRACK.level : 1,
      secretAgentLevel: this.games.GAME_SECRET_AGENT ? this.games.GAME_SECRET_AGENT.level : 1,
      roboSorterLevel: this.games.GAME_ROBO_SORTER ? this.games.GAME_ROBO_SORTER.level : 1,
      gridMazeLevel: this.games.GAME_GRID_MAZE ? this.games.GAME_GRID_MAZE.level : 1,
      isInputLocked: isInputLocked,
      isVoiceListening: this.voice ? this.voice.isListening : false,
      isCelebrationActive: this.overlay.isCelebrationActive,
      isVictoryActive: this.overlay.isVictoryActive,
      lastSpeech: window.lastSpokenText || null
    };
  }

  reportTVState() {
    window.tvGame = this;
    const state = this.getTVState();
    console.log('TV_STATE:' + JSON.stringify(state));
    return state;
  }

  navigateBack() {
    try {
      this.sound.playNavigate();
    } catch (e) {}

    cancelSpeech();
    if (this.voice) {
      this.voice.stopListening();
    }

    // Safety: pastikan input game aktif tidak terkunci saat navigasi mundur
    const curGame = this.games[this.currentView];
    if (curGame) {
      curGame.isInputLocked = false;
    }

    // 1. Pop-up overlay
    if (this.overlay.isCelebrationActive) {
      this.overlay.hideCelebration();
      return true;
    }
    if (this.overlay.isVictoryActive) {
      this.overlay.hideVictory();
      this.showView('HUB');
      return true;
    }

    // 2. Navigasi Hirarki Layar
    if (['GAME_COUNTING', 'GAME_ADDITION', 'GAME_BONDS'].includes(this.currentView)) {
      this.showView('MENU_MATH');
      return true;
    } else if (['GAME_SHAPES', 'GAME_COLORS', 'GAME_COMPARE'].includes(this.currentView)) {
      this.showView('MENU_SHAPES');
      return true;
    } else if (['GAME_ODD', 'GAME_SEQUENCE', 'GAME_PAIRS'].includes(this.currentView)) {
      this.showView('MENU_LOGIC');
      return true;
    } else if (['GAME_ALPHABET', 'GAME_PHONICS', 'GAME_WORDS'].includes(this.currentView)) {
      this.showView('MENU_ALPHABET');
      return true;
    } else if (['GAME_TRAIN_TRACK', 'GAME_SECRET_AGENT', 'GAME_ROBO_SORTER', 'GAME_GRID_MAZE'].includes(this.currentView)) {
      this.showView('MENU_CREATIVE');
      return true;
    } else if (['MENU_MATH', 'MENU_ALPHABET', 'MENU_SHAPES', 'MENU_LOGIC', 'MENU_CREATIVE'].includes(this.currentView)) {
      this.showView('HUB');
      return true;
    } else if (this.currentView === 'HUB') {
      return false; // Exit app on Android
    }
    return false;
  }

  attachEvents() {
    window.addEventListener('keydown', (e) => {
      // Ignore key repeat to prevent rapid multiple triggers on TV remote
      if (e.repeat && ['ArrowUp', 'Enter', 'Space'].includes(e.key)) {
        return;
      }

      // Prevent scrolling default remote TV
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space', 'Enter'].includes(e.key)) {
        e.preventDefault();
      }

      // Tombol Back resmi Remote TV
      if (['Escape', 'Backspace', 'Back', 'GoBack'].includes(e.key) || e.keyCode === 4 || e.keyCode === 27) {
        e.preventDefault();
        this.navigateBack();
        return;
      }

      // If Overlays active
      if (this.overlay.isCelebrationActive || this.overlay.isVictoryActive) {
        this.overlay.handleKey(e.key);
        return;
      }

      // Route key to current view
      if (this.currentView === 'HUB') {
        this.hub.handleHubKey(e.key);
      } else if (this.currentView === 'MENU_MATH') {
        this.hub.handleMathKey(e.key);
      } else if (this.currentView === 'MENU_ALPHABET') {
        this.hub.handleAlphabetMenuKey(e.key);
      } else if (this.currentView === 'MENU_SHAPES') {
        this.hub.handleShapesMenuKey(e.key);
      } else if (this.currentView === 'MENU_LOGIC') {
        this.hub.handleLogicMenuKey(e.key);
      } else if (this.currentView === 'MENU_CREATIVE') {
        this.hub.handleCreativeMenuKey(e.key);
      } else if (this.games[this.currentView]) {
        this.games[this.currentView].handleKey(e.key);
      }
    });
  }
}

// Global handler called by Android TV MainActivity
window.handleRemoteBack = () => {
  if (window.app) {
    return window.app.navigateBack();
  }
  return false;
};

// Global error boundary & failsafe
window.addEventListener('error', (e) => {
  console.error('GLOBAL_APP_ERROR:', e.message, e.filename, e.lineno);
  if (window.app && window.app.games) {
    const cur = window.app.games[window.app.currentView];
    if (cur) cur.isInputLocked = false;
  }
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('GLOBAL_PROMISE_REJECTION:', e.reason);
});

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.app = new LearningApp();
  });
} else {
  window.app = new LearningApp();
}
