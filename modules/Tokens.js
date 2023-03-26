import axios from "../node_modules/axios/dist/esm/axios.js";

export async function getTokens(page, category = null) {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&${
      category ? `category=${category}&` : ""
    }order=market_cap_desc&per_page=20&page=${page}&sparkline=false`
  );
  return res.data;
}

export async function getTokensById(ids) {
  const idsQuery = "&ids=" + ids.join("%2C");
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd${idsQuery}&order=market_cap_desc&per_page=250&page=1&sparkline=false`
  );
  return res.data;
}

export async function getTokenById(id) {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
  );
  return res.data;
}

export async function searchTokens(query) {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/search?query=${query.replaceAll(
      " ",
      "%20"
    )}`
  );
  let tokenIds = [];
  res.data.coins.forEach(token => tokenIds.push(token.id));

  if (tokenIds.length) return getTokensById(tokenIds);

  return [];
}
