export const angleBetween = ([a1, a2], [b1, b2]) => {
  var dAx = a2[0] - a1[0];
  var dAy = a2[1] - a1[1];
  var dBx = b2[0] - b1[0];
  var dBy = b2[1] - b1[1];
  var angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
  if (angle < 0) angle = angle * -1;
  return angle;
}
