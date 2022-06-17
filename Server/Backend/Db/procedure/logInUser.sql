CREATE OR ALTER PROCEDURE logInUser(@email VARCHAR(255), @customer_password VARCHAR(255))
AS BEGIN
SELECT full_name, email, customer_password FROM customers
WHERE email=@email AND customer_password=@customer_password
END