import { Schema, model, Types } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IAffiliateStat {
  userId?: Types.ObjectId;
  affiliateSales?: Types.ObjectId[];
  _doc: Omit<this, "_doc">;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IAffiliateStat>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    affiliateSales: {
      type: [Schema.Types.ObjectId],
      ref: "Transaction",
    },
  },
  {
    timestamps: true,
  }
);

// 3. Create a Model.
const AffiliateStat = model<IAffiliateStat>("AffiliateStat", schema);

export { AffiliateStat, IAffiliateStat };
