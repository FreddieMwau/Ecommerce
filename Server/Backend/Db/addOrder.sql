CREATE OR ALTER PROCEDURE addOrder(@product_id VARCHAR(255), @customer_id VARCHAR(255), @quantity_ordered INT, @total_price INT)
AS BEGIN 
INSERT INTO orders(product_id, customer_id, quantity_ordered, total_price)
VALUES (@product_id, @customer_id, @quantity_ordered, @total_price)
END