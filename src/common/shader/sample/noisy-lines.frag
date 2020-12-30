// Author: jerry
// Title: noisy-lines

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float lines(in vec2 pos, float b){ 
    float scale = 10.0; 
    pos *= scale; 
    return smoothstep(0.0, 0.5 + b * 0.5, abs((sin(pos.x * 3.1415) + b * 2.0)) * 0.5);
}

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

// 旋转角度
vec2 rotate(in vec2 v0, float ang) {
    float sinA = sin(ang);
    float cosA = cos(ang);
    mat3 m = mat3(cosA, -sinA, 0, sinA, cosA, 0, 0, 0, 1);
    return (m * vec3(v0, 1.0)).xy;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= vec2(10.0, 3.0);
    
    float n = noise(st);
 	 st = rotate(st, n);
    
    float d = lines(st, 0.5);
    
    vec3 rgb = 1.0 - vec3(d);
    gl_FragColor = vec4(rgb,1.0);
}