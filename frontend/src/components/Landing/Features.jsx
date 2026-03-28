export default function Features() {
  return (
    <section id="features" className="py-32 bg-[#040405] relative overflow-hidden text-white">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#a855f7]/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111019] border border-[#1c1a2e] mb-6 shadow-xl"
          >
            <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse"></span>
            <span className="text-xs font-mono text-[#a855f7] tracking-widest uppercase font-semibold">
              Arquitectura de Siguiente Nivel
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Todo lo que necesitas, <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#d946ef]">sin el desorden.</span>
          </h2>
          <p className="text-[#8a8aa3] text-xl font-light">
            Sustituimos las libretas físicas y los Excels oxidados por un ecosistema diseñado para potenciar tu ciencia.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          
          {/* Card 1: Large Bento (Col Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 row-span-1 rounded-[32px] bg-gradient-to-br from-[#111019] to-[#0a0a0c] border border-[#1c1a2e] p-10 relative overflow-hidden group hover:border-[#a855f7]/40 transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="w-14 h-14 rounded-2xl bg-[#a855f7]/10 flex items-center justify-center text-3xl mb-6 shadow-inner border border-[#a855f7]/20">📝</div>
              <div>
                <h3 className="text-3xl font-bold mb-3 tracking-tight">CRUD de Prácticas Pro</h3>
                <p className="text-[#8a8aa3] text-lg max-w-md">El motor principal. Crea protocolos asombrosos con un editor optimizado que te permite organizar tus observaciones y tablas de datos en segundos.</p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Tall Bento (Row Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="md:col-span-1 md:row-span-2 rounded-[32px] bg-[#111019] border border-[#1c1a2e] p-10 relative overflow-hidden group hover:border-[#a855f7]/40 transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-[#040405] flex items-center justify-center text-3xl mb-8 border border-[#222228] shadow-lg">📊</div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Telemetría y Gráficas</h3>
              <p className="text-[#8a8aa3] text-lg mb-8">Tus mediciones toman vida. Integra Recharts de alto rendimiento para visualizar al momento tendencias, regresiones o resultados atípicos de tus sistemas.</p>
              
              <div className="mt-auto bg-[#040405] rounded-2xl p-4 border border-[#1a1a1f] h-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#a855f7]/20 to-transparent opacity-50"></div>
                {/* Simulated Chart Bars */}
                <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-between px-4 gap-2 pb-4">
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
             className="md:col-span-1 row-span-1 rounded-[32px] bg-[#111019] border border-[#1c1a2e] p-8 group hover:border-[#a855f7]/30 transition-all duration-500 flex flex-col justify-between"
          >
             <div className="flex justify-between items-start mb-4">
               <h3 className="text-xl font-bold tracking-tight">Cloud Evidence</h3>
               <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg shadow-inner">☁️</div>
             </div>
             <p className="text-[#8a8aa3] leading-relaxed">Soporte robusto mediante Cloudinary. Arrastra fotografías microscópicas o planos en PDF directamente a tus bitácoras.</p>
          </motion.div>

          {/* Card 4: Standard Bento */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3, duration: 0.5 }}
             className="md:col-span-1 row-span-1 rounded-[32px] bg-[#111019] border border-[#1c1a2e] p-8 group hover:border-[#a855f7]/30 transition-all duration-500 flex flex-col justify-between"
          >
             <div className="flex justify-between items-start mb-4">
               <h3 className="text-xl font-bold tracking-tight">Arquitectura Segura</h3>
               <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg shadow-inner">🔐</div>
             </div>
             <p className="text-[#8a8aa3] leading-relaxed">Validación por JWT de doble capa. Nadie altera tu ciencia. Tus documentos permanecen bajo acceso estricto.</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
