precision mediump float;
varying vec3 color; // 根据片元着色器的像素坐标与顶点像素坐标的相对位置做线性插值

void main() { 
    gl_FragColor = vec4(color, 1.0); // 表示当前像素颜色
}