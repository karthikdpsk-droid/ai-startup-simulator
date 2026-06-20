console.log("🔥 SERVER LOADED FROM: scr/server.js");
console.log("[STARTUP] NODE_ENV:", process.env.NODE_ENV, "CWD:", process.cwd());
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// connect database first
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});