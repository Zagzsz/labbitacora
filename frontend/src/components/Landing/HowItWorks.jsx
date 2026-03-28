import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Crea tu espacio",
    desc: "Regístrate en segundos y obtén tu propio entorno aislado para documentar prácticas."
  },
  {
    num: "02",
    title: "Anota y adjunta",
    desc: "Usa el potente editor para escribir tus observaciones. Sube fotos o videos directamente desde tu móvil."
  },
  {
    num: "03",
    title: "Analiza los datos",
    desc: "Ingresa tus mediciones y genera gráficas de datos interactivas al instante."
  },
  {
    num: "04",
    title: "Exporta resultados",
    desc: "Genera actas limpias, visualmente profesionales y listas para imprimir en formato documento."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 sm:py-32 bg-[#040405] overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0c]/80 z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-20 items-center justify-between">
          
          {/* Timeline points */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 sm:mb-6 leading-tight">
              ¿Cómo funciona? <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-[#a855f7]">Menos clicks, más ciencia.</span>
            </h2>
            <p className="text-[#8a8aa3] text-base sm:text-lg mb-10 sm:mb-16 max-w-md font-light">
              Un flujo de trabajo optimizado para que te centres en investigar, nosotros nos encargamos del formato.
            </p>
            
            <div className="space-y-8 sm:space-y-12 relative w-full">
              <div className="absolute left-6 top-6 sm:top-8 bottom-6 sm:bottom-8 w-[1px] bg-gradient-to-b from-[#a855f7]/50 via-[#222228] to-transparent z-0"></div>
              
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex gap-4 sm:gap-8 relative z-10 group"
                >
                  <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#0a0a0c] border border-[#a855f7]/30 flex items-center justify-center font-mono font-bold text-[#a855f7] sm:shadow-[0_0_20px_rgba(168,85,247,0.15)] group-hover:bg-[#a855f7] group-hover:text-white transition-all duration-300">
                    {step.num}
                  </div>
                  <div className="pt-1 sm:pt-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 tracking-tight group-hover:text-[#a855f7] transition-colors">{step.title}</h3>
                    <p className="text-[#8a8aa3] leading-relaxed max-w-sm text-sm sm:text-base font-light">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative Terminal/Code Block */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-xl relative rounded-2xl sm:rounded-[32px] bg-[#0a0a0c]/80 backdrop-blur-3xl border border-[#222228] shadow-[0_10px_40px_rgba(0,0,0,0.5)] sm:shadow-[0_20px_80px_rgba(0,0,0,0.8)] p-6 sm:p-8 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/5 to-transparent pointer-events-none"></div>
              <div className="flex gap-2 mb-6 sm:mb-8 items-center border-b border-[#222228] pb-3 sm:pb-4">
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#ff5f56] sm:shadow-[0_0_10px_#ff5f56]"></div>
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#ffbd2e] sm:shadow-[0_0_10px_#ffbd2e]"></div>
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#27c93f] sm:shadow-[0_0_10px_#27c93f]"></div>
                <div className="mx-auto text-[10px] sm:text-xs text-[#8a8aa3] font-mono tracking-widest uppercase">lab_engine.exe</div>
              </div>
              <div className="font-mono text-xs sm:text-[14px] leading-6 sm:leading-9 text-[#a855f7] overflow-x-auto">
                <div className="whitespace-pre">
                  $ <span className="text-white font-semibold flex-wrap">init_lab_session</span> --user current
                  <br />
                  <span className="text-[#8a8aa3]">&gt; Loading encrypted workspace... </span><span className="text-green-400 font-bold">[OK]</span>
                  <br />
                  <br />
                  $ <span className="text-white font-semibold">create_record</span> <span className="text-[#d946ef]">"Síntesis de Aspirina"</span>
                  <br />
                  <span className="text-[#8a8aa3]">&gt; Record ID: #8b3a... created successfully.</span>
                  <br />
                  <br />
                  <span className="text-[#474761]"># Adjuntando evidencia...</span>
                  <br />
                  $ <span className="text-white font-semibold">upload</span> --file <span className="text-blue-400 border-b border-blue-400/30">img.jpg</span>
                  <br />
                  <span className="text-[#8a8aa3]">&gt; Cloudinary sync </span><span className="text-green-400 font-bold">100%</span>
                </div>
                <br />
                <div className="inline-block mt-2 sm:mt-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-xs sm:text-sm whitespace-normal">
                  <span className="text-green-400 font-bold">✔ All systems nominal. Ready to experiment.</span>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
