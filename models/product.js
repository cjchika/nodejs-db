import db from "../utils/database.js";

import { Cart } from "./cart.js";

export class Product {
  constructor(id, title, description, price, imageUrl) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title, description, price, imageUrl) VALUES (?, ?, ?, ?)",
      [this.title, this.description, this.price, this.imageUrl]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * from products");
  }

  static deleteById(id) {}

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
}
