[toc]

## 创建工程

初始化工程

```
npm init

git init
```

安装 cross-env 指定环境变量

```
yarn add cross-env -D
```

安装 webpack 环境

```
yarn add webpack webpack-cli webpack-dev-server --save-dev
```

安装babel 插件，支持 ES module 语法

```shell
yarn add -D babel-loader @babel/core @babel/preset-env webpack
```

安装 copy-webpack-plugin 插件，将 index.html 需要原封不动拷到 输出目录

```
yarn add -D copy-webpack-plugin
```

安装 raw-loader，处理 glsl 代码块，直接导入主函数

```
yarn add -D raw-loader
```

安装 clean-webpack-plugin 插件，每次编译都清理输出目录

```
yarn add -D clean-webpack-plugin
```

添加 sass 支持

```shell
yarn add -D sass-loader sass
```

安装环境后，一个最简的 webgl 网页应该有以下目录文件

```
|- shader # 存放 glsl 程序
|-- fragment.glsl
|-- vertex.glsl
|- index.html # web 入口
|- index.js
```

## 如何运行 demo

```
yarn dev --env demo=<src目录下demo名称>
```

## `VsCode` 配置 `glsl` 环境

`glsl` 语言要得到语法高亮，市场搜索并安装 Clang-Format 插件，

Clang-Format 插件本身运作依赖于 clang-format 程序，需要单独下载，

最简单的方式是使用 node 全局安装，

```shell
npm install --global clang-format
```

下载完后，找到 `clang-format.exe` 目录，填写到 `vscode` 插件配置即可

```json
{
  "clang-format.executable": "<npm全局安装包路径>\\npm\\node_modules\\clang-format\\bin\\win32\\clang-format",
}
```

## typescript 支持

按照 `webpack` 文档添加 ts-loader 支持，有几个问题需要考虑：

1. babel vs typescript，转译用哪家
2. typescript 对 `alias.resolve` 支持

##### babel vs typescript，转译用哪家

按照[官网的说法](https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html)，

- 如果你的输入文件和输出文件大部分一致，则使用  tsc 转译足够了；
- 如果你需要一个构件管道来输出多个不同的文件，使用 babel 做转译，tsc 做类型检查；

如果使用 babel 做转译，`tsc` 做类型检查，转译时将不能得到类型检查，这可能导致错误被忽略；

另一方面， babel 做转译没法生成 .d.ts 文件，如果是第三方库工程将得不到 类型声明的好处，为了解决这些问题，`tsconfig.json` 做一下配置，

```json
// tsconfig.js
"compilerOptions": {
  // 保证 .d.ts 文件由 tsc 生成
  "declaration": true,
  // 只输出 .d.ts 文件，不输出 .js 文件（由babel转译）
  "emitDeclarationOnly": true,
  // 保证 babel 转译后，得到 ts 检查的警告
  "isolatedModules": true
}
```

`isolatedModules` 配置的原理是，babel 进行转译时是单个文件进行的，这就导致一些需要多个文件类型分析的错误没法暴露出来，激活了 `isolatedModules` 标志将不会修改任何现有逻辑，只不过 typescript 会对这些错误进行警告；

##### typescript 对 alias.resolve 支持

工程如果需要对常用路径绑定一个常量，比如，绑定 @common 指向一个公共代码目录，可以配置 `webpack.config.js` 实现

```json
// webpack.config.js
...
resolve: {
    alias: {
        '@common': path.resolve(__dirname, '../src/common'),
    },
},
```

由于添加了 ts 支持，ts 本身没法感知到 webpack 的 resolve.alias 配置，解决这个问题的方法有几个：

1. `webpack.config.js` 和 `tsconfig.json` 同时配置路径映射；
2. 使用 `awesome-typescript-loader` 代替 `ts-loader`，因为 `awesome-typescript-loader` 中提供 `TsConfigPathsPlugin` 插件，该插件可以将tsconfig.json中的路径映射copy到webpack.resolve.alias中，我们只需要在tsconfig.json中配置路径映射即可。

##### webpack.config.js 和 tsconfig.json 同时配置路径映射

webpack.config.js 部分前面已经提到，tsconfig.json 也有类似的配置选项，[官方文档](https://www.typescriptlang.org/docs/handbook/module-resolution.html#additional-module-resolution-flags)

```
// tsconfig.json
"compilerOptions": {
 "paths": {
      "@common/*": ["src/common/*"],
    }
}
```

##### `awesome-typescript-loader`  代替 ts-loader

这种方案节省了 webpack 部分的配置，插件通过 TsConfigPathsPlugin 配置读取 tsconfig.json 文件，只需要在 tsconfig.json 配置了 paths 解析即可

```js
 resolve: {
    plugins: [
      new TsConfigPathsPlugin({
        configFileName: Path.resolve(__dirname,'../tsconfig.json')
      })
    ]
  }
```

## shader 语法支持

webgl 程序 绑定 shader 流程：

```js
// 1. 创建shader实例
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
// 2. 绑定 shader 代码片段
gl.shaderSource(fragmentShader, fragment);
// 3. 编译shader
gl.compileShader(fragmentShader);
```

shader 代码片段 就是一个字符串，使用模板字符串定义

```js
const fragment = `
    precision mediump float;
    varying vec3 color;

    void main() { gl_FragColor = vec4(color, 1.0); }
`
```

如果代码片段变得庞大，为了更好管理程序，我们需要语法高亮、智能提醒的好处，因此考虑将其独立成 .glsl 格式文件

为了达到这个需求，需要做到两点：

- webpack 正确解析 .glsl 格式；
- typescript 正确解析 .glsl 文件的导入

前者借助 raw-loader ，将 .glsl 作为字符串解析，配置如下：

```json
{
    test: /\.glsl$/,
    loader: 'raw-loader',
},
```

后者使用 typescript [模块类型补全特性](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)，让 ts 正确解析 .glsl 文件的类型；

在工程根目录创建 @types 目录，添加 global.d.ts 文件，ts 会自动检测 @types 目录下的文件

```js
// @types/global.d.ts
declare module '*.glsl'
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



## 1. 创建 `webgl` 程序，使用 webGL 绘制一个 三角形

**对应例子**： [webgl-starter](http://localhost:5000/webgl-starter/index)

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

