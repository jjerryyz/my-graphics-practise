export function cube(size = 1.0, colors = [[1, 0, 0, 1]]) {
  const h = 0.5 * size;
  const vertices = [
    [-h, -h, -h],
    [-h, h, -h],
    [h, h, -h],
    [h, -h, -h],
    [-h, -h, h],
    [-h, h, h],
    [h, h, h],
    [h, -h, h],
  ];

  const positions = [];
  const color = [];
  const cells = [];

  let colorIdx = 0;
  let cellsIdx = 0;
  const colorLen = colors.length;

  function quad(a, b, c, d) {
    [a, b, c, d].forEach((i) => {
      positions.push(vertices[i]);
      color.push(colors[colorIdx % colorLen]);
    });
    cells.push(
      [0, 1, 2].map((i) => i + cellsIdx),
      [0, 2, 3].map((i) => i + cellsIdx)
    );
    colorIdx++;
    cellsIdx += 4;
  }

  quad(1, 0, 3, 2);
  quad(4, 5, 6, 7);
  quad(2, 3, 7, 6);
  quad(5, 4, 0, 1);
  quad(3, 0, 4, 7);
  quad(6, 5, 1, 2);

  return { positions, color, cells };
}
