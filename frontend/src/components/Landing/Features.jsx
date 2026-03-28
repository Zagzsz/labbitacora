import { motion } from "framer-motion";

const features = [
  {
    title: "CRUD de Prácticas",
    description: "Crea, lee, actualiza y elimina tus registros de laboratorio de manera intuitiva y rápida.",
    icon: "📝"
  },
  {
    title: "Archivos Adjuntos",
    description: "Soporte para imágenes, videos y documentos mediante integración segura con Cloudinary.",
    icon: "☁️"
  },
  {
    title: "Gráficas de Datos",
    description: "Visualiza tus resultados con gráficas interactivas generadas mediante Recharts en tiempo real.",
    icon: "📊"
  },
  {
    title: "Autenticación Segura",
    description: "Protege tus investigaciones con un sistema de usuarios independiente validado por JWT.",
    icon: "🔐"
  },
  {
    title: "Mobile-First",
    description: "Anota tus observaciones desde cualquier dispositivo: móvil, tablet o PC con un diseño responsivo.",
    icon: "📱"
  },
  {
    title: "Stack Moderno",
    description: "Arquitectura robusta con React, Tailwind CSS, FastAPI y base de datos PostgreSQL.",
    icon: "⚡"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-[#0a0a0c] border-y border-[#1a1a1f] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Todo lo que necesitas para investigar
          </h2>
          <p className="text-[#8a8aa3] text-lg">
            Herramientas diseñadas específicamente para el flujo de trabajo moderno en el laboratorio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-8 rounded-2xl bg-[#111019] border border-[#1c1a2e] hover:border-[#a855f7]/50 transition-all hover:shadow-[0_4px_30px_rgba(168,85,247,0.1)] hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1a1a1f] flex items-center justify-center text-2xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-[#8a8aa3] text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
