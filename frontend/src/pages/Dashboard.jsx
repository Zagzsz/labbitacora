import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

const pageVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

export default function Dashboard() {
  const [practicas, setPracticas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [user, setUser] = useState(null);
  const [recentFiles, setRecentFiles] = useState([]);
  const [profileSaving, setProfileSaving] = useState(false);

  useEffect(() => {
    // Original fetches
    api.get("/practicas").then((res) => {
      setPracticas(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));

    // New fetches for Sidebar
    api.get("/auth/me").then((res) => setUser(res.data));
    api.get("/archivos").then((res) => {
      setRecentFiles(res.data.slice(0, 3));
    });
  }, []);

  const updateProfile = async (field, value) => {
    try {
      setProfileSaving(true);
      const res = await api.put("/auth/me", { [field]: value });
      setUser(res.data);
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setProfileSaving(false);
    }
  };

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
  // Dashboard only shows recent
  const recentPracticas = practicas.slice(0, 3);

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" style={{ maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>
        
        {/* Main Content */}
        <div>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <div>
              <p style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                Escritorio del Investigador
              </p>
              <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.04em", color: "#fff" }}>
                Gestión <span style={{ color: "var(--accent)" }}>Operativa</span>
              </h1>
            </div>
            <Link to="/practicas/nueva" className="btn-primary" style={{ textDecoration: "none" }}>
              Nueva Práctica
            </Link>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Prácticas Recientes
            </h2>
            <Link to="/practicas" style={{ fontSize: 12, color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Ver todas</Link>
          </div>

          {loading ? (
            <p style={{ color: "var(--text-muted)", textAlign: "center", padding: 40 }}>Analizando base de datos...</p>
          ) : recentPracticas.length === 0 ? (
            <div style={{ padding: "60px 20px", border: "1px dashed var(--border)", borderRadius: 20, textAlign: "center" }}>
              <p style={{ color: "var(--text-muted)" }}>No hay actividades registradas</p>
            </div>
          ) : (
            <motion.div
              variants={container} initial="hidden" animate="visible"
              style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}
            >
              {recentPracticas.map((p) => (
                <motion.div key={p.id} variants={cardVariant}>
                  <Link to={`/practicas/${p.id}`} style={{ textDecoration: "none" }}>
                    <div className="card" style={{ position: "relative", overflow: "hidden", padding: "24px" }}>
                      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${getMateriaBg(p.materia)})`, backgroundSize: "cover", opacity: 0.15, backgroundPosition: "center" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #161626 30%, transparent 100%)" }} />
                      <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <p style={{ fontSize: 10, color: "var(--accent)", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>{p.materia}</p>
                          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{p.titulo}</h3>
                          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                            {p.etiquetas.slice(0, 3).map(tag => (
                              <span key={tag} style={{ fontSize: 10, background: "rgba(255,255,255,0.05)", padding: "4px 8px", borderRadius: 4, color: "var(--text-muted)" }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <p style={{ fontSize: 12, fontWeight: 600, color: "#fff", margin: 0 }}>
                            {new Date(p.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                          </p>
                          <p style={{ fontSize: 10, color: "var(--text-faint)", margin: 0 }}>{new Date(p.fecha).getFullYear()}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Right Sidebar - Researcher Profile */}
        <aside style={{ position: "sticky", top: 20 }}>
          <div className="card" style={{ background: "rgba(147, 13, 242, 0.03)", border: "1px solid rgba(147, 13, 242, 0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, border: "2px solid var(--accent)" }}>
                🔬
              </div>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{user?.username || "Investigador"}</h2>
                <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>Titular de Laboratorio</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Universidad", field: "universidad", icon: "🏛️" },
                { label: "Carrera", field: "carrera", icon: "🎓" },
                { label: "Semestre", field: "semestre", icon: "📑" }
              ].map((item) => (
                <div key={item.field}>
                  <p style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", fontWeight: 700, margin: "0 0 6px 4px" }}>
                    {item.icon} {item.label}
                  </p>
                  <input
                    defaultValue={user?.[item.field] || ""}
                    placeholder={`Ingresar ${item.label.toLowerCase()}...`}
                    onBlur={(e) => updateProfile(item.field, e.target.value)}
                    style={{ 
                      fontSize: 13, 
                      padding: "10px 14px", 
                      borderRadius: 10, 
                      background: "rgba(255,255,255,0.03)", 
                      border: "1px solid rgba(255,255,255,0.05)" 
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Files Widget */}
          <div className="card" style={{ marginTop: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "var(--accent)" }}>📂</span> Bóveda Reciente
              </h3>
              <Link to="/archivos" style={{ fontSize: 11, color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Ver todo</Link>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {recentFiles.length === 0 ? (
                <p style={{ fontSize: 12, color: "var(--text-faint)", textAlign: "center", padding: "10px 0" }}>Sin archivos recientes</p>
              ) : recentFiles.map((file) => (
                <a 
                  key={file.id} 
                  href={file.url_cloudinary} 
                  target="_blank" 
                  rel="noreferrer"
                  className="card-hover-bright"
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 12, 
                    padding: 8, 
                    borderRadius: 10, 
                    background: "rgba(255,255,255,0.02)",
                    textDecoration: "none"
                  }}
                >
                  <div style={{ fontSize: 20 }}>{file.tipo.includes("pdf") ? "📄" : "🖼️"}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {file.nombre}
                    </p>
                    <p style={{ fontSize: 10, color: "var(--text-faint)", margin: 0 }}>{file.tamano_kb} KB</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
