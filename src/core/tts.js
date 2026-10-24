/**
 * Bridge Suara Text-To-Speech Bahasa Indonesia
 * Mendukung Android Native TTS (di Xiaomi TV / APK) dan Web Speech API (di PC/Browser).
 */
export function speakText(text) {
  if (!text) return;
  window.lastSpokenText = text;
  console.log("TV_SPEECH:" + text);

  // 1. Android Native Text-to-Speech Bridge (Khusus Android TV & APK)
  if (window.AndroidTTS && typeof window.AndroidTTS.speak === 'function') {
    try {
      window.AndroidTTS.speak(text);
      return;
    } catch (e) {
      console.warn('Native AndroidTTS failed, fallback to Web Speech:', e);
    }
  }

  // 2. Web Speech API (Untuk Browser PC / Chrome / Edge)
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.log('Speech synthesis unavailable');
    }
  }
}

export function stopSpeech() {
  if (window.AndroidTTS && typeof window.AndroidTTS.stop === 'function') {
    try { window.AndroidTTS.stop(); } catch (e) {}
  }
  if ('speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
}

export const cancelSpeech = stopSpeech;

