CREATE OR ALTER PROCEDURE deleteProduct(@product_id VARCHAR(255))
AS
BEGIN
    UPDATE products SET isDeleted=1 where product_id = @product_id
END