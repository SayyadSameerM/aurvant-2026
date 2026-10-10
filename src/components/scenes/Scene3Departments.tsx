import { motion } from "framer-motion";

// ──────────────────────────────────────────────────────────────────────
// SCENE 3 — THREE SCIENCES, ONE UNIVERSE (12–21 s)
// Sequential dept reveals with custom visuals → unified finale
// ──────────────────────────────────────────────────────────────────────

interface Props { elapsed: number; sceneIndex: number; }

// --- COMPUTER: animated code grid ---
function ComputerViz({ visible }: { visible: boolean }) {
  const codeLines = ["<AURVYNT/>", "01101001", "{ dream: true }", "system.init()", "#universe", "const future = [];"];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
      transition={{ duration: 0.7 }}
      style={{
        width: "min(280px, 60vw)",
        padding: "20px",
        borderRadius: "12px",
        background: "rgba(0,240,255,0.04)",
        border: "1px solid rgba(0,240,255,0.2)",
        fontFamily: "var(--font-mono)",
        fontSize: "clamp(0.6rem, 1.5vw, 0.8rem)",
        color: "#00f0ff",
        marginBottom: "16px",
      }}
    >
      {codeLines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -20 }}
          transition={{ duration: 0.4, delay: i * 0.12 }}
          style={{ marginBottom: "4px", opacity: 0.7 + (i % 3) * 0.1 }}
        >
          <span style={{ color: "rgba(0,240,255,0.35)", marginRight: "8px" }}>{String(i + 1).padStart(2, "0")}</span>
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
}

// --- PHYSICS: orbital rings animation ---
function PhysicsViz({ visible }: { visible: boolean }) {
  return (
    <motion.svg
      width="min(200px, 45vw)" height="min(200px, 45vw)"
      viewBox="0 0 200 200" fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.7 }}
      style={{ marginBottom: "16px", overflow: "visible" }}
    >
      {/* Nucleus */}
      <motion.circle
        cx="100" cy="100" r="8"
        fill="#bf5fff"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "100px 100px", filter: "drop-shadow(0 0 8px #bf5fff)" }}
      />
      {/* Orbital paths */}
      {[
        { rx: 70, ry: 28, rotate: 0, color: "#bf5fff", dur: 3 },
        { rx: 70, ry: 28, rotate: 60, color: "#00f0ff", dur: 4 },
        { rx: 70, ry: 28, rotate: 120, color: "#ff2d9b", dur: 5 },
      ].map((o, i) => (
        <g key={i} transform={`rotate(${o.rotate} 100 100)`}>
          <ellipse cx="100" cy="100" rx={o.rx} ry={o.ry}
            stroke={o.color} strokeWidth="1" fill="none" opacity="0.5" />
          <motion.circle
            cx="170" cy="100" r="5" fill={o.color}
            animate={{ rotate: 360 }}
            transition={{ duration: o.dur, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "100px 100px", filter: `drop-shadow(0 0 6px ${o.color})` }}
          />
        </g>
      ))}
    </motion.svg>
  );
}

// --- CHEMISTRY: glowing flask ---
function ChemistryViz({ visible }: { visible: boolean }) {
  return (
    <motion.svg
      width="min(180px, 40vw)" height="min(180px, 40vw)"
      viewBox="0 0 180 180" fill="none"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.7 }}
      transition={{ duration: 0.8 }}
      style={{ marginBottom: "16px", overflow: "visible" }}
    >
      {/* Flask body */}
      <path
        d="M60 30 L60 80 L20 145 L160 145 L120 80 L120 30 Z"
        stroke="#ff6b35" strokeWidth="2.5" fill="rgba(255,107,53,0.06)"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 10px rgba(255,107,53,0.5))" }}
      />
      <line x1="46" y1="30" x2="134" y2="30" stroke="#ff6b35" strokeWidth="2.5" />
      {/* Liquid */}
      <motion.ellipse
        cx="90" cy="130" rx="50" ry="12"
        fill="rgba(255,107,53,0.25)"
        animate={{ ry: [10, 14, 10] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Bubbles */}
      {[
        { cx: 70, r: 5, color: "#ff6b35", delay: 0 },
        { cx: 90, r: 7, color: "#ffd700", delay: 0.4 },
        { cx: 110, r: 4, color: "#ff2d9b", delay: 0.8 },
      ].map((b, i) => (
        <motion.circle
          key={i} cx={b.cx} r={b.r} fill={b.color} opacity={0.7}
          animate={{ cy: [130, 90, 130], opacity: [0.7, 0.3, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, delay: b.delay, ease: "easeInOut" }}
          style={{ filter: `drop-shadow(0 0 4px ${b.color})` }}
        />
      ))}
    </motion.svg>
  );
}

