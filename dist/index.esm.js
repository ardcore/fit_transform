var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var src = createCommonjsModule(function (module, exports) {

  var __assign = commonjsGlobal && commonjsGlobal.__assign || function () {
    __assign = Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];

        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }

      return t;
    };

    return __assign.apply(this, arguments);
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /** SVD procedure as explained in "Singular Value Decomposition and Least Squares Solutions. By G.H. Golub et al."
   *
   * This procedure computes the singular values and complete orthogonal decomposition of a real rectangular matrix A:
   *
   * `A = U * diag(q) * V(t), U(t) * U = V(t) * V = I`
   *
   * where the arrays `a`, `u`, `v`, `q` represent `A`, `U`, `V`, `q` respectively. The actual parameters corresponding to `a`, `u`, `v` may
   * all be identical unless `withu = withv = true`. In this case, the actual parameters corresponding to `u` and `v` must
   * differ. `m >= n` is assumed (with `m = a.length` and `n = a[0].length`)
   *
   *  @param a  Represents the matrix A to be decomposed
   *  @param options SVD options
   *
   * @returns {SVDResult} the result of the svd
   */

  function SVD(a, options) {
    var _a = __assign({
      u: true,
      v: true,
      eps: Math.pow(2, -52)
    }, options),
        withu = _a.u,
        withv = _a.v,
        eps = _a.eps;

    var tol = 1e-64 / eps; // throw error if a is not defined

    if (!a) {
      throw new TypeError("Matrix a is not defined");
    } // Householder's reduction to bidiagonal form


    var n = a[0].length;
    var m = a.length;

    if (m < n) {
      throw new TypeError("Invalid matrix: m < n");
    }

    var l1, c, f, h, s, y, z;
    var l = 0,
        g = 0,
        x = 0;
    var e = [];
    var u = [];
    var v = []; // Initialize u

    for (var i = 0; i < m; i++) {
      u[i] = new Array(n).fill(0);
    } // Initialize v


    for (var i = 0; i < n; i++) {
      v[i] = new Array(n).fill(0);
    } // Initialize q


    var q = new Array(n).fill(0); // Copy array a in u

    for (var i = 0; i < m; i++) {
      for (var j = 0; j < n; j++) {
        u[i][j] = a[i][j];
      }
    }

    for (var i = 0; i < n; i++) {
      e[i] = g;
      s = 0;
      l = i + 1;

      for (var j = i; j < m; j++) {
        s += Math.pow(u[j][i], 2);
      }

      if (s < tol) {
        g = 0;
      } else {
        f = u[i][i];
        g = f < 0 ? Math.sqrt(s) : -Math.sqrt(s);
        h = f * g - s;
        u[i][i] = f - g;

        for (var j = l; j < n; j++) {
          s = 0;

          for (var k = i; k < m; k++) {
            s += u[k][i] * u[k][j];
          }

          f = s / h;

          for (var k = i; k < m; k++) {
            u[k][j] = u[k][j] + f * u[k][i];
          }
        }
      }

      q[i] = g;
      s = 0;

      for (var j = l; j < n; j++) {
        s += Math.pow(u[i][j], 2);
      }

      if (s < tol) {
        g = 0;
      } else {
        f = u[i][i + 1];
        g = f < 0 ? Math.sqrt(s) : -Math.sqrt(s);
        h = f * g - s;
        u[i][i + 1] = f - g;

        for (var j = l; j < n; j++) {
          e[j] = u[i][j] / h;
        }

        for (var j = l; j < m; j++) {
          s = 0;

          for (var k = l; k < n; k++) {
            s += u[j][k] * u[i][k];
          }

          for (var k = l; k < n; k++) {
            u[j][k] = u[j][k] + s * e[k];
          }
        }
      }

      y = Math.abs(q[i]) + Math.abs(e[i]);

      if (y > x) {
        x = y;
      }
    } // Accumulation of right-hand transformations


    if (withv) {
      for (var i = n - 1; i >= 0; i--) {
        if (g !== 0) {
          h = u[i][i + 1] * g;

          for (var j = l; j < n; j++) {
            v[j][i] = u[i][j] / h;
          }

          for (var j = l; j < n; j++) {
            s = 0;

            for (var k = l; k < n; k++) {
              s += u[i][k] * v[k][j];
            }

            for (var k = l; k < n; k++) {
              v[k][j] = v[k][j] + s * v[k][i];
            }
          }
        }

        for (var j = l; j < n; j++) {
          v[i][j] = 0;
          v[j][i] = 0;
        }

        v[i][i] = 1;
        g = e[i];
        l = i;
      }
    } // Accumulation of left-hand transformations


    if (withu) {
      for (var i = n - 1; i >= 0; i--) {
        l = i + 1;
        g = q[i];

        for (var j = l; j < n; j++) {
          u[i][j] = 0;
        }

        if (g !== 0) {
          h = u[i][i] * g;

          for (var j = l; j < n; j++) {
            s = 0;

            for (var k = l; k < m; k++) {
              s += u[k][i] * u[k][j];
            }

            f = s / h;

            for (var k = i; k < m; k++) {
              u[k][j] = u[k][j] + f * u[k][i];
            }
          }

          for (var j = i; j < m; j++) {
            u[j][i] = u[j][i] / g;
          }
        } else {
          for (var j = i; j < m; j++) {
            u[j][i] = 0;
          }
        }

        u[i][i] = u[i][i] + 1;
      }
    } // Diagonalization of the bidiagonal form


    eps = eps * x;
    var testConvergence;

    for (var k = n - 1; k >= 0; k--) {
      for (var iteration = 0; iteration < 50; iteration++) {
        // test-f-splitting
        testConvergence = false;

        for (l = k; l >= 0; l--) {
          if (Math.abs(e[l]) <= eps) {
            testConvergence = true;
            break;
          }

          if (Math.abs(q[l - 1]) <= eps) {
            break;
          }
        }

        if (!testConvergence) {
          // cancellation of e[l] if l>0
          c = 0;
          s = 1;
          l1 = l - 1;

          for (var i = l; i < k + 1; i++) {
            f = s * e[i];
            e[i] = c * e[i];

            if (Math.abs(f) <= eps) {
              break; // goto test-f-convergence
            }

            g = q[i];
            q[i] = Math.sqrt(f * f + g * g);
            h = q[i];
            c = g / h;
            s = -f / h;

            if (withu) {
              for (var j = 0; j < m; j++) {
                y = u[j][l1];
                z = u[j][i];
                u[j][l1] = y * c + z * s;
                u[j][i] = -y * s + z * c;
              }
            }
          }
        } // test f convergence


        z = q[k];

        if (l === k) {
          // convergence
          if (z < 0) {
            // q[k] is made non-negative
            q[k] = -z;

            if (withv) {
              for (var j = 0; j < n; j++) {
                v[j][k] = -v[j][k];
              }
            }
          }

          break; // break out of iteration loop and move on to next k value
        } // Shift from bottom 2x2 minor


        x = q[l];
        y = q[k - 1];
        g = e[k - 1];
        h = e[k];
        f = ((y - z) * (y + z) + (g - h) * (g + h)) / (2 * h * y);
        g = Math.sqrt(f * f + 1);
        f = ((x - z) * (x + z) + h * (y / (f < 0 ? f - g : f + g) - h)) / x; // Next QR transformation

        c = 1;
        s = 1;

        for (var i = l + 1; i < k + 1; i++) {
          g = e[i];
          y = q[i];
          h = s * g;
          g = c * g;
          z = Math.sqrt(f * f + h * h);
          e[i - 1] = z;
          c = f / z;
          s = h / z;
          f = x * c + g * s;
          g = -x * s + g * c;
          h = y * s;
          y = y * c;

          if (withv) {
            for (var j = 0; j < n; j++) {
              x = v[j][i - 1];
              z = v[j][i];
              v[j][i - 1] = x * c + z * s;
              v[j][i] = -x * s + z * c;
            }
          }

          z = Math.sqrt(f * f + h * h);
          q[i - 1] = z;
          c = f / z;
          s = h / z;
          f = c * g + s * y;
          x = -s * g + c * y;

          if (withu) {
            for (var j = 0; j < m; j++) {
              y = u[j][i - 1];
              z = u[j][i];
              u[j][i - 1] = y * c + z * s;
              u[j][i] = -y * s + z * c;
            }
          }
        }

        e[l] = 0;
        e[k] = f;
        q[k] = x;
      }
    } // Number below eps should be zero


    for (var i = 0; i < n; i++) {
      if (q[i] < eps) q[i] = 0;
    }

    return {
      u: u,
      q: q,
      v: v
    };
  }

  exports.default = SVD;
});
var SVD = unwrapExports(src);

