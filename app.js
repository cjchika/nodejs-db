import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404Page.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`));
