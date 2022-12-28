import Joi from "joi"

// Merchant validation
export const MerchantSchema = Joi.object({
  name: Joi.string().min(3).required()
});

// Product Validation
export const ProductSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number(),
  summary: Joi.string(),
  description: Joi.string(),
  manufacturer: Joi.array(),
  filename: Joi.string(),
  hash: Joi.string(),
  digital: Joi.boolean(),
  coverImage: Joi.string(),
  hoverImage: Joi.string(),
  productImages: Joi.array()
})
