const express = require("express");
const cors = require("cors");
const axios = require("axios");
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
    const { method, url } = req.body;

    const response = await axios({
      method,
      url,
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});