import vertex from "./vertex.glsl";
import fragment from "./fragment.glsl";
import blurFragment from "./blur_fragment.glsl";
import bloomFragment from './bloom_fragment.glsl';
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

const blurProgram = renderer.compileSync(blurFragment, vertex);
const bloomProgram = renderer.compileSync(bloomFragment, vertex);

// 创建两个FBO对象交替使用
const fbo0 = renderer.createFBO();
const fbo1 = renderer.createFBO();
const fbo2 = renderer.createFBO();

// 对x,y执行 两次高斯模糊

// 第一次，渲染原始图形
// bindFBO 操作控制绑定的缓冲区，将原始图形写入缓冲区 fbo1
renderer.bindFBO(fbo1);
renderer.render();

// 第二次，对x轴高斯模糊
renderer.useProgram(blurProgram);
renderer.setMeshData(program.meshData);
renderer.bindFBO(fbo2); // x 轴高斯模糊结果写入缓冲区 fbo2
renderer.uniforms.tMap = fbo1.texture;
renderer.uniforms.axis = 0;
renderer.uniforms.filter = 0.7;
renderer.render();

// 第三次，对y轴高斯模糊
renderer.useProgram(blurProgram);
renderer.bindFBO(fbo1);
renderer.uniforms.tMap = fbo2.texture;
renderer.uniforms.axis = 1;
renderer.uniforms.filter = 0.0;
renderer.render();

// 第四次，对x轴高斯模糊
renderer.useProgram(blurProgram);
renderer.bindFBO(fbo2);
renderer.uniforms.tMap = fbo1.texture;
renderer.uniforms.axis = 0;
renderer.uniforms.filter = 0.0;
renderer.render();

// 第五次，对y轴高斯模糊
renderer.useProgram(blurProgram);
renderer.bindFBO(fbo1);
renderer.uniforms.tMap = fbo2.texture;
renderer.uniforms.axis = 1;
renderer.uniforms.filter = 0.0;
renderer.render();

// 第六次，添加辉光
renderer.useProgram(bloomProgram);
renderer.setMeshData(program.meshData);
renderer.bindFBO(null);
renderer.uniforms.tSource = fbo0.texture;
renderer.uniforms.tMap = fbo1.texture;
renderer.uniforms.axis = 1;
renderer.uniforms.filter = 0.0;
renderer.render();