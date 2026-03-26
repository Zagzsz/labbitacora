import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const pageVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      console.error("Login detail error:", err);
      if (err.response?.status === 429) {
        setError("Demasiados intentos. Por favor, espera un minuto.");
      } else if (err.response?.status === 403) {
        setError(err.response.data.detail || "Cuenta desactivada.");
      } else if (err.response?.status === 401) {
        setError("Usuario o contraseña incorrectos");
      } else {
        setError(`Error de conexión: ${err.message || "Servidor no alcanzable"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "radial-gradient(circle at center, #111115 0%, #040405 100%)",
      padding: "20px", position: "relative"
    }}>
      {/* Logo en la esquina superior izquierda de la PANTALLA */}
      <div className="absolute top-8 left-8 flex items-center gap-2 opacity-80 pointer-events-none">
        <span className="text-[16px] font-bold text-[#a855f7] tracking-tight">LabBitácora</span>
      </div>

      <motion.div
        variants={pageVariants} initial="hidden" animate="visible"
        className="w-full max-w-[440px] bg-[#0a0a0c] border border-[#1a1a1f] rounded-[32px] p-12 md:p-14 shadow-2xl"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-3">Iniciar sesión</h1>
          <p className="text-[14px] text-[#8a8aa3]">Bienvenido de nuevo</p>
        </div>

        {success && (
          <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-[12px] text-center font-medium">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[12px] text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="space-y-3">
            <label className="text-[11px] font-bold text-[#a855f7] tracking-[0.2em] uppercase ml-1 opacity-70">
              Usuario
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tu nombre de usuario"
              className="w-full bg-black border border-[#1a1a1f] rounded-2xl px-5 py-4 text-[15px] text-white focus:border-[#a855f7] outline-none transition-all placeholder:text-[#333]"
              autoFocus
            />
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-bold text-[#a855f7] tracking-[0.2em] uppercase ml-1 opacity-70">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black border border-[#1a1a1f] rounded-2xl px-5 py-4 text-[15px] text-white focus:border-[#a855f7] outline-none transition-all placeholder:text-[#333]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#a855f7] hover:bg-[#9333ea] text-black font-bold py-4 rounded-2xl transition-all shadow-[0_4px_20px_rgba(168,85,247,0.15)] active:scale-[0.98] disabled:opacity-50 mt-4 text-[15px]"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <div className="mt-12 text-center text-[13px] text-[#8a8aa3]">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-[#a855f7] hover:underline font-semibold">
            Regístrate aquí
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
