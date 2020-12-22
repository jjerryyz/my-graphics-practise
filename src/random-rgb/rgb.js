import { getCanvasCtx } from "../common/lib/canvas-api.js";
import { Vec3 } from "../common/lib/math/vec3.js";

const { ctx } = getCanvasCtx();

const randomRGB = () =>
  new Vec3(0.5 * Math.random(), 0.5 * Math.random(), 0.5 * Math.random());

//   RGB 表示法无法表达色差，由于颜色是随机的，可能会出现颜色太暗等情况
for (let j = 0; j < 5; j++) {
  for (let i = 0; i < 2; i++) {
    const colorVector = randomRGB();
    const c = colorVector.clone().scale(0.5 + 0.25 * j);
    ctx.fillStyle = `rgb(${Math.floor(c[0] * 256)}, ${Math.floor(
      c[1] * 256
    )}, ${Math.floor(c[2] * 256)})`;
    ctx.beginPath();
    ctx.arc((j - 2) * 60, (i - 1) * 60, 20, 0, Math.PI * 2);
    ctx.fill();
  }
}