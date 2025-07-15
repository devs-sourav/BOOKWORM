const mongoose = require("mongoose");
const chalk = require("chalk");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      chalk.bold(`
  ${chalk.black.whiteBright.bold(" ✅ MongoDB Connected Successfully! ")}
  ==========================================
  📡 Host        : ${chalk.cyan(conn.connection.host)}
  🌐 DB Name     : ${chalk.yellow(conn.connection.name)}
  🔌 Port        : ${chalk.magenta(conn.connection.port || "Default")}
  🕒 Connected   : ${chalk.gray(new Date().toLocaleString())}
  ==========================================
`)
    );
  } catch (error) {
    console.error(
      chalk.red.bold("❌ Error connecting to MongoDB:\n"),
      chalk.red(error.message)
    );
    process.exit(1);
  }
};

module.exports = connectDB;
