
varying vec2 vUv;

float radom(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec2 st = vUv * 10.0;

  gl_FragColor.rgb = vec3(random(floor(st)));
  gl_FragColor.a = 1.0;
}