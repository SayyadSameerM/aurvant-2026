import { useEffect, useRef } from "react";

interface Props {
  isActive: boolean;
}

// Vibrant festival color palette matching AURVYNT 2026
const FIREWORK_COLORS = [
  "#00f0ff", // Neon Cyan
  "#ff2d9b", // Hot Magenta
  "#ffd700", // Radiant Gold
  "#bf5fff", // Electric Purple
  "#00ff88", // Neon Emerald
  "#ff6b35", // Warm Orange
  "#ffffff", // Brilliant White
];

const CONFETTI_COLORS = [
  "#00f0ff",
  "#ff2d9b",
  "#ffd700",
  "#bf5fff",
  "#00ff88",
  "#ffffff",
];

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
  gravity: number;
  friction: number;
  trail: Array<{ x: number; y: number }>;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  secondaryColor: string;
  type: "sphere" | "ring" | "willow" | "multi";
  trail: Array<{ x: number; y: number }>;
}

interface Flash {
  x: number;
  y: number;
  color: string;
  radius: number;
  alpha: number;
}

interface Confetti {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  aspect: number;
  color: string;
  angleX: number;
  angleY: number;
  angleZ: number;
  vAngleX: number;
  vAngleY: number;
  vAngleZ: number;
  wobble: number;
  wobbleSpeed: number;
}

