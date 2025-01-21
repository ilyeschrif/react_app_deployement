const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Sample API: Get all vehicles
app.get('/vehicles', (req, res) => {
    const query = 'SELECT * FROM vehicles';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);  // Log the error for debugging
            return res.status(500).json({ error: 'An error occurred while querying the database.' });
        }
        
        // Check if the result set is empty
        if (results.length === 0) {
            return res.status(404).json({ message: 'The database is empty.' });
        }
        
        // Return the results if the database contains records
        res.json(results);
    });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
