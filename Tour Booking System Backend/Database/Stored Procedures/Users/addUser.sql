CREATE OR ALTER PROCEDURE addUser(
    @Id varchar(255) ,
    @Name varchar(255),
    @Email varchar(255) ,
    @Password varchar(255)
)
AS
BEGIN
    INSERT INTO Users
        (Id, Name, Email, Password)
    VALUES
        (@Id, @Name, @Email, @Password)
END