CREATE or ALTER Procedure getUserRole(@UserId VarCHar(255))
as
BEGIN
    select * FROM Roles WHERE UserId = @UserId
END