export default function FireworksCelebration({ isActive }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let nextRocketTimeout: number;
    const salvoTimeouts: number[] = [];

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    window.addEventListener("resize", handleResize);

    const rockets: Rocket[] = [];
    const sparks: Spark[] = [];
    const flashes: Flash[] = [];
    const confettiList: Confetti[] = [];
    const MAX_SPARKS = 460;

    // Initialize fluttering celebratory confetti pieces
    const confettiCount = Math.min(48, Math.floor(window.innerWidth / 22));
    for (let i = 0; i < confettiCount; i++) {
      const isRibbon = Math.random() > 0.55;
      confettiList.push({
        x: Math.random() * width,
        y: Math.random() * height * 1.3 - height * 0.3,
        vx: (Math.random() - 0.5) * 1.4 * dpr,
        vy: (Math.random() * 1.8 + 1.2) * dpr,
        size: (isRibbon ? Math.random() * 6 + 7 : Math.random() * 4 + 4) * dpr,
        aspect: isRibbon ? Math.random() * 0.3 + 0.2 : Math.random() * 0.7 + 0.5,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        angleX: Math.random() * Math.PI * 2,
        angleY: Math.random() * Math.PI * 2,
        angleZ: Math.random() * Math.PI * 2,
        vAngleX: (Math.random() * 0.06 + 0.02) * (Math.random() > 0.5 ? 1 : -1),
        vAngleY: (Math.random() * 0.06 + 0.02) * (Math.random() > 0.5 ? 1 : -1),
        vAngleZ: (Math.random() * 0.04 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.05 + 0.02,
      });
    }

    // Launch a rocket to target coordinates
    const launchRocket = (
      startX: number,
      targetX: number,
      targetY: number,
      customColor?: string,
      customType?: "sphere" | "ring" | "willow" | "multi"
    ) => {
      if (rockets.length >= 4) return; // Prevent excess rockets

      const color =
        customColor ||
        FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
      const secColor =
        FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
      const types: Array<"sphere" | "ring" | "willow" | "multi"> = [
        "sphere",
        "willow",
        "sphere",
        "multi",
        "ring",
      ];
      const type = customType || types[Math.floor(Math.random() * types.length)];

      const dx = targetX - startX;
      const dy = targetY - height;
      const speed = (Math.random() * 2 + 13.5) * dpr;
      const angle = Math.atan2(dy, dx);

      rockets.push({
        x: startX,
        y: height,
        targetY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        secondaryColor: secColor,
        type,
        trail: [],
      });
    };

    // Detonate rocket into massive, sky-filling fireworks particles
    const explode = (
      x: number,
      y: number,
      color: string,
      secondaryColor: string,
      type: "sphere" | "ring" | "willow" | "multi"
    ) => {
      // Big atmospheric ambient flash that illuminates the whole scene
      if (flashes.length < 3) {
        flashes.push({
          x,
          y,
          color,
          radius: (Math.random() * 150 + 320) * dpr,
          alpha: 0.35,
        });
      }

      // Generous spark count for big, grand aerial shells
      const sparkCount =
        type === "willow"
          ? 90
          : type === "ring"
          ? 80
          : type === "multi"
          ? 100
          : 95;

      // Cull oldest sparks if approaching budget
      if (sparks.length + sparkCount > MAX_SPARKS) {
        sparks.splice(0, sparks.length + sparkCount - MAX_SPARKS);
      }

      for (let i = 0; i < sparkCount; i++) {
        let angle = Math.random() * Math.PI * 2;
        let speed = 0;
        let decay = Math.random() * 0.008 + 0.011; // Lingers longer to expand huge!
        let gravity = 0.065 * dpr;
        let friction = 0.976; // High friction keeps sparks travelling far across the sky!
        let size = (Math.random() * 1.6 + 2.2) * dpr;
        let sparkColor = color;

        if (type === "sphere") {
          // Massive 360° spherical blast expanding wide
          speed = (Math.random() * 8.5 + 4.2) * dpr;
          sparkColor = Math.random() > 0.35 ? color : secondaryColor;
        } else if (type === "ring") {
          // Grand double concentric shockwave ring
          const isOuter = i % 2 === 0;
          angle = (i / sparkCount) * Math.PI * 2;
          speed = isOuter ? (Math.random() * 0.6 + 8.8) * dpr : (Math.random() * 0.6 + 4.8) * dpr;
          sparkColor = isOuter ? color : secondaryColor;
          size = (Math.random() * 1.5 + 2.0) * dpr;
        } else if (type === "willow") {
          // Giant golden willow rain cascading down like Disney fireworks
          speed = (Math.random() * 7.5 + 3.2) * dpr;
          gravity = 0.085 * dpr;
          decay = Math.random() * 0.006 + 0.009; // Stays glowing as it cascades
          friction = 0.98;
          sparkColor = Math.random() > 0.25 ? "#ffd700" : "#ffffff";
          size = (Math.random() * 1.5 + 1.8) * dpr;
        } else if (type === "multi") {
          // Massive rainbow blast in all directions
          speed = (Math.random() * 9.5 + 3.5) * dpr;
          sparkColor =
            FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
        }

        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: sparkColor,
          alpha: 1,
          decay,
          size,
          gravity,
          friction,
          trail: [],
        });
      }
    };

    // Initial celebratory salvo: 4 massive shells staggered
    const initialSalvo = () => {
      launchRocket(width * 0.22, width * 0.24, height * 0.22, "#00f0ff", "sphere");
      salvoTimeouts.push(
        window.setTimeout(() => {
          launchRocket(width * 0.78, width * 0.74, height * 0.20, "#ff2d9b", "sphere");
        }, 160)
      );
      salvoTimeouts.push(
        window.setTimeout(() => {
          launchRocket(width * 0.5, width * 0.5, height * 0.15, "#ffd700", "willow");
        }, 380)
      );
      salvoTimeouts.push(
        window.setTimeout(() => {
          launchRocket(width * 0.38, width * 0.42, height * 0.25, "#bf5fff", "multi");
        }, 620)
      );
    };

    initialSalvo();

    // Rhythmic continuous launch cadence for big aerial shells (every 650-950ms)
    const scheduleNextRocket = () => {
      const delay = Math.random() * 300 + 650;
      nextRocketTimeout = window.setTimeout(() => {
        const startX = width * (0.15 + Math.random() * 0.7);
        const targetX = width * (0.12 + Math.random() * 0.76);
        const targetY = height * (0.14 + Math.random() * 0.28);
        launchRocket(startX, targetX, targetY);
        scheduleNextRocket();
      }, delay);
    };
    scheduleNextRocket();

    // Interactive taps: clicking anywhere fires an instant big aerial shell
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("button") || target.closest("input") || target.closest("a"))
      ) {
        return;
      }
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const targetX = clientX * dpr;
      const targetY = clientY * dpr;
      const startX = targetX + (Math.random() - 0.5) * 60 * dpr;
      launchRocket(startX, targetX, targetY, undefined, Math.random() > 0.4 ? "sphere" : "multi");
    };
    window.addEventListener("pointerdown", handlePointerDown);

    // Ultra-smooth 60 FPS Render Loop (No expensive shadowBlur!)
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Render ambient light flashes (additive blend)
      ctx.globalCompositeOperation = "lighter";
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        f.alpha -= 0.022;
        if (f.alpha <= 0) {
          flashes.splice(i, 1);
          continue;
        }
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
        grad.addColorStop(0, f.color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.globalAlpha = f.alpha;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Render rising rockets and trails
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 6) r.trail.shift();

        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.07 * dpr; // slight gravity

        // Rocket trail line
        if (r.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(r.trail[0].x, r.trail[0].y);
          for (let t = 1; t < r.trail.length; t++) {
            ctx.lineTo(r.trail[t].x, r.trail[t].y);
          }
          ctx.strokeStyle = r.color;
          ctx.lineWidth = 2.6 * dpr;
          ctx.globalAlpha = 0.9;
          ctx.stroke();
        }

        // Rocket head spark
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = 1;
        ctx.fill();

        // Check if rocket reached apex
        if (r.y <= r.targetY || r.vy >= 0) {
          explode(r.x, r.y, r.color, r.secondaryColor, r.type);
          rockets.splice(i, 1);
        }
      }

      // 3. Render exploding sparks with glowing trails
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 6) s.trail.shift();

        s.vx *= s.friction;
        s.vy *= s.friction;
        s.vy += s.gravity;
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        // Spark trail
        if (s.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(s.trail[0].x, s.trail[0].y);
          for (let t = 1; t < s.trail.length; t++) {
            ctx.lineTo(s.trail[t].x, s.trail[t].y);
          }
          ctx.strokeStyle = s.color;
          ctx.lineWidth = s.size * 1.1;
          ctx.globalAlpha = s.alpha * 0.72;
          ctx.stroke();
        }

        // Spark head
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      // 4. Render fluttering celebratory confetti (crisp 3D tumbling)
      ctx.globalCompositeOperation = "source-over";
      for (let i = 0; i < confettiList.length; i++) {
        const c = confettiList[i];
        c.wobble += c.wobbleSpeed;
        c.x += c.vx + Math.sin(c.wobble) * 0.8 * dpr;
        c.y += c.vy;
        c.angleX += c.vAngleX;
        c.angleY += c.vAngleY;
        c.angleZ += c.vAngleZ;

        // Wrap around bottom
        if (c.y > height + 20 * dpr) {
          c.y = -20 * dpr;
          c.x = Math.random() * width;
          c.vy = (Math.random() * 1.8 + 1.2) * dpr;
        }

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.angleZ);
        ctx.scale(Math.cos(c.angleX), Math.sin(c.angleY));

        ctx.fillStyle = c.color;
        ctx.fillRect(-c.size / 2, (-c.size * c.aspect) / 2, c.size, c.size * c.aspect);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerdown", handlePointerDown);
      clearTimeout(nextRocketTimeout);
      salvoTimeouts.forEach((id) => clearTimeout(id));
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        pointerEvents: "none",
        zIndex: 25,
      }}
    />
  );
}
