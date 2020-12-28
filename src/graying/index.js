import { getImageData, traverse } from "./lib/utils.js";
import { transformColor, grayscale } from './lib/color-matrix.js';

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
    "https://p2.ssl.qhimg.com/d/inn/4b7e384c55dc/girl1.jpg"
  );

  const imageData = getImageData(img);
  const {width, height, data} = imageData;

  // 灰度化
  // traverse(imageData, ({r, g, b, a}) => {
  //   const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  //   return [v, v, v, a];
  // });

  // 灰度化（颜色矩阵）
  traverse(imageData, ({r, g, b, a}) => transformColor([r, g, b, a], grayscale(1)));

  

  // 将图片绘制到 canvas
  canvas.width = width;
  canvas.height = height;
  context.putImageData(imageData, 0, 0);
})();
