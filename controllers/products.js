const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { featured, company, name, search, sort, select, numericFilters } =
    req.query;
  const queryObjetct = {};

  if (featured) {
    queryObjetct.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObjetct.company = company;
  }

  if (name) {
    queryObjetct.name = name;
  }

  if (search) {
    queryObjetct.name = { $regex: search, $options: "i" };
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];

    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");

      if (options.includes(field)) {
        queryObjetct[field] = { [operator]: Number(value) };
        
      }
    });
  }
  

  let result = Product.find(queryObjetct);

  if (sort) {
    const sortValues = sort.split(",").join(" ");
    result = result.sort(sortValues);
  }

  if (select) {
    const selectedValues = select.split(",").join(" ");
    result = result.select(selectedValues);
  }

  

  // the logic of pagination

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ size: products.length, products });
};

const getAllStaticProducts = async (req, res) => {
  const products = await Product.find({ price: { $gt: 40 } });

  res.status(200).json(products);
};

module.exports = { getAllProducts, getAllStaticProducts };
