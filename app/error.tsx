"use client";

import { useEffect } from "react";
import Image from "next/image";

/**
 * Next.js route-level error boundary. Catches any uncaught render/runtime
 * error thrown by a page or component below the root layout (header/footer
 * from layout.tsx keep rendering around this) and shows a friendly, static
 * fallback instead of a blank/white screen - the most common way that shows
 * up is exactly what we saw: a background API call to a slow/asleep backend
 * throws, and with no boundary that used to take the whole screen down.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/error.tsx] caught:", error);
  }, [error]);

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
      <Image
        src="/images/logo2.png"
        alt="Jonah Jewels"
        width={120}
        height={96}
        priority
      />
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-grayDark">
          Something went wrong
        </h2>
        <p className="text-sm text-[#757575] max-w-sm">
          We couldn&apos;t load this page. This is usually a slow or
          temporary connection issue - please check your internet and try
          again.
        </p>
      </div>
      <button
        onClick={() => reset()}
        className="px-6 py-2 rounded-md bg-brand text-white font-medium hover:opacity-90 smooth"
      >
        Try again
      </button>
    </div>
  );
}
