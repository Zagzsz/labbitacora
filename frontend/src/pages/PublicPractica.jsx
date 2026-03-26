import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import api from "../api/axios"; // Usamos la instancia configurada

const pageVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function PublicPractica() {
  const { id } = useParams();
  const [practica, setPractica] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Iniciando carga de práctica pública ID:", id);
    // Intentamos cargar desde el endpoint público
    api.get(`/practicas/${id}/public`)
      .then(res => {
        console.log("Datos recibidos correctamente:", res.data);
        setPractica(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error detallado de acceso:", err);
        const status = err.response?.status;
        const msg = err.response?.data?.detail || err.message;
        
        if (status === 403) setError(`Privado: ${msg}`);
        else if (status === 404) setError(`No Encontrado (404): Verifica que el ID ${id} sea correcto.`);
        else if (status === 422) setError(`Error de Formato (422): El ID ${id} no es un UUID válido.`);
        else setError(`Fallo Crítico (${status || 'Red'}): ${msg}`);
        
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#0e0e16", color: "var(--text-muted)" }}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }}>⌬</motion.div>
      <p style={{ marginTop: 20, fontSize: 13, letterSpacing: "0.1em" }}>AUTENTICANDO ACCESO PÚBLICO...</p>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#0e0e16", color: "#fff", padding: 40 }}>
      <div style={{ fontSize: 64, marginBottom: 24, filter: "drop-shadow(0 0 20px rgba(255,255,255,0.1))" }}>🔒</div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>Acceso Restringido</h1>
      <p style={{ color: "var(--text-faint)", textAlign: "center", maxWidth: 450, lineHeight: 1.6 }}>{error}</p>
      <button onClick={() => window.location.href = "/"} className="btn-secondary" style={{ marginTop: 32 }}>Volver al Inicio</button>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0e0e16", color: "#fff", padding: "60px 20px" }}>
      <motion.div 
        variants={pageVariants} initial="hidden" animate="visible"
        style={{ maxWidth: 900, margin: "0 auto" }}
      >
        {/* Institutional Header */}
        <header style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 40, marginBottom: 48 }}>
           <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
             <div style={{ width: 14, height: 14, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 15px var(--accent)" }} />
             <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.2em" }}> 
               Expediente de Investigación Abierta
             </span>
           </div>
           
           <h1 style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 24, lineHeight: 1.1 }}>
             {practica.titulo}
           </h1>
           
           <div style={{ display: "flex", flexWrap: "wrap", gap: 24, color: "var(--text-muted)", fontSize: 14 }}>
             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
               <span style={{ color: "var(--accent)" }}>⌬</span>
               <strong>Dominio:</strong> {practica.materia}
             </div>
             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
               <span style={{ color: "var(--text-faint)" }}>📅</span>
               {new Date(practica.fecha).toLocaleDateString("es-MX", { day: 'numeric', month: 'long', year: 'numeric' })}
             </div>
             <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 12 }}>
               <span style={{ color: "var(--text-faint)" }}>Ref:</span> {practica.id.toUpperCase()}
             </div>
           </div>
        </header>

        {/* Narrative Sections */}
        <main style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          <Section title="Objetivo del Estudio" content={practica.objetivo} />
          <Section title="Metodología y Ejecución" content={practica.descripcion} />
          
          {practica.mediciones?.length > 0 && (
            <div>
              <h2 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 20 }}>
                Resultados de Telemetría
              </h2>
              <div style={{ display: "grid", gap: 20 }}>
                {practica.mediciones.map((m, i) => (
                  <div key={i} className="card" style={{ padding: 24, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                      <span style={{ fontWeight: 700, fontSize: 16 }}>{m.nombre_variable}</span>
                      <span style={{ background: "var(--accent-glow)", color: "var(--accent)", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 800, border: "1px solid var(--accent-ring)" }}>
                        {m.unidad.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "var(--font-mono)", lineHeight: 1.6, background: "#000", padding: 12, borderRadius: 10 }}>
                      {m.valores.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Section title="Síntesis Final" content={practica.conclusion} />

          {practica.archivos?.length > 0 && (
            <div style={{ padding: 40, background: "rgba(255,255,255,0.02)", borderRadius: 32, border: "1px solid rgba(255,255,255,0.05)" }}>
              <h2 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 32 }}>
                Bóveda de Evidencias y Documentación
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
                {practica.archivos.map((a) => (
                  <motion.div 
                    key={a.id} whileHover={{ y: -5 }}
                    style={{ position: "relative", borderRadius: 20, overflow: "hidden", background: "#000", border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    {a.tipo === "imagen" ? (
                      <img src={a.url_cloudinary} alt={a.nombre} style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }} />
                    ) : a.tipo === "video" ? (
                      <video src={a.url_cloudinary} style={{ width: "100%", height: 180, objectFit: "cover" }} muted loop onMouseEnter={e => e.target.play()} onMouseLeave={e => e.target.pause()} />
                    ) : (
                      <div style={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, background: "rgba(255,255,255,0.03)" }}>📄</div>
                    )}
                    <div style={{ padding: 16, background: "linear-gradient(to top, #000 80%, transparent)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      <p style={{ fontSize: 12, fontWeight: 700, margin: "0 0 4px 0", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.nombre}</p>
                      <a href={a.url_cloudinary} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: "var(--accent)", textDecoration: "none", fontWeight: 800, textTransform: "uppercase" }}>Ver Documento ↗</a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Footer info */}
        <footer style={{ marginTop: 100, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
           <p style={{ fontSize: 12, color: "var(--text-faint)", lineHeight: 1.8 }}>
             Este reporte técnico ha sido verificado y emitido por el sistema <strong>LabBitácora CORE</strong>.<br/>
             © {new Date().getFullYear()} Plataforma de Gestión de Investigación Universal.
           </p>
        </footer>
      </motion.div>
    </div>
  );
}

function Section({ title, content }) {
  if (!content) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.2em" }}>
        {title}
      </h2>
      <div style={{ 
        color: "rgba(255,255,255,0.8)", 
        lineHeight: 1.8, 
        fontSize: 16, 
        background: "rgba(255,255,255,0.02)", 
        padding: 24, 
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.05)"
      }}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
