const inquirer = require('inquirer');
const db = require('./db'); // Replace with your actual db.js module

// Main menu prompt and logic
const mainMenu = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'Add a department',
          'Add a role',
          // Add more choices for other functionalities
          'Exit',
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        // ... Handle other choices
        case 'Exit':
          console.log('Exiting...');
          process.exit(0);
          break;
      }
    });
};

// Function to view all departments
const viewAllDepartments = async () => {
  const departments = await db.getAllDepartments(); // Implement this function in db.js
  console.log('\n');
  console.table(departments);
  mainMenu();
};

// Function to view all roles
const viewAllRoles = async () => {
  const roles = await db.getAllRoles(); // Implement this function in db.js
  console.log('\n');
  console.table(roles);
  mainMenu();
};

// Function to add a department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department:',
        validate: (input) => {
          if (input.trim() === '') {
            return 'Please enter a department name.';
          }
          return true;
        },
      },
    ])
    .then(async (answers) => {
      const departmentName = answers.departmentName;
      await db.addDepartment(departmentName); // Implement this function in db.js
      console.log(`Department '${departmentName}' added successfully.`);
      mainMenu();
    });
};

// Function to add a role
const addRole = async () => {
  const departments = await db.getAllDepartments(); // Implement this function in db.js
  const departmentChoices = departments.map((department) => ({
    name: department.name,
    value: department.id,
  }));

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'roleTitle',
        message: 'Enter the title of the role:',
        validate: (input) => {
          if (input.trim() === '') {
            return 'Please enter a role title.';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'Enter the salary for the role:',
        validate: (input) => {
          if (!/^\d+(\.\d{1,2})?$/.test(input)) {
            return 'Please enter a valid salary (numeric value).';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select the department for the role:',
        choices: departmentChoices,
      },
    ])
    .then(async (answers) => {
      const role = {
        title: answers.roleTitle,
        salary: parseFloat(answers.roleSalary),
        department_id: answers.departmentId,
      };

      await db.addRole(role); // Implement this function in db.js
      console.log(`Role '${role.title}' added successfully.`);
      mainMenu();
    });
};

// Start the application
mainMenu();