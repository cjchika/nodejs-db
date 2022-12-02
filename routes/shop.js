import express from "express";

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

// router.get("/cart", getCart);

// router.post("/cart", postCart);

// router.post("/cart-delete-item", postCartDeleteProduct);

// router.get("/orders", getOrders);

// router.get("/checkout", getCheckout);

// router.get("/create-order", postOrder);

export default router;
