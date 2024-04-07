const inquirer = require("inquirer");
const fs = require("fs");
const express = require("express");

const app = express();

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
];

function init() {
  inquirer.prompt(questions);
}

init();
