const canvas = document.querySelector("#js-canvas");
const ctx = canvas.getContext("2d");
const color = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

ctx.strokeStyle = "black";
ctx.lineWidth = 1;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function init() {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", fillColor);
  canvas.addEventListener("contextmenu", preventCM);
}

function fillColor() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function changeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function rangeChange(event) {
  const value = event.target.value;
  ctx.lineWidth = value;
}

function modeChange() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function saveImage() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🖌]";
  link.click();
}

function preventCM(event) {
  event.preventDefault();
}

if (canvas) {
  init();
} else {
  console.log("There's no canvas!");
}

Array.from(color).forEach(function (e) {
  e.addEventListener("click", changeColor);
});

if (range) {
  range.addEventListener("input", rangeChange);
}

if (mode) {
  mode.addEventListener("click", modeChange);
}

if (save) {
  save.addEventListener("click", saveImage);
}
