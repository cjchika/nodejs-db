import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import { default as connectMongoDBSession } from "connect-mongodb-session";
import csurf from "csurf";
import multer from "multer";

const MongoDBStore = connectMongoDBSession(session);

import { User } from "./models/user.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const MONGODB_URI =
  "mongodb+srv://mern_gee:Lord247@cluster0.l7yrx98.mongodb.net/?retryWrites=true&w=majority";

let store = new MongoDBStore(
  {
    uri: MONGODB_URI,
    collection: "sessions",
  },
  (err) => console.log(err)
);

store.on("error", (error) => console.log(error));

const csrfProtection = csurf();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
});

app.set("view engine", "ejs");
app.set("views", "views");

dotenv.config();

import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import authRoutes from "./routes/auth.js";
import { get404Page, get500Page } from "./controllers/error.js";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: "images" }).single("image"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "the secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csrfProtection);
// app.use(flash);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      throw new Error(err);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use("/500", get500Page);

app.use(get404Page);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then((res) => {
    app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });
