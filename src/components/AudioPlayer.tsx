import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioPlayer({ isPlaying: enginePlaying }: { isPlaying: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [showUnmute, setShowUnmute] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (enginePlaying && hasStarted) {
      audio.play().catch(e => console.warn(e));
    } else if (!enginePlaying && hasStarted) {
      audio.pause();
    }
  }, [enginePlaying, hasStarted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5; // Set a reasonable default volume

    const playAudio = async () => {
      try {
        await audio.play();
        setHasStarted(true);
        setShowUnmute(false);
      } catch (err) {
        // Autoplay was prevented
        console.warn("Autoplay prevented:", err);
        setShowUnmute(true);
      }
    };

    // Try playing immediately
    playAudio();

    // Also attach a one-time click listener to the document in case they interact elsewhere
    const handleInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        playAudio();
      }
    };
    
    document.addEventListener("click", handleInteraction, { once: true });
    
    return () => {
      document.removeEventListener("click", handleInteraction);
    };
  }, []);

  const handleUnmuteClick = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setHasStarted(true);
        setShowUnmute(false);
      }).catch(err => console.error("Could not play audio", err));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/background-music.mp3"
        loop
        preload="auto"
      />
      
      {/* Unobtrusive button if autoplay is blocked */}
      <AnimatePresence>
        {showUnmute && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              zIndex: 9999,
            }}
          >
            <button
              onClick={handleUnmuteClick}
              style={{
                padding: "8px 16px",
                borderRadius: "100px",
                background: "rgba(0, 240, 255, 0.15)",
                border: "1px solid rgba(0, 240, 255, 0.4)",
                color: "#00f0ff",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "12px",
                letterSpacing: "0.1em",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 0 20px rgba(0, 240, 255, 0.2)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
              TAP TO PLAY AUDIO
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
