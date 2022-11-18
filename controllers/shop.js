import { Product } from "../models/product.js";

export const getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", { prods: products, pageTitle: "Shop" });
  });
};

export const getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", { prods: products, pageTitle: "Shop" });
  });
};

export const getCart = (req, res, next) => {
  res.render("shop/cart", { pageTitle: "Your Cart" });
};

export const getCheckout = (req, res, next) => {
  res.render("shop/checkout", { pageTitle: "Checkout" });
};
