import express from "express";
import { createExample } from "../controllers/example.controller";

const router = express.Router();

router.post("/example", createExample);

export default router;
