
import { multiply } from "../common/lib/math/functions/Mat4Func.js";
import {cross, subtract, normalize} from '../common/lib/math/functions/Vec3Func.js';

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

  const norm = [
    [0, 0, -1][(0, 0, 1)][(0, -1, 0)][(0, 1, 0)][(-1, 0, 0)][(1, 0, 0)],
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

  return { positions, color, cells, norm };
}


export function fromRotation(rotationX, rotationY, rotationZ) {
  let c = Math.cos(rotationX);
  let s = Math.sin(rotationX);
  const rx = [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];

  c = Math.cos(rotationY);
  s = Math.sin(rotationY);
  const ry = [c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1];

  c = Math.cos(rotationZ);
  s = Math.sin(rotationZ);
  const rz = [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

  const ret = [];
  multiply(ret, rx, ry);
  multiply(ret, ret, rz);
  return ret;
}

export function cylinder(
  radius = 1.0,
  height = 1.0,
  segments = 30,
  colorCap = [0, 0, 1, 1],
  colorSide = [1, 0, 0, 1]
) {
  const positions = [];
  const cells = [];
  const color = [];
  const cap = [[0, 0]];
  const h = 0.5 * height;
  const normal = [];

  // 顶和底的圆
  for(let i = 0; i <= segments; i++) {
    const theta = Math.PI * 2 * i / segments;
    const p = [radius * Math.cos(theta), radius * Math.sin(theta)];
    cap.push(p);
  }

  positions.push(...cap.map(([x, y]) => [x, y, -h]));
  normal.push(...cap.map(() => [0, 0, -1]));
  for(let i = 1; i < cap.length - 1; i++) {
    cells.push([0, i, i + 1]);
  }
  cells.push([0, cap.length - 1, 1]);

  let offset = positions.length;
  positions.push(...cap.map(([x, y]) => [x, y, h]));
  normal.push(...cap.map(() => [0, 0, 1]));
  for(let i = 1; i < cap.length - 1; i++) {
    cells.push([offset, offset + i, offset + i + 1]);
  }
  cells.push([offset, offset + cap.length - 1, offset + 1]);

  color.push(...positions.map(() => colorCap));

  const tmp1 = [];
  const tmp2 = [];
  // 侧面
  offset = positions.length;
  for(let i = 1; i < cap.length; i++) {
    const a = [...cap[i], h];
    const b = [...cap[i], -h];
    const nextIdx = i < cap.length - 1 ? i + 1 : 1;
    const c = [...cap[nextIdx], -h];
    const d = [...cap[nextIdx], h];

    positions.push(a, b, c, d);

    const norm = [];
    cross(norm, subtract(tmp1, b, a), subtract(tmp2, c, a));
    normalize(norm, norm);
    normal.push(norm, norm, norm, norm);

    color.push(colorSide, colorSide, colorSide, colorSide);
    cells.push([offset, offset + 1, offset + 2], [offset, offset + 2, offset + 3]);
    offset += 4;
  }

  return {positions, cells, color, normal};
}
