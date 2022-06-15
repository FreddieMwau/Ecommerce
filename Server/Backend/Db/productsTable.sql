CREATE TABLE products
(
    product_id VARCHAR(255) PRIMARY KEY,
    product_name VARCHAR (255) NOT NULL,
    product_image_url VARCHAR (255) NOT NULL,
    product_description VARCHAR(255) NOT NULL,
    product_price INT,
    product_in_stock INT,
    product_category VARCHAR (255),
);