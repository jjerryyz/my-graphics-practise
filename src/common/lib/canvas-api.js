import { Vector2D } from "./vector2d.js";

// 画直角坐标轴
export const drawCoord = (context, canvas) => {
  context.save();
  context.beginPath();
  context.strokeStyle = "grey";
  context.setLineDash([5]);
  context.moveTo(-canvas.width / 2, 0);
  context.lineTo(canvas.width, 0);
  context.moveTo(0, -canvas.height);
  context.lineTo(0, canvas.height);
  context.stroke();
  context.restore();
};

export const getWebglCtx = (domName = "canvas") => {
  const canvas = document.querySelector(domName);
  const ctx = canvas.getContext("webgl");
  return { canvas, ctx };
};

export const getCanvasCtx = (name = "canvas") => {
  const canvas = document.querySelector(name);
  const ctx = canvas.getContext("2d");

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(1, -1);
  ctx.lineCap = "round";
  return { canvas, ctx };
};

export const draw = (
  context,
  points = [],
  strokeStyle = "black",
  fillStyle
) => {
  context.save();
  context.beginPath();
  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i];
    context.moveTo(x, y);

    const nextIndex = i + 1 == points.length ? 0 : i + 1;
    const [x1, y1] = points[nextIndex];
    context.lineTo(x1, y1);
  }
  context.stroke();
  context.restore();
};

// 生产多边形顶点坐标
export const regularShaper = (edges = 3, x, y, step) => {
  const ret = [];
  const delta = (2 * Math.PI) / edges;
  let p = new Vector2D(x, y);
  const dir = new Vector2D(step, 0);
  ret.push(p);
  for (let i = 0; i < edges; i++) {
    p = p.copy().add(dir.rotate(delta));
    ret.push(p);
  }
  return ret;
};

const TAU_SEGMENTS = 60;
const TAU = Math.PI * 2;
// 生产扇形顶点
export const arc = (x0, y0, radius, startAng = 0, endAng = Math.PI * 2) => {
  const ret = [];
  const totalAngel = Math.min(TAU, endAng - startAng);
  // 如果是扇形，需要画从圆心到圆的线
  if (totalAngel !== TAU) {
    ret.push([x0, y0]);
  }
  const segments = Math.round((TAU_SEGMENTS * totalAngel) / TAU);
  const segmentAngel = totalAngel / segments;
  for (let i = 0; i < segments; i++) {
    const x = x0 + radius * Math.cos(startAng + i * segmentAngel);
    const y = y0 + radius * Math.sin(startAng + i * segmentAngel);
    ret.push([x, y]);
  }
  return ret;
};

// 生产通用曲线顶点
export const parametric = (xFunc, yFunc) => {
  return (start, end, seg = 100, ...args) => {
    const points = [];
    for (let i = 0; i < seg; i++) {
      const p = i / seg;
      const tan = start + (end - start) * p;
      const x = xFunc(tan, ...args);
      const y = yFunc(tan, ...args);
      points.push([x, y]);
    }
    return {
      draw: (ctx, ...args) => {
        draw.call(null, ctx, points, ...args);
      },
      points
    };
  };
};

export const ellipse = parametric(
  (t, { radiuX, x0 }) => x0 + radiuX * Math.cos(t),
  (t, { radiuY, y0 }) => y0 + radiuY * Math.sin(t)
);

// 抛物线方程
export const parabola = parametric(
  (t) => 25 * t ** 2,
  (t) => 25 * t
);

// 阿基米德曲线
export const helical = parametric(
  (t, l) => l * t * Math.cos(t),
  (t, l) => l * t * Math.sin(t)
);

// 星型曲线
export const star = parametric(
  (t, l) => l * Math.cos(t) ** 3,
  (t, l) => l * Math.sin(t) ** 3
);

// 二阶贝塞尔曲线
export const quadricBezier = parametric(
  (t, [{ x: x0 }, { x: x1 }, { x: x2 }]) =>
    (1 - t) ** 2 * x0 + 2 * t * (1 - t) * x1 + t ** 2 * x2,
  (t, [{ y: y0 }, { y: y1 }, { y: y2 }]) =>
    (1 - t) ** 2 * y0 + 2 * t * (1 - t) * y1 + t ** 2 * y2
);

// 三阶贝塞尔曲线
export const cubicBezier = parametric(
  (t, [{ x: x0 }, { x: x1 }, { x: x2 }, { x: x3 }]) =>
    (1 - t) ** 3 * x0 +
    3 * t * (1 - t) ** 2 * x1 +
    3 * (1 - t) * t ** 2 * x2 +
    t ** 3 * x3,
  (t, [{ y: y0 }, { y: y1 }, { y: y2 }, { y: y3 }]) =>
    (1 - t) ** 3 * y0 +
    3 * t * (1 - t) ** 2 * y1 +
    3 * (1 - t) * t ** 2 * y2 +
    t ** 3 * y3
);

export const cardioid = parametric(
  (t) => 2 * (Math.cos(t) - Math.cos(t * 2)),
  (t) => 2 * (Math.sin(t) - Math.sin(t * 2) / 2)
);
