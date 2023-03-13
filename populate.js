require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.URL);
    await Product.create(jsonProducts);
  } catch (error) {
    console.log(error);
  }
};

start();
