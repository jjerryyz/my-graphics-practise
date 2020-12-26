// Author: jerry
// Title: distance-field-triangle

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float line_distance(in vec2 st, in vec2 a, in vec2 b) {
    vec3 ab = vec3(b - a, 0); 
    vec3 p = vec3(st - a, 0);
    float l = length(ab);
    return cross(p, normalize(ab)).z;
}

float seg_distance(in vec2 st, in vec2 a, in vec2 b) {
    vec2 line_st = a - b;
    float l = length(line_st);
    
    float proj = dot(st - b, a - b) / l;

    float d;
   	if (proj >= 0.0 && proj <= l) {
    	d = abs(cross( vec3(st - b, 0), normalize(vec3(line_st, 0.0)))).z;
    } else {
    	d = min(distance(st, a), distance(st, b));
    }
    return d;
}

float triangle(in vec2 st, in vec2 a, in vec2 b, in vec2 c) {
    float d1 = line_distance(st, a, b);
    float d2 = line_distance(st, b, c);
    float d3 = line_distance(st, c, a);
    
    if (d1 >= 0.0 && d2 >= 0.0 && d3 >= 0.0 || d1 < 0.0 && d2 < 0.0 && d3 < 0.0) {
        return -min(abs(d1), min(abs(d2), abs(d3))); //
    } else {
        return min(seg_distance(st, a, b), min(seg_distance(st, b, c), seg_distance(st, c, a))); // 外部为正
    }
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
		float d = triangle(st, vec2(0.500,0.450), vec2(0.240,0.340), vec2(0.360,0.610));
	 vec3 rgb = (1. - smoothstep(0.0, 0.01, d)) * vec3(1.0);
    gl_FragColor = vec4(rgb,1.0);
}