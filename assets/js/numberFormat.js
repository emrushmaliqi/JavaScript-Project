export function numberWithCommas(x) {
  if (x < 1) return x;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
