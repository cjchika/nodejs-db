import { Product } from "../models/product.js";
import { Cart } from "../models/cart.js";

export const getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", { prods: products, pageTitle: "Shop" });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      res.render("shop/product-details", {
        product: product,
        pageTitle: product.title,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", { prods: products, pageTitle: "Shop" });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            pageTitle: "Your Cart",
            products: products,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      let newQuantity = 1;
      if (product) {
        // ...
      }
      return Product.findByPk(prodId)
        .then((product) => {
          return fetchCart.addProduct(product, {
            through: { quantity: newQuantity },
          });
        })
        .catch((err) => console.log(err));
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

export const getCheckout = (req, res, next) => {
  res.render("shop/checkout", { pageTitle: "Checkout" });
};

export const getOrders = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Orders" });
};
