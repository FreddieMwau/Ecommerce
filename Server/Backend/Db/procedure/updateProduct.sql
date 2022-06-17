CREATE OR ALTER PROCEDURE updateProduct(@product_id VARCHAR(255), @product_name VARCHAR(255), @product_image_url VARCHAR(255), @product_description VARCHAR(255), @product_price INT, @product_in_stock INT, @product_category VARCHAR(255))
AS BEGIN
UPDATE products SET product_name = @product_name, product_image_url = @product_image_url, product_description = @product_description, product_price = @product_price, product_in_stock = @product_in_stock, product_category = @product_category WHERE product_id = @product_id
END