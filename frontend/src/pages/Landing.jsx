import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Landing/Navbar";
import Hero from "../components/Landing/Hero";
import Features from "../components/Landing/Features";
import HowItWorks from "../components/Landing/HowItWorks";
import CTA from "../components/Landing/CTA";
import Footer from "../components/Landing/Footer";

export default function Landing() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Si ya hay sesión iniciada, redirigir al dashboard como pidió el usuario.
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

  // Mostrar un pequeño indicador de carga si está validando,
  // y también evitar renderizar la landing si va a redirigirlo (para evitar destello)
  if (loading || user) {
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

  // Si no está logueado y ya se validó que no lo está, mostrar la Landing:
  return (
    <div className="min-h-screen bg-[#040405] text-[#e8e6f0] font-sans overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}
