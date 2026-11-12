/**
 * Layer 2: Mid-ground Bangkok Shophouses & Iconic Tangled Wires
 * Parallax Speed: 0.5x
 */

export function renderShophouses(ctx, scrollX, palette, tick, width, height) {
  const isNight = palette.name.includes("Night") || palette.name.includes("ราตรี");
  const streetY = 205;
  const loopWidth = 480;
  const effectiveScroll = (scrollX * 0.5) % loopWidth;

  for (let rep = -1; rep <= 1; rep++) {
    const baseX = Math.floor(rep * loopWidth - effectiveScroll);

    // ==========================================
    // 1. Shophouse Block 1 (Left: 3-Story Commercial)
    // ==========================================
    const sh1X = baseX + 10;
    const sh1W = 140;
    const sh1H = 150;
    const sh1Top = streetY - sh1H;

    // Main wall
    ctx.fillStyle = palette.shophouseWall1;
    ctx.fillRect(sh1X, sh1Top, sh1W, sh1H);

    // Weathered concrete stains & bands
    ctx.fillStyle = palette.shophouseWall2;
    ctx.fillRect(sh1X, sh1Top, sh1W, 6); // Parapet
    ctx.fillRect(sh1X, sh1Top + 45, sh1W, 4); // Floor 3 divider
    ctx.fillRect(sh1X, sh1Top + 95, sh1W, 4); // Floor 2 divider

    // Metal roll-up doors (Floor 1)
    ctx.fillStyle = isNight ? "#1f1b29" : "#5a504d";
    ctx.fillRect(sh1X + 10, sh1Top + 105, 50, 45);
    ctx.fillRect(sh1X + 75, sh1Top + 105, 55, 45);
    // Door slats
    ctx.fillStyle = isNight ? "#14101e" : "#443c3a";
    for (let slatY = sh1Top + 108; slatY < streetY; slatY += 4) {
      ctx.fillRect(sh1X + 10, slatY, 50, 1);
      ctx.fillRect(sh1X + 75, slatY, 55, 1);
    }

    // Windows & Balconies (Floor 2 & 3)
    [sh1Top + 15, sh1Top + 60].forEach((winRowY, rIdx) => {
      [sh1X + 18, sh1X + 55, sh1X + 95].forEach((winX, cIdx) => {
        // Window frame
        ctx.fillStyle = isNight ? "#0d0918" : "#2d2422";
        ctx.fillRect(winX, winRowY, 26, 30);

        // Window pane / curtains / light
        if (isNight) {
          ctx.fillStyle = (rIdx + cIdx) % 2 === 0 ? "#ffd166" : "#221936";
        } else {
          ctx.fillStyle = "#8ecae6";
        }
        ctx.fillRect(winX + 2, winRowY + 2, 22, 26);

        // Iron security grill (เหล็กดัด)
        ctx.fillStyle = palette.shophouseWall2;
        ctx.fillRect(winX + 7, winRowY + 2, 1, 26);
        ctx.fillRect(winX + 18, winRowY + 2, 1, 26);
        ctx.fillRect(winX + 2, winRowY + 14, 22, 1);

        // Balcony railing & planter
        ctx.fillStyle = palette.shophouseRoof;
        ctx.fillRect(winX - 2, winRowY + 22, 30, 9);
        // Iron bars
        ctx.fillStyle = "#1e1816";
        for (let bx = winX; bx <= winX + 26; bx += 4) {
          ctx.fillRect(bx, winRowY + 20, 1, 10);
        }
      });
    });

    // Air conditioner units with brackets
    ctx.fillStyle = isNight ? "#352b48" : "#e2e8f0";
    ctx.fillRect(sh1X + 8, sh1Top + 78, 14, 10);
    ctx.fillStyle = "#64748b";
    ctx.fillRect(sh1X + 11, sh1Top + 81, 8, 4); // Fan grill

    // Drying laundry on balcony (Floor 3)
    const clothesColors = ["#ef476f", "#06d6a0", "#118ab2", "#ffd166"];
    clothesColors.forEach((col, idx) => {
      ctx.fillStyle = col;
      ctx.fillRect(sh1X + 22 + idx * 7, sh1Top + 40, 5, 8);
    });

    // ==========================================
    // 2. Convenience Store & Corrugated Awning
    // ==========================================
    const convX = baseX + 175;
    const convW = 110;
    const convH = 130;
    const convTop = streetY - convH;

    // Wall
    ctx.fillStyle = palette.shophouseWall2;
    ctx.fillRect(convX, convTop, convW, convH);

    // Awning (Orange & Green stripes like iconic 7-11 / Thai minimart)
    const awnY = streetY - 50;
    for (let awIdx = 0; awIdx < convW; awIdx += 8) {
      ctx.fillStyle = (awIdx / 8) % 2 === 0 ? palette.neonGreen : palette.neonOrange;
      ctx.fillRect(convX + awIdx, awnY, 8, 14);
      // Awning slant edge
      ctx.fillStyle = palette.shophouseRoof;
      ctx.fillRect(convX + awIdx, awnY + 14, 8, 2);
    }

    // Glass storefront with products
    ctx.fillStyle = isNight ? "#120e20" : "#d1e7dd";
    ctx.fillRect(convX + 12, awnY + 16, convW - 24, 34);
    // Lit glow inside
    if (isNight) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.fillRect(convX + 14, awnY + 18, convW - 28, 30);
    }

    // ==========================================
    // 3. Thai Spirit House (ศาลพระภูมิ) & Tree
    // ==========================================
    const shrineX = baseX + 310;
    // Frangipani Tree (ต้นลีลาวดี)
    ctx.fillStyle = "#5c4033"; // Trunk
    ctx.fillRect(shrineX + 40, streetY - 70, 5, 70);
    ctx.fillRect(shrineX + 43, streetY - 55, 12, 4);
    // Leaves & white flowers
    ctx.fillStyle = "#2d6a4f";
    ctx.fillRect(shrineX + 28, streetY - 95, 36, 30);
    ctx.fillRect(shrineX + 32, streetY - 105, 26, 15);
    ctx.fillStyle = "#ffffff"; // Plumeria white flower pixels
    ctx.fillRect(shrineX + 34, streetY - 90, 3, 3);
    ctx.fillRect(shrineX + 50, streetY - 82, 3, 3);
    ctx.fillRect(shrineX + 44, streetY - 100, 3, 3);

    // Spirit house pedestal
    ctx.fillStyle = "#d4af37"; // Golden base
    ctx.fillRect(shrineX + 12, streetY - 30, 4, 30);
    ctx.fillRect(shrineX + 8, streetY - 32, 12, 2);
    // House shrine
    ctx.fillRect(shrineX + 7, streetY - 45, 14, 13);
    // Tiered Thai roof
    ctx.fillStyle = "#e63946";
    ctx.beginPath();
    ctx.moveTo(shrineX + 5, streetY - 45);
    ctx.lineTo(shrineX + 14, streetY - 55);
    ctx.lineTo(shrineX + 23, streetY - 45);
    ctx.fill();
    // Tiny garland (พวงมาลัย)
    ctx.fillStyle = "#fb8500";
    ctx.fillRect(shrineX + 10, streetY - 36, 8, 2);

    // ==========================================
    // 4. Green Bangkok Soi Sign (ป้ายซอย กทม.)
    // ==========================================
    const signX = baseX + 355;
    // Steel post
    ctx.fillStyle = "#94a3b8";
    ctx.fillRect(signX + 6, streetY - 45, 3, 45);
    // Green rectangular plate with white border
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(signX - 4, streetY - 58, 24, 13);
    ctx.fillStyle = "#1e5128"; // BMA Soi Green
    ctx.fillRect(signX - 3, streetY - 57, 22, 11);
    // White pixel letters "ซอย ๑"
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(signX, streetY - 54, 4, 2);
    ctx.fillRect(signX + 6, streetY - 54, 3, 5);
    ctx.fillRect(signX + 12, streetY - 54, 3, 5);

    // ==========================================
    // 5. Utility Poles & Tangled Cables (เสาไฟฟ้า & มัดสายไฟ)
    // ==========================================
    const pole1X = baseX + 160;
    const pole2X = baseX + 440;

    [pole1X, pole2X].forEach((px) => {
      // Concrete octagonal pole
      ctx.fillStyle = palette.poleColor;
      ctx.fillRect(px, streetY - 160, 8, 160);
      ctx.fillStyle = "#4a3b32";
      ctx.fillRect(px + 7, streetY - 160, 1, 160); // Side bevel

      // Crossarms (คานเหล็กรับลูกถ้วย)
      ctx.fillStyle = palette.poleColor;
      ctx.fillRect(px - 14, streetY - 152, 36, 4);
      ctx.fillRect(px - 10, streetY - 138, 28, 4);

      // Ceramic insulators (ลูกถ้วยกระเบื้อง)
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(px - 13, streetY - 156, 3, 4);
      ctx.fillRect(px + 3, streetY - 156, 3, 4);
      ctx.fillRect(px + 18, streetY - 156, 3, 4);

      // Cylindrical transformer box (หม้อแปลงไฟฟ้า) on pole 1
      if (px === pole1X) {
        ctx.fillStyle = "#64748b";
        ctx.fillRect(px - 8, streetY - 128, 14, 18);
        ctx.fillStyle = "#334155";
        ctx.fillRect(px - 7, streetY - 126, 12, 14);
      }
    });

    // Tangled Overhead Cables (Catenary curves droop across the soi)
    ctx.strokeStyle = palette.wireColor;
    ctx.lineWidth = 1;

    // High voltage top wires (straight & tight)
    ctx.beginPath();
    ctx.moveTo(pole1X + 4, streetY - 154);
    ctx.lineTo(pole2X + 4, streetY - 154);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pole1X - 10, streetY - 150);
    ctx.quadraticCurveTo((pole1X + pole2X) / 2, streetY - 142, pole2X - 10, streetY - 150);
    ctx.stroke();

    // Heavy tangled communication wire bundles (Drooping curves)
    const cableY1 = streetY - 105;
    const cableY2 = streetY - 100;
    const cableY3 = streetY - 95;
    const cableY4 = streetY - 88;

    [
      { yOffset: 12, startY: cableY1 },
      { yOffset: 18, startY: cableY2 },
      { yOffset: 24, startY: cableY3 },
      { yOffset: 32, startY: cableY4 }
    ].forEach((c) => {
      ctx.beginPath();
      ctx.moveTo(pole1X + 4, c.startY);
      ctx.quadraticCurveTo(
        (pole1X + pole2X) / 2,
        c.startY + c.yOffset,
        pole2X + 4,
        c.startY + 4
      );
      ctx.stroke();
    });

    // Vertical service drops to houses
    ctx.beginPath();
    ctx.moveTo(pole1X + 4, cableY3);
    ctx.lineTo(sh1X + 110, sh1Top + 60);
    ctx.moveTo(pole1X + 4, cableY4);
    ctx.lineTo(convX + 20, convTop + 40);
    ctx.stroke();
  }
}
