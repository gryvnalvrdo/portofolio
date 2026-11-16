"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          width: "100%",
          background: "var(--surface)",
          border: "1px solid var(--border-strong)",
          borderRadius: "16px",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "var(--amber-l)",
            background: "var(--amber-bg)",
            border: "1px solid var(--amber-bdr)",
            display: "inline-block",
            padding: "0.25rem 0.65rem",
            borderRadius: "6px",
            marginBottom: "1rem",
          }}
        >
          RUNTIME RECOVERY
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: "0.65rem",
          }}
        >
          Something interrupted this view
        </h1>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "0.9rem",
            lineHeight: 1.6,
            marginBottom: "1.5rem",
          }}
        >
          An unexpected client or network error occurred. You can retry loading this section or return to the main portfolio page.
        </p>
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button type="button" onClick={() => reset()} className="btn-primary">
            Try Again
          </button>
          <Link href="/" className="btn-secondary">
            Back to Portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
