
CREATE or alter PROCEDURE addTour(
    @Id VARCHAR(255),
    @Name  VARCHAR(255) ,
    @Destination VARCHAR(255),
    @Description VARCHAR(255),
    @Price int
)
AS
BEGIN
    INSERT INTO Tours
    VALUES(
            @Id,
            @Name,
            @Destination,
            @Description,
            @Price
    )

END
