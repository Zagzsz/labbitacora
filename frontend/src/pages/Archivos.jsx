import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

const pageVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

export default function Archivos() {
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tipoFilter, setTipoFilter] = useState("todos");

  useEffect(() => {
    console.log("🔍 Scanning for records in the central vault...");
    api.get("/archivos")
      .then((res) => {
        console.log("📁 Records retrieved:", res.data);
        setArchivos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Scan error:", err);
        setLoading(false);
      });
  }, []);

  const filtered = archivos.filter(a => {
    const matchesSearch = a.nombre.toLowerCase().includes(search.toLowerCase());
    const matchesTipo = tipoFilter === "todos" || a.tipo === tipoFilter;
    return matchesSearch && matchesTipo;
  });

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" style={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 11, color: "var(--text-faint)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
          BÓVEDA CENTRAL DE DATOS
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.04em", color: "#fff", margin: 0 }}>
              Explorador de <span style={{ color: "var(--accent)" }}>Recursos</span>
            </h1>
            <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 8 }}>
              Gestión centralizada de documentación técnica y evidencia experimental.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="glass" style={{ padding: "24px", borderRadius: 20, marginBottom: 32, display: "flex", gap: 20, alignItems: "center", border: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <span style={{ position: "absolute", left: 14, top: 12, opacity: 0.4 }}>🔍</span>
          <input
            placeholder="Buscar por nombre de archivo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: 42, fontSize: 14, background: "rgba(255,255,255,0.02)", width: "100%" }}
          />
        </div>
        
        <div style={{ display: "flex", gap: 8 }}>
          {["todos", "imagen", "pdf"].map((t) => (
            <button
              key={t}
              className={`tag-pill ${tipoFilter === t ? "active" : ""}`}
              onClick={() => setTipoFilter(t)}
              style={{ textTransform: "uppercase", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em" }}
            >
              {t === "todos" ? "Global" : t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: 80, color: "var(--text-faint)" }}>
          Escaneando boveda de datos...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 80, border: "1px dashed var(--border)", borderRadius: 20, background: "rgba(255,255,255,0.01)" }}>
          <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.1 }}>📂</div>
          <p style={{ color: "var(--text-muted)" }}>No se han encontrado recursos archivados.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
          {filtered.map((a) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={a.id}
              className="card"
              style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12, position: "relative" }}
            >
              <div style={{ height: 160, borderRadius: 12, background: "rgba(0,0,0,0.2)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                {a.tipo === "imagen" ? (
                  <img src={a.url_cloudinary} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 48 }}>📄</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", background: "var(--accent-glow)", padding: "2px 8px", borderRadius: 4 }}>
                      PDF DOCUMENT
                    </span>
                  </div>
                )}
                <a 
                  href={a.url_cloudinary} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    position: "absolute", inset: 0, background: "rgba(0,0,0,0)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.2s", textDecoration: "none", zIndex: 1
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.4)"}
                  onMouseOut={(e) => e.currentTarget.style.background = "rgba(0,0,0,0)"}
                >
                  <span style={{ color: "#fff", fontWeight: 700, opacity: 0, transition: "opacity 0.2s" }}>ABRIR RECURSO</span>
                </a>
              </div>
              
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {a.nombre}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "var(--text-faint)" }}>
                    {new Date(a.created_at).toLocaleDateString("es-MX", { day: "numeric", month: "short" })}
                  </span>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    {a.tamano_kb} KB
                  </span>
                </div>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 10, marginTop: "auto", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase" }}>Asociado a:</span>
                <Link to={`/practicas/${a.practica_id}`} style={{ fontSize: 10, color: "var(--accent)", fontWeight: 700, textDecoration: "none" }}>
                  EXPEDIENTE →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
