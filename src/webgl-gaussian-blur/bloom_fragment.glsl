
#ifdef GL_ES
  precision highp float;
#endif

uniform sampler2D tMap;
uniform sampler2D tSource;

varying vec2 vUv;

void main() {
  vec3 color = texture2D(tSource, vUv).rgb;
  vec3 bloomColor = texture2D(tMap, vUv).rgb;
  color += bloomColor;
  // tone mapping
  float exposure = 2.0;
  float gamma = 1.3;
  vec3 result = vec3(1.0) - exp(-color * exposure);
  // also gamma correct while we're at it
  if(length(bloomColor) > 0.0) {
    result = pow(result, vec3(1.0 / gamma));
  }
  gl_FragColor.rgb = result;
  gl_FragColor.a = 1.0;
}