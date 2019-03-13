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

![Image showing fit_transform applied to a 2-point dataset][https: //user-images.githubusercontent.com/49605/54288513-e546fb00-45a7-11e9-84f0-297dddcb2f8c.png]
![Image showing fit_transform applied to a 3-point dataset
][https: //user-images.githubusercontent.com/49605/54288515-e546fb00-45a7-11e9-832c-c7950efe28bb.png]
![Image showing fit_transform applied to a 3-point dataset
][https: //user-images.githubusercontent.com/49605/54288517-e5df9180-45a7-11e9-8e46-646377ad0ff0.png]

See also
[examples](https://github.com/ardcore/fit_transform/tree/master/examples)

