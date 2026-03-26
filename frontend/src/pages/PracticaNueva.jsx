import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import useMobile from "../hooks/useMobile";

const MATERIAS = ["Electrónica", "PLC", "Hidráulica", "Mecánica", "Programación", "Control", "Robótica", "Otro..."];
const ETIQUETAS_SUGERIDAS = ["PLC", "Circuitos", "Bomba de agua", "Sensores", "Arduino", "Simulación", "Laboratorio", "Proyecto final"];
const STEPS = ["Identificación", "Documentación", "Mediciones"];

const pageVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

export default function PracticaNueva() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [etiquetaInput, setEtiquetaInput] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proyectos, setProyectos] = useState([]);
  const [plantillas, setPlantillas] = useState([]);
  const [selectedPlantilla, setSelectedPlantilla] = useState(null);
  const isMobile = useMobile(1024);
  const [form, setForm] = useState({
    titulo: "", materia: "",
    fecha: new Date().toISOString().split("T")[0],
    etiquetas: [], objetivo: "", descripcion: "", conclusion: "",
    mediciones: [],
    proyecto_id: new URLSearchParams(window.location.search).get("proyecto_id") || "",
    is_public: false,
    plantilla_id: "",
    campos_dinamicos: {}
  });

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get("/proyectos"),
      api.get("/plantillas")
    ]).then(([projRes, plantRes]) => {
      setProyectos(projRes.data);
      setPlantillas(plantRes.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setError("Error al cargar dependencias técnicas. Verifica la conexión con el servidor.");
      setLoading(false);
    });
  }, []);
  const [medTemp, setMedTemp] = useState({ nombre: "", unidad: "", valores: "" });

  const set = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  const toggleTag = (t) => set("etiquetas", form.etiquetas.includes(t) ? form.etiquetas.filter(x => x !== t) : [...form.etiquetas, t]);
  const addCustomTag = (e) => {
    if (e.key === "Enter" && etiquetaInput.trim()) {
      e.preventDefault();
      if (!form.etiquetas.includes(etiquetaInput.trim())) toggleTag(etiquetaInput.trim());
      setEtiquetaInput("");
    }
  };
  const addMedicion = () => {
    if (!medTemp.nombre || !medTemp.unidad || !medTemp.valores) return;
    const valores = medTemp.valores.split(",").map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
    set("mediciones", [...form.mediciones, { ...medTemp, valores }]);
    setMedTemp({ nombre: "", unidad: "", valores: "" });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.post("/practicas", {
        titulo: form.titulo,
        materia: form.materia,
        fecha: form.fecha,
        etiquetas: form.etiquetas,
        objetivo: form.objetivo,
        descripcion: form.descripcion,
        conclusion: form.conclusion,
        proyecto_id: form.proyecto_id || null,
        is_public: form.is_public,
        campos_dinamicos: form.campos_dinamicos
      });
      const practicaId = res.data.id;

      // Save mediciones
      for (const m of form.mediciones) {
        await api.post(`/practicas/${practicaId}/mediciones`, {
          nombre_variable: m.nombre,
          unidad: m.unidad,
          valores: m.valores,
        });
      }

      setSaved(true);
      setTimeout(() => navigate(`/practicas/${practicaId}`), 1200);
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  };

  if (loading) return (
    <div style={{ padding: 100, textAlign: "center", color: "var(--text-muted)" }}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>⚙️</motion.div>
      <p style={{ marginTop: 20 }}>Sincronizando protocolos y espacios de investigación...</p>
    </div>
  );

  if (error) return (
    <div style={{ padding: 100, textAlign: "center", color: "var(--danger)" }}>
      <p style={{ fontSize: 24 }}>⚠️</p>
      <p>{error}</p>
      <button className="btn-secondary" onClick={() => window.location.reload()} style={{ marginTop: 20 }}>Reintentar</button>
    </div>
  );

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between", 
        alignItems: isMobile ? "flex-start" : "flex-end", 
        marginBottom: 40,
        gap: 20
      }}>
        <div>
          <p style={{ fontSize: 10, color: "var(--text-faint)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
            SISTEMA DE REGISTRO CORE <span style={{ color: "#3a3a50" }}>/</span> NUEVO EXPEDIENTE
          </p>
          <h1 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, letterSpacing: "-0.04em", color: "#fff", margin: 0 }}>
            Iniciar Investigación <span style={{ color: "var(--accent)" }}>Digital</span>
          </h1>
        </div>
        <div style={{
          fontSize: 10, color: "var(--accent)", background: "var(--accent-glow)",
          border: "1px solid var(--accent-ring)", borderRadius: 12, padding: "6px 14px", fontWeight: 700,
          fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em"
        }}>
          DRAFT-MODE::ACTIVE
        </div>
      </div>

      {/* Advanced Step Progress */}
      <div style={{ 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center", 
        marginBottom: 48, 
        gap: 12 
      }}>
        {STEPS.map((label, i) => (
          <div key={label} style={{
            display: "flex", alignItems: "center", gap: 14,
            flex: isMobile ? "none" : 1, 
            position: "relative",
            width: isMobile ? "100%" : "auto"
          }}>
            <button 
              onClick={() => i < step && setStep(i)} 
              disabled={i > step}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "none", border: "none", padding: 0,
                cursor: i < step ? "pointer" : "default",
                opacity: i > step ? 0.3 : 1,
                textAlign: "left"
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: i === step ? "var(--accent)" : i < step ? "var(--accent-glow)" : "rgba(255,255,255,0.02)",
                border: i === step ? "1px solid var(--accent)" : "1px solid var(--border)",
                boxShadow: i === step ? "0 0 15px var(--accent-ring)" : "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}>
                {i < step ? (
                  <span style={{ color: "var(--accent)", fontWeight: 800, fontSize: 14 }}>✓</span>
                ) : (
                  <span style={{ fontSize: 13, fontWeight: 700, color: i === step ? "#fff" : "var(--text-faint)" }}>
                    0{i + 1}
                  </span>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{
                  fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em",
                  color: i === step ? "var(--accent)" : "var(--text-faint)",
                  fontWeight: 700, marginBottom: 2
                }}>
                  FASE 0{i+1}
                </span>
                <span style={{
                  fontSize: 13, whiteSpace: "nowrap", transition: "color 0.2s",
                  color: i === step ? "#fff" : i < step ? "var(--text-muted)" : "var(--text-faint)",
                  fontWeight: i === step ? 600 : 500,
                }}>
                  {label}
                </span>
              </div>
            </button>
            {i < STEPS.length - 1 && !isMobile && (
              <div style={{ 
                flex: 1, height: 2, 
                background: i < step ? "var(--accent)" : "rgba(255,255,255,0.05)",
                borderRadius: 1,
                boxShadow: i < step ? "0 0 8px var(--accent-ring)" : "none"
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Unified Form Container */}
      <div className="card" style={{ padding: isMobile ? "24px 16px" : "40px", marginBottom: 32 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* STEP 0 — Identificación */}
            {step === 0 && (
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24 }}>
                <Field label="TÍTULO DE INVESTIGACIÓN" required span={2} hint="Identificador único para este registro">
                  <input 
                    placeholder="ej. Sincronización de Motores Trifásicos con Control PID"
                    value={form.titulo} 
                    onChange={e => set("titulo", e.target.value)} 
                    style={{ fontSize: 16, padding: "14px 18px", background: "rgba(255,255,255,0.02)" }}
                  />
                </Field>
                <Field label="DOMINIO CIENTÍFICO" required>
                  <select 
                    value={MATERIAS.slice(0, -1).includes(form.materia) ? form.materia : (form.materia ? "Otro..." : "")} 
                    onChange={e => {
                      const val = e.target.value;
                      if (val === "Otro...") {
                        set("materia", ""); // Trigger custom input mode
                      } else {
                        set("materia", val);
                      }
                    }}
                  >
                    <option value="">Seleccionar dominio...</option>
                    {MATERIAS.slice(0, -1).map(m => <option key={m} value={m}>{m}</option>)}
                    <option value="Otro...">Otro (Especificar...)</option>
                  </select>
                </Field>

                {(!MATERIAS.slice(0, -1).includes(form.materia) && (form.materia !== "" || !MATERIAS.includes(form.materia))) && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} style={{ gridColumn: "span 2" }}>
                    <Field label="ESPECIFICAR DOMINIO PERSONALIZADO" required hint="Ej: Biotecnología, Termofluidos...">
                      <input 
                        placeholder="Ingresa el nombre del dominio o materia"
                        value={form.materia}
                        onChange={e => set("materia", e.target.value)}
                      />
                    </Field>
                  </motion.div>
                )}
                <Field label="FECHA DE REGISTRO">
                  <input type="date" value={form.fecha} onChange={e => set("fecha", e.target.value)} />
                </Field>
                <Field label="ASOCIAR A PROYECTO (WORKSPACE)" hint="Opcional">
                  <select value={form.proyecto_id} onChange={e => set("proyecto_id", e.target.value)}>
                    <option value="">Investigación Independiente</option>
                    {proyectos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                  </select>
                </Field>
                <Field label="PROTOCOLOS DE INVESTIGACIÓN (PLANTILLA)" hint="Carga campos personalizados automáticamente">
                  <select 
                    value={form.plantilla_id} 
                    onChange={e => {
                      const pid = e.target.value;
                      const p = plantillas.find(x => x.id === pid);
                      set("plantilla_id", pid);
                      setSelectedPlantilla(p);
                      // Reset dynamic fields when template changes
                      set("campos_dinamicos", {});
                    }}
                  >
                    <option value="">Investigación Libre (Sin plantilla)</option>
                    {plantillas.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                  </select>
                </Field>
                <Field label="VISIBILIDAD DEL EXPEDIENTE">
                  <div 
                    onClick={() => set("is_public", !form.is_public)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
                      padding: "10px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 12,
                      border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.2s"
                    }}
                  >
                    <div style={{
                      width: 32, height: 18, borderRadius: 10, background: form.is_public ? "var(--accent)" : "rgba(255,255,255,0.1)",
                      position: "relative", transition: "all 0.2s"
                    }}>
                      <div style={{
                        width: 14, height: 14, borderRadius: "50%", background: "#fff",
                        position: "absolute", top: 2, left: form.is_public ? 16 : 2,
                        transition: "all 0.2s"
                      }} />
                    </div>
                    <span style={{ fontSize: 13, color: form.is_public ? "#fff" : "var(--text-muted)", fontWeight: 500 }}>
                      {form.is_public ? "Acceso Público Activado" : "Privado (Solo tú)"}
                    </span>
                  </div>
                </Field>
                <Field label="CLASIFICACIÓN POR ETIQUETAS" span={2} hint="Presiona Enter para agregar etiquetas personalizadas">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                    {ETIQUETAS_SUGERIDAS.map(t => (
                      <button 
                        key={t} 
                        className={`tag-pill ${form.etiquetas.includes(t) ? "active" : ""}`}
                        onClick={() => toggleTag(t)} 
                        type="button"
                        style={{ padding: "6px 14px", fontSize: 12 }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <input
                    placeholder="Nueva etiqueta..."
                    value={etiquetaInput}
                    onChange={e => setEtiquetaInput(e.target.value)}
                    onKeyDown={addCustomTag}
                    style={{ background: "rgba(255,255,255,0.01)", borderStyle: "dashed" }}
                  />
                  <AnimatePresence>
                    {form.etiquetas.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16, padding: "16px", background: "rgba(255,255,255,0.02)", borderRadius: 12 }}>
                        {form.etiquetas.map(t => (
                          <motion.span key={t}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            style={{
                              display: "flex", alignItems: "center", gap: 8,
                              background: "rgba(139, 92, 246, 0.1)", border: "1px solid rgba(139, 92, 246, 0.2)",
                              borderRadius: 8, color: "var(--accent)", fontSize: 12, padding: "4px 10px", fontWeight: 600
                            }}>
                            {t.toUpperCase()}
                            <button onClick={() => toggleTag(t)} type="button"
                              style={{ background: "none", border: "none", color: "rgba(139, 92, 246, 0.4)", fontSize: 16, padding: 0, cursor: "pointer", display: "flex" }}>
                              ×
                            </button>
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </Field>
              </div>
            )}

            {/* STEP 1 — Documentación */}
            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                <Field label="OBJETIVO DE LA INVESTIGACIÓN" hint="Markdown soportado" span={2}>
                  <textarea style={{ minHeight: 100 }} rows={4}
                    placeholder="Define con precisión qué se busca validar o descubrir en esta práctica..."
                    value={form.objetivo} onChange={e => set("objetivo", e.target.value)} />
                </Field>
                <Field label="METODOLOGÍA Y DESARROLLO" hint="Markdown soportado" span={2}>
                  <textarea style={{ minHeight: 180 }} rows={8}
                    placeholder="Describe los pasos técnicos, componentes utilizados y el proceso experimental..."
                    value={form.descripcion} onChange={e => set("descripcion", e.target.value)} />
                </Field>
                <Field label="SÍNTESIS Y RESULTADOS ESPERADOS" hint="Markdown soportado" span={2}>
                  <textarea style={{ minHeight: 100 }} rows={4}
                    placeholder="Resume los hallazgos preliminares o conclusiones finales..."
                    value={form.conclusion} onChange={e => set("conclusion", e.target.value)} />
                </Field>

                {selectedPlantilla && selectedPlantilla.campos_schema && selectedPlantilla.campos_schema.length > 0 && (
                  <div style={{ marginTop: 24, padding: 32, background: "rgba(139, 92, 246, 0.03)", borderRadius: 24, border: "1px solid rgba(139, 92, 246, 0.1)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                       <span style={{ fontSize: 20 }}>📋</span>
                       <div>
                         <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: 0 }}>Protocolo: {selectedPlantilla.nombre}</h3>
                         <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>Campos adicionales requeridos por esta plantilla</p>
                       </div>
                    </div>
                    
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24 }}>
                      {selectedPlantilla.campos_schema.map(f => (
                        <Field key={f.id} label={f.name} hint={f.type.toUpperCase()}>
                          {f.type === "text" && (
                            <input 
                              placeholder={`Ingresar ${f.name.toLowerCase()}`}
                              value={form.campos_dinamicos[f.id] || ""} 
                              onChange={e => set("campos_dinamicos", { ...form.campos_dinamicos, [f.id]: e.target.value })} 
                            />
                          )}
                          {f.type === "number" && (
                            <input 
                              type="number"
                              placeholder="0.00"
                              value={form.campos_dinamicos[f.id] || ""} 
                              onChange={e => set("campos_dinamicos", { ...form.campos_dinamicos, [f.id]: e.target.value })} 
                            />
                          )}
                          {f.type === "date" && (
                            <input 
                              type="date"
                              value={form.campos_dinamicos[f.id] || ""} 
                              onChange={e => set("campos_dinamicos", { ...form.campos_dinamicos, [f.id]: e.target.value })} 
                            />
                          )}
                        </Field>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2 — Mediciones */}
            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                <div className="glass" style={{
                  borderRadius: 20, padding: 28, border: "1px solid rgba(255,255,255,0.05)",
                  background: "rgba(255,255,255,0.02)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }} />
                    <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}> Captura de Telemetría </p>
                  </div>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                    <Field label="VARIABLE DE SENSO">
                      <input placeholder="ej. Presión Hidráulica"
                        value={medTemp.nombre} onChange={e => setMedTemp(m => ({ ...m, nombre: e.target.value }))} />
                    </Field>
                    <Field label="UNIDAD DE MEDIDA">
                      <input placeholder="ej. Bar, PSI, Pa"
                        value={medTemp.unidad} onChange={e => setMedTemp(m => ({ ...m, unidad: e.target.value }))} />
                    </Field>
                    <Field label="CONJUNTO DE DATOS (SERIALIZADOS)" span={2} hint="Introduce valores numéricos separados por coma">
                      <textarea 
                        rows={3}
                        style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}
                        placeholder="ej. 10.5, 12.2, 14.8, 11.1, 15.6"
                        value={medTemp.valores} 
                        onChange={e => setMedTemp(m => ({ ...m, valores: e.target.value }))} 
                      />
                    </Field>
                  </div>
                  <button onClick={addMedicion} type="button" className="btn-secondary" style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>
                    + Vincular Conjunto de Datos
                  </button>
                </div>

                <AnimatePresence>
                  {form.mediciones.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        FLUJOS DE DATOS VINCULADOS ({form.mediciones.length})
                      </p>
                      {form.mediciones.map((m, i) => (
                        <motion.div key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="glass"
                          style={{
                            borderRadius: 16, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16,
                            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)"
                          }}>
                          <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", fontWeight: 800 }}>
                            {i + 1}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                              <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{m.nombre}</span>
                              <span style={{ fontSize: 11, color: "var(--accent)", background: "rgba(139,92,246,0.1)", padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>
                                {m.unidad}
                              </span>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                              {m.valores.slice(0, 8).map((v, vi) => (
                                <span key={vi} style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>[{v}]</span>
                              ))}
                              {m.valores.length > 8 && <span style={{ fontSize: 11, color: "var(--text-faint)" }}>...(+{m.valores.length - 8})</span>}
                            </div>
                          </div>
                          <button 
                            onClick={() => set("mediciones", form.mediciones.filter((_, j) => j !== i))}
                            type="button"
                            style={{ background: "rgba(255,255,255,0.05)", border: "none", color: "var(--text-faint)", borderRadius: 8, padding: "8px", cursor: "pointer" }}
                          >
                            ✕
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                      padding: "60px 40px", border: "1px dashed rgba(255,255,255,0.05)", borderRadius: 20,
                      background: "rgba(255,255,255,0.01)"
                    }}>
                      <div style={{ fontSize: 32, opacity: 0.2 }}>📉</div>
                      <p style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 500 }}>No hay telemetría registrada</p>
                      <p style={{ fontSize: 12, color: "var(--text-faint)", textAlign: "center", maxWidth: 300, lineHeight: 1.6 }}>
                        Agrega conjuntos de datos experimentales para generar visualizaciones automáticas en el reporte técnico.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Control Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 10px" }}>
        <button
          className="btn-secondary"
          disabled={step === 0}
          onClick={() => setStep(s => Math.max(0, s - 1))}
          style={{ 
            opacity: step === 0 ? 0 : 1, 
            visibility: step === 0 ? "hidden" : "visible",
            padding: "12px 24px" 
          }}
        >
          ← RETROCEDER FASE
        </button>
        
        <div style={{ display: "flex", gap: 8 }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{
              height: 4, borderRadius: 99, transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              width: i === step ? 30 : 6,
              background: i === step ? "var(--accent)" : i < step ? "var(--accent-glow)" : "rgba(255,255,255,0.1)",
              boxShadow: i === step ? "0 0 10px var(--accent-ring)" : "none"
            }} />
          ))}
        </div>

        {step < STEPS.length - 1 ? (
          <button className="btn-primary" onClick={() => setStep(s => s + 1)} style={{ padding: "12px 32px" }}>
            CONTINUAR FASE →
          </button>
        ) : (
          <motion.button
            className="btn-primary"
            onClick={handleSave}
            disabled={saving}
            animate={saved ? { scale: [1, 0.95, 1.05, 1], rotate: [0, -1, 1, 0] } : {}}
            transition={{ duration: 0.4 }}
            style={{
              background: saved ? "var(--success)" : "var(--accent)",
              boxShadow: saved ? "0 0 20px rgba(34, 197, 94, 0.3)" : "0 8px 20px var(--accent-ring)",
              padding: "12px 40px",
              fontWeight: 700
            }}
          >
            {saved ? "✓ REGISTRO FINALIZADO" : saving ? "PROCESANDO..." : "FINALIZAR Y GUARDAR"}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

function Field({ label, hint, children, span, required }) {
  return (
    <div style={{
      gridColumn: span === 2 ? "1 / -1" : "span 1",
      display: "flex", flexDirection: "column", gap: 10,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {label}{required && <span style={{ color: "var(--accent)", marginLeft: 4 }}>*</span>}
        </label>
        {hint && <span style={{ fontSize: 10, color: "var(--text-faint)", fontWeight: 500 }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}
