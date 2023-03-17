export function toggleScroller() {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      scrollToTop.classList.remove("d-none");
    } else {
      scrollToTop.classList.add("d-none");
    }
  });
}
