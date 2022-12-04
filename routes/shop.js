import express from "express";

import { isAuth } from "../middleware/isAuth.js";

import {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProduct,
  postCart,
  postCartDeleteProduct,
  postOrder,
} from "../controllers/shop.js";

const router = express.Router();

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/products/:productId", getProduct);

router.get("/cart", isAuth, getCart);

router.post("/cart", isAuth, postCart);

router.post("/cart-delete-item", isAuth, postCartDeleteProduct);

router.get("/create-order", isAuth, postOrder);

router.get("/orders", isAuth, getOrders);

// router.get("/checkout", getCheckout);

export default router;
