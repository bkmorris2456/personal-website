const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
const PORT = 3307;

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL database.');

    checkAndCreateTables();
  }
});

const tables = ['certifications', 'classes', 'education', 'experiences', 'skills', 'users']

// Function to check and create tables
const checkAndCreateTables = () => {

  let missingTables = [];

  // Loop through each table and check if it exists
  tablesToCheck.forEach((table, index) => {
    const checkTableQuery = `SHOW TABLES LIKE '${table}'`;

    db.query(checkTableQuery, (err, result) => {
      if (err) {
        console.error(`Error checking table ${table}:`, err);
        return;
      }

      // If the table does not exist, add it to the missingTables array
      if (result.length === 0) {
        console.log(`Table ${table} does not exist.`);
        missingTables.push(table);
      }

      // If we've checked all tables, proceed with creating tables if needed
      if (index === tablesToCheck.length - 1) {
        if (missingTables.length > 0) {
          console.log('Some tables are missing, creating tables...');
          executeSQLFile();
        } else {
          console.log('All tables already exist, no need to create.');
        }
      }
    });
  });

};

// Function to execute the SQL file
const executeSQLFile = () => {
  const sqlFilePath = path.join(__dirname, 'create_tables.sql'); // Update with your SQL file path

  fs.readFile(sqlFilePath, 'utf8', (err, sql) => {
    if (err) {
      console.error('Error reading the SQL file:', err);
      return;
    }

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error executing the SQL file:', err);
        return;
      }
      console.log('SQL file executed successfully, tables created.');
    });
  });
};

// Route to execute SQL file
app.get('/execute-sql', (req, res) => {
  const sqlFilePath = path.join(__dirname, 'sql', 'create_tables.sql');
  fs.readFile(sqlFilePath, 'utf8', (err, sql) => {
    if (err) {
      console.error('Error reading SQL file:', err.message);
      return res.status(500).json({ error: 'Failed to read SQL file' });
    }

    // Execute the SQL file content
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error executing SQL:', err.message);
        return res.status(500).json({ error: 'Failed to execute SQL' });
      }

      res.json({ message: 'SQL executed successfully', result });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
