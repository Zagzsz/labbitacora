export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "2rem 2.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <span
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "1rem",
          color: "var(--muted)",
        }}
      >
        LabBitácora
      </span>
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.68rem",
          color: "var(--muted)",
          opacity: 0.5,
        }}
      >
        v1.0 · labbitacora.app
      </span>
    </footer>
  );
}
