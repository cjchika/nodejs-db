import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

import { getAddProduct, postAddProduct } from "../controllers/products.js";

const router = express.Router();

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

export default router;
