CREATE OR ALTER PROCEDURE getUserByUserName(@email VARCHAR(255))
AS BEGIN
SELECT customer_id, full_name, email, customer_password, isAdmin FROM customers 
WHERE email=@email
END