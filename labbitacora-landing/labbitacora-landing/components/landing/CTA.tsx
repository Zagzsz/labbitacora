import Link from "next/link";

export default function CTA() {
  return (
    <>
      <div className="section-divider" />
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2.5rem 6rem" }}>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-bright)",
            borderRadius: 16,
            padding: "5rem 4rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: "absolute",
              top: -120,
              left: "50%",
              transform: "translateX(-50%)",
              width: 500,
              height: 300,
              background: "radial-gradient(ellipse, rgba(168,85,247,0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "1rem",
              position: "relative",
            }}
          >
            Tu bitácora, siempre<br />contigo.
          </h2>

          <p
            style={{
              color: "var(--muted)",
              fontSize: "1rem",
              marginBottom: "2.5rem",
              position: "relative",
            }}
          >
            Regístrate gratis y empieza a documentar hoy.
          </p>

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
              position: "relative",
            }}
          >
            <Link
              href="/register"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.875rem 2rem",
                background: "var(--accent)",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "0.95rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent-dim)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 28px var(--accent-glow-strong)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              Crear cuenta gratis →
            </Link>
            <Link
              href="/login"
              className="btn-ghost"
              style={{ padding: "0.875rem 1.75rem", fontSize: "0.95rem" }}
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
