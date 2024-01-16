const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
// const {isAuthorized} = require("../middlewares/roleMiddlware")

// Fetch all products with optional sorting and filtering
router.get("/products", async (req, res, next) => {
    try {
      const query = {}; 
  
      // Add sorting if specified
      if (req.query.sort) {
        query.sort = req.query.sort; 
      }
  
    
      if (req.query.category) {
        query.category = req.query.category;
      }
  
      const products = await Product.find(query);
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      next(error); 
    }
  });
  
  // Fetch a single product by ID
  router.get("/products/:id", async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      next(error);
    }
  });
  

module.exports = router;
