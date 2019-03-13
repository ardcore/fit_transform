const test = require('tape');
const { fitTransform } = require('..');

test('transform 1 point', function (t) {
  const m1 = [
    [0, 0],
  ]
  const m2 = [
    [2, 2],
  ]
  const res = fitTransform(m1, m2);
  t.deepEqual(
    res,
    m2
  );
  t.end();
});
test('transform 2 overlapping points without rotation', function (t) {
  const m1 = [
    [0, 0],
    [10, 10]
  ]
  const m2 = [
    [20, 20],
    [30, 30]
  ]
  const res = fitTransform(m1, m2);
  t.deepEqual(
    res,
    m2
  );
  t.end();
});

test('transform 3 non-overlapping points with rotation', function (t) {
  const m1 = [
    [0, 0],
    [10, 0],
    [0, 10]
  ]
  const m2 = [
    [20, 20],
    [40, 20],
    [20, 40]
  ]
  const res = fitTransform(m1, m2);
  t.deepEqual(
    res,
    [ [ 23.333333333333336, 23.333333333333336 ],
      [ 33.333333333333336, 23.333333333333336 ],
      [ 23.333333333333336, 33.333333333333336 ] ]
  );
  t.end();
});

test('throw for non-equal matrices', function (t) {
  const m1 = [
    [0, 0],
    [10, 0],
  ]
  const m2 = [
    [20, 20],
    [40, 20],
    [20, 40]
  ]
  t.throws(
    () => fitTransform(m1, m2),
    Error
  )
  t.end();
});

