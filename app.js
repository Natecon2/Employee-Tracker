const inquirer = require('inquirer');
const db = require('./db');

// Main menu prompt and logic
const mainMenu = () => {
  inquirer
    .prompt([
      // ... (existing code)

      // Add more choices for other functionalities
      'Add a department',
      'Add a role',
      // ...
    ])
    .then((answer) => {
      switch (answer.action) {
        // ...

        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
      }
    });
};

// ... (existing code)

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
    .then(async (answer) => {
      const departmentName = answer.departmentName;
      await db.addDepartment(departmentName); // Implement the db.addDepartment function
      console.log(`Department '${departmentName}' added successfully.`);
      mainMenu();
    });
};

// Function to add a role
const addRole = async () => {
  const departments = await db.getAllDepartments();
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

      await db.addRole(role); // Implement the db.addRole function
      console.log(`Role '${role.title}' added successfully.`);
      mainMenu();
    });
};

// ... (existing code)

// Start the application
mainMenu();
