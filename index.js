const inquirer = require("inquirer@8.2.4");
const fs = require("fs");

const questions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "choices (change later?",
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
  {},
];

function init() {}
