#ifdef GL_ES
precision highp float;
#endif

float line_distance(in vec2 st, in vec2 a, in vec2 b) {
  vec3 ab = vec3(b - a, 0);
  vec3 p = vec3(st - a, 0);
  float l = length(ab);
  return cross(p, normalize(ab)).z;
}

float seg_distance(in vec2 st, in vec2 a, in vec2 b) {
  vec3 ab = vec3(b - a, 0);
  vec3 p = vec3(st - a, 0);
  float l = length(ab);
  float d = abs(cross(p, normalize(ab)).z);
  float proj = dot(p, ab) / l;
  if (proj >= 0.0 && proj <= l)
    return d;
  return min(distance(st, a), distance(st, b));
}

float triangle_distance(in vec2 st, in vec2 a, in vec2 b, in vec2 c) {
  float d1 = line_distance(st, a, b);
  float d2 = line_distance(st, b, c);
  float d3 = line_distance(st, c, a);

  if (d1 >= 0.0 && d2 >= 0.0 && d3 >= 0.0 ||
      d1 <= 0.0 && d2 <= 0.0 && d3 <= 0.0) {
    return -min(abs(d1), min(abs(d2), abs(d3))); // 内部距离为负
  }

  return min(seg_distance(st, a, b),
             min(seg_distance(st, b, c), seg_distance(st, c, a))); // 外部为正
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec3 hsb2rgb(vec3 c) {
  vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0,
                   0.0, 1.0);
  rgb = rgb * rgb * (3.0 - 2.0 * rgb);
  return c.z * mix(vec3(1.0), rgb, c.y);
}

varying vec2 vUv;

void main() {
  vec2 st = vUv;
  st *= 10.0;
  vec2 i_st = floor(st);
  vec2 f_st = 2.0 * fract(st) - vec2(1);
  float r = random(i_st);
  float sign = 2.0 * step(0.5, r) - 1.0;

  float d = triangle_distance(f_st, vec2(-1), vec2(1), sign * vec2(1, -1));
  gl_FragColor.rgb = (smoothstep(-0.85, -0.8, d) - smoothstep(0.0, 0.05, d)) *
                     hsb2rgb(vec3(r + 1.2, 0.5, r));
  gl_FragColor.a = 1.0;
}