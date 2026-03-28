"use client";
import Link from "next/link";

const BAR_HEIGHTS = [30, 55, 45, 80, 60, 90, 70, 85, 65, 100];

const RECENT_PRACTICES = [
  { materia: "AUTOMATIZACIÓN", titulo: "Incubadora controlada por Arduino", fecha: "26 mar · 2026" },
  { materia: "PLC", titulo: "Foco con relevador y contactor", fecha: "13 mar · 2026" },
  { materia: "CONTROL ANALÓGICO", titulo: "Práctica PID con LM741", fecha: "5 mar · 2026" },
];

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        gap: "4rem",
        padding: "8rem 2.5rem 4rem",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* Left — copy */}
      <div>
        <div
          className="fade-up"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.7rem",
            color: "var(--accent)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span style={{ display: "inline-block", width: 32, height: 1, background: "var(--accent)" }} />
          Bitácora de Laboratorio Digital
        </div>

        <h1
          className="fade-up delay-1"
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "1.5rem",
          }}
        >
          Documenta cada<br />
          práctica con{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>precisión.</em>
        </h1>

        <p
          className="fade-up delay-2"
          style={{
            fontSize: "1.05rem",
            color: "var(--muted)",
            maxWidth: 460,
            marginBottom: "2.5rem",
            lineHeight: 1.75,
          }}
        >
          LabBitácora es la herramienta para ingenieros y estudiantes que quieren
          llevar un registro estructurado, visual y accesible de sus prácticas de laboratorio.
        </p>

        <div className="fade-up delay-3" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
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
              cursor: "pointer",
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
            Comenzar gratis →
          </Link>
          <a
            href="#features"
            className="btn-ghost"
            style={{ padding: "0.875rem 1.75rem", fontSize: "0.95rem" }}
          >
            Ver características
          </a>
        </div>
      </div>

      {/* Right — dashboard mockup */}
      <div className="fade-up delay-4" style={{ position: "relative" }}>
        {/* Glow behind mockup */}
        <div style={{
          position: "absolute",
          top: "20%", left: "10%",
          width: "80%", height: "60%",
          background: "radial-gradient(ellipse, rgba(168,85,247,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            background: "var(--surface)",
            border: "1px solid var(--border-bright)",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px var(--border)",
            animation: "float 6s ease-in-out infinite",
          }}
        >
          {/* Browser bar */}
          <div style={{
            background: "var(--bg)",
            padding: "0.7rem 1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            borderBottom: "1px solid var(--border)",
          }}>
            {[["#ff5f57"], ["#ffbd2e"], ["#28c840"]].map(([c], i) => (
              <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "inline-block" }} />
            ))}
            <span style={{
              flex: 1,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 4,
              padding: "0.22rem 0.75rem",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.68rem",
              color: "var(--muted)",
              marginLeft: "0.5rem",
            }}>
              www.labbitacora.app/dashboard
            </span>
          </div>

          {/* Dashboard content */}
          <div style={{ padding: "1.25rem" }}>
            {/* Header row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1rem", color: "var(--text)" }}>
                Panel de prácticas
              </span>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem",
                background: "rgba(168,85,247,0.12)",
                color: "var(--accent)",
                padding: "0.2rem 0.6rem",
                borderRadius: 4,
                border: "1px solid rgba(168,85,247,0.25)",
              }}>
                ● EN VIVO
              </span>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "0.75rem" }}>
              {[
                { label: "Prácticas", val: "24", color: "var(--accent)" },
                { label: "Esta semana", val: "3", color: "var(--lilac)" },
              ].map(({ label, val, color }) => (
                <div key={label} style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: "0.875rem",
                }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>
                    {label}
                  </div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 600, color, lineHeight: 1 }}>{val}</div>
                </div>
              ))}
            </div>

            {/* Mini bar chart */}
            <div style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "0.875rem",
              height: 80,
              display: "flex",
              alignItems: "flex-end",
              gap: 3,
              marginBottom: "0.75rem",
              overflow: "hidden",
            }}>
              {BAR_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    background: "rgba(168,85,247,0.22)",
                    borderRadius: "3px 3px 0 0",
                    borderTop: "2px solid var(--accent)",
                  }}
                />
              ))}
            </div>

            {/* Recent practices list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {RECENT_PRACTICES.map(({ materia, titulo, fecha }) => (
                <div
                  key={titulo}
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                    padding: "0.6rem 0.875rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", color: "var(--accent)", marginBottom: "0.15rem", letterSpacing: "0.06em" }}>
                      {materia}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text)" }}>{titulo}</div>
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: "var(--muted)", whiteSpace: "nowrap", marginLeft: "0.75rem" }}>
                    {fecha}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
