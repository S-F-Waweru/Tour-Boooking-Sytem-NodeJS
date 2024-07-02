CREATE or ALTER Procedure addUserRole(
    @Id VarCHar(255),
    @UserId VarCHar(255),
    @Role VARCHAR(255)
    )
as
BEGIN
    
    INSERT INTO Roles
    VALUES
    ( 
     @Id, @UserId, @Role
    )
END