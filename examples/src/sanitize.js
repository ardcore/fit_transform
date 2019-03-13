export const sanitize = obj => Object.values(obj);
export const desanitize = (keys, arr) => arr.reduce((prev, curr, i) => {
  return { ...prev, [keys[i]]: curr };
}, {});
