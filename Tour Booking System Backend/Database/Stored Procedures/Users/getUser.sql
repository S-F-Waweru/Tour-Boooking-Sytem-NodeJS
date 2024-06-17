CREATE OR ALTER Procedure getUser(@Email VARCHAR(255))
as
BEGIN 
    SELECT * FROM Users WHERE Email = @Email
END