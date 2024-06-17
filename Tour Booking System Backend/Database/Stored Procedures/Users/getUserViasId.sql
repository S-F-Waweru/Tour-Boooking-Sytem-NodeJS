CREATE OR ALTER Procedure getUserViaId(@Id VARCHAR(255))
as
BEGIN 
    SELECT * FROM Users WHERE Id = @Id
END