const mysql = require('mysql2');

// Create connections pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete'
});

module.exports = pool.promise();  
