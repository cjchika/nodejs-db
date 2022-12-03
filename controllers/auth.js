import { User } from "../models/user.js";

export const getLogin = (req, res, next) => {
  //   const isLoggedIn = req.get("Cookie").split(";")[3].trim().split("=")[1];
  res.render("auth/login", {
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

export const postLogin = (req, res, next) => {
  User.findById("638978c27c6956e326547f99")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

export const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
