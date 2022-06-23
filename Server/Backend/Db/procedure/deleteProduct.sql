CREATE OR ALTER PROCEDURE deleteProduct(@product_id VARCHAR(255))
AS
BEGIN
    DELETE FROM products WHERE product_id = @product_id
END