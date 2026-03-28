import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.1rem 2.5rem",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background: scrolled ? "rgba(10,9,15,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span
          style={{
            width: 8, height: 8,
            borderRadius: "50%",
            background: "var(--accent)",
            display: "inline-block",
            animation: "pulse-dot 2s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "1.15rem",
            letterSpacing: "-0.02em",
            color: "var(--text)",
          }}
        >
          LabBitácora
        </span>
      </div>

      {/* Actions — contextual según estado de sesión */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {user ? (
          /* Usuario con sesión — botón para volver al dashboard */
          <Link
            to="/dashboard"
            className="btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
          >
            ← Ir al Dashboard
          </Link>
        ) : (
          /* Sin sesión — opciones de login/registro */
          <>
            <Link to="/login" className="btn-ghost">
              Iniciar sesión
            </Link>
            <Link to="/register" className="btn-primary">
              Comenzar gratis →
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
