import express from "express";
import cors from "cors";
import axios from "axios";
import { generateRequest } from "./services/aiService.js";
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to ReqForge Backend 🚀");
});

// Health API Route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "ReqForge Backend is running 🚀",
    version: "1.0.0",
  });
});

app.post("/api/request", async (req, res) => {
  try {
    const { method, url, body } = req.body;

    const response = await axios({
      method,
      url,
      data: body ? JSON.parse(body) : undefined,
    });

    res.json({
  status: response.status,
  data: response.data,
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

app.post("/api/forge-ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }

    const result = await generateRequest(prompt);

    res.json({
      success: true,
      result: JSON.parse(result),
    });
  } catch (error) {
    console.error("ForgeAI Error:");
    console.error(error);
    console.error(error.message);
    console.error(error.stack);

    res.status(500).json({
  success: false,
  error: error.message,
});
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});