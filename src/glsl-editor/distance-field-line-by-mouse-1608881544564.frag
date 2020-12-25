// Author: jerry
// Title: distance-field-line-by-mouse

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 u_mouse_st = u_mouse.xy / u_resolution.xy;
    
    // 准备绘制的线的向量
    vec3 line = vec3(u_mouse_st, 0.0);
    
    float l_mouse = length(line);
    
    float proj = dot(st, u_mouse_st) / l_mouse;

    float d;
   	if (proj >= 0.0 && proj <= l_mouse) {
    	d = abs(cross( vec3(st, 0), normalize(line))).z;
    } else {
    	d = distance(st, u_mouse_st);
    }

	 vec3 rgb = (1.0 - smoothstep(0.0, 0.01, d)) * vec3(1.0);
    gl_FragColor = vec4(rgb,1.0);
}