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

let canvas = document.getElementById("base");
const baseContext = canvas.getContext("2d");

(async function () {
  const img = await loadImage(
    "https://p2.ssl.qhimg.com/d/inn/4b7e384c55dc/girl1.jpg"
  );
  baseContext.drawImage(img, 0, 0);

  const zoomContext = document.getElementById("zoom").getContext("2d");

  // 反锯齿选项
  const smoothBtn = document.getElementById('smoothbtn');
  smoothBtn.addEventListener('change', (_) => {
    zoomContext.imageSmoothingEnabled = this.checked;
    zoomContext.mozImageSmoothingEnabled = this.checked;
    zoomContext.webkitImageSmoothingEnabled = this.checked;
    zoomContext.msImageSmoothingEnabled = this.checked;
  })

  canvas.addEventListener("mousemove", (event) => {
    var x = event.layerX;
    var y = event.layerY;
    zoomContext.drawImage(
      canvas,
      Math.abs(x - 5),
      Math.abs(y - 5),
      10,
      10,
      0,
      0,
      200,
      200
    );
  });
})();
