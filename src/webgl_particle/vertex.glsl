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
  // 矩阵可以以行主序，也可以以列主序，在glsl中默认是以列主序
  // 因此看起来是正常数学公式中矩阵的转置
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
  mat3 skewMatrix = 
      mat3(
        1, -tan(rad), 0.0,
        tan(rad), 1, 0.0,
        0.0, 0.0, 1.0);
  gl_PointSize = 1.0;
  // vec3 pos = translateMatrix * rotateMatrix * scaleMatrix * vec3(position, 1.0);

  // Q1: 交换 translateMatrix/rotateMatrix/scaleMatrix 顺序对结果的影响
  // translateMatrix 和 rotateMatrix 交换对结果影响最大
  // vec3 pos = rotateMatrix * translateMatrix * scaleMatrix * vec3(position, 1.0);
  // vec3 pos = scaleMatrix * rotateMatrix * translateMatrix * vec3(position, 1.0);
  // vec3 pos = scaleMatrix * translateMatrix * rotateMatrix * vec3(position, 1.0);

  // Q2: 加入扭曲效果
  vec3 pos = skewMatrix * translateMatrix * rotateMatrix * scaleMatrix * vec3(position, 1.0);

  gl_Position = vec4(pos, 1.0);
  vP = p;
}