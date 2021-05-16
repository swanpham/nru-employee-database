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
            case 'Add departments':
                newDepartment()
                break
            case 'Add roles':
                newRole()
                break
            case 'Add employees':
                newEmployee()
                break
        }        
    });
}

function alldepartment () {
    db.promise ().query (`SELECT * FROM departments ORDER BY departments.id`)
    .then (([rows]) => {
        console.table (rows);
        app()
    })
    .catch(error => {
        console.log (error);
    })
}

function allemployee () {
    db.promise().query (`SELECT employees.id,
        employees.first_name,
        employees.last_name,
        roles.title,
        employees.manager_id
        FROM employees
        LEFT JOIN roles
        ON employees.roles_id = roles.id
        ORDER BY employees.id;`)

    .then (([rows]) => {
        console.table (rows);
        app()
    })
    .catch(error => {
        console.log (error);
    })
}

function allrole () {
    db.promise().query (`SELECT roles.id,
        roles.title AS job_title, 
        departments.name AS departments_name,
        roles.salary
        FROM roles
        LEFT JOIN departments
        ON roles.departments_id = departments.id
        GROUP BY roles.id
        ORDER BY roles.id;`)

    .then (([rows]) => {
        console.table (rows);
        app()
    })
    .catch(error => {
        console.log (error);
    })
}

// add new department
function newDepartment() {
    return inquirer.prompt ( [
        {
            type: 'text',
            name: "department",
            message: "name of the department to add?",
        }
    ])
    .then ( response => {
        const res = response.department
        db.promise().query(`INSERT INTO departments (name) VALUES (?)`, [res])
        .then( ( [ rows ]) => {
            console.log(`added ${res} department`)
                // return to menu
            app();           
        })
        .catch( err => {
            console.log(err);
        });
    })
    .catch( err => {
        console.log(err);
    });
};

// add new role
function newRole() {
    db.promise().query(`SELECT * FROM departments ORDER BY id;`)
    .then( ( [ rows ]) => {
        console.table( rows )

        // inquirer questioning
        return inquirer.prompt ( [
            {
                type: 'text',
                name: "role",
                message: "What role would you like to add?",
            },
            {
                type: 'text',
                name: 'department',
                message: "Enter id of department?",
                validate: input => {
                    if(!input === NaN || input > 0 && input < rows.length + 1 ) {
                        return true
                    } else {
                        console.log ( ' Enter a department!' )
                        return false
                    }
                }
            },
            {
                type: 'text',
                name: "salary",
                message: "What is the salary?",
            }   
        ])
    })    
    .then ( data => {
        db.promise().query ( `INSERT INTO roles ( title, salary, departments_id) VALUES (?,?,?)`, [data.role, data.salary, data.department] )
        .then( () => {
            console.log (`${data.role} added to ${data.department} department`);
            app();
        })        
        .catch( err => {
            console.log(err);
        });
    })
    .catch( err => {
        console.log(err);
    });
};

// add new role
function newRole() {
    db.promise().query(`SELECT * FROM departments ORDER BY id;`)
    .then( ( [ rows ]) => {
        console.table( rows )

        // inquirer questioning
        return inquirer.prompt ( [
            {
                type: 'text',
                name: "role",
                message: "What role would you like to add?",
            },
            {
                type: 'text',
                name: 'department',
                message: "Enter id of department?",
                validate: input => {
                    if(!input === NaN || input > 0 && input < rows.length + 1 ) {
                        return true
                    } else {
                        console.log ( ' Enter a department!' )
                        return false
                    }
                }
            },
            {
                type: 'text',
                name: "salary",
                message: "What is the salary?",
            }   
        ])
    })    
    .then ( data => {
        db.promise().query ( `INSERT INTO roles ( title, salary, departments_id) VALUES (?,?,?)`, [data.role, data.salary, data.department] )
        .then( () => {
            console.log (`${data.role} added to ${data.department} department`);
            app();
        })        
        .catch( err => {
            console.log(err);
        });
    })
    .catch( err => {
        console.log(err);
    });
};

module.exports = app;