const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../db/User");
const { isAdmin } = require("../middlewares/roleMiddlware");
const router = express.Router();

// User signup endpoint
router.post("/signup", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
} catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  } 
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the entered password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check user role to determine login response
    let roleSpecificResponse = {};

    if (user.role === "admin") {
      roleSpecificResponse = {
        message: "Admin login successful",
        role: "admin",
      };
    } else {
      roleSpecificResponse = {
        message: "User login successful",
        role: "user",
      };
    }

    // Generate a JWT token upon successful login
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "ASDKKLJD24342489",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, userId: user._id, ...roleSpecificResponse });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


module.exports = router;
