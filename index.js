const inquirer = require("inquirer");
const { Pool } = require("pg");

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

const questions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "choices",
    choices: [
      "View all Employees",
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
    // console.log(prompt.choices);
    if (prompt.choices == "View all Departments") {
      then.function(viewAllDepartments);
      console.table();
    }
    if (prompt.choices == "View all Roles") {
      viewAllRoles();
      console.table();
    }
    if (prompt.choices == "View All Employees") viewAllEmployees();
    console.table(prompt.choices);
  });
}

function viewAllDepartments() {
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
  const sql = `SELECT * FROM roles`;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      console.log({ error: err.message });
      return;
    }
    console.table(rows);
  });
}

function viewAllEmployees() {
  const sql = `SELECT * FROM employees`;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      console.log({ error: err.message });
      return;
    }
    console.table(rows);
  });
}

init();
