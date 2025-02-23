-- Create the database
CREATE DATABASE superherodb;

-- Use the database
USE superherodb;

-- Create the superhero table
CREATE TABLE superhero (
    heroID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(15) NOT NULL,
    yearOfBirth INT NOT NULL,
    superproperty VARCHAR(23) NOT NULL,
    gear VARCHAR(15) NOT NULL
);

-- Insert test data
INSERT INTO superhero (name, yearOfBirth, superproperty, gear) VALUES
('Superman', 1938, 'Flight', 'Cape'),
('Batman', 1939, 'Genius', 'Utility Belt');

-- Create a user for database access
CREATE USER 'antony'@'localhost' IDENTIFIED BY 'HEr65S8d';
GRANT ALL PRIVILEGES ON superherodb.* TO 'antony'@'localhost';
FLUSH PRIVILEGES;