const centroid = points => points.reduce(([x, y], [prevX, prevY]) => [x + prevX, y + prevY], [0, 0]).map(n => n / points.length);
const dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
const transpose = m => m[0].map((x, i) => m.map(y => y[i]));
const mmul = (a, b) => a.map(x => transpose(b).map(y => dot(x, y)));
const det2 = m => m[0][0] * m[1][1] - m[0][1] * m[1][0];
const rotMatrix = angle => {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [[c, s], [-s, c]];
};
const identityMatrix = () => [[1, 0], [0, 1]];

// https://en.wikipedia.org/wiki/Kabsch_algorithm

var kabsch = ((m1, m2) => {
  // step 1:
  // translate data sets to the origin of coordinate system
  const c1 = centroid(m1);
  const c2 = centroid(m2);
  const t1 = m1.map(([x, y]) => [x - c1[0], y - c1[1]]);
  const t2 = m2.map(([x, y]) => [x - c2[0], y - c2[1]]); // step 2:
  // calculate covariance matrix

  const cov = mmul(transpose(t1), t2); // step 3:
  // calculate optimal rotation matrix using SVD
  // (https://en.wikipedia.org/wiki/Singular_value_decomposition)

  let {
    u,
    q,
    v
  } = SVD(cov);
  v = transpose(v); // ensure a right-handed coordinate system
  // by finding determinant of UV

  const du = det2(u);
  const dv = det2(v);

  const rotationMatrix = mmul(u, v);
  return rotationMatrix;
});

const angleBetween = ([a1, a2], [b1, b2]) => {
  var dAx = a2[0] - a1[0];
  var dAy = a2[1] - a1[1];
  var dBx = b2[0] - b1[0];
  var dBy = b2[1] - b1[1];
  var angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
  if (angle < 0) angle = angle * -1;
  return angle;
};

const fitTransform = (s1, s2) => {
  if (s1.length !== s2.length) {
    throw new Error("matrices must have same length");
  } // we have different strategies of finding the rotationMatrix
  // depending on the numbers of points in our dataset.


  let rotationMatrix; // for a single point, we don't need to calculate rotation:

  if (s1.length === 1) {
    rotationMatrix = identityMatrix(); // we can treat 2-point datasets as vectors:
  } else if (s1.length === 2) {
    const deg = angleBetween(s1, s2);
    rotationMatrix = rotMatrix(deg); // for datasets of 3 points and more, we need to resort to the
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
