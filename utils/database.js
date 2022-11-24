import { Sequelize } from "sequelize";

const sequelize = new Sequelize("nodedb", "root", "password", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
