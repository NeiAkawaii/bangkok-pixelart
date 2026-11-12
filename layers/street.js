/**
 * Layer 3: Foreground Street Life (Asphalt, Curb, Win Motorcycle Taxi, Moo Ping Cart, Soi Dog)
 * Parallax Speed: 1.0x
 */

export function renderStreet(ctx, scrollX, palette, tick, width, height) {
  const isNight = palette.name.includes("Night") || palette.name.includes("ราตรี");
  const curbY = 222;
  const roadY = 236;
  const loopWidth = 480;
  const effectiveScroll = (scrollX * 1.0) % loopWidth;

  for (let rep = -1; rep <= 1; rep++) {
    const baseX = Math.floor(rep * loopWidth - effectiveScroll);

    // ==========================================
    // 1. Sidewalk Pavement (ฟุตบาท)
    // ==========================================
    ctx.fillStyle = isNight ? "#241d33" : "#d6ccc2";
    ctx.fillRect(baseX, curbY - 18, loopWidth, 18);

    // Sidewalk tile grid
    ctx.fillStyle = isNight ? "#181324" : "#b8ada2";
    for (let tx = 0; tx < loopWidth; tx += 16) {
      ctx.fillRect(baseX + tx, curbY - 18, 1, 18);
    }
    ctx.fillRect(baseX, curbY - 9, loopWidth, 1);

    // ==========================================
    // 2. White & Black Curb (ขอบทางเท้า ขาว-ดำ)
    // ==========================================
    for (let cx = 0; cx < loopWidth; cx += 24) {
      const isWhite = ((cx / 24) % 2 === 0);
      ctx.fillStyle = isWhite ? palette.curbWhite : palette.curbBlack;
      ctx.fillRect(baseX + cx, curbY, 24, 14);

      // 3D Curb Bevel
      ctx.fillStyle = isWhite ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
      ctx.fillRect(baseX + cx, curbY, 24, 2);
    }

    // ==========================================
    // 3. Asphalt Road & Markings (ถนนลาดยาง)
    // ==========================================
    ctx.fillStyle = palette.roadColor;
    ctx.fillRect(baseX, roadY, loopWidth, height - roadY);

    // Yellow broken center line
    ctx.fillStyle = palette.roadMarking;
    for (let lineX = 0; lineX < loopWidth; lineX += 48) {
      ctx.fillRect(baseX + lineX, height - 12, 28, 3);
    }

    // Storm drain grating (ตะแกรงท่อระบายน้ำ)
    ctx.fillStyle = "#1e1b26";
    ctx.fillRect(baseX + 320, roadY + 2, 24, 10);
    ctx.fillStyle = "#3a3447";
    for (let gx = 0; gx < 24; gx += 4) {
      ctx.fillRect(baseX + 320 + gx, roadY + 2, 2, 10);
    }

    // ==========================================
    // 4. Moo Ping Charcoal Grill Cart (รถเข็นหมูปิ้ง)
    // ==========================================
    const cartX = baseX + 70;
    const cartY = curbY - 2;

    // Cart Wheels & legs
    ctx.fillStyle = "#1f2937";
    ctx.beginPath();
    ctx.arc(cartX + 10, cartY, 7, 0, Math.PI * 2);
    ctx.arc(cartX + 42, cartY, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#9ca3af";
    ctx.fillRect(cartX + 9, cartY - 1, 2, 2);
    ctx.fillRect(cartX + 41, cartY - 1, 2, 2);

    // Cart Body (Stainless Steel)
    ctx.fillStyle = isNight ? "#475569" : "#cbd5e1";
    ctx.fillRect(cartX, cartY - 24, 52, 18);
    // Bevel
    ctx.fillStyle = isNight ? "#334155" : "#94a3b8";
    ctx.fillRect(cartX, cartY - 7, 52, 2);

    // Charcoal Grill (เตาถ่าน)
    ctx.fillStyle = "#111827";
    ctx.fillRect(cartX + 6, cartY - 32, 26, 8);
    // Glowing red/orange charcoal embers
    const emberFlicker = (Math.sin(tick * 10) + 1) * 0.5;
    ctx.fillStyle = emberFlicker > 0.4 ? "#ef4444" : "#f97316";
    ctx.fillRect(cartX + 8, cartY - 30, 22, 3);
    ctx.fillStyle = "#fef08a";
    ctx.fillRect(cartX + 12 + Math.floor(emberFlicker * 6), cartY - 31, 3, 2);

    // Grilled Pork Skewers (ไม้หมูปิ้ง)
    ctx.fillStyle = "#78350f";
    ctx.fillRect(cartX + 8, cartY - 35, 6, 4);
    ctx.fillRect(cartX + 16, cartY - 35, 6, 4);
    ctx.fillRect(cartX + 24, cartY - 35, 6, 4);
    // Skewer bamboo sticks
    ctx.fillStyle = "#fde68a";
    ctx.fillRect(cartX + 10, cartY - 38, 1, 3);
    ctx.fillRect(cartX + 18, cartY - 38, 1, 3);
    ctx.fillRect(cartX + 26, cartY - 38, 1, 3);

    // Glass sneeze guard & Banana leaf tray (ถาดใบตอง)
    ctx.fillStyle = "#15803d"; // Banana green
    ctx.fillRect(cartX + 34, cartY - 28, 15, 4);
    ctx.fillStyle = "rgba(186, 230, 253, 0.5)"; // Glass
    ctx.fillRect(cartX + 33, cartY - 36, 17, 8);

    // Condiment bottles (ขวดน้ำจิ้ม)
    ctx.fillStyle = "#dc2626"; // Chili sauce
    ctx.fillRect(cartX + 44, cartY - 33, 3, 5);
    ctx.fillStyle = "#fbbf24";
    ctx.fillRect(cartX + 48, cartY - 33, 3, 5);

    // Animated Rising Smoke Particles from grill
    for (let pIdx = 0; pIdx < 5; pIdx++) {
      const pPhase = (tick * 1.8 + pIdx * 0.6) % 3;
      const pY = cartY - 34 - pPhase * 16;
      const pX = cartX + 16 + Math.sin(pPhase * 4 + pIdx) * 6;
      const pSize = 2 + Math.floor(pPhase * 1.5);
      const pAlpha = Math.max(0, 1 - pPhase / 2.8);

      ctx.fillStyle = `rgba(240, 240, 245, ${pAlpha * 0.7})`;
      ctx.fillRect(pX, pY, pSize, pSize);
    }

    // ==========================================
    // 5. Win Motorcycle Taxi (วินมอเตอร์ไซค์เสื้อส้ม)
    // ==========================================
    const winX = baseX + 230;
    const winY = curbY - 2;

    // Big striped shade umbrella
    ctx.fillStyle = "#64748b"; // Pole
    ctx.fillRect(winX + 28, winY - 65, 3, 65);
    // Umbrella top (Blue & White stripes)
    const umbY = winY - 70;
    ctx.fillStyle = "#0284c7"; // Blue
    ctx.beginPath();
    ctx.arc(winX + 29, umbY + 10, 28, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = "#f8fafc"; // White stripes
    ctx.beginPath();
    ctx.arc(winX + 29, umbY + 10, 16, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = "#0284c7";
    ctx.beginPath();
    ctx.arc(winX + 29, umbY + 10, 8, Math.PI, 0);
    ctx.fill();

    // Motorcycle (Scooter / Wave)
    const motoX = winX + 10;
    const motoY = winY;
    // Wheels
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(motoX + 8, motoY, 6, 0, Math.PI * 2);
    ctx.arc(motoX + 38, motoY, 6, 0, Math.PI * 2);
    ctx.fill();
    // Chrome rims & exhaust pipe
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(motoX + 7, motoY - 1, 2, 2);
    ctx.fillRect(motoX + 37, motoY - 1, 2, 2);
    ctx.fillRect(motoX + 20, motoY - 3, 16, 3); // Exhaust

    // Scooter Body & Seat
    ctx.fillStyle = "#dc2626"; // Red Honda Wave
    ctx.fillRect(motoX + 14, motoY - 12, 22, 8);
    ctx.fillRect(motoX + 34, motoY - 18, 6, 8); // Front cowl
    ctx.fillStyle = "#1e293b"; // Black seat
    ctx.fillRect(motoX + 14, motoY - 16, 18, 4);
    // Handlebars
    ctx.fillStyle = "#64748b";
    ctx.fillRect(motoX + 37, motoY - 22, 2, 6);
    ctx.fillRect(motoX + 34, motoY - 23, 7, 2);
    // Headlight (glowing at night)
    if (isNight) {
      ctx.fillStyle = "#fef08a";
      ctx.fillRect(motoX + 40, motoY - 17, 3, 4);
      // Light beam
      ctx.fillStyle = "rgba(254, 240, 138, 0.18)";
      ctx.beginPath();
      ctx.moveTo(motoX + 43, motoY - 16);
      ctx.lineTo(motoX + 110, motoY - 8);
      ctx.lineTo(motoX + 110, motoY + 15);
      ctx.lineTo(motoX + 43, motoY - 13);
      ctx.closePath();
      ctx.fill();
    }

    // Win Rider sitting on scooter with idle breathing
    const breathOffset = Math.sin(tick * 3) > 0 ? 1 : 0;
    const riderX = motoX + 18;
    const riderY = motoY - 16 - breathOffset;

    // Jeans
    ctx.fillStyle = "#1e3a8a";
    ctx.fillRect(riderX + 2, riderY - 2, 8, 8);
    ctx.fillRect(riderX + 1, riderY + 5, 4, 8);

    // Iconic Orange Vest (เสื้อวินมอเตอร์ไซค์)
    ctx.fillStyle = palette.vestOrange;
    ctx.fillRect(riderX, riderY - 14, 12, 13);
    // White number patch "๙" on back
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(riderX + 4, riderY - 11, 4, 5);
    ctx.fillStyle = palette.vestOrange;
    ctx.fillRect(riderX + 5, riderY - 9, 2, 2);

    // Helmet & Visor
    ctx.fillStyle = "#e2e8f0"; // White open-face helmet
    ctx.beginPath();
    ctx.arc(riderX + 6, riderY - 20, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0f172a"; // Dark visor
    ctx.fillRect(riderX + 7, riderY - 20, 5, 3);

    // ==========================================
    // 6. Sleeping Soi Dog (เจ้าถิ่นนอนหลับ)
    // ==========================================
    const dogX = baseX + 390;
    const dogY = curbY - 3;
    const dogBreath = Math.sin(tick * 2.5) > 0 ? 1 : 0;

    // Body (Cream with brown patches)
    ctx.fillStyle = "#d4a373";
    ctx.beginPath();
    ctx.ellipse(dogX + 10, dogY - 4 - dogBreath, 10, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    // Brown patch
    ctx.fillStyle = "#8d5b4c";
    ctx.fillRect(dogX + 8, dogY - 8 - dogBreath, 5, 4);

    // Head curled down
    ctx.fillStyle = "#d4a373";
    ctx.beginPath();
    ctx.arc(dogX + 2, dogY - 4, 5, 0, Math.PI * 2);
    ctx.fill();
    // Sleeping eye slit
    ctx.fillStyle = "#332211";
    ctx.fillRect(dogX + 1, dogY - 4, 2, 1);
    // Ears drooping
    ctx.fillStyle = "#8d5b4c";
    ctx.fillRect(dogX + 3, dogY - 7, 3, 3);
    // Curled tail with subtle wag
    const tailWag = Math.sin(tick * 5) > 0.7 ? 1 : 0;
    ctx.fillStyle = "#d4a373";
    ctx.fillRect(dogX + 19, dogY - 6 + tailWag, 4, 3);
  }
}
