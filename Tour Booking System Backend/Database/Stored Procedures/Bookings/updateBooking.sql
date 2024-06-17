CREATE or alter PROCEDURE updateBooking(
    @Id VARCHAR(255),
    @UserId  VARCHAR(255) ,
    @TourId VARCHAR(255),
    @HotelId VARCHAR(255),
    @BookingDate DATE
)
AS
BEGIN
    UPDATE Bookings
    SET 
        UserId   =@UserId,
        TourId  =@TourId,
        HotelId =@HotelId,
        BookingDate  =@BookingDate
    WHERE
    Id = @Id
END
