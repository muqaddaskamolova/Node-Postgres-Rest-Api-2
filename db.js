const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "students",
  password: "12345678",
  port: 5433,
});
module.exports = pool;
