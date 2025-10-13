import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.loop = true;
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      className="fixed bottom-5 right-5 z-50 bg-white/10 backdrop-blur-md rounded-full p-3 cursor-pointer shadow-lg hover:scale-110 transition"
      whileHover={{ scale: 1.1 }}
      onClick={togglePlay}
    >
      {isPlaying ? (
        <Volume2 className="text-white h-6 w-6" />
      ) : (
        <VolumeX className="text-white h-6 w-6" />
      )}
      {/* Use any free upbeat track (royalty-free) */}
      <audio ref={audioRef} src="/music/quiz-lobby.mp3" />
    </motion.div>
  );
}
