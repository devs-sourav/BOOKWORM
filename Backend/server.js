const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const chalk = require("chalk");

// Load env vars

// Connect to database
connectDB();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "https://yourdomain.com"], // Your frontend URLs
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/v1", require("./routes/index"));

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MERN Backend API" });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    chalk.bold(`
  ==========================================
  🚀 ${chalk.whiteBright("Server Status")}: ${chalk.greenBright("RUNNING")}
  🌍 ${chalk.whiteBright("Environment")}: ${chalk.cyan(
      process.env.NODE_ENV || "development"
    )}
  📡 ${chalk.whiteBright("Port")}: ${chalk.yellow(PORT)}
  🔗 ${chalk.whiteBright("URL")}: ${chalk.blueBright(
      `http://localhost:${PORT}`
    )}
  ⏰ ${chalk.whiteBright("Started")}: ${chalk.gray(new Date().toLocaleString())}
  ==========================================
`)
  );
});
