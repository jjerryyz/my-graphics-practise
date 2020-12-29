import vertex from "./vertex.glsl";
import fragment from "./fragment.glsl";
import GlRenderer from "../../common/lib/gl-renderer.js";
const canvas = document.querySelector("canvas");
const renderer = new GlRenderer(canvas);
const textureURL = 'https://p.ssl.qhimg.com/t01f265b6b6479fffc4.png';
(async function () {
  const texture = await renderer.loadTexture(textureURL);
  const program = renderer.compileSync(fragment, vertex);
  renderer.useProgram(program);
  renderer.uniforms.tMap = texture;
  renderer.uniforms.fWidth = 272;
  renderer.uniforms.vFrames = [2, 88, 90, 176, 178, 264];
  renderer.uniforms.frameIndex = 0;
  setInterval(() => {
    renderer.uniforms.frameIndex++;
  }, 200);

  const x = 43 / canvas.width;
  const y = 30 / canvas.height;
  renderer.setMeshData([
    // 设置顶点数据
    {
      positions: [
        [-x, -y],
        [-x, y],
        [x, y],
        [x, -y],
      ],
      attributes: {
        uv: [
          // 纹理坐标
          [0, 0],
          [0, 1],
          [1, 1],
          [1, 0],
        ],
      },
      // 利用 cells: [(0, 1, 2), (2, 0, 3)]，我们就能将这个矩形画布剖分成两个三角形，这两个三角形的顶点索引分别是 (0, 1, 2) 和 (2, 0, 3)
      cells: [
        // 顶点索引，每三个构成一个 三角形
        [0, 1, 2],
        [2, 0, 3],
      ],
    },
  ]);

  renderer.render();
})();
