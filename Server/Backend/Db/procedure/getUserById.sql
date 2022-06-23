CREATE OR ALTER PROCEDURE getUserById(@customer_id VARCHAR(255))
AS
BEGIN
    SELECT customer_id, full_name, email
    FROM customers
    WHERE customer_id=@customer_id
END