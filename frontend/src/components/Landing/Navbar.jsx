import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-[#0a090f]/80 backdrop-blur-md border-[#1c1a2e]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            LabBitácora
            <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse"></span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <Link
              to="/dashboard"
              className="text-sm font-semibold text-white bg-[#a855f7] hover:bg-[#9333ea] px-5 py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            >
              Ir al Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-[#e8e6f0] hover:text-white px-4 py-2 transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold text-white bg-[#a855f7] hover:bg-[#9333ea] px-5 py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
