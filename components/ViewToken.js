import { numberWithCommas } from "../assets/js/numberFormat.js";
import { getLocalWallet, getLocalWatchList } from "../modules/getLocal.js";

export default function ViewToken(token) {
  const priceChange = token.market_data.price_change_percentage_24h;
  const btcChange =
    token.market_data.price_change_percentage_24h_in_currency.btc;
  const dailyChange =
    token.market_data.high_24h.usd - token.market_data.low_24h.usd;
  const walletData = updateWallet(token.id);
  const watchList = getLocalWatchList();
  const inWatchList = watchList ? watchList.find(id => id == token.id) : false;

  return `
  <div class="container my-5 d-flex flex-column gap-2">
    <div class="d-flex align-items-center gap-2">
        <img src="${token.image.small}" alt="${token.name} logo" />
        <h3>${token.name}</h3>
        <span class="text-secondary">${token.symbol.toUpperCase()}</span>
        <i role="button" id="watchListBtn" class=" bi bi-star${
          inWatchList ? "-fill text-yellow" : ""
        }" title="Click to add to WatchList"></i>
    </div>
    <div>
        <h2 class="d-flex align-items-center">$${numberWithCommas(
          token.market_data.current_price.usd.toFixed(3)
        )} 
            <span class="fs-5 ${priceChange < 0 ? "text-red" : "text-green"}">
                &nbsp;${priceChange > 0 ? "&#708;" : "&#8964;"}${Math.abs(
    priceChange.toFixed(2)
  )}%
            </span>
        </h2>
    </div>
    <div>
        <span class="text-secondary">${
          token.market_data.current_price.btc
        } BTC </span><span class="${
    btcChange < 0 ? "text-red" : "text-green"
  }">${btcChange.toFixed(2)}%</span>
    </div>
    <div class="w-100">
        <div class="row">
            <meter class="col-12 w-100" min="0" max="${dailyChange}" low="${
    dailyChange * 0.5
  } " high="${dailyChange * 0.499}" optimum="${dailyChange * 0.5}" value="${
    token.market_data.current_price.usd - token.market_data.low_24h.usd
  }" ></meter>
        </div>
        <div class="row">
            <span class="col-4 ">$${numberWithCommas(
              token.market_data.low_24h.usd
            )}</span>
            <span class="col-4 text-center">24H Range</span>
            <span class="col-4 text-end">$${numberWithCommas(
              token.market_data.high_24h.usd
            )}</span>
        </div>
    </div>

    <div class="row mt-4">
        <div class="col-12 col-sm-6 d-flex flex-column">
          <div class="d-flex justify-content-between align-items-center border-bottom py-2">
            <span class="text-secondary">Market Cap</span>
            <span class="text-end">$${numberWithCommas(
              token.market_data.market_cap.usd
            )}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center border-bottom py-2">
            <span class="text-secondary">24H Trading Vol</span>
            <span class="text-end">$${numberWithCommas(
              token.market_data.total_volume.usd
            )}</span>
          </div>
          ${
            token.market_data.fully_diluted_valuation.usd
              ? `<div class="d-flex justify-content-between align-items-center border-bottom py-2">
          <span class="text-secondary">Fully Diluted Valuation</span>
          <span class="text-end">$${numberWithCommas(
            token.market_data.fully_diluted_valuation.usd
          )}</span>
        </div>`
              : ""
          }
        </div>
        <div class="col-12 col-sm-6 d-flex flex-column">
          <div class="d-flex justify-content-between align-items-center border-bottom py-2">
            <span class="text-secondary">Circulating Supply</span>
            <span class="text-end">${numberWithCommas(
              token.market_data.circulating_supply.toFixed()
            )}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center border-bottom py-2">
            <span class="text-secondary">Total Supply</span>
            <span class="text-end">${numberWithCommas(
              token.market_data.total_supply
                ? token.market_data.total_supply.toFixed()
                : "&infin;"
            )}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center border-bottom py-2">
            <span class="text-secondary">Max Supply</span>
            <span class="text-end">${numberWithCommas(
              token.market_data.max_supply
                ? token.market_data.max_supply.toFixed()
                : "&infin;"
            )}</span>
          </div>
        </div>
    </div>

    <div class="mx-auto width-100 width-75 w-50 d-flex flex-column gap-2 border rounded p-3 mt-5">
        <div class="d-flex justify-content-around">
              <span>USD: <span id="usdValue">${numberWithCommas(
                walletData.usd
              )}</span></span>
              <span>${token.name}: <span id="tokenValue">${numberWithCommas(
    walletData[token.id]
  )}</span></span>
        </div>
        <div>
            <div class="d-flex border rounded ps-2">
              <label for="tokenInput" class="py-2" >${token.symbol.toUpperCase()}</label>
              <input min="0" type="number" value="1" id="tokenInput" class="w-100 ps-2 py-2" />
            </div>
            <div class="d-flex border rounded ps-2 mt-2">
              <label for="usdInput" class="py-2" >USD</label>
              <input min="0" type="number" value="${
                token.market_data.current_price.usd
              }" id="usdInput" class="w-100 ps-2 py-2" />
            </div>
        </div>
        <div class="d-flex gap-3 mt-2">
        <button type="button" id="buyBtn" class="btn btn-success w-50">Buy</button>
        <button type="button" id="sellBtn" class="btn btn-danger w-50">Sell</button>
        </div>
        <span class="text-danger text-center" id="tradeError"></span>
    </div>
  </div>`;
}

function updateWallet(id) {
  const wallet = getLocalWallet();
  if (!wallet) {
    localStorage.setItem("wallet", JSON.stringify({ usd: 10000, [id]: 0 }));
    return { usd: 10000, [id]: 0 };
  }
  if (!wallet[id]) {
    localStorage.setItem("wallet", JSON.stringify({ ...wallet, [id]: 0 }));
    return { usd: wallet.usd, [id]: 0 };
  }
  return { usd: wallet.usd, [id]: wallet[id] };
}
