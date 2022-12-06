import express from "express";
import { body, check } from "express-validator";
import { User } from "../models/user.js";

import {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
  getReset,
  postReset,
  getNewPassword,
} from "../controllers/auth.js";

const router = express.Router();

router.get("/login", getLogin);

router.get("/signup", getSignup);

router.post(
  "/login",
  [body("email").isEmail().withMessage("Please enter a valid email address")],
  postLogin
);

router.post(
  "/signup",
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject(
            "E-mail exits already, please enter a different email"
          );
        }
      });
    }),
  body(
    "password",
    "Please enter a password with only numbers and text and at least 5 characters"
  )
    .isLength({ min: 5 })
    .isAlphanumeric(),
  body("confirmedPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords have to match!");
    }
    return true;
  }),
  postSignup
);

router.post("/logout", postLogout);

router.get("/reset", getReset);

router.post("/reset", postReset);

router.get("/reset/:token", getNewPassword);

export default router;
