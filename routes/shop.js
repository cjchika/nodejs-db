import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { products } from "./admin.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("shop");
});

export default router;
