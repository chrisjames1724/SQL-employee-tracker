\c company_db;


INSERT INTO department (name) 
VALUES ('Sales'),
('Engineering'),
('Finance'),
('Legal');


INSERT INTO role (department_id, title, salary)
VALUES (1, 'Sales Lead', '95000'),
(1, 'Salesperson', '82500'), 
(2, 'Lead Engineer', '120000'),
(2, 'Software Engineer', '100000'),
(3, 'Account Manager', '150000'),
(3, 'Accountant', '125000'),
(4, 'Legal Lead', '200000'),
(4, 'Lawyer', '175000');

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Patrick', 'Willis', 1, null), 
('Chris', 'Mullin', 2, 1), 
('Jeff', 'Kent', 3, null),
('Ken', 'Dorsey', 4, 3),
('Jeff', 'Garcia', 5, null ),
('Duane', 'Kuiper', 6, 5),
('Mike', 'Krukow', 7,null ),
('Rich', 'Aurillia', 8, 7);


