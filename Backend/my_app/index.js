const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");
const statsRoutes = require("./routes/statsRoutes");
const billRoutes = require("./routes/billRoutes");
const authRoutes = require("./routes/authroutes");

require("dotenv").config();
const app = express();

// CORS configuration - allow local dev, primary frontend, and Vercel previews
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://bill-generator-livid.vercel.app",
  "https://bill-generator-acp77scbq-rishitsaboos-projects.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // mobile apps / curl
      const isAllowed = 
        allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin);
      if (isAllowed) return callback(null, true);
      console.log("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api", itemRoutes);
app.use("/api", billRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/auth", authRoutes);

// Start Function
const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI); // put URI in .env
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}
start();

