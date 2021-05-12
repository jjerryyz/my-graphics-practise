/**
 * 绘制一个红色的三角形，说明 webgl 程序基本流程
 **/
import fragment from "./shader/fragment.glsl";
import vertex from "./shader/vertex.glsl";

// 一、创建 webgl 上下文
const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

// 创建 webgl 程序

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertex);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragment);
gl.compileShader(fragmentShader);

// 二、webgl 程序链接到 webgl 上下文
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

// 三角形顶点信息
const points = new Float32Array([-1, -1, 0, 1, 1, -1]);

// 三、将定义好的顶点数据写入缓冲区
const bufferId = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

// 四、GPU 读取缓冲区数据，绑定到 glsl 程序中的变量
const vPosition = gl.getAttribLocation(program, "position"); // 获取顶点着色器中 position 变量地址
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0); // 给变量设置长度和类型
gl.enableVertexAttribArray(vPosition); // 激活变量

// 五、执行绘制
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
