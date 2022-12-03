import { Product } from "../models/product.js";
import { Order } from "../models/order.js";

export const getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Shop",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-details", {
        product: product,
        pageTitle: product.title,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCart = (req, res, next) => {
  req.user
    .populate("cart.items")
    .then((user) => {
      const products = user.cart.items;
      // console.log(products);
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        products: products,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      console.log(product);
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .then((err) => {
      console.log(err);
    });
};

export const postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCheckout = (req, res, next) => {
  res.render("shop/checkout", { pageTitle: "Checkout" });
};

export const postOrder = async (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      console.log(user.cart.items);
      const products = user.cart.items.map((prod) => {
        return { quantity: prod.quantity, product: prod.productId };
      });
      const order = new Order({
        products: products,
        user: {
          name: req.user.name,
          userId: req.user,
        },
      });

      return order.save();
    })
    .then((result) => {
      req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

export const getOrders = (req, res, next) => {
  res.redirect("/");
  // Order.find({ "user.userId": req.user._id })
  //   .then((orders) => {
  //     res.render("shop/orders", {
  //       pageTitle: "Orders",
  //       orders: orders,
  //       isAuthenticated: req.session.isLoggedIn,
  //     });
  //   })
  //   .catch((err) => console.log(err));
};
