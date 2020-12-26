// Author: jerry
// Title: polar-hsv-clor-wheel

#ifdef GL_ES
precision mediump float;
#endif

#define PI2 6.28;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 hsv2rgb(vec3 c){ 
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0); 
    rgb = rgb * rgb * (3.0 - 2.0 * rgb); 
    return c.z * mix(vec3(1.0), rgb, c.y);
}

vec2 polar(in vec2 st) {
    return vec2(length(st), atan(st.y, st.x));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 mouse = u_mouse / u_resolution;
    st = st -0.5;
    st = polar(st);
    float p = st.y / PI2;
    float d = smoothstep(st.x, st.x + 0.01, 0.312);
    if(st.y < 0.0) st.y += 6.28;
	 gl_FragColor.rgb = d*hsv2rgb(vec3(p,  mouse));
    gl_FragColor.a = 1.0;
}