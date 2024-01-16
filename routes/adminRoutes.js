const express = require("express");
const router = express.Router();
const Product = require("../db/productDB");
const Order = require("../db/orderModel"); 
const {isAuthorized} = require("../middlewares/roleMiddlware"); 

router.post("/products", async (req, res) => {
    try {
      const newProduct = new Product(req.body); 
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct); 
    } catch (error) {
      console.error("Error adding product:", error);
      next(error);
    }
  });   


  router.put("/products/:id", async (req, res) => {
    try {
      const productToUpdate = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Return the updated document
      });
  
      if (!productToUpdate) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json(productToUpdate);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.delete("/products/:id", async (req, res) => {
    try {
      const productToDelete = await Product.findByIdAndDelete(req.params.id);
  
      if (!productToDelete) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(204).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  


router.use(isAuthorized);

module.exports = router;