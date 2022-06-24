CREATE OR ALTER PROCEDURE getUnemailedUsers
AS BEGIN
SELECT customer_id,full_name, email, isEmailSent
FROM customers
WHERE isEmailSent = 0
END