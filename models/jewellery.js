const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Jewellery Schema
const jewellerySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  price: {
    type: Number,
    require: true,
  },
  discountPrice: {
    type: Number,
    require: true,
  },
  brandName: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Categary",
    },
  ],
});

const jewellery = mongoose.model("jewellery", jewellerySchema);
module.exports = jewellery;
