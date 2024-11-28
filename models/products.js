const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Product Schema
const productSchema = new Schema({
  product: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  jewellery: [
    {
      type: Schema.Types.ObjectId,
      ref: "Categary",
    },
  ],
});

const product = mongoose.model("product", productSchema);

module.exports = product;
