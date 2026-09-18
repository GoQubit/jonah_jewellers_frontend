package com.jonahjewels.app;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import androidx.core.splashscreen.SplashScreen;

/**
 * Real launcher Activity, shown before MainActivity.
 *
 * Deliberately a plain Activity, not AppCompatActivity: androidx.core.
 * splashscreen's setKeepOnScreenCondition() calls findViewById() internally,
 * which on an AppCompatActivity goes through AppCompatDelegate and throws
 * IllegalStateException unless the theme extends Theme.AppCompat. Our
 * launch theme (AppTheme.NoActionBarLaunch) extends Theme.SplashScreen, not
 * AppCompat, so this MUST stay a plain Activity.
 *
 * There are technically two layers here, but only one is ever visible:
 *  1. Android 12+'s mandatory system Splash Screen API (Theme.SplashScreen)
 *     - required for the very first activity of a cold start, cannot be
 *     skipped outright. Its icon (windowSplashScreenAnimatedIcon in
 *     styles.xml) is a fully transparent placeholder and its background is
 *     white, matching this activity's own background, so this frame is
 *     indistinguishable from blank white - the person never perceives it as
 *     a separate screen. Dismissed immediately (setKeepOnScreenCondition
 *     (() -> false)) since there's nothing to wait for.
 *  2. activity_splash.xml - our own layout showing the real app logo
 *     (drawable-nodpi/splash_logo.png, cropped from the same
 *     public/images/logo2.png used in the web header), held for
 *     SPLASH_DURATION_MS, then MainActivity starts.
 *
 * If you ever see two visually distinct splash screens again, it means
 * windowSplashScreenAnimatedIcon or the theme/activity background colors
 * have drifted out of sync - keep them matched.
 */
public class SplashActivity extends Activity {

  // Keep this in sync with capacitor.config.ts's SplashScreen.launchShowDuration
  // (set to 0 there, since this Activity is what actually controls the
  // visible splash duration).
  private static final long SPLASH_DURATION_MS = 1200;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    // Must be called before super.onCreate(), before anything else touches
    // the window.
    SplashScreen splashScreen = SplashScreen.installSplashScreen(this);
    splashScreen.setKeepOnScreenCondition(() -> false);

    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_splash);

    new Handler(Looper.getMainLooper()).postDelayed(() -> {
      startActivity(new Intent(SplashActivity.this, MainActivity.class));
      finish();
    }, SPLASH_DURATION_MS);
  }
}
