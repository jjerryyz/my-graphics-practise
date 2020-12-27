// Author: jerry
// Title: noisy-random

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(float x) {
    return fract(sin(x * 1243758.5453123));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st -= 0.5; // remap to center
    st *= 10.0; // remap to 1/10
    float i = floor(st.x);
    float f = fract(st.x);
    
    // float d = random(i);
    // float d = mix(random(i), random(i + 1.0), f);
    // float d = mix(random(i), random(i + 1.0), smoothstep(0.0, 1.0, f));
    float d = mix(random(i), random(i + 1.0), f * f * (3.0 - 2.0 * f)); // 三次多项式
    
    vec3 rgb = (smoothstep(st.y - 0.05, st.y, d)
                - smoothstep(st.y, st.y + 0.05, d)) * vec3(1.0);

    gl_FragColor = vec4(rgb,1.0);
}