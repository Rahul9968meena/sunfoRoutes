const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Category Schema
const categorySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  imageLink: {
    type: String,
    require: true,
  },
});

const category = mongoose.model("Category", categorySchema);

module.exports = category;
