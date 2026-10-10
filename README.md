# AURVYNT 2026 — Invitation Website

**FRESHERS × FAREWELL**  
*Three Sciences. Two Generations. One Legacy.*

An immersive, cinematic invitation website for AURVYNT 2026 at Govt. Degree College, Mandapeta.

---

## Project Structure

```
AURVYNT-2026/
├── public/
│   ├── favicon.svg
│   └── qr/                    # QR codes go here after generation
│       ├── AURVYNT-2026-qr.svg
│       └── AURVYNT-2026-qr.png
├── scripts/
│   └── generate-qr.mjs        # QR generation script
├── src/
│   ├── config/
│   │   └── event.ts           # ⭐ Single source of truth for all event facts
│   ├── styles/
│   │   └── globals.css        # Design tokens + base styles
│   ├── components/
│   │   ├── ParticleField.tsx  # Ambient canvas particles
│   │   ├── CrownSVG.tsx       # Reusable crown motif
│   │   ├── HeroScene.tsx      # Scene 1 — Cinematic arrival
│   │   ├── RevealScene.tsx    # Scene 2 — Invitation reveal
│   │   ├── DepartmentsScene.tsx # Scene 3 — Three sciences
│   │   ├── ActivitiesScene.tsx  # Scene 4 — Festival activities
│   │   ├── StoryScene.tsx     # Scene 5 — Emotional story
│   │   ├── EventDetailsScene.tsx # Scene 6 — Details + countdown
│   │   ├── FinaleScene.tsx    # Scene 7 — Grand finale
│   │   └── TicketGenerator.tsx  # Optional fun ticket creator
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
└── package.json
```

---

## Quick Start

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

### Build for production
```bash
npm run build
```
Output goes to `dist/`.

### Preview production build locally
```bash
npm run preview
```

---

## Deployment

### Option A — Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in the project directory
3. Follow prompts (framework: Vite, output: `dist`)
4. Note the production URL (e.g. `https://AURVYNT-2026.vercel.app`)

Add a `vercel.json` for SPA routing:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

### Option B — Netlify

1. Build: `npm run build`
2. Drag and drop the `dist/` folder at app.netlify.com/drop
3. Note the production URL

Add a `_redirects` file in `public/`:
```
/* /index.html 200
```

### Option C — Cloudflare Pages

1. Connect GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `dist`

---

## Configuring the Canonical URL

Open `src/config/event.ts` and update:

```ts
productionUrl: "https://your-actual-url.here",
```

This value is used by the QR generator.

---

## Generating the Real QR Code

> ⚠️ **Only generate the QR code after the site is deployed and publicly accessible.**

```bash
node scripts/generate-qr.mjs https://your-production-url.com
```

This outputs:
- `public/qr/AURVYNT-2026-qr.svg` — vector format
- `public/qr/AURVYNT-2026-qr.png` — ~1200px, print-ready

### Verification

After generation, **scan the PNG with your phone camera** and confirm it opens the correct URL. The script prints the verification instructions.

---

## Replacing the QR on the Original Poster

1. Generate the verified QR PNG as described above.
2. In your poster design tool (Canva, Photoshop, Illustrator, etc.), replace the existing QR placeholder with `public/qr/AURVYNT-2026-qr.png`.
3. Preserve the quiet zone (white border) around the QR.
4. Do not resize below 3×3 cm (1.2×1.2 inches) for reliable scanning.
5. Add the label "SCAN TO KNOW EVENT DETAILS" outside the quiet zone.

---

## Ticket Generator

The optional ticket creator allows visitors to generate a personalized digital souvenir.

**Features:**
- Optional name field
- Live ticket preview
- PNG download (high-res via html2canvas)
- Print/PDF via browser dialog
- Native share (mobile) with clipboard fallback
- Clearly labeled as "JUST FOR FUN — NOT REQUIRED FOR ENTRY"

No personal data is transmitted or stored.

---

## Event Configuration

All official event facts live in `src/config/event.ts`.  
**Never scatter event details across multiple files.**

If any detail changes, update it in `event.ts` only.

---

## Testing Checklist

- [ ] Mobile viewport (360px) — title readable, no overflow
- [ ] Modern smartphone — all sections visible
- [ ] Tablet — layout adapts cleanly
- [ ] Desktop 1440px — full experience
- [ ] Countdown calculates correctly for IST (UTC+5:30)
- [ ] Event-day message shows on 27 Oct 2026
- [ ] Post-event message shows after 27 Oct 2026
- [ ] Ticket generates without a name
- [ ] PNG export contains full design
- [ ] Print dialog opens correctly
- [ ] Share/copy fallback works
- [ ] Map link opens correctly
- [ ] Reduced-motion mode functional
- [ ] Keyboard navigation works
- [ ] No horizontal scroll on mobile
- [ ] QR code scans to verified URL

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Animation | Framer Motion |
| Icons | Custom SVG |
| Ticket export | html2canvas |
| QR generation | qrcode (Node) |

---

*© 2026 AURVYNT — Govt. Degree College, Mandapeta*
