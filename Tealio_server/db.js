const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Hira202100295",
    host: "localhost",
    port: 5432,
    database: "Tealio"
});


module.exports = pool;