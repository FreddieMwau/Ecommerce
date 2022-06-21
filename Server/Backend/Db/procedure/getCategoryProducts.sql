CREATE OR ALTER PROCEDURE getCategoryProducts(@product_category VARCHAR(255))
AS
BEGIN
    SELECT *
    FROM products
    WHERE product_category = @product_category
END