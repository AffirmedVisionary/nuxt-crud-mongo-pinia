import mongoose from "mongoose";

const schema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    }
  },
  { timestamps: true } // created at and updated at
);

export default mongoose.model("Merchant", schema);
