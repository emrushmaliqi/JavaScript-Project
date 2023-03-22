const themes = {
  light: {
    bg: "#f8f8f8",
    text: "#030303",
    emphasize: "#787878",
    "btn-text": "#f8f8f8",
    "token-hover": "#e3e3e3",
  },
  dark: {
    bg: "#000000",
    text: "#d8d8d8",
    emphasize: "#585858",
    "btn-text": "#040404",
    "token-hover": "#131313",
  },
};

function getLocalMode() {
  return JSON.parse(localStorage.getItem("darkMode") || "false");
}

function setTheme(isDarkMode) {
  let r = document.querySelector(":root");

  for (const [key, value] of Object.entries(
    isDarkMode ? themes.dark : themes.light
  )) {
    r.style.setProperty(`--${key}`, value);
  }

  const lightModeText = document.getElementById("lightModeText");
  const darkModeText = document.getElementById("darkModeText");
  const circle = document.getElementById("theme-circle");

  if (lightModeText && darkModeText) {
    if (isDarkMode) {
      darkModeText.classList.remove("not-active-mode");
      lightModeText.classList.add("not-active-mode");
      circle.classList.add("dark-theme-circle");
    } else {
      lightModeText.classList.remove("not-active-mode");
      darkModeText.classList.add("not-active-mode");
      circle.classList.remove("dark-theme-circle");
    }
  }
}

function switchTheme() {
  const oppositeMode = !getLocalMode();
  setTheme(oppositeMode);
  localStorage.setItem("darkMode", JSON.stringify(oppositeMode));
}

function Header(location) {
  if (!getLocalMode()) localStorage.setItem("darkMode", JSON.stringify(false));

  return `
  <nav class="container navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" id="navTitle" href="index.html">CryptoTrack</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link ${
            location == "home" && "active"
          }" aria-current="page" href="index.html">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link ${
            location == "watchList" && "active"
          }" href="watch-list.html">WatchList</a>
        </li>
        <li class="nav-item">
          <a class="nav-link ${
            location == "wallet" && "active"
          }" href="wallet-page.html">Wallet</a>
        </li>
      </ul>
      <form class=" mx-auto d-flex ${
        location == "home" ? "" : "invisible"
      }" id="searchForm" role="search">
        <input class="form-control me-2" id="searchQuery" type="search" placeholder="Search Tokens" aria-label="Search">
        <button class="btn btn-outline-primary" type="submit">Search</button>
      </form>
      <div class="d-flex gap-1">
        <span id="lightModeText">Light</span>
        <div id="themeSwitcher" type="button" class="bg-primary">
          <div id="theme-circle"></div>
        </div>
        <span id="darkModeText">Dark</span>
        </div>
      </div>
    </div>
  </nav>
  `;
}
export default function initializeHeader(location) {
  header.innerHTML = Header(location);
  setTheme(getLocalMode());
  themeSwitcher.addEventListener("click", () => switchTheme());
}
