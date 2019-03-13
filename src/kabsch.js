import SVD from "svd-finder";
import {
  transpose,
  mmul,
  det2,
  centroid,
  mulColumn,
} from "./utils/matrix.js";

// Kabsch Algorithm, as described here:
// https://en.wikipedia.org/wiki/Kabsch_algorithm

export default (m1, m2) => {
  // step 1:
  // translate data sets to the origin of coordinate system
  const c1 = centroid(m1);
  const c2 = centroid(m2);
  const t1 = m1.map(([x, y]) => [x - c1[0], y - c1[1]]);
  const t2 = m2.map(([x, y]) => [x - c2[0], y - c2[1]]);

  // step 2:
  // calculate covariance matrix
  const cov = mmul(transpose(t1), t2);

  // step 3:
  // calculate optimal rotation matrix using SVD
  // (https://en.wikipedia.org/wiki/Singular_value_decomposition)
  let { u, q, v } = SVD(cov);
  v = transpose(v);

  // ensure a right-handed coordinate system
  // by finding determinant of UV
  const du = det2(u);
  const dv = det2(v);

  const d = du * dv;

  if (d < 0) {
    //v = mulColumn(v, 1, -1);
  }

  const rotationMatrix = mmul(u, v);

  return rotationMatrix;
};

