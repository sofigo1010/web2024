CREATE DATABASE IF NOT EXISTS vlog_db;
USE vlog_db;

CREATE USER IF NOT EXISTS 'vlog_user'@'%' IDENTIFIED BY 'vlog_password';
GRANT ALL PRIVILEGES ON vlog_db.* TO 'vlog_user'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS vlog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    picture TEXT NOT NULL
);