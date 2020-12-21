attribute vec2 position;

uniform float u_rotation;
uniform float u_time;
uniform float u_duration;
uniform float u_scale;
uniform vec2 u_dir;

varying float vP;

void main() {
  // p 是当前动画进度
  float p = min(1.0, u_time / u_duration);
  // 绕自身选择5周
  float rad = u_rotation + 3.14 * 10.0 * p;
  // 缩放比例使用 缓动函数
  float scale = u_scale * p * (2.0 - p);
  // u_dir 是单位向量，2.0 表示最大移动距离为 2， p*p 为缓动函数
  vec2 offset = 2.0 * u_dir * p * p;
  // 矩阵在 glsl 中在写法上 行对应于 数学中的列
  mat3 translateMatrix =
      mat3(
        1.0, 0.0, 0.0, 
        0.0, 1.0, 0.0, 
        offset.x, offset.y, 1.0);
  mat3 rotateMatrix =
      mat3(
        cos(rad), sin(rad), 0.0, 
        -sin(rad), cos(rad), 0.0, 
        0.0, 0.0, 1.0);
  mat3 scaleMatrix = 
      mat3(
        scale, 0.0, 0.0, 
        0.0, scale, 0.0, 
        0.0, 0.0, 1.0);
  gl_PointSize = 1.0;
  vec3 pos = translateMatrix * rotateMatrix * scaleMatrix * vec3(position, 1.0);
  gl_Position = vec4(pos, 1.0);
  vP = p;
}