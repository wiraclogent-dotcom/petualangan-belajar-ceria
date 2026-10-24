export class HubController {
  constructor(engine) {
    this.engine = engine;
    this.hubIndex = 0; // 0: Matematika, 1: Abjad, 2: Warna, 3: Logika
    this.mathIndex = 0; // 0: Hitung, 1: Tambah, 2: Sahabat 10
    this.alphabetSubIndex = 0; // 0: Kereta, 1: Phonics, 2: Words
    this.shapesSubIndex = 0; // 0: Sarang Bentuk, 1: Kuas Warna, 2: Banding Ukuran
    this.logicSubIndex = 0; // 0: Detektif Benda, 1: Urutan Cerita, 2: Detektif Pasangan

    this.attachDomEvents();
  }

  attachDomEvents() {
    // Hub cards click
    document.querySelectorAll('.hub-card').forEach((card, idx) => {
      card.addEventListener('click', () => {
        this.hubIndex = idx;
        this.updateHubFocus();
        this.handleHubKey('Enter');
      });
    });

    // Sub-cards Math click
    document.querySelectorAll('#math-menu-grid .sub-card').forEach((card, idx) => {
      card.addEventListener('click', () => {
        this.mathIndex = idx;
        this.updateMathFocus();
        this.handleMathKey('Enter');
      });
    });

    // Sub-cards Alphabet click
    document.querySelectorAll('#alphabet-menu-grid .sub-card').forEach((card, idx) => {
      card.addEventListener('click', () => {
        this.alphabetSubIndex = idx;
        this.updateAlphabetMenuFocus();
        this.handleAlphabetMenuKey('Enter');
      });
    });

    // Sub-cards Shapes click
    document.querySelectorAll('#shapes-menu-grid .sub-card').forEach((card, idx) => {
      card.addEventListener('click', () => {
        this.shapesSubIndex = idx;
        this.updateShapesMenuFocus();
        this.handleShapesMenuKey('Enter');
      });
    });

    // Sub-cards Logic click
    document.querySelectorAll('#logic-menu-grid .sub-card').forEach((card, idx) => {
      card.addEventListener('click', () => {
        this.logicSubIndex = idx;
        this.updateLogicMenuFocus();
        this.handleLogicMenuKey('Enter');
      });
    });

    // Back buttons
    const mathBack = document.getElementById('math-back-btn');
    if (mathBack) mathBack.addEventListener('click', () => this.engine.navigateBack());

    const alphabetBack = document.getElementById('alphabet-back-btn');
    if (alphabetBack) alphabetBack.addEventListener('click', () => this.engine.navigateBack());

    const shapesBack = document.getElementById('shapes-back-btn');
    if (shapesBack) shapesBack.addEventListener('click', () => this.engine.navigateBack());

    const logicBack = document.getElementById('logic-back-btn');
    if (logicBack) logicBack.addEventListener('click', () => this.engine.navigateBack());

    document.querySelectorAll('.game-exit-btn').forEach(btn => {
      btn.addEventListener('click', () => this.engine.navigateBack());
    });
  }

  // --- 1. HUB FOCUS & KEYS ---
  updateHubFocus() {
    document.querySelectorAll('.hub-card').forEach((card, idx) => {
      if (idx === this.hubIndex) card.classList.add('focused');
      else card.classList.remove('focused');
    });
    this.engine.reportTVState();
  }

  handleHubKey(key) {
    if (key === 'ArrowLeft' && this.hubIndex > 0) {
      this.hubIndex--;
      this.engine.sound.playNavigate();
      this.updateHubFocus();
    } else if (key === 'ArrowRight' && this.hubIndex < 4) {
      this.hubIndex++;
      this.engine.sound.playNavigate();
      this.updateHubFocus();
    } else if (key === 'Enter' || key === ' ') {
      this.engine.sound.playNavigate();
      if (this.hubIndex === 0) this.engine.showView('MENU_MATH');
      else if (this.hubIndex === 1) this.engine.showView('MENU_ALPHABET');
      else if (this.hubIndex === 2) this.engine.showView('MENU_SHAPES');
      else if (this.hubIndex === 3) this.engine.showView('MENU_LOGIC');
      else if (this.hubIndex === 4) this.engine.showView('GAME_CODING');
    }
  }

  // --- 2. MATH SUB-MENU FOCUS & KEYS ---
  updateMathFocus() {
    document.querySelectorAll('#math-menu-grid .sub-card').forEach((card, idx) => {
      if (idx === this.mathIndex) card.classList.add('focused');
      else card.classList.remove('focused');
    });
    this.engine.reportTVState();
  }

  handleMathKey(key) {
    if (key === 'ArrowLeft' && this.mathIndex > 0) {
      this.mathIndex--;
      this.engine.sound.playNavigate();
      this.updateMathFocus();
    } else if (key === 'ArrowRight' && this.mathIndex < 2) {
      this.mathIndex++;
      this.engine.sound.playNavigate();
      this.updateMathFocus();
    } else if (key === 'Enter' || key === ' ') {
      this.engine.sound.playNavigate();
      if (this.mathIndex === 0) this.engine.showView('GAME_COUNTING');
      else if (this.mathIndex === 1) this.engine.showView('GAME_ADDITION');
      else if (this.mathIndex === 2) this.engine.showView('GAME_BONDS');
    }
  }

  // --- 3. ALPHABET SUB-MENU FOCUS & KEYS ---
  updateAlphabetMenuFocus() {
    document.querySelectorAll('#alphabet-menu-grid .sub-card').forEach((card, idx) => {
      if (idx === this.alphabetSubIndex) card.classList.add('focused');
      else card.classList.remove('focused');
    });
    this.engine.reportTVState();
  }

  handleAlphabetMenuKey(key) {
    if (key === 'ArrowLeft' && this.alphabetSubIndex > 0) {
      this.alphabetSubIndex--;
      this.engine.sound.playNavigate();
      this.updateAlphabetMenuFocus();
    } else if (key === 'ArrowRight' && this.alphabetSubIndex < 2) {
      this.alphabetSubIndex++;
      this.engine.sound.playNavigate();
      this.updateAlphabetMenuFocus();
    } else if (key === 'Enter' || key === ' ') {
      this.engine.sound.playNavigate();
      if (this.alphabetSubIndex === 0) this.engine.showView('GAME_ALPHABET');
      else if (this.alphabetSubIndex === 1) this.engine.showView('GAME_PHONICS');
      else if (this.alphabetSubIndex === 2) this.engine.showView('GAME_WORDS');
    }
  }

  // --- 4. SHAPES SUB-MENU FOCUS & KEYS ---
  updateShapesMenuFocus() {
    document.querySelectorAll('#shapes-menu-grid .sub-card').forEach((card, idx) => {
      if (idx === this.shapesSubIndex) card.classList.add('focused');
      else card.classList.remove('focused');
    });
    this.engine.reportTVState();
  }

  handleShapesMenuKey(key) {
    if (key === 'ArrowLeft' && this.shapesSubIndex > 0) {
      this.shapesSubIndex--;
      this.engine.sound.playNavigate();
      this.updateShapesMenuFocus();
    } else if (key === 'ArrowRight' && this.shapesSubIndex < 2) {
      this.shapesSubIndex++;
      this.engine.sound.playNavigate();
      this.updateShapesMenuFocus();
    } else if (key === 'Enter' || key === ' ') {
      this.engine.sound.playNavigate();
      if (this.shapesSubIndex === 0) this.engine.showView('GAME_SHAPES');
      else if (this.shapesSubIndex === 1) this.engine.showView('GAME_COLORS');
      else if (this.shapesSubIndex === 2) this.engine.showView('GAME_COMPARE');
    }
  }

  // --- 5. LOGIC SUB-MENU FOCUS & KEYS ---
  updateLogicMenuFocus() {
    document.querySelectorAll('#logic-menu-grid .sub-card').forEach((card, idx) => {
      if (idx === this.logicSubIndex) card.classList.add('focused');
      else card.classList.remove('focused');
    });
    this.engine.reportTVState();
  }

  handleLogicMenuKey(key) {
    if (key === 'ArrowLeft' && this.logicSubIndex > 0) {
      this.logicSubIndex--;
      this.engine.sound.playNavigate();
      this.updateLogicMenuFocus();
    } else if (key === 'ArrowRight' && this.logicSubIndex < 2) {
      this.logicSubIndex++;
      this.engine.sound.playNavigate();
      this.updateLogicMenuFocus();
    } else if (key === 'Enter' || key === ' ') {
      this.engine.sound.playNavigate();
      if (this.logicSubIndex === 0) this.engine.showView('GAME_ODD');
      else if (this.logicSubIndex === 1) this.engine.showView('GAME_SEQUENCE');
      else if (this.logicSubIndex === 2) this.engine.showView('GAME_PAIRS');
    }
  }
}
