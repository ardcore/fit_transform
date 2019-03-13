const PAD_RATIO = 0.75;

const drawCircle = (context, x, y, r, color) => {
  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
  context.lineWidth = 1;
  context.strokeStyle = 'black';
  context.stroke();
}

const drawIndex = (context, text, x, y, color) => {
  context.fillStyle = color;
  context.font = "10px monospace";
  context.scale(1, -1);
  context.fillText(text, Math.round(x), -(Math.round(y - 15)));
  context.scale(1, -1);
}

export const render = (context, scale) => (points, labels, color) => {
  points
    .map(([x, y]) => [x * scale * PAD_RATIO, y * scale * PAD_RATIO])
    .forEach((p, i) => {
      drawCircle(context, p[0], p[1], 3, color);
      drawIndex(context, labels[i], p[0], p[1], "black");
    });
};

