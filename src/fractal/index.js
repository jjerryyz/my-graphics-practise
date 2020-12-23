import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";
import GlRenderer from "../common/lib/gl-renderer.js";
const canvas = document.querySelector("canvas");
const renderer = new GlRenderer(canvas);

const program = renderer.compileSync(fragment, vertex);
renderer.useProgram(program);
renderer.uniforms.center = [0.367, 0.303];
renderer.uniforms.scale = 1;
renderer.uniforms.iterations = 256;

renderer.setMeshData([ // 设置顶点数据
  {
    positions: [
      [-1, -1],
      [-1, 1],
      [1, 1],
      [1, -1],
    ],
    attributes: {
      uv: [ // 纹理坐标
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0],
      ],
    },
    cells: [ // 顶点索引
      [0, 1, 2],
      [2, 0, 3],
    ],
  },
]);

renderer.render();

function update() {
  const factor = Math.max(0.1, Math.log(renderer.uniforms.scale));
  renderer.uniforms.scale = (renderer.uniforms.scale += factor) % 10000;
  renderer.uniforms.iterations = factor * 500;
  requestAnimationFrame(update);
  // setTimeout(update, 500);
}
setTimeout(update, 500);