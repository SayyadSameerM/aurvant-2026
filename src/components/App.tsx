import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import "../styles/globals.css";
import { useSceneEngine } from "../hooks/useSceneEngine";
import CinematicStage from "./CinematicStage";
import PlaybackControls from "./PlaybackControls";
import CanvasBackground from "./CanvasBackground";
import AudioPlayer from "./AudioPlayer";
import AboutOverlay from "./AboutOverlay";
import Countdown from "./Countdown";

export default function App() {
  const engine = useSceneEngine();

  return (
    <div className="stage" role="main">
      <AudioPlayer isPlaying={engine.isPlaying} />
      <AboutOverlay />
      <Countdown />
      {/* Ambient canvas — always behind everything */}
      <CanvasBackground sceneIndex={engine.sceneIndex} />

      <CinematicStage engine={engine} />

      {/* Floating playback controls — unobtrusive */}
      <PlaybackControls engine={engine} />
    </div>
  );
}
