function mostrarModelo() {
  document.getElementById("scanScreen").classList.add("hidden");
  document.getElementById("modelScreen").classList.remove("hidden");
}

/* ===== Modal helpers ===== */
function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
}

function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}

/* ===== Wire buttons ===== */
document.addEventListener("DOMContentLoaded", () => {
  const btnVideo = document.getElementById("btnVideo");
  const btnInfo = document.getElementById("btnInfo");
  const btnTrivia = document.getElementById("btnTrivia");

  if (btnVideo) btnVideo.addEventListener("click", () => openModal("videoModal"));
  if (btnInfo) btnInfo.addEventListener("click", () => openModal("statsModal"));
  if (btnTrivia) btnTrivia.addEventListener("click", () => openModal("triviaModal"));

  // Close buttons
  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", () => closeModal(btn.dataset.close));
  });

  // Close on backdrop click
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.add("hidden");
    });
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay").forEach((m) => m.classList.add("hidden"));
    }
  });
  // ===== Video filters (más OBVIOS) =====
const video = document.getElementById("arVideo");
const activeLabel = document.getElementById("activeFilterLabel");
const chips = document.querySelectorAll("#filterRow .chip");

// Pixelado “fake” (se ve MUCHO): baja resolución con canvas y la vuelves a subir
// Esto es más visible que solo blur/contrast.
let pixelInterval = null;

function stopPixel() {
  if (pixelInterval) {
    clearInterval(pixelInterval);
    pixelInterval = null;
  }
}

function startPixel(pixelSize = 10) {
  if (!video) return;
  stopPixel();

  // Creamos un canvas encima del video
  let canvas = document.getElementById("pixelCanvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "pixelCanvas";
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.borderRadius = "18px";
    canvas.style.pointerEvents = "none";

    const wrap = video.closest(".video-wrap");
    wrap.style.position = "relative";
    wrap.appendChild(canvas);
  }

  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  pixelInterval = setInterval(() => {
    if (video.paused || video.ended) return;

    const w = video.videoWidth;
    const h = video.videoHeight;
    if (!w || !h) return;

    // Canvas real size
    canvas.width = w;
    canvas.height = h;

    // Dibujamos chiquito
    const sw = Math.max(1, Math.floor(w / pixelSize));
    const sh = Math.max(1, Math.floor(h / pixelSize));

    // Draw small to an offscreen buffer
    const off = document.createElement("canvas");
    off.width = sw;
    off.height = sh;
    const offCtx = off.getContext("2d");
    offCtx.imageSmoothingEnabled = false;
    offCtx.drawImage(video, 0, 0, sw, sh);

    // Escalamos grande SIN smoothing => pixelado
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(off, 0, 0, sw, sh, 0, 0, w, h);
  }, 60);
}

function removePixelCanvas() {
  stopPixel();
  const c = document.getElementById("pixelCanvas");
  if (c) c.remove();
}

function setActiveChip(target) {
  chips.forEach(c => c.classList.remove("chip--active"));
  target.classList.add("chip--active");
}

// Presets fuertes
function applyFilter(name) {
  if (!video) return;

  // Reset
  removePixelCanvas();
  video.style.filter = "none";
  video.style.transform = "none";
  video.style.opacity = "1";

  switch (name) {
    case "Original":
      // nada
      break;

    case "Desenfoque":
      // Muy notorio
      video.style.filter = "blur(6px) saturate(1.1) contrast(1.05)";
      break;

    case "Color Ajustado":
      // Más “vibrante” y dramático
      video.style.filter = "contrast(1.35) saturate(1.8) brightness(1.05)";
      break;

    case "Pastel":
      // Pastel real: baja contraste, sube brillo, baja saturación
      video.style.filter = "brightness(1.2) contrast(0.75) saturate(0.6)";
      break;

    case "Térmico":
      // Simulación térmica: hue-rotate fuerte + saturación + contraste
      // (no es térmico real, pero visualmente sí se siente)
      video.style.filter = "hue-rotate(180deg) saturate(3) contrast(1.4) brightness(1.1)";
      break;

    case "Pixelado":
      // Pixelado visible con canvas
      startPixel(12); // entre 10-18 se ve bien
      // además un toque extra
      video.style.filter = "contrast(1.15) saturate(1.1)";
      break;

    default:
      break;
  }
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    setActiveChip(chip);

    const label = chip.textContent.trim();
    if (activeLabel) activeLabel.textContent = label;

    applyFilter(label);
  });
});


})