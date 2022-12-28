// localhost://3000/api/merchants

import MerchantModel from "~~/server/models/Merchant.model";

export default defineEventHandler(async (event) => {
  return await MerchantModel.find()
});
