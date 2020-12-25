// Author:
// Title: distance-field-circle

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    
    // a. The DISTANCE from the pixel to the center
    pct = distance(st, vec2(.5));

    // b. The LENGTH of the vector
    //    from the pixel to the center
    // vec2 toCenter = vec2(0.5)-st;
    // pct = length(toCenter);

    // c. The SQUARE ROOT of the vector
    //    from the pixel to the center
    // vec2 tC = vec2(0.5)-st;
    // pct = sqrt(tC.x*tC.x+tC.y*tC.y);
    
    // 构造实心圆
    pct = step(0.5, pct);
    
    // 翻转前景背景色
    // pct = 1. - step(0.5, pct);
    
    // 边缘模糊
    // pct = smoothstep(0.5, 0.4, pct);
    
    // 结合不同的函数混合 距离场
    // pct = distance(st,vec2(0.4)) + distance(st,vec2(0.6));
    // pct = distance(st,vec2(0.4)) * distance(st,vec2(0.6));
    // pct = min(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
    // pct = max(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
    // pct = pow(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
    
    

    vec3 color = vec3(pct);

	gl_FragColor = vec4( color, 1.0 );
}