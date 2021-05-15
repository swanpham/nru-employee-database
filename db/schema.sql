DROP TABLE IF EXISTS employees;

DROP TABLE IF EXISTS roles;

DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    departments_id INTEGER NOT NULL,
    CONSTRAINT fk_roles FOREIGN KEY (departments_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,   
    roles_id INTEGER NOT NULL,
    manager_id INTEGER REFERENCES employees(id),
    CONSTRAINT fk_employeeroles FOREIGN KEY (roles_id) REFERENCES roles(id) ON DELETE CASCADE,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE CASCADE
);


