/**
 * VoiceController - Voice Recognition Engine untuk Smart TV & Browser
 * Mendukung Android TV Bluetooth Remote Mic (via AndroidVoice bridge)
 * dan Web Speech Recognition (di Browser PC/Laptop).
 * Dilengkapi Child-Friendly Indonesian Fuzzy Matching (Levenshtein & Phonetic Tolerance).
 */

export class VoiceController {
  constructor(engine) {
    this.engine = engine;
    this.isListening = false;
    this.recognition = null;
    this.currentTargetWord = '';
    this.currentTargetLetter = '';
    this.onMatchCallback = null;
    this.onErrorCallback = null;

    this.indicatorEl = document.getElementById('voice-indicator');
    this.voiceTitleEl = document.getElementById('voice-title');
    this.voiceHintEl = document.getElementById('voice-hint');

    this.initBridge();
  }

  isAvailable() {
    if (window.AndroidVoice && typeof window.AndroidVoice.isAvailable === 'function') {
      try {
        return window.AndroidVoice.isAvailable();
      } catch (e) {
        return false;
      }
    }
    return ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }

  initBridge() {
    // 1. Hook callback dari Android Native (MainActivity.java)
    window.onVoiceReady = () => {
      this.isListening = true;
      this.showIndicator(true);
      console.log('VOICE: Ready for speech');
    };

    window.onVoiceStart = () => {
      if (this.voiceTitleEl) this.voiceTitleEl.innerText = 'Mendengarkan... 🎙️';
      console.log('VOICE: Speech started');
    };

    window.onVoiceEnd = () => {
      console.log('VOICE: Speech ended');
    };

    window.onVoiceResult = (mainMatch, candidates) => {
      console.log('VOICE: Result =', mainMatch, candidates);
      this.handleRecognitionResults(candidates || [mainMatch]);
    };

    window.onVoiceError = (errorCode) => {
      console.warn('VOICE: Error code', errorCode);
      this.hideIndicator();
      this.isListening = false;
      if (this.onErrorCallback) this.onErrorCallback(errorCode);
    };

    // 2. Hook tombol fisik Mic pada Remote TV (KeyCode 231 / 84)
    window.onRemoteMicPressed = () => {
      console.log('VOICE: Remote mic button pressed');
      if (this.engine) {
        const curView = this.engine.currentView;
        const game = this.engine.games ? this.engine.games[curView] : null;
        if (game && typeof game.triggerVoiceInput === 'function') {
          game.triggerVoiceInput();
        }
      }
    };
  }

  startListening({ targetWord = '', targetLetter = '', onMatch = null, onError = null, hintText = '' }) {
    this.currentTargetWord = targetWord;
    this.currentTargetLetter = targetLetter;
    this.onMatchCallback = onMatch;
    this.onErrorCallback = onError;

    this.showIndicator(true, hintText || `Katakan: "${targetWord || targetLetter}"`);

    // Prioritas 1: Native Android TV Remote Mic Bridge
    if (window.AndroidVoice && typeof window.AndroidVoice.startListening === 'function') {
      try {
        window.AndroidVoice.startListening();
        return true;
      } catch (e) {
        console.warn('Native AndroidVoice start failed, trying Web Speech:', e);
      }
    }

    // Prioritas 2: Web Speech API (PC / Chrome / Edge)
    const SpeechClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechClass) {
      try {
        if (this.recognition) {
          try { this.recognition.abort(); } catch (e) {}
        }
        this.recognition = new SpeechClass();
        this.recognition.lang = 'id-ID';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 5;

        this.recognition.onstart = () => {
          this.isListening = true;
          this.showIndicator(true);
        };

        this.recognition.onresult = (event) => {
          const candidates = [];
          for (let i = 0; i < event.results[0].length; i++) {
            candidates.push(event.results[0][i].transcript);
          }
          this.handleRecognitionResults(candidates);
        };

        this.recognition.onerror = (e) => {
          console.warn('Web Speech error:', e);
          this.hideIndicator();
          this.isListening = false;
          if (this.onErrorCallback) this.onErrorCallback(e);
        };

        this.recognition.onend = () => {
          this.isListening = false;
          setTimeout(() => this.hideIndicator(), 800);
        };

        this.recognition.start();
        return true;
      } catch (e) {
        console.warn('Web Speech start failed:', e);
      }
    }

