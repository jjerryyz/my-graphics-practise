import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";

const canvas = document.querySelector("canvas");
const renderer = new GlRenderer(canvas);

const program = renderer.compileSync(fragment, vertex);
renderer.useProgram(program);

renderer.uniforms.rows = 64; // 一行显示 64 个网格
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