import express from "express";
import { body } from "express-validator";
import { isAuth } from "../middleware/isAuth.js";

import {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
} from "../controllers/admin.js";

const router = express.Router();

router.get("/add-product", isAuth, getAddProduct);

router.get("/products", isAuth, getProducts);

router.post(
  "/add-product",
  [
    body("title").isAlphanumeric().isLength({ min: 3 }).trim(),
    body("imageUrl").isURL,
    body("price").isFloat,
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  postAddProduct
);

router.get("/edit-product/:productId", isAuth, getEditProduct);

router.post(
  "/edit-product",
  [
    body("title").isAlphanumeric().isLength({ min: 3 }).trim(),
    body("imageUrl").isURL,
    body("price").isFloat,
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  postEditProduct
);

router.post("/delete-product", isAuth, postDeleteProduct);

export default router;
