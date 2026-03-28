import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a855f7] opacity-[0.15] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111019] border border-[#1c1a2e] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse"></span>
          <span className="text-xs font-mono text-[#a855f7] tracking-widest uppercase">
            Bitácora de Laboratorio Digital
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6 max-w-4xl"
        >
          Documenta cada práctica con precisión.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-[#8a8aa3] max-w-2xl mb-12"
        >
          Centraliza tus notas, adjunta archivos, genera gráficas en tiempo real y
          mantén un historial organizado de todos tus experimentos en un entorno seguro y rápido.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 bg-[#a855f7] hover:bg-[#9333ea] text-white font-bold rounded-2xl transition-all shadow-[0_4px_30px_rgba(168,85,247,0.3)] hover:shadow-[0_4px_40px_rgba(168,85,247,0.4)] text-lg"
          >
            Comenzar gratis &rarr;
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 bg-[#111019] border border-[#1c1a2e] hover:border-[#a855f7]/50 text-[#e8e6f0] font-semibold rounded-2xl transition-all text-lg"
          >
            Ver características
          </a>
        </motion.div>
      </div>

      {/* Mockup Dashboard Visual */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-20 max-w-6xl mx-auto px-6 relative"
      >
        <div className="relative rounded-2xl overflow-hidden border border-[#1c1a2e] bg-[#111019] shadow-2xl aspect-[16/9] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a090f] via-transparent to-transparent z-10"></div>
          {/* Abstract representation of dashboard */}
          <div className="absolute top-0 w-full h-12 bg-[#0a0a0c] border-b border-[#1a1a1f] flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="w-full h-full pt-16 p-8 flex gap-6 opacity-50">
            <div className="w-64 h-full bg-[#040405] rounded-xl border border-[#1a1a1f] hidden md:block"></div>
            <div className="flex-1 flex flex-col gap-6">
              <div className="h-40 w-full bg-gradient-to-r from-[#1a1a1f] to-[#040405] rounded-xl border border-[#1a1a1f]"></div>
              <div className="flex-1 flex gap-6">
                <div className="flex-1 bg-[#1a1a1f] rounded-xl border border-[#222228]"></div>
                <div className="w-1/3 bg-[#040405] rounded-xl border border-[#1a1a1f]"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
