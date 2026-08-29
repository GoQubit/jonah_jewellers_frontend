"use client";

import { useEffect, useState } from "react";

/**
 * useIsNativePlatform
 *
 * Returns true only when the app is running inside the Capacitor native
 * shell (Android/iOS WebView), false on the regular website and during
 * server-side rendering. Safe to use even before @capacitor/core has been
 * installed / on plain web builds - it resolves to false in that case.
 */
export default function useIsNativePlatform() {
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { Capacitor } = await import("@capacitor/core");
        if (!cancelled && Capacitor.isNativePlatform()) {
          setIsNative(true);
        }
      } catch {
        /* @capacitor/core not installed (web-only build) - stay false */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return isNative;
}
