const express = require("express");
const bodyParser = require("body-parser");
import dotenv from "dotenv";

const app = express();
dotenv.config();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found</h1>");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`));
