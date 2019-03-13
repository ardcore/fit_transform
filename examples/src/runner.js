import { fitTransform } from "../../src/index.js";
import { render } from "../../src/utils/renderer.js";
import { sanitize, desanitize } from "./sanitize.js";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const flat = arr => [].concat(...arr);

export const runner = (m1, m2) => {
  const s1 = sanitize(m1);
  const s2 = sanitize(m2);
  const ctx = document.querySelector("#canvas1").getContext("2d");
  ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  ctx.scale(1, -1);

  const renderScale =
    Math.max(CANVAS_WIDTH, CANVAS_HEIGHT)
      / Math.max(...flat([...s1, ...s2])
      .map(Math.abs)) / 2;

  const show = render(ctx, renderScale);

  show(s1, Object.keys(m1), "blue");
  show(s2, Object.keys(m1), "red");

  const res = fitTransform(s1, s2);

  const resPrepared = desanitize(Object.keys(m1), res);
  show(res, Object.keys(resPrepared), "yellow");
  console.log("result", resPrepared);
}
