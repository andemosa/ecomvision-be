import { Request, Response } from "express";

export const invalidRouteHandler = (req: Request, res: Response) => {
  // Invalid request
  res.json({
    error: {
      name: "Error",
      status: 404,
      message: "Invalid Request. Route does not exist",
      statusCode: 404,
    },
  });
};
