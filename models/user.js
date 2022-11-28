import mongodb from "mongodb";
import { getDb } from "../utils/database.js";

const ObjectId = mongodb.ObjectId;

export class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new ObjectId(userId) })
      .next();
  }
}
