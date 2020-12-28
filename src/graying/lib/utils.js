
export function getImageData(img, rect = [0, 0, img.width, img.height]) {
  const canvas = new OffscreenCanvas(img.width, img.height);
  const context = canvas.getContext("2d");
  context.drawImage(img, 0, 0);
  // imageDataContext.set(img, context);
  return context.getImageData(...rect);
}

export function traverse(imageData, pass) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = pass({
      r: data[i] / 255,
      g: data[i + 1] / 255,
      b: data[i + 2] / 255,
      a: data[i + 3] / 255,
    });
    data.set([r, g, b, a].map( e=> Math.round(e*255)), i);
  }
  return imageData;
}
