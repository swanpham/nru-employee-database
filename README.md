# NRU-Employees-Database

## AS A Business Owner

  * I WANT to be able to view and manage the departments, roles, and employees in my company
  * SO THAT I can organize and plan my business
  
## Sreenshot:



## Installation

  * Clone the repository to your local machine
  * Navigate to the designated folder in bash
  * To install Node MySQL2
    * [MySQL2](https://www.npmjs.com/package/mysql2#installation) npm package will be installed along with its own dependencies
  * Execute npm install to install dependencies
    * [Inquirer](https://www.npmjs.com/package/inquirer) npm package will be installed along with its own dependencies
  * To install console.table
    * [console.table](https://www.npmjs.com/package/console.table) npm package will be installed along with its own dependencies
  * To install dev dependencies, execite npm install --dev
    * [Jest](https://jestjs.io/) npm package will be installed along with its own dependencies
    
## Usage

* GIVEN a command-line application that accepts user input

* WHEN I start the application, 
  THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

* WHEN I choose to view all departments, THEN I am presented with a formatted table showing department names and department ids

* WHEN I choose to view all roles, THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

* WHEN I choose to view all employees, THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

* WHEN I choose to add a department, THEN I am prompted to enter the name of the department and that department is added to the database

* WHEN I choose to add a role, THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

* WHEN I choose to add an employee, THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database

* WHEN I choose to update an employee role, THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

## [Walkthrough video](https://drive.google.com/file/d/1q66UZrD1MjCbw15WcaWpLzbmsHb_sRyH/view?usp=sharing)

## Contribution

 * This project is not open for contribution
 
## Tests

  
## Built With
- Javascript
- Node.js
- Express.js


