const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const productRouter = require("./routes/Products/product");
const jewelleryRouter = require("./routes/jewellery/jewellery");
const categoryRouter = require("./routes/category/categories");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const MongoUrl = "mongodb://127.0.0.1:27017/SunfoDynamic";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MongoUrl);
}

app.get("/", (req, res) => {
  res.send("At main page");
});

app.use("/product", productRouter);
app.use("/product/:product", jewelleryRouter);

app.listen(3030, () => {
  console.log("Listening on port 3030");
});
