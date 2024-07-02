CREATE or alter PROCEDURE updateTour(
    @Id VARCHAR(255),
    @Name  VARCHAR(255) ,
    @Destination VARCHAR(255),
    @Description VARCHAR(255),
    @Price int
)
AS
BEGIN
    UPDATE Tours
    SET
        Name=@Name,
        Destination =@Destination,
        Description=@Description,
        Price=@Price
    WHERE 	
        Id = @Id

END