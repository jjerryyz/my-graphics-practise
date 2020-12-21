import vertex from './vertex.glsl';
import fragment from './fragment.glsl';
const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertex);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragment);
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

// 将定义好的数据写入 WebGL 的缓冲区
const position = new Float32Array([-1, 1, 0, -1, 1, -1]);
const bufferId = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW);

// 将数据绑定到顶点着色器中

const vPosition = gl.getAttribLocation(program, "position"); //获取顶点着色器中的position变量的地址
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0); //给变量设置长度和类型
gl.enableVertexAttribArray(vPosition); //激活这个变量

// 创建一个创造随机三角形
function randomTriangles() {
  const u_color = [Math.random(), Math.random(), Math.random(), 1.0]; // rgba 随机颜色
  const u_rotation = Math.random() * Math.PI;
  const u_scale = Math.random() * 0.05 + 0.03; // 初始大小
  const u_time = 0;
  const u_duration = 3.0;
  const rad = Math.random() & (Math.PI * 2);
  const u_dir = [Math.cos(rad), Math.sin(rad)];
  const startTime = performance.now();
  return { u_color, u_rotation, u_scale, u_time, u_duration, u_dir, startTime };
}

// gl.uniform1f 传入一个浮点数，对应的 uniform 变量的类型为 float
// gl.uniform4f 传入四个浮点数，对应的 uniform 变量类型为 float[4]
// gl.uniform3fv 传入一个三维向量，对应的 uniform 变量类型为 vec3
// gl.uniformMatrix4fv 传入一个 4x4 的矩阵，对应的 uniform 变量类型为 mat4
function setUniforms(
  gl,
  { u_color, u_rotation, u_scale, u_time, u_duration, u_dir }
) {
  // gl.getUniformLocation 拿到uniform变量的指针
  let loc = gl.getUniformLocation(program, "u_color");
  // 将数据传给 unfirom 变量的地址
  gl.uniform4fv(loc, u_color);

  loc = gl.getUniformLocation(program, "u_rotation");
  gl.uniform1f(loc, u_rotation);

  loc = gl.getUniformLocation(program, "u_scale");
  gl.uniform1f(loc, u_scale);

  loc = gl.getUniformLocation(program, "u_time");
  gl.uniform1f(loc, u_time);

  loc = gl.getUniformLocation(program, "u_duration");
  gl.uniform1f(loc, u_duration);

  loc = gl.getUniformLocation(program, "u_dir");
  gl.uniform2fv(loc, u_dir);
}

let triangles = [];
function update() {
  for (let i = 0; i < 5 * Math.random(); i++) {
    triangles.push(randomTriangles());
  }
  gl.clear(gl.COLOR_BUFFER_BIT);
  // 对每个三角形重新设置u_time
  triangles.forEach((triangle) => {
    triangle.u_time = (performance.now() - triangle.startTime) / 1000;
    setUniforms(gl, triangle);
    gl.drawArrays(gl.TRIANGLES, 0, position.length / 2);
  });
  // 移除已经结束动画的三角形
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
