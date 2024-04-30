import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "db",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "vlog_user",
  database: process.env.DB_NAME || "vlog_db",
  password: process.env.DB_PASSWORD || "vlog_password",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
