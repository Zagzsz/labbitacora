import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-24 sm:py-32 md:py-40 bg-[#040405] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent z-0"></div>
      
      {/* Decorative gradient sphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-[#a855f7] opacity-[0.1] blur-[100px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-10 md:top-20 left-4 md:left-10 w-full max-w-[300px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-[#8a8aa3] tracking-tighter mb-6 sm:mb-8 leading-tight">
          Tu bitácora, <br className="hidden sm:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#a855f7]">siempre contigo.</span>
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-[#8a8aa3] font-light mb-10 sm:mb-14 max-w-2xl mx-auto leading-relaxed px-4">
          Regístrate gratis y empieza a documentar tus prácticas de laboratorio hoy mismo de forma rápida y segura.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-white text-black font-extrabold rounded-full transition-transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)] text-base sm:text-lg flex justify-center items-center gap-2"
          >
            Crear cuenta gratis <span className="text-[#a855f7]">&rarr;</span>
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-[#111019]/80 backdrop-blur-md border border-[#222228] hover:border-[#a855f7]/50 hover:bg-[#1a1a1f] text-white font-semibold rounded-full transition-colors text-base sm:text-lg shadow-xl flex justify-center items-center"
          >
            Iniciar sesión
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
