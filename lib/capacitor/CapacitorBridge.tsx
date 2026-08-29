'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * CapacitorBridge
 *
 * Mount once in the root layout (see app/layout.tsx). Wires up native-shell
 * behaviour — hardware back button, deep links, status bar, splash screen,
 * optional push notifications — ONLY when running inside the Capacitor
 * Android app. On the regular website (or before `npm install` has pulled
 * in the @capacitor/* packages) this component renders nothing and does
 * nothing, so it is safe to leave mounted everywhere and ship to web users
 * unchanged.
 */
export default function CapacitorBridge() {
  const router = useRouter();

  useEffect(() => {
    const cleanupFns: Array<() => void> = [];
    let cancelled = false;

    (async () => {
      let Capacitor: typeof import('@capacitor/core').Capacitor;
      try {
        ({ Capacitor } = await import('@capacitor/core'));
      } catch {
        return; // @capacitor/core not installed yet (e.g. running on web-only checkout)
      }

      if (!Capacitor.isNativePlatform() || cancelled) return; // no-op on the web

      const [{ App }, { StatusBar, Style }, { SplashScreen }] = await Promise.all([
        import('@capacitor/app'),
        import('@capacitor/status-bar'),
        import('@capacitor/splash-screen'),
      ]);

      // --- Hardware back button: browser-style back, exit app at the root ---
      const backListener = await App.addListener('backButton', () => {
        if (window.history.length > 1) {
          router.back();
        } else {
          App.exitApp();
        }
      });
      cleanupFns.push(() => backListener.remove());

      // --- Deep links: e.g. https://www.jonahjewels.com/shop/product/123
      // opened from outside the app -> routed in-app instead of reloading ---
      const urlListener = await App.addListener('appUrlOpen', (data) => {
        try {
          const url = new URL(data.url);
          router.push(`${url.pathname}${url.search}`);
        } catch {
          /* ignore malformed deep link */
        }
      });
      cleanupFns.push(() => urlListener.remove());

      // --- Status bar ---
      // overlaysWebView: true makes the WebView draw full-screen, behind the
      // status bar, which is what makes env(safe-area-inset-top) report a
      // real (non-zero) value in CSS. Our fixed header / page top-padding
      // then use that value to keep content and buttons clear of the status
      // bar instead of hiding under it. setBackgroundColor is a no-op once
      // overlay is on, so it's dropped.
      try {
        await StatusBar.setOverlaysWebView({ overlay: true });
        await StatusBar.setStyle({ style: Style.Dark });
      } catch {
        /* not supported on this OS version, ignore */
      }

      // --- Hide splash once the real page has painted ---
      await SplashScreen.hide();

      // --- Optional push notifications, off unless explicitly enabled ---
      if (process.env.NEXT_PUBLIC_ENABLE_PUSH === 'true') {
        const { registerPush } = await import('./pushNotifications');
        registerPush().catch((err) => console.error('[push] init failed:', err));
      }
    })();

    return () => {
      cancelled = true;
      cleanupFns.forEach((fn) => fn());
    };
  }, [router]);

  return null;
}
