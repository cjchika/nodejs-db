import { Product } from "../models/product.js";

export const getAddProduct = (req, res, next) => {
  res.render("add-product", { pageTitle: "Add Product" });
};

export const postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

export const getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render("shop", { prods: products, pageTitle: "Shop" });
  });
};
