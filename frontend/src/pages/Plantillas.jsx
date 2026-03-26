import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";

export default function Plantillas() {
  const [plantillas, setPlantillas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newPlantilla, setNewPlantilla] = useState({
    nombre: "", descripcion: "", campos_schema: []
  });

  useEffect(() => {
    api.get("/plantillas").then(res => {
      setPlantillas(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleCreate = async () => {
    try {
      const res = await api.post("/plantillas", newPlantilla);
      setPlantillas([...plantillas, res.data]);
      setShowModal(false);
      setNewPlantilla({ nombre: "", descripcion: "", campos_schema: [] });
    } catch (err) {
      console.error(err);
    }
  };

  const addField = () => {
    const field = { id: Math.random().toString(36).substr(2, 9), name: "", type: "text", required: false };
    setNewPlantilla({ ...newPlantilla, campos_schema: [...newPlantilla.campos_schema, field] });
  };

  const updateField = (id, key, val) => {
    setNewPlantilla({
      ...newPlantilla,
      campos_schema: newPlantilla.campos_schema.map(f => f.id === id ? { ...f, [key]: val } : f)
    });
  };

  const removeField = (id) => {
    setNewPlantilla({
      ...newPlantilla,
      campos_schema: newPlantilla.campos_schema.filter(f => f.id !== id)
    });
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <p style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
            Protocolos de Investigación
          </p>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.04em", color: "#fff" }}>
            Mis <span style={{ color: "var(--accent)" }}>Plantillas</span>
          </h1>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          Nueva Plantilla
        </button>
      </div>

      {loading ? (
        <p style={{ color: "var(--text-muted)" }}>Sincronizando bibliotecas...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {plantillas.map(p => (
            <motion.div 
              key={p.id} className="card" layout
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{ padding: 24 }}
            >
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{p.nombre}</h3>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20, minHeight: 40 }}>{p.descripcion || "Sin descripción"}</p>
              <div style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                📊 {p.campos_schema.length} Campos Personalizados
              </div>
            </motion.div>
          ))}
          {plantillas.length === 0 && (
            <div className="card" style={{ gridColumn: "1/-1", padding: 60, textAlign: "center", border: "1px dashed var(--border-glass)" }}>
               <p style={{ color: "var(--text-faint)" }}>Aún no has definido protocolos personalizados.</p>
            </div>
          )}
        </div>
      )}

      {/* Modal Nueva Plantilla */}
      <AnimatePresence>
        {showModal && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
              className="card" style={{ width: "100%", maxWidth: 600, maxHeight: "90vh", overflowY: "auto", padding: 32 }}
            >
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Diseñar Protocolo</h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)" }}>NOMBRE DEL PROTOCOLO</label>
                  <input value={newPlantilla.nombre} onChange={e => setNewPlantilla({...newPlantilla, nombre: e.target.value})} placeholder="Ej: Reporte de Termodinámica" />
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)" }}>DESCRIPCIÓN</label>
                  <textarea rows={2} value={newPlantilla.descripcion} onChange={e => setNewPlantilla({...newPlantilla, descripcion: e.target.value})} placeholder="¿Para qué se usa esta plantilla?" />
                </div>

                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20 }}>
                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                     <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)" }}>ESQUEMA DE DATOS</label>
                     <button className="btn-secondary" style={{ padding: "4px 12px", fontSize: 11 }} onClick={addField}>+ Agregar Campo</button>
                   </div>
                   
                   <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                     {newPlantilla.campos_schema.map((f, i) => (
                       <div key={f.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 40px", gap: 10, background: "rgba(255,255,255,0.02)", padding: 12, borderRadius: 12, border: "1px solid var(--border-glass)" }}>
                         <input value={f.name} onChange={e => updateField(f.id, "name", e.target.value)} placeholder="Nombre del campo" style={{ fontSize: 13 }} />
                         <select value={f.type} onChange={e => updateField(f.id, "type", e.target.value)} style={{ fontSize: 13 }}>
                            <option value="text">Texto</option>
                            <option value="number">Número</option>
                            <option value="date">Fecha</option>
                            <option value="select">Lista de Opciones</option>
                         </select>
                         <button onClick={() => removeField(f.id)} style={{ background: "rgba(255,77,77,0.1)", color: "#ff4d4d", border: "none", borderRadius: 8, cursor: "pointer" }}>✕</button>
                       </div>
                     ))}
                   </div>
                </div>

                <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                  <button className="btn-primary" style={{ flex: 1 }} onClick={handleCreate}>Guardar Plantilla</button>
                  <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
