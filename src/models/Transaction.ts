import { Schema, model, Types } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface ITransaction {
  userId?: string;
  cost?: string;
  products?: Types.ObjectId[];
  _doc: Omit<this, "_doc">;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<ITransaction>(
  {
    userId: String,
    cost: String,
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

// 3. Create a Model.
const Transaction = model<ITransaction>("Transaction", schema);

export { Transaction, ITransaction };
