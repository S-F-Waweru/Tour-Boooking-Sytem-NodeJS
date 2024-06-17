CREATE or ALTER Procedure changetoAdmin(@UserId VarCHar(255))
as
BEGIN
    UPDATE Roles 
    SET Role = 'admin'
    WHERE UserId = @UserId
END