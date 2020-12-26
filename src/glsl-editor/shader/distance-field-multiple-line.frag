// Author: jerry
// Title: distance-field-multiple-line

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 line = vec3(1, 1, 0);
    float d = abs(cross(vec3(st,0), normalize(line)).z);
    d = fract(19.560 * d);
	 vec3 rgb = (smoothstep(0.45, 0.5, d) - smoothstep(0.5, 0.55, d)) * vec3(1.0);
    gl_FragColor = vec4(rgb,1.0);
}