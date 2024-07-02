CREATE or alter PROCEDURE deleteBooking(@Id VARCHAR(255))
AS
BEGIN
    DELETE FROM Bookings WHERE Id = @Id
END