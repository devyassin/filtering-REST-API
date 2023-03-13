console.log("04 Store API");
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const productsRouter = require("./routes/products");
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//middleware

app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>Products Route</a>");
});

app.use("/api/v1/products", productsRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.URL);
    app.listen(port, console.log(`Server starting at ${port} ...`));
  } catch (err) {
    console.log(err);
  }
};

start();
