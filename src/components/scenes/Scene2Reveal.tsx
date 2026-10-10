import { motion } from "framer-motion";

// ──────────────────────────────────────────────────────────────────────
// SCENE 2 — THE REVEAL (6–12 s)
// FRESHERS cyan stream × FAREWELL magenta stream → merge → tagline
// ──────────────────────────────────────────────────────────────────────

interface Props { elapsed: number; sceneIndex: number; }

function StreamLine({ from, color, delay }: { from: "left" | "right"; color: string; delay: number }) {
  const xFrom = from === "left" ? "-120%" : "120%";
  return (
    <motion.div
      initial={{ x: xFrom, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay, ease: [0.23, 1, 0.32, 1] }}
      style={{
        position: "absolute",
        top: "50%",
        left: 0,
        width: "100%",
        height: "1px",
        background: `linear-gradient(${from === "left" ? "90deg" : "270deg"}, transparent, ${color} 40%, ${color} 60%, transparent)`,
        transform: "translateY(-50%)",
        pointerEvents: "none",
        opacity: 0.4,
      }}
    />
  );
}

export default function Scene2Reveal(_props: Props) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse 100% 70% at 50% 50%, rgba(0,15,35,0.9) 0%, #000408 80%)",
        padding: "0 20px",
      }}
    >
      {/* Horizontal stream lines */}
      <StreamLine from="left" color="#00f0ff" delay={0.1} />
      <StreamLine from="right" color="#ff2d9b" delay={0.3} />

      {/* Burst at center on merge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2.5, 0], opacity: [0, 0.6, 0] }}
        transition={{ duration: 1.2, delay: 0.8 }}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(0,240,255,0.2) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Glowing rings */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        {[260, 360, 480].map((r, i) => (
          <motion.div
            key={i}
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{ width: r * 2, height: r * 2, opacity: [0, 0.2, 0.12] }}
            transition={{ duration: 1.5, delay: 0.6 + i * 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{
              position: "absolute",
              borderRadius: "50%",
              border: `1px solid ${["#00f0ff", "#bf5fff", "#ff2d9b"][i]}`,
            }}
          />
        ))}
      </div>

      {/* Text content */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: "900px", width: "100%" }}>
        {/* FRESHERS */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(12px, 3vw, 32px)", marginBottom: "clamp(16px, 3vh, 28px)", flexWrap: "wrap" }}>
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2rem, 8vw, 5rem)",
                letterSpacing: "0.05em",
                color: "#00f0ff",
                textShadow: "0 0 40px rgba(0,240,255,0.8), 0 0 80px rgba(0,240,255,0.4)",
                lineHeight: 1,
              }}
            >
              FRESHERS
            </div>
          </motion.div>

          {/* × symbol with burst */}
          <motion.div
            initial={{ opacity: 0, scale: 0.2, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.8, type: "spring", stiffness: 200 }}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2rem, 6vw, 4rem)",
              color: "#ffffff",
              textShadow: "0 0 20px rgba(255,255,255,0.5)",
            }}
          >
            ×
          </motion.div>

          {/* FAREWELL */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2rem, 8vw, 5rem)",
                letterSpacing: "0.05em",
                color: "#ff2d9b",
                textShadow: "0 0 40px rgba(255,45,155,0.8), 0 0 80px rgba(255,45,155,0.4)",
                lineHeight: 1,
              }}
            >
              FAREWELL
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          style={{
            height: "2px",
            background: "linear-gradient(90deg, transparent, #00f0ff 20%, #ff2d9b 80%, transparent)",
            marginBottom: "clamp(20px, 4vh, 36px)",
            borderRadius: "1px",
          }}
        />

        {/* AURVYNT 2026 identity line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(1.2rem, 4vw, 2.2rem)",
            letterSpacing: "0.3em",
            color: "rgba(255,215,0,0.9)",
            textShadow: "0 0 20px rgba(255,215,0,0.4)",
            marginBottom: "clamp(12px, 2.5vh, 20px)",
          }}
        >
          AURVYNT 2026
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.4 }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)",
            color: "rgba(255,255,255,0.65)",
            letterSpacing: "0.06em",
            fontStyle: "italic",
            marginBottom: "clamp(20px, 4vh, 36px)",
          }}
        >
          "Three Sciences. Two Generations. One Legacy."
        </motion.p>

        {/* Energy wave animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 3.5 }}
          style={{ display: "flex", justifyContent: "center", gap: "16px" }}
          aria-hidden="true"
        >
          {["COMPUTER", "PHYSICS", "CHEMISTRY"].map((d, i) => (
            <motion.span
              key={d}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 3.5 + i * 0.15 }}
              style={{
                fontSize: "clamp(0.55rem, 1.2vw, 0.7rem)",
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: ["#00f0ff", "#bf5fff", "#ff6b35"][i],
                padding: "4px 10px",
                border: `1px solid ${["#00f0ff44", "#bf5fff44", "#ff6b3544"][i]}`,
                borderRadius: "100px",
                background: `${["rgba(0,240,255,0.05)", "rgba(191,95,255,0.05)", "rgba(255,107,53,0.05)"][i]}`,
              }}
            >
              {d}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
