CREATE OR ALTER PROCEDURE getUsersUnEmailed
AS BEGIN
SELECT * FROM customers WHERE isEmailSent = 0
END