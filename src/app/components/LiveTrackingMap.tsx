import { motion } from 'motion/react';
import { MapPin, Bike } from 'lucide-react';

interface LiveTrackingMapProps {
  onExpandMap: () => void;
}

export default function LiveTrackingMap({ onExpandMap }: LiveTrackingMapProps) {
  return (
    <motion.button
      onClick={onExpandMap}
      className="w-full h-[120px] relative overflow-hidden rounded-2xl cursor-pointer active:scale-[0.98] transition-transform shadow-md"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Fundo do Mapa - Gradiente Minimalista */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-[#1A1A1A] dark:via-[#151515] dark:to-[#121212]">
        {/* Grid Pattern Sutil */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-300 dark:text-gray-700" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Rota Pontilhada - Linha Ciano */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M 10 80 Q 30 40, 50 50 T 90 20"
          fill="none"
          stroke="#7FDBCA"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>

      {/* Ponto de Entrega (Destino) - Campus */}
      <motion.div
        className="absolute bottom-4 right-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        {/* Pulso Animado */}
        <motion.div
          className="absolute inset-0 -inset-2 bg-[#7FDBCA] rounded-full opacity-30"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <div className="relative z-10 w-8 h-8 bg-[#7FDBCA] rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-800">
          <MapPin className="w-5 h-5 text-white fill-white" />
        </div>
      </motion.div>

      {/* Ícone do Entregador (Em Movimento) */}
      <motion.div
        className="absolute top-1/2 left-1/2"
        initial={{ x: "-150%", y: "100%" }}
        animate={{ x: "-50%", y: "-50%" }}
        transition={{
          duration: 2,
          delay: 0.3,
          type: "spring",
          stiffness: 50,
          damping: 15
        }}
      >
        {/* Sombra do Entregador */}
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-black/10 dark:bg-white/5 rounded-full blur-sm"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Ícone de Moto/Bike */}
        <motion.div
          className="relative w-10 h-10 bg-[#FFB088] rounded-full flex items-center justify-center shadow-xl border-3 border-white dark:border-gray-800"
          animate={{ rotate: [0, -5, 0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Bike className="w-6 h-6 text-white" strokeWidth={2.5} />
        </motion.div>

        {/* Indicador de Movimento - Trail */}
        <motion.div
          className="absolute top-1/2 -left-6 -translate-y-1/2 flex gap-0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-[#FFB088] rounded-full"
              animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Label "Ver Mapa Completo" */}
      <div className="absolute top-3 left-3 bg-white/90 dark:bg-[#1E1E1E]/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
          📍 Rastreamento ao Vivo
        </span>
      </div>
    </motion.button>
  );
}
