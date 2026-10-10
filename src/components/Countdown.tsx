import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // 27 October 2026 10:00 AM IST (UTC+5:30)
    const targetDate = new Date("2026-10-27T10:00:00+05:30").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setHasStarted(true);
        setTimeLeft(null);
      } else {
        setHasStarted(false);
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((diff % (1000 * 60)) / 1000)
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: "absolute",
      top: "clamp(12px, 3vh, 24px)",
      right: "clamp(12px, 3vw, 24px)",
      zIndex: 50,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: "4px",
      pointerEvents: "none"
    }}>
      <p style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(8px, 1.2vw, 10px)",
        fontWeight: 700,
        letterSpacing: "0.2em",
        color: "rgba(255, 255, 255, 0.5)",
        textTransform: "uppercase"
      }}>
        {hasStarted ? "Status" : "AURVYNT STARTS IN"}
      </p>
      
      <div style={{
        display: "flex",
        gap: "6px",
        background: "rgba(0, 0, 20, 0.6)",
        border: "1px solid rgba(191, 95, 255, 0.2)",
        padding: "6px 12px",
        borderRadius: "8px",
        backdropFilter: "blur(8px)",
        boxShadow: "0 0 10px rgba(191, 95, 255, 0.1)"
      }}>
        {hasStarted ? (
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(12px, 1.8vw, 14px)",
            fontWeight: 700,
            color: "#00f0ff",
            letterSpacing: "0.05em",
            textShadow: "0 0 8px rgba(0, 240, 255, 0.4)"
          }}>THE CELEBRATION BEGINS!</span>
        ) : timeLeft ? (
          <>
            <TimeUnit value={timeLeft.d} label="D" color="#00f0ff" />
            <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 700 }}>:</span>
            <TimeUnit value={timeLeft.h} label="H" color="#bf5fff" />
            <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 700 }}>:</span>
            <TimeUnit value={timeLeft.m} label="M" color="#ff2d9b" />
            <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 700 }} className="desktop-only">:</span>
            <TimeUnit value={timeLeft.s} label="S" color="#ffd700" hideMobile />
          </>
        ) : null}
      </div>
    </div>
  );
}

function TimeUnit({ value, label, color, hideMobile }: { value: number; label: string; color: string; hideMobile?: boolean }) {
  const displayValue = value.toString().padStart(2, "0");
  
  return (
    <div style={{
      alignItems: "baseline",
      gap: "2px",
      display: hideMobile ? "none" : "flex"
    }} className={hideMobile ? "desktop-only-flex" : ""}>
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: "clamp(12px, 1.8vw, 16px)",
        fontWeight: 700,
        color: "#fff",
        letterSpacing: "0.05em",
        width: "2ch"
      }}>{displayValue}</span>
      <span style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(8px, 1vw, 10px)",
        fontWeight: 700,
        color: color
      }}>{label}</span>
      <style>{`
        @media (min-width: 600px) {
          .desktop-only { display: inline !important; }
          .desktop-only-flex { display: flex !important; }
        }
        @media (max-width: 599px) {
          .desktop-only, .desktop-only-flex { display: none !important; }
        }
      `}</style>
    </div>
  );
}
