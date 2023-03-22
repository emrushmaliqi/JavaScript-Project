import { numberWithCommas } from "../assets/js/numberFormat.js";

export default function Token(token, inWatchList = false) {
  try {
    return `
    <div class="row d-flex align-items-center border-bottom token-container" style="min-height:60px;">
      <div class="col-5 col-sm-4 col-md-3 col-lg-3 d-flex gap-1 align-items-center py-2">
      
        <img src="${token.image}" alt="${
      token.name
    } image" style="height:25px;" />
    <a class="text-decoration-none" href="token-page.html?id=${token.id}">  
    <p class="token-name d-sm-block d-none ${
      inWatchList ? "text-primary" : ""
    }">${token.name}</p>
    </a>
        <p class="text-secondary">${token.symbol.toUpperCase()}</p>
        
      </div>
      <div class="col-4 col-sm-3 col-md-2 col-lg-2">
        <p>$${numberWithCommas(token.current_price)}</p>
      </div>
      <div class="col-1 col-sm-2 col-md-3 col-lg-2 d-sm-block d-none ${
        token.price_change_percentage_24h < 0 ? "text-red" : "text-green"
      }">
        <p>${
          token.price_change_percentage_24h
            ? `${token.price_change_percentage_24h.toFixed(2)}%`
            : "no info"
        }</p>
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
