/**
 * Layer 1: Bangkok Skyline (Wat Saket Stupa, Mahanakhon Tower, Skyscraper Silhouettes)
 * Parallax Speed: 0.15x
 */

export function renderSkyline(ctx, scrollX, palette, tick, width, height) {
  const isNight = palette.name.includes("Night") || palette.name.includes("ราตรี");
  const groundY = 165;
  const loopWidth = 480;
  const effectiveScroll = (scrollX * 0.15) % loopWidth;

  // We draw 2 repeats to create seamless loop
  for (let rep = -1; rep <= 1; rep++) {
    const baseX = Math.floor(rep * loopWidth - effectiveScroll);

    // --- Silhouette Layer 1 (Far - Darker tone) ---
    ctx.fillStyle = palette.skyline2;

    // Building A: Baiyoke style tall telecom tower
    ctx.fillRect(baseX + 40, groundY - 110, 24, 110);
    ctx.fillRect(baseX + 46, groundY - 130, 12, 20);
    ctx.fillRect(baseX + 51, groundY - 150, 2, 20); // Spire
    // Blinking red aircraft light
    if (Math.floor(tick * 2) % 2 === 0) {
      ctx.fillStyle = "#ff0044";
      ctx.fillRect(baseX + 50, groundY - 152, 4, 3);
      ctx.fillStyle = palette.skyline2;
    }

    // Building B: Wide commercial block
    ctx.fillRect(baseX + 110, groundY - 75, 45, 75);

    // Building C: Stepped modern condo
    ctx.fillRect(baseX + 220, groundY - 95, 30, 95);
    ctx.fillRect(baseX + 225, groundY - 115, 20, 20);
    ctx.fillRect(baseX + 233, groundY - 128, 4, 13);

    // Building D: Telecom antenna tower
    ctx.fillRect(baseX + 380, groundY - 60, 28, 60);
    ctx.fillRect(baseX + 393, groundY - 80, 2, 20);

    // --- Silhouette Layer 2 (Mid-Far - slightly lighter tone) ---
    ctx.fillStyle = palette.skyline1;

    // Building E: Wat Saket (Phra Borommathat Chedi / Golden Mount)
    // Hill base
    ctx.beginPath();
    ctx.moveTo(baseX + 280, groundY);
    ctx.lineTo(baseX + 300, groundY - 35);
    ctx.lineTo(baseX + 335, groundY - 35);
    ctx.lineTo(baseX + 355, groundY);
    ctx.closePath();
    ctx.fill();
    // Chedi base & bell stupa
    ctx.fillRect(baseX + 310, groundY - 50, 15, 15);
    ctx.fillRect(baseX + 313, groundY - 62, 9, 12);
    // Spire
    ctx.fillRect(baseX + 316, groundY - 78, 3, 16);
    // Golden spire highlight
    ctx.fillStyle = palette.sun;
    ctx.fillRect(baseX + 316, groundY - 80, 3, 3);
    ctx.fillStyle = palette.skyline1;

    // Building F: Mahanakhon-style Pixelated Tower
    ctx.fillRect(baseX + 155, groundY - 125, 32, 125);
    // Stepped pixel cuts
    ctx.fillStyle = palette.skyline2;
    ctx.fillRect(baseX + 155, groundY - 85, 6, 8);
    ctx.fillRect(baseX + 160, groundY - 77, 7, 8);
    ctx.fillRect(baseX + 175, groundY - 60, 8, 8);
    ctx.fillRect(baseX + 170, groundY - 52, 6, 8);
    ctx.fillStyle = palette.skyline1;

    // Building G: Medium office blocks
    ctx.fillRect(baseX + 0, groundY - 65, 35, 65);
    ctx.fillRect(baseX + 70, groundY - 85, 30, 85);
    ctx.fillRect(baseX + 190, groundY - 70, 25, 70);
    ctx.fillRect(baseX + 420, groundY - 80, 40, 80);

    // Lit windows at night
    if (isNight) {
      ctx.fillStyle = "rgba(254, 240, 138, 0.7)";
      for (let wY = groundY - 110; wY < groundY - 20; wY += 12) {
        if ((wY + rep) % 3 === 0) {
          ctx.fillRect(baseX + 162, wY, 3, 4);
          ctx.fillRect(baseX + 172, wY, 3, 4);
        }
        if ((wY * 7) % 5 === 0) {
          ctx.fillRect(baseX + 75, wY + 30, 4, 3);
          ctx.fillRect(baseX + 85, wY + 30, 4, 3);
        }
        if ((wY * 13) % 4 === 0) {
          ctx.fillRect(baseX + 120, wY + 40, 3, 3);
          ctx.fillRect(baseX + 135, wY + 40, 3, 3);
        }
      }
      ctx.fillStyle = palette.skyline1;
    }
  }
}
