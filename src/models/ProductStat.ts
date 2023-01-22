import { Schema, model, Types } from "mongoose";

interface IMonthly {
  month: string;
  totalSales: number;
  totalUnits: number;
}

interface IDaily {
  date: string;
  totalSales: number;
  totalUnits: number;
}

// 1. Create an interface representing a document in MongoDB.
interface IProductStat {
  productId?: string;
  yearlySalesTotal?: number;
  yearlyTotalSoldUnits?: number;
  year?: number;
  monthlyData: Types.Array<IMonthly>;
  dailyData: Types.Array<IDaily>;
  _doc: Omit<this, "_doc">;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IProductStat>(
  {
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// 3. Create a Model.
const ProductStat = model<IProductStat>("ProductStat", schema);

export { ProductStat, IProductStat };
