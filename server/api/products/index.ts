// localhost://3000/api/products

import ProductModel from "~~/server/models/Product.model";

export default defineEventHandler(async (event) => {
  return await ProductModel.find().populate("Merchants")
});
