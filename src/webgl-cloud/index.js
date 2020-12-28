import vertex from "./vertex.glsl";
import fragment from "./fragment.glsl";
import GlRenderer from "../common/lib/gl-renderer.js";
const canvas = document.querySelector("canvas");
const renderer = new GlRenderer(canvas);
const program = renderer.compileSync(fragment, vertex);
renderer.useProgram(program);

renderer.setMeshData([
  // 设置顶点数据
  {
    positions: [
      [-1, -1],
      [-1, 1],
      [1, 1],
      [1, -1],
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

const mouse = {x: 0.0, y:0.0};
canvas.addEventListener('mousemove', e=>{
  mouse.x = e.clientX || e.pageX;
  mouse.y = e.clientY || e.pageY;
})

const fbo = {
  readFBO: renderer.createFBO(),
  writeFBO: renderer.createFBO(),
  get texture() {
    return this.readFBO.texture;
  },
  swap() {
    const tmp = this.writeFBO;
    this.writeFBO = this.readFBO;
    this.readFBO = tmp;
  },
};

function update(t) {
  // 输出到画布
  renderer.bindFBO(null);
  renderer.uniforms.uTime = t / 1000;
  renderer.uniforms.uMouse = [mouse.x/500, mouse.y/500];
  renderer.uniforms.tMap = fbo.texture;
  renderer.render();

  // 同时输出到FBO
  renderer.bindFBO(fbo.writeFBO);
  renderer.uniforms.tMap = fbo.texture;

  // 交换读写缓冲以便下一次写入
  fbo.swap();
  renderer.render();
  requestAnimationFrame(update);
}

update(0);