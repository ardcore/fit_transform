import kabsch from "./kabsch.js";
import { angleBetween } from "./utils/vector.js";
import {
  mmul,
  centroid,
  rotMatrix,
  identityMatrix
} from "./utils/matrix.js";

const fitTransform = (s1, s2) => {

  if (s1.length !== s2.length) {
    throw new Error("matrices must have same length");
  }

  // we have different strategies of finding the rotationMatrix
  // depending on the numbers of points in our dataset.
  let rotationMatrix;

  // for a single point, we don't need to calculate rotation:
  if (s1.length === 1) {
    rotationMatrix = identityMatrix();

  // we can treat 2-point datasets as vectors:
  } else if (s1.length === 2) {
    const deg = angleBetween(s1, s2);
    rotationMatrix = rotMatrix(deg);

  // for datasets of 3 points and more, we need to resort to the
  // the kabsch algorithm
  } else {
    rotationMatrix = kabsch(s1, s2);
  }

  const rotated = mmul(s1, rotationMatrix);

  const c2 = centroid(s2);
  const cr = centroid(rotated);

  const vec = [cr[0] - c2[0], cr[1] - c2[1]];
  const transformed = rotated.map(([x, y]) => [x - vec[0], y - vec[1]]);

  return transformed;
};

export { fitTransform, kabsch };
