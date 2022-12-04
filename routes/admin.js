import express from "express";
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

router.post("/add-product", isAuth, postAddProduct);

router.get("/edit-product/:productId", isAuth, getEditProduct);

router.post("/edit-product", isAuth, postEditProduct);

router.post("/delete-product", isAuth, postDeleteProduct);

export default router;
