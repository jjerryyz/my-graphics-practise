#ifdef GL_ES
precision highp float;
#endif

varying vec2 vUv;
uniform sampler2D tMap;
uniform float uTime;
uniform vec2 uMouse;

vec2 random2(vec2 st) {
  st = vec2(dot(st, vec2(127.1, 311.7)), dot(st, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(st) * 43758.5453123);
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

void main() {
  vec3 smoke = vec3(0);
  if (uTime <= 0.0) {
    vec2 st = vUv - vec2(0.5);
    float d = length(st);
    smoke = vec3(1.0 - smoothstep(0.05, 0.055, d));
  }
  // 使用后期处理通道，取上次结果往下一点的像素
  vec2 st = vUv;

  float offset = 1.0 / 256.0;
  vec3 diffuse = texture2D(tMap, st).rgb;

  vec4 left = texture2D(tMap, st + vec2(-offset, 0.0));
  vec4 right = texture2D(tMap, st + vec2(offset, 0.0));
  vec4 up = texture2D(tMap, st + vec2(0.0, -offset));
  vec4 down = texture2D(tMap, st + vec2(0.0, offset));

  float rand = noise(st + 5.0 * uTime);

  float diff = 8.0 * 0.016 * (
                 (1.0 + rand) * left.r 
               + (1.0 - rand) * right.r 
               + down.r 
               + 2.0 * up.r 
               - 5.0 * diffuse.r);

  gl_FragColor.rgb = diffuse + diff + smoke;
  gl_FragColor.a = 1.0;
}
