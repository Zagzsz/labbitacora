import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: Code + New Pass
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleRequest = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await forgotPassword(formData.email);
      setStep(2);
      setMessage("Código enviado. Revisa tu correo.");
    } catch (err) {
      setError(err.response?.data?.detail || "Error al solicitar código");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return setError("Las contraseñas no coinciden");
    }
    setError("");
    setLoading(true);
    try {
      await resetPassword(formData.email, formData.code, formData.newPassword);
      navigate("/login", { state: { message: "Contraseña actualizada correctamente." } });
    } catch (err) {
      setError(err.response?.data?.detail || "Código inválido o error");
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle = "w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-body)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-ring)] outline-none transition-all";
  const labelStyle = "block text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1 font-medium";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-root)]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[var(--bg-surface)] p-8 rounded-xl border border-[var(--border)] shadow-2xl"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Recuperar contraseña</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1">
            {step === 1 ? "Te enviaremos un código de seguridad" : "Ingresa el código y tu nueva contraseña"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-[12px] text-center">
            {error}
          </div>
        )}
        
        {message && (
          <div className="mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-[12px] text-center">
            {message}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form 
              key="step1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onSubmit={handleRequest} 
              className="space-y-6"
            >
              <div>
                <label className={labelStyle}>Correo Electrónico</label>
                <input
                  type="email"
                  required
                  className={fieldStyle}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tu@correo.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--accent)] hover:bg-[#717cf0] text-white py-2.5 rounded-lg text-[13px] font-medium transition-colors shadow-lg active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Enviar código"}
              </button>

              <p className="text-center text-[12px] text-[var(--text-muted)]">
                <Link to="/login" className="text-[var(--accent)] hover:underline">
                  ← Volver al inicio de sesión
                </Link>
              </p>
            </motion.form>
          ) : (
            <motion.form 
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onSubmit={handleReset} 
              className="space-y-4"
            >
              <div>
                <label className={labelStyle}>Código de Verificación</label>
                <input
                  type="text"
                  maxLength="6"
                  required
                  className={`${fieldStyle} text-center tracking-[8px] font-mono`}
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
              </div>
              <div>
                <label className={labelStyle}>Nueva Contraseña</label>
                <input
                  type="password"
                  required
                  className={fieldStyle}
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                />
              </div>
              <div>
                <label className={labelStyle}>Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  required
                  className={fieldStyle}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--accent)] hover:bg-[#717cf0] text-white py-2.5 rounded-lg text-[13px] font-medium transition-colors shadow-lg active:scale-[0.98] disabled:opacity-50 mt-4"
              >
                {loading ? "Restableciendo..." : "Restablecer contraseña"}
              </button>

              <button
                type="button"
                className="w-full text-[12px] text-[var(--text-muted)] hover:text-[var(--text-body)] transition-colors"
                onClick={() => setStep(1)}
              >
                ← Usar otro correo
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
