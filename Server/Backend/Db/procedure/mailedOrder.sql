CREATE OR ALTER PROCEDURE orderMailed(@order_id VARCHAR(255))
AS
BEGIN
    UPDATE orders SET isOrderMailSent = 1 WHERE order_id = @order_id
END