    this.hideIndicator();
    return false;
  }

  stopListening() {
    this.isListening = false;
    this.hideIndicator();

    if (window.AndroidVoice && typeof window.AndroidVoice.stopListening === 'function') {
      try { window.AndroidVoice.stopListening(); } catch (e) {}
    }
    if (this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
    }
  }

  showIndicator(show, customHint = '') {
    if (!this.indicatorEl) {
      this.indicatorEl = document.getElementById('voice-indicator');
      this.voiceTitleEl = document.getElementById('voice-title');
      this.voiceHintEl = document.getElementById('voice-hint');
    }
    if (!this.indicatorEl) return;

    if (show) {
      if (this.voiceTitleEl) this.voiceTitleEl.innerText = 'Dengarkan... 🎙️';
      if (this.voiceHintEl && customHint) this.voiceHintEl.innerText = customHint;
      this.indicatorEl.classList.add('active');
    } else {
      this.indicatorEl.classList.remove('active');
    }
  }

  hideIndicator() {
    if (this.indicatorEl) {
      this.indicatorEl.classList.remove('active');
    }
  }

  handleRecognitionResults(candidates = []) {
    this.hideIndicator();
    this.isListening = false;

    if (!candidates || candidates.length === 0) {
      if (this.onErrorCallback) this.onErrorCallback('NO_SPEECH');
      return;
    }

    console.log(`Checking voice candidates: [${candidates.join(', ')}] against target: '${this.currentTargetWord}' / '${this.currentTargetLetter}'`);

    for (const phrase of candidates) {
      if (this.fuzzyMatch(phrase, this.currentTargetWord, this.currentTargetLetter)) {
        if (this.onMatchCallback) {
          this.onMatchCallback(phrase, true);
        }
        return;
      }
    }

    // Jika belum cocok
    if (this.onMatchCallback) {
      this.onMatchCallback(candidates[0], false);
    }
  }

  /**
   * Child-friendly Indonesian Fuzzy Matcher
   * Mentolerir pengucapan cadel / anak kecil:
   * - "Apew" cocok dengan "Apel"
   * - "Cewi" cocok dengan "Ceri"
   * - "Gajah" cocok dengan "G" / "Gajah"
   */
  fuzzyMatch(spokenText, targetWord, targetLetter) {
    if (!spokenText) return false;
    const spoken = spokenText.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
    const word = (targetWord || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '');
    const letter = (targetLetter || '').toLowerCase().trim();

    if (!spoken) return false;

    // 1. Cocok Langsung
    if (word && spoken === word) return true;
    if (letter && spoken === letter) return true;

    // 2. Substring Match (e.g. "buah apel" mengandung "apel", atau "huruf b" mengandung "b")
    if (word && (spoken.includes(word) || (word.length >= 4 && word.includes(spoken)))) return true;
    if (letter && spoken.startsWith(letter)) return true;

    // 3. Kamus Fonik Anak Bahasa Indonesia
    const letterAliases = {
      a: ['a', 'aa', 'ah', 'apel', 'ha'],
      b: ['b', 'be', 'beh', 'bebek', 'bek'],
      c: ['c', 'ce', 'ceh', 'ceri', 'se'],
      d: ['d', 'de', 'deh', 'dino', 'dinosaurus'],
      e: ['e', 'eh', 'elang'],
      f: ['f', 'ef', 'fe', 'flamingo'],
      g: ['g', 'ge', 'gajah'],
      h: ['h', 'ha', 'hah', 'hiu'],
      i: ['i', 'ih', 'ikan'],
      j: ['j', 'je', 'jerapah'],
      k: ['k', 'ka', 'kah', 'kucing'],
      l: ['l', 'el', 'lumba'],
      m: ['m', 'em', 'mobil'],
      n: ['n', 'en', 'nanas'],
      o: ['o', 'oh', 'orangutan'],
      p: ['p', 'pe', 'pesawat'],
      q: ['q', 'ki', 'mahkota', 'queen'],
      r: ['r', 'er', 'roket'],
      s: ['s', 'es', 'singa'],
      t: ['t', 'te', 'truk'],
      u: ['u', 'uh', 'udang'],
      v: ['v', 've', 'biola'],
      w: ['w', 'we', 'wortel'],
      x: ['x', 'eks', 'musik'],
      y: ['y', 'ye', 'yoyo'],
      z: ['z', 'zet', 'zebra']
    };

    if (letter && letterAliases[letter]) {
      if (letterAliases[letter].some(alias => spoken === alias || spoken.includes(alias))) {
        return true;
      }
    }

    // 4. Levenshtein Distance Similarity (Toleransi lafal anak >= 70%)
    if (word && word.length >= 3) {
      const sim = this.similarity(spoken, word);
      if (sim >= 0.70) return true;

      // Substitusi umum anak: 'r' -> 'l', 'r' -> 'w', 's' -> 'c'
      const childSpoken = spoken.replace(/w/g, 'l').replace(/l/g, 'r');
      const childWord = word.replace(/w/g, 'l').replace(/l/g, 'r');
      if (childSpoken === childWord || this.similarity(childSpoken, childWord) >= 0.70) {
        return true;
      }
    }

    return false;
  }

  similarity(s1, s2) {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    const longerLength = longer.length;
    if (longerLength === 0) return 1.0;
    const distance = this.levenshtein(longer, shorter);
    return (longerLength - distance) / longerLength;
  }

  levenshtein(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }
}