export default function Scene3Departments({ elapsed }: Props) {
  // Timeline within 9000ms: 0-2.5s Computer, 2.5-5.5s Physics, 5.5-8s Chemistry, 8-9s Unity
  const showComputer   = elapsed >= 0;
  const showPhysics    = elapsed >= 2800;
  const showChemistry  = elapsed >= 5600;
  const showUnity      = elapsed >= 8000;
  const hideComputer   = elapsed >= 2800;
  const hidePhysics    = elapsed >= 5600;

  const depts = [
    { id: "computer",  name: "COMPUTER",   sub: "Digital Imagination",     color: "#00f0ff",   show: showComputer, hide: hideComputer,  Viz: ComputerViz },
    { id: "physics",   name: "PHYSICS",    sub: "The Universe in Motion",  color: "#bf5fff",   show: showPhysics,  hide: hidePhysics,   Viz: PhysicsViz  },
    { id: "chemistry", name: "CHEMISTRY",  sub: "The Science of Connection", color: "#ff6b35", show: showChemistry, hide: false,         Viz: ChemistryViz },
  ];

  const currentDept = !showPhysics ? depts[0] : !showChemistry ? depts[1] : depts[2];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(0,10,30,0.92) 0%, #000408 80%)",
        padding: "0 20px",
      }}
    >
      {/* Background glow for current dept */}
      <motion.div
        key={`${currentDept.id}-bg`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${currentDept.color}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Unity scene */}
      {showUnity ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          style={{ textAlign: "center" }}
        >
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(20px, 4vw, 48px)", marginBottom: "28px", flexWrap: "wrap" }}>
            {depts.map((d) => (
              <div key={d.id} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "var(--font-display)", fontWeight: 900,
                  fontSize: "clamp(1rem, 3vw, 1.8rem)",
                  color: d.color,
                  textShadow: `0 0 20px ${d.color}`,
                  letterSpacing: "0.05em",
                }} >{d.name}</div>
              </div>
            ))}
          </div>
          <div style={{
            fontFamily: "var(--font-display)", fontWeight: 900,
            fontSize: "clamp(1.3rem, 4vw, 2.8rem)",
            background: "linear-gradient(135deg, #00f0ff, #bf5fff, #ff6b35)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            letterSpacing: "0.05em", marginBottom: "12px",
          }}>
            THREE SCIENCES.
          </div>
          <div style={{
            fontFamily: "var(--font-display)", fontWeight: 900,
            fontSize: "clamp(1.3rem, 4vw, 2.8rem)",
            color: "#ffffff",
            textShadow: "0 0 30px rgba(255,255,255,0.2)",
            letterSpacing: "0.05em",
          }}>
            ONE CELEBRATION.
          </div>
        </motion.div>
      ) : (
        /* Single dept display */
        <motion.div
          key={currentDept.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <currentDept.Viz visible={currentDept.show && !currentDept.hide} />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 900,
              fontSize: "clamp(2rem, 7vw, 4.5rem)",
              color: currentDept.color,
              letterSpacing: "0.1em",
              textShadow: `0 0 30px ${currentDept.color}`,
              lineHeight: 1,
              marginBottom: "8px",
            }}>{currentDept.name}</h2>
            <p style={{
              fontFamily: "var(--font-display)", fontWeight: 400,
              fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.2em",
            }}>{currentDept.sub}</p>
          </motion.div>

          {/* Dept progress dots */}
          <div style={{ display: "flex", gap: "8px", marginTop: "28px" }}>
            {depts.map((d, i) => (
              <div key={d.id} style={{
                width: currentDept.id === d.id ? "24px" : "8px",
                height: "8px", borderRadius: "4px",
                background: currentDept.id === d.id ? d.color : "rgba(255,255,255,0.15)",
                transition: "all 0.3s ease",
              }} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
