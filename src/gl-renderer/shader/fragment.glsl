#ifdef GL_ES 
precision mediump float;
#endif

varying vec2 vUv;
uniform float rows;

void main() {
  // fract 取一个数的小数部分，
  // 当一个数范围是 [0,1], 乘以 N，得到的就是一个周期所有的值
  vec2 st = fract(vUv * rows);
  float d1 = step(st.x, 0.9); // b < a，返回0; 否则返回 1
  float d2 = step(0.1, st.y);
  gl_FragColor.rgb = mix(vec3(0.8), vec3(1.0), d1 * d2);
  gl_FragColor.a = 1.0;
}