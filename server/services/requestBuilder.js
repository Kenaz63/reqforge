import axios from "axios";

export async function buildRequest(route) {
  const { config, aiResponse } = route;
  const { category, intent, method } = aiResponse;
  const params = aiResponse.params || {};

  switch (category) {
    case "github":
      return {
        method,
        url: `${config.baseURL}${config.endpoint}/${params.username}`,
        headers: [],
        queryParams: [],
        body: null,
      };

    case "weather": {
      const geo = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          params.city
        )}&count=1`
      );

      if (!geo.data.results?.length) {
        throw new Error("City not found.");
      }

      const location = geo.data.results[0];

      const {
        latitude,
        longitude,
        name,
        country,
        admin1,
      } = location;

      return {
        method,
        url: `${config.baseURL}${config.endpoint}`,
        headers: [],
        queryParams: [
          {
            key: "latitude",
            value: String(latitude),
          },
          {
            key: "longitude",
            value: String(longitude),
          },
          {
            key: "current_weather",
            value: "true",
          },
        ],
        body: null,

        location: {
          city: name,
          state: admin1,
          country,
        },
      };
    }

    case "crypto":
      return {
        method,
        url: `${config.baseURL}${config.endpoint}`,
        headers: [],
        queryParams: [
          {
            key: "ids",
            value: params.coin,
          },
          {
            key: "vs_currencies",
            value: params.currency,
          },
        ],
        body: null,
      };

    case "books":
      return {
        method,
        url: `${config.baseURL}${config.endpoint}`,
        headers: [],
        queryParams: [
          {
            key: "title",
            value: params.title,
          },
        ],
        body: null,
      };

    case "universities":
      return {
        method,
        url: `${config.baseURL}${config.endpoint}`,
        headers: [],
        queryParams: [
          {
            key: "country",
            value: params.country,
          },
        ],
        body: null,
      };

    case "jsonplaceholder": {
      let url = `${config.baseURL}/${intent}`;

      if (params.id) {
        url += `/${params.id}`;
      }

      return {
        method,
        url,
        headers: [],
        queryParams: [],
        body: null,
      };
    }

    default:
      return {
        unsupported: true,
        message: "ForgeAI couldn't generate a request for this prompt.",
      };
  }
}