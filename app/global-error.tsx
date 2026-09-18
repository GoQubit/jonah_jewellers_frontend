"use client";

import { useEffect } from "react";

/**
 * Catches an error thrown by the ROOT layout itself (app/layout.tsx) -
 * app/error.tsx can't catch that because it renders inside the layout.
 * This has to render its own <html>/<body> since the real layout is what
 * crashed. Kept deliberately plain (no next/image, no app CSS) so it can
 * never itself fail to render even if something app-wide is broken.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/global-error.tsx] caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <img
          src="/images/logo2.png"
          alt="Jonah Jewels"
          width={120}
          height={96}
        />
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
            Something went wrong
          </h2>
          <p style={{ fontSize: 14, color: "#757575", maxWidth: 320 }}>
            We couldn&apos;t load the app. Please check your internet
            connection and try again.
          </p>
        </div>
        <button
          onClick={() => reset()}
          style={{
            padding: "8px 24px",
            borderRadius: 6,
            background: "#E8A83E",
            color: "#fff",
            fontWeight: 500,
            border: "none",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
