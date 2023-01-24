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
interface IOverallStat {
  totalCustomers?: number;
  yearlySalesTotal?: number;
  yearlyTotalSoldUnits?: number;
  year?: number;
  monthlyData: Types.Array<IMonthly>;
  dailyData: Types.Array<IDaily>;
  salesByCategory?: Map<string, number>;
  _doc: Omit<this, "_doc">;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IOverallStat>(
  {
    totalCustomers: Number,
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
    salesByCategory: {
      type: Map,
      of: Number,
    },
  },
  { timestamps: true }
);

// 3. Create a Model.
const OverallStat = model<IOverallStat>("OverallStat", schema);

export { OverallStat, IOverallStat };
