package com.jonahjewels.app;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebViewClient;

/**
 * Hands non-web links (upi://, intent://, tez://, phonepe://, paytmmp://,
 * credpay://, tel:, mailto: ...) out of the WebView to the matching app.
 *
 * Razorpay checkout (with webview_intent: true) launches UPI apps through
 * these links. Capacitor's default handler opens them as a plain
 * ACTION_VIEW, which breaks for intent:// URLs, so we parse them here.
 */
public class MainActivity extends BridgeActivity {

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getBridge().setWebViewClient(new BridgeWebViewClient(getBridge()) {
      @Override
      public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
        if (openExternalApp(request.getUrl().toString())) return true;
        return super.shouldOverrideUrlLoading(view, request);
      }
    });
  }

  private boolean openExternalApp(String url) {
    if (url == null) return false;
    String lower = url.toLowerCase();
    if (lower.startsWith("http:") || lower.startsWith("https:") || lower.startsWith("data:")
        || lower.startsWith("blob:") || lower.startsWith("about:") || lower.startsWith("javascript:")
        || lower.startsWith("file:")) {
      return false; // let Capacitor / the WebView handle normal pages
    }

    Intent intent = null;
    try {
      if (lower.startsWith("intent:")) {
        intent = Intent.parseUri(url, Intent.URI_INTENT_SCHEME);
        intent.addCategory(Intent.CATEGORY_BROWSABLE);
        intent.setComponent(null);
        intent.setSelector(null);
      } else {
        intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
      }
      startActivity(intent);
    } catch (ActivityNotFoundException e) {
      // App not installed: use the link's fallback, or open its Play Store page.
      try {
        if (intent != null) {
          String fallback = intent.getStringExtra("browser_fallback_url");
          if (fallback != null) {
            startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(fallback)));
          } else if (intent.getPackage() != null) {
            startActivity(new Intent(Intent.ACTION_VIEW,
                Uri.parse("market://details?id=" + intent.getPackage())));
          }
        }
      } catch (Exception ignored) { }
    } catch (Exception ignored) { }
    return true;
  }
}
