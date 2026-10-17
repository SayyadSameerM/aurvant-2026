import { motion } from "framer-motion";

// ──────────────────────────────────────────────────────────────────────
// SCENE 1 — THE COSMIC AWAKENING (0–6 s)
// Stars appear → energy pulse → crown forms → AURVYNT 2026 revealed
// ──────────────────────────────────────────────────────────────────────

interface Props { elapsed: number; sceneIndex: number; }

// Crown built from animated SVG paths
function AnimatedCrown({ delay = 0 }: { delay?: number }) {
  return (
    <motion.svg
      width="90" height="72" viewBox="0 0 90 72" fill="none"
      initial={{ opacity: 0, scale: 0.4, filter: "blur(20px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.4, delay, ease: [0.23, 1, 0.32, 1] }}
      aria-hidden="true"
      style={{ filter: "drop-shadow(0 0 20px #00f0ff) drop-shadow(0 0 50px rgba(191,95,255,0.5))" }}
    >
      <defs>
        <linearGradient id="crg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f0ff" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#bf5fff" />
          <stop offset="100%" stopColor="#ff2d9b" />
        </linearGradient>
      </defs>
      <motion.path
        d="M5 58 L16 14 L30 38 L45 4 L60 38 L74 14 L85 58 Z"
        fill="url(#crg1)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.95 }}
        transition={{ duration: 1.2, delay: delay + 0.2 }}
      />
      <motion.rect
        x="5" y="58" width="80" height="10" rx="5"
        fill="url(#crg1)"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.9 }}
        transition={{ duration: 0.6, delay: delay + 1.0 }}
        style={{ transformOrigin: "center" }}
      />
      {/* Jewels */}
      {[
        { cx: 45, cy: 22, r: 4.5, fill: "#ffd700" },
        { cx: 22, cy: 44, r: 3, fill: "#ff2d9b" },
        { cx: 68, cy: 44, r: 3, fill: "#bf5fff" },
      ].map((j, i) => (
        <motion.circle
          key={i} cx={j.cx} cy={j.cy} r={j.r} fill={j.fill}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 0.4, delay: delay + 1.2 + i * 0.1 }}
          style={{ transformOrigin: `${j.cx}px ${j.cy}px` }}
        />
      ))}
    </motion.svg>
  );
}

// Animated ring burst
function RingBurst() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
      {[200, 300, 420, 560].map((r, i) => (
        <motion.div
          key={i}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{ width: r * 2, height: r * 2, opacity: [0, 0.35, 0] }}
          transition={{
            duration: 2.5,
            delay: 1.2 + i * 0.3,
            ease: [0.23, 1, 0.32, 1],
          }}
          style={{
            position: "absolute",
            borderRadius: "50%",
            border: `1.5px solid ${["#00f0ff", "#bf5fff", "#ff2d9b", "#ffd700"][i]}`,
            boxShadow: `0 0 25px ${["#00f0ff", "#bf5fff", "#ff2d9b", "#ffd700"][i]}40`,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
}

// Laser beam SVG
function LaserBeams() {
  const beams = [
    { x2: "10%", color: "rgba(0, 240, 255, 0.22)" },
    { x2: "25%", color: "rgba(191, 95, 255, 0.20)" },
    { x2: "40%", color: "rgba(0, 240, 255, 0.18)" },
    { x2: "60%", color: "rgba(255, 45, 155, 0.20)" },
    { x2: "75%", color: "rgba(191, 95, 255, 0.20)" },
    { x2: "90%", color: "rgba(0, 240, 255, 0.22)" },
  ];
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {beams.map((b, i) => (
        <motion.line
          key={i}
          x1="50" y1="100" x2={b.x2} y2="0"
          stroke={b.color}
          strokeWidth="0.6"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.8 + i * 0.15, ease: "easeOut" }}
        />
      ))}
      <motion.ellipse
        cx="50" cy="98" rx="40" ry="8"
        fill="rgba(0,240,255,0.08)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      />
    </svg>
  );
}

