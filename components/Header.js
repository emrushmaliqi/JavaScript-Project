export default function Header(location) {
  return `
  <nav class="container navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="index.html">CryptoTrack</a>
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
      <form class="d-flex ${
        location == "home" ? "" : "invisible"
      }" id="searchForm" role="search">
        <input class="form-control me-2" id="searchQuery" type="search" placeholder="Search Tokens" aria-label="Search">
        <button class="btn btn-outline-primary" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
  `;
}
