# fit_transform

## Problem

_Given a corresponding sets of 2D points A and B, find and apply an optimal transformation matrix to bring set A [as close as possible](https://en.wikipedia.org/wiki/Root-mean-square_deviation) to set B._

## Solution

- fit_transform implements full [Kabsch algorithm](https://en.wikipedia.org/wiki/Kabsch_algorithm) for datasets where `N >= 3`
- _closeness_ of sets is understood as RMSD
- this implementation focuses on 2D points only, but can be easily
  generalised to support more dimensions


## API

  - `fitTransform(A, B) -> A'` -- returns a transformed dataset
  - `kabsch(A, B) -> C` -- returns an optimal rotation matrix

## Installing and Testing

    yarn
    yarn build
    yarn test
    cd examples/
    python -m SimpleHTTPServer

## Examples

See
[examples](https://github.com/ardcore/fit_transform/tree/master/examples)

