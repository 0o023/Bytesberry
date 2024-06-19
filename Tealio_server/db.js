const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "12345",
    host: "localhost",
    database: "Order_info",
    port: 5432
});

module.exports = pool;