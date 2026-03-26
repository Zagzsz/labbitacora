import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import useMobile from "../hooks/useMobile";

const pageVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

export default function Practicas() {
  const [practicas, setPracticas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const proyectoId = new URLSearchParams(window.location.search).get("proyecto_id");
  const [proyecto, setProyecto] = useState(null);
  const isMobile = useMobile(1024);

  useEffect(() => {
    const url = proyectoId ? `/practicas?proyecto_id=${proyectoId}` : "/practicas";
    api.get(url).then((res) => {
      setPracticas(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));

    if (proyectoId) {
      api.get(`/proyectos/${proyectoId}`).then(res => setProyecto(res.data)).catch(console.error);
    }
  }, [proyectoId]);

  const getMateriaBg = (materia) => {
    const m = materia?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";
    if (m.includes("quimica")) return "/backgrounds/bg-chemistry.png";
    if (m.includes("fisica")) return "/backgrounds/bg-physics.png";
    if (m.includes("biologia")) return "/backgrounds/bg-biology.png";
    if (m.includes("electronica")) return "/backgrounds/bg-electronics.png";
    if (m.includes("hidraulica")) return "/backgrounds/bg-hidraulica.png";
    if (m.includes("plc")) return "/backgrounds/bg-electronics.png";
    if (m.includes("mecanica")) return "/backgrounds/bg-physics.png";
    return "/backgrounds/bg-general.png";
  };

  const allTags = [...new Set(practicas.flatMap((p) => p.etiquetas || []))];

  const filtered = practicas.filter((p) => {
    const matchSearch =
      !search ||
      p.titulo.toLowerCase().includes(search.toLowerCase()) ||
      p.materia.toLowerCase().includes(search.toLowerCase());
    const matchTag = !tagFilter || (p.etiquetas || []).includes(tagFilter);
    return matchSearch && matchTag;
  });

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" style={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between", 
        alignItems: isMobile ? "flex-start" : "center", 
        gap: isMobile ? 20 : 0,
        marginBottom: 32 
      }}>
        <div>
          <p style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
            {proyecto ? `Workspace / ${proyecto.nombre}` : "Explorador de Investigación"}
          </p>
          <h1 style={{ fontSize: isMobile ? 24 : 28, fontWeight: 700, letterSpacing: "-0.04em", color: "#fff" }}>
            {proyecto ? "Bitácoras del" : "Mis"} <span style={{ color: "var(--accent)" }}>{proyecto ? "Proyecto" : "Prácticas"}</span>
          </h1>
        </div>
        <Link to={`/practicas/nueva${proyectoId ? `?proyecto_id=${proyectoId}` : ""}`} className="btn-primary" style={{ width: isMobile ? "100%" : "auto", textAlign: "center", textDecoration: "none" }}>
          Nueva Práctica
        </Link>
      </div>

      {/* Search & Filters */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <div style={{ position: "relative", flex: 1 }}>
          <span style={{ position: "absolute", left: 14, top: 12, opacity: 0.4 }}>🔍</span>
          <input
            placeholder="Buscar por título o materia..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: 42, fontSize: 14, background: "rgba(255,255,255,0.02)" }}
          />
        </div>
      </div>

      {allTags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          <button
            className={`tag-pill ${!tagFilter ? "active" : ""}`}
            onClick={() => setTagFilter("")}
          >
            Todos los dominios
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`tag-pill ${tagFilter === tag ? "active" : ""}`}
              onClick={() => setTagFilter(tag === tagFilter ? "" : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <p style={{ color: "var(--text-muted)", textAlign: "center", padding: 40 }}>Analizando registros...</p>
      ) : filtered.length === 0 ? (
        <div style={{ padding: "80px 20px", border: "1px dashed var(--border)", borderRadius: 20, textAlign: "center" }}>
          <p style={{ color: "var(--text-muted)" }}>No se encontraron prácticas</p>
        </div>
      ) : (
        <motion.div
          variants={container} initial="hidden" animate="visible"
          style={{ 
            display: "grid", 
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))", 
            gap: isMobile ? 16 : 20 
          }}
        >
          {filtered.map((p) => (
            <motion.div key={p.id} variants={cardVariant}>
              <Link to={`/practicas/${p.id}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ height: "100%", position: "relative", overflow: "hidden", minHeight: 160 }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${getMateriaBg(p.materia)})`, backgroundSize: "cover", opacity: 0.25 }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(22,22,38,0.2) 0%, rgba(22,22,38,0.95) 100%)" }} />
                  <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                    <p style={{ fontSize: 10, color: "var(--accent)", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>{p.materia}</p>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: 0 }}>{p.titulo}</h3>
                    <p style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 8 }}>{new Date(p.fecha).toLocaleDateString()}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
