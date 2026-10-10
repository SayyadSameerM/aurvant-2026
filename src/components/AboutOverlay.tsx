import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Seminar Hall, Govt. Degree College, Mandapeta");

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "absolute",
          top: "clamp(12px, 3vh, 24px)",
          left: "clamp(12px, 3vw, 24px)",
          zIndex: 50,
          padding: "8px 16px",
          background: "rgba(0, 240, 255, 0.05)",
          border: "1px solid rgba(0, 240, 255, 0.3)",
          borderRadius: "100px",
          color: "#00f0ff",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(10px, 1.5vw, 12px)",
          fontWeight: 700,
          letterSpacing: "0.15em",
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 0 15px rgba(0, 240, 255, 0.15)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        ABOUT
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(2, 4, 14, 0.85)",
              backdropFilter: "blur(20px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <div style={{
              position: "relative",
              width: "100%",
              maxWidth: "600px",
              background: "linear-gradient(180deg, rgba(10, 0, 30, 0.9) 0%, rgba(0, 4, 15, 0.95) 100%)",
              border: "1px solid rgba(191, 95, 255, 0.2)",
              borderRadius: "20px",
              padding: "clamp(24px, 5vh, 48px) clamp(20px, 4vw, 40px)",
              boxShadow: "0 0 40px rgba(191, 95, 255, 0.1), inset 0 0 20px rgba(0, 240, 255, 0.05)",
              textAlign: "center",
              color: "#fff",
              fontFamily: "var(--font-body)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <h2 style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                background: "linear-gradient(135deg, #00f0ff, #bf5fff, #ff2d9b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "4px"
              }}>AURVYNT 2026</h2>
              
              <p style={{
                fontSize: "clamp(10px, 1.5vw, 14px)",
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "#ff2d9b",
                marginBottom: "16px"
              }}>FRESHERS × FAREWELL</p>

              <p style={{
                fontStyle: "italic",
                color: "rgba(255, 215, 0, 0.8)",
                fontSize: "clamp(12px, 2vw, 16px)",
                marginBottom: "32px",
                letterSpacing: "0.05em"
              }}>"Three Sciences. Two Generations. One Legacy."</p>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "24px",
                marginBottom: "32px",
                textAlign: "left"
              }}>
                <div>
                  <p style={{ fontSize: "10px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", marginBottom: "4px", fontWeight: 700 }}>EVENT DATE</p>
                  <p style={{ fontSize: "14px", color: "#00f0ff", fontWeight: 600 }}>Tuesday, 27 October 2026</p>
                </div>
                <div>
                  <p style={{ fontSize: "10px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", marginBottom: "4px", fontWeight: 700 }}>TIME</p>
                  <p style={{ fontSize: "14px", color: "#00f0ff", fontWeight: 600 }}>10:00 AM onwards</p>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <p style={{ fontSize: "10px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", marginBottom: "4px", fontWeight: 700 }}>VENUE</p>
                  <p style={{ fontSize: "14px", color: "#bf5fff", fontWeight: 600 }}>Seminar Hall<br/>Govt. Degree College<br/>Mandapeta</p>
                </div>
              </div>

              <div style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "32px"
              }}>
                <p style={{ fontSize: "10px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", marginBottom: "8px", fontWeight: 700 }}>DEPARTMENTS</p>
                <p style={{ fontSize: "13px", color: "#fff", letterSpacing: "0.05em" }}>Computer · Physics · Chemistry</p>
                <div style={{ margin: "12px 0", height: "1px", background: "rgba(255,255,255,0.1)" }}></div>
                <p style={{ fontSize: "10px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", marginBottom: "8px", fontWeight: 700 }}>WHAT TO EXPECT</p>
                <p style={{ fontSize: "13px", color: "#fff", letterSpacing: "0.05em" }}>Music · Dance · Games · Competitions · Fun · Memories</p>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  background: "rgba(0, 240, 255, 0.1)",
                  border: "1px solid rgba(0, 240, 255, 0.4)",
                  borderRadius: "100px",
                  color: "#00f0ff",
                  textDecoration: "none",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  transition: "all 0.2s"
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                OPEN LOCATION IN MAPS
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
