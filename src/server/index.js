const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON from requests

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',    // Adjust to your MySQL host if needed
  user: 'root',         // Your MySQL username
  password: 'Development56!!',         // Your MySQL password
  database: 'portfolio'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.log('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Start the server
app.listen(3307, () => {
  console.log('Server running on port 3307');
});