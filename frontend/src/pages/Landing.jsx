import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./landing.css";
import Navbar from "../components/Landing/Navbar";
import Hero from "../components/Landing/Hero";
import Features from "../components/Landing/Features";
import HowItWorks from "../components/Landing/HowItWorks";
import CTA from "../components/Landing/CTA";
import Footer from "../components/Landing/Footer";

export default function Landing() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Solo redirigir al dashboard si viene desde "/" (raíz) y ya tiene sesión.
  // Si viene desde "/landing" (clic en el logo del sidebar), mostrar la landing normalmente.
  const isRootPath = location.pathname === "/";

  useEffect(() => {
    if (!loading && user && isRootPath) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate, isRootPath]);

  // Mostrar cargando solo si está validando en la ruta raíz (evitar destello)
  if (loading || (user && isRootPath)) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg-root)",
          color: "var(--text-muted)",
          fontSize: 13,
        }}
      >
        Cargando interfaz...
      </div>
    );
  }

  return (
    <div className="landing-wrapper">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}
