CREATE OR ALTER PROCEDURE getOrderByUserId(@customer_id VARCHAR(255))
AS BEGIN
SELECT * FROM orders WHERE customer_id = @customer_id
ORDER BY customer_id
OFFSET 3 ROWS
FETCH NEXT 3 ROWS ONLY
END