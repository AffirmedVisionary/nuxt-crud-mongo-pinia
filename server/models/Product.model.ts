import mongoose from "mongoose";

const schema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    Summary: {
      type: String,
    },
    Description: {
      type: String,
    },
    manufacturer: [{ type: mongoose.Schema.Types.ObjectId, ref: "Merchant" }],
    filename: {
      type: String,
    },
    hash: {
      type: String,
    },
    digital: {
      type: Boolean,
      default: true,
    },
    hoverImage: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    productImages: {
      type: Array<String>,
    },
  },
  { timestamps: true }, // created at and updated at
);

export default mongoose.model("Product", schema);
