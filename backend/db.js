const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const initializeDatabase = () => {
    // Create the database if it doesn't exist
    const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS vehicles_db;';
    db.query(createDatabaseQuery, (err, result) => {
        if (err) {
            console.error('Error creating database:', err);
        } else {
            console.log('Database "vehicles_db" checked/created successfully.');
        }
    });

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS vehicles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        power VARCHAR(10) NOT NULL,
        price INT NOT NULL
    );
    `;
    
    db.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Table "vehicles" checked/created successfully.');
        }
    });

    const insertDataQuery = `
    INSERT INTO vehicles (name, power, price) 
    SELECT 'Car Model 1', '4CH', 12000
    UNION 
    SELECT 'Car Model 2', '5CH', 15000
    UNION 
    SELECT 'Car Model 3', '6CH', 20000
    ON DUPLICATE KEY UPDATE id=id;
    `;
    
    db.query(insertDataQuery, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
        } else {
            console.log('Initial data inserted successfully.');
        }
    });
};

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database.');

    initializeDatabase();
});

module.exports = db;
