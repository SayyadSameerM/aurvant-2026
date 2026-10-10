import { useEffect, useRef } from "react";

// ──────────────────────────────────────────────────────
// Animated canvas background that adapts per-scene
// ──────────────────────────────────────────────────────

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number; alpha: number;
  alphaDir: number; color: string;
}

const SCENE_PALETTES: string[][] = [
  ["rgba(0,240,255,",   "rgba(0,100,255,",   "rgba(191,95,255,"],   // awakening
  ["rgba(0,240,255,",   "rgba(255,45,155,",  "rgba(191,95,255,"],   // reveal
  ["rgba(0,240,255,",   "rgba(191,95,255,",  "rgba(255,107,53,"],   // departments
  ["rgba(255,45,155,",  "rgba(0,255,136,",   "rgba(255,215,0,"],    // festival
  ["rgba(191,95,255,",  "rgba(255,215,0,",   "rgba(255,255,255,"],  // legacy
  ["rgba(255,215,0,",   "rgba(0,240,255,",   "rgba(191,95,255,"],   // details
  ["rgba(255,215,0,",   "rgba(0,240,255,",   "rgba(255,45,155,"],   // finale
];

interface Props { sceneIndex: number; }

export default function CanvasBackground({ sceneIndex }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const sceneRef = useRef(sceneIndex);

  useEffect(() => { sceneRef.current = sceneIndex; }, [sceneIndex]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = prefersReduced ? 0 : Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 14000));

    particlesRef.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.15,
      radius: Math.random() * 1.8 + 0.4,
      alpha: Math.random(),
      alphaDir: Math.random() > 0.5 ? 0.006 : -0.006,
      color: SCENE_PALETTES[0][Math.floor(Math.random() * 3)],
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const palette = SCENE_PALETTES[Math.min(sceneRef.current, SCENE_PALETTES.length - 1)];

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaDir;
        if (p.alpha <= 0 || p.alpha >= 1) p.alphaDir *= -1;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Slowly drift color toward current scene palette
        if (Math.random() < 0.002) {
          p.color = palette[Math.floor(Math.random() * palette.length)];
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha.toFixed(2)})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.55,
      }}
    />
  );
}
