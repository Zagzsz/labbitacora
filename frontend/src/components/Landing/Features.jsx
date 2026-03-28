import { motion } from "framer-motion";

export default function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-[#040405] relative overflow-hidden text-white">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full max-w-[800px] h-[800px] bg-[#a855f7]/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen opacity-50 z-0"></div>
      <div className="absolute bottom-0 left-0 w-full max-w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-50 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111019] border border-[#1c1a2e] mb-6 shadow-xl"
          >
            <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse"></span>
            <span className="text-[10px] sm:text-xs font-mono text-[#a855f7] tracking-widest uppercase font-semibold">
              Arquitectura de Siguiente Nivel
            </span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-tight">
            Todo lo que necesitas, <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#d946ef]">sin el desorden.</span>
          </h2>
          <p className="text-[#8a8aa3] text-lg sm:text-xl font-light px-2 sm:px-4">
            Sustituimos las libretas físicas y los Excels oxidados por un ecosistema diseñado para potenciar tu ciencia.
          </p>
        </div>

        {/* Bento Grid Layout FIXED */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 auto-rows-min">
          
          {/* Card 1: Large Bento */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 rounded-2xl sm:rounded-[32px] bg-gradient-to-br from-[#111019] to-[#0a0a0c] border border-[#1c1a2e] p-6 sm:p-10 relative overflow-hidden group hover:border-[#a855f7]/40 transition-all duration-500 shadow-xl min-h-[300px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#a855f7]/10 flex items-center justify-center text-2xl sm:text-3xl shadow-inner border border-[#a855f7]/20">📝</div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 tracking-tight">CRUD de Prácticas Pro</h3>
                <p className="text-[#8a8aa3] text-base sm:text-lg max-w-md">El motor principal. Crea protocolos asombrosos con un editor optimizado que te permite organizar tus observaciones y tablas de datos en segundos.</p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Tall Bento */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="md:col-span-1 lg:row-span-2 rounded-2xl sm:rounded-[32px] bg-[#111019] border border-[#1c1a2e] p-6 sm:p-10 relative overflow-hidden group hover:border-[#a855f7]/40 transition-all duration-500 shadow-xl min-h-[400px] flex flex-col"
          >
            <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700"></div>
            <div className="relative z-10 flex flex-col h-full shrink-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#040405] flex items-center justify-center text-2xl sm:text-3xl mb-6 sm:mb-8 border border-[#222228] shadow-lg">📊</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 tracking-tight">Telemetría y Gráficas</h3>
              <p className="text-[#8a8aa3] text-base sm:text-lg mb-6 sm:mb-8">Tus mediciones toman vida. Integra Recharts de alto rendimiento para visualizar tendencias en tus sistemas.</p>
              
              <div className="mt-auto bg-[#040405] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#1a1a1f] h-24 sm:h-32 relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#a855f7]/20 to-transparent opacity-50"></div>
                {/* Simulated Chart Bars */}
                <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-between px-2 sm:px-4 gap-1 sm:gap-2 pb-2 sm:pb-4 pointer-events-none">
                  <motion.div initial={{height:"20%"}} whileInView={{height:"60%"}} transition={{duration:1, delay:0.2}} className="w-full bg-[#a855f7] rounded-sm opacity-80" />
                  <motion.div initial={{height:"20%"}} whileInView={{height:"80%"}} transition={{duration:1, delay:0.3}} className="w-full bg-[#d946ef] rounded-sm opacity-90" />
                  <motion.div initial={{height:"20%"}} whileInView={{height:"40%"}} transition={{duration:1, delay:0.4}} className="w-full bg-blue-500 rounded-sm opacity-80" />
                  <motion.div initial={{height:"20%"}} whileInView={{height:"100%"}} transition={{duration:1, delay:0.5}} className="w-full bg-[#a855f7] rounded-sm shadow-[0_0_15px_#a855f7]" />
                  <motion.div initial={{height:"20%"}} whileInView={{height:"50%"}} transition={{duration:1, delay:0.6}} className="w-full bg-indigo-500 rounded-sm opacity-60" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Standard Bento */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2, duration: 0.5 }}
             className="md:col-span-1 rounded-2xl sm:rounded-[32px] bg-[#111019] border border-[#1c1a2e] p-6 sm:p-8 group hover:border-[#a855f7]/30 transition-all duration-500 flex flex-col justify-between min-h-[220px]"
          >
             <div className="flex justify-between items-start mb-4">
               <h3 className="text-lg sm:text-xl font-bold tracking-tight">Cloud Evidence</h3>
               <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sm sm:text-lg shadow-inner">☁️</div>
             </div>
             <p className="text-[#8a8aa3] text-sm sm:text-base leading-relaxed">Soporte mediante Cloudinary. Arrastra fotografías microscópicas directamente a tus bitácoras.</p>
          </motion.div>

          {/* Card 4: Standard Bento */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3, duration: 0.5 }}
             className="md:col-span-1 rounded-2xl sm:rounded-[32px] bg-[#111019] border border-[#1c1a2e] p-6 sm:p-8 group hover:border-[#a855f7]/30 transition-all duration-500 flex flex-col justify-between min-h-[220px]"
          >
             <div className="flex justify-between items-start mb-4">
               <h3 className="text-lg sm:text-xl font-bold tracking-tight">Arquitectura Segura</h3>
               <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sm sm:text-lg shadow-inner">🔐</div>
             </div>
             <p className="text-[#8a8aa3] text-sm sm:text-base leading-relaxed">Validación por JWT de doble capa. Nadie altera tu ciencia. Tus documentos permanecen bajo acceso estricto.</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
