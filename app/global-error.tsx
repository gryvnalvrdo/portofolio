"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          backgroundColor: "#0a0d14",
          color: "#f8fafc",
          fontFamily: "system-ui, -apple-system, sans-serif",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "480px",
            width: "100%",
            background: "#111622",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "14px",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "1.35rem", marginBottom: "0.6rem" }}>
            Temporary Service Interruption
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "1.4rem", lineHeight: 1.6 }}>
            The application encountered an unexpected error. Please reload to continue.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: "#f59e0b",
              color: "#0a0d14",
              border: "none",
              borderRadius: "8px",
              padding: "0.7rem 1.25rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
