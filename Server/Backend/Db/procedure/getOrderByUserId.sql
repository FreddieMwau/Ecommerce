CREATE OR ALTER PROCEDURE getOrderByUserId(@customer_id VARCHAR(255))
AS BEGIN
SELECT * FROM orders WHERE customer_id = @customer_id
END