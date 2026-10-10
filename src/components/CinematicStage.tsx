import { motion, AnimatePresence } from "framer-motion";
import type { UseSceneEngineReturn } from "../hooks/useSceneEngine";
import Scene1Awakening from "./scenes/Scene1Awakening";
import Scene2Reveal from "./scenes/Scene2Reveal";
import Scene3Departments from "./scenes/Scene3Departments";
import Scene4Festival from "./scenes/Scene4Festival";
import Scene5Legacy from "./scenes/Scene5Legacy";
import Scene6Details from "./scenes/Scene6Details";
import Scene7Finale from "./scenes/Scene7Finale";

interface Props {
  engine: UseSceneEngineReturn;
}

// Shared transition config
const FADE: Record<string, object> = {
  initial:  { opacity: 0 },
  animate:  { opacity: 1 },
  exit:     { opacity: 0 },
};
const TRANSITION = { duration: 0.7, ease: "easeOut" as const };

export default function CinematicStage({ engine }: Props) {
  const { currentScene, elapsed, isComplete, sceneIndex } = engine;

  const baseProps = {
    elapsed,
    sceneIndex,
    FADE,
    TRANSITION,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="scene"
        key={currentScene}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={TRANSITION}
      >
        {currentScene === "awakening"   && <Scene1Awakening   {...baseProps} />}
        {currentScene === "reveal"      && <Scene2Reveal       {...baseProps} />}
        {currentScene === "departments" && <Scene3Departments  {...baseProps} />}
        {currentScene === "festival"    && <Scene4Festival     {...baseProps} />}
        {currentScene === "legacy"      && <Scene5Legacy       {...baseProps} />}
        {currentScene === "details"     && <Scene6Details      {...baseProps} />}
        {(currentScene === "finale" || isComplete) &&
          <Scene7Finale  {...baseProps} engine={engine} />
        }
      </motion.div>
    </AnimatePresence>
  );
}
