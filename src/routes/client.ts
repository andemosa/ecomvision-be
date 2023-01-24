import express from "express";

import {
  getCustomers,
  getGeography,
  getProducts,
  getTransactions,
} from "../controllers/client";

const clientRouter = express.Router();

clientRouter.get("/products", getProducts);
clientRouter.get("/customers", getCustomers);
clientRouter.get("/transactions", getTransactions);
clientRouter.get("/geography", getGeography)

export default clientRouter;
