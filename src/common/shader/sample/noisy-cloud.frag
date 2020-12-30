// Author: jerry
// Title: noisy-cloud

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

  //  Function from Iñigo Quiles
  //  https://www.shadertoy.com/view/MsS3Wc
 vec3 hsb2rgb(vec3 c){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0);
    rgb = rgb * rgb * (3.0 - 2.0 * rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0 * fract(sin(st) * 43758.5453123);
}

// Gradient Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/XdXGW8
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
            mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

  #define OCTAVES 6
  float mist(vec2 st) {
    //Initial values
    float value = 0.0;
    float amplitude = 0.5;

    // Loop of octaves
    for(int i = 0; i < OCTAVES; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st += 0.1 * u_time;
    
    // gl_FragColor.rgb = vec3(mist(st));
    gl_FragColor.rgb = hsb2rgb(vec3 (mist(st), 1.0, 1.0));
    gl_FragColor.a = 1.0;
}