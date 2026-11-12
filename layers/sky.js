/**
 * Layer 0: Sky, Sun/Moon, and Drifting Clouds
 */

// Procedural pixel cloud template (width 48, height 18)
const CLOUD_SHAPES = [
  {
    x: 30, y: 35, speed: 1.2, scale: 1.0,
    rows: [
      ".......##########.......",
      ".....##############.....",
      "...##################...",
      "..####################..",
      ".######################.",
      "########################",
      "########################",
      ".######################.",
      "....################...."
    ]
  },
  {
    x: 180, y: 20, speed: 0.9, scale: 1.3,
    rows: [
      "..........##############..........",
      "........##################........",
      ".....########################.....",
      "...############################...",
      "..##############################..",
      ".################################.",
      "##################################",
      "##################################",
      "..##############################..",
      ".....########################....."
    ]
  },
  {
    x: 340, y: 48, speed: 1.5, scale: 0.9,
    rows: [
      ".....########.....",
      "...############...",
      "..##############..",
      ".################.",
      "##################",
      "##################",
      ".################."
    ]
  }
];

export function renderSky(ctx, scrollX, palette, tick, width, height) {
  // 1. Sky Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, height * 0.75);
  grad.addColorStop(0, palette.skyTop);
  grad.addColorStop(0.45, palette.skyMid);
  grad.addColorStop(1, palette.skyBottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // 2. Sun / Moon
  const isNight = palette.name.includes("Night") || palette.name.includes("ราตรี");
  const sunX = width * 0.72 - (scrollX * 0.02) % width;
  const sunY = 52;
  const sunR = isNight ? 14 : 18;

  // Outer glow
  ctx.fillStyle = palette.sunGlow;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunR + 10, 0, Math.PI * 2);
  ctx.fill();

  // Core disk
  ctx.fillStyle = palette.sun;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
  ctx.fill();

  if (isNight) {
    // Moon craters in pixel art
    ctx.fillStyle = palette.cloudShadow;
    ctx.fillRect(sunX - 5, sunY - 4, 3, 3);
    ctx.fillRect(sunX + 2, sunY + 2, 4, 3);
    ctx.fillRect(sunX - 2, sunY + 5, 2, 2);
  }

  // 3. Clouds (Drifting smoothly across screen)
  CLOUD_SHAPES.forEach((c) => {
    const cloudOffset = (c.x + tick * c.speed * 4 - scrollX * 0.05) % (width + 120);
    const drawX = Math.floor(cloudOffset < -60 ? cloudOffset + width + 120 : cloudOffset);
    const drawY = Math.floor(c.y);

    c.rows.forEach((row, rIdx) => {
      for (let cIdx = 0; cIdx < row.length; cIdx++) {
        if (row[cIdx] === "#") {
          const px = drawX + cIdx * 2;
          const py = drawY + rIdx * 2;
          if (px >= -4 && px < width + 4) {
            // Highlights on top, shadow on bottom
            if (rIdx < 2) {
              ctx.fillStyle = palette.cloudLight;
            } else if (rIdx > row.length - 3) {
              ctx.fillStyle = palette.cloudShadow;
            } else {
              ctx.fillStyle = palette.cloudBase;
            }
            ctx.fillRect(px, py, 2, 2);
          }
        }
      }
    });
  });
}
