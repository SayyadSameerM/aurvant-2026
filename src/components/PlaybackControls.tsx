import { motion } from "framer-motion";
import type { UseSceneEngineReturn } from "../hooks/useSceneEngine";
import { SCENES, TOTAL_DURATION } from "../hooks/useSceneEngine";

interface Props { engine: UseSceneEngineReturn; }

export default function PlaybackControls({ engine }: Props) {
  const { isPlaying, isComplete, pause, resume, replay, totalElapsed, sceneIndex } = engine;
  const pct = Math.min(totalElapsed / TOTAL_DURATION, 1) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="no-print"
      aria-label="Playback controls"
      style={{
        position: "fixed",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        pointerEvents: "auto",
      }}
    >
      {/* Progress bar */}
      <div
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Experience progress: scene ${sceneIndex + 1} of ${SCENES.length}`}
        style={{
          width: "min(240px, 50vw)",
          height: "3px",
          background: "rgba(255,255,255,0.12)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3, ease: "linear" }}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #00f0ff, #bf5fff, #ff2d9b)",
            borderRadius: "2px",
          }}
        />
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {/* Pause / Resume */}
        {!isComplete && (
          <button
            onClick={isPlaying ? pause : resume}
            aria-label={isPlaying ? "Pause experience" : "Resume experience"}
            style={{
              width: "32px", height: "32px",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s",
            }}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
        )}

        {/* Replay */}
        <button
          onClick={replay}
          aria-label="Replay from beginning"
          style={{
            width: "32px", height: "32px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.7)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            backdropFilter: "blur(8px)",
            transition: "all 0.2s",
          }}
        >
          ↺
        </button>

        {/* Scene indicator dots */}
        {SCENES.map((sc, i) => (
          <button
            key={sc.id}
            onClick={() => engine.seekToScene(i)}
            aria-label={`Jump to ${sc.label}`}
            style={{
              width: sceneIndex === i ? "20px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: sceneIndex === i
                ? "linear-gradient(90deg, #00f0ff, #bf5fff)"
                : "rgba(255,255,255,0.2)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
