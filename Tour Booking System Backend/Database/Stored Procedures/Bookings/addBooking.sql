
CREATE or alter PROCEDURE addBooking(
    @Id VARCHAR(255),
    @UserId  VARCHAR(255) ,
    @TourId VARCHAR(255),
    @HotelId VARCHAR(255),
    @BookingDate DATE
)
AS
BEGIN
    INSERT INTO Bookings
        (Id, UserId, TourId, HotelId, BookingDate)
    VALUES(
            @Id,
            @UserId,
            @TourId,
            @HotelId,
            @BookingDate
    )

END
