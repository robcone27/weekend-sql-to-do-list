const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
    database: 'to_do_list',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 3000
});

pool.on('connect', () => {
    console.log('postgreSQL connected');
});

pool.on('error', (error) => {
    console.log('database connection error', error);
});

module.exports = pool;