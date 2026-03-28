const FEATURES = [
  {
    icon: "📋",
    name: "CRUD completo",
    desc: "Crea, edita y organiza prácticas con campos de texto enriquecido, markdown y metadatos estructurados.",
  },
  {
    icon: "📎",
    name: "Archivos adjuntos",
    desc: "Sube imágenes, PDFs y videos directamente desde la práctica. Almacenamiento en la nube con Cloudinary.",
  },
  {
    icon: "📊",
    name: "Gráficas de datos",
    desc: "Visualiza resultados de medición con gráficas generadas automáticamente a partir de tus tablas.",
  },
  {
    icon: "🔐",
    name: "Cuentas por usuario",
    desc: "Cada usuario tiene su propio espacio seguro con autenticación JWT. Tus prácticas son tuyas.",
  },
  {
    icon: "📱",
    name: "Responsive",
    desc: "Funciona en móvil, tableta y escritorio. Consulta tus bitácoras desde cualquier dispositivo.",
  },
  {
    icon: "⚡",
    name: "Stack moderno",
    desc: "Next.js + FastAPI + PostgreSQL. Rápido, confiable y desplegado en la nube las 24 h.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "6rem 2.5rem",
      }}
    >
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
        Características
      </div>

      <h2
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          marginBottom: "3rem",
          maxWidth: 560,
        }}
      >
        Todo lo que necesita<br />
        una bitácora moderna
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          background: "var(--border)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        {FEATURES.map(({ icon, name, desc }) => (
          <FeatureCell key={name} icon={icon} name={name} desc={desc} />
        ))}
      </div>
    </section>
  );
}

function FeatureCell({ icon, name, desc }: { icon: string; name: string; desc: string }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        padding: "2rem",
        transition: "background 0.2s",
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = "var(--surface-2)")}
      onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "var(--surface)")}
    >
      <div
        style={{
          width: 40,
          height: 40,
          border: "1px solid var(--border-bright)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.1rem",
          marginBottom: "1.25rem",
          background: "var(--bg)",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: "0.95rem",
          fontWeight: 600,
          color: "var(--text)",
          marginBottom: "0.5rem",
          letterSpacing: "-0.01em",
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: "0.85rem",
          color: "var(--muted)",
          lineHeight: 1.65,
        }}
      >
        {desc}
      </div>
    </div>
  );
}
