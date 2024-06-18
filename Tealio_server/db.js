//You are connecting the server with the database pgAdmin (ecommerce)

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "abc_123",
    host: "localhost",
    port: 5432,
    database: "ecommerce"
});

module.exports = pool;

