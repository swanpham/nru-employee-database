const inquirer = require ('inquirer');

const db = require ('../config/connection');

const table = require ('console.table');

function app () {
    return inquirer.prompt ([
        {
            type: 'list',
            name: 'select',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all employees',
                'View all roles',
                'Add departments',
                'Add employees',
                'Add roles',
                'Update employee managers',
                'Update employees roles',                               
            ]
        }
    ]).then (res => {
        switch (res.select) {
            case 'View all departments': 
                alldepartment()
                break 
            case 'View all employees': 
                allemployee()
                break 
            case 'View all roles': 
                allrole()
                break 


        }        
    });
}

function alldepartment () {
    db.query (`SELECT * FROM departments`)
    .then (([rows]) => {
        console.table (rows);
        app()
    })
    .catch(error => {
        console.log (error);
    })
}

function allemployee () {
    db.query (`SELECT * FROM employees`)
    .then (([rows]) => {
        console.table (rows);
        app()
    })
    .catch(error => {
        console.log (error);
    })
}

function allrole () {
    db.query (`SELECT * FROM roles`)
    .then (([rows]) => {
        console.table (rows);
        app()
    })
    .catch(error => {
        console.log (error);
    })
}

module.exports = app;