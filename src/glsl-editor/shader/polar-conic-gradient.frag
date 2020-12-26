// Author: jerry
// Title: polar-conic-gradient

#ifdef GL_ES
precision mediump float;
#endif

#define PI2 6.28;

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
    float d = smoothstep(st.x, st.x + 0.01, 0.312);
    float p = st.y / PI2;
    if (p < 0.45) {
        // p取0到0.45时从红色线性过渡到绿色 
        gl_FragColor.rgb = d * mix(vec3(0.5, 0, 0), vec3(0, 0.5, 0), p / 0.45);
    } else  {
        gl_FragColor.rgb = d * mix(vec3(0.0, 0.5, 0.0), vec3(0, 0, 1.0), (p - 0.45) / (1.0 - 0.45));
    }
    gl_FragColor.a = 1.0;
}