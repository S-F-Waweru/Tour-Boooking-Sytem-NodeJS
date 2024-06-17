CREATE or alter PROCEDURE getUserBookings(@UserId VARCHAR(255))
AS
BEGIN
    SELECT * FROM Bookings WHERE UserId = @UserId
END