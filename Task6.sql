CREATE DATABASE company_db;
USE company_db;

CREATE TABLE employees (
emp_id INT PRIMARY KEY,
name VARCHAR(50),
salary INT
);

CREATE TABLE employee_log (
log_id INT AUTO_INCREMENT PRIMARY KEY,
emp_id INT,
action_type VARCHAR(10),
action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER $$

CREATE TRIGGER after_insert_employee
AFTER INSERT ON employees
FOR EACH ROW
BEGIN
INSERT INTO employee_log(emp_id, action_type)
VALUES (NEW.emp_id, 'INSERT');
END$$

CREATE TRIGGER after_update_employee
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
INSERT INTO employee_log(emp_id, action_type)
VALUES (NEW.emp_id, 'UPDATE');
END$$

DELIMITER ;

CREATE VIEW daily_activity AS
SELECT
DATE(action_time) AS activity_date,
action_type,
COUNT(*) AS total_actions
FROM employee_log
GROUP BY DATE(action_time), action_type;
INSERT INTO employees VALUES (1, 'shekar', 20000);
INSERT INTO employees VALUES (2, 'Ravi', 25000);

UPDATE employees SET salary = 30000 WHERE emp_id = 1;

SELECT * FROM employee_log;
SELECT * FROM daily_activity;