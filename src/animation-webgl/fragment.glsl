precision mediump float;

varying vec2 vUv;
uniform sampler2D tMap;
uniform float fWidth;
uniform vec2 vFrames[3];
uniform int frameIndex;

void main() {
  vec2 st = vUv;
  for (int i = 0; i < 3; i++) {
    // vFrames。它是每一帧动画的图片起始 x 和结束 x 坐标，我们用这两个坐标和 vUv.x 计算插值，最后除以图片的总宽度 fWidth，就能得到对应的纹理 x 坐标
    st.x = mix(vFrames[i].x, vFrames[i].y, vUv.x) / fWidth;
    if (float(i) == mod(float(frameIndex), 3.0))
      break;
  }

  vec4 color = texture2D(tMap, st);
  gl_FragColor = color;
}