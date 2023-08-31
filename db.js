const mysql = require('mysql2/promise');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Lex!0802',
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

const addDepartment = async (departmentName) => {
  // Implement the SQL query to add a department here
};

const addRole = async (role) => {
  // Implement the SQL query to add a role here
};

// Define other query functions for roles and employees

module.exports = {
  getAllDepartments,
  getAllRoles,
  addDepartment,
  addRole
  // Export other query functions
};
