CREATE OR ALTER PROCEDURE getOrderById(@order_id VARCHAR(255))
AS BEGIN
SELECT * FROM orders WHERE order_id = @order_id
END