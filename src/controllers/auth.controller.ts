import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model";
import { verifyPassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { RegisterInput, LoginInput } from "../validators/example.validator";
import logger from "../utils/logger";
import errorMiddleware from "../middlewares/error.middleware";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body as RegisterInput;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }

    const newUser = await UserModel.create({ username, email, password });
    logger.info(`User registered successfully: ${newUser}`);
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    if (error instanceof Error) {
      errorMiddleware(error, req, res, next);
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginInput;

    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const token = generateToken({ userId: user._id });
    res.status(200).json({ message: "Login successful", token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
