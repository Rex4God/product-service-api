import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'; 
import { IProduct } from "../interfaces/product.interface";

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


ProductSchema.plugin(mongoosePaginate);

export default mongoose.model<IProduct>("Product", ProductSchema);
