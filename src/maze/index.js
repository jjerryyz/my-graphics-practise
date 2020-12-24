import vertex from "./vertex.glsl";
import fragment from "./fragment.glsl";
import GlRenderer from "../common/lib/gl-renderer.js";
const canvas = document.querySelector("canvas");
const renderer = new GlRenderer(canvas);

const program = renderer.compileSync(fragment, vertex);
renderer.useProgram(program);
renderer.uniforms.rows = 8;

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