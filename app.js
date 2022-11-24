import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import sequelize from "./utils/database.js";
import { Product } from "./models/product.js";
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

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404Page);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  .sync({ force: true })
  .then((result) => {
    // console.log(result);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
