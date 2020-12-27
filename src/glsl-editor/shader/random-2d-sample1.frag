// Author: jerry
// Title: random-2d-sample1

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st) {
    vec2 a = vec2(1.9898,4.233);
    // a = u_mouse;
    return fract(sin(dot(st.xy, a))* 1.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st -= 0.5; // remap to center
    st *= 2.0; // remap to 1/10
    
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    // 由于是伪随机，每个格子里的像素返回的值固定
    float r = random(vec2(i.y, st.x));
    r = step(0.8, r);
    vec3 rgb = vec3(r); // 随机网格
    
    // vec3 rgb =  vec3(f, 0.0); // 渐变网格
	    
    gl_FragColor = vec4(1.0 - rgb,1.0);
}