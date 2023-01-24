import express from "express";

import { getSales } from "../controllers/sales";

const salesRouter = express.Router();

salesRouter.get("/sales", getSales);

export default salesRouter;
