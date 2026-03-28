import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-40 bg-[#040405] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent z-0"></div>
      
      {/* Decorative gradient sphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#a855f7] opacity-[0.1] blur-[100px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto px-6 relative z-10 text-center"
      >
        <h2 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-[#8a8aa3] tracking-tighter mb-8">
          Tu bitácora, <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#a855f7]">siempre contigo.</span>
        </h2>
        <p className="text-xl md:text-2xl text-[#8a8aa3] font-light mb-14 max-w-2xl mx-auto leading-relaxed">
          Regístrate gratis y empieza a documentar tus prácticas de laboratorio hoy mismo, de forma profesional, rápida y segura.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/register"
            className="w-full sm:w-auto px-12 py-5 bg-white text-black font-extrabold rounded-full transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)] text-lg"
          >
            Crear cuenta gratis &rarr;
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-12 py-5 bg-[#111019]/80 backdrop-blur-md border border-[#222228] hover:border-[#a855f7]/50 hover:bg-[#1a1a1f] text-white font-semibold rounded-full transition-all text-lg shadow-xl"
          >
            Iniciar sesión
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
