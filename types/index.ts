export interface AMerchant {
  _id?: String,
  name: String
}

export interface AProduct {
  _id?: String,
  name: String,
  price?: Number,
  summary?: String,
  description?: String,
  manufacturer?: AMerchant,
  filename?: String,
  hash?: String,
  digital?: Boolean,
  coverImage?: String,
  hoverImage?: String,
  productImages?: Array<String>
}
