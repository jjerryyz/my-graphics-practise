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

  const previewDiv = document.getElementById("preview");
  const selectedDiv = document.getElementById("selected");

  const pick = (event, destination) => {
    const x = event.layerX;
    const y = event.layerY;
    const pixel = baseContext.getImageData(x, y, 1, 1);
    const data = pixel.data;

    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    destination.style.background = rgba;
    destination.textContent = rgba;

    return rgba;
  };

  canvas.addEventListener("mousemove", (event) => pick(event, previewDiv));
  canvas.addEventListener("click", (event) => pick(event, selectedDiv));
})();
