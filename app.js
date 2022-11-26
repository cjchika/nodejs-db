import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { mongoConnect } from "./utils/database.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

dotenv.config();

import adminRoutes from "./routes/admin.js";
// import shopRoutes from "./routes/shop.js";
// import { get404Page } from "./controllers/error.js";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findByPk(1)
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use("/admin", adminRoutes);
// app.use(shopRoutes);

// app.use(get404Page);

const PORT = process.env.PORT || 5000;

mongoConnect(() => {
  app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`));
});
