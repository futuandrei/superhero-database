# Cheat Sheet

## Login & Logout

mysql -u root -p # Log in as root
mysql -u antony -p # Log in as antony
exit # Exit MariaDB

## Database Management

SHOW DATABASES; -- Show all databases
CREATE DATABASE catdb; -- Create a new database
DROP DATABASE catdb; -- Delete a database
USE catdb; -- Switch to a database

## Table Management

SHOW TABLES; -- List all tables in the current database
CREATE TABLE cat ( -- Create a table
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(15) NOT NULL,
weightKg INT NOT NULL,
breed VARCHAR(13),
length INT
);
DESCRIBE cat; -- Show table structure
ALTER TABLE cat ADD COLUMN color VARCHAR(10); -- Add a new column
ALTER TABLE cat MODIFY COLUMN breed VARCHAR(20); -- Modify column type
DROP TABLE cat; -- Delete a table

## User Management

SELECT User, Host FROM mysql.user; -- List all users
CREATE USER 'antony'@'localhost' IDENTIFIED BY 'HEr65S8d'; -- Create a new user
SHOW GRANTS FOR 'antony'@'localhost'; -- Show permissions of a user
GRANT ALL PRIVILEGES ON catdb._ TO 'antony'@'localhost'; -- Grant privileges
REVOKE ALL PRIVILEGES ON catdb._ FROM 'antony'@'localhost'; -- Remove privileges
DROP USER 'antony'@'localhost'; -- Delete a user
FLUSH PRIVILEGES; -- Apply privilege changes

## Data Manipulation (CRUD)

INSERT INTO cat (name, weightKg, breed, length) VALUES ('Snowball', 8, 'Siberian', 50);
UPDATE cat SET weightKg = 9 WHERE name = 'Snowball';
DELETE FROM cat WHERE name = 'Snowball'; -- Delete a specific row
DELETE FROM cat; -- Delete all rows but keep the table
TRUNCATE TABLE cat; -- Completely clear the table & reset ID
ALTER TABLE cat AUTO_INCREMENT = 1; -- Reset auto-increment after deletion

## Data Retrieval (Queries)

SELECT _ FROM cat; -- Retrieve all data from table
SELECT name, breed FROM cat WHERE weightKg > 5; -- Get specific columns with a condition
SELECT COUNT(_) FROM cat; -- Count number of rows
SELECT DISTINCT breed FROM cat; -- Get unique breed names
SELECT \* FROM cat ORDER BY weightKg DESC; -- Order results by weight in descending order

## Permission & Priviliges

REVOKE ALL PRIVILEGES ON catdb.\* FROM 'antony'@'localhost'; -- Revoke user privileges
SHOW GRANTS FOR 'antony'@'localhost'; -- Show user privileges
FLUSH PRIVILEGES; -- Apply privilege changes
DROP USER 'antony'@'localhost'; -- Delete a user

## Service Management (Linux/maxOS)

sudo systemctl start mariadb # Start MariaDB
sudo systemctl stop mariadb # Stop MariaDB
sudo systemctl restart mariadb # Restart MariaDB
