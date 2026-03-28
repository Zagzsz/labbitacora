import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0c] border-t border-[#1a1a1f] py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            LabBitácora
            <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]"></span>
          </span>
        </div>

        <div className="text-[#8a8aa3] text-sm hidden md:block">
          La bitácora de laboratorio digital para investigadores modernos.
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-[#6b6880] hover:text-[#a855f7] text-sm font-medium transition-colors">
            Términos
          </a>
          <a href="#" className="text-[#6b6880] hover:text-[#a855f7] text-sm font-medium transition-colors">
            Privacidad
          </a>
          <Link to="/login" className="text-[#6b6880] hover:text-[#a855f7] text-sm font-medium transition-colors">
            Acceder
          </Link>
        </div>
      </div>
      
      <div className="text-center mt-12 text-[#474761] text-sm">
        &copy; {new Date().getFullYear()} www.labbitacora.app. Todos los derechos reservados.
      </div>
    </footer>
  );
}
