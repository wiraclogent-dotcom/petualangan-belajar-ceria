package com.dinohitung.app;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.speech.tts.TextToSpeech;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.util.ArrayList;
import java.util.Locale;

public class MainActivity extends Activity {
    private static final String TAG = "PetualanganBelajar";
    private WebView webView;
    private TextToSpeech tts;
    private boolean isTtsReady = false;
    private String pendingSpeech = null;
    private SpeechRecognizer speechRecognizer;
    private Intent speechIntent;
    private boolean isListening = false;
    private static final String ONLINE_URL = "https://wiraclogent-dotcom.github.io/petualangan-belajar-ceria/";
    private static final String OFFLINE_URL = "file:///android_asset/index.html";
    private boolean isOfflineFallback = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Keep screen awake while playing
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        // Fullscreen Immersive Mode for TV
        hideSystemUI();

        // Request runtime permission for remote microphone
        checkRecordAudioPermission();

        // Initialize Android Native TextToSpeech for TV
        initTTS();

        // Initialize Android Native SpeechRecognizer for TV Remote Mic
        initSpeechRecognizer();

        webView = new WebView(this);
        setContentView(webView);

        // Enable Chrome DevTools Protocol remote debugging
        WebView.setWebContentsDebuggingEnabled(true);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setDatabaseEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);

        // Optimization: Do NOT force LAYER_TYPE_HARDWARE on WebView.
        // Android WebView manages its own internal hardware compositor.
        // Forcing LAYER_TYPE_HARDWARE causes tile memory exhaustion and GPU context loss on TV GPUs.
        webView.setFocusable(true);
        webView.setFocusableInTouchMode(true);
        webView.requestFocus();

        // Expose Native Android TTS & Voice Recognition to JavaScript Single Page App
        webView.addJavascriptInterface(new AndroidTTSBridge(), "AndroidTTS");
        webView.addJavascriptInterface(new AndroidVoiceBridge(), "AndroidVoice");

        // Enable standard web cache, check network for latest version
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                if (request.isForMainFrame() && !isOfflineFallback) {
                    isOfflineFallback = true;
                    view.loadUrl(OFFLINE_URL);
                }
            }

            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                if (!isOfflineFallback && failingUrl.startsWith("http")) {
                    isOfflineFallback = true;
                    view.loadUrl(OFFLINE_URL);
                }
            }

            @Override
            public boolean onRenderProcessGone(WebView view, android.webkit.RenderProcessGoneDetail detail) {
                Log.w(TAG, "WebView render process gone. Crashed: " + (detail != null && detail.didCrash()));
                if (webView != null) {
                    webView.destroy();
                    recreate();
                    return true;
                }
                return super.onRenderProcessGone(view, detail);
            }
        });

        webView.setWebChromeClient(new WebChromeClient());

        // Always attempt to load latest updates directly from GitHub Pages!
        webView.loadUrl(ONLINE_URL);
    }

    private void hideSystemUI() {
        View decorView = getWindow().getDecorView();
        decorView.setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_FULLSCREEN
        );
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            hideSystemUI();
        }
    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        // Intercept TV remote physical Back button
        if (event.getKeyCode() == KeyEvent.KEYCODE_BACK) {
            if (event.getAction() == KeyEvent.ACTION_UP) {
                triggerWebBack();
            }
            return true; // Always consume back key event so Android does not abruptly terminate the app
        }

        // Intercept TV remote physical Mic / Voice Assistant button (KeyCode 231 / 84 / 219)
        if (event.getKeyCode() == KeyEvent.KEYCODE_VOICE_ASSIST ||
            event.getKeyCode() == KeyEvent.KEYCODE_SEARCH ||
            event.getKeyCode() == 219 /* KEYCODE_ASSIST */) {
            if (event.getAction() == KeyEvent.ACTION_UP) {
                sendJs("window.onRemoteMicPressed && window.onRemoteMicPressed();");
            }
            return true; // Consume event to prevent Google Assistant overlay from disrupting game
        }

        // Forward TV remote DPAD and Enter keys to the WebView
        if (webView != null) {
            return webView.dispatchKeyEvent(event);
        }
        return super.dispatchKeyEvent(event);
    }

    @Override
    public void onBackPressed() {
        triggerWebBack();
    }

    private long lastBackPressTime = 0;

    private void triggerWebBack() {
        long now = System.currentTimeMillis();
        // Failsafe 1: Double-press Back within 700ms exits app unconditionally
        if (now - lastBackPressTime < 700) {
            finish();
            return;
        }
        lastBackPressTime = now;

        if (webView != null) {
            // Call window.handleRemoteBack() in JavaScript single page app
            webView.evaluateJavascript("window.handleRemoteBack ? window.handleRemoteBack() : false;", value -> {
                // If handleRemoteBack returned false (already at root HUB menu), exit the app cleanly
                if (!"true".equals(value)) {
                    finish();
                }
            });
        } else {
            super.onBackPressed();
        }
    }

    private void initTTS() {
        tts = new TextToSpeech(this, status -> {
            if (status == TextToSpeech.SUCCESS) {
                Locale indonesian = new Locale("id", "ID");
                int result = tts.setLanguage(indonesian);
                if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
                    result = tts.setLanguage(new Locale("id"));
                    if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
                        result = tts.setLanguage(new Locale("in", "ID"));
                        if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
                            result = tts.setLanguage(Locale.getDefault());
                        }
                    }
                }

                // Child-friendly voice tone: slightly higher pitch and gentle pacing
                tts.setPitch(1.15f);
                tts.setSpeechRate(0.92f);
                isTtsReady = true;
                Log.d(TAG, "Android TTS ready with locale result: " + result);

                if (pendingSpeech != null) {
                    String toSpeak = pendingSpeech;
                    pendingSpeech = null;
                    tts.speak(toSpeak, TextToSpeech.QUEUE_FLUSH, null, "TTS_PENDING_" + System.currentTimeMillis());
                }
            } else {
                Log.e(TAG, "Android TTS initialization failed with status: " + status);
            }
        });
    }

    public class AndroidTTSBridge {
        @JavascriptInterface
        public void speak(final String text) {
            if (text == null || text.trim().isEmpty()) {
                return;
            }
            runOnUiThread(() -> {
                if (tts != null && isTtsReady) {
                    try {
                        tts.stop();
                        tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "TTS_" + System.currentTimeMillis());
                    } catch (Exception e) {
                        Log.e(TAG, "Error speaking text", e);
                    }
                } else {
                    pendingSpeech = text;
                    Log.d(TAG, "TTS initializing, queued utterance: " + text);
                }
            });
        }

        @JavascriptInterface
        public void stop() {
            runOnUiThread(() -> {
                if (tts != null && isTtsReady) {
                    try {
                        tts.stop();
                    } catch (Exception e) {
                        Log.e(TAG, "Error stopping TTS", e);
                    }
                }
            });
        }

        @JavascriptInterface
        public boolean isAvailable() {
            return isTtsReady;
        }
    }

    public class AndroidVoiceBridge {
        @JavascriptInterface
        public void startListening() {
            runOnUiThread(() -> startListeningInternal());
        }

        @JavascriptInterface
        public void stopListening() {
            runOnUiThread(() -> stopListeningInternal());
        }

        @JavascriptInterface
        public boolean isAvailable() {
            return SpeechRecognizer.isRecognitionAvailable(MainActivity.this);
        }
    }

    private void checkRecordAudioPermission() {
        if (checkSelfPermission(android.Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{android.Manifest.permission.RECORD_AUDIO}, 101);
        }
    }

    private void initSpeechRecognizer() {
        runOnUiThread(() -> {
            try {
                if (SpeechRecognizer.isRecognitionAvailable(this)) {
                    speechRecognizer = SpeechRecognizer.createSpeechRecognizer(this);
                    speechIntent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
                    speechIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
                    speechIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "id-ID");
                    speechIntent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 5);
                    speechIntent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);

                    speechRecognizer.setRecognitionListener(new RecognitionListener() {
                        @Override
                        public void onReadyForSpeech(Bundle params) {
                            isListening = true;
                            sendJs("window.onVoiceReady && window.onVoiceReady();");
                        }

                        @Override
                        public void onBeginningOfSpeech() {
                            sendJs("window.onVoiceStart && window.onVoiceStart();");
                        }

                        @Override
                        public void onRmsChanged(float rmsdB) {}

                        @Override
                        public void onBufferReceived(byte[] buffer) {}

                        @Override
                        public void onEndOfSpeech() {
                            isListening = false;
                            sendJs("window.onVoiceEnd && window.onVoiceEnd();");
                        }

                        @Override
                        public void onError(int error) {
                            isListening = false;
                            Log.w(TAG, "SpeechRecognizer error: " + error);
                            sendJs("window.onVoiceError && window.onVoiceError(" + error + ");");
                        }

                        @Override
                        public void onResults(Bundle results) {
                            isListening = false;
                            ArrayList<String> matches = results != null ? results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION) : null;
                            if (matches != null && !matches.isEmpty()) {
                                String mainMatch = matches.get(0).replace("'", "\\'");
                                StringBuilder sb = new StringBuilder("[");
                                for (int i = 0; i < matches.size(); i++) {
                                    sb.append("'").append(matches.get(i).replace("'", "\\'")).append("'");
                                    if (i < matches.size() - 1) sb.append(",");
                                }
                                sb.append("]");
                                sendJs("window.onVoiceResult && window.onVoiceResult('" + mainMatch + "', " + sb.toString() + ");");
                            } else {
                                sendJs("window.onVoiceResult && window.onVoiceResult('', []);");
                            }
                        }

                        @Override
                        public void onPartialResults(Bundle partialResults) {
                            ArrayList<String> matches = partialResults != null ? partialResults.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION) : null;
                            if (matches != null && !matches.isEmpty()) {
                                String partial = matches.get(0).replace("'", "\\'");
                                sendJs("window.onVoicePartial && window.onVoicePartial('" + partial + "');");
                            }
                        }

                        @Override
                        public void onEvent(int eventType, Bundle params) {}
                    });
                } else {
                    Log.w(TAG, "SpeechRecognizer not available on this device");
                }
            } catch (Exception e) {
                Log.e(TAG, "Error initializing SpeechRecognizer", e);
            }
        });
    }

    private void startListeningInternal() {
        if (checkSelfPermission(android.Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            checkRecordAudioPermission();
            sendJs("window.onVoiceError && window.onVoiceError(9);");
            return;
        }

        if (speechRecognizer != null && speechIntent != null) {
            try {
                if (isListening) {
                    speechRecognizer.cancel();
                }
                speechRecognizer.startListening(speechIntent);
            } catch (Exception e) {
                Log.e(TAG, "Error starting SpeechRecognizer", e);
                sendJs("window.onVoiceError && window.onVoiceError(-1);");
            }
        } else {
            sendJs("window.onVoiceError && window.onVoiceError(10);");
        }
    }

    private void stopListeningInternal() {
        if (speechRecognizer != null) {
            try {
                speechRecognizer.stopListening();
            } catch (Exception e) {}
            isListening = false;
        }
    }

    private void sendJs(String code) {
        runOnUiThread(() -> {
            if (webView != null) {
                webView.evaluateJavascript(code, null);
            }
        });
    }

    @Override
    protected void onDestroy() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
        }
        if (speechRecognizer != null) {
            speechRecognizer.destroy();
        }
        super.onDestroy();
    }
}
