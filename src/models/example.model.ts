import { Schema, model } from "mongoose";

interface IExample {
  name: string;
  email: string;
}

const exampleSchema = new Schema<IExample>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export const ExampleModel = model<IExample>("Example", exampleSchema);
