const express = require("express");
const router = express.Router();
// Require product models
const Product = require("../../models/products");

// Finding the products example like Necklace, and Bracelate
router
  .get("/", async (req, res) => {
    const allProduct = await Product.find({});
    console.log(allProduct);
    res.json(allProduct);
  })
  .post("/", async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      console.log("Product is saved");
      console.log(newProduct);
      res.json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  })
  .patch("/:id/edit", async (req, res) => {
    const id = req.params;

    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, {
        ...req.body,
      });
      await updatedProduct.save();
      console.log(updatedProduct);

      res
        .status(201)
        .json({ message: `Edited successfully `, data: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  })
  .delete("/:id", async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        res.status(500).json({ message: "product did not deleted" });
      }
      console.log(deletedProduct);
      res.json(deletedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  })
  .get("/:product", async (req, res) => {
    const proName = req.params.product;
    try {
      const product = await Product.find({
        product: proName,
      });

      console.log(product);
      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  });

module.exports = router;
