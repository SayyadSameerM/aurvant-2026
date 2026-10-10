import { useEffect, useRef, useState, useCallback } from "react";

// ────────────────────────────────────────────────
// Scene definitions — adjust durations here ONLY
// ────────────────────────────────────────────────
export const SCENES = [
  { id: "awakening",   label: "Cosmic Awakening",   duration: 6000  },
  { id: "reveal",      label: "The Reveal",          duration: 6000  },
  { id: "departments", label: "Three Sciences",      duration: 9000  },
  { id: "festival",    label: "Festival Mode",       duration: 10000 },
  { id: "legacy",      label: "Two Generations",     duration: 8000  },
  { id: "details",     label: "Event Details",       duration: 7000  },
  { id: "finale",      label: "Grand Finale",        duration: 14000 },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

// Total runtime for display purposes
export const TOTAL_DURATION = SCENES.reduce((s, sc) => s + sc.duration, 0);

export interface UseSceneEngineReturn {
  currentScene: SceneId;
  sceneIndex: number;
  elapsed: number;           // ms into the current scene
  totalElapsed: number;      // ms since start
  isPlaying: boolean;
  isComplete: boolean;
  pause: () => void;
  resume: () => void;
  replay: () => void;
  seekToScene: (idx: number) => void;
  progressPct: number;       // 0–1 overall
}

export function useSceneEngine(): UseSceneEngineReturn {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const rafRef = useRef<number>(0);
  const lastTsRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const sceneIndexRef = useRef(0);
  const isPlayingRef = useRef(true);
  const isCompleteRef = useRef(false);

  const totalElapsedRef = useRef(0);
  const [totalElapsed, setTotalElapsed] = useState(0);

  const advance = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    lastTsRef.current = null;

    const tick = (ts: number) => {
      if (!isPlayingRef.current || isCompleteRef.current) return;

      if (lastTsRef.current === null) lastTsRef.current = ts;
      const delta = Math.min(ts - lastTsRef.current, 100); // cap delta to avoid giant jumps
      lastTsRef.current = ts;

      elapsedRef.current += delta;
      totalElapsedRef.current += delta;

      const sceneDuration = SCENES[sceneIndexRef.current].duration;

      if (elapsedRef.current >= sceneDuration) {
        const nextIdx = sceneIndexRef.current + 1;
        if (nextIdx >= SCENES.length) {
          // Final scene completed
          isCompleteRef.current = true;
          setIsComplete(true);
          setElapsed(sceneDuration);
          return;
        }
        elapsedRef.current = 0;
        sceneIndexRef.current = nextIdx;
        setSceneIndex(nextIdx);
      }

      setElapsed(elapsedRef.current);
      setTotalElapsed(totalElapsedRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    advance();
    return () => cancelAnimationFrame(rafRef.current);
  }, [advance]);

  const pause = useCallback(() => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    cancelAnimationFrame(rafRef.current);
    lastTsRef.current = null;
  }, []);

  const resume = useCallback(() => {
    if (isCompleteRef.current) return;
    isPlayingRef.current = true;
    setIsPlaying(true);
    advance();
  }, [advance]);

  const replay = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    isCompleteRef.current = false;
    isPlayingRef.current = true;
    sceneIndexRef.current = 0;
    elapsedRef.current = 0;
    totalElapsedRef.current = 0;
    lastTsRef.current = null;
    setIsComplete(false);
    setIsPlaying(true);
    setSceneIndex(0);
    setElapsed(0);
    setTotalElapsed(0);
    advance();
  }, [advance]);

  const seekToScene = useCallback((idx: number) => {
    if (idx < 0 || idx >= SCENES.length) return;
    cancelAnimationFrame(rafRef.current);
    sceneIndexRef.current = idx;
    elapsedRef.current = 0;
    lastTsRef.current = null;
    isCompleteRef.current = false;
    isPlayingRef.current = true;
    setSceneIndex(idx);
    setElapsed(0);
    setIsComplete(false);
    setIsPlaying(true);
    advance();
  }, [advance]);

  const progressPct = Math.min(totalElapsedRef.current / TOTAL_DURATION, 1);

  return {
    currentScene: SCENES[sceneIndex].id,
    sceneIndex,
    elapsed,
    totalElapsed,
    isPlaying,
    isComplete,
    pause,
    resume,
    replay,
    seekToScene,
    progressPct,
  };
}
