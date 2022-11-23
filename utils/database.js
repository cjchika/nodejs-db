import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "nodedb",
});

export default pool.promise();
