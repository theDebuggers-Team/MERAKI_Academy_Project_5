DROP DATABASE MERAKI_Academy_Project_5;
CREATE DATABASE MERAKI_Academy_Project_5 ;
USE  MERAKI_Academy_Project_5 ;

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    age INT(3),
    country VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    phone_Number VARCHAR(255),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id),
    image Blob,
    publish_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    user_id INT,
     price INT,
     image BLOB,
    FOREIGN KEY (user_id) REFERENCES users(id),
    publish_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  category VARCHAR(20),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE comments (
id INT AUTO_INCREMENT NOT NULL,
comment TEXT NOT NULL,
user_id INT,
product_id INT,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (product_id) REFERENCES products(id),
 publish_date DATETIME DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id)

);
CREATE TABLE Likes (
id INT AUTO_INCREMENT NOT NULL,
love INT,
product_id INT,
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (product_id) REFERENCES products(id),
PRIMARY KEY (id)
);

CREATE TABLE favorites (
id INT AUTO_INCREMENT NOT NULL,
product_id INT,
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (product_id) REFERENCES products(id),
PRIMARY KEY (id)
);