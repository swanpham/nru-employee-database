INSERT INTO departments (name)
VALUES ('Sales'), ('marketing'), ('support'), ('accounting');

INSERT INTO roles (title, salary, departments_id)
VALUES ('showroom', 22, 1), ('website', 24, 1), 
       ('education', 24, 2), ('instagram', 24, 2),
       ('acount', 24, 3), ('payment', 24, 3),
       ('accountpayable', 24, 4), ('accountreceivable', 24, 4);


INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES 
       ('Joey', 'Pham', 1, null),       
       ('Swan', 'Pham', 2, null),
       ('John', 'Dexter', 3, null),
       ('Jenny', 'Nguyen', 4, null),
       ('Leo', 'Pham', 5, null),
       ('Dan', 'Nguyen', 6, null),
       ('Joseph', 'Nguyen', 7, null),
       ('Bin', 'Tran', 8, null),
       ('Jennifer', 'Pham', 1, null),
       ('Marie', 'Pham', 2, null);
