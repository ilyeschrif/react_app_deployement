CREATE DATABASE IF NOT EXISTS vehicles_db;

USE vehicles_db;

CREATE TABLE IF NOT EXISTS vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    power VARCHAR(10) NOT NULL,
    price INT NOT NULL
);

INSERT INTO vehicles (name, power, price) VALUES
('Car Model 1', '4CH', 12000),
('Car Model 2', '5CH', 15000),
('Car Model 3', '6CH', 20000);
