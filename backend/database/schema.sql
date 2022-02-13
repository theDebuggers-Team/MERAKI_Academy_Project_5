-- DROP DATABASE MERAKI_Academy_Project_5;
-- CREATE DATABASE MERAKI_Academy_Project_5 ;
USE  MERAKI_Academy_Project_5 ;

-- CREATE TABLE roles (
--     id INT AUTO_INCREMENT NOT NULL,
--     role VARCHAR(255) NOT NULL,
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE users(
--     id INT AUTO_INCREMENT NOT NULL,
--     firstName VARCHAR(255) NOT NULL,
--     lastName VARCHAR(255) NOT NULL,
--     age INT(3),
--     country VARCHAR(255),
--     email VARCHAR(255) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     role_id INT NOT NULL,
--     phone_Number VARCHAR(255),
--     FOREIGN KEY (role_id) REFERENCES roles(id),
--     is_deleted TINYINT DEFAULT 0,
--     PRIMARY KEY (id),
--     users_image MEDIUMTEXT,
--     publish_date DATETIME DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE products (
--     id INT AUTO_INCREMENT NOT NULL,
--     title VARCHAR(255) NOT NULL,
--     description TEXT NOT NULL,
--     user_id INT,
--      price INT,
--      image MEDIUMTEXT,
--     FOREIGN KEY (user_id) REFERENCES users(id),
--     publish_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--   category VARCHAR(20),
--     is_deleted TINYINT DEFAULT 0,
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE comments (
-- id INT AUTO_INCREMENT NOT NULL,
-- comment TEXT NOT NULL,
-- user_id INT,
-- product_id INT,
-- FOREIGN KEY (user_id) REFERENCES users(id),
-- FOREIGN KEY (product_id) REFERENCES products(id),
--  publish_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--  is_deleted TINYINT DEFAULT 0,
-- PRIMARY KEY (id)

-- );
-- CREATE TABLE Likes (
-- id INT AUTO_INCREMENT NOT NULL,
-- love INT,
-- product_id INT,
-- user_id INT,
-- FOREIGN KEY (user_id) REFERENCES users(id),
-- FOREIGN KEY (product_id) REFERENCES products(id),
-- is_deleted TINYINT DEFAULT 0,
-- PRIMARY KEY (id)
-- );

-- CREATE TABLE wishlist (
-- id INT AUTO_INCREMENT NOT NULL,
-- product_id INT,
-- user_id INT,
-- FOREIGN KEY (user_id) REFERENCES users(id),
-- FOREIGN KEY (product_id) REFERENCES products(id),
-- is_deleted TINYINT DEFAULT 0,
-- PRIMARY KEY (id)
-- );

-- insert into roles (role) values ("ADMIN");
-- insert into roles (role) values ("USER");

-- insert into users (firstName,lastName,age,country,email,phone_Number,password,role_id,users_image) values ("naser","Qasem",24,"jordan","naser5@gmail.com","0213216","123456",1,"https://upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_20180626.jpg");
-- insert into users (firstName,lastName,age,country,email,phone_Number,password,role_id,users_image) values ("Mohammad","Abdelraheem",24,"jordan","Mohd@gmail.com","0213216","123456",2,"https://cdn.i-scmp.com/sites/default/files/d8/images/methode/2020/06/24/cf9d675c-b1fe-11ea-953d-a7ecc5cbd229_image_hires_144326.jpg");
-- insert into products (title, description, price, image,user_id,category) values ("avante","avante 4 sale ","8000","https://image-cdn.beforward.jp/large/201706/781633/BF657240_479612.jpg",1,"cars");
-- insert into products (title, description, price, image,user_id,category) values ("mazda","mazda 4 sale ","8000","https://cdn.elwatannews.com/watan/543x295/14365937361579365330.jpg",1,"cars");
-- insert into products (title, description, price, image,user_id,category) values ("sonata","sonata 4 sale ","8000","https://cdn.elwatannews.com/watan/543x295/14365937361579365330.jpg",1,"cars");

ALTER TABLE products ADD counter INT DEFAULT 0;


ALTER TABLE products ADD rating INT DEFAULT 0;

ALTER TABLE products ADD latitude1 VARCHAR(255);

ALTER TABLE products ADD longitude1 VARCHAR(255);

ALTER TABLE products ADD rating INT DEFAULT 0;

