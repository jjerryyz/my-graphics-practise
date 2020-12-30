// Author: jerry
// Title: noisy-simple

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

highp float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = smoothstep(vec2(0.0), vec2(1.0), f);
    // 分别得到 x 分量 (0, 0) => (0, 1) 和 (0, 1) => (1, 1) 的混合值
    // 再 mix 得到 y 分量的混合值
    float mx0 = mix( random(i + vec2(0.0, 0.0)), random(i + vec2(1.0, 0.0)), u.x);
    float mx1 = mix( random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x);
    return mix(mx0, mx1, u.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st -= 0.5; // remap to center
    st *= 10.0; // remap to 1/10
	
    vec3 rgb = vec3(noise(st));
    gl_FragColor = vec4(rgb,1.0);
}