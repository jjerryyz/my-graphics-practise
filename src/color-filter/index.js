import { getImageData, traverse, gaussianBlur } from "./lib/utils.js";
import {
  transformColor,
  grayscale,
  channel,
  brightness,
  saturate,
} from "./lib/color-matrix.js";

function loadImage(src) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  return new Promise((resolve) => {
    img.onload = () => {
      resolve(img);
    };
    img.src = src;
  });
}

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

(async function () {
  // 异步加载图片
  const img = await loadImage(
    // "https://p2.ssl.qhimg.com/d/inn/4b7e384c55dc/girl1.jpg",
    "https://static001.geekbang.org/resource/image/8f/f5/8fa0dbf5e0514193c0b8b15e5ea294f5.jpg" // 测试磨皮
  );

  const imageData = getImageData(img);
  const { width, height, data } = imageData;

  // 灰度化
  // traverse(imageData, ({r, g, b, a}) => {
  //   const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  //   return [v, v, v, a];
  // });

  // 灰度化（颜色矩阵）
  // traverse(imageData, ({r, g, b, a}) => transformColor([r, g, b, a], grayscale(1)));

  // 颜色通道
  // traverse(imageData, ({r, g, b, a}) => transformColor([r, g, b, a], channel({r: 100})));

  // 调亮度 0 = 全黑，1 = 原色, >1 增亮
  // traverse(imageData, ({r, g, b, a}) => transformColor([r, g, b, a], brightness(2)));

  // 阳光感，效果叠加=颜色矩阵相乘
  // traverse(imageData, ({ r, g, b, a }) => {
  //   return transformColor(
  //     [r, g, b, a],
  //     channel({ r: 1.2 }), // 增强红色通道
  //     brightness(1.2), // 增强亮度
  //     saturate(1.2) // 增强饱和度
  //   );
  // });

  gaussianBlur(imageData.data, width, height);
  
  // 将图片绘制到 canvas
  canvas.width = width;
  canvas.height = height;
  context.putImageData(imageData, 0, 0);
})();
