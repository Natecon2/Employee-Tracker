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
  const [result] = await pool.query('INSERT INTO department (name) VALUES (?)', [departmentName]);
  return result;
};

const addRole = async (title, salary, departmentId) => {
  const [result] = await pool.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
  return result;
};

// Define other query functions for roles and employees

module.exports = {
  getAllDepartments,
  getAllRoles,
  addDepartment,
  addRole
  // Export other query functions
};
