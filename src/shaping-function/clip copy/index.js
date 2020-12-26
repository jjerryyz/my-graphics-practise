const vertex = `
      attribute vec2 a_vertexPosition;
      attribute vec2 uv;

      varying vec2 vUv;

      void main() {
        gl_PointSize = 1.0;
        vUv = uv;
        gl_Position = vec4(a_vertexPosition, 1, 1);
      }
    `;

const imgURL = "https://p4.ssl.qhimg.com/t011ce67c90abedcf12.jpg";
import fragment from "./fragment.glsl";
import GlRenderer from "../../common/lib/gl-renderer.js";
const canvas = document.querySelector("canvas");
const renderer = new GlRenderer(canvas);
const program = renderer.compileSync(fragment, vertex);
renderer.useProgram(program);

const update = (uTime) => {
  renderer.uniforms.u_time = uTime;
  requestAnimationFrame(update);
};

(async function () {
  const texture = await renderer.loadTexture(imgURL);
  renderer.uniforms.tMap = texture;

  renderer.setMeshData([
    {
      positions: [
        [-1, -1],
        [-1, 1],
        [1, 1],
        [1, -1],
      ],
      attributes: {
        uv: [
          [0, 0],
          [0, 1],
          [1, 1],
          [1, 0],
        ],
      },
      cells: [
        [0, 1, 2],
        [2, 0, 3],
      ],
    },
  ]);

  renderer.render();
  update(0);
})();
