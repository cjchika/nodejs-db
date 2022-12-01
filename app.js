import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import mongoose from "mongoose";

import { User } from "./models/user.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

dotenv.config();

import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import { get404Page } from "./controllers/error.js";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6370c34bd5bd7edbe1e70512")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404Page);

const PORT = process.env.PORT || 5000;

mongoose.connect(() => {
  app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`));
});
