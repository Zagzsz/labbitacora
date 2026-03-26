import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import { Link } from "react-router-dom";

const pageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ nombre: "", descripcion: "" });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchProyectos();
  }, []);

  const fetchProyectos = async () => {
    try {
      const res = await api.get("/proyectos");
      setProyectos(res.data);
    } catch (err) {
      console.error("Error al cargar proyectos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newProject.nombre) return;
    setIsCreating(true);
    try {
      await api.post("/proyectos", newProject);
      setNewProject({ nombre: "", descripcion: "" });
      setShowModal(false);
      fetchProyectos();
    } catch (err) {
      alert("Error al crear el proyecto");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible">
      {/* Header Area */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
        <div>
          <p style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
            Gestión de Espacios
          </p>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.04em", color: "#fff", margin: 0 }}>
            Tus <span style={{ color: "var(--accent)" }}>Proyectos</span>
          </h1>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Nuevo Proyecto
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "100px 0", color: "var(--text-faint)" }}>
          Cargando espacios de trabajo...
        </div>
      ) : (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
          gap: 24 
        }}>
          {proyectos.map((p, idx) => (
            <motion.div 
              key={p.id} 
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: idx * 0.05 }}
            >
              <div className="card h-full" style={{ 
                padding: 24, 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between",
                minHeight: 180,
                border: "1px solid rgba(255,255,255,0.05)",
                background: "var(--bg-elevated)",
                position: "relative",
                overflow: "hidden"
              }}>
                {/* Decorative background element */}
                <div style={{
                  position: "absolute", top: -20, right: -20, width: 100, height: 100,
                  background: "var(--accent)", filter: "blur(60px)", opacity: 0.1, zIndex: 0
                }} />
                
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ 
                      width: 40, height: 40, borderRadius: 12, 
                      background: "rgba(255,255,255,0.03)", 
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: "1px solid rgba(255,255,255,0.08)",
                      fontSize: 18
                    }}>
                      📁
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#fff" }}>{p.nombre}</h3>
                  </div>
                  <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 20, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {p.descripcion || "Sin descripción proporcionada."}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", position: "relative", zIndex: 1 }}>
                  <span style={{ fontSize: 12, color: "var(--text-faint)" }}>
                    Creado {new Date(p.created_at).toLocaleDateString()}
                  </span>
                  <Link to={`/practicas?proyecto_id=${p.id}`} className="btn-secondary" style={{ padding: "6px 12px", fontSize: 12 }}>
                    Ver Prácticas
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add Project Ghost Card */}
          <motion.div 
            variants={cardVariant}
            onClick={() => setShowModal(true)}
            style={{ 
              border: "2px dashed var(--border)", 
              borderRadius: 24, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              cursor: "pointer",
              minHeight: 180,
              transition: "all 0.2s"
            }}
            whileHover={{ borderColor: "var(--accent)", backgroundColor: "rgba(255,255,255,0.01)" }}
          >
            <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
              <span style={{ fontSize: 32, display: "block", marginBottom: 8 }}>+</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>Cerrar un nuevo espacio</span>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal for New Project */}
      <AnimatePresence>
        {showModal && (
          <div style={{
            position: "fixed", inset: 0, zIndex: 1000, 
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20
          }}>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="card"
              style={{ width: "100%", maxWidth: 440, padding: 32, position: "relative", zIndex: 1001 }}
            >
              <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Nuevo Proyecto</h2>
              <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 28 }}>
                Define un nuevo espacio de trabajo para organizar tus investigaciones científicas.
              </p>
              
              <form onSubmit={handleCreate}>
                <div className="input-group">
                  <label>Nombre del proyecto</label>
                  <input 
                    autoFocus
                    required
                    placeholder="Ej. Análisis Cuántico 2024"
                    value={newProject.nombre}
                    onChange={(e) => setNewProject({...newProject, nombre: e.target.value})}
                  />
                </div>
                
                <div className="input-group">
                  <label>Descripción (Opcional)</label>
                  <textarea 
                    rows={3}
                    placeholder="Describe los objetivos o el alcance de este espacio..."
                    value={newProject.descripcion}
                    onChange={(e) => setNewProject({...newProject, descripcion: e.target.value})}
                  />
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                  <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary" disabled={isCreating || !newProject.nombre}>
                    {isCreating ? "Creando..." : "Crear Proyecto"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
