CREATE OR ALTER PROCEDURE deleteOrder(@order_id VARCHAR(255))
AS BEGIN
DELETE FROM orders WHERE order_id = @order_id
END