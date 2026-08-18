# Jonah Jewels — Capacitor Android Migration Guide

## 0. Approach: Remote/Hybrid, not a static bundle

Capacitor is being used to wrap a **native Android shell around your already-deployed
site** (`https://www.jonahjewels.com`), not to bundle a static export of the Next.js
app inside the APK. This was your explicit choice over static export, and it's why the
migration touches almost nothing in `app/`, `components/`, `lib/`, or `middleware.ts`.

Concretely: `capacitor.config.ts` sets `server.url` to your production URL. When the
Android app opens, its WebView navigates straight to that URL. Everything that already
works on the web keeps working identically, because the page really is running at the
`https://www.jonahjewels.com` origin inside the WebView — not at a local file origin:

| Concern | Status |
|---|---|
| `middleware.ts` (auth-route guard, Edge runtime) | Unchanged — it runs on your real server, same as on desktop/mobile web. |
| Dynamic routes (`[category]`, `[productId]`, `[orderId]`) with no `generateStaticParams` | Unchanged — your Next server renders them on demand, same as today. |
| `next.config.ts` `images.domains` | Unchanged — `next/image` optimization API still runs server-side. |
| Cookies (`js-cookie`, `authToken`) | Unchanged — same origin, same cookie jar behavior as a mobile browser tab. |
| Axios + `NEXT_PUBLIC_BASE_URL` | Unchanged — requests originate from the real page origin, so today's CORS setup keeps working with zero backend changes. |
| Trade-off | The app requires network connectivity to load. Given login, cart, and Razorpay checkout all require the network anyway, this was judged an acceptable trade-off over a fully offline static bundle. |

Everything below is either (a) new files that live alongside your app without modifying
its logic, or (b) native Android project setup that happens *outside* the Next.js
codebase once you run the Capacitor CLI locally.

---

## 1. What was changed in the repo (full list)

| File | Change | Why |
|---|---|---|
| `package.json` | Added 6 `@capacitor/*` dependencies, 2 devDependencies, 5 npm scripts. | Capacitor runtime + CLI. See §2. |
| `capacitor.config.ts` | **New file.** Points the WebView at your production URL. | Required by every Capacitor project; this is the entire "how does the app know what to show" config. |
| `lib/capacitor/CapacitorBridge.tsx` | **New file.** A client component that no-ops on the web and wires up back-button/deep-link/status-bar/splash-screen/push behavior only inside the native app. | Isolates all native-shell logic into one file instead of scattering `Capacitor.isNativePlatform()` checks through your existing components. |
| `lib/capacitor/pushNotifications.ts` | **New file.** Optional FCM registration, inert unless explicitly enabled. | Keeps push notifications opt-in per your requirement. |
| `app/layout.tsx` | **One import + one line** (`<CapacitorBridge />`) added inside `<body>`. | The only touch point needed to activate the bridge app-wide. No existing markup, providers, or structure was reordered or removed. |
| `public/index.html` | **New file.** A tiny offline/error fallback page. | Capacitor's CLI requires `webDir` (`public/`) to contain an `index.html` on disk even in remote mode; this is what briefly shows before the WebView reaches your real site, or if the device is offline. It is not part of your Next.js routing and does not affect it. |

Nothing in `app/`, `components/`, `hooks/`, `context/`, `lib/api/`, `middleware.ts`,
Tailwind config, or any page/component was rewritten, restructured, or had its logic
changed.

---

## 2. Packages installed, and why

| Package | Type | Why it's required |
|---|---|---|
| `@capacitor/core` | dep | The runtime bridge between the WebView and native Android APIs. Every Capacitor app needs this. |
| `@capacitor/android` | dep | The Android native project template/runtime that `npx cap add android` generates against. |
| `@capacitor/cli` | devDep | The `cap` command (`init`, `add`, `sync`, `copy`, `open`). Only used at build/dev time, not shipped in the app bundle. |
| `@capacitor/app` | dep | Hardware back-button handling and deep-link (`appUrlOpen`) events — used in `CapacitorBridge.tsx`. |
| `@capacitor/status-bar` | dep | Lets the native status bar match your brand colors instead of the OS default. |
| `@capacitor/splash-screen` | dep | Native splash screen shown while the WebView connects to your production URL. |
| `@capacitor/push-notifications` | dep | FCM registration — installed now so the plugin exists, but inert until you opt in (§13). |
| `@capacitor/assets` | devDep | CLI tool to generate all Android icon/splash densities from one source image (§14). Not part of the runtime app. |

