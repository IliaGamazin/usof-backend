DROP DATABASE IF EXISTS usof;
CREATE DATABASE IF NOT EXISTS usof;
USE usof;

CREATE USER IF NOT EXISTS 'slave'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON usof.* TO 'slave'@'localhost';

CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT,
    login VARCHAR(32) NOT NULL UNIQUE,
    firstname VARCHAR(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    lastname VARCHAR(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    password VARCHAR(320) NOT NULL,
    email VARCHAR(320) NOT NULL UNIQUE,
    profile_picture VARCHAR(255) NULL,
    rating INT NOT NULL DEFAULT 0,
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',

    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS categories (
    id INT UNSIGNED AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS posts (
    id INT UNSIGNED AUTO_INCREMENT,
    author_id INT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    status ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    content TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY(id),
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
)
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS posts_categories (
    post_id INT UNSIGNED NOT NULL,
    category_id INT UNSIGNED NOT NULL,

    PRIMARY KEY(post_id, category_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- CREATE TABLE IF NOT EXISTS users_favourites (
--
-- );
--
-- CREATE TABLE IF NOT EXISTS users_subscriptions (
--
-- );

CREATE TABLE IF NOT EXISTS comments (
    id INT UNSIGNED AUTO_INCREMENT,
    author_id INT UNSIGNED NOT NULL UNIQUE,
    content TEXT NOT NULL,
    commentable_type ENUM('POST', 'ANSWER') NOT NULL,
    commentable_id INT UNSIGNED NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY(id)
);
