const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.send(
    "<form action='/admin/add-product' method='POST'><input type='number' name='price' /><button type='submit'>Add Price</button></form>"
  );
  console.log("In the middleware!");
});

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
