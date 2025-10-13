import { motion } from "framer-motion";
import BackgroundMusic from "./BackgroundMusic";

export default function GameLayout({ title, children }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 animate-gradient">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.12),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.12),transparent_50%)]" />
      
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] mb-8 z-10"
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 w-[90%] md:w-[600px] z-10"
      >
        {children}
      </motion.div>

      <BackgroundMusic />
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}
