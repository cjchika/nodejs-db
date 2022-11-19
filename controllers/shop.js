import { Product } from "../models/product.js";

export const getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", { prods: products, pageTitle: "Shop" });
  });
};

export const getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render("shop/product-details", {
      product: product,
      pageTitle: product.title,
    });
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

export const postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  res.redirect("/cart");
};

export const getCheckout = (req, res, next) => {
  res.render("shop/checkout", { pageTitle: "Checkout" });
};

export const getOrders = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Orders" });
};
