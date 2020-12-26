// Author: jerry
// Title: polar-coor-rose

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 polar(in vec2 st) {
    return vec2(length(st), atan(st.y, st.x));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st = st -0.5;
    st = polar(st);
    // 玫瑰线方程：r = a * cos(k * θ)
    // 尝试改变 k 值，花瓣数量会递增
    // float d = 0.5 * cos(st.y * 1.836) - st.x;
    
   	float d = 0.872 * 0.5 * cos(st.y * 1.396) - st.x + 0.488;
    vec3 rgb = smoothstep(st.x, st.x + 0.02, d) * vec3(1.0);
    gl_FragColor = vec4(rgb,1.0);
}