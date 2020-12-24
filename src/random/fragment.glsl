precision mediump float;

varying vec2 vUv;
uniform float u_time;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec2 st = vUv * 10.0;

  st.x -= (1.0 + 10.0 * random(vec2(floor(st.y)))) * u_time;

  gl_FragColor.rgb = vec3(random(floor(st)));
  gl_FragColor.a = 1.0;
}