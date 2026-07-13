export const API_REGISTRY = {
  github: {
    name: "GitHub",
    baseURL: "https://api.github.com",
    endpoint: "/users",
    headers: {
      Accept: "application/vnd.github+json",
    },
  },

  weather: {
    name: "Open-Meteo",
    baseURL: "https://api.open-meteo.com",
    endpoint: "/v1/forecast",
    headers: {},
  },

  crypto: {
    name: "CoinGecko",
    baseURL: "https://api.coingecko.com/api/v3",
    endpoint: "/simple/price",
    headers: {},
  },

  books: {
    name: "Open Library",
    baseURL: "https://openlibrary.org",
    endpoint: "/search.json",
    headers: {},
  },

  universities: {
    name: "Hipolabs Universities",
    baseURL: "http://universities.hipolabs.com",
    endpoint: "/search",
    headers: {},
  },

  jsonplaceholder: {
    name: "JSONPlaceholder",
    baseURL: "https://jsonplaceholder.typicode.com",
    endpoint: "",
    headers: {},
  },
};