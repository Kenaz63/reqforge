const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});