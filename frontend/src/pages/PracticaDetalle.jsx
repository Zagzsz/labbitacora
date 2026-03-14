import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ReactMarkdown from "react-markdown";
import api from "../api/axios";

const pageVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

export default function PracticaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [practica, setPractica] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const loadPractica = useCallback(() => {
    api.get(`/practicas/${id}`).then((res) => {
      setPractica(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  useEffect(() => { loadPractica(); }, [loadPractica]);

  const handleDelete = async () => {
    if (!confirm("¿Eliminar esta práctica? Se borrarán también los archivos y mediciones.")) return;
    setDeleting(true);
    await api.delete(`/practicas/${id}`);
    navigate("/");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      await api.post(`/practicas/${id}/archivos`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      loadPractica();
    } catch (err) {
      console.error(err);
    }
    setUploading(false);
  };

  const handleDeleteArchivo = async (archivoId) => {
    await api.delete(`/archivos/${archivoId}`);
    loadPractica();
  };

  if (loading) return <p style={{ color: "var(--text-muted)" }}>Cargando...</p>;
  if (!practica) return <p style={{ color: "var(--danger)" }}>Práctica no encontrada</p>;

  const p = practica;

  const getMateriaBg = (materia) => {
    const m = materia?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";
    if (m.includes("quimica")) return "/backgrounds/bg-chemistry.png";
    if (m.includes("fisica")) return "/backgrounds/bg-physics.png";
    if (m.includes("biologia")) return "/backgrounds/bg-biology.png";
    if (m.includes("electronica")) return "/backgrounds/bg-electronics.png";
    if (m.includes("hidraulica")) return "/backgrounds/bg-hidraulica.png";
    if (m.includes("plc")) return "/backgrounds/bg-electronics.png";
    if (m.includes("mecanica")) return "/backgrounds/bg-physics.png";
    if (m.includes("programacion")) return "/backgrounds/bg-general.png";
    if (m.includes("control")) return "/backgrounds/bg-general.png";
    if (m.includes("robotica")) return "/backgrounds/bg-electronics.png";
    return "/backgrounds/bg-general.png";
  };

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" style={{ maxWidth: 1000, margin: "0 auto" }}>
      {/* Premium Header with Dynamic BG */}
      <div style={{ 
        marginBottom: 40, 
        position: "relative", 
        borderRadius: 24, 
        overflow: "hidden",
        border: "1px solid var(--border)",
        background: "var(--bg-elevated)",
      }}>
        {/* Background Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${getMateriaBg(p.materia)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(10%) brightness(1.1)",
          }} 
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(14,14,22,0.6) 0%, rgba(14,14,22,0.98) 100%)",
        }} />

        <div style={{ position: "relative", padding: "40px 32px" }}>
          <p style={{ fontSize: 11, color: "var(--text-faint)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>REGISTROS CORE</Link>
            <span style={{ margin: "0 8px", opacity: 0.3 }}>/</span>
            EXPEDIENTE TÉCNICO
          </p>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.04em", color: "#fff", margin: 0 }}>
                  {p.titulo}
                </h1>
                <div style={{ 
                  background: "var(--accent-glow)", 
                  color: "var(--accent)", 
                  padding: "4px 10px", 
                  borderRadius: 8, 
                  fontSize: 12, 
                  fontWeight: 700,
                  border: "1px solid var(--accent-ring)"
                }}>
                  LAB-PR-{id.substring(0,8).toUpperCase()}
                </div>
              </div>
              
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14, color: "var(--accent-secondary)" }}>⌬</span>
                  <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>{p.materia}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14, color: "var(--text-faint)" }}>📅</span>
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                    {new Date(p.fecha).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                </div>
              </div>
              
              {(p.etiquetas || []).length > 0 && (
                <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                  {p.etiquetas.map(t => <span key={t} className="chip">{t}</span>)}
                </div>
              )}
            </div>
            
            <div style={{ display: "flex", gap: 10 }}>
              <Link to={`/practicas/${id}/editar`} className="btn-secondary" style={{ textDecoration: "none" }}>
                Modificar Registro
              </Link>
              <button className="btn-secondary" onClick={handleDelete} disabled={deleting}
                style={{ color: deleting ? "var(--text-faint)" : "#ff4d4d", borderColor: "rgba(255, 77, 77, 0.2)" }}>
                {deleting ? "Eliminando..." : "Eliminar Registro"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: window.innerWidth < 1024 ? "1fr" : "1fr 340px", 
        gap: 32 
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {/* Content Sections */}
          {p.objetivo && (
            <Section title="Estrategia de Investigación">
              <MarkdownBlock content={p.objetivo} />
            </Section>
          )}

          {p.descripcion && (
            <Section title="Metodología y Desarrollo">
              <MarkdownBlock content={p.descripcion} />
            </Section>
          )}

          {/* Mediciones with Neon Charts */}
          <Section title="Análisis de Datos (Telemetría)">
            {(p.mediciones || []).length === 0 ? (
              <div className="card" style={{ padding: "40px", textAlign: "center", color: "var(--text-faint)" }}>
                No se han detectado flujos de datos para este registro.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {p.mediciones.map((m) => (
                  <div key={m.id} className="card" style={{ padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }} />
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{m.nombre_variable}</h3>
                        <span className="chip" style={{ background: "rgba(6, 182, 212, 0.1)", color: "#22d3ee", borderColor: "rgba(6, 182, 212, 0.2)" }}>
                          {m.unidad}
                        </span>
                      </div>
                      <span style={{ fontSize: 12, color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>
                        SAMPLING: {m.valores.length} PTS
                      </span>
                    </div>

                    <div style={{ width: "100%", height: 240, marginTop: 10 }}>
                      <ResponsiveContainer>
                        <LineChart data={m.valores.map((v, i) => ({
                          index: m.timestamps?.[i] ?? i + 1,
                          valor: v,
                        }))}>
                          <defs>
                            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                          <XAxis dataKey="index" stroke="var(--text-faint)" fontSize={11} tickMargin={10} axisLine={false} tickLine={false} />
                          <YAxis stroke="var(--text-faint)" fontSize={11} axisLine={false} tickLine={false} tickMargin={10} />
                          <Tooltip
                            contentStyle={{
                              background: "rgba(14, 14, 22, 0.95)", border: "1px solid var(--border)",
                              borderRadius: 12, fontSize: 12, color: "#fff", boxShadow: "0 10px 20px rgba(0,0,0,0.5)"
                            }}
                            itemStyle={{ color: "var(--accent)" }}
                            cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="valor" 
                            stroke="var(--accent)" 
                            strokeWidth={3} 
                            dot={{ r: 4, fill: "var(--accent)", strokeWidth: 2, stroke: "#0e0e16" }}
                            activeDot={{ r: 6, strokeWidth: 0, fill: "#fff", boxShadow: "0 0 15px var(--accent)" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {p.conclusion && (
            <Section title="Síntesis Final">
              <MarkdownBlock content={p.conclusion} />
            </Section>
          )}
        </div>

        {/* Sidebar Column: Archivos */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <Section title="Bóveda de Archivos">
            <div className="card" style={{ padding: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, marginBottom: 20 }}>
                {(p.archivos || []).length === 0 ? (
                  <p style={{ fontSize: 13, color: "var(--text-faint)", textAlign: "center", padding: "20px 0" }}>
                    Sin documentación adjunta.
                  </p>
                ) : (
                  (p.archivos || []).map((a) => (
                    <div key={a.id} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <div className="glass" style={{
                        borderRadius: 12, padding: "10px", position: "relative",
                        display: "flex", gap: 12, alignItems: "center", overflow: "hidden"
                      }}>
                        <div style={{ width: 44, height: 44, borderRadius: 8, background: "#16162a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {a.tipo === "imagen" ? (
                            <img src={a.url_cloudinary} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
                          ) : a.tipo === "video" ? (
                            <span style={{ fontSize: 20 }}>🎥</span>
                          ) : (
                            <span style={{ fontSize: 20 }}>📄</span>
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 13, fontWeight: 500, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {a.nombre}
                          </p>
                          <p style={{ fontSize: 11, color: "var(--text-faint)", textTransform: "uppercase" }}>
                            {a.tipo} • {a.tamano_kb} KB
                          </p>
                        </div>
                        <div style={{ display: "flex", gap: 4 }}>
                          <a href={a.url_cloudinary} target="_blank" rel="noopener noreferrer" 
                            style={{ background: "rgba(255,255,255,0.05)", padding: "6px", borderRadius: 8, color: "var(--text-muted)", fontSize: 12, textDecoration: "none" }}>
                            ↗
                          </a>
                          <button onClick={() => handleDeleteArchivo(a.id)}
                            style={{
                              background: "rgba(255,77,77,0.1)", border: "none", borderRadius: 8,
                              color: "#ff4d4d", fontSize: 12, padding: "6px", cursor: "pointer",
                            }}>✕</button>
                        </div>
                      </div>
                      
                      {/* Video Player Preview */}
                      {a.tipo === "video" && (
                        <div style={{ 
                          borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)",
                          background: "#000", position: "relative", paddingTop: "56.25%" 
                        }}>
                          <video 
                            src={a.url_cloudinary} 
                            controls 
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                          />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
              
              <label style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                background: "var(--bg-elevated)", border: "1px dashed var(--border-glass)",
                borderRadius: 12, color: "var(--text-muted)", fontSize: 13, padding: "14px",
                cursor: "pointer", transition: "all 0.2s", textAlign: "center", width: "100%"
              }}>
                {uploading ? "Sincronizando..." : "＋ Adjuntar Documento"}
                <input type="file" accept="image/*,.pdf,video/*" onChange={handleFileUpload} style={{ display: "none" }} />
              </label>
            </div>
          </Section>

          {/* Metadata Card */}
          <Section title="Información Interna">
            <div className="card" style={{ padding: "20px", fontSize: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ color: "var(--text-faint)" }}>ESTADO:</span>
                <span style={{ color: "var(--success)" }}>REGISTRADO SINC.</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ color: "var(--text-faint)" }}>VERSIÓN:</span>
                <span style={{ color: "#fff" }}>v1.0.5-PRO</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-faint)" }}>CIFRADO:</span>
                <span style={{ color: "var(--accent-secondary)" }}>AES-256-RDB</span>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </motion.div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 0 }}>
      <h2 style={{
        fontSize: 11, fontWeight: 700, color: "var(--text-faint)",
        textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16,
        display: "flex", alignItems: "center", gap: 10
      }}>
        {title}
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.03)" }} />
      </h2>
      {children}
    </div>
  );
}

function MarkdownBlock({ content }) {
  return (
    <div style={{
      background: "var(--bg-elevated)", border: "1px solid var(--border)",
      borderRadius: 16, padding: "20px 24px", fontSize: 14, lineHeight: 1.8,
      color: "#e2e2f0", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)"
    }}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
