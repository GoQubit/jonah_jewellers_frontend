package com.jonahjewels.app;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.splashscreen.SplashScreen;

/**
 * Real launcher Activity, shown before MainActivity.
 *
 * Android 12+'s system Splash Screen API (Theme.SplashScreen, which our
 * launch theme extends) is mandatory for the very first Activity of a cold
 * start, but it can only render a background color plus an icon inside a
 * fixed circular mask - never a full custom image. That's why the logo kept
 * appearing cropped inside a white circle no matter which drawable the
 * theme pointed at.
 *
 * This Activity lets that unavoidable OS splash dismiss essentially
 * instantly (setKeepOnScreenCondition(() -> false) below), then shows our
 * own plain layout (activity_splash.xml) with the full, unclipped logo via
 * a normal ImageView - which has no such OS-imposed masking - for
 * SPLASH_DURATION_MS, matching the previous launchShowDuration the
 * @capacitor/splash-screen plugin used to control. It then hands off to
 * MainActivity, which now starts directly into the app theme (see
 * AndroidManifest.xml) so it doesn't re-trigger a second native splash.
 */
public class SplashActivity extends AppCompatActivity {

  // Keep this in sync with capacitor.config.ts's SplashScreen.launchShowDuration
  // (now set to 0 there, since this Activity is what actually controls the
  // visible splash duration - see the comment in capacitor.config.ts).
  private static final long SPLASH_DURATION_MS = 1200;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    // Must be called before super.onCreate() / setContentView(), and before
    // anything else touches the window - this is what lets the mandatory
    // OS icon-and-color splash dismiss as soon as the framework allows,
    // instead of lingering for its own default duration.
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
