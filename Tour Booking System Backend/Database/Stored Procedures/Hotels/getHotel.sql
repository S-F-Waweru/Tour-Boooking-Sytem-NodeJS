CREATE or ALTER PROCEDURE getHotel(@Id VARCHAR(255))
AS
BEGIN
    SELECT * FROM Hotels WHERE Id = @Id
END