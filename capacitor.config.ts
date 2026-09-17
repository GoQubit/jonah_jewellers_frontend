import type { CapacitorConfig } from '@capacitor/cli';

/**
 * Remote/Hybrid Capacitor config.
 *
 * The Android app does NOT bundle a static export of the Next.js site.
 * Instead, the WebView loads the already-deployed production URL directly
 * (server.url below). This means:
 *  - middleware.ts, SSR, and the dynamic [category]/[productId]/[orderId]
 *    routes keep working exactly as they do on the web — nothing about
 *    routing or auth had to change.
 *  - Cookies, CORS, and the existing axios/js-cookie auth flow behave
 *    identically to a mobile browser tab, because the page's origin is
 *    the real https://www.jonahjewels.com domain, not a local file origin.
 *  - The app requires an internet connection to load (acceptable here,
 *    since login, cart, and checkout all require the network anyway).
 *
 * IMPORTANT: update PRODUCTION_URL if the production domain ever changes,
 * and bump versionCode/versionName in android/app/build.gradle for every
 * Play Store release (see CAPACITOR_MIGRATION.md, section 15).
 */
const PRODUCTION_URL = 'https://www.jonahjewels.com';

const config: CapacitorConfig = {
  appId: 'com.jonahjewels.app',
  appName: 'Jonah Jewels',

  // Required by the Capacitor CLI even in remote mode: `cap sync` copies
  // whatever is in webDir into the native project as a local fallback
  // shell. It is NOT what normally renders — server.url below takes over
  // as soon as the WebView has connectivity. See public/index.html.
  webDir: 'public',

  server: {
    url: PRODUCTION_URL,
    cleartext: false, // HTTPS only
    androidScheme: 'https',
    // Domains the in-app WebView is allowed to navigate to without being
    // kicked out to an external browser. Needed for: your own site/API,
    // Razorpay's hosted checkout overlay, and your media storage domain
    // (next.config.ts already whitelists these for next/image).
    allowNavigation: [
      'jonahjewels.com',
      '*.jonahjewels.com',
      'checkout.razorpay.com',
      'api.razorpay.com',
      '*.razorpay.com',
      'jonahblob.blob.core.windows.net',
    ],
  },

  android: {
    allowMixedContent: false, // keep HTTPS-only; do not weaken this for production
    webContentsDebuggingEnabled: false, // set true temporarily only for local chrome://inspect debugging
  },

  plugins: {
    // launchShowDuration is 0 here on purpose: on Android 12+, this plugin
    // doesn't draw its own custom splash view - it just prolongs the native
    // OS Splash Screen API's icon-in-a-circle display for this long, which
    // is exactly the cropped-logo behavior we didn't want (see
    // SplashActivity.java). The actual branded splash - the full, unclipped
    // logo, for the same 1200ms - is now handled natively by SplashActivity
    // (android/app/src/main/java/com/jonahjewels/app/SplashActivity.java),
    // which runs before MainActivity ever starts. Keep this plugin's
    // duration at 0 so MainActivity doesn't show a second, redundant splash
    // on top of that.
    SplashScreen: {
      launchShowDuration: 0,
      backgroundColor: '#FFFFFF',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
