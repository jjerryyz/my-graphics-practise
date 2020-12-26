
      #ifdef GL_ES
      precision highp float;
      #endif

      varying vec2 vUv;
      uniform sampler2D tMap;
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
        vec4 color = texture2D(tMap, vUv);
        vec2 uv = vUv - vec2(0.5); // 平移到原点

        vec2 a = vec2(-0.577, 0) - vec2(0.5);
        vec2 b = vec2(0.5, 1.866) - vec2(0.5);
        vec2 c = vec2(1.577, 0) - vec2(0.5);

        float scale = min(1.0, 0.0005 * u_time);
        
        float d = triangle(uv, scale * a, scale * b, scale * c);
        gl_FragColor.rgb = (1.0 - smoothstep(0.0, 0.01, d)) * color.rgb;
        gl_FragColor.a = 1.0;
      }
    