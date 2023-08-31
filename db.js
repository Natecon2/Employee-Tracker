const mysql = require('mysql2/promise');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'employee_db'
});

// Query functions
const getAllDepartments = async () => {
  const [rows] = await pool.query('SELECT * FROM department');
  return rows;
};

const getAllRoles = async () => {
  const [rows] = await pool.query('SELECT * FROM role');
  return rows;
};

// Define other query functions for roles and employees

module.exports = {
  getAllDepartments,
  getAllRoles
  // Export other query functions
};
