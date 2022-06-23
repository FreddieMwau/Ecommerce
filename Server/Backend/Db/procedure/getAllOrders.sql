CREATE OR ALTER PROCEDURE getAllOrders
AS
BEGIN
    SELECT order_id, product_name, product_image_url, full_name, quantity_ordered, total_price
FROM orders a LEFT JOIN products b ON a.product_id= b.product_id LEFT JOIN customers c ON a.customer_id=c.customer_id
END