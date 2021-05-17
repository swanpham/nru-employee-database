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
                'Update role',     
                'Delete an employee',    
                'Delete a role',    
                'Delete a department',
                'View by department',
                'View department budget',
                'View employees by manager'
            ]
        }
    ]).then(res => {
        switch(res.select) {
            case 'View all departments': 
                allDepartment()
                break             
            case 'View all employees': 
                allEmployee()
                break 
            case 'View all roles': 
                allRole()
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
            case 'Update role':
                updateRole()
                break
            case 'Update employee managers':
                updateManager()
                break
            case 'Delete an employee':
                deleteEmployee()
                break
            case 'Delete a role':
                deleteRole()
                break
            case 'Delete a department':
                deleteDepartment()
            break
            case 'View by department':
                viewByDepartment()
                break
            case 'View department budget':
                viewBudget()
                break
            case 'View employees by manager':
                viewManagers()
                break
        }        
    });
}

// view all departments
function allDepartment () {
    db.promise().query (`SELECT * FROM departments ORDER BY departments.id`)
    .then (([rows]) => {
        console.table (rows);
        app()
    })
    .catch(error => {
        console.log (error);
    })
}

// view all employees
function allEmployee () {
    db.promise().query (`SELECT employees.id,
        employees.first_name,
        employees.last_name,
        roles.title,
        roles.salary,
        managers.first_name AS manager_first_name,
        managers.last_name AS manager_last_name
        FROM employees
        LEFT JOIN employees AS managers
        ON employees.manager_id = managers.id
        LEFT JOIN roles
        ON employees.roles_id = roles.id;`)
    .then(([rows]) => {
        console.table(rows);
        app()
    })
    .catch(error => {
        console.log(error);
    })
}

// view all roles
function allRole() {
    db.promise().query (`SELECT roles.id,
        roles.title AS job_title, 
        departments.name AS departments_name,
        roles.salary
        FROM roles
        LEFT JOIN departments
        ON roles.departments_id = departments.id
        GROUP BY roles.id
        ORDER BY roles.id;`)

    .then(([rows]) => {
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
    .then( response => {
        const res = response.department
        db.promise().query(`INSERT INTO departments (name) VALUES (?)`, [ res ])
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
    db.promise().query(`SELECT departments.id AS department_id, departments.name AS departments_name FROM departments ORDER BY id;`)
    .then( ( [ rows ]) => {
        console.table( rows )

        // inquirer questioning
        return inquirer.prompt ( [
            
            {
                type: 'text',
                name: 'department',
                message: "Enter id of department?",
                validate: input => {
                    if(!input === NaN || input > 0 ) {
                        return true
                    } else {
                        console.log ( ' Enter a department!' )
                        return false
                    }
                }
            },
            {
                type: 'text',
                name: "role",
                message: "What role would you like to add?",
            },
            {
                type: 'text',
                name: "salary",
                message: "What is the salary?",
            }   
        ])
    })    
    .then( data => {
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

// add new employees
function newEmployee() {
    db.promise().query(`SELECT roles.id,
                                roles.title AS job_title, 
                                departments.name AS departments_name,
                                roles.salary
                                FROM roles
                                LEFT JOIN departments
                                ON roles.departments_id = departments.id
                                GROUP BY roles.id
                                ORDER BY roles.id;`)
    .then( ( [ rows ]) => {
        console.table( rows )

        // inquirer questioning
        return inquirer.prompt( [
            {
                type: 'text',
                name: "first_name",
                message: "Enter employee first name",
            },
            {
                type: 'text',
                name: "last_name",
                message: "Enter employee last name",
            },
            {
                type: 'text',
                name: 'role',
                message: "Enter id of role from list",
                validate: input => {
                    if(!input === NaN || input > 0 ) {
                        return true
                    } else {
                        console.log ( ' Enter a role id from list' )
                        return false
                    }
                }
            },
            {
                type: 'text',
                name: "manager",
                message: "Enter the employee id of manager, or leave blank",
            }   
        ])
    })    
    .then( data => {
        let manager = data.manager === '' ? null : data.manager

        db.promise().query ( `INSERT INTO employees ( first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)`, [ data.first_name, data.last_name, data.role, manager ] )
        .then( () => {
            console.log (`${data.first_name} ${data.last_name} added`);
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

// update role
function updateRole() {
    db.promise().query(`SELECT * FROM employees ORDER BY id;`)
    .then( ( [ rows ] ) => {
        console.table (rows) 
        return inquirer.prompt ( [
            {
                type: 'text',
                name: 'employee',
                message: "Enter id of emplyee to update",
                validate: input => {
                    if(!input === NaN || input > 0 ) {
                        return true
                    } else {
                        console.log ( ' Enter employee id' )
                        return false
                    }
                }
            },
        ])
    })
    .then( data => {
        const employee = data.employee
        db.promise().query(`SELECT * FROM roles ORDER BY id;`)
        .then(([ rows ])=> {
            console.table (rows)

            // inquirer questioning
            return inquirer.prompt ( [
                {
                    type: 'text',
                    name: 'role',
                    message: "Enter id of new role",
                    validate: input => {
                        if(!input === NaN || input > 0 ) {
                            return true
                        } else {
                            console.log ( ' Enter a role id' )
                            return false
                        }
                    }
                }
            ])
        })
        .then(data => {
            const role = data.role
            db.promise().query(`UPDATE employees SET roles_id = ? WHERE id = ?`, [ role, employee ])
                .then( ( [ rows ] ) => {
                    // display confirmation
                    console.log('role updated')
                    // return to menu
                    app();
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);        
        });        
    })
    .catch(err => {
        console.log(err);
    });
};

// update manager
function updateManager() {
    let list
    db.promise().query(`SELECT employees.id, employees.first_name, employees.last_name FROM employees ORDER BY id;`)
        .then( ( [ rows ] ) => {
            list = rows
            console.table( rows )
            return inquirer.prompt ([
                {
                    type: 'text',
                    name: 'employee',
                    message: "Enter id of employee to update",
                    validate: input => {
                        if(!input === NaN || input > 0 ) {
                            return true
                        } else {
                            console.log ( ' Enter a role id from list' )
                            return false
                        }
                    }
                }
            ])
        })
        .then( data => {
            const employee = data.employee

            return inquirer.prompt ([
                {
                    type: 'text',
                    name: 'manager',
                    message: "Enter id of employee to set as manager",
                    validate: input => {
                        if(!input === NaN || input > 0 ) {
                            return true
                        } else {
                            console.log ( ' Enter an employee id!' )
                            return false
                        }
                    }
                }

            ])
            .then(data => {
                let manager = data.manager === '' ? null : data.manager

                db.promise().query(`UPDATE employees SET manager_id = ? WHERE id = ?`, [ manager, employee ])
                    .then (( [ rows ]) => {
                        console.log ( 'manager updated' )
                        app();
                    })
                    .catch( err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });            
        })
        .catch(err => {
            console.log(err);
        });
};

// delete an employee
function deleteEmployee(){
    db.promise().query(`SELECT id,
                                first_name,
                                last_name
                                FROM employees
                                ORDER BY id;`)
    .then(([ rows ])=> {
        console.table(rows)
        return inquirer.prompt( [
            {
                type: 'text',
                name: 'employee',
                message: "Choose id of employee to delete",
                validate: input => {
                    if(!input === NaN || input > 0 ) {
                        return true
                    } else {
                        console.log ( ' Enter an employee id to delete!' )
                        return false
                    }
                }
            }

        ])
    })  
    .then(data => {
        console.log (data.employee);
        db.promise().query(`DELETE FROM employees WHERE id = ?;`, [data.employee])
        .then(()=> {
            console.log ( 'employee deleted');
            app ();
        })
        .catch(err => {
            console.log(err);
        });            
    })
    .catch(err => {
        console.log(err);
    });                            
};

// delete a role
function deleteRole() {
    db.promise().query(`SELECT * FROM roles ORDER BY id;`)
    .then(([ rows ])=> {
        console.table(rows)
        return inquirer.prompt( [
            {
                type: 'text',
                name: 'role',
                message: "Choose id of role to delete",
                validate: input => {
                    if(!input === NaN || input > 0 ) {
                        return true
                    } else {
                        console.log ( ' Enter an employee id to delete!' )
                        return false
                    }
                }
            }

        ])
    })  
    .then(data => {
        db.promise().query(`DELETE FROM roles WHERE id = ?;`, [data.role])
        .then(()=> {
            console.log ( 'role deleted');
            app ();
        })
        .catch(err => {
            console.log(err);
        });            
    })
    .catch(err => {
        console.log(err);
    });                            
};

// delete a department
function deleteDepartment() {
    db.promise().query(`SELECT * FROM departments ORDER BY id;`)
    .then(([ rows ]) => {
        console.table( rows )
        return inquirer.prompt( [
            {
                type: 'text',
                name: 'department',
                message: "Choose id of department to delete",
                validate: input => {
                    if(!input === NaN || input > 0 ) {
                        return true
                    } else {
                        console.log ( ' Enter a department id to delete!' )
                        return false
                    }
                }
            }

        ])
    })  
    .then(data => {
       
        db.promise().query(`DELETE FROM departments WHERE id = ?;`, [data.department])
        .then( () => {
            console.log ( 'department deleted');
            app ();
        })
        .catch(err => {
            console.log(err);
        });            
    })
    .catch(err => {
        console.log(err);
    });          
};

// view by department
function viewByDepartment() {
    db.promise().query(`SELECT id, name FROM departments ORDER BY departments.id;`)
    .then( ( [ rows ] ) => {
        console.table(rows)
        return inquirer.prompt( [
            {
                type: 'text',
                name: 'department',
                message: "Choose id of department to view",
                validate: input => {
                    if(!input === NaN || input > 0 ) {
                        return true
                    } else {
                        console.log ( ' Enter a department id to view!' )
                        return false
                    }
                }
            }

        ])
    })  
    .then( data => {
        db.promise().query(`SELECT employees.id,
                                   employees.first_name,
                                   employees.last_name,
                                   roles.title AS job_title
                                   FROM employees
                                   LEFT JOIN roles
                                   ON employees.roles_id = roles.id
                                   LEFT JOIN departments
                                   ON roles.departments_id = departments.id
                                   WHERE departments.id = ?;`, [ data.department ])
        .then( ( [ rows ] ) => {
            console.table ( rows )
            app ();
        })
        .catch( err => {
            console.log(err);
        });            
    })
    .catch( err => {
        console.log(err);
    });          
}

// view department budget
function viewBudget() {
    db.promise().query(`SELECT departments.name AS department,
                               SUM(roles.salary) AS salary
                               FROM employees
                               LEFT JOIN roles
                               ON employees.roles_id = roles.id
                               LEFT JOIN departments
                               ON roles.departments_id = departments.id
                               GROUP BY departments.id
                               ORDER BY departments.id;`)
    .then( ( [ rows ] ) => {
        console.table( rows )
        app();        
    })
    .catch( err => {
        console.log( err );
    });
};

// view emplyees by manager
function viewManagers() {
    db.promise().query(`SELECT managers.id,
                               managers.first_name AS manager_first_name,
                               managers.last_name AS manager_last_name
                               FROM employees
                               LEFT JOIN employees AS managers
                               ON employees.manager_id = managers.id
                               WHERE employees.manager_id IS NOT NULL
                               GROUP BY managers.id
                               ORDER BY managers.id;`)
    .then( ( [ rows ] ) => {
        console.table( rows )
        return inquirer.prompt( [
            {
                type: 'text',
                name: 'manager',
                message: "Select id of manager to view",
                validate: input => {
                    if(!input === NaN || input > 0 ) {
                        return true
                    } else {
                        console.log ( ' Enter a manager id to view!' )
                        return false
                    }
                }
            }

        ])
    })
    .then( data => {
        db.promise().query(`SELECT employees.id,
                                   employees.first_name,
                                   employees.last_name,
                                   roles.title AS job_title
                                   FROM employees
                                   LEFT JOIN employees AS managers
                                   ON employees.manager_id = managers.id
                                   LEFT JOIN roles
                                   ON employees.roles_id = roles.id
                                   WHERE employees.manager_id = ?;`, [ data.manager])
        .then( ( [ rows ] ) => {
            console.table(rows)
            app();        
        })
        .catch(err => {
            console.log(err);
        });
    })
    .catch(err => {
        console.log(err);
    });    
};

module.exports = app;