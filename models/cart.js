import { Sequelize } from "sequelize";

import sequelize from "../utils/database.js";

export const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});
