import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

const MATERIAS = ["Electrónica", "PLC", "Hidráulica", "Mecánica", "Programación", "Control", "Robótica", "Otra"];
const ETIQUETAS_SUGERIDAS = ["PLC", "Circuitos", "Bomba de agua", "Sensores", "Arduino", "Simulación", "Laboratorio", "Proyecto final"];

const pageVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

export default function PracticaEditar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [etiquetaInput, setEtiquetaInput] = useState("");
  const [proyectos, setProyectos] = useState([]);
  const [form, setForm] = useState({
    titulo: "", materia: "", fecha: "", etiquetas: [],
    objetivo: "", descripcion: "", conclusion: "",
    proyecto_id: "", is_public: false,
  });

  useEffect(() => {
    // Cargar proyectos disponibles
    api.get("/proyectos").then(res => setProyectos(res.data)).catch(console.error);

    api.get(`/practicas/${id}`).then((res) => {
      const p = res.data;
      setForm({
        titulo: p.titulo, materia: p.materia, fecha: p.fecha,
        etiquetas: p.etiquetas || [],
        objetivo: p.objetivo || "", descripcion: p.descripcion || "",
        conclusion: p.conclusion || "",
        proyecto_id: p.proyecto_id || "",
        is_public: p.is_public || false,
      });
      setLoading(false);
    });
  }, [id]);

  const set = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  const toggleTag = (t) => set("etiquetas", form.etiquetas.includes(t) ? form.etiquetas.filter(x => x !== t) : [...form.etiquetas, t]);

  const addCustomTag = (e) => {
    if (e.key === "Enter" && etiquetaInput.trim()) {
      e.preventDefault();
      if (!form.etiquetas.includes(etiquetaInput.trim())) toggleTag(etiquetaInput.trim());
      setEtiquetaInput("");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(`/practicas/${id}`, {
        ...form,
        proyecto_id: form.proyecto_id || null
      });
      setSaved(true);
      setTimeout(() => navigate(`/practicas/${id}`), 1000);
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  };

  if (loading) return <p style={{ color: "var(--text-muted)" }}>Cargando...</p>;

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <p style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 5 }}>
            <Link to="/" style={{ color: "inherit" }}>Prácticas</Link>
            <span style={{ color: "#3a3a50" }}> / </span>
            <Link to={`/practicas/${id}`} style={{ color: "inherit" }}>Detalle</Link>
            <span style={{ color: "#3a3a50" }}> / </span>
            Editar
          </p>
          <h1 style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--text-primary)" }}>
            Editar práctica
          </h1>
        </div>
      </div>

      {/* Form */}
      <div className="card" style={{ marginBottom: 16, display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="Título" required span={2}>
            <input value={form.titulo} onChange={e => set("titulo", e.target.value)}
              placeholder="Título de la práctica" />
          </Field>
          <Field label="Materia">
            <select value={form.materia} onChange={e => set("materia", e.target.value)}>
              <option value="">Seleccionar…</option>
              {MATERIAS.map(m => <option key={m}>{m}</option>)}
            </select>
          </Field>
          <Field label="Fecha">
            <input type="date" value={form.fecha} onChange={e => set("fecha", e.target.value)} />
          </Field>
          <Field label="Proyecto (Workspace)" hint="Opcional">
            <select value={form.proyecto_id} onChange={e => set("proyecto_id", e.target.value)}>
              <option value="">Investigación Independiente</option>
              {proyectos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
            </select>
          </Field>
          <Field label="Visibilidad">
            <div 
              onClick={() => set("is_public", !form.is_public)}
              style={{
                display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
                padding: "8px 12px", background: "rgba(255,255,255,0.02)", borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.05)", marginTop: 2
              }}
            >
              <div style={{
                width: 28, height: 14, borderRadius: 10, background: form.is_public ? "var(--accent)" : "rgba(255,255,255,0.1)",
                position: "relative", transition: "all 0.2s"
              }}>
                <div style={{
                  width: 10, height: 10, borderRadius: "50%", background: "#fff",
                  position: "absolute", top: 2, left: form.is_public ? 16 : 2,
                  transition: "all 0.2s"
                }} />
              </div>
              <span style={{ fontSize: 12, color: form.is_public ? "#fff" : "var(--text-muted)" }}>
                {form.is_public ? "Acceso Público" : "Privado"}
              </span>
            </div>
          </Field>
          <Field label="Etiquetas" span={2}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {ETIQUETAS_SUGERIDAS.map(t => (
                <button key={t} className={`tag-pill ${form.etiquetas.includes(t) ? "active" : ""}`}
                  onClick={() => toggleTag(t)} type="button">{t}</button>
              ))}
            </div>
            <input style={{ marginTop: 10 }}
              placeholder="Etiqueta personalizada — Enter para agregar"
              value={etiquetaInput} onChange={e => setEtiquetaInput(e.target.value)}
              onKeyDown={addCustomTag} />
            {form.etiquetas.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                {form.etiquetas.map(t => (
                  <span key={t} style={{
                    display: "flex", alignItems: "center", gap: 5,
                    background: "var(--accent-dim)", border: "1px solid #818cf840",
                    borderRadius: 20, color: "#c7d2fe", fontSize: 12, padding: "2px 10px",
                  }}>
                    {t}
                    <button onClick={() => toggleTag(t)} type="button"
                      style={{ background: "none", border: "none", color: "#818cf870", fontSize: 13, lineHeight: 1, padding: 0, cursor: "pointer" }}>×</button>
                  </span>
                ))}
              </div>
            )}
          </Field>
        </div>

        <Field label="Objetivo">
          <textarea style={{ minHeight: 90 }} rows={4} value={form.objetivo}
            onChange={e => set("objetivo", e.target.value)}
            placeholder="¿Qué se busca demostrar o aprender?" />
        </Field>

        <Field label="Procedimiento">
          <textarea style={{ minHeight: 130 }} rows={6} value={form.descripcion}
            onChange={e => set("descripcion", e.target.value)}
            placeholder="Paso a paso de lo realizado..." />
        </Field>

        <Field label="Conclusiones">
          <textarea style={{ minHeight: 90 }} rows={4} value={form.conclusion}
            onChange={e => set("conclusion", e.target.value)}
            placeholder="¿Los resultados coincidieron con lo esperado?" />
        </Field>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to={`/practicas/${id}`} className="btn-secondary">← Cancelar</Link>
        <motion.button
          className="btn-primary" onClick={handleSave} disabled={saving}
          animate={saved ? { scale: [1, 0.96, 1] } : {}}
          transition={{ duration: 0.2 }}
          style={{
            background: saved ? "var(--success)" : "var(--accent)",
            boxShadow: saved ? "0 0 0 3px #22c55e25" : undefined,
          }}>
          {saved ? "✓ Guardado" : saving ? "Guardando..." : "Guardar cambios"}
        </motion.button>
      </div>
    </motion.div>
  );
}

function Field({ label, children, span, required }) {
  return (
    <div style={{
      gridColumn: span === 2 ? "1 / -1" : undefined,
      display: "flex", flexDirection: "column", gap: 6,
    }}>
      <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-muted)", letterSpacing: "0.005em" }}>
        {label}{required && <span style={{ color: "var(--accent)", marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  );
}
