import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-32 bg-[#040405] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] to-transparent z-0"></div>
      
      {/* Decorative gradient sphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#a855f7] opacity-[0.08] blur-[100px] rounded-full pointer-events-none z-0"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6 relative z-10 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
          Tu bitácora, siempre contigo.
        </h2>
        <p className="text-xl text-[#8a8aa3] mb-12 max-w-2xl mx-auto">
          Regístrate gratis y empieza a documentar tus prácticas de laboratorio hoy mismo, de forma profesional y segura.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto px-10 py-5 bg-[#a855f7] hover:bg-[#9333ea] text-black font-bold rounded-2xl transition-all shadow-[0_4px_30px_rgba(168,85,247,0.3)] hover:shadow-[0_4px_40px_rgba(168,85,247,0.4)] text-[17px]"
          >
            Crear cuenta gratis &rarr;
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-10 py-5 bg-[#111019] border border-[#1c1a2e] hover:border-[#a855f7]/50 text-[#e8e6f0] font-semibold rounded-2xl transition-all text-[17px]"
          >
            Iniciar sesión
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
