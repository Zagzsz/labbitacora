import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const pageVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      console.error("Login detail error:", err);
      if (err.response?.status === 429) {
        setError("Demasiados intentos. Por favor, espera un minuto.");
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
      background: "var(--bg-root)",
    }}>
      <motion.div
        variants={pageVariants} initial="hidden" animate="visible"
        style={{
          width: 360, background: "var(--bg-surface)", border: "1px solid var(--border)",
          borderRadius: 12, padding: 32,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 28 }}>
          <div style={{
            width: 30, height: 30, background: "var(--bg-elevated)", borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect width="6" height="6" rx="1.5" fill="#818cf8"/>
              <rect x="8" width="6" height="6" rx="1.5" fill="#818cf840"/>
              <rect y="8" width="6" height="6" rx="1.5" fill="#818cf840"/>
              <rect x="8" y="8" width="6" height="6" rx="1.5" fill="#818cf820"/>
            </svg>
          </div>
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            LabBitácora
          </span>
        </div>

        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>
          Inicia sesión para acceder a tus prácticas
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-muted)", marginBottom: 6, display: "block" }}>
              Usuario
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="tu_usuario"
              autoFocus
            />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-muted)", marginBottom: 6, display: "block" }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p style={{ fontSize: 12, color: "var(--danger)", textAlign: "center" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ marginTop: 4, opacity: loading ? 0.6 : 1, width: "100%", padding: "10px 20px" }}
          >
            {loading ? "Entrando..." : "Iniciar sesión"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
