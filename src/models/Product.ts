import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IProduct {
  name?: string;
  price?: number;
  description?: string;
  category?: string;
  rating?: number;
  supply?: number;
  _doc: Omit<this, "_doc">;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IProduct>(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
  },
  {
    timestamps: true,
  }
);

// 3. Create a Model.
const Product = model<IProduct>("Product", schema);

export { Product, IProduct };
