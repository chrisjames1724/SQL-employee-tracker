const inquirer = require("inquirer");
const { Pool } = require("pg");
const { Client } = require('pg');


const pool = new Pool(
  {
    user: "postgres",
    password: "Gators1",
    host: "localhost",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

pool.connect();
client.connect();

const questions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "choices",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
    ],
  },
];

function init() {
  inquirer.prompt(questions).then(function (prompt) {
    console.log(prompt.choices);
    if (prompt.choices == "View All Departments") {
      viewAllDepartments();
      console.table();
    }
    if (prompt.choices == "View All Roles") {
      console.log(prompt.choices);
      viewAllRoles();
      console.table();
    }
    if (prompt.choices == "View All Employees") {
      viewAllEmployees();
      console.table(prompt.choices);
    }
    if (prompt.choices == "Add Employee") {
      addEmployee();
    }
    if (prompt.choices == "Add Department") {
      addDepartment();
    }
    if (prompt.choices == "Add Role") {
      addRole();
    }
    if (prompt.choices == "Update Employee Role") {
      updateEmployeeRole();
    }
  });
}

function viewAllDepartments() {
  console.log("viewAllDepartments");
  const sql = `SELECT * FROM department`;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      console.log({ error: err.message });
      return;
    }
    console.table(rows);
  });
}

function viewAllRoles() {
  console.log("viewAllRoles");
  const sql = `SELECT * FROM role`;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      console.log({ error: err.message });
      return;
    }
    console.table(rows);
  });
}

function viewAllEmployees() {
  console.log("viewAllEmployees");
  const sql = `SELECT * FROM employees`;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      console.log({ error: err.message });
      return;
    }
    console.table(rows);
  });
}

async function addEmployee() {
  try {
    const roles = await pool.query(
      "SELECT id as value, title as name FROM role"
    );
    const managers = await pool.query(
      "SELECT id as value,concat (first_name, ' ', last_name) as name FROM employees WHERE manager_id is null"
    );
    const prompt = await inquirer.prompt([
      {
        type: "input",
        message: "What is the employees first name?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is the employees last name?",
        name: "last_name",
      },
      {
        type: "list",
        message: "what is the employee role?",
        choices: roles.rows,
        name: "role",
      },
      {
        type: "list",
        message: "Who is the manager for this employee?",
        choices: managers.rows,
        name: "manager",
      },
    ]).then((answers) => {
      const query = "INSERT INTO employees,concat (first_name, ' ', last_name), as name from employees";
      const values = [answers.first_name, answers.last_name, answers.role, answers.manager];
      client.query(query, values, (err, res) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Data inserted successfully!');
        }
    
      
        client.end();
      })

    console.log(prompt);
    console.table(roles.rows);
    console.table(managers.rows);
  // } catch (error) {
  //   console.log(error);
  // };
};

async function addRole() {
  try {
    const departments = await pool.query(
      "SELECT department as name FROM department"
    );
    const prompt = await inquirer.prompt([
      {
        type: "input",
        message: "What is the name of the new role?",
        name: "new role",
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "salary",
      },
      {
        type: "list",
        message: "Which department does this role belong to?",
        choices: departments.rows,
        name: "role department",
      },
    ]);
    console.log(prompt);
    console.table(departments.rows);
  } catch (error) {
    console.log(error);
  }
}

async function addDepartment() {
  try {
    const prompt = await inquirer.prompt([
      {
        type: "input",
        message: "What is the name of the new department?",
        name: "new department",
      },
    ]);
    console.log(prompt);
  } catch (error) {
    console.log(error);
  }
}

async function updateEmployeeRole() {
  try {
    const employees = await pool.query(
      "SELECT id as value,concat (first_name, ' ', last_name) as name FROM employees"
    );
    const roles = await pool.query(
      "SELECT id as value, title as name FROM role"
    );
    const prompt = await inquirer.prompt([
      {
        type: "list",
        message: "Which employee would you like to update?",
        choices: employees.rows,
        name: "employee role",
      },
      {
        type: "list",
        message: "Which role do you want to assign to this employee?",
        choices: roles.rows,
        name: "role choice",
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}

init();











// const { Client } = require('pg');
// const inquirer = require('inquirer');

// // Create a new PostgreSQL client
// const client = new Client({
//   user: 'your_username',
//   host: 'localhost',
//   database: 'your_database',
//   password: 'your_password',
//   port: 5432,
// });

// // Connect to the database
// client.connect();

// Prompt the user for input using Inquirer
inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Enter your name:',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email:',
  },
]).then((answers) => {
  // Insert the collected data into the database
  const query = 'INSERT INTO users (name, email) VALUES ($1, $2)';
  const values = [answers.name, answers.email];

  client.query(query, values, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Data inserted successfully!');
    }

    // Close the database connection
    client.end();
  });
});