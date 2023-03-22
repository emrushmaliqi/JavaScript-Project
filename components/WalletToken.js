export default function WalletToken(token, amount) {
  return `
    <div class="token-container row d-flex align-items-center py-2 px-sm-4 px-lg-4 mx-sm-5 border-bottom">
      <span class="col-3">${token.symbol.toUpperCase()}</span>
      <div class="col-3 d-flex flex-column">
            <span>${amount}</span>
            <span class="fs-7">$${(amount * token.current_price).toFixed(
              2
            )}</span>
      </div>
      <span class="col-3 ${
        token.price_change_percentage_24h < 0 ? "text-red" : "text-green"
      }">${token.price_change_percentage_24h.toFixed(2)}%</span>
      <div class="col-3 text-center">
        <a type="button" class="btn btn-primary" href="token-page.html?id=${
          token.id
        }">Trade</a>
      </div>
    </div>
      `;
}
