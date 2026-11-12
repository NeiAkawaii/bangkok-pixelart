/**
 * Bangkok Soi Pixel Engine
 * Native retro resolution: 480x270 (16:9)
 */

export const PALETTES = {
  goldenHour: {
    name: "Golden Hour (แดดร่มลมตก)",
    skyTop: "#e26d5c",
    skyMid: "#f4a261",
    skyBottom: "#ffe3a8",
    sun: "#fff3b0",
    sunGlow: "rgba(255, 235, 170, 0.35)",
    cloudLight: "#fff4e6",
    cloudBase: "#e8998d",
    cloudShadow: "#b36a5e",
    skyline1: "#7a4e65",
    skyline2: "#5c334d",
    shophouseWall1: "#c98a68",
    shophouseWall2: "#9e624c",
    shophouseRoof: "#4a3b32",
    wireColor: "#2b1e1a",
    poleColor: "#807065",
    neonGreen: "#48cae4",
    neonOrange: "#ff7b00",
    roadColor: "#3d3434",
    roadMarking: "#e9c46a",
    curbWhite: "#ede0d4",
    curbBlack: "#252020",
    vestOrange: "#ff6f00",
    smokeParticle: "rgba(255, 240, 220, 0.75)"
  },
  midday: {
    name: "Midday (แดดบ่ายสดใส)",
    skyTop: "#3a86ff",
    skyMid: "#60a5fa",
    skyBottom: "#bae6fd",
    sun: "#ffffff",
    sunGlow: "rgba(255, 255, 255, 0.4)",
    cloudLight: "#ffffff",
    cloudBase: "#cbd5e1",
    cloudShadow: "#94a3b8",
    skyline1: "#64748b",
    skyline2: "#475569",
    shophouseWall1: "#e2e8f0",
    shophouseWall2: "#94a3b8",
    shophouseRoof: "#334155",
    wireColor: "#0f172a",
    poleColor: "#64748b",
    neonGreen: "#10b981",
    neonOrange: "#f97316",
    roadColor: "#334155",
    roadMarking: "#fde047",
    curbWhite: "#f8fafc",
    curbBlack: "#1e293b",
    vestOrange: "#ea580c",
    smokeParticle: "rgba(241, 245, 249, 0.7)"
  },
  neonNight: {
    name: "Neon Night (ราตรีกรุงเทพฯ)",
    skyTop: "#0b091a",
    skyMid: "#1a1235",
    skyBottom: "#2f1b4e",
    sun: "#fef08a", // Moon
    sunGlow: "rgba(254, 240, 138, 0.25)",
    cloudLight: "#3f2d59",
    cloudBase: "#251838",
    cloudShadow: "#140c21",
    skyline1: "#1d1430",
    skyline2: "#120a1f",
    shophouseWall1: "#3b2d54",
    shophouseWall2: "#231838",
    shophouseRoof: "#13091f",
    wireColor: "#08040d",
    poleColor: "#2a1e3d",
    neonGreen: "#00f5d4",
    neonOrange: "#ff007f",
    roadColor: "#15101f",
    roadMarking: "#ffd166",
    curbWhite: "#94a3b8",
    curbBlack: "#0f0b17",
    vestOrange: "#ff5400",
    smokeParticle: "rgba(224, 170, 255, 0.6)"
  }
};

export class PixelEngine {
  constructor(canvas, width = 480, height = 270) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false });
    this.width = width;
    this.height = height;

    // Offscreen render buffer for crisp pixel scaling
    this.buffer = document.createElement("canvas");
    this.buffer.width = width;
    this.buffer.height = height;
    this.bctx = this.buffer.getContext("2d", { willReadFrequently: true });
    this.bctx.imageSmoothingEnabled = false;

    // Viewport scaling
    this.canvas.imageSmoothingEnabled = false;

    // State
    this.timeOfDay = "goldenHour";
    this.palette = PALETTES[this.timeOfDay];
    this.scrollX = 0;
    this.scrollSpeed = 24; // pixels per second at 1.0x
    this.autoScroll = true;
    this.layers = [];
    this.layerVisibility = [true, true, true, true]; // L0, L1, L2, L3

    this.lastTime = 0;
    this.tick = 0;
    this.isRunning = false;
  }

  setTimeOfDay(timeKey) {
    if (PALETTES[timeKey]) {
      this.timeOfDay = timeKey;
      this.palette = PALETTES[timeKey];
    }
  }

  addLayer(renderFn) {
    this.layers.push(renderFn);
  }

  start() {
    this.isRunning = true;
    this.lastTime = performance.now();
    const loop = (currentTime) => {
      if (!this.isRunning) return;
      const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1);
      this.lastTime = currentTime;
      this.update(dt);
      this.render();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  stop() {
    this.isRunning = false;
  }

  update(dt) {
    this.tick += dt;
    if (this.autoScroll) {
      this.scrollX = (this.scrollX + this.scrollSpeed * dt) % (this.width * 4);
    }
  }

  render() {
    const ctx = this.bctx;
    ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.layers.length; i++) {
      if (this.layerVisibility[i]) {
        ctx.save();
        this.layers[i](ctx, this.scrollX, this.palette, this.tick, this.width, this.height);
        ctx.restore();
      }
    }

    // Blit offscreen buffer to display canvas
    const displayCtx = this.ctx;
    displayCtx.imageSmoothingEnabled = false;
    displayCtx.drawImage(
      this.buffer,
      0, 0, this.width, this.height,
      0, 0, this.canvas.width, this.canvas.height
    );
  }

  // Render a specific isolated layer for export
  renderSingleLayer(layerIndex) {
    const layerCanvas = document.createElement("canvas");
    layerCanvas.width = this.width;
    layerCanvas.height = this.height;
    const lctx = layerCanvas.getContext("2d");
    lctx.imageSmoothingEnabled = false;

    if (this.layers[layerIndex]) {
      this.layers[layerIndex](lctx, this.scrollX, this.palette, this.tick, this.width, this.height);
    }
    return layerCanvas;
  }
}
