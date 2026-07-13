import { API_REGISTRY } from "./apiRegistry.js";

export function routeRequest(aiResponse) {
  const { category } = aiResponse;

  const config = API_REGISTRY[category];

  if (!config) {
    return {
      success: false,
      message: "ForgeAI couldn't map this prompt to a supported API.",
    };
  }

  return {
    success: true,
    config,
    aiResponse,
  };
}