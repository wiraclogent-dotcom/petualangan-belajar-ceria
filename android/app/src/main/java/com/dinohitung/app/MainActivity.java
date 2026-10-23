package com.dinohitung.app;

import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    private WebView webView;
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

        webView = new WebView(this);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setDatabaseEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);

        // Optimize rendering performance & caching for TV
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        webView.setFocusable(true);
        webView.setFocusableInTouchMode(true);
        webView.requestFocus();

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

    private void triggerWebBack() {
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
}
