/**
 * VoiceController - Voice Recognition Engine untuk Smart TV & Browser
 * Mendukung Android TV Bluetooth Remote Mic (via AndroidVoice bridge)
 * dan Web Speech Recognition (di Browser PC/Laptop).
 * Dilengkapi Child-Friendly Indonesian Fuzzy Matching (Levenshtein & Phonetic Tolerance).
 */
import { speakText } from './tts.js';

export class VoiceController {
  constructor(engine) {
    this.engine = engine;
    this.isListening = false;
    this.recognition = null;
    this.currentTargetWord = '';
    this.currentTargetLetter = '';
    this.onMatchCallback = null;
    this.onNoMatchCallback = null;
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

    window.onVoiceRms = (rms) => {
      if (this.isListening && rms > 0) {
        const bars = document.querySelectorAll('.wave-bar');
        const scale = Math.min(1 + rms / 3.2, 3.2);
        bars.forEach((b, idx) => {
          b.style.height = `${Math.min(28, 8 * scale + (idx % 2) * 4)}px`;
          b.style.background = '#22c55e'; // Hijau terang saat mic menangkap audio aktif
        });
      }
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

      // Error 6 = SPEECH_TIMEOUT, Error 7 = NO_MATCH (suara anak pelan atau belum terdengar)
      if (errorCode === 6 || errorCode === 7) {
        if (this.onNoMatchCallback) {
          this.onNoMatchCallback();
        } else {
          speakText(`Suaramu belum terdengar sayang. Yuk coba dekatkan remote dan bilang lagi!`);
        }
      } else if (this.onErrorCallback) {
        this.onErrorCallback(errorCode);
      }
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

  startListening({ targetWord = '', targetLetter = '', onMatch = null, onNoMatch = null, onError = null, hintText = '' }) {
    this.currentTargetWord = targetWord;
    this.currentTargetLetter = targetLetter;
    this.onMatchCallback = onMatch;
    this.onNoMatchCallback = onNoMatch;
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
          if (this.onNoMatchCallback) {
            this.onNoMatchCallback();
          } else if (this.onErrorCallback) {
            this.onErrorCallback(e);
          }
        };

        this.recognition.onend = () => {
          this.isListening = false;
          setTimeout(() => this.hideIndicator(), 500);
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
    const bars = document.querySelectorAll('.wave-bar');
    bars.forEach(b => {
      b.style.height = '';
      b.style.background = '';
    });
  }

  handleRecognitionResults(candidates = []) {
    this.hideIndicator();
    this.isListening = false;

    if (!candidates || candidates.length === 0) {
      if (this.onNoMatchCallback) {
        this.onNoMatchCallback();
      } else if (this.onErrorCallback) {
        this.onErrorCallback('NO_SPEECH');
      }
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
   * Mentolerir pengucapan cadel / anak usia dini:
   * - "Apew" / "Ape" cocok dengan "Apel"
   * - "Bebe" / "Bek" cocok dengan "Bebek"
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

    // 2. Substring & Prefix Match (e.g. "buah apel" mengandung "apel", "bebe" awalan "bebek")
    if (word) {
      if (spoken.includes(word) || (word.length >= 4 && word.includes(spoken))) return true;
      if (spoken.length >= 3 && word.startsWith(spoken)) return true;
      if (word.length >= 3 && spoken.startsWith(word.substring(0, 3))) return true;
    }
    if (letter && spoken.startsWith(letter)) return true;

    // 3. Kamus Fonik Anak Bahasa Indonesia
    const letterAliases = {
      a: ['a', 'aa', 'ah', 'apel', 'ha', 'apa'],
      b: ['b', 'be', 'beh', 'bebek', 'bek', 'bi'],
      c: ['c', 'ce', 'ceh', 'ceri', 'se', 'ci'],
      d: ['d', 'de', 'deh', 'dino', 'dinosaurus', 'di'],
      e: ['e', 'eh', 'elang', 'ek'],
      f: ['f', 'ef', 'fe', 'flamingo'],
      g: ['g', 'ge', 'gajah', 'gi'],
      h: ['h', 'ha', 'hah', 'hiu'],
      i: ['i', 'ih', 'ikan', 'ik'],
      j: ['j', 'je', 'jerapah', 'ji'],
      k: ['k', 'ka', 'kah', 'kucing', 'ki'],
      l: ['l', 'el', 'lumba', 'li'],
      m: ['m', 'em', 'mobil', 'mi'],
      n: ['n', 'en', 'nanas', 'ni'],
      o: ['o', 'oh', 'orangutan'],
      p: ['p', 'pe', 'pesawat', 'pi'],
      q: ['q', 'ki', 'mahkota', 'queen', 'kui'],
      r: ['r', 'er', 'roket', 'ri'],
      s: ['s', 'es', 'singa', 'si'],
      t: ['t', 'te', 'truk', 'ti'],
      u: ['u', 'uh', 'udang'],
      v: ['v', 've', 'biola', 'vi'],
      w: ['w', 'we', 'wortel', 'wi'],
      x: ['x', 'eks', 'musik', 'ks'],
      y: ['y', 'ye', 'yoyo', 'yi'],
      z: ['z', 'zet', 'zebra', 'zi']
    };

    if (letter && letterAliases[letter]) {
      if (letterAliases[letter].some(alias => spoken === alias || spoken.includes(alias))) {
        return true;
      }
    }

    // 4. Levenshtein Distance Similarity (Toleransi tinggi lafal anak >= 58%)
    if (word && word.length >= 3) {
      const sim = this.similarity(spoken, word);
      if (sim >= 0.58) return true;

      // Substitusi umum anak: 'r' -> 'l', 'r' -> 'w', 's' -> 'c'
      const childSpoken = spoken.replace(/w/g, 'l').replace(/l/g, 'r');
      const childWord = word.replace(/w/g, 'l').replace(/l/g, 'r');
      if (childSpoken === childWord || this.similarity(childSpoken, childWord) >= 0.58) {
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
