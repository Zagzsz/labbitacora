import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios"; // Usamos axios directo porque es público (sin interceptor de auth si falla)

export default function PublicPractica() {
  const { id } = useParams();
  const [practica, setPractica] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Usamos el endpoint público (que implementaremos en el backend pronto o usaremos el normal si lo permitimos)
    // Por ahora intentamos el normal, pero el backend debe permitirlo si is_public es true
    const apiUrl = import.meta.env.VITE_API_URL;
    axios.get(`${apiUrl}/api/practicas/${id}/public`)
      .then(res => {
        setPractica(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.status === 403 ? "Este expediente es privado." : "No se pudo encontrar el registro.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0c0c14", color: "var(--text-muted)" }}>
      Verificando credenciales de acceso público...
    </div>
  );

  if (error) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#0c0c14", color: "#fff", padding: 20 }}>
      <div style={{ fontSize: 48, marginBottom: 20 }}>🔒</div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Acceso Restringido</h1>
      <p style={{ color: "var(--text-muted)", textAlign: "center", maxWidth: 400 }}>{error}</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0c0c14", color: "#fff", padding: "40px 20px" }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        {/* Scientific Header */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 32, marginBottom: 40 }}>
           <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
             <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }} />
             <span style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}> Reporte de Investigación Pública </span>
           </div>
           <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 16 }}>{practica.titulo}</h1>
           <div style={{ display: "flex", flexWrap: "wrap", gap: 20, color: "var(--text-muted)", fontSize: 13 }}>
             <span><strong>Dominio:</strong> {practica.materia}</span>
             <span><strong>Fecha:</strong> {new Date(practica.fecha).toLocaleDateString()}</span>
             <span><strong>ID:</strong> {practica.id.slice(0, 8)}</span>
           </div>
        </div>

        {/* Content Section */}
        <Section title="Objetivo" content={practica.objetivo} />
        <Section title="Metodología y Desarrollo" content={practica.descripcion} />
        
        {practica.mediciones?.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--accent)", marginBottom: 16, borderLeft: "4px solid var(--accent)", paddingLeft: 16 }}>Telemetría Capturada</h2>
            <div style={{ display: "grid", gap: 16 }}>
              {practica.mediciones.map((m, i) => (
                <div key={i} className="card" style={{ padding: 20, background: "rgba(255,255,255,0.02)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                    <span style={{ fontWeight: 600 }}>{m.nombre_variable}</span>
                    <span style={{ color: "var(--accent)", fontSize: 12, fontWeight: 700 }}>{m.unidad}</span>
                  </div>
                  {/* Simplificamos por ahora, en el dashboard hay gráficas */}
                  <div style={{ fontSize: 12, color: "var(--text-faint)", fontFamily: "var(--font-mono)", overflowX: "auto", whiteSpace: "nowrap" }}>
                    {m.valores.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Section title="Conclusiones" content={practica.conclusion} />

        {/* Footer */}
        <div style={{ marginTop: 80, pt: 40, borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
           <p style={{ fontSize: 12, color: "var(--text-faint)" }}>
             Generado automáticamente por <strong>LabBitácora</strong> <br/>
             Plataforma de Investigación Científica & Desarrollo Meitronico
           </p>
        </div>
      </motion.div>
    </div>
  );
}

function Section({ title, content }) {
  if (!content) return null;
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--accent)", marginBottom: 16, borderLeft: "4px solid var(--accent)", paddingLeft: 16 }}>{title}</h2>
      <div style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: 15, whiteSpace: "pre-wrap" }}>
        {content}
      </div>
    </div>
  );
}
