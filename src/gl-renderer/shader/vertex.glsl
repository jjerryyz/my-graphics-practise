#define PI 3.1415926535897932384626433832795

attribute vec2 position; // 声明一个 vec2 类型的变量 position
varying vec3 color;      // 定义 color，作用是向 片元着色器传递

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
  vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0,
                   0.0, 1.0);
  rgb = rgb * rgb * (3.0 - 2.0 * rgb);
  return c.z * mix(vec3(1.0), rgb, c.y);
}

void main() {
  float x = position.x;
  float y = position.y;

  float len = sqrt(x * x + y * y);
  // 反正切函数得到起始偏移角度
  float rad = atan(y, x);
  float hue = rad / 2.0 * PI;
  vec3 hsv = vec3(hue, len, 1.0);
  vec3 rgb = hsv2rgb(hsv);

  gl_PointSize = 1.0;
  color = rgb;
  gl_Position = vec4(position * 0.5, 1.0, 1.0);
}