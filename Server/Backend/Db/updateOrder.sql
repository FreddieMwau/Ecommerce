CREATE OR ALTER PROCEDURE  updateOrder(@order_id VARCHAR(255), @product_id VARCHAR(255), @customer_id VARCHAR(255), @quantity_ordered INT, @total_price INT)
AS BEGIN
UPDATE orders SET product_id = @product_id, customer_id = @customer_id, quantity_ordered = @quantity_ordered, total_price = @total_price WHERE order_id = @order_id
END