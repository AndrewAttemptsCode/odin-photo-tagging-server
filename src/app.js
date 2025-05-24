const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/leaderboard", routes.leaderboard);
app.use("/guess", routes.guess);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

module.exports = app;
