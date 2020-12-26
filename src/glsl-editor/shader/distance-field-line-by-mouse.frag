// Author: jerry
// Title: distance-field-line-by-mouse

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float seg_distance(in vec2 st, in vec2 a, in vec2 b) {
    vec2 line_st = a - b;
    float l = length(line_st);
    
    float proj = dot(st - b, a - b) / l;

    float d;
   	if (proj >= 0.0 && proj <= l) {
    	d = abs(cross( vec3(st - b, 0), normalize(vec3(line_st, 0.0)))).z;
    } else {
    	d = min(distance(st, u_mouse), distance(st, b));
    }
    return d;
}

void main() {
    vec2 center_st = vec2(0.560,0.380);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 u_mouse_st = u_mouse.xy / u_resolution.xy;
    
    float d = seg_distance(st, u_mouse_st, center_st);
	 vec3 rgb = (1. - smoothstep(0.0, 0.01, d)) * vec3(1.0);
    gl_FragColor = vec4(rgb,1.0);
}