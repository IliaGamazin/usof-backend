DROP DATABASE IF EXISTS usof;
CREATE DATABASE IF NOT EXISTS usof;
USE usof;

CREATE USER IF NOT EXISTS 'slave'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON heartclone.* TO 'slave'@'localhost';

CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT,
    login VARCHAR(32) NOT NULL UNIQUE,
    password VARCHAR(320) NOT NULL,
    email VARCHAR(320) NOT NULL UNIQUE,
    profile_picture VARCHAR(255) NULL,
    rating INT NOT NULL DEFAULT 0,
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS users_avatars (
    id INT UNSIGNED AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL UNIQUE,
    url VARCHAR(320) NOT NULL UNIQUE,

    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
