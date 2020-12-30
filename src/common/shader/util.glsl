//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb(vec3 c) {
  vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0,
                   0.0, 1.0);
  rgb = rgb * rgb * (3.0 - 2.0 * rgb);
  return c.z * mix(vec3(1.0), rgb, c.y);
}

vec2 polar(in vec2 st) {
    return vec2(length(st), atan(st.y, st.x));
}

float random(float x) { return fract(sin(x * 1243758.5453123)); }

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 random2(vec2 st) {
  st = vec2(dot(st, vec2(127.1, 311.7)), dot(st, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(st) * 43758.5453123);
}

highp float noise(in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  vec2 u = smoothstep(vec2(0.0), vec2(1.0), f);
  // 分别得到 x 分量 (0, 0) => (0, 1) 和 (0, 1) => (1, 1) 的混合值
  // 再 mix 得到 y 分量的混合值
  float mx0 = mix(random(i + vec2(0.0, 0.0)), random(i + vec2(1.0, 0.0)), u.x);
  float mx1 = mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x);
  return mix(mx0, mx1, u.y);
}

// Gradient Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/XdXGW8
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(mix(dot(random2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                 dot(random2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
             mix(dot(random2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                 dot(random2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
             u.y);
}

// 旋转角度
vec2 rotate(in vec2 v0, float ang) {
  float sinA = sin(ang);
  float cosA = cos(ang);
  mat3 m = mat3(cosA, -sinA, 0, sinA, cosA, 0, 0, 0, 1);
  return (m * vec3(v0, 1.0)).xy;
}