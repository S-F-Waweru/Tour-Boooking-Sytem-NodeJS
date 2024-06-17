
CREATE or alter PROCEDURE addHotel(
    @Id VARCHAR(255),
    @Name  VARCHAR(255) ,
    @Location VARCHAR(255),
    @StarRating int
)
AS
BEGIN
    INSERT INTO Hotels
    VALUES(
            @Id ,
            @Name   ,
            @Location ,
            @StarRating 
    )
END
