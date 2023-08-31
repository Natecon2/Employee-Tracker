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
    const sql = 'INSERT INTO department (name) VALUES (?)';
    const values = [departmentName];
    await pool.query(sql, values);
  };
  
  const addRole = async (role) => {
    const { title, salary, department_id } = role;
    const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    const values = [title, salary, department_id];
    await pool.query(sql, values);
  };

module.exports = {
  getAllDepartments,
  getAllRoles,
  addDepartment,
  addRole
  // Export other query functions
};
