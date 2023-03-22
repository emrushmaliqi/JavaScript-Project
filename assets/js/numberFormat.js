export function numberWithCommas(x) {
  if (x < 1) {
    if (x < 0.001) return x.toFixed(7);

    return x.toFixed(3);
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
