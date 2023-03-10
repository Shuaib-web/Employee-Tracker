const inquirer = require("inquirer");
const mysql = require("mysql2");

const cTable = require("console.table");


let font = "small";

async function intro() {
console.log("Track That Employee!");
}

// connecting to the database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees_db",
  },
);

// Prompts
const openingQuestion = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "mainOptions",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
      message: "What do you want to do?",
    },
  ]);
};

// add a department prompt
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDepartment",
        message: "Enter new department name:",
      },
    ])
    .then(updateDepartmentTable);
}

// add a role prompt
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "Enter the name of the new role:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter a salary for the new role:",
      },
      {
        type: "list",
        name: "department",
        choices: makeDepArray(),
        message: "Which department does the role belong to?",
      },
    ])
    .then(updateRoleTable);
}

// add an employee prompt

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the employee's first name:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the employee's last name:",
      },
      {
        type: "list",
        name: "role",
        message: "What is the employee's role:",
        choices: makeRoleArray(),
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager:",
        choices: makeManagerArray(),
      },
    ])
    .then(updateEmployeeTable);
}