Not installed, and why: `@capacitor/camera` and `@capacitor/filesystem` were deliberately
left out. Your existing `<input type="file">` upload flow (`upload-media-field.tsx`,
`primary-image-field.tsx`) already works unmodified inside a Capacitor WebView — Android
WebView's native file chooser (which Capacitor's bridge supports out of the box) offers
Camera / Gallery / Files automatically once the manifest permissions in §6 are granted.
Adding a dedicated camera plugin would mean touching your upload components, which
isn't necessary for this to work. If you later want a custom in-app camera UI (rather
than the OS picker sheet), `@capacitor/camera` is the plugin to add at that point.

---

## 3. Commands to run locally (I cannot run these for you)

I don't have shell access to your project directory from here, and generating the
native `android/` project requires Node, your real `node_modules`, and (for opening/
building it) Android Studio + the Android SDK — none of which exist in my sandbox. Run
these from the project root on your machine:

```bash
# 1. Install the new dependencies added to package.json
npm install

# 2. Initialize Capacitor (reads capacitor.config.ts — already created for you,
#    but `cap init` is still what registers the project the first time)
npx cap init "Jonah Jewels" "com.jonahjewels.app" --web-dir=public

# 3. Generate the native Android project
npx cap add android

# 4. Copy web assets + config into the native project (run this after every
#    capacitor.config.ts change, or after `npm run build`)
npx cap sync android

# 5. Open in Android Studio to run on a device/emulator or build a release
npx cap open android
```

If `cap init` complains the project is already initialized (because
`capacitor.config.ts` exists), that's expected — skip straight to step 3.

---

## 4. Build configuration

No changes were made to `next build` itself — there is no static export, no asset
pipeline change, and no routing change. "Build" in the Capacitor sense refers to the
**Android/Gradle build**, which is entirely separate from your Next.js build and is
covered in §15.

Environment variables (`NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`) are
unaffected — they're baked into your Next.js build the same way they are today,
because the Android app just loads the already-built, already-deployed site.

---

## 5. The generated `android/` project (after `npx cap add android`)

| Path | Purpose | Should you edit it? |
|---|---|---|
| `android/app/src/main/AndroidManifest.xml` | Permissions, app metadata, deep-link intent filters. | **Yes** — this is where §6/§12 changes go. |
| `android/app/src/main/java/.../MainActivity.java` | Native entry point Capacitor generates. | **Yes, minimally** — only for the Razorpay/UPI intent handling in §11. |
| `android/app/src/main/res/` | Icons, splash images, colors, styles per screen density. | **Yes** — regenerated by `@capacitor/assets` (§14), don't hand-edit density folders. |
| `android/app/build.gradle` | App-level Gradle config: applicationId, versionCode/versionName, signing config. | **Yes** — for signing and version bumps (§15). |
| `android/build.gradle`, `android/settings.gradle`, `android/gradle.properties` | Project-level Gradle wiring. | Leave alone unless a Capacitor/plugin upgrade's docs say otherwise. |
| `android/capacitor.settings.gradle` | **Auto-generated** — lists installed Capacitor plugins as Gradle modules. | **Never hand-edit.** Regenerated by every `npx cap sync`. |
| `android/app/src/main/assets/capacitor.config.json` | **Auto-generated** copy of your `capacitor.config.ts`. | **Never hand-edit** — edit the root `capacitor.config.ts` instead and re-run `cap sync`. |
| `android/gradlew`, `android/gradlew.bat`, `android/gradle/wrapper/` | Gradle wrapper (lets you build from the CLI without a separate Gradle install). | **Never hand-edit.** |
| `android/local.properties` | Your machine's local Android SDK path. Machine-specific, git-ignored. | **Never commit or hand-edit** — Android Studio manages it. |

---

## 6. Android permissions (`AndroidManifest.xml`)

Add inside `<manifest>`, above `<application>`:

```xml
<!-- Required: all API calls, images, and the WebView itself need this -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- Required: native file-chooser camera capture for product/media uploads -->
<uses-permission android:name="android.permission.CAMERA" />

<!-- Required on Android 12 and below for saving invoices/downloads to device storage.
     Not required on Android 13+ (scoped storage handles this via the system picker). -->
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="28" />

<!-- Required only if/when push notifications are enabled (§13) -->
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
```

Deliberately **not** added: `ACCESS_FINE_LOCATION` / `ACCESS_COARSE_LOCATION` (nothing in
the codebase uses geolocation), `RECORD_AUDIO` (no audio capture feature),
`READ_CONTACTS` (no contact-picker feature). Only request permissions your app actually
uses — unused permissions are a common Play Store review flag.

---

## 7. WebView configuration

Handled via `capacitor.config.ts` (already created) and Capacitor's Android defaults:

| Setting | State | Where |
|---|---|---|
| JavaScript | Enabled (Capacitor default, cannot be disabled — the app wouldn't function otherwise) | n/a |
| DOM storage (`localStorage`) | Enabled (Capacitor default) | n/a |
| Cookies | Enabled, persisted via Android `CookieManager` (Capacitor default) | n/a |
| File upload (`<input type=file>`) | Supported natively by Capacitor's `WebViewClient` | n/a |
| HTTPS-only | Enforced | `capacitor.config.ts` → `server.cleartext: false`, `android.allowMixedContent: false` |
| Allowed external navigation | Restricted to your domain + Razorpay | `capacitor.config.ts` → `server.allowNavigation` |
| Back button | Mirrors browser back, exits app at root | `lib/capacitor/CapacitorBridge.tsx` |
| Remote debugging | Off in production | `capacitor.config.ts` → `android.webContentsDebuggingEnabled: false` (flip to `true` temporarily for `chrome://inspect` debugging, then revert before release) |

---

## 8. Authentication

No changes to your auth implementation. `axiosInstance.tsx` reads `authToken` from
`js-cookie` and sets it as a `Bearer` header — this is unaffected by running inside a
WebView, since `document.cookie` behaves the same as it does in a mobile browser tab
at the same origin. `middleware.ts`'s redirect logic runs server-side exactly as today.
Login persistence works because the Android WebView's cookie jar persists across app
restarts by default (this is standard Android `CookieManager` behavior, not something
Capacitor changes).

One thing worth testing explicitly on-device: confirm your login flow's `Cookies.set(...)`
call (wherever it sets `authToken` after OTP verification) doesn't rely on `Secure`-only
cookies being rejected — since `server.androidScheme` is `https`, this should already be
fine, but verify after your first real device test.

---

## 9. Axios / CORS

No CORS changes required. Because the WebView loads `https://www.jonahjewels.com`
directly (not a `capacitor://localhost` local bundle), every `axiosInstance` request
originates from the exact same origin your web CORS policy already allows. If your API
currently allows `https://www.jonahjewels.com` as an origin, it needs no new entries for
the Android app.

---

## 10. File upload (camera / gallery / file picker)

`upload-media-field.tsx` and `primary-image-field.tsx` are unmodified. Once the
`CAMERA` and storage permissions in §6 are declared, tapping the existing
`<input type="file" accept="image/*,video/*">` element triggers Android's native
chooser sheet (Camera / Gallery / Files) automatically — this is built into Capacitor's
WebView client, not something that needs plugin code.

---

## 11. Payment gateway (Razorpay)

`RazorpayButton.tsx` and `ChooseAddress.tsx` load `checkout.razorpay.com/v1/checkout.js`
and open the Razorpay overlay exactly as on the web — unchanged. Two Android-specific
things to verify on a real device:

1. **`allowNavigation`** in `capacitor.config.ts` already whitelists `checkout.razorpay.com`,
   `api.razorpay.com`, and `*.razorpay.com` so the overlay iframe/redirects aren't blocked.
2. **UPI app intents.** When a user picks a UPI app (Google Pay, PhonePe, etc.) inside the
   Razorpay overlay, Android needs to hand off an `intent://` URL to the OS so it can
   launch that app. Capacitor's default `WebViewClient` does not do this automatically —
   add this override to `MainActivity.java` after `cap add android` generates it:

```java
package com.jonahjewels.app;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    WebView webView = this.bridge.getWebView();
    webView.setWebViewClient(new WebViewClient() {
      @Override
      public boolean shouldOverrideUrlLoading(WebView view, String url) {
        if (url.startsWith("intent://")) {
          try {
            Intent intent = Intent.parseUri(url, Intent.URI_INTENT_SCHEME);
            intent.addCategory(Intent.CATEGORY_BROWSABLE);
            intent.setComponent(null);
            startActivity(intent);
          } catch (ActivityNotFoundException e) {
            // Target UPI app isn't installed — no-op, Razorpay's own
            // fallback UI (QR / other payment methods) still applies.
          } catch (Exception ignored) {
          }
          return true;
        }
        return false; // let Capacitor's bridge handle everything else as usual
      }
    });
  }
}
```

Test all payment methods (UPI intent, UPI collect/QR, card, netbanking) on a physical
device before release — emulators often don't have UPI apps installed to test the
intent hand-off path.

---

## 12. Deep links

`CapacitorBridge.tsx` already listens for `appUrlOpen` and routes in-app
(`router.push(url.pathname + url.search)`). To make `https://www.jonahjewels.com/...`
links opened from outside the app (SMS, WhatsApp, email, search results) open directly
in the app instead of a browser, add to `AndroidManifest.xml` inside the main
`<activity>`:

```xml
<intent-filter android:autoVerify="true">
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="https" android:host="www.jonahjewels.com" />
</intent-filter>
```

`android:autoVerify="true"` requires hosting a Digital Asset Links file at
`https://www.jonahjewels.com/.well-known/assetlinks.json` (this must be deployed on
your actual web server — I can't publish it for you from here):

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.jonahjewels.app",
    "sha256_cert_fingerprints": ["<YOUR_RELEASE_KEYSTORE_SHA256_FINGERPRINT>"]
  }
}]
```

Get the fingerprint after generating your release keystore (§15) with:
```bash
keytool -list -v -keystore your-release-key.jks -alias your-key-alias
```

---

## 13. Push notifications (optional, scaffolded but inactive)

`@capacitor/push-notifications` is installed and `lib/capacitor/pushNotifications.ts`
is wired up, but it only runs if you set `NEXT_PUBLIC_ENABLE_PUSH=true`. To activate:

1. Create a Firebase project; add an Android app with package name `com.jonahjewels.app`.
2. Download `google-services.json` into `android/app/`.
3. Add the Google Services Gradle plugin (Firebase's setup docs generate the exact two
   lines for `android/build.gradle` and `android/app/build.gradle` — apply as instructed
   for whatever Firebase console version you're on).
4. Set `NEXT_PUBLIC_ENABLE_PUSH=true` and wire the `registration` token (logged in
   `pushNotifications.ts`) to a backend endpoint that stores it against the user.

Until you do this, the app ships with zero Firebase dependency.

---

## 14. Icons & splash screen

Generate all densities from one 1024×1024 PNG (no transparency, your logo centered
with some padding) using `@capacitor/assets`:

```bash
mkdir -p resources
# put your 1024x1024 logo at resources/icon.png
# put a 2732x2732 splash background at resources/splash.png
npx capacitor-assets generate --android
```

This writes:
- App icon (all densities + adaptive icon foreground/background layers) →
  `android/app/src/main/res/mipmap-*/`
- Splash screen images → `android/app/src/main/res/drawable*/splash.png`

Re-run this command any time the logo changes; never hand-edit the generated density
folders directly.

---

## 15. Play Store readiness

**Signing key** (generate once, back up somewhere safe — losing it means you can never
update the app again under the same listing):
```bash
keytool -genkeypair -v -keystore jonah-jewels-release.jks \
  -alias jonah-jewels -keyalg RSA -keysize 2048 -validity 10000
```

**`android/app/build.gradle`** — add a signing config and reference it from the release
build type (replace the placeholder values or, better, source them from
`gradle.properties`/environment variables so the keystore password isn't committed):
```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file("jonah-jewels-release.jks")
            storePassword System.getenv("JONAH_KEYSTORE_PASSWORD")
            keyAlias "jonah-jewels"
            keyPassword System.getenv("JONAH_KEY_PASSWORD")
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false   // see note below
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

*R8/ProGuard note:* leave `minifyEnabled false` initially. This app has no custom native
Java/Kotlin logic beyond the small `MainActivity` override in §11 — all real logic is
JavaScript running in the WebView, which R8 never touches anyway. Enabling minification
adds risk (stripping a class a Capacitor plugin needs reflection for) for essentially no
benefit here, since there's no proprietary native code to protect. Revisit only if APK
size becomes a concern.

**Version bump** — every Play Store upload needs a new `versionCode`:
```gradle
defaultConfig {
    applicationId "com.jonahjewels.app"
    versionCode 1        // increment by 1 on every release you upload
    versionName "1.0.0"  // user-facing version string, semver recommended
}
```

**Build the release AAB** (Play Store requires `.aab`, not `.apk`):
```bash
cd android
./gradlew bundleRelease
# output: android/app/build/outputs/bundle/release/app-release.aab
```

