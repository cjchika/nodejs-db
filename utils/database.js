import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node_001",
  password: "node001",
});

export default pool.promise();
