import { useState } from "react";

const MATERIAS = ["Electrónica", "PLC", "Hidráulica", "Mecánica", "Programación", "Control", "Robótica", "Otra"];
const ETIQUETAS_SUGERIDAS = ["PLC", "Circuitos", "Bomba de agua", "Sensores", "Arduino", "Simulación", "Laboratorio", "Proyecto final"];
const STEPS = ["Identificación", "Documentación", "Mediciones"];

export default function PracticaNueva() {
  const [step, setStep] = useState(0);
  const [etiquetaInput, setEtiquetaInput] = useState("");
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    titulo: "", materia: "",
    fecha: new Date().toISOString().split("T")[0],
    etiquetas: [], objetivo: "", descripcion: "", conclusion: "",
    mediciones: [],
  });
  const [medTemp, setMedTemp] = useState({ nombre: "", unidad: "", valores: "" });

  const set = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  const toggleTag = (t) => set("etiquetas", form.etiquetas.includes(t) ? form.etiquetas.filter(x => x !== t) : [...form.etiquetas, t]);
  const addCustomTag = (e) => {
    if (e.key === "Enter" && etiquetaInput.trim()) {
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
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        input, textarea, select { font-family: inherit; }
        input[type=date]::-webkit-calendar-picker-indicator { filter: invert(0.4); cursor: pointer; }
        select option { background: #111116; color: #e2e2e8; }
        textarea { resize: vertical; }
        button { cursor: pointer; font-family: inherit; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #2a2a35; border-radius: 99px; }
        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: #818cf8 !important;
          box-shadow: 0 0 0 3px rgba(129,140,248,0.1) !important;
        }
        .nav-prev:hover:not(:disabled) { background: #1c1c24 !important; color: #c8c8d8 !important; }
        .tag-pill:hover { border-color: #818cf8 !important; color: #c7d2fe !important; }
        .add-med:hover { border-color: #818cf888 !important; color: #c7d2fe !important; background: #818cf808 !important; }
        .del-btn:hover { color: #f87171 !important; }
        .nav-item:hover { background: #16161e !important; color: #c8c8d8 !important; }
      `}</style>

      {/* Sidebar */}
      <aside style={s.sidebar}>
        <div style={s.logoWrap}>
          <div style={s.logoMark}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect width="6" height="6" rx="1.5" fill="#818cf8"/>
              <rect x="8" width="6" height="6" rx="1.5" fill="#818cf840"/>
              <rect y="8" width="6" height="6" rx="1.5" fill="#818cf840"/>
              <rect x="8" y="8" width="6" height="6" rx="1.5" fill="#818cf820"/>
            </svg>
          </div>
          <span style={s.logoName}>LabBitácora</span>
        </div>

        <div style={s.navSection}>
          <p style={s.navSectionLabel}>General</p>
          {[
            { icon: "▦", label: "Dashboard" },
            { icon: "+", label: "Nueva práctica", active: true },
          ].map(item => (
            <div key={item.label} className="nav-item" style={{ ...s.navItem, ...(item.active ? s.navItemActive : {}) }}>
              <span style={s.navItemIcon}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>

        <div style={s.navSection}>
          <p style={s.navSectionLabel}>Registro</p>
          {[
            { icon: "◈", label: "Mediciones" },
            { icon: "⊙", label: "Archivos" },
          ].map(item => (
            <div key={item.label} className="nav-item" style={s.navItem}>
              <span style={s.navItemIcon}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>

        <div style={s.sideFooter}>
          <div style={s.userChip}>
            <div style={s.userAvatar} />
            <div>
              <p style={s.userName}>Mi cuenta</p>
              <p style={s.userSub}>Estudiante</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={s.main}>
        {/* Header */}
        <div style={s.header}>
          <div>
            <p style={s.breadcrumb}>Prácticas <span style={{color:"#3a3a50"}}>/</span> Nueva</p>
            <h1 style={s.title}>Nueva práctica</h1>
          </div>
          <span style={s.draftPill}>Borrador</span>
        </div>

        {/* Step progress */}
        <div style={s.stepsRow}>
          {STEPS.map((label, i) => (
            <button key={label} onClick={() => setStep(i)} style={s.stepBtn}>
              <div style={{ ...s.stepBubble, ...(i === step ? s.bubbleActive : i < step ? s.bubbleDone : {}) }}>
                {i < step
                  ? <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <span style={{ fontSize: 10, fontWeight: 600, color: i === step ? "#fff" : "#40405a" }}>{i + 1}</span>
                }
              </div>
              <span style={{ ...s.stepName, ...(i === step ? s.stepNameActive : i < step ? s.stepNameDone : {}) }}>{label}</span>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: 1, marginLeft: 10, background: i < step ? "#818cf830" : "#1e1e2c" }} />
              )}
            </button>
          ))}
        </div>

        {/* Form card */}
        <div style={s.card}>

          {/* STEP 0 — Identificación */}
          {step === 0 && (
            <div style={s.grid}>
              <Field label="Título" required span={2}>
                <input style={s.input} placeholder="ej. Control de motor DC con PLC Siemens S7-1200"
                  value={form.titulo} onChange={e => set("titulo", e.target.value)} />
              </Field>
              <Field label="Materia">
                <select style={s.input} value={form.materia} onChange={e => set("materia", e.target.value)}>
                  <option value="">Seleccionar…</option>
                  {MATERIAS.map(m => <option key={m}>{m}</option>)}
                </select>
              </Field>
              <Field label="Fecha">
                <input type="date" style={s.input} value={form.fecha} onChange={e => set("fecha", e.target.value)} />
              </Field>
              <Field label="Etiquetas" span={2}>
                <div style={s.tagRow}>
                  {ETIQUETAS_SUGERIDAS.map(t => (
                    <button key={t} className="tag-pill"
                      onClick={() => toggleTag(t)}
                      style={{ ...s.tagPill, ...(form.etiquetas.includes(t) ? s.tagOn : {}) }}>
                      {t}
                    </button>
                  ))}
                </div>
                <input style={{ ...s.input, marginTop: 10 }}
                  placeholder="Etiqueta personalizada — Enter para agregar"
                  value={etiquetaInput}
                  onChange={e => setEtiquetaInput(e.target.value)}
                  onKeyDown={addCustomTag} />
                {form.etiquetas.length > 0 && (
                  <div style={{ ...s.tagRow, marginTop: 10 }}>
                    {form.etiquetas.map(t => (
                      <span key={t} style={s.tagSelected}>
                        {t}
                        <button onClick={() => toggleTag(t)} style={s.tagDel}>×</button>
                      </span>
                    ))}
                  </div>
                )}
              </Field>
            </div>
          )}

          {/* STEP 1 — Documentación */}
          {step === 1 && (
            <div style={s.grid}>
              <Field label="Objetivo" hint="¿Qué se busca demostrar o aprender?" span={2}>
                <textarea style={{ ...s.input, minHeight: 90 }} rows={4}
                  placeholder="Describe el propósito principal de la práctica..."
                  value={form.objetivo} onChange={e => set("objetivo", e.target.value)} />
              </Field>
              <Field label="Procedimiento" hint="Pasos realizados, componentes, montaje" span={2}>
                <textarea style={{ ...s.input, minHeight: 130 }} rows={6}
                  placeholder="Paso a paso de lo realizado, componentes usados, configuración del sistema..."
                  value={form.descripcion} onChange={e => set("descripcion", e.target.value)} />
              </Field>
              <Field label="Conclusiones" span={2}>
                <textarea style={{ ...s.input, minHeight: 90 }} rows={4}
                  placeholder="¿Los resultados coincidieron con lo esperado? ¿Qué aprendiste?"
                  value={form.conclusion} onChange={e => set("conclusion", e.target.value)} />
              </Field>
            </div>
          )}

          {/* STEP 2 — Mediciones */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={s.medBox}>
                <p style={s.medBoxTitle}>Agregar set de mediciones</p>
                <div style={s.grid}>
                  <Field label="Variable">
                    <input style={s.input} placeholder="ej. Voltaje de salida"
                      value={medTemp.nombre} onChange={e => setMedTemp(m => ({ ...m, nombre: e.target.value }))} />
                  </Field>
                  <Field label="Unidad">
                    <input style={s.input} placeholder="ej. V, PSI, rpm"
                      value={medTemp.unidad} onChange={e => setMedTemp(m => ({ ...m, unidad: e.target.value }))} />
                  </Field>
                  <Field label="Valores separados por coma" span={2}>
                    <input style={s.input} placeholder="ej. 0, 3.2, 6.8, 10.1, 12.4"
                      value={medTemp.valores} onChange={e => setMedTemp(m => ({ ...m, valores: e.target.value }))} />
                  </Field>
                </div>
                <button className="add-med" onClick={addMedicion} style={s.addMed}>
                  + Agregar set
                </button>
              </div>

              {form.mediciones.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <p style={s.medBoxTitle}>Sets registrados — {form.mediciones.length}</p>
                  {form.mediciones.map((m, i) => (
                    <div key={i} style={s.medItem}>
                      <div style={s.medItemHead}>
                        <span style={s.medVar}>{m.nombre}</span>
                        <span style={s.medUnit}>{m.unidad}</span>
                        <span style={s.medCount}>{m.valores.length} lecturas</span>
                        <button className="del-btn" onClick={() => set("mediciones", form.mediciones.filter((_, j) => j !== i))} style={s.delBtn}>✕</button>
                      </div>
                      <div style={s.medChips}>
                        {m.valores.slice(0, 10).map((v, vi) => (
                          <span key={vi} style={s.chip}>{v}</span>
                        ))}
                        {m.valores.length > 10 && <span style={{ ...s.chip, color: "#4a4a60" }}>+{m.valores.length - 10}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={s.emptyBox}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2a2a40" strokeWidth="1.5" strokeLinecap="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                  <p style={{ fontSize: 13, color: "#40405a", marginTop: 8 }}>Sin mediciones aún</p>
                  <p style={{ fontSize: 12, color: "#2a2a3a", textAlign: "center", maxWidth: 240 }}>
                    Agrega sets de datos para visualizarlos como gráficas en la práctica
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={s.footerRow}>
          <button className="nav-prev" disabled={step === 0}
            onClick={() => setStep(s => Math.max(0, s - 1))}
            style={{ ...s.prevBtn, ...(step === 0 ? { opacity: 0.3, cursor: "not-allowed" } : {}) }}>
            ← Anterior
          </button>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{
                height: 4, borderRadius: 99, transition: "all 0.25s",
                width: i === step ? 20 : 6,
                background: i === step ? "#818cf8" : i < step ? "#818cf840" : "#1e1e2c",
              }} />
            ))}
          </div>
          {step < STEPS.length - 1
            ? <button onClick={() => setStep(s => s + 1)} style={s.nextBtn}>Siguiente →</button>
            : <button onClick={handleSave} style={{ ...s.nextBtn, ...(saved ? { background: "#22c55e", boxShadow: "0 0 0 3px #22c55e25" } : {}) }}>
                {saved ? "✓ Guardado" : "Guardar práctica"}
              </button>
          }
        </div>
      </main>
    </div>
  );
}

function Field({ label, hint, children, span, required }) {
  return (
    <div style={{ gridColumn: span === 2 ? "1 / -1" : "span 1", display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <label style={{ fontSize: 12, fontWeight: 500, color: "#8888a0", letterSpacing: "0.005em" }}>
          {label}{required && <span style={{ color: "#818cf8", marginLeft: 2 }}>*</span>}
        </label>
        {hint && <span style={{ fontSize: 11, color: "#3a3a52" }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

const s = {
  root: { display: "flex", minHeight: "100vh", background: "#0c0c10", fontFamily: "'Inter', system-ui, sans-serif", color: "#d8d8e8" },

  // Sidebar
  sidebar: { width: 210, background: "#0e0e14", borderRight: "1px solid #1a1a24", display: "flex", flexDirection: "column", padding: "16px 10px", flexShrink: 0 },
  logoWrap: { display: "flex", alignItems: "center", gap: 9, padding: "6px 8px", marginBottom: 24 },
  logoMark: { width: 26, height: 26, background: "#18182a", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" },
  logoName: { fontSize: 13, fontWeight: 600, color: "#e0e0ec", letterSpacing: "-0.02em" },
  navSection: { marginBottom: 20 },
  navSectionLabel: { fontSize: 10, color: "#3a3a52", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 8px", marginBottom: 4 },
  navItem: { display: "flex", alignItems: "center", gap: 8, padding: "7px 8px", borderRadius: 7, fontSize: 13, color: "#5a5a78", cursor: "pointer", transition: "all 0.12s" },
  navItemActive: { background: "#18182a", color: "#d0d0e8" },
  navItemIcon: { fontSize: 12, width: 14, textAlign: "center", opacity: 0.8 },
  sideFooter: { marginTop: "auto", borderTop: "1px solid #1a1a24", paddingTop: 14 },
  userChip: { display: "flex", alignItems: "center", gap: 9, padding: "6px 8px" },
  userAvatar: { width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, #818cf8, #a78bfa)", flexShrink: 0 },
  userName: { fontSize: 12, fontWeight: 500, color: "#9898b8" },
  userSub: { fontSize: 10, color: "#3a3a52" },

  // Main
  main: { flex: 1, padding: "36px 44px 44px", maxWidth: 720, display: "flex", flexDirection: "column" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 30 },
  breadcrumb: { fontSize: 12, color: "#3a3a52", marginBottom: 5 },
  title: { fontSize: 20, fontWeight: 600, letterSpacing: "-0.025em", color: "#f0f0fa" },
  draftPill: { fontSize: 11, color: "#6a6a88", background: "#18182a", border: "1px solid #22223a", borderRadius: 20, padding: "3px 10px", marginTop: 4 },

  // Steps
  stepsRow: { display: "flex", alignItems: "center", marginBottom: 20 },
  stepBtn: { display: "flex", alignItems: "center", gap: 7, background: "none", border: "none", padding: "4px 0", flex: 1 },
  stepBubble: { width: 22, height: 22, borderRadius: "50%", background: "#18182a", border: "1px solid #22223a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" },
  bubbleActive: { background: "#818cf8", border: "1px solid #818cf8", boxShadow: "0 0 0 3px rgba(129,140,248,0.15)" },
  bubbleDone: { background: "#818cf8", border: "1px solid #818cf8" },
  stepName: { fontSize: 12, color: "#3a3a52", transition: "color 0.2s", whiteSpace: "nowrap" },
  stepNameActive: { color: "#d0d0e8", fontWeight: 500 },
  stepNameDone: { color: "#6a6a88" },

  // Card
  card: { background: "#0e0e14", border: "1px solid #1a1a24", borderRadius: 12, padding: 24, marginBottom: 16, flex: 1 },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  input: { width: "100%", background: "#0c0c10", border: "1px solid #1e1e2c", borderRadius: 8, color: "#d8d8e8", fontSize: 13, padding: "9px 12px", transition: "border-color 0.15s, box-shadow 0.15s" },

  // Tags
  tagRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  tagPill: { background: "transparent", border: "1px solid #1e1e2c", borderRadius: 20, color: "#5a5a78", fontSize: 12, padding: "3px 12px", transition: "all 0.12s" },
  tagOn: { border: "1px solid #818cf860", color: "#c7d2fe", background: "#818cf812" },
  tagSelected: { display: "flex", alignItems: "center", gap: 5, background: "#818cf812", border: "1px solid #818cf840", borderRadius: 20, color: "#c7d2fe", fontSize: 12, padding: "2px 10px" },
  tagDel: { background: "none", border: "none", color: "#818cf870", fontSize: 13, lineHeight: 1, padding: 0 },

  // Mediciones
  medBox: { background: "#0c0c10", border: "1px solid #1a1a24", borderRadius: 10, padding: 18, display: "flex", flexDirection: "column", gap: 14 },
  medBoxTitle: { fontSize: 12, fontWeight: 500, color: "#5a5a78" },
  addMed: { alignSelf: "flex-start", background: "transparent", border: "1px dashed #22223a", borderRadius: 7, color: "#5a5a78", fontSize: 12, padding: "6px 14px", transition: "all 0.15s" },
  medItem: { background: "#0c0c10", border: "1px solid #1a1a24", borderRadius: 8, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 },
  medItemHead: { display: "flex", alignItems: "center", gap: 8 },
  medVar: { fontSize: 13, fontWeight: 500, color: "#d0d0e8", flex: 1 },
  medUnit: { fontSize: 11, color: "#818cf8", background: "#818cf812", borderRadius: 4, padding: "1px 7px" },
  medCount: { fontSize: 11, color: "#3a3a52" },
  delBtn: { background: "none", border: "none", color: "#2a2a3a", fontSize: 12, padding: "2px 4px", transition: "color 0.15s" },
  medChips: { display: "flex", flexWrap: "wrap", gap: 4 },
  chip: { background: "#18182a", borderRadius: 5, color: "#7878a0", fontSize: 11, padding: "2px 8px", fontFamily: "'JetBrains Mono', monospace" },
  emptyBox: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "44px 20px", border: "1px dashed #1a1a24", borderRadius: 10 },

  // Footer
  footerRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  prevBtn: { background: "transparent", border: "1px solid #1e1e2c", borderRadius: 8, color: "#6a6a88", fontSize: 13, padding: "8px 18px", transition: "all 0.15s" },
  nextBtn: { background: "#818cf8", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 500, padding: "8px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.4)", transition: "all 0.15s" },
};
