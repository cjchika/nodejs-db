import db from "../utils/database.js";

import { Cart } from "./cart.js";

export class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {}

  static fetchAll() {
    return db.execute("SELECT * from products");
  }

  static deleteById(id) {}

  static findById(id) {}
}
