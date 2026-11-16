import Link from "next/link";

export default function NotFound() {
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
          maxWidth: "500px",
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
            fontSize: "0.78rem",
            fontWeight: 700,
            color: "var(--amber-l)",
            marginBottom: "0.75rem",
          }}
        >
          ERROR 404
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.6rem",
            fontWeight: 700,
            marginBottom: "0.65rem",
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "0.9rem",
            lineHeight: 1.6,
            marginBottom: "1.5rem",
          }}
        >
          The requested route does not exist or has been moved.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn-primary">
            Back to Portfolio
          </Link>
          <Link href="/covercraft" className="btn-secondary">
            Open CoverCraft
          </Link>
        </div>
      </div>
    </main>
  );
}
