export function getRandomFace() {
  let randomLimit = Math.floor(Math.random() * 6);
  return randomLimit + 1;
}

export function invariant() {
  console.warn(...arguments);
}
