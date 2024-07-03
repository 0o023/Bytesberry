const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tealio_local_db',
  password: 'student123',
  port: 5432,
});

module.exports = pool;
