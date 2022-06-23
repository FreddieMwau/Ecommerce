CREATE OR ALTER PROCEDURE deleteOrder(@order_id VARCHAR(255))
AS
BEGIN
    UPDATE orders SET isDeleted = 1 WHERE order_id=@order_id
END