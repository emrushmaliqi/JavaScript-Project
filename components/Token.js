import { numberWithCommas } from "../assets/js/numberFormat.js";

export default function Token(token, inWatchList = false) {
  try {
    return `
    <div class="row d-flex align-items-center border-bottom" style="min-height:60px;">
      <div class="col-5 col-sm-4 col-md-3 col-lg-3 align-items-center py-2">
      <a class="text-decoration-none text-black d-flex gap-1" href="token-page.html?id=${
        token.id
      }">
        <img src="${token.image}" alt="${
      token.name
    } image" style="height:25px;" />
        <p class="d-sm-block d-none ${inWatchList ? "text-primary" : ""}">${
      token.name
    }</p>
        <p class="text-secondary">${token.symbol.toUpperCase()}</p>
        </a>
      </div>
      <div class="col-4 col-sm-3 col-md-2 col-lg-2">
        <p>$${numberWithCommas(
          Math.round(token.current_price * 1000) / 1000
        )}</p>
      </div>
      <div class="col-1 col-sm-2 col-md-3 col-lg-2 d-sm-block d-none ${
        token.price_change_percentage_24h < 0 ? "text-red" : "text-green"
      }">
        <p>${token.price_change_percentage_24h.toFixed(2)}%</p>
      </div>
      <div class="col-3 col-lg-2 d-lg-block d-none">
        <p>$${numberWithCommas(token.market_cap)}</p>
      </div>
      <div class="col-3 col-lg-2 d-none d-md-block">
        <p>$${numberWithCommas(token.total_volume)}</p>
      </div>
      <div class="col-md-1 col-3 d-flex align-items-center gap-2">
      ${
        inWatchList
          ? `<i type="button" class="bi bi-star-fill text-yellow unWatch" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${token.id}" ></i>`
          : `<a type="button" class="btn btn-primary" href="token-page.html?id=${token.id}">Details</a>`
      }    
      </div>
    </div>`;
  } catch (err) {
    console.error(err);
  }
}
