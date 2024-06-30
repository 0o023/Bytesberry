const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Hira202100295",
    host: "localhost",
    database: "Tealio",
    port: 5432
});

module.exports = pool;