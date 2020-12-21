import { Vector2D } from "../common/lib/vector2d.js";
import {
  drawCoord,
  getCanvasCtx,
  regularShaper,
  arc,
  draw
} from "../common/lib/canvas-api.js";
import {
  ellipse,
  parabola,
  helical,
  star,
  quadricBezier,
  cardioid
} from "../common/lib/canvas-api.js";

const { canvas, ctx } = getCanvasCtx();

drawCoord(ctx, canvas);

// draw(ctx, regularShaper(3, 128, 128, 100));
// draw(ctx, regularShaper(6, -64, 128, 50)); // 绘制六边形
// draw(ctx, regularShaper(11, -64, -64, 30)); // 绘制十一边形
// draw(ctx, regularShaper(60, 128, -64, 6)); // 绘制六十边形

/**
 * 自定义画图方法与Canvas 标准API比较
 */
// draw(ctx, arc(0, 0, 100, 0, Math.PI / 2)); // 扇形方法画圆
// ctx.beginPath();
// ctx.arc(0, 0, 100, 0, Math.PI * 2);
// ctx.stroke();

// ellipse(0, Math.PI * 2, 100, { radiuX: 100, radiuY: 50, x0: 0, y0: 0 }).draw(ctx);
// ctx.beginPath();
// ctx.ellipse(0, 0, 100, 50, Math.PI * 2, 0, Math.PI * 2);
// ctx.stroke();

// const p0 = new Vector2D(0, 0);
// const p1 = new Vector2D(100, 0);
// p1.rotate(0.75);
// const p2 = new Vector2D(200, 0);
// const count = 30;
// for(let i = 0; i < count; i++) {
//   // 绘制30条从圆心出发，旋转不同角度的二阶贝塞尔曲线
//   p1.rotate(2 / count * Math.PI);
//   p2.rotate(2 / count * Math.PI);
//   // quadricBezier(0, 1, 100, [
//   //   p0,
//   //   p1,
//   //   p2,
//   // ]).draw(ctx);
//   ctx.beginPath();
//   ctx.moveTo(0, 0);
//   ctx.bezierCurveTo(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y);
//   ctx.lineTo(0, 0);
//   ctx.stroke();
// }

// const p0 = new Vector2D(0, 0);
// const p1 = new Vector2D(100, 0);
// p1.rotate(0.75);
// const p2 = new Vector2D(150, 0);
// p2.rotate(-0.75);
// const p3 = new Vector2D(200, 0);
// const count = 30;
// for(let i = 0; i < count; i++) {
//   p1.rotate(2 / count * Math.PI);
//   p2.rotate(2 / count * Math.PI);
//   p3.rotate(2 / count * Math.PI);
//   cubicBezier(0, 1, 100, [
//     p0,
//     p1,
//     p2,
//     p3,
//   ]).draw(ctx);
// }

// cardioid(0, Math.PI * 2).draw(ctx);

// parabola(-5.5, 5.5).draw(ctx);

// helical(0, 50, 500, 5).draw(ctx, {strokeStyle: 'blue'});

// star(0, Math.PI * 2, 50, 150).draw(ctx, {strokeStyle: 'red'});
