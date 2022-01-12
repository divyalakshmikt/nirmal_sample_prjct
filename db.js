const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "qwerty123",
    database: "crud_db",
    host: "localhost",
    port: 5432
});

module.exports = pool;