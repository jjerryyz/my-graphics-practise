import { getCanvasCtx } from "../common/lib/canvas-api.js";
import { Vec3 } from "../common/lib/math/vec3.js";

const { ctx } = getCanvasCtx();

const randomHSL = () =>
  new Vec3(
    0.5 * Math.random(), // 初始色相随机取0~0.5之间的值
    0.7, // 饱和度
    0.45 // 亮度
  );

// 可以看出，相比 RGB 表示法，HSL 可以直观的控制视觉效果
const [h, s, l] = randomHSL();
for (let i = 0; i < 2; i++) {
  for (let j = 0; j < 5; j++) {
    const p = (j * 0.25 + h) % 1;
    const d = j - 2;
    ctx.fillStyle = `hsl(${Math.floor(p * 360)}, ${Math.floor(
      (0.15 * d + s) * 100
    )}%, ${Math.floor((0.12 * d + l) * 100)}%)`;
    ctx.beginPath();
    ctx.arc((j - 2) * 60, (i - 1) * 60, 20, 0, Math.PI * 2);
    ctx.fill();
  }
}