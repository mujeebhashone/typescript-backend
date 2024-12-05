import { Request, Response } from "express";
import { ExampleModel } from "../models/example.model";
import { exampleSchema } from "../validators/example.validator";

export const createExample = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = exampleSchema.parse(req.body);

    // Create a new document
    const newExample = await ExampleModel.create(validatedData);
    res.status(201).json(newExample);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
