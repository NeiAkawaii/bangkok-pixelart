# Bangkok Soi Cozy Pixel-Art Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an authentic, multi-layered 16-bit Bangkok alleyway ("Cozy Bangkok Soi") pixel-art background featuring interactive parallax scrolling, three time-of-day lighting modes, animated street elements (Moo Ping grill smoke, idle motorcycle taxi), and high-resolution/layer-separated PNG asset exports.

**Architecture:** A standalone, responsive HTML5 Canvas pixel-art rendering engine running at a native 480×270 resolution with crisp integer scaling. The scene is split into 4 independent parallax layers with procedural pixel sprites, color palette lookups for lighting cycles, and a built-in canvas slicing engine for exporting game engine-ready assets.

**Tech Stack:** Modern Vanilla JavaScript (ES2022), HTML5 Canvas 2D API (`image-rendering: pixelated`), CSS Flexbox/Grid for UI controls.

**Spec:** [Design Specification in conversation context]

## Global Constraints

- **Native Resolution:** 480 × 270 px (16:9 aspect ratio).
- **Pixel Crispness:** All drawing operations must snap to integer pixel coordinates; no anti-aliased subpixel blurring.
- **Independence:** Self-contained without external CDN dependencies or heavy frameworks so it executes natively offline on Android Antigravity.
- **Asset Portability:** Exporter must yield transparent PNGs for individual layers (0, 1, 2, 3) and full composite frames at 1x, 2x, and 4x scale.

## Review Focus

1. **Pixel Alignment:** Ensure procedural sprite drawing doesn't produce blurred edges when scrolled or scaled.
2. **Layer Separation:** Ensure foreground, midground, skyline, and sky are isolated so each layer can be rendered and exported individually with transparency.
3. **Palette Cohesion:** Color harmonies across golden hour, noon, and neon night must preserve Bangkok vibe while maintaining legible contrasts.
4. **Performance:** RequestAnimationFrame loop must maintain steady 60fps on mobile/Android devices.
5. **Iconic Accuracy:** Ensure distinct Bangkok cultural elements (tangled overhead cables, orange vest motorcycle taxi, white-black curb, soi sign) are instantly recognizable in 16-bit detail.

---

### Task 1: Scaffolding and Pixel Engine Core

**Files:**
- Create: `/data/user/0/com.agy/files/.gemini/antigravity-app/scratch/bangkok-pixelart/index.html`
- Create: `/data/user/0/com.agy/files/.gemini/antigravity-app/scratch/bangkok-pixelart/engine.js`

- [ ] Set up HTML structure with viewport canvas (`480x270`), styling with `image-rendering: pixelated`, and control panel overlay.
- [ ] Implement `PixelEngine` class managing canvas rendering context, double buffering, resolution scaling, and high-frequency delta time.
- [ ] Implement palette system supporting 3 themes: `goldenHour`, `midday`, and `neonNight`.
- [ ] Verify test render displaying color swatches and test checkerboard pattern at native pixel resolution.

---

### Task 2: Layer 0 (Sky & Sun/Moon) and Layer 1 (Far Skyline)

**Files:**
- Create: `/data/user/0/com.agy/files/.gemini/antigravity-app/scratch/bangkok-pixelart/layers/sky.js`
- Create: `/data/user/0/com.agy/files/.gemini/antigravity-app/scratch/bangkok-pixelart/layers/skyline.js`

- [ ] Implement `SkyLayer` with dynamic vertical gradient, moving procedural clouds, and warm sun/moon glow.
- [ ] Implement `SkylineLayer` with silhouettes of modern Bangkok skyscrapers, telecom antennas, and Wat Saket (Golden Mount chedi) spires.
- [ ] Connect parallax horizontal translation (speed 0.05x for clouds, 0.15x for distant skyline).
- [ ] Test render with time-of-day switcher to verify smooth color transitions.

---

### Task 3: Layer 2 (Mid-ground Bangkok Shophouses & Iconic Tangled Wires)

**Files:**
- Create: `/data/user/0/com.agy/files/.gemini/antigravity-app/scratch/bangkok-pixelart/layers/shophouses.js`

- [ ] Implement procedural 3-story concrete shophouse facades with corrugated metal awnings, rusted security grilles, and drying laundry.
- [ ] Implement concrete utility poles with intricate tangled cable bundles (สายไฟ/สายสื่อสาร) running overhead across the screen.
- [ ] Add authentic street details: green Bangkok soi sign ("ซอย ๑"), convenience store neon awning, and a traditional Thai spirit house (ศาลพระภูมิ).
- [ ] Configure midground parallax scroll (speed 0.5x) with repeating seamless horizontal loop.

---

### Task 4: Layer 3 (Foreground Street Life, Win Motorcycle Taxi & Moo Ping Cart)

**Files:**
- Create: `/data/user/0/com.agy/files/.gemini/antigravity-app/scratch/bangkok-pixelart/layers/street.js`
- Create: `/data/user/0/com.agy/files/.gemini/antigravity-app/scratch/bangkok-pixelart/sprites.js`

- [ ] Render asphalt road with white-and-black curb stones and sidewalk textures.
- [ ] Draw Win Motorcycle Taxi stand with blue striped umbrella, scooter, and driver in iconic fluorescent orange vest with idle breathing animation.
- [ ] Draw traditional Moo Ping (grilled pork) street cart with charcoal grill, banana leaf trays, and animated rising smoke particle emitter.
- [ ] Add sleeping soi dog curled up peacefully beside the curb.
- [ ] Connect foreground layer to 1.0x parallax scroll.

---

### Task 5: Controls, Interactive Parallax Engine, and Game Asset Exporter

**Files:**
- Modify: `/data/user/0/com.agy/files/.gemini/antigravity-app/scratch/bangkok-pixelart/index.html`
- Create: `/data/user/0/com.agy/files/.gemini/antigravity-app/scratch/bangkok-pixelart/exporter.js`

- [ ] Build interactive UI: Auto-scroll toggle, speed slider, manual scroll bar, and time-of-day buttons.
- [ ] Implement PNG export function to capture composite frame at 1x (480x270), 2x (960x540), and 4x (1920x1080).
- [ ] Implement individual layer export (export Layer 0, 1, 2, and 3 as transparent PNGs).
- [ ] Test in web browser and verify all export functions and animation loops.
