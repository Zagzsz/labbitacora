import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 overflow-hidden bg-[#040405]">
      {/* Background glow & Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1f_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#a855f7] opacity-[0.15] blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-[#111019] to-[#0a0a0c] border border-[#222228] mb-10 shadow-[0_0_20px_rgba(168,85,247,0.15)] ring-1 ring-white/5"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a855f7] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#a855f7]"></span>
          </span>
          <span className="text-sm font-semibold text-[#e8e6f0] tracking-wide">
            Bitácora de Laboratorio Digital PRO
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#8a8aa3] tracking-tighter leading-[1.1] mb-8 max-w-5xl"
        >
          Documenta con <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-[#d946ef] to-[#a855f7] animate-gradient-x">absoluta precisión.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-[#8a8aa3] max-w-3xl mb-14 font-light leading-relaxed"
        >
          Centraliza tus notas, adjunta archivos, genera gráficas en tiempo real y mantén el mundo de la ciencia bajo tu propio dominio cifrado.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link
            to="/register"
            className="w-full sm:w-auto px-10 py-5 bg-white text-black font-extrabold rounded-full transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)] text-lg flex items-center justify-center gap-2"
          >
            Comenzar gratis <span className="text-[#a855f7]">&rarr;</span>
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto px-10 py-5 bg-[#111019]/80 backdrop-blur-md border border-[#222228] hover:border-[#a855f7]/50 hover:bg-[#1a1a1f] text-white font-semibold rounded-full transition-all text-lg shadow-xl"
          >
            Saber más
          </a>
        </motion.div>
      </div>

      {/* Extreme Glassmorphism Mockup Dashboard Visual */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-32 max-w-[1200px] mx-auto px-6 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#040405] via-transparent to-transparent z-20 pointer-events-none"></div>
        <div className="relative rounded-[40px] overflow-hidden border border-[#222228] bg-[#0a0a0c]/80 backdrop-blur-2xl shadow-[0_0_80px_rgba(168,85,247,0.15)] aspect-[16/9] flex items-center justify-center ring-1 ring-white/10 transform perspective-[2000px] rotateX-[5deg] scale-[1.02]">
          {/* Abstract representation of dashboard */}
          <div className="absolute top-0 w-full h-14 bg-[#111019]/60 backdrop-blur-md border-b border-[#222228] flex items-center px-6 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            <div className="ml-4 px-4 py-1.5 rounded-full bg-[#040405] border border-[#222228] text-xs text-[#8a8aa3] font-mono flex items-center gap-2">
              <span className="text-[#a855f7]">🔒</span> app.labbitacora.com
            </div>
          </div>
          <div className="w-full h-full pt-20 p-8 flex gap-8">
            <div className="w-72 h-full bg-[#111019]/40 rounded-3xl border border-[#222228] hidden md:block p-6 space-y-4">
              <div className="w-full h-10 bg-[#222228]/50 rounded-xl"></div>
              <div className="w-3/4 h-10 bg-[#222228]/30 rounded-xl"></div>
              <div className="w-5/6 h-10 bg-[#222228]/30 rounded-xl"></div>
            </div>
            <div className="flex-1 flex flex-col gap-8">
              <div className="h-48 w-full bg-gradient-to-br from-[#111019] to-[#040405] rounded-[32px] border border-[#222228] p-8 relative overflow-hidden">
                 <div className="w-64 h-64 bg-[#a855f7]/20 blur-[60px] absolute -top-10 -right-10 rounded-full"></div>
                 <div className="w-1/2 h-8 bg-white/10 rounded-lg mb-4"></div>
                 <div className="w-1/3 h-6 bg-white/5 rounded-lg"></div>
              </div>
              <div className="flex-1 flex gap-8">
                <div className="flex-1 bg-[#111019]/40 rounded-[32px] border border-[#222228] relative overflow-hidden p-6">
                  {/* Fake UI elements inside */}
                  <div className="absolute bottom-0 w-full flex items-end gap-3 p-6 opacity-30">
                     <div className="w-full h-12 bg-[#a855f7] rounded-md"></div>
                     <div className="w-full h-24 bg-[#d946ef] rounded-md"></div>
                     <div className="w-full h-16 bg-[#a855f7] rounded-md"></div>
                  </div>
                </div>
                <div className="w-1/3 bg-[#111019]/40 rounded-[32px] border border-[#222228]"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
