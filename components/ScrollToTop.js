export default function scrollToTop() {
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
