import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[#040405]">
      {/* Background glow & Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1f_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 z-0"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-[#a855f7] opacity-10 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#111019] border border-[#222228] mb-8 lg:mb-10 shadow-lg"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a855f7] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#a855f7]"></span>
          </span>
          <span className="text-xs sm:text-sm font-semibold text-[#e8e6f0] tracking-wide">
            Bitácora de Laboratorio Digital PRO
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#8a8aa3] tracking-tighter leading-tight mb-6 sm:mb-8"
        >
          Documenta con <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-[#d946ef] to-[#a855f7]">absoluta precisión.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl lg:text-2xl text-[#8a8aa3] max-w-2xl lg:max-w-3xl mb-10 sm:mb-14 font-light leading-relaxed px-4"
        >
          Centraliza tus notas, adjunta archivos, genera gráficas en tiempo real y mantén tu ciencia bajo un entorno seguro.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-4 px-4 sm:px-0"
        >
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-white text-black font-extrabold rounded-full transition-transform hover:scale-105 hover:bg-gray-100 shadow-[0_0_30px_rgba(255,255,255,0.2)] text-base sm:text-lg flex items-center justify-center gap-2"
          >
            Comenzar gratis <span className="text-[#a855f7] font-black">&rarr;</span>
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-[#111019] border border-[#222228] hover:border-[#a855f7]/50 text-white font-semibold rounded-full transition-colors text-base sm:text-lg flex items-center justify-center"
          >
            Saber más
          </a>
        </motion.div>
      </div>

      {/* Mockup Dashboard Visual WITH EXPLICIT HEIGHT FALLBACK */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-20 sm:mt-32 max-w-6xl mx-auto px-4 sm:px-6 relative z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#040405] via-transparent to-transparent z-20 pointer-events-none"></div>
        {/* Explicit min-height ensures it never collapses to 0 height */}
        <div className="relative rounded-2xl sm:rounded-[32px] overflow-hidden border border-[#222228] bg-[#0a0a0c] shadow-2xl w-full aspect-video min-h-[300px] md:min-h-[500px] flex flex-col ring-1 ring-white/5 mx-auto">
          {/* Dashboard Header Title Bar */}
          <div className="w-full h-10 sm:h-14 bg-[#111019] border-b border-[#222228] flex items-center px-4 sm:px-6 shrink-0">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 px-3 py-1 rounded-md bg-[#040405] border border-[#222228] text-[10px] sm:text-xs text-[#8a8aa3] font-mono flex items-center gap-2 truncate max-w-[150px] sm:max-w-xs">
              <span className="text-[#a855f7]">🔒</span> www.labbitacora.app
            </div>
          </div>
          {/* Dashboard Body Structure */}
          <div className="flex-1 flex w-full p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 lg:gap-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnPgo8cmVjdCB3aWR0aD0nOCcgaGVpZ2h0PSc4JyBmaWxsPScjMGEwYTBjJz48L3JlY3Q+CjxwYXRoIGQ9J00wIDBMOCA4Wk04IDBMMCA4Wicgc3Ryb2tlPScjMTExMDE5JyBzdHJva2Utd2lkdGg9JzEnPjwvcGF0aD4KPC9zdmc+')] bg-repeat">
            {/* Sidebar */}
            <div className="w-16 sm:w-48 lg:w-64 h-full bg-[#111019] rounded-xl sm:rounded-2xl border border-[#222228] flex flex-col p-2 sm:p-4 gap-2 sm:gap-4 shrink-0 shadow-lg">
              <div className="w-full h-8 sm:h-10 bg-[#222228] rounded-md sm:rounded-lg"></div>
              <div className="w-full sm:w-3/4 h-8 sm:h-10 bg-[#222228]/50 rounded-md sm:rounded-lg hidden sm:block"></div>
              <div className="w-full sm:w-5/6 h-8 sm:h-10 bg-[#222228]/50 rounded-md sm:rounded-lg hidden sm:block"></div>
            </div>
            {/* Main Area Area */}
            <div className="flex-1 flex flex-col gap-4 sm:gap-6 lg:gap-8 min-w-0">
              {/* Header Box */}
              <div className="h-24 sm:h-32 lg:h-48 w-full bg-gradient-to-br from-[#111019] to-[#040405] rounded-xl sm:rounded-2xl border border-[#222228] p-4 sm:p-8 relative overflow-hidden shadow-lg">
                 <div className="w-32 h-32 sm:w-64 sm:h-64 bg-[#a855f7]/20 blur-[40px] sm:blur-[60px] absolute -top-10 -right-10 rounded-full"></div>
                 <div className="w-3/4 sm:w-1/2 h-4 sm:h-6 lg:h-8 bg-white/10 rounded overflow-hidden mb-2 sm:mb-4"></div>
                 <div className="w-1/2 sm:w-1/3 h-4 sm:h-6 bg-white/5 rounded overflow-hidden"></div>
              </div>
              {/* Content Grid */}
              <div className="flex-1 flex gap-4 sm:gap-6 lg:gap-8 min-h-0">
                <div className="flex-1 bg-[#111019] rounded-xl sm:rounded-2xl border border-[#222228] relative overflow-hidden flex items-end p-2 sm:p-4 lg:p-6 shadow-lg">
                   {/* Fake bars */}
                   <div className="w-full flex items-end gap-1 sm:gap-2 h-full opacity-40">
                      <div className="flex-1 bg-[#a855f7] rounded-t-sm h-[30%]"></div>
                      <div className="flex-1 bg-[#d946ef] rounded-t-sm h-[60%]"></div>
                      <div className="flex-1 bg-blue-500 rounded-t-sm h-[40%]"></div>
                      <div className="flex-1 bg-[#a855f7] rounded-t-sm h-[80%]"></div>
                      <div className="flex-1 bg-indigo-500 rounded-t-sm h-[50%]"></div>
                   </div>
                </div>
                <div className="w-1/4 sm:w-1/3 bg-[#111019] rounded-xl sm:rounded-2xl border border-[#222228] shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
