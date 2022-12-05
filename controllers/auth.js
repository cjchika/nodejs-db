import crypto from "crypto";

import bcrypt from "bcryptjs";
// import nodemailer from "nodemailer";
// import sendgridTransport from "nodemailer-sendgrid-transport";

import { User } from "../models/user.js";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "email@gmail.com",
//     pass: "******",
//   },
// });

export const getLogin = (req, res, next) => {
  // let message = req.flash("error");
  // if (message.length > 0) {
  //   message = message[0];
  // } else {
  //   message = null;
  // }
  res.render("auth/login", {
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

export const getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};

export const postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid Email or Password");
        return res.redirect("/login");
      }
      return bcrypt
        .compare(password, user.password)
        .then((doesMatch) => {
          if (doesMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

export const postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/login");
          // return transporter.sendMail({
          //   to: email,
          //   from: "email@gmail.com",
          //   subject: "Signup successful.",
          //   html: "<h1>Congratulations, You successfully signed up!</h1>",
          // });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

export const getReset = (req, res, next) => {
  res.render("auth/reset", {
    pageTitle: "Reset Password",
  });
};

export const postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const getNewPassword = (req, res, next) => {
  res.render("auth/new-password", {
    pageTitle: "New Password",
  });
};
