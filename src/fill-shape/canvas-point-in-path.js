
/**
 * 通用的 isPointInPath
 */

import { drawCoord, getCanvasCtx } from "../common/lib/canvas-api.js";

const { ctx, canvas } = getCanvasCtx();
const { left, top } = canvas.getBoundingClientRect();

const vertices = [
  [-0.7, 0.5],
  [-0.4, 0.3],
  [-0.25, 0.71],
  [-0.1, 0.56],
  [-0.1, 0.13],
  [0.4, 0.21],
  [0, -0.6],
  [-0.3, -0.3],
  [-0.6, -0.3],
  [-0.45, 0.0],
];

function draw(
  context,
  points,
  {
    fillStyle = "black",
    strokeStyle = "black",
    close = false,
    rule = "nonzero",
  } = {}
) {
  context.strokeStyle = strokeStyle;
  context.beginPath();
  context.moveTo(...points[0]);
  for (let i = 1; i < points.length; i++) {
    context.lineTo(...points[i]);
  }
  if (close) context.closePath();
  context.fillStyle = fillStyle;
  context.fill(rule);
}

function clear(context) {
  context.clearRect(-250, -250, canvas.width, canvas.height);
}

function inTriangle(p1, p2, p3, point) {
	const a = p2.copy().sub(p1);
	const b = p3.copy().sub(p2);
  const c = p1.copy().sub(p3);
  
  const u1
}

function isPointInPath() {

}

canvas.addEventListener("mousemove", (evt) => {
  const { x, y } = evt;
  const offsetX = x - left;
  const offsetY = y - top;

  if (ctx.isPointInPath(offsetX, offsetY)) {
    draw(ctx, poitions, { strokeStyle: "transparent", fillStyle: "green" });
    draw(ctx, poitions2, { strokeStyle: "transparent", fillStyle: "green" });
  } else {
    draw(ctx, poitions, { strokeStyle: "transparent", fillStyle: "yellow" });
    draw(ctx, poitions2, { strokeStyle: "transparent", fillStyle: "yellow" });
  }
});

drawCoord(ctx, canvas);
const poitions = vertices.map(([x, y]) => [x * 256, y * 256]);
draw(ctx, poitions);
const poitions2 = [[50, 50], [150, 150], [50, 100]]
draw(ctx, poitions2);
