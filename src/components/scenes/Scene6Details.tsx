import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EVENT } from "../../config/event";

// ──────────────────────────────────────────────────────────────────────
// SCENE 6 — THE EVENT REVEAL (39–46 s)
// Major cinematic reveal of all official event details + countdown
// ──────────────────────────────────────────────────────────────────────

interface Props { elapsed: number; sceneIndex: number; }

function getTimeLeft() {
  const target = new Date(EVENT.date.targetISO).getTime();
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    expired: false,
  };
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ textAlign: "center", minWidth: "clamp(44px, 10vw, 64px)" }}>
      <div style={{
        fontFamily: "var(--font-display)", fontWeight: 900,
        fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
        color: "#00f0ff",
        textShadow: "0 0 16px rgba(0,240,255,0.6)",
        lineHeight: 1,
      }}>
        {String(value).padStart(2, "0")}
      </div>
      <div style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", fontWeight: 600, marginTop: "4px" }}>
        {label}
      </div>
    </div>
  );
}

export default function Scene6Details({ elapsed }: Props) {
  const [time, setTime] = useState(getTimeLeft);
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  // Staggered reveal of each info item
  const show = {
    title:    elapsed >= 200,
    type:     elapsed >= 800,
    divider:  elapsed >= 1200,
    date:     elapsed >= 1600,
    time:     elapsed >= 2200,
    venue:    elapsed >= 2800,
    college:  elapsed >= 3200,
    countdown: elapsed >= 4000,
    maplink:  elapsed >= 5200,
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,20,60,0.9) 0%, rgba(0,4,20,0.95) 60%, #000408 100%)",
        padding: "0 clamp(16px, 5vw, 60px)",
      }}
    >
      {/* Beams */}
      <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        viewBox="0 0 100 100" preserveAspectRatio="none">
        {[15, 35, 50, 65, 85].map((x, i) => (
          <motion.line key={i} x1="50" y1="110" x2={`${x}%`} y2="0"
            stroke={["rgba(255,215,0,", "rgba(0,240,255,", "rgba(191,95,255,", "rgba(0,240,255,", "rgba(255,215,0,"][i] + "0.1)"}
            strokeWidth="0.5"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
        <ellipse cx="50" cy="105" rx="40" ry="8" fill="rgba(255,215,0,0.04)" />
      </svg>

      {/* Central glowing panel */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "relative", zIndex: 2,
          textAlign: "center",
          padding: "clamp(20px, 5vh, 40px) clamp(24px, 6vw, 60px)",
          borderRadius: "20px",
          background: "rgba(0,15,40,0.7)",
          border: "1px solid rgba(255,215,0,0.15)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 0 60px rgba(255,215,0,0.06), 0 0 120px rgba(0,240,255,0.04)",
          maxWidth: "min(640px, 92vw)",
          width: "100%",
        }}
      >
        {/* AURVYNT 2026 */}
        {show.title && (
          <motion.div {...fadeUp(0)}>
            <div style={{
              fontFamily: "var(--font-display)", fontWeight: 900,
              fontSize: "clamp(1.8rem, 7vw, 4rem)",
              background: "linear-gradient(135deg, #00f0ff, #ffffff 40%, #bf5fff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              letterSpacing: "-0.01em", lineHeight: 0.95,
            }}>AURVYNT 2026</div>
          </motion.div>
        )}

        {/* FRESHERS × FAREWELL */}
        {show.type && (
          <motion.div {...fadeUp(0)}>
            <div style={{
              fontFamily: "var(--font-display)", fontWeight: 400,
              fontSize: "clamp(0.75rem, 2.5vw, 1rem)",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.5)",
              marginTop: "4px",
              marginBottom: "clamp(10px, 2vh, 16px)",
            }}>FRESHERS × FAREWELL</div>
          </motion.div>
        )}

        {/* Divider */}
        {show.divider && (
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.4), transparent)",
              marginBottom: "clamp(10px, 2.5vh, 20px)",
            }}
          />
        )}

        {/* Date */}
        {show.date && (
          <motion.div {...fadeUp(0)} style={{ marginBottom: "clamp(6px, 1.5vh, 10px)" }}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.35)", fontWeight: 600, marginBottom: "3px" }}>DATE</div>
            <div style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(1rem, 3.5vw, 1.6rem)",
              color: "#ffd700",
              textShadow: "0 0 20px rgba(255,215,0,0.4)",
              letterSpacing: "0.05em",
            }}>
              {EVENT.date.display}
            </div>
          </motion.div>
        )}

        {/* Time */}
        {show.time && (
          <motion.div {...fadeUp(0)} style={{ marginBottom: "clamp(6px, 1.5vh, 10px)" }}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.35)", fontWeight: 600, marginBottom: "3px" }}>TIME</div>
            <div style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "clamp(0.95rem, 3vw, 1.3rem)",
              color: "#00f0ff",
              letterSpacing: "0.1em",
            }}>
              {EVENT.date.time}
            </div>
          </motion.div>
        )}

        {/* Venue */}
        {show.venue && (
          <motion.div {...fadeUp(0)} style={{ marginBottom: "clamp(10px, 2.5vh, 18px)" }}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.35)", fontWeight: 600, marginBottom: "3px" }}>VENUE</div>
            <div style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(1rem, 3.5vw, 1.5rem)",
              color: "#bf5fff",
              letterSpacing: "0.08em",
            }}>
              {EVENT.venue.hall}
            </div>
            {show.college && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ fontSize: "clamp(0.7rem, 2vw, 0.85rem)", color: "rgba(255,255,255,0.45)", marginTop: "2px" }}
              >
                {EVENT.venue.college}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Countdown */}
        {show.countdown && (
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", fontWeight: 600, marginBottom: "10px" }}>
              COUNTDOWN TO AURVYNT 2026
            </div>
            {time.expired ? (
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
                color: "#ffd700",
              }}>🎉 The celebration has arrived!</div>
            ) : (
              <div
                style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "clamp(8px, 2vw, 16px)" }}
                aria-label={`${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds remaining`}
              >
                <CountUnit value={time.days} label="DAYS" />
                <span style={{ color: "rgba(0,240,255,0.4)", fontSize: "clamp(1.2rem, 3vw, 2rem)", alignSelf: "flex-start", paddingTop: "2px" }}>:</span>
                <CountUnit value={time.hours} label="HRS" />
                <span style={{ color: "rgba(0,240,255,0.4)", fontSize: "clamp(1.2rem, 3vw, 2rem)", alignSelf: "flex-start", paddingTop: "2px" }}>:</span>
                <CountUnit value={time.minutes} label="MIN" />
                <span style={{ color: "rgba(0,240,255,0.4)", fontSize: "clamp(1.2rem, 3vw, 2rem)", alignSelf: "flex-start", paddingTop: "2px" }}>:</span>
                <CountUnit value={time.seconds} label="SEC" />
              </div>
            )}
          </motion.div>
        )}

        {/* Map link */}
        {show.maplink && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ marginTop: "clamp(12px, 2.5vh, 20px)" }}
          >
            <a
              href={EVENT.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 20px",
                borderRadius: "100px",
                border: "1px solid rgba(191,95,255,0.3)",
                color: "#bf5fff",
                textDecoration: "none",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(0.65rem, 1.5vw, 0.78rem)",
                letterSpacing: "0.15em",
                background: "rgba(191,95,255,0.06)",
                backdropFilter: "blur(4px)",
                transition: "all 0.3s",
              }}
            >
              📍 OPEN VENUE MAP
            </a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
