// Author: jerry
// Title: distance-field-multiple

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float lines(in vec2 st) {
    vec3 line = vec3(1, 1, 0);
    float d = abs(cross(vec3(st,0), normalize(line)).z);
    d = fract(19.560 * d);
    return d;
}

float circles(in vec2 st) {
    vec2 center = vec2(.5, .5);
    float d = distance(st, center);
    d = fract(19.560 * d);
    return d;
}

// triangle circles 
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
    	d = min(distance(st, u_mouse), distance(st, b));
    }
    return d;
}

float triangle(in vec2 st) {
    vec2 a = vec2(0.250,0.560);
    vec2 b = vec2(0.580,0.500);
    vec2 c = vec2(0.580,-0.980);
    float d1 = line_distance(st, a, b);
    float d2 = line_distance(st, b, c);
    float d3 = line_distance(st, c, a);
    
    float d;
    if (d1 >= 0.0 && d2 >= 0.0 && d3 >= 0.0 || d1 < 0.0 && d2 < 0.0 && d3 < 0.0) {
        d = -min(abs(d1), min(abs(d2), abs(d3))); //
    } else {
        d =  min(seg_distance(st, a, b), min(seg_distance(st, b, c), seg_distance(st, c, a))); // 外部为正
    }
    return fract(19.560 * d);
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
	 // float d = lines(st);
    // float d = circles(st);
    float d = triangle(st);
    
    vec3 rgb = vec3(d);
    // 控制边缘
	 // vec3 rgb = (smoothstep(0.45, 0.5, d) - smoothstep(0.5, 0.55, d)) * vec3(1.0);

    gl_FragColor = vec4(rgb,1.0);
}