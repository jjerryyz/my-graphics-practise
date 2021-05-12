attribute vec2 position; // 声明一个 vec2 类型的变量 position
varying vec3 color;      // 定义 color，作用是向 片元着色器传递

void main() {
  gl_PointSize = 1.0;
  color = vec3(0.5 + position * 0.5, 0.0);
  gl_Position = vec4(position * 0.5, 1.0, 1.0);
}