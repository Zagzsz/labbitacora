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
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "radial-gradient(circle at center, #111115 0%, #040405 100%)",
      padding: "20px"
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[500px] bg-[#0a0a0c] border border-[#1a1a1f] rounded-[24px] p-12 shadow-2xl"
      >
        {/* Logo superior discreto */}
        <div className="absolute top-8 left-8 flex items-center gap-2 opacity-80">
          <span className="text-[15px] font-bold text-[#a855f7] tracking-tight">LabBitácora</span>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Crear cuenta</h1>
          <p className="text-[14px] text-[#8a8aa3]">Únete a LabBitácora</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-[12px] text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-[#a855f7] tracking-widest uppercase ml-1">Usuario</label>
            <input
              type="text"
              required
              placeholder="Ingresa tu usuario"
              className="w-full bg-black border border-[#1a1a1f] rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none transition-all placeholder:text-[#333]"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-[#a855f7] tracking-widest uppercase ml-1">Contraseña</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-black border border-[#1a1a1f] rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none transition-all placeholder:text-[#333]"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-[#a855f7] tracking-widest uppercase ml-1">Confirmar Contraseña</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-black border border-[#1a1a1f] rounded-xl px-4 py-3 text-white focus:border-[#a855f7] outline-none transition-all placeholder:text-[#333]"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#a855f7] hover:bg-[#9333ea] text-black font-semibold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)] active:scale-[0.98] disabled:opacity-50 mt-2"
          >
            {loading ? "Registrando..." : "Registrarme"}
          </button>
        </form>

        <div className="mt-10 text-center text-[13px] text-[#8a8aa3]">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-[#a855f7] hover:underline font-medium">
            Inicia sesión
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
