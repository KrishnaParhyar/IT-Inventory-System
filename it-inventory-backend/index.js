// index.js
require("dotenv").config();
const express = require("express");
const db = require("./config/db");

const app = express();
const PORT = 5000;

const cors = require('cors');

// Allow requests from your React frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // if you're using cookies or sessions
}));


// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));

// DB Connection
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL database");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
