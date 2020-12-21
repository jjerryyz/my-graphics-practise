import { Vector2D } from "../common/lib/vector2d.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.translate(canvas.width/2, canvas.height/2);
ctx.scale(1, -1);
ctx.lineCap = "round";

const drawCoord = (context) => {
  context.save();
  context.beginPath();
  context.strokeStyle = 'grey';
  context.setLineDash([5]);
  context.moveTo(-canvas.width/2, 0);
  context.lineTo(canvas.width, 0);
  context.moveTo(0, -canvas.height);
  context.lineTo(0, canvas.height);
  context.stroke();
  context.restore();
}

const draw = (context, lpa, lpb, p) => {
  const va = new Vector2D(lpa.x, lpa.y);
  const vb = new Vector2D(lpb.x, lpb.y);
  const vp = new Vector2D(p.x, p.y);

  const vpa = vp.copy().sub(va);
  const vba = vb.copy().sub(va);

  const vpaVertical = vba.copy().rotate( -Math.PI/2 );

  context.beginPath();
  context.moveTo(...va);
  context.lineTo(...vb);
  context.moveTo(...va);
  context.lineTo(...vp);

  context.moveTo(...vp);
  context.lineTo(...vp.copy().add(vpaVertical));
  context.stroke();

  const ret = vpa.cross(vba);
  console.log("ret", ret, ret / vba.length);
};

drawCoord(ctx);
draw(ctx, { x: 10, y: 10 }, { x: 40, y: 80 }, { x: 10, y: 50 });
