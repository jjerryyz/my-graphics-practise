import { getCanvasCtx } from "../common/lib/canvas-api.js";
const { ctx } = getCanvasCtx();

// 人类对色彩感知度测试

// 只改变色相，逐渐增大
// 虽然是均匀增长的，有些色彩看起来没那么大
for (let i = 0; i < 20; i++) {
  ctx.fillStyle = `hsl(${Math.floor(i * 15)}, 50%, 50%)`;
  ctx.beginPath();
  ctx.arc((i - 10) * 20, 60, 10, 0, Math.PI * 2);
  ctx.fill();
}
// 只改变色相，有时增有时减
// 亮度相同情况下，蓝色和紫色看起来不如绿色的亮
for (let i = 0; i < 20; i++) {
  ctx.fillStyle = `hsl(${Math.floor((i % 2 ? 60 : 210) + 3 * i)}, 50%, 50%)`;
  ctx.beginPath();
  ctx.arc((i - 10) * 20, -60, 10, 0, Math.PI * 2);
  ctx.fill();
}
