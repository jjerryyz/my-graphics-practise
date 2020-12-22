import { cubehelix, defaultHelixConfig } from "cubehelix";
import { getCanvasCtx } from "../common/lib/canvas-api.js";

const { ctx } = getCanvasCtx();

const color = cubehelix(); // 构造cubehelix色盘颜色映射函数

const T = 2000;

// cubeHelix 的效果是 颜色和亮度都会发生改变
// 接受的参数范围 [0, 1]
const update = (t) => {
  // 每次传入 performance.now()
  console.log("t", t);
  const p = 0.5 + 0.5 * Math.sin(t / T); // 使用 sin 模拟一个周期变化
  ctx.clearRect(0, -256, 512, 512);
  const { r, g, b } = color(p);
  ctx.fillStyle = `rgb(${255 * r},${255 * g},${255 * b})`;
  ctx.beginPath();
  ctx.rect(20, -20, 480 * p, 40);
  ctx.fill();
  requestAnimationFrame(update);
};

update(0);