export default function Scene1Awakening(_props: Props) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(0, 20, 50, 0.95) 0%, rgba(0, 5, 20, 0.98) 55%, #000408 100%)",
      }}
    >
      <LaserBeams />
      <RingBurst />

      {/* Perspective floor grid */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "35%", pointerEvents: "none" }}
        viewBox="0 0 100 40" preserveAspectRatio="xMidYMax slice"
      >
        {Array.from({ length: 8 }, (_, i) => {
          const y = 5 + i * 5;
          const spread = (i / 7) * 0.9;
          return (
            <motion.line key={`h${i}`} x1={50 - 50 * spread} y1={y} x2={50 + 50 * spread} y2={y}
              stroke="rgba(0, 240, 255, 0.18)" strokeWidth="0.3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.06 }}
            />
          );
        })}
        {Array.from({ length: 11 }, (_, i) => (
          <motion.line key={`v${i}`} x1="50" y1="0" x2={i * 10} y2="40"
            stroke="rgba(0, 240, 255, 0.12)" strokeWidth="0.3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.04 }}
          />
        ))}
      </svg>

      {/* Content column */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 20px" }}>
        {/* Crown */}
        <div style={{ marginBottom: "20px" }}>
          <AnimatedCrown delay={0.4} />
        </div>

        {/* Pulsing energy glow under title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: [0, 0.7, 0.35], scale: [0.2, 1.5, 1] }}
          transition={{ duration: 1.2, delay: 1.6 }}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "38%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "min(500px, 80vw)",
            height: "120px",
            background: "radial-gradient(ellipse, rgba(0,240,255,0.4) 0%, rgba(191,95,255,0.2) 50%, transparent 70%)",
            filter: "blur(25px)",
            pointerEvents: "none",
          }}
        />

        {/* AURVYNT */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(24px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.3, delay: 1.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(3.5rem, 14vw, 9rem)",
              letterSpacing: "-0.02em",
              lineHeight: 0.88,
              background: "linear-gradient(135deg, #00f0ff 0%, #ffffff 40%, #bf5fff 70%, #ff2d9b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 40px rgba(0, 240, 255, 0.5), 0 0 80px rgba(191, 95, 255, 0.3)",
              marginBottom: "4px",
            }}
          >
            AURVYNT
          </h1>
        </motion.div>

        {/* 2026 */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.8em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 1.2, delay: 2.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2rem, 8vw, 5.5rem)",
              color: "#ffd700",
              textShadow: "0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.3)",
            }}
          >
            2026
          </div>
        </motion.div>

        {/* Subtitle fade */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.2 }}
          style={{
            marginTop: "16px",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(0.85rem, 2.5vw, 1.2rem)",
            color: "#00f0ff",
            textShadow: "0 0 15px rgba(0, 240, 255, 0.6)",
            letterSpacing: "0.25em",
          }}
        >
          FRESHERS × FAREWELL
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4 }}
          style={{
            marginTop: "8px",
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(0.75rem, 2vw, 0.95rem)",
            color: "rgba(255, 215, 0, 0.85)",
            textShadow: "0 0 10px rgba(255, 215, 0, 0.3)",
            letterSpacing: "0.08em",
            fontStyle: "italic",
          }}
        >
          "Three Sciences. Two Generations. One Legacy."
        </motion.p>
      </div>

      {/* Crowd silhouette */}
      <motion.svg
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.15, y: 0 }}
        transition={{ duration: 1.5, delay: 1.2 }}
        aria-hidden="true"
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "18%", pointerEvents: "none" }}
        viewBox="0 0 1440 160" preserveAspectRatio="xMidYMax slice"
      >
        {Array.from({ length: 36 }, (_, i) => {
          const x = 20 + i * 40;
          const h = 50 + Math.sin(i * 1.8) * 30 + Math.cos(i * 0.7) * 20;
          return (
            <ellipse key={i} cx={x} cy={160} rx={16} ry={h}
              fill={i % 2 === 0 ? "rgba(0,200,255,0.6)" : "rgba(150,50,200,0.5)"}
            />
          );
        })}
      </motion.svg>
    </div>
  );
}
