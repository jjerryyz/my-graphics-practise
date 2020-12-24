#ifdef GL_ES 
precision mediump float;
#endif

varying vec2 vUv;
uniform float rows;
uniform float u_time;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

void main() {
  // fract 取一个数的小数部分，
  // 当一个数范围是 [0,1], 乘以 N，得到的就是一个周期所有的值
  // vec2 st = fract(vUv * rows);
  // vec2 ipos = floor(vUv * rows);

  // float d1 = step(st.x, 0.9); // b < a，返回0; 否则返回 1
  // float d2 = step(0.1, st.y);
  // vec3 rgb = mix(vec3(0.8), vec3(1.0), d1 * d2);

  // vec3 hsv = rgb2hsv(rgb);
  gl_FragColor.rgb = vec3(abs(sin(u_time)), 1.0, 1.0);
  gl_FragColor.a = 1.0;
}