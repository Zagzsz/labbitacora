const STEPS = [
  {
    num: "01",
    title: "Crea tu cuenta",
    desc: "Regístrate con tu correo. En segundos tienes tu espacio personal listo.",
  },
  {
    num: "02",
    title: "Registra tu práctica",
    desc: "Agrega título, objetivo, procedimiento, resultados y conclusiones. Adjunta tus archivos.",
  },
  {
    num: "03",
    title: "Grafica tus datos",
    desc: "Captura tus mediciones y genera visualizaciones automáticamente para tu reporte.",
  },
  {
    num: "04",
    title: "Consulta cuando quieras",
    desc: "Todo guardado en la nube. Busca, filtra y revisa cualquier práctica anterior.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <div className="section-divider" />
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "6rem 2.5rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "center",
        }}
      >
        {/* Steps */}
        <div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.7rem",
              color: "var(--accent)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Cómo funciona
          </div>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "2.5rem",
            }}
          >
            De la práctica al<br />
            registro en minutos
          </h2>

          <div>
            {STEPS.map(({ num, title, desc }, i) => (
              <div
                key={num}
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  padding: "1.75rem 0",
                  borderBottom: i < STEPS.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.72rem",
                    color: "var(--accent)",
                    minWidth: 28,
                    paddingTop: "0.15rem",
                  }}
                >
                  {num}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--text)",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--muted)",
                      lineHeight: 1.65,
                    }}
                  >
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal block */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-bright)",
            borderRadius: 10,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          }}
        >
          {/* Bar */}
          <div
            style={{
              background: "var(--bg)",
              padding: "0.7rem 1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {[["#ff5f57"], ["#ffbd2e"], ["#28c840"]].map(([c], i) => (
              <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "inline-block" }} />
            ))}
            <span
              style={{
                flex: 1,
                textAlign: "center",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.68rem",
                color: "var(--muted)",
              }}
            >
              api — FastAPI · labbitacora
            </span>
          </div>

          {/* Body */}
          <div
            style={{
              padding: "1.5rem",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.78rem",
              lineHeight: 2,
            }}
          >
            <Line color="var(--muted)"># POST /api/practicas</Line>
            <Line prompt="→" color="var(--text)">Nueva práctica creada</Line>
            <br />
            <Line color="var(--muted)"># Campos registrados</Line>
            <Line prompt="✓" keyColor="var(--lilac)" keyText="titulo">
              : &quot;Control PID analógico&quot;
            </Line>
            <Line prompt="✓" keyColor="var(--lilac)" keyText="materia">
              : &quot;Control Analógico&quot;
            </Line>
            <Line prompt="✓" keyColor="var(--lilac)" keyText="fecha">
              : 2026-03-27
            </Line>
            <Line prompt="✓" keyColor="var(--lilac)" keyText="archivos">
              : [foto.jpg, datos.csv]
            </Line>
            <br />
            <Line prompt="✓" color="#60d090">Guardado en PostgreSQL</Line>
            <Line prompt="✓" color="#60d090">Archivos en Cloudinary</Line>
            <Line prompt="✓" color="#60d090">JWT validado</Line>
            <br />
            <span style={{ color: "var(--accent)" }}>$ </span>
            <span
              style={{
                display: "inline-block",
                width: 7,
                height: 14,
                background: "var(--accent)",
                verticalAlign: "middle",
                animation: "blink 1s step-end infinite",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Line({
  prompt,
  color,
  keyColor,
  keyText,
  children,
}: {
  prompt?: string;
  color?: string;
  keyColor?: string;
  keyText?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {prompt && <span style={{ color: "var(--accent)", marginRight: "0.4rem" }}>{prompt}</span>}
      {keyText && <span style={{ color: keyColor }}>{keyText}</span>}
      <span style={{ color: color ?? "var(--text)" }}>{children}</span>
    </div>
  );
}
