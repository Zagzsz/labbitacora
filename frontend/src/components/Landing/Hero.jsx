import { Link } from "react-router-dom";

const RECENT_PRACTICES = [
  { materia: "AUTOMATIZACIÓN", titulo: "Incubadora controlada por Arduino", fecha: "28 mar" },
  { materia: "PLC", titulo: "Foco con relevador y contactor", fecha: "13 mar" },
];

const BOVEDA_FILES = [
  { name: "a5a44ac1-cd0f-4a3...png", color: "#28c840" },
  { name: "IMG_A4F8BC08-F901...jpg", color: "#28c840" },
  { name: "237557c0-77bc-483...pdf", color: "#a855f7" },
];

const NAV_ITEMS = [
  { label: "Dashboard", active: true },
  { label: "Nueva práctica", active: false },
  { label: "Mis prácticas", active: false, section: "INVESTIGACIÓN" },
  { label: "Proyectos", active: false },
  { label: "Plantillas", active: false },
  { label: "Archivos", active: false },
  { label: "Usuarios", active: false, section: "ADMINISTRACIÓN" },
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
            to="/register"
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
              e.currentTarget.style.background = "var(--accent-dim)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 28px var(--accent-glow-strong)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
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

      {/* Right — faithful dashboard mockup */}
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
            padding: "0.6rem 1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            borderBottom: "1px solid var(--border)",
          }}>
            {[["#ff5f57"], ["#ffbd2e"], ["#28c840"]].map(([c], i) => (
              <span key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c, display: "inline-block" }} />
            ))}
            <span style={{
              flex: 1,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 4,
              padding: "0.18rem 0.6rem",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.62rem",
              color: "var(--muted)",
              marginLeft: "0.4rem",
            }}>
              www.labbitacora.app/dashboard
            </span>
          </div>

          {/* App layout — sidebar + main + right panel */}
          <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 110px", minHeight: 300 }}>

            {/* Sidebar */}
            <div style={{
              background: "rgba(10,9,15,0.8)",
              borderRight: "1px solid var(--border)",
              padding: "0.75rem 0",
              display: "flex",
              flexDirection: "column",
              gap: "0.1rem",
            }}>
              {/* Logo */}
              <div style={{ padding: "0 0.75rem 0.75rem", borderBottom: "1px solid var(--border)", marginBottom: "0.5rem" }}>
                <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: "0.65rem", color: "var(--text)" }}>
                  LabBitácora
                </div>
              </div>

              {/* Section: MENÚ */}
              <div style={{ padding: "0 0.75rem", marginBottom: "0.25rem" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.45rem", color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                  Menú
                </div>
                {["Dashboard", "Nueva práctica"].map((item, i) => (
                  <div key={item} style={{
                    padding: "0.3rem 0.4rem",
                    borderRadius: 4,
                    fontSize: "0.58rem",
                    fontFamily: "'Instrument Sans', sans-serif",
                    color: i === 0 ? "var(--text)" : "var(--muted)",
                    background: i === 0 ? "rgba(168,85,247,0.12)" : "transparent",
                    marginBottom: "0.1rem",
                  }}>
                    {i === 0 ? "▪ " : ""}{item}
                  </div>
                ))}
              </div>

              {/* Section: INVESTIGACIÓN */}
              <div style={{ padding: "0 0.75rem", marginBottom: "0.25rem" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.45rem", color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                  Investigación
                </div>
                {["Mis prácticas", "Proyectos", "Plantillas", "Archivos"].map(item => (
                  <div key={item} style={{
                    padding: "0.3rem 0.4rem",
                    borderRadius: 4,
                    fontSize: "0.58rem",
                    fontFamily: "'Instrument Sans', sans-serif",
                    color: "var(--muted)",
                    marginBottom: "0.1rem",
                  }}>
                    {item}
                  </div>
                ))}
              </div>

              {/* Section: ADMINISTRACIÓN */}
              <div style={{ padding: "0 0.75rem" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.45rem", color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                  Admin
                </div>
                <div style={{ padding: "0.3rem 0.4rem", borderRadius: 4, fontSize: "0.58rem", fontFamily: "'Instrument Sans', sans-serif", color: "var(--muted)" }}>
                  Usuarios
                </div>
              </div>
            </div>

            {/* Main content */}
            <div style={{ padding: "0.75rem", background: "var(--bg)", borderRight: "1px solid var(--border)" }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.45rem", color: "var(--muted)", marginBottom: "0.2rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Escritorio del investigador
                  </div>
                  <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "var(--text)" }}>
                    Gestión{" "}
                    <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Operativa</span>
                  </div>
                </div>
                <div style={{
                  background: "var(--accent)",
                  color: "#fff",
                  borderRadius: 5,
                  padding: "0.25rem 0.6rem",
                  fontSize: "0.58rem",
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontWeight: 600,
                }}>
                  + Nueva Práctica
                </div>
              </div>

              {/* Prácticas recientes */}
              <div style={{ marginBottom: "0.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Prácticas recientes
                  </span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem", color: "var(--accent)" }}>
                    Ver todas
                  </span>
                </div>
                {RECENT_PRACTICES.map(({ materia, titulo, fecha }) => (
                  <div key={titulo} style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 5,
                    padding: "0.45rem 0.6rem",
                    marginBottom: "0.3rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.45rem", color: "var(--accent)", marginBottom: "0.1rem", letterSpacing: "0.06em" }}>
                        {materia}
                      </div>
                      <div style={{ fontSize: "0.62rem", color: "var(--text)", fontFamily: "'Instrument Sans', sans-serif" }}>
                        {titulo}
                      </div>
                    </div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.48rem", color: "var(--muted)", whiteSpace: "nowrap", marginLeft: "0.5rem" }}>
                      {fecha}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right panel — profile + bóveda */}
            <div style={{ background: "var(--bg)", padding: "0.75rem" }}>
              {/* Profile */}
              <div style={{ textAlign: "center", marginBottom: "0.75rem", paddingBottom: "0.6rem", borderBottom: "1px solid var(--border)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: "linear-gradient(135deg, #a855f7, #6366f1)",
                  margin: "0 auto 0.4rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.65rem", color: "#fff", fontWeight: 700,
                  fontFamily: "'Instrument Sans', sans-serif",
                }}>Z</div>
                <div style={{ fontSize: "0.62rem", fontWeight: 600, color: "var(--text)", fontFamily: "'Instrument Sans', sans-serif" }}>Enrique Ramírez</div>
                <div style={{ fontSize: "0.5rem", color: "var(--muted)", fontFamily: "'DM Mono', monospace" }}>Titular de Laboratorio</div>
              </div>

              {/* Profile fields */}
              {[
                { label: "NOMBRE REAL", val: "Enrique Ramírez" },
                { label: "INSTITUCIÓN", val: "Univ. Euro Hispanoam." },
                { label: "CARRERA", val: "Ing. Mecatrónica" },
              ].map(({ label, val }) => (
                <div key={label} style={{ marginBottom: "0.4rem" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.42rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.1rem" }}>
                    {label}
                  </div>
                  <div style={{ fontSize: "0.55rem", color: "var(--text)", fontFamily: "'Instrument Sans', sans-serif" }}>{val}</div>
                </div>
              ))}

              {/* Bóveda reciente */}
              <div style={{ marginTop: "0.6rem", paddingTop: "0.5rem", borderTop: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.45rem", color: "var(--text)", fontWeight: 600 }}>📁 Bóveda reciente</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.45rem", color: "var(--accent)" }}>Ver todo</span>
                </div>
                {BOVEDA_FILES.map(({ name, color }) => (
                  <div key={name} style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    padding: "0.3rem 0.45rem",
                    marginBottom: "0.2rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}>
                    <span style={{ fontSize: "0.55rem" }}>🖼</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.45rem", color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
