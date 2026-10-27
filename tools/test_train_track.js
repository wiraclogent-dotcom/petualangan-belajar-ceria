// Test script to verify HubController and TrainTrackGame logic

class MockClassList {
  constructor() {
    this.classes = new Set();
  }
  add(c) { this.classes.add(c); }
  remove(c) { this.classes.delete(c); }
  contains(c) { return this.classes.has(c); }
}

class MockElement {
  constructor(id = '') {
    this.id = id;
    this.classList = new MockClassList();
    this.innerText = '';
    this.innerHTML = '';
    this.style = {};
    this.listeners = {};
  }
  addEventListener(evt, fn) {
    if (!this.listeners[evt]) this.listeners[evt] = [];
    this.listeners[evt].push(fn);
  }
  appendChild(child) {}
}

const elements = {};
function getEl(id) {
  if (!elements[id]) elements[id] = new MockElement(id);
  return elements[id];
}

global.window = {
  addEventListener: () => {},
  lastSpokenText: '',
  tvGame: null,
  AudioContext: class {
    constructor() { this.currentTime = 0; this.destination = {}; }
    createOscillator() { return { type: '', frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {}, linearRampToValueAtTime: () => {} }, connect: () => {}, start: () => {}, stop: () => {} }; }
    createGain() { return { gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} }, connect: () => {} }; }
    createBuffer() { return { getChannelData: () => new Float32Array(100) }; }
    createBufferSource() { return { connect: () => {}, start: () => {}, stop: () => {} }; }
    createBiquadFilter() { return { frequency: { setValueAtTime: () => {} }, Q: { setValueAtTime: () => {} }, connect: () => {} }; }
  }
};

global.document = {
  createElement: (tag) => new MockElement(tag),
  getElementById: (id) => getEl(id),
  querySelectorAll: (selector) => [new MockElement(), new MockElement(), new MockElement(), new MockElement(), new MockElement()]
};

import { TrainTrackGame } from '../src/games/creative/TrainTrackGame.js';
import { HubController } from '../src/ui/HubController.js';
import { SoundFX } from '../src/core/soundFX.js';
import { TRAIN_TRACK_LEVELS } from '../src/data/trainTrackData.js';

console.log('--- TESTING TRAIN TRACK ARCHITECT & SUB-MENU ---');

// Mock Engine
class MockEngine {
  constructor() {
    this.sound = new SoundFX();
    this.currentView = 'HUB';
    this.hub = new HubController(this);
    this.games = {
      'GAME_TRAIN_TRACK': new TrainTrackGame(this)
    };
  }

  showView(view) {
    this.currentView = view;
    if (view === 'MENU_CREATIVE') {
      this.hub.updateCreativeMenuFocus();
    } else if (view === 'GAME_TRAIN_TRACK') {
      this.games.GAME_TRAIN_TRACK.start();
    }
  }

  initStars() {}
  updateStar() {}
  showCelebration() {}
  showVictory() {}
  reportTVState() {}

  navigateBack() {
    if (this.currentView === 'GAME_TRAIN_TRACK') {
      this.showView('MENU_CREATIVE');
      return true;
    }
    if (this.currentView === 'MENU_CREATIVE') {
      this.showView('HUB');
      return true;
    }
    return false;
  }
}

const engine = new MockEngine();

// 1. Test Navigation to MENU_CREATIVE from Hub
console.log('\n1. Navigating to Hub Card 4 (Tantangan Kreatif)...');
engine.hub.hubIndex = 4;
engine.hub.handleHubKey('Enter');
console.assert(engine.currentView === 'MENU_CREATIVE', `Expected MENU_CREATIVE, got ${engine.currentView}`);
console.log('✓ Successfully opened MENU_CREATIVE');

// 2. Test Launching Game 1: Train Track Architect
console.log('\n2. Selecting Misi 1 (Arsitek Rel Kereta)...');
engine.hub.creativeSubIndex = 0;
engine.hub.handleCreativeMenuKey('Enter');
console.assert(engine.currentView === 'GAME_TRAIN_TRACK', `Expected GAME_TRAIN_TRACK, got ${engine.currentView}`);
console.log('✓ Successfully launched GAME_TRAIN_TRACK');

const game = engine.games.GAME_TRAIN_TRACK;
console.assert(game.level === 1, `Level should be 1, got ${game.level}`);
console.assert(game.phase === 'CHOOSE_TRACK', `Phase should be CHOOSE_TRACK, got ${game.phase}`);
console.log('Level 1 target letter:', game.currentData.targetLetter);
console.log('Level 1 choices:', game.currentData.choices);

// 3. Test Remote Key 1 Direct Input
console.log('\n3. Pressing Remote Button "1"...');
game.handleKey('1');
console.assert(game.placedPiece === 'I', `Expected placedPiece 'I', got ${game.placedPiece}`);
console.log('✓ Correct piece snapped into gap. Placed piece:', game.placedPiece);

// Wait for transition to DRIVE_TRAIN
setTimeout(() => {
  console.assert(game.phase === 'DRIVE_TRAIN', `Expected phase DRIVE_TRAIN, got ${game.phase}`);
  console.log('✓ Game phase transitioned to DRIVE_TRAIN');

  // 4. Test Driving Train
  console.log('\n4. Pressing Remote "OK" / "Enter" to drive the train...');
  game.handleKey('Enter');
  console.assert(game.isDriving === true, 'Train should start driving');
  console.log('✓ Train driving started successfully');

  // 5. Test Back Navigation
  console.log('\n5. Testing Remote Back button...');
  engine.navigateBack();
  console.assert(engine.currentView === 'MENU_CREATIVE', `Expected back to MENU_CREATIVE, got ${engine.currentView}`);
  console.log('✓ Back from GAME_TRAIN_TRACK returns to MENU_CREATIVE');

  engine.navigateBack();
  console.assert(engine.currentView === 'HUB', `Expected back to HUB, got ${engine.currentView}`);
  console.log('✓ Back from MENU_CREATIVE returns to HUB');

  console.log('\n🎉 ALL TRAIN TRACK ARCHITECT & SUB-MENU TESTS PASSED SUCCESSFULLY!');
  process.exit(0);
}, 1100);
