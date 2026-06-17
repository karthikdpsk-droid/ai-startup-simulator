const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

// Load .env file
const envPath = path.resolve(__dirname, "..", ".env");
const dotenvResult = dotenv.config({ path: envPath });

console.log("[ENV] dotenv config:", {
  path: envPath,
  loaded: !!dotenvResult.parsed,
  error: dotenvResult.error ? dotenvResult.error.message : undefined
});

console.log("[ENV] process.cwd():", process.cwd());

console.log(
  "[ENV] GROQ_API_KEY loaded:",
  !!process.env.GROQ_API_KEY,
  "first10:",
  process.env.GROQ_API_KEY
    ? process.env.GROQ_API_KEY.slice(0, 10)
    : "N/A"
);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- ROUTES ----------------

// Auth routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// Project routes
const projectRoutes = require("./routes/project.routes");
app.use("/api/projects", projectRoutes);

// AI routes
const aiRoutes = require("./routes/ai.routes");
app.use("/api/ai", aiRoutes);

// Dashboard routes
const dashboardRoutes = require("./routes/dashboard.routes");
app.use("/api/dashboard", dashboardRoutes);

// Profile routes
const profileRoutes = require("./routes/profile.routes");
app.use("/api/profile", profileRoutes);

// ---------------- TEST ROUTE ----------------

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Startup Simulator Backend Running 🚀"
  });
});

module.exports = app;