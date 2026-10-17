import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import html2canvas from "html2canvas";
import { EVENT } from "../../config/event";
import type { UseSceneEngineReturn } from "../../hooks/useSceneEngine";
import FireworksCelebration from "../FireworksCelebration";

interface Props {
  elapsed: number;
  sceneIndex: number;
  engine: UseSceneEngineReturn;
}

function generateTicketId(): string {
  const alpha = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const prefix = Array.from({ length: 3 }, () => alpha[Math.floor(Math.random() * alpha.length)]).join("");
  const nums = String(Math.floor(Math.random() * 90000) + 10000);
  return `AV26-${prefix}-${nums}`;
}

export default function Scene7Finale({ elapsed, engine }: Props) {
  const [ticketId] = useState(generateTicketId);
  const [ticketName, setTicketName] = useState("");
  const [isCut, setIsCut] = useState(false);
  const [cutProgress, setCutProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const mainTicketControls = useAnimation();
  const stubControls = useAnimation();
  
  const displayName = ticketName.trim() === "" ? "SPECIAL GUEST" : ticketName.trim().toUpperCase();

  // Timeline within 14000ms:
  // 0-2s: crown + YOU'RE INVITED reveal
  // 2-5s: AURVYNT 2026 identity + tagline
  // 5-7s: ticket outline animates in
  // 7+s: ticket fully visible, input and interaction enabled
  const showInvited   = elapsed >= 500;
  const showIdentity  = elapsed >= 2000;
  const showTagline   = elapsed >= 3000;
  const showTicket    = elapsed >= 5000;
  const inputActive   = elapsed >= 7000 && !isCut;

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!inputActive || isCut) return;
    setIsDragging(true);
    // @ts-ignore
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isCut) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    // Calculate progress based on Y movement relative to the ticket height
    const yPos = e.clientY - rect.top;
    const progress = Math.max(0, Math.min(1, yPos / rect.height));
    setCutProgress(progress);
    
    if (progress > 0.85) {
      completeCut();
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging || isCut) return;
    setIsDragging(false);
    // @ts-ignore
    e.target.releasePointerCapture(e.pointerId);
    
    if (cutProgress > 0.85) {
      completeCut();
    } else {
      // Snap back
      setCutProgress(0);
    }
  };

  const completeCut = () => {
    setIsDragging(false);
    setIsCut(true);
    setCutProgress(1);
    
    // Trigger separation animation
    mainTicketControls.start({
      x: -40,
      y: -20,
      rotateZ: -5,
      opacity: 0,
      scale: 0.9,
      transition: { duration: 1.2, ease: "easeInOut", delay: 0.2 }
    });
    
    stubControls.start({
      x: 40,
      y: 20,
      rotateZ: 5,
      opacity: 0,
      scale: 0.9,
      transition: { duration: 1.2, ease: "easeInOut", delay: 0.2 }
    });
  };

  const handleDownload = useCallback(async () => {
    if (exporting) return;
    setExporting(true);
    try {
      const el = document.getElementById("aurvynt-ticket-export") as HTMLElement;
      if (!el) throw new Error("Ticket not found");
      // Ensure it's briefly visible if it was hidden by cut animation
      const originalDisplay = el.style.display;
      el.style.display = "flex";
      
      const canvas = await html2canvas(el, { 
        scale: 3, 
        useCORS: true, 
        backgroundColor: "#020412",
        logging: false 
      });
      
      el.style.display = originalDisplay;
      
      const a = document.createElement("a");
      a.download = `AURVYNT-2026-TICKET-${ticketId}.png`;
      a.href = canvas.toDataURL("image/png", 1.0);
      a.click();
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setExporting(false);
    }
  }, [ticketId, exporting]);

  const handleShare = async () => {
    const text = `✨ You're invited to AURVYNT 2026 — FRESHERS × FAREWELL!\n"Three Sciences. Two Generations. One Legacy."\n📅 Tuesday, 27 October 2026 · 10:00 AM\n📍 Seminar Hall, Govt. Degree College, Mandapeta`;
    if (navigator.share) {
      try { await navigator.share({ title: "AURVYNT 2026", text }); } catch { /* cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch { alert(text); }
    }
  };

  const resetExperience = () => {
    setIsCut(false);
    setCutProgress(0);
    setTicketName("");
    mainTicketControls.set({ x: 0, y: 0, rotateZ: 0, opacity: 1, scale: 1 });
    stubControls.set({ x: 0, y: 0, rotateZ: 0, opacity: 1, scale: 1 });
    engine.replay();
  };

  // Background particle burst when cut completes
  const particles = Array.from({ length: 20 });

  return (
    <div
      style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(0,0,40,0.95) 0%, rgba(0,4,20,0.98) 60%, #000408 100%)",
        padding: "0 clamp(12px,4vw,40px)",
        overflow: "hidden",
      }}
    >
      {/* Background stage beams */}
      {!isCut && (
        <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          viewBox="0 0 100 100" preserveAspectRatio="none">
          {[8, 20, 35, 50, 65, 80, 92].map((x, i) => (
            <motion.line key={i} x1="50" y1="110" x2={`${x}%`} y2="0"
              stroke={["rgba(0,240,255,", "rgba(191,95,255,", "rgba(255,45,155,", "rgba(255,215,0,",
                        "rgba(0,240,255,", "rgba(255,45,155,", "rgba(191,95,255,"][i] + "0.1)"}
              strokeWidth="0.5"
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 3, delay: i * 0.25, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          <ellipse cx="50" cy="105" rx="45" ry="10" fill="rgba(0,240,255,0.05)" />
        </svg>
      )}

      {/* Expanding ring burst at start */}
      {!isCut && [280, 420, 580].map((r, i) => (
        <motion.div key={i}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{ width: r * 2, height: r * 2, opacity: [0, 0.25, 0] }}
          transition={{ duration: 2, delay: 0.3 + i * 0.3, ease: [0.23, 1, 0.32, 1] }}
          aria-hidden="true"
          style={{
            position: "absolute", borderRadius: "50%",
            border: `1.5px solid ${["#00f0ff", "#bf5fff", "#ff2d9b"][i]}`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Fireworks & Celebration Canvas */}
      <FireworksCelebration isActive={isCut} />

      {/* Welcome State (After Cut) */}
      <AnimatePresence>
        {isCut && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 30,
              textAlign: "center",
              padding: "20px",
            }}
          >
            {/* Cut particles */}
            {particles.map((_, i) => (
              <motion.div
                key={`p-${i}`}
                initial={{ opacity: 1, x: 0, y: 0, scale: Math.random() * 2 + 1 }}
                animate={{ 
                  opacity: 0, 
                  x: (Math.random() - 0.5) * 600, 
                  y: (Math.random() - 0.5) * 600 + 200 
                }}
                transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
                style={{
                  position: "absolute",
                  width: "4px", height: "4px",
                  borderRadius: "50%",
                  background: ["#00f0ff", "#bf5fff", "#ff2d9b", "#ffd700"][i % 4],
                  boxShadow: `0 0 10px ${["#00f0ff", "#bf5fff", "#ff2d9b", "#ffd700"][i % 4]}`,
                  pointerEvents: "none"
                }}
              />
            ))}

            {/* Celebratory VIP Badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 220 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "100px",
                background: "rgba(255, 215, 0, 0.12)",
                border: "1px solid rgba(255, 215, 0, 0.4)",
                boxShadow: "0 0 20px rgba(255, 215, 0, 0.25)",
                marginBottom: "14px",
              }}
            >
              <span>🎉</span>
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(9px, 1.3vw, 11px)",
                fontWeight: 800,
                letterSpacing: "0.2em",
                color: "#ffd700",
                textShadow: "0 0 10px rgba(255, 215, 0, 0.5)"
              }}>
                CELEBRATION UNLOCKED · OFFICIAL VIP
              </span>
              <span>✨</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="60" height="48" viewBox="0 0 80 64" fill="none" style={{ filter: "drop-shadow(0 0 20px #00f0ff) drop-shadow(0 0 40px rgba(191,95,255,0.6))", marginBottom: "16px" }}>
                <defs>
                  <linearGradient id="wel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f0ff"/><stop offset="50%" stopColor="#fff"/><stop offset="100%" stopColor="#ff2d9b"/>
                  </linearGradient>
                </defs>
                <path d="M4 52 L14 10 L26 30 L40 3 L54 30 L66 10 L76 52 Z" fill="url(#wel-grad)" opacity="0.95"/>
                <rect x="4" y="52" width="72" height="9" rx="4.5" fill="url(#wel-grad)" opacity="0.9"/>
                <circle cx="40" cy="18" r="4" fill="#ffd700" opacity="0.9"/>
              </svg>
            </motion.div>

            <h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 900,
              fontSize: "clamp(1.5rem, 5vw, 3rem)",
              color: "#fff",
              textShadow: "0 0 20px rgba(0, 240, 255, 0.6), 0 0 40px rgba(191, 95, 255, 0.3)",
              marginBottom: "8px",
              lineHeight: 1.1,
              maxWidth: "800px"
            }}>
              {ticketName.trim() ? `WELCOME TO AURVYNT 2026, ${ticketName.trim().toUpperCase()}!` : "WELCOME TO AURVYNT 2026!"}
            </h1>
            
            <p style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              background: "linear-gradient(135deg, #00f0ff, #fff, #bf5fff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              marginBottom: "16px",
              letterSpacing: "0.1em"
            }}>
              {ticketName.trim() ? "YOU'RE PART OF THE STORY NOW." : "YOUR NEXT UNFORGETTABLE MEMORY STARTS HERE."}
            </p>

            <p style={{
              fontFamily: "var(--font-display)", fontStyle: "italic",
              fontSize: "clamp(0.8rem, 2vw, 1rem)",
              color: "rgba(255, 215, 0, 0.85)",
              letterSpacing: "0.08em",
              marginBottom: "32px",
              textShadow: "0 0 10px rgba(255, 215, 0, 0.3)"
            }}>
              "Three Sciences. Two Generations. One Legacy."
            </p>

            <div style={{ display: "flex", gap: "clamp(12px, 2vw, 20px)", justifyContent: "center", flexWrap: "wrap", zIndex: 35 }}>
              <button onClick={handleDownload} disabled={exporting} style={btnStyle("#00f0ff", "rgba(0,240,255,0.15)")}>
                {exporting ? "SAVING..." : "⬇ SAVE TICKET"}
              </button>
              <button onClick={handleShare} style={btnStyle("#ffd700", "rgba(255,215,0,0.15)")}>
                {copied ? "✓ COPIED!" : "📤 SHARE INVITATION"}
              </button>
              <button onClick={resetExperience} style={btnStyle("rgba(255,255,255,0.8)", "rgba(255,255,255,0.08)")}>
                ↺ REPLAY EXPERIENCE
              </button>
            </div>

            {/* Interactive fireworks tap prompt */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(8px, 1.2vw, 11px)",
                letterSpacing: "0.15em",
                color: "rgba(0, 240, 255, 0.8)",
                marginTop: "24px",
                textShadow: "0 0 10px rgba(0, 240, 255, 0.4)",
                pointerEvents: "none"
              }}
            >
              ✨ TAP ANYWHERE ON SCREEN TO LAUNCH FIREWORKS ✨
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HIDDEN TICKET FOR EXPORT */}
      <div style={{ position: "fixed", top: "-9999px", left: "-9999px" }}>
        <div id="aurvynt-ticket-export" style={{
          position: "relative", width: "800px", height: "340px", display: "flex",
          background: "#020516", borderRadius: "16px", overflow: "hidden",
          border: "2px solid #00f0ff", boxShadow: "0 0 40px rgba(0,240,255,0.2) inset",
          fontFamily: "sans-serif"
        }}>
          <div style={{ flex: 1, padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ color: "#00f0ff", fontSize: "24px", fontWeight: 900, letterSpacing: "0.2em", margin: 0 }}>AURVYNT 2026</p>
              <p style={{ color: "#ff2d9b", fontSize: "16px", fontWeight: 700, letterSpacing: "0.15em", margin: "4px 0 0 0" }}>FRESHERS × FAREWELL</p>
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", letterSpacing: "0.2em", margin: "0 0 8px 0" }}>INVITEE</p>
              <p style={{ color: "#fff", fontSize: "42px", fontWeight: 900, margin: 0, textShadow: "0 0 20px rgba(255,255,255,0.4)" }}>{displayName}</p>
            </div>
            <div style={{ display: "flex", gap: "32px" }}>
              <div><p style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px", letterSpacing: "0.15em", margin: "0 0 4px 0" }}>DATE</p><p style={{ color: "#00f0ff", fontSize: "16px", fontWeight: 700, margin: 0 }}>27 OCT 2026</p></div>
              <div><p style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px", letterSpacing: "0.15em", margin: "0 0 4px 0" }}>TIME</p><p style={{ color: "#bf5fff", fontSize: "16px", fontWeight: 700, margin: 0 }}>10:00 AM</p></div>
              <div><p style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px", letterSpacing: "0.15em", margin: "0 0 4px 0" }}>VENUE</p><p style={{ color: "#ff2d9b", fontSize: "16px", fontWeight: 700, margin: 0 }}>SEMINAR HALL</p></div>
            </div>
          </div>
          <div style={{ width: "25%", borderLeft: "3px dashed rgba(255,255,255,0.3)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "24px", background: "linear-gradient(135deg, #050a1a 0%, #020516 100%)" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.2em", margin: 0 }}>SOUVENIR TICKET</p>
            <p style={{ color: "#ffd700", fontSize: "12px", fontWeight: 800, marginTop: "24px", textAlign: "center", margin: "24px 0 0 0" }}>NOT FOR ENTRY</p>
          </div>
        </div>
      </div>

      {/* Main Ticket UI (Before Cut) */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", width: "100%", display: isCut ? "none" : "block" }}>
        
        {showInvited && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(0.7rem, 2vw, 0.9rem)", letterSpacing: "0.3em", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>
              ✦ YOU'RE INVITED ✦
            </p>
          </motion.div>
        )}

        {showIdentity && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2rem, 6vw, 3.5rem)", background: "linear-gradient(135deg, #00f0ff, #fff, #bf5fff, #ff2d9b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 0.9, letterSpacing: "-0.02em", marginBottom: "6px" }}>
              AURVYNT 2026
            </div>
          </motion.div>
        )}

        {/* Name Input Area */}
        {showTicket && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ marginBottom: "clamp(12px, 3vh, 24px)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
          >
            <label style={{ fontFamily: "var(--font-display)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: "#bf5fff" }}>
              MAKE THIS TICKET YOURS
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={ticketName}
              onChange={(e) => setTicketName(e.target.value)}
              disabled={isCut}
              style={{
                background: "rgba(0, 0, 20, 0.6)",
                border: "1px solid rgba(0, 240, 255, 0.4)",
                borderRadius: "100px",
                padding: "10px 20px",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                textAlign: "center",
                width: "min(100%, 300px)",
                outline: "none",
                boxShadow: "0 0 15px rgba(0, 240, 255, 0.1) inset, 0 0 20px rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(10px)"
              }}
            />
          </motion.div>
        )}

        {/* Premium Ticket */}
        <div style={{ display: "flex", justifyContent: "center", width: "100%", perspective: "1000px" }}>
          {showTicket && (
            <motion.div
              ref={containerRef}
              initial={{ scale: 0.5, opacity: 0, rotateX: 30 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              style={{
                position: "relative",
                width: "min(700px, 92vw)",
                height: "auto",
                aspectRatio: "21 / 9",
                display: "flex",
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
                userSelect: "none",
                touchAction: "none"
              }}
            >


              {/* MAIN TICKET SECTION */}
              <motion.div
                animate={mainTicketControls}
                style={{
                  flex: 1,
                  background: "linear-gradient(135deg, #020516 0%, #0a0520 50%, #020516 100%)",
                  borderRadius: "16px 0 0 16px",
                  border: "1px solid rgba(0, 240, 255, 0.4)",
                  borderRight: "none",
                  boxShadow: "0 0 30px rgba(0, 240, 255, 0.15) inset, 0 10px 30px rgba(0,0,0,0.5)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "clamp(12px, 2.5vw, 24px)",
                  textAlign: "left"
                }}
              >
                {/* Visual Glare */}
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "40%", background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)", pointerEvents: "none" }} />
                
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 2 }}>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(14px, 2.5vw, 24px)", color: "#00f0ff", letterSpacing: "0.1em", lineHeight: 1 }}>AURVYNT 2026</h3>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(8px, 1.2vw, 12px)", color: "#ff2d9b", letterSpacing: "0.15em" }}>FRESHERS × FAREWELL</p>
                  </div>
                  <div style={{ opacity: 0.8 }}>
                    <svg width="clamp(24px, 4vw, 40px)" height="auto" viewBox="0 0 80 64" fill="none">
                      <path d="M4 52 L14 10 L26 30 L40 3 L54 30 L66 10 L76 52 Z" fill="#00f0ff" opacity="0.6"/>
                      <rect x="4" y="52" width="72" height="9" rx="4.5" fill="#00f0ff" opacity="0.8"/>
                    </svg>
                  </div>
                </div>

                {/* Name */}
                <div style={{ position: "relative", zIndex: 2 }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(6px, 1vw, 10px)", color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", marginBottom: "4px", fontWeight: 700 }}>INVITEE</p>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(18px, 4vw, 36px)", color: "#fff", textShadow: "0 0 10px rgba(255,255,255,0.3)", lineHeight: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "90%" }}>
                    {displayName}
                  </p>
                </div>

                {/* Details Footer */}
                <div style={{ display: "flex", gap: "clamp(8px, 2vw, 24px)", position: "relative", zIndex: 2 }}>
                  <div>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(5px, 0.8vw, 8px)", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", marginBottom: "2px" }}>DATE</p>
                    <p style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "clamp(8px, 1.2vw, 12px)", color: "#00f0ff" }}>27 OCT 2026</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(5px, 0.8vw, 8px)", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", marginBottom: "2px" }}>TIME</p>
                    <p style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "clamp(8px, 1.2vw, 12px)", color: "#bf5fff" }}>10:00 AM</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(5px, 0.8vw, 8px)", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", marginBottom: "2px" }}>VENUE</p>
                    <p style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "clamp(8px, 1.2vw, 12px)", color: "#ff2d9b" }}>SEMINAR HALL</p>
                  </div>
                </div>
              </motion.div>

              {/* PERFORATED LINE (INTERACTIVE) */}
              <div 
                style={{ 
                  width: "24px", 
                  position: "relative", 
                  zIndex: 10, 
                  cursor: isCut ? "default" : "grab",
                  display: "flex",
                  justifyContent: "center",
                  background: "transparent"
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                {/* The actual dashed line visual */}
                <div style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  borderLeft: "2px dashed rgba(255,255,255,0.3)",
                  boxShadow: "0 0 10px rgba(0, 240, 255, 0.2)"
                }} />

                {/* Progress glow / cut effect */}
                {!isCut && (
                  <div style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    top: 0,
                    width: "6px",
                    height: `${cutProgress * 100}%`,
                    background: "rgba(0, 240, 255, 0.8)",
                    boxShadow: "0 0 20px #00f0ff, 0 0 40px #bf5fff",
                    transition: isDragging ? "none" : "height 0.3s easeOut",
                    pointerEvents: "none",
                    borderRadius: "4px"
                  }}>
                    {/* Spark particle at the tip */}
                    {cutProgress > 0 && cutProgress < 1 && (
                      <div style={{
                        position: "absolute",
                        bottom: "-4px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "12px",
                        height: "12px",
                        background: "#fff",
                        borderRadius: "50%",
                        boxShadow: "0 0 15px #fff, 0 0 30px #00f0ff"
                      }} />
                    )}
                  </div>
                )}
                
                {/* Instruction Tooltip */}
                {!isCut && cutProgress === 0 && (
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                      position: "absolute",
                      top: "20%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "rgba(191, 95, 255, 0.9)",
                      color: "#fff",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(8px, 1vw, 10px)",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      pointerEvents: "none",
                      boxShadow: "0 0 10px rgba(191,95,255,0.5)"
                    }}
                  >
                    ↓ SWIPE TO CUT
                  </motion.div>
                )}
              </div>

              {/* DETACHABLE STUB */}
              <motion.div
                animate={stubControls}
                style={{
                  width: "26%",
                  background: "linear-gradient(135deg, #020516 0%, #050a1a 100%)",
                  borderRadius: "0 16px 16px 0",
                  border: "1px solid rgba(191, 95, 255, 0.3)",
                  borderLeft: "none",
                  boxShadow: "0 0 30px rgba(191, 95, 255, 0.1) inset, 0 10px 30px rgba(0,0,0,0.5)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "clamp(8px, 1.5vw, 16px)",
                }}
              >
                <div style={{ textAlign: "center", width: "100%" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(5px, 0.8vw, 8px)", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", marginBottom: "2px", fontWeight: 700 }}>ID</p>
                  <p style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "clamp(6px, 1vw, 10px)", color: "#bf5fff", wordBreak: "break-all" }}>{ticketId}</p>
                </div>
                
                <p style={{
                  fontFamily: "var(--font-display)", fontSize: "clamp(6px, 1vw, 10px)", color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.2em", writingMode: "vertical-rl", transform: "rotate(180deg)", fontWeight: 700,
                  margin: "auto 0"
                }}>
                  COMPUTER · PHYSICS · CHEMISTRY
                </p>

                <div style={{ textAlign: "center", background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", padding: "4px", borderRadius: "4px", width: "100%" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(4px, 0.6vw, 7px)", color: "#ffd700", fontWeight: 700, letterSpacing: "0.1em" }}>JUST FOR FUN</p>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(4px, 0.6vw, 7px)", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>NOT FOR ENTRY</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Accessible Cut Button Fallback */}
        {showTicket && !isCut && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
            <button
              onClick={completeCut}
              style={{
                marginTop: "20px",
                padding: "8px 16px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "100px",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "var(--font-display)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              ✂ CUT MY TICKET
            </button>
          </motion.div>
        )}

        {/* Disclaimer */}
        {showTicket && !isCut && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            style={{ fontSize: "clamp(8px, 1.2vw, 11px)", color: "rgba(255,255,255,0.3)", marginTop: "24px", letterSpacing: "0.05em" }}>
            Commemorative digital souvenir · Not an official admission credential
          </motion.p>
        )}
      </div>
    </div>
  );
}

// Helper for button styles
function btnStyle(color: string, bg: string) {
  return {
    padding: "clamp(10px, 2vh, 14px) clamp(20px, 4vw, 32px)",
    borderRadius: "100px",
    border: `1px solid ${color.replace(')', ', 0.4)').replace('1)', '0.4)')}`,
    background: bg,
    color: color.includes("rgba") ? "#fff" : color,
    fontFamily: "var(--font-display)",
    fontWeight: 700 as const,
    fontSize: "clamp(10px, 1.5vw, 14px)",
    letterSpacing: "0.12em",
    cursor: "pointer",
    backdropFilter: "blur(8px)",
    transition: "all 0.2s",
    boxShadow: `0 0 20px ${bg}`
  };
}
