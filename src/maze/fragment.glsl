precision mediump float;

varying vec2 vUv;
uniform float u_time;
uniform vec2 u_resolution;
uniform int rows;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 truchetPattern(in vec2 _st, in float _index) {
  _index = fract(((_index - 0.5) * 2.0));
  if (_index > 0.75) {
    _st = vec2(1.0) - _st;
  } else if (_index > 0.5) {
    _st = vec2(1.0 - _st.x, _st.y);
  } else if (_index > 0.25) {
    _st = 1.0 - vec2(1.0 - _st.x, _st.y);
  }
  return _st;
}

void main() {
  vec2 st = vUv * float(rows);
  vec2 ipos = floor(st); // integer
  vec2 fpos = fract(st); // fraction

  vec2 tile = truchetPattern(fpos, random(ipos));
  float color = 0.0;
  color = smoothstep(tile.x - 0.3, tile.x, tile.y) -
          smoothstep(tile.x, tile.x + 0.3, tile.y);
  gl_FragColor = vec4(vec3(color), 1.0);
}