const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Initialize Stripe only if key exists
const stripe = process.env.STRIPE_KEY
  ? require("stripe")(process.env.STRIPE_KEY)
  : null;

const app = express();

// Middleware fixes
app.use(cors({ origin: true }));
app.use(express.json()); // Fixed missing parentheses

// Basic route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success!",
  });
});

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } else {
    res.status(403).json({
      message: "Total must be greater than 0",
    });
  }
});

exports.api = onRequest(
  //   {
  //     timeoutSeconds: 60, // Increase if needed (max 540)
  //     memory: "512MB", // Adjust based on needs
  //     minInstances: 0, // For cost optimization
  //   },
  app
);
