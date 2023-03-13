# Product Listing API

This is a controller function for retrieving a list of products from a MongoDB database using Mongoose and Express. The function takes in various query parameters from the HTTP request, which are used to build a MongoDB query object. The query object is used to retrieve the products from the database based on the specified filters and pagination parameters.

## Usage

To use the product listing API, send an HTTP GET request to the `/products` endpoint with the following query parameters:

- `featured`: Filter products by featured status. Accepts `true` or `false` as values.
- `company`: Filter products by company name.
- `name`: Filter products by name.
- `search`: Search for products with names that match a regular expression pattern created using the search parameter value.
- `sort`: Sort products by one or more fields. Accepts comma-separated field names as values.
- `select`: Select specific fields to include in the response. Accepts comma-separated field names as values.
- `numericFilters`: Filter products based on their price and rating. Accepts a string of comma-separated filter options in the following format: `price={operator}-{value},rating={operator}-{value}`. Supported operators include `>`, `>=`, `=`, `<`, and `<=`.
