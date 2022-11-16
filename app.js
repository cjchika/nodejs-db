import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("view engine", "pug");
app.set("views", "views");

dotenv.config();

import adminData from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404Page");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`));
