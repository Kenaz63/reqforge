import express from "express";
import cors from "cors";
import axios from "axios";

import {
  generateRequest,
  explainResponse,
} from "./services/aiService.js";

import { routeRequest } from "./services/requestRouter.js";
import { buildRequest } from "./services/requestBuilder.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

/* ------------------------- */
/* Home */
/* ------------------------- */

app.get("/", (req, res) => {
  res.json({
    name: "ReqForge API",
    version: "1.0.0",
    status: "Running",
    author: "Kenaz",
  });
});

/* ------------------------- */
/* Health */
/* ------------------------- */

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "ReqForge Backend is running 🚀",
    version: "1.0.0",
  });
});

/* ------------------------- */
/* Execute Request */
/* ------------------------- */

app.post("/api/request", async (req, res) => {
  try {
    const { method, url, headers, body } = req.body;

    const formattedHeaders = {};

    (headers || []).forEach((header) => {
      if (header.key.trim() && header.value.trim()) {
        formattedHeaders[header.key] = header.value;
      }
    });

    const response = await axios({
      method,
      url,
      headers: formattedHeaders,
      data: body ? JSON.parse(body) : undefined,
    });

    res.json({
      status: response.status,
      data: response.data,
      source: new URL(url).hostname,
    });
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({
        status: error.response.status,
        error: error.response.data,
      });
    }

    res.status(500).json({
      status: 500,
      error: {
        message: error.message,
      },
    });
  }
});

/* ------------------------- */
/* ForgeAI Request Generator */
/* ------------------------- */

app.post("/api/forge-ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Prompt is required.",
      });
    }

    const aiResult = await generateRequest(prompt);

console.log("RAW AI RESPONSE:");
console.log(aiResult);

const parsed = JSON.parse(aiResult);
console.log(parsed);
    console.log("ForgeAI:", parsed);

    const route = routeRequest(parsed);

    if (!route.success) {
      return res.json(route);
    }

    const request = await buildRequest(route);
    console.log(request);
    res.json({
      success: true,
      result: request,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* ------------------------- */
/* ForgeAI Response Explainer */
/* ------------------------- */

app.post("/api/explain-response", async (req, res) => {
  try {
    const { request, response } = req.body;
    let safeResponse = response;

if (Array.isArray(response.data)) {
  safeResponse = {
    status: response.status,
    data: {
      total_results: response.data.length,
      sample: response.data.slice(0, 3).map((u) => ({
        name: u.name,
        country: u.country,
      })),
    },
  };
}
    const explanation = await explainResponse(request, safeResponse);

    res.json({
      success: true,
      explanation,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});