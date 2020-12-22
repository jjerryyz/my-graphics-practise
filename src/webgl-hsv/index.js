import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";
import { getWebglCtx, regularShaper } from "../common/lib/canvas-api.js";
import lodash from "lodash";

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

const pointCount = 100; // 模拟圆
let temp = regularShaper(pointCount, 0, -2, 0.1);
temp = lodash.flatten(temp);

// 将定义好的数据写入 WebGL 的缓冲区
const points = new Float32Array(temp);
const bufferId = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferId);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, points, gl.STATIC_DRAW);

// 将数据绑定到顶点着色器中

const vPosition = gl.getAttribLocation(program, "position"); //获取顶点着色器(vertex.glsl)中的position变量的地址
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0); //给变量设置长度和类型
gl.enableVertexAttribArray(vPosition); //激活这个变量

// 将缓冲区数据提交到GPU

// 调用绘制命令
gl.clear(gl.COLOR_BUFFER_BIT);
// 使用 三角形图元绘图，偏移为 0，顶点数量为 数组大小除以2
// gl.drawArrays(gl.TRIANGLES, 0, pointCount);

// Q1: 支持的图元类型
// https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawArrays
// gl.drawArrays(gl.LINE_LOOP, 0, pointCount); // 画线框
// gl.drawArrays(gl.LINE_STRIP, 0, pointCount); // 画线框，但最后顶点不和最初顶点相连
// gl.drawArrays(gl.LINES, 0, pointCount); // 每两组点之间画线段

// gl.drawArrays(gl.TRIANGLE_FAN, 0, pointCount); // 三角扇，等同于填充图形
// gl.drawArrays(gl.TRIANGLE_STRIP, 0, pointCount); // 三角带, 每三个顶点构成一个图形，所有三角形围成的图形

// Q2: 多边形
gl.drawElements(gl.TRIANGLES, pointCount, gl.UNSIGNED_SHORT, 0);
