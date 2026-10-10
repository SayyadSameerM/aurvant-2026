import { motion } from "framer-motion";
import { EVENT } from "../../config/event";

// ──────────────────────────────────────────────────────────────────────
// SCENE 5 — TWO GENERATIONS, ONE LEGACY (31–39 s)
// Emotional poster phrases revealed through cinematic typography
// ──────────────────────────────────────────────────────────────────────

interface Props { elapsed: number; sceneIndex: number; }

// Stagger: each phrase appears ~1.5s apart
const PHRASE_TIMINGS = [0, 1600, 3200, 4800, 6200];

const PHRASE_STYLES = [
  { size: "clamp(1.1rem, 3.5vw, 2rem)",   weight: 400, color: "rgba(255,255,255,0.75)", from: "left"   },
  { size: "clamp(1.5rem, 5vw, 3rem)",     weight: 900, color: "#ffd700",               from: "right"  },
  { size: "clamp(1rem, 3vw, 1.7rem)",     weight: 400, color: "rgba(0,240,255,0.85)",  from: "left"   },
  { size: "clamp(1rem, 3vw, 1.7rem)",     weight: 400, color: "rgba(191,95,255,0.85)", from: "right"  },
  { size: "clamp(1.6rem, 5.5vw, 3.5rem)", weight: 900, color: "transparent",           from: "center" },
] as const;

export default function Scene5Legacy({ elapsed }: Props) {
  // Which phrases are visible
  const visibleCount = PHRASE_TIMINGS.filter(t => elapsed >= t).length;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse 100% 80% at 30% 40%, rgba(30,0,50,0.7) 0%, transparent 60%), radial-gradient(ellipse 100% 80% at 70% 60%, rgba(0,20,50,0.7) 0%, transparent 60%), #000408",
        padding: "0 clamp(16px, 5vw, 80px)",
      }}
    >
      {/* Floating light specks */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {Array.from({ length: 24 }, (_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.05, 0.5, 0.05], y: [0, -20, 0] }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              position: "absolute",
              top: `${10 + Math.random() * 80}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              borderRadius: "50%",
              background: ["#00f0ff", "#bf5fff", "#ffd700", "#ff2d9b", "#ffffff"][i % 5],
            }}
          />
        ))}
      </div>

      {/* Phrases */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "min(800px, 90vw)",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(10px, 2vh, 20px)",
        }}
        role="region"
        aria-label="AURVYNT 2026 celebration messages"
      >
        {EVENT.phrases.map((phrase, i) => {
          const style = PHRASE_STYLES[i];
          const isVisible = i < visibleCount;
          const isLastPhrase = i === EVENT.phrases.length - 1;

          return (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: style.from === "left" ? -60 : style.from === "right" ? 60 : 0,
                y: style.from === "center" ? 30 : 0,
                filter: "blur(8px)",
              }}
              animate={isVisible ? {
                opacity: 1,
                x: 0,
                y: 0,
                filter: "blur(0px)",
              } : {}}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              style={{
                textAlign: style.from === "right" ? "right" : style.from === "left" ? "left" : "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: style.weight,
                  fontSize: style.size,
                  color: style.color,
                  lineHeight: 1.25,
                  ...(isLastPhrase ? {
                    background: "linear-gradient(135deg, #ff2d9b, #ffd700, #00f0ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "0.03em",
                  } : {}),
                  ...(phrase.includes("Same Sky") ? {
                    textShadow: "0 0 30px rgba(255,215,0,0.4)",
                  } : {}),
                }}
              >
                {phrase}
              </span>

              {/* Accent line for "Different Journeys" */}
              {i === 1 && isVisible && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  style={{
                    height: "2px",
                    background: "linear-gradient(90deg, transparent, #ffd700, transparent)",
                    marginTop: "6px",
                    borderRadius: "1px",
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Slow light sweep */}
      <motion.div
        aria-hidden="true"
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "40%",
          width: "30vw",
          height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.15), transparent)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
