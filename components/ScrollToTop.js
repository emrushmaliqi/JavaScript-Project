function scrollToTopElement() {
  return `
    <div
      type="button"
      id="scrollToTop"
      class="bg-light rounded-start position-fixed end-0 bottom-0 mb-5 ps-2 d-none"
      style="width: 75px; height: 35px"
    >
      <span style="font-size: 32px; line-height: 1">&#708;</span>
    </div>
    `;
}

export default function initializeScrollToTop() {
  scrollerContainer.innerHTML = scrollToTopElement();
  scrollToTop.addEventListener("click", () => window.scrollTo(0, 0));
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      scrollToTop.classList.remove("d-none");
    } else {
      scrollToTop.classList.add("d-none");
    }
  });
}
