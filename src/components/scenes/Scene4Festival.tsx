import { motion } from "framer-motion";
import { EVENT } from "../../config/event";

// ──────────────────────────────────────────────────────────────────────
// SCENE 4 — FESTIVAL MODE ACTIVATED (21–31 s)
// Neon stage → rhythmic activity reveals → festival crescendo
// ──────────────────────────────────────────────────────────────────────

interface Props { elapsed: number; sceneIndex: number; }

// Staggered activity entry — each 1.5s apart
const ACTIVITY_INTERVALS = [0, 1500, 3000, 4500, 6000, 7500];

const ACTIVITY_CONFIGS = [
  { name: "MUSIC",        icon: "♪",  color: "#00f0ff",  motion: "bounce" },
  { name: "DANCE",        icon: "✦",  color: "#ff2d9b",  motion: "spin"   },
  { name: "GAMES",        icon: "◈",  color: "#00ff88",  motion: "pulse"  },
  { name: "COMPETITIONS", icon: "★",  color: "#ffd700",  motion: "grow"   },
  { name: "FUN",          icon: "✿",  color: "#bf5fff",  motion: "slide"  },
  { name: "MEMORIES",     icon: "◎",  color: "#ff6b35",  motion: "fade"   },
];

function ActivityWord({ name, icon, color, delay, elapsed }: {
  name: string; icon: string; color: string; delay: number; elapsed: number;
}) {
  const isVisible = elapsed >= delay;
  const motionVariants = {
    bounce: { y: [0, -12, 0] },
    spin:   { rotate: [0, 5, -5, 0] },
    pulse:  { scale: [1, 1.08, 1] },
    grow:   { scale: [0.9, 1.05, 1] },
    slide:  { x: [0, 4, -4, 0] },
    fade:   { opacity: [0.8, 1, 0.8] },
  };
  const motionKey = (ACTIVITY_CONFIGS.find(a => a.name === name)?.motion ?? "pulse") as keyof typeof motionVariants;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 30 }}
      animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 30 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "clamp(6px, 1.5vw, 12px)",
        padding: "clamp(8px, 2vw, 14px) clamp(12px, 3vw, 24px)",
        borderRadius: "100px",
        background: `${color}10`,
        border: `1px solid ${color}40`,
        backdropFilter: "blur(8px)",
        boxShadow: isVisible ? `0 0 20px ${color}20` : "none",
      }}
    >
      {/* Icon */}
      <motion.span
        animate={isVisible ? motionVariants[motionKey] : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
          color,
          textShadow: `0 0 10px ${color}`,
          lineHeight: 1,
          display: "block",
        }}
      >
        {icon}
      </motion.span>

      <span style={{
        fontFamily: "var(--font-display)",
        fontWeight: 900,
        fontSize: "clamp(0.8rem, 2.2vw, 1.3rem)",
        letterSpacing: "0.15em",
        color,
        textShadow: `0 0 12px ${color}`,
      }}>
        {name}
      </span>

      {/* Pulsing dot */}
      {isVisible && (
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: "5px", height: "5px", borderRadius: "50%", background: color }}
        />
      )}
    </motion.div>
  );
}

export default function Scene4Festival({ elapsed }: Props) {
  const allVisible = elapsed >= 8500;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse 120% 80% at 50% 110%, rgba(20,0,40,0.95) 0%, rgba(0,4,12,0.98) 50%, #000408 100%)",
        padding: "0 20px",
        overflow: "hidden",
      }}
    >
      {/* Stage beams */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        viewBox="0 0 100 100" preserveAspectRatio="none"
      >
        {[10, 25, 40, 60, 75, 90].map((x, i) => (
          <motion.line
            key={i} x1="50" y1="110" x2={`${x}%`} y2="0"
            stroke={["rgba(0,240,255,", "rgba(255,45,155,", "rgba(191,95,255,", "rgba(255,215,0,", "rgba(0,255,136,", "rgba(255,107,53,"][i % 6] + "0.12)"}
            strokeWidth="0.6"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
          />
        ))}
        <ellipse cx="50" cy="105" rx="45" ry="10" fill="rgba(0,240,255,0.04)" />
      </svg>

      {/* Confetti dots */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {Array.from({ length: 18 }, (_, i) => (
          <motion.div
            key={i}
            animate={{
              y: ["-10vh", "110vh"],
              x: [0, (Math.random() - 0.5) * 80],
              rotate: [0, Math.random() * 360],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5 + Math.random() * 3,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              top: 0,
              left: `${5 + i * 5.5}%`,
              width: 4 + Math.random() * 4,
              height: 4 + Math.random() * 4,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              background: ["#00f0ff", "#ff2d9b", "#ffd700", "#bf5fff", "#00ff88", "#ff6b35"][i % 6],
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", marginBottom: "clamp(16px, 3vh, 32px)", position: "relative", zIndex: 2 }}
      >
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.35em", color: "#ff2d9b", fontWeight: 700, marginBottom: "8px" }}>
          FESTIVAL MODE ACTIVATED
        </p>
        <h2 style={{
          fontFamily: "var(--font-display)", fontWeight: 900,
          fontSize: "clamp(1.4rem, 5vw, 3rem)",
          background: "linear-gradient(135deg, #ff2d9b, #bf5fff, #00f0ff)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          letterSpacing: "0.05em",
        }}>
          What Awaits You
        </h2>
      </motion.div>

      {/* Activity grid */}
      <div
        style={{
          position: "relative", zIndex: 2,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(clamp(140px, 35vw, 210px), 1fr))",
          gap: "clamp(8px, 1.5vw, 14px)",
          width: "100%",
          maxWidth: "740px",
          padding: "0 4px",
        }}
      >
        {EVENT.activities.map((act, i) => {
          const cfg = ACTIVITY_CONFIGS[i];
          return (
            <ActivityWord
              key={act.id}
              name={act.name}
              icon={cfg.icon}
              color={cfg.color}
              delay={ACTIVITY_INTERVALS[i]}
              elapsed={elapsed}
            />
          );
        })}
      </div>

      {/* Crescendo unity flash */}
      {allVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginTop: "clamp(16px, 3vh, 28px)", position: "relative", zIndex: 2 }}
        >
          <p style={{
            fontFamily: "var(--font-display)", fontWeight: 900,
            fontSize: "clamp(1rem, 3vw, 1.8rem)",
            background: "linear-gradient(135deg, #ffd700, #ff2d9b, #00f0ff)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            letterSpacing: "0.15em",
          }}>
            ONE INCREDIBLE DAY ✦
          </p>
        </motion.div>
      )}

      {/* Crowd silhouette at bottom */}
      <motion.svg
        initial={{ opacity: 0 }} animate={{ opacity: 0.12 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        aria-hidden="true"
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "12%", pointerEvents: "none" }}
        viewBox="0 0 1440 80" preserveAspectRatio="xMidYMax slice"
      >
        {Array.from({ length: 40 }, (_, i) => {
          const x = 18 + i * 36;
          const h = 30 + Math.sin(i * 1.7) * 22 + Math.cos(i * 0.8) * 12;
          return <ellipse key={i} cx={x} cy={80} rx={13} ry={h} fill="rgba(255,255,255,0.6)" />;
        })}
      </motion.svg>
    </div>
  );
}
