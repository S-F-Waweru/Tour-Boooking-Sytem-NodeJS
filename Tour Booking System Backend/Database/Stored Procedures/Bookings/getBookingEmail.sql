create or ALTER PROCEDURE  getBookingEmail 
AS
BEGIN
    SELECT * from Bookings WHERE isEmailSent = 0
END