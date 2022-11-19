import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cartItem = path.join("data", "cart.json");

export class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(cartItem, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const exisitingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const exisitingProduct = cart.products[exisitingProductIndex];
      let updatedProduct;
      if (exisitingProduct) {
        updatedProduct = { ...exisitingProduct };
        updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[exisitingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(cartItem, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
}
