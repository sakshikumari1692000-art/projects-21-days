const colorInput = document.getElementById("strokeColor");
const brushSizeInput = document.getElementById("brushSize");
const penBtn = document.getElementById("pen");
const eraserBtn = document.getElementById("eraser");
const squareBtn = document.getElementById("square");
const cleanUpBtn = document.getElementById("cleanup");
const downloadImageBtn = document.getElementById("downloadImage");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/* =========================
   Canvas Setup
========================= */
canvas.width = 1200;
canvas.height = 500;

ctx.lineCap = "round";
ctx.lineJoin = "round";

let currentTool = "pen";
let isDrawing = false;
let startX = 0;
let startY = 0;

/* Default cursor */
canvas.classList.add("pen-cursor");

/* =========================
   Drawing Functions
========================= */
function startDraw(e) {
  isDrawing = true;

  if (currentTool === "square") {
    startX = e.offsetX;
    startY = e.offsetY;
    return;
  }

  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
  if (!isDrawing || currentTool === "square") return;

  if (currentTool === "eraser") {
    ctx.globalCompositeOperation = "destination-out";
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = colorInput.value;
  }

  ctx.lineWidth = brushSizeInput.value;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}

function stopDraw(e) {
  if (currentTool === "square" && isDrawing) {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = colorInput.value;
    ctx.lineWidth = brushSizeInput.value;

    const width = e.offsetX - startX;
    const height = e.offsetY - startY;

    ctx.beginPath();
    ctx.rect(startX, startY, width, height);
    ctx.stroke();
  }

  isDrawing = false;
  ctx.beginPath();
}

/* =========================
   Tool Buttons
========================= */
penBtn.addEventListener("click", () => {
  currentTool = "pen";
  canvas.classList.remove("eraser-cursor");
  canvas.classList.add("pen-cursor");

  penBtn.classList.add("activeBtn");
  eraserBtn.classList.remove("activeBtn");
  squareBtn.classList.remove("activeBtn");
});

eraserBtn.addEventListener("click", () => {
  currentTool = "eraser";
  canvas.classList.remove("pen-cursor");
  canvas.classList.add("eraser-cursor");

  eraserBtn.classList.add("activeBtn");
  penBtn.classList.remove("activeBtn");
  squareBtn.classList.remove("activeBtn");
});

squareBtn.addEventListener("click", () => {
  currentTool = "square";
  canvas.classList.remove("eraser-cursor");
  canvas.classList.add("pen-cursor");

  squareBtn.classList.add("activeBtn");
  penBtn.classList.remove("activeBtn");
  eraserBtn.classList.remove("activeBtn");
});

/* =========================
   Actions
========================= */
cleanUpBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

downloadImageBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "drawing.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

/* =========================
   Mouse Events
========================= */
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseleave", stopDraw);
