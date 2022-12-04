import express from "express";

import {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
} from "../controllers/auth.js";

const router = express.Router();

router.get("/login", getLogin);

router.get("/signup", getSignup);

router.post("/login", postLogin);

router.post("/signup", postSignup);

router.post("/logout", postLogout);

export default router;
