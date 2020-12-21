import { Vector2D } from "../common/lib/vector2d.js";
import {drawCoord, getCanvasCtx} from '../common/lib/canvas-api.js';

const {ctx, canvas} = getCanvasCtx();
drawCoord(ctx, canvas);

function draw(context, points, {
    fillStyle = 'black',
    close = false,
    rule = 'nonzero', // 不管有没有相交的边，只要是由边围起来的区域都一律填充
  } = {}) {
    context.beginPath();
    context.moveTo(...points[0]);
    for(let i = 1; i < points.length; i++) {
      context.lineTo(...points[i]);
    }
    if(close) context.closePath();
    context.fillStyle = fillStyle;
    context.fill(rule);
  }

const points = [new Vector2D(0, 100)];
for(let i = 1; i <= 4; i++) {
  const p = points[0].copy().rotate(i * Math.PI * 0.4);
  points.push(p);
}

ctx.save();
ctx.translate(-128,0);
draw(ctx, points);
ctx.restore();

const stars = [
    points[0], points[2], points[4], points[1], points[3]
];

ctx.save();
ctx.translate(128,0);
// draw(ctx, stars);
draw(ctx, stars, {rule: 'evenodd'}); // 根据重叠区域是奇数还是偶数来决定填充
ctx.restore();
