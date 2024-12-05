import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message, { stack: err.stack });
  res.status(500).json({ error: err.message });
};

export default errorMiddleware;
