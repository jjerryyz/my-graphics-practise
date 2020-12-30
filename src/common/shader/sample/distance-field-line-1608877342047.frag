// Author: jerry
// Title: distance-field-line

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    // 准备绘制的线的向量
    vec3 line = vec3(1, 1, 0);
    
    // 两个二维向量叉积的 z 轴分量的大小，就是这两个向量组成的平行四边形的面积，那当我们把 line 的向量归一化之后，这个值就是 vUv 到直线的距离 d 了。
    // 因为这个 d 带符号，所以我们还需要取它的绝对值。
    float d = abs(cross( vec3(st, 0), normalize(line))).z;

	 vec3 rgb = (1.0 - smoothstep(0.0, 0.01, d)) * vec3(1.0);
    gl_FragColor = vec4(rgb,1.0);
}