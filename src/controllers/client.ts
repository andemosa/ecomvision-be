import { NextFunction, Request, Response } from "express";
import { Product } from "../models/Product";
import { ProductStat } from "../models/ProductStat";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};