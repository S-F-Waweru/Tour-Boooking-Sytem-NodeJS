CREATE table Users (
    Id VARCHAR(255) PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    isEmailSent INT DEFAULT 0,
    isDeleted INT DEFAULT 0
)