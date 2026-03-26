import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Register() {
  const [step, setStep] = useState(1); // 1: Info, 2: Verification
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    code: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, verifyEmail } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError("Las contraseñas no coinciden");
    }
    setError("");
    setLoading(true);
    try {
      await register(formData.username, formData.password);
      navigate("/login", { state: { message: "¡Cuenta creada! Ya puedes iniciar sesión." } });
    } catch (err) {
      setError(err.response?.data?.detail || "Error al registrar");
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
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Crear cuenta</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1">Únete a LabBitácora</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-[12px] text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className={labelStyle}>Usuario</label>
            <input
              type="text"
              required
              className={fieldStyle}
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          <div>
            <label className={labelStyle}>Contraseña</label>
            <input
              type="password"
              required
              className={fieldStyle}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div>
            <label className={labelStyle}>Confirmar Contraseña</label>
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
            {loading ? "Registrando..." : "Registrarme"}
          </button>

          <p className="text-center text-[12px] text-[var(--text-muted)] mt-6">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-[var(--accent)] hover:underline">
              Inicia sesión
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
