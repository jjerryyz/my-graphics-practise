[toc]

## 开始

安装环境

```
yarn
```

启动服务

```
yarn serve
```



## 渲染流水线

图形系统绘制过程中一些术语

- 光栅（Raster）：几乎所有的现代图形系统都是基于光栅来绘制图形的，光栅就是指构成图像的像素阵列。
- 像素（Pixel）：一个像素对应图像上的一个点，它通常保存图像上的某个具体位置的颜色等信息。
- 帧缓存（Frame Buffer）：在绘图过程中，像素信息被存放于帧缓存中，帧缓存是一块内存地址。

一整个渲染流水线的流程图：

![img](https://static001.geekbang.org/resource/image/b5/56/b5e4f37e1c4fbyy6a2ea10624d143356.jpg)

`GPU` vs `CPU`

`CPU` 串行处理任务，适合处理密集运算；

`GPU` 并行运行，适合处理批量小负载运算；



## 1. 创建 `webgl` 程序

**对应例子**： [hello world](http://localhost:5000/webgl/hello_world)

创建一个 `webgl` 程序主要流程：

1. 创建 `WebGl` 上下文
2. 创建 `WebGL` 程序（WebGL Program）
3. 将数据存入缓冲区
4. 将缓冲区数据读取到 `GPU`
5. `GPU` 执行 `WebGL` 程序，输出结果

### `GLSL`、`Shader`

`GLSL` = OpenGL Shading Language， 程序是 `GPU` 实际用来渲染的程序，要创建 `WebGL` 程序需要创建着色器（`Shader`)，

着色器分为 顶点着色器（Vertext Shader） 和 片元着色器（Fragment Shader），使用 `GLSL` 编程语言编写代码；

##### 顶点着色器 VS 片元着色器

顶点着色器 负责将 图元的顶点信息计算出来，顶点信息包含（顶点的坐标、法线方向、材质等）；

片元着色根据顶点信息，计算出图元所需的像素信息；

##### 光栅化

`WebGL` 从顶点着色器提取顶点信息给片元着色器的过程；

片元着色器 处理之后，就是`光栅化`后的像素信息；

##### `webgl` 坐标系

坐标原点是（0,0,0）；

右手坐标系；

参考：[WebGL 坐标系.note](http://note.youdao.com/noteshare?id=4c4488a35d69d2d66612f259ef3e96cb&sub=20E3588C982648F8A0E68EEDFF12A3A2)

##### 类型化数组 `TypedArray`

`js` 通常使用 类型化数组存储二进制数据，

`TypedArray` 是 `ArrayBuffer` 的一个视图

`TypedArray` 是 数组缓冲区的一个视图，意思是 `ArrayBuffer`，即数组缓冲区 本身不能直接修改缓冲区里面的数据，我们需要明确的指定缓冲区的类型才能安全的修改里面的值，这个时候就需要 `TypedArray` 来操作数据；

```js
var buffer = new ArrayBuffer(8);
var view   = new Int32Array(buffer);
buffer[0] = 1 	// 修改无效 buffer[0] = 0
view[0] = 1 	// 修改成功 buffer[0] = 1
```

除了 类型化数组，`DataView` 也可以用作操作数组缓冲区

