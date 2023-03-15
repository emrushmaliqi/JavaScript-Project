import axios from "../node_modules/axios/dist/esm/axios.js";

export async function getTokens(page) {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=false`
  );
  return res.data;
}

export async function getWatchListTokens(ids) {
  const idsQuery = "&ids=" + ids.join("%2C");
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd${idsQuery}&order=market_cap_desc&per_page=250&page=1&sparkline=false`
  );
  return res.data;
}

export async function getTokenById(id) {
  const token = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
  );
  return token.data;
}
