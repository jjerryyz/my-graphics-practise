#ifdef GL_ES
precision highp float;
#endif

varying vec2 vUv;
uniform sampler2D tMap;
uniform int axis;

void main() {
  vec4 color = texture2D(tMap, vUv);

  // 高斯矩阵的权重值
  float weight[5];
  weight[0] = 0.227027;
  weight[1] = 0.1945946;
  weight[2] = 0.1216216;
  weight[3] = 0.054054;
  weight[4] = 0.016216;

  // 每一个相邻像素的坐标间隔，这里的512可以用实际的Canvas像素宽代替
  float tex_offset = 1.0 / 512.0;

  vec3 result = color.rgb;
  result *= weight[0];
  for (int i = 1; i < 5; ++i) {
    float f = float(i);
    if (axis == 0) { // x轴的高斯模糊
      result +=
          texture2D(tMap, vUv + vec2(tex_offset * f, 0.0)).rgb * weight[i];
      result +=
          texture2D(tMap, vUv - vec2(tex_offset * f, 0.0)).rgb * weight[i];
    } else { // y轴的高斯模糊
      result +=
          texture2D(tMap, vUv + vec2(0.0, tex_offset * f)).rgb * weight[i];
      result +=
          texture2D(tMap, vUv - vec2(0.0, tex_offset * f)).rgb * weight[i];
    }
  }

  gl_FragColor.rgb = result.rgb;
  gl_FragColor.a = color.a;
}