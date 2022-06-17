CREATE OR ALTER PROCEDURE addProduct(@product_id VARCHAR(255), @product_name VARCHAR(255), @product_image_url VARCHAR(255), @product_description VARCHAR(255), @product_price INT, @product_in_stock INT, @product_category VARCHAR(255))
AS BEGIN
INSERT INTO products(product_id, product_name, product_image_url, product_description, product_price, product_in_stock, product_category)
VALUES(@product_id, @product_name, @product_image_url, @product_description, @product_price, @product_in_stock, @product_category)
END