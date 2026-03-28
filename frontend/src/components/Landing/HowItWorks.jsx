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
    <section className="py-32 bg-[#040405] overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0c]/80 z-0"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Timeline points */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              ¿Cómo funciona? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-[#a855f7]">Menos clicks, más ciencia.</span>
            </h2>
            <p className="text-[#8a8aa3] text-lg mb-16 max-w-md font-light">
              Un flujo de trabajo optimizado para que te centres puramente en investigar, nosotros nos encargamos del formato y validación.
            </p>
            
            <div className="space-y-12 relative">
              <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#a855f7]/50 via-[#222228] to-transparent z-0"></div>
              
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex gap-8 relative z-10 group"
                >
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#0a0a0c] border border-[#a855f7]/30 flex items-center justify-center font-mono font-bold text-[#a855f7] shadow-[0_0_20px_rgba(168,85,247,0.15)] group-hover:scale-110 group-hover:bg-[#a855f7] group-hover:text-white transition-all duration-300">
                    {step.num}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-[#a855f7] transition-colors">{step.title}</h3>
                    <p className="text-[#8a8aa3] leading-relaxed max-w-sm text-lg font-light">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative Terminal/Code Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full relative rounded-[32px] bg-[#0a0a0c]/80 backdrop-blur-3xl border border-[#222228] shadow-[0_20px_80px_rgba(0,0,0,0.8)] p-8 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/5 to-transparent pointer-events-none"></div>
            <div className="flex gap-2 mb-8 items-center border-b border-[#222228] pb-4">
              <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] shadow-[0_0_10px_#ff5f56]"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-[0_0_10px_#ffbd2e]"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] shadow-[0_0_10px_#27c93f]"></div>
              <div className="mx-auto text-xs text-[#8a8aa3] font-mono tracking-widest uppercase">lab_engine.exe</div>
            </div>
            <div className="font-mono text-[15px] leading-9 text-[#a855f7]">
              $ <span className="text-white font-semibold">init_lab_session</span> --user current
              <br />
              <span className="text-[#8a8aa3]">&gt; Loading encrypted workspace... </span><span className="text-green-400 font-bold">[OK]</span>
              <br />
              <br />
              $ <span className="text-white font-semibold">create_record</span> <span className="text-[#d946ef]">"Síntesis de Aspirina"</span>
              <br />
              <span className="text-[#8a8aa3]">&gt; Record ID: #8b3a... created successfully.</span>
              <br />
              <br />
              <span className="text-[#474761]"># Adjuntando evidencia fotográfica...</span>
              <br />
              $ <span className="text-white font-semibold">upload</span> --file <span className="text-blue-400 border-b border-blue-400/30">img_reactivo.jpg</span>
              <br />
              <span className="text-[#8a8aa3]">&gt; Cloudinary sync </span><span className="text-green-400 font-bold">100%</span>
              <br />
              <br />
              <div className="inline-block mt-4 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                <span className="text-green-400 font-bold">✔ All systems nominal. Ready to experiment.</span>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
