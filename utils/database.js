// import mysql from "mysql2";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("nodedb", "root", "password", {
  dialect: "mysql",
  host: "localhost",
});

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "nodedb",
// });

export default sequelize;
