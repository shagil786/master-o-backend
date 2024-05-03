const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
const app = express();
const port = process.env.PORT;

app.use(cors());
app.options("*", cors());

// Middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);
let userPoints = 5000;

const api = process.env.API_URL;
app.get(`${api}/generate-numbers`, (req, res) => {
  // Generate random numbers for two dice rolls
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  const sum = dice1 + dice2;

  res.json({ dice1, dice2, sum });
});

app.post(`${api}/calculate-winnings`, (req, res) => {
  const { selectedNumber, betAmount, sum } = req.body;

  // Logic to calculate winnings/losses based on selectedNumber and sum of dice
  // For simplicity, assuming a fixed winning/losing ratio

  let winnings = 0;
  if (selectedNumber === 7) {
    winnings = betAmount * 5; // 5 times the bet amount for a match
  } else if (
    (selectedNumber < 7 && selectedNumber === "7-down") ||
    (selectedNumber > 7 && selectedNumber === "7-up")
  ) {
    winnings = betAmount * 2; // Double the bet amount for below 7 or above 7
  }

  // Update user points
  userPoints += winnings;

  res.json({ winnings, userPoints });
});

// Endpoint to get current user points
app.get(`${api}/user-points`, (req, res) => {
  res.json({ userPoints });
});

app.post(`${api}/update-points-on-loss`, (req, res) => {
  const { lostAmount } = req.body;

  // Update user points by deducting the lost amount
  userPoints -= lostAmount;

  res.json({ userPoints });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