**Play Console checklist:**
- App content: privacy policy URL (you already have `/privacy-policy` — link the live page).
- Data safety form: declare what's collected (auth token, order/profile data, payment
  metadata via Razorpay).
- Target API level: must meet Google Play's current minimum (check Play Console's
  current requirement at submission time — this changes yearly).
- Since this is a WebView-based app, make sure the store listing and description
  reflect real native functionality present (push notifications if enabled, deep links,
  native file/camera upload) — Google's Minimum Functionality policy scrutinizes
  apps that are *only* a website wrapper with zero native integration.

---

## 16. npm scripts added

```json
"cap:sync": "cap sync android",
"cap:copy": "cap copy android",
"android": "cap open android",
"open:android": "cap open android",
"build:android": "next build && cap sync android"
```

`build:android` runs your normal Next.js build (so env vars are validated / any
build-time checks still run) and then re-syncs the Capacitor config and `public/`
fallback shell into `android/` — it does not produce a static export.

---

## 17. What was intentionally left untouched

UI, components, Tailwind config, routing structure, `lib/api/*`, Redux store, all admin/
seller/kitty dashboard logic, and folder structure — none of it needed to change for
this approach. The only files touched are listed in §1, and every one of them is either
new (isolated in `lib/capacitor/` or config) or a single-line addition to `app/layout.tsx`.

---

## 18. Running & testing (Android Studio + VS Code)

**Prerequisites (one-time machine setup):**
- Node.js (you already have this, since the Next.js project runs).
- Android Studio (installs the Android SDK, an emulator manager, and a bundled JDK).
- VS Code stays your code editor for everything in this repo; it does not run or build
  Android apps itself — Android Studio (or the `gradlew` CLI it ships) does that part.

**Step 1 — generate/refresh the native project (VS Code terminal or any terminal):**
```bash
npm install
npx cap add android      # first time only — skip if android/ already exists
npx cap sync android      # re-run after any capacitor.config.ts or public/ change
```

**Step 2 — open and run in Android Studio:**
```bash
npx cap open android
```
This launches Android Studio pointed at the `android/` folder. Wait for the initial
Gradle sync to finish (progress bar at the bottom — first sync can take a few minutes).
Then:
1. Pick a target from the device dropdown at the top — either a physical phone
   connected via USB (with Developer Options → USB debugging enabled) or a virtual
   device (Tools → Device Manager → create one, e.g. Pixel 7, API 34).
2. Click the green ▶ Run button.
3. The app installs and launches. Since `capacitor.config.ts` points at
   `https://www.jonahjewels.com`, you'll see your live production site — no local dev
   server needed to test navigation, login, cart, checkout, etc.

**Testing your own in-progress changes (not yet deployed to production):**
Because this is remote mode, the app normally shows whatever's already live. To test
uncommitted Next.js changes on-device before deploying:
1. Run `npm run dev` on your machine and note your machine's LAN IP (e.g. `192.168.1.50`).
2. Temporarily edit `capacitor.config.ts`:
   ```ts
   server: {
     url: 'http://192.168.1.50:3000',
     cleartext: true, // required for http:// during local testing only
   }
   ```
3. `npx cap sync android`, then re-run from Android Studio. Your phone and computer
   must be on the same Wi-Fi network.
4. **Revert both changes** (`url` back to `https://www.jonahjewels.com`, `cleartext`
   back to `false`) before committing or building a release — shipping `cleartext:
   true` or a `192.168.x.x` URL to production is a real bug, not a style nit.

**Debugging:**
- Logcat (Android Studio's bottom panel) shows native logs, crashes, and anything
  `console.log`'d from the WebView.
- For full Chrome DevTools on the running WebView: temporarily set
  `webContentsDebuggingEnabled: true` in `capacitor.config.ts`, `cap sync`, run the app,
  then open `chrome://inspect` in desktop Chrome and click "inspect" under your device.
  Revert to `false` before release.
- Test the back button, deep links (`adb shell am start -a android.intent.action.VIEW -d
  "https://www.jonahjewels.com/shop/product/123"`), file upload, and Razorpay/UPI on a
  **physical device** — emulators often lack UPI apps and can behave differently for
  camera/file-picker flows.
