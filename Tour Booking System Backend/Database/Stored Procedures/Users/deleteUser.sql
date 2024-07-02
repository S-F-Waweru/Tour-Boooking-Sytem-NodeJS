CREATE or alter PROCEDURE deleteUser (
    @Id VARCHAR(255))
AS
BEGIN
    UPDATE Users set isDeleted = 1 WHERE Id = @Id
END