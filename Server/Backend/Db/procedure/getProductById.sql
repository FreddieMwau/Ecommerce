CREATE OR ALTER PROCEDURE getProductById(@product_id VARCHAR(255))
AS BEGIN
SELECT * FROM products WHERE product_id = @product_id
END