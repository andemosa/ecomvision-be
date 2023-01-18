import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import logger from "./utils/logger";

import { errorHandler } from "./middleware/errorhandler";
import { invalidRouteHandler } from "./middleware/norouteHandler";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(errorHandler);

//If no route is matched by now, it must be a 404
app.use(invalidRouteHandler);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/admin-dashboard";
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => logger.info(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
  })
  .catch((error) => logger.error(`${error} did not connect`));
