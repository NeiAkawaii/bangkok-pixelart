/**
 * Game Asset Exporter
 * Exports pixel-perfect PNGs at 1x, 2x, 4x, or isolated transparent layers
 */

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportCompositePNG(engine, scale = 1) {
  const targetW = engine.width * scale;
  const targetH = engine.height * scale;

  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = targetW;
  exportCanvas.height = targetH;
  const ectx = exportCanvas.getContext("2d");
  ectx.imageSmoothingEnabled = false;

  // Render current composite
  ectx.drawImage(
    engine.buffer,
    0, 0, engine.width, engine.height,
    0, 0, targetW, targetH
  );

  exportCanvas.toBlob((blob) => {
    if (blob) {
      downloadBlob(blob, `bangkok-soi-${engine.timeOfDay}-${scale}x.png`);
    }
  }, "image/png");
}

export function exportLayerPNG(engine, layerIndex, layerName, scale = 1) {
  const targetW = engine.width * scale;
  const targetH = engine.height * scale;

  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = targetW;
  exportCanvas.height = targetH;
  const ectx = exportCanvas.getContext("2d");
  ectx.imageSmoothingEnabled = false;

  const layerCanvas = engine.renderSingleLayer(layerIndex);
  ectx.drawImage(
    layerCanvas,
    0, 0, engine.width, engine.height,
    0, 0, targetW, targetH
  );

  exportCanvas.toBlob((blob) => {
    if (blob) {
      downloadBlob(blob, `bangkok-soi-${layerName}-${scale}x.png`);
    }
  }, "image/png");
}

export function exportAllLayers(engine, scale = 1) {
  const layerNames = ["L0-sky", "L1-skyline", "L2-shophouses", "L3-street"];
  layerNames.forEach((name, idx) => {
    setTimeout(() => {
      exportLayerPNG(engine, idx, name, scale);
    }, idx * 250);
  });
}
