export const centroid = (points) => points
  .reduce(([x, y], [prevX, prevY]) => [x + prevX, y + prevY], [0, 0])
  .map(n => n / points.length);

export const dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);

export const transpose = m => m[0].map((x, i) => m.map(y => y[i]));

export const mmul = (a, b) => a.map(x => transpose(b).map(y => dot(x, y)));

export const det2 = (m) => (m[0][0] * m[1][1]) - (m[0][1] * m[1][0]);

export const mulColumn = (m, col, n) => {
  const tmp = transpose(m);
  tmp[col] = tmp[col].map(x => x * n);
  return transpose(tmp);
};

export const rotMatrix = (angle) => {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
    [c , s],
    [-s, c],
  ]
}

export const identityMatrix = () => [[1, 0], [0, 1]];

