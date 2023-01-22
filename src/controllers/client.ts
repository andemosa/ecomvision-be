import { Request, Response } from "express";

import { Product } from "../models/Product";
import { ProductStat } from "../models/ProductStat";
import { Transaction } from "../models/Transaction";
import { User } from "../models/User";

type SortType = Record<string, 1 | -1>;

interface IQuery {
  page: number;
  pageSize: number;
  sort: string;
  search: string;
}

export const getProducts = async (_: Request, res: Response) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat: {
            ...stat[0]._doc,
          },
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (_: Request, res: Response) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response
) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = "", search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted as SortType;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
