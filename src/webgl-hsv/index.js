import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";
import { getWebglCtx, arc } from "../common/lib/canvas-api.js";

const { ctx: gl } = getWebglCtx();

// 着色器对应的shader对象
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertex);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragment);
gl.compileShader(fragmentShader);
// 将 gl 程序链接到Webgl
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

const c1 = arc(0, 0, 0.5);
const points = c1.flat();
const cell = earcut(points);

// 将定义好的数据写入 WebGL 的缓冲区
const position = new Float32Array(points);
const cells = new Uint16Array(cell);

const bufferId = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW);

// 将数据绑定到顶点着色器中
const vPosition = gl.getAttribLocation(program, "position"); //获取顶点着色器(vertex.glsl)中的position变量的地址
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0); //给变量设置长度和类型
gl.enableVertexAttribArray(vPosition); //激活这个变量

const cellsBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cellsBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cells, gl.STATIC_DRAW);

// 将缓冲区数据提交到GPU
gl.drawElements(gl.TRIANGLES, cell.length, gl.UNSIGNED_SHORT, 0)
