const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Order = require("../db/orderModel");
const { calculateTotalPrice, generateReceipt } = require("../utils/utils");

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Decoding the token
    const decoded = jwt.verify(token, "ASDKKLJD24342489");

    // Assuming decoded user information is { userId: 'someUserId', role: 'user' }
    req.user = { userId: decoded.userId, role: decoded.role };

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Simple validation middleware for demonstration
const validateCheckoutData = (req, res, next) => {
  const { deliveryAddress, paymentMethod } = req.body;

  if (!deliveryAddress || paymentMethod !== "Cash on Delivery") {
    return res.status(400).json({ message: "Invalid shipping address or payment method" });
  }

  next();
};

router.post("/checkout", isAuthenticated, validateCheckoutData, async (req, res) => {
  try {
    if (req.user.role !== 'user') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const userId = req.user.userId;

    const newOrder = new Order({
      userId,
      items: req.body.items,
      totalPrice: calculateTotalPrice(req.body.items),
      paymentMethod: req.body.paymentMethod,
      deliveryAddress: req.body.deliveryAddress,
    });

    const savedOrder = await newOrder.save();

    const receipt = generateReceipt(savedOrder);

    res.status(201).json({ order: savedOrder, receipt });
  } catch (error) {
    console.error("Error processing checkout:", error);
    res.status(500).json({ message: "Failed to process checkout" });
  }
});

module.exports = router;
