export function random6() {
  return new Date()
    .getTime()
    .toString()
    .substr(-6, 6);
}
