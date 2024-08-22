const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool instead of a single connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Adjust this based on your expected load
    queueLimit: 0
});

// Test the pool connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to database using pool');
    connection.release(); // Release the connection back to the pool
});

module.exports = pool;
