import mongoose from "mongoose";
import dotenv from "dotenv-safe";
import logger from "../utils/logger";

dotenv.config();

const connectDatabase = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is required");
    }
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("Database connected successfully!");
  } catch (error) {
    logger.error("Database connection failed:", error);
    process.exit(1);
  }
};

export default connectDatabase;
