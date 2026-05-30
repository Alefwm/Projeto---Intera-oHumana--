import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Bike, MessageCircle, Phone } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FullscreenMapScreenProps {
  onClose: () => void;
  deliveryPerson: {
    name: string;
    distance: string;
    photo: string;
  };
}

export default function FullscreenMapScreen({ onClose, deliveryPerson }: FullscreenMapScreenProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-white dark:bg-[#121212]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Mapa em Tela Cheia */}
        <div className="relative w-full h-full">
          {/* Fundo do Mapa Expandido - Gradiente Minimalista */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-[#1A1A1A] dark:via-[#151515] dark:to-[#0A0A0A]">
            {/* Grid Pattern Detalhado */}
            <svg className="absolute inset-0 w-full h-full opacity-15">
              <defs>
                <pattern id="fullscreen-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-400 dark:text-gray-700" />
                  <circle cx="0" cy="0" r="1" fill="currentColor" className="text-gray-300 dark:text-gray-600" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#fullscreen-grid)" />
            </svg>

            {/* Elementos de Rua Simulados - Linhas */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <line x1="20%" y1="0" x2="20%" y2="100%" stroke="currentColor" strokeWidth="2" className="text-gray-300 dark:text-gray-700" />
              <line x1="0" y1="60%" x2="100%" y2="60%" stroke="currentColor" strokeWidth="3" className="text-gray-300 dark:text-gray-700" />
              <line x1="75%" y1="0" x2="75%" y2="100%" stroke="currentColor" strokeWidth="2" className="text-gray-300 dark:text-gray-700" />
            </svg>
          </div>

          {/* Rota Completa - Linha Ciano Pontilhada */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M 15 85 Q 25 70, 35 65 T 50 55 Q 60 45, 70 40 T 85 25"
              fill="none"
              stroke="#7FDBCA"
              strokeWidth="0.6"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          {/* Ponto de Partida - Restaurante */}
          <motion.div
            className="absolute top-[15%] left-[15%]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 -inset-3 bg-[#FFB088]/30 rounded-full"
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <div className="relative w-12 h-12 bg-[#FFB088] rounded-full flex items-center justify-center shadow-xl border-3 border-white dark:border-gray-800">
                <span className="text-xl">🍴</span>
              </div>
            </div>
            {/* Label */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-[#1E1E1E]/95 backdrop-blur-sm px-3 py-1 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 whitespace-nowrap">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Restaurante</span>
            </div>
          </motion.div>

          {/* Ponto de Destino - Campus */}
          <motion.div
            className="absolute top-[25%] right-[15%]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 -inset-3 bg-[#7FDBCA]/30 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative w-12 h-12 bg-[#7FDBCA] rounded-full flex items-center justify-center shadow-xl border-3 border-white dark:border-gray-800">
                <MapPin className="w-7 h-7 text-white fill-white" />
              </div>
            </div>
            {/* Label */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-[#1E1E1E]/95 backdrop-blur-sm px-3 py-1 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 whitespace-nowrap">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Seu Local</span>
            </div>
          </motion.div>

          {/* Entregador em Movimento */}
          <motion.div
            className="absolute top-[55%] left-[50%]"
            initial={{ x: "-200%", y: "100%" }}
            animate={{ x: "-50%", y: "-50%" }}
            transition={{
              duration: 2.5,
              delay: 0.5,
              type: "spring",
              stiffness: 40,
              damping: 12
            }}
          >
            <div className="relative">
              {/* Sombra do Entregador */}
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-14 h-2 bg-black/15 dark:bg-white/10 rounded-full blur-md"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />

              {/* Ícone do Entregador com Animação */}
              <motion.div
                className="relative w-16 h-16 bg-gradient-to-br from-[#FFB088] to-[#FF9E6B] rounded-full flex items-center justify-center shadow-2xl border-4 border-white dark:border-gray-800"
                animate={{
                  rotate: [0, -3, 0, 3, 0],
                  y: [0, -2, 0, -2, 0]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Bike className="w-9 h-9 text-white" strokeWidth={2.5} />

                {/* Indicador de Velocidade */}
                <motion.div
                  className="absolute -right-1 -top-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>

              {/* Trail de Movimento Expandido */}
              <motion.div
                className="absolute top-1/2 -left-10 -translate-y-1/2 flex gap-1"
                animate={{ opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 bg-[#FFB088] rounded-full"
                    animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1.2, 0.5] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Botão Fechar (X) - Canto Superior Direito */}
          <motion.button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 bg-white/90 dark:bg-[#1E1E1E]/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-[#2A2A2A] active:scale-95 transition-all z-10"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-6 h-6 text-gray-700 dark:text-gray-300" strokeWidth={2.5} />
          </motion.button>

          {/* Info Card - Bottom (Entregador) */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-white/95 dark:bg-[#1E1E1E]/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700 px-5 py-5 shadow-2xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 100, damping: 20 }}
          >
            <div className="flex items-center gap-4">
              {/* Foto do Entregador */}
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-3 border-[#7FDBCA] shadow-lg flex-shrink-0">
                <ImageWithFallback
                  src={deliveryPerson.photo}
                  alt={deliveryPerson.name}
                  className="w-full h-full object-cover"
                />
                {/* Status Online */}
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-[#1E1E1E]" />
              </div>

              {/* Info do Entregador */}
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-0.5">Seu entregador</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {deliveryPerson.name}
                </h3>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="flex items-center gap-1 bg-[#7FDBCA]/20 px-2 py-1 rounded-full"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-1.5 h-1.5 bg-[#7FDBCA] rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-[#52BFB0]">
                      {deliveryPerson.distance}
                    </span>
                  </motion.div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">• Chegando em breve</span>
                </div>
              </div>

              {/* Botão de Chat */}
              <motion.button
                onClick={() => {/* Abrir chat */}}
                className="w-12 h-12 bg-[#7FDBCA] rounded-full flex items-center justify-center shadow-lg hover:bg-[#6CCBB9] active:scale-95 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
