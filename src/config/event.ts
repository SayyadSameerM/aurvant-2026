// ============================================================
// AURVYNT 2026 — Central Event Configuration
// All official event facts live here. Never scatter them.
// ============================================================

export const EVENT = {
  name: "AURVYNT 2026",
  type: "FRESHERS × FAREWELL",
  tagline: "Three Sciences. Two Generations. One Legacy.",
  date: {
    display: "TUESDAY, 27 OCTOBER 2026",
    short: "27 OCT 2026",
    iso: "2026-10-27",
    timezone: "Asia/Kolkata",
    time: "10:00 AM ONWARDS",
    // Target timestamp for countdown — 27 Oct 2026, 10:00 AM IST
    targetISO: "2026-10-27T10:00:00+05:30",
  },
  venue: {
    hall: "SEMINAR HALL",
    college: "GOVT. DEGREE COLLEGE, MANDAPETA",
    mapUrl:
      "https://www.google.com/maps/search/Govt+Degree+College+Mandapeta+Seminar+Hall",
  },
  departments: [
    {
      id: "computer",
      name: "COMPUTER",
      subtitle: "Digital Imagination",
      description: "Where logic becomes art, and code shapes entire universes.",
      accent: "#00f0ff",
      glow: "#00c8ff44",
    },
    {
      id: "physics",
      name: "PHYSICS",
      subtitle: "The Universe in Motion",
      description: "From the quantum to the cosmic — the science of everything.",
      accent: "#bf5fff",
      glow: "#a040ff44",
    },
    {
      id: "chemistry",
      name: "CHEMISTRY",
      subtitle: "The Science of Connection",
      description: "Every reaction, every bond, every breakthrough — starts here.",
      accent: "#ff6b35",
      glow: "#ff6b3544",
    },
  ],
  activities: [
    { id: "music", name: "MUSIC", emoji: "🎵", color: "#00f0ff" },
    { id: "dance", name: "DANCE", emoji: "💃", color: "#ff2d9b" },
    { id: "games", name: "GAMES", emoji: "🎮", color: "#00ff88" },
    { id: "competitions", name: "COMPETITIONS", emoji: "🏆", color: "#ffd700" },
    { id: "fun", name: "FUN", emoji: "🎉", color: "#bf5fff" },
    { id: "memories", name: "MEMORIES", emoji: "📸", color: "#ff6b35" },
  ],
  phrases: [
    "New People, New Vibes, New Stories, Same Dreams...",
    "Different Journeys, Same Sky",
    "Learn, Create, Explore, Belong",
    "Grow, Connect, Celebrate, Forever",
    "Let's Make It UNFORGETTABLE!",
  ],
  // Update this after deployment, then run: node scripts/generate-qr.mjs <URL>
  productionUrl: "https://aurvynt-2026.vercel.app",
};

export type Department = (typeof EVENT.departments)[number];
export type Activity = (typeof EVENT.activities)[number];
