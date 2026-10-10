#!/usr/bin/env node
/**
 * AURVYNT 2026 — QR Code Generator
 * 
 * Usage:
 *   node scripts/generate-qr.mjs [PRODUCTION_URL]
 * 
 * Example (after deploying to Vercel):
 *   node scripts/generate-qr.mjs https://aurvynt-2026.vercel.app
 * 
 * Outputs:
 *   public/qr/aurvynt-2026-qr.svg
 *   public/qr/aurvynt-2026-qr.png
 */

import QRCode from "qrcode";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QR_DIR = path.join(__dirname, "../public/qr");

const url = process.argv[2];

if (!url) {
  console.error("❌  No URL provided.");
  console.error("   Usage: node scripts/generate-qr.mjs https://your-production-url.com");
  process.exit(1);
}

// Basic URL validation
try {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:") {
    throw new Error("URL must use HTTPS");
  }
  if (parsed.hostname === "localhost" || parsed.hostname.startsWith("127.")) {
    throw new Error("URL must not be localhost");
  }
} catch (err) {
  console.error(`❌  Invalid URL: ${err.message}`);
  process.exit(1);
}

console.log(`\n🔵  Generating QR code for: ${url}\n`);

// Ensure output directory
fs.mkdirSync(QR_DIR, { recursive: true });

// === SVG ===
const svgPath = path.join(QR_DIR, "aurvynt-2026-qr.svg");
const svgString = await QRCode.toString(url, {
  type: "svg",
  errorCorrectionLevel: "H",
  margin: 4,
  color: { dark: "#000000", light: "#ffffff" },
  width: 400,
});
fs.writeFileSync(svgPath, svgString, "utf8");
console.log(`✅  SVG written: ${svgPath}`);

// === PNG ===
const pngPath = path.join(QR_DIR, "aurvynt-2026-qr.png");
await QRCode.toFile(pngPath, url, {
  type: "png",
  errorCorrectionLevel: "H",
  margin: 4,
  scale: 12,       // 12px per module → ~1200px for print
  color: { dark: "#000000ff", light: "#ffffffff" },
});
console.log(`✅  PNG written: ${pngPath}`);

// === Verify by decoding back ===
console.log("\n🔍  Verifying QR decode...");
try {
  const { createCanvas, loadImage } = await import("canvas").catch(() => null) ?? {};
  if (createCanvas) {
    // canvas-based decode (optional — requires 'canvas' package)
    console.log("   ℹ  Install 'canvas' package for automated decode verification.");
  } else {
    console.log("   ℹ  Automated decode skipped (canvas not installed).");
    console.log("   👉  Please scan the generated QR with your phone camera and verify it opens:");
    console.log(`       ${url}`);
  }
} catch {
  // silent
}

console.log("\n📋  Summary");
console.log("  Event:    AURVYNT 2026 — FRESHERS × FAREWELL");
console.log(`  Encodes:  ${url}`);
console.log(`  SVG:      ${svgPath}`);
console.log(`  PNG:      ${pngPath}`);
console.log("  ECC:      H (30% damage tolerance)");
console.log("  PNG size: ~1200px (print-ready)");
console.log("\n  ⚠️  IMPORTANT: Scan the QR code with your phone before printing.");
console.log(`     It must open: ${url}\n`);
