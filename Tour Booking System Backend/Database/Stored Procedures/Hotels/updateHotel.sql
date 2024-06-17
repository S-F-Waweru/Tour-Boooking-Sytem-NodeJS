CREATE or alter PROCEDURE updateHotel(
    @Id VARCHAR(255),
    @Name  VARCHAR(255) ,
    @Location VARCHAR(255),
    @StarRating int
)
AS
BEGIN
    UPDATE Hotels
    SET
        Name=@Name,
        Location =@Location,
        StarRating=@StarRating
    WHERE 	
        Id = @Id

END