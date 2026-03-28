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
    <section className="py-24 bg-[#040405] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Timeline points */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-[#8a8aa3] text-lg mb-12 max-w-md">
              Un flujo de trabajo optimizado para que te centres en la ciencia, no en dar formato a documentos.
            </p>
            
            <div className="space-y-10 relative">
              <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-[#1a1a1f] z-0"></div>
              
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex gap-6 relative z-10"
                >
                  <div className="shrink-0 w-12 h-12 rounded-full bg-[#111019] border-2 border-[#1c1a2e] flex items-center justify-center font-mono font-bold text-[#a855f7] shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                    {step.num}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-[#8a8aa3] leading-relaxed max-w-sm">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative Terminal/Code Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full relative rounded-2xl bg-[#111019] border border-[#1c1a2e] shadow-2xl p-6"
          >
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="font-mono text-sm leading-8 text-[#a855f7]">
              $ <span className="text-[#e8e6f0]">init_lab_session</span> --user current
              <br />
              &gt; Loading encrypted workspace... <span className="text-green-400">[OK]</span>
              <br />
              <br />
              $ <span className="text-[#e8e6f0]">create_record</span> "Síntesis de Aspirina"
              <br />
              &gt; Record ID: #8b3a... created successfully.
              <br />
              <br />
              <span className="text-[#8a8aa3]"># Adjuntando evidencia fotográfica...</span>
              <br />
              $ <span className="text-[#e8e6f0]">upload --file</span> img_reactivo.jpg
              <br />
              &gt; Cloudinary sync <span className="text-green-400">100%</span>
              <br />
              <br />
              <span className="text-[#a855f7]">✔ All systems nominal. Ready to experiment.</span>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
