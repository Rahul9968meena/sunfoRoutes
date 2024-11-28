const express = require("express");
const router = express.Router();

const slugify = require("slugify");
const Jewellery = require("../../models/jewellery");
const Category = require("../../models/categories");
const Product = require("../../models/products");

// Function to create a unique slug
async function createUniqueSlug(title) {
  let slug = slugify(title, { lower: true });
  let existingJewellery = await Jewellery.findOne({ slug });

  // Check if slug exists, and modify it if necessary
  let counter = 1;
  while (existingJewellery) {
    slug = `${slugify(title, { lower: true })}-${counter}`;
    existingJewellery = await Jewellery.findOne({ slug });
    counter++;
  }

  return slug;
}

router
  .post("/", async (req, res) => {
    const { name, price, discountPrice, imageUrl, brandName } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    try {
      const uniqueSlug = await createUniqueSlug(name);
      const product = await Product.findOne(req.params.product);
      const newJewellery = new Jewellery({
        name,
        slug: uniqueSlug,
        price,
        discountPrice,
        imageUrl,
        brandName,
      });
      product.jewellery.push(newJewellery);

      await newJewellery.save();

      res.status(201).json({
        message: "Resource created successfully!",
        data: newJewellery,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  })
  .get("/:name", async (req, res) => {
    const title = req.params.name;
    try {
      const yourJewellery = await Jewellery.find({
        name: title,
      });
      console.log(yourJewellery);
      if (!yourJewellery) {
        return res.status(404).json({ message: "There is no such Jewellery" });
      }
      res.json(yourJewellery);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  })
  .delete("/:id", async (req, res) => {
    console.log(req.params.id);
    try {
      const deletedJewellery = await Jewellery.findByIdAndDelete(req.params.id);
      console.log(deletedJewellery);
      if (!deletedJewellery) {
        return res.status(404).json({ message: "There is no such Jewellery" });
      }
      res.json(deletedJewellery);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  })
  .patch("/:id/edit", async (req, res) => {
    try {
      const updatedJewellery = await Jewellery.findByIdAndUpdate(
        req.params.id,
        { ...req.body }
      );
      await updatedJewellery.save();
      console.log(updatedJewellery);
      res.status(201).json({
        message: "Earing edited successfully!",
        data: updatedJewellery,
      });
      // res.json(updatedJewellery);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  })
  .delete("/:id", async (req, res) => {
    // const title = req.params.slug;
    // console.log(title);
    try {
      // { slug: title },
      const deletedJewellery = await Category.findByIdAndDelete(req.params.id);
      console.log(deletedJewellery);
      if (!deletedJewellery) {
        return res.status(404).json({ message: "There is no such Jewellery" });
      }
      res.json(deletedJewellery);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  })
  .patch("/:id/edit", async (req, res) => {
    const { name, slug, price, discountPrice, imageUrl, brandName } = req.body;
    try {
      const updatedJewellery = await Jewellery.findOneAndUpdate(
        req.params.id,
        { ...req.body }
        //     {
        //     name,
        //     slug,
        //     price,
        //     discountPrice,
        //     imageUrl,
        //     brandName,
        //   }
      );
      await updatedJewellery.save();
      console.log(updatedJewellery);
      res.status(201).json({
        message: "Earing edited successfully!",
        data: updatedJewellery,
      });
      // res.json(updatedJewellery);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  })
  .post("/:slug/category", async (req, res) => {
    const slug = req.params.slug;
    try {
      const product = await Jewellery.findOne({ slug });
      const newCategory = new Category(req.body);
      product.categories.push(newCategory);

      await newCategory.save();
      await product.save();
      // const { slug } = req.params;
      // const { content } = req.body;

      // const newCategory = new Category({
      //   content,
      //   category: slug,
      // });

      // await newCategory.save();
      res.status(201).json({ message: "Category added successfull" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  })
  .get("/:slug/category", async (req, res) => {
    try {
      const { slugName } = req.params;
      const getCategory = await Category.find({ slug: slugName });

      res.status(200).json(getCategory);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  });

module.exports = router;
