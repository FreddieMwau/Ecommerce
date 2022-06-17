CREATE OR ALTER PROCEDURE addOrder(@order_id VARCHAR(255), @product_id VARCHAR(255), @customer_id VARCHAR(255), @quantity_ordered INT, @total_price INT)
AS BEGIN 
INSERT INTO orders(order_id, product_id, customer_id, quantity_ordered, total_price)
VALUES (@order_id, @product_id, @customer_id, @quantity_ordered, @total_price)
END