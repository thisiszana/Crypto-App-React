const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = "CG-1RRsat7fSgAm74fSc6czdqup";

const getCoinList = (page, currency) =>
  `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&x_cg_demo_api_key=${API_KEY}`;

const searchCoin = (query) =>
  `${BASE_URL}/search?query=${query}&x_cg_demo_api_key=${API_KEY}`;

export { getCoinList, searchCoin };
