CREATE TABLE products
(
    product_id VARCHAR(255) PRIMARY KEY,
    product_name VARCHAR (255) NOT NULL,
    product_image_url VARCHAR (255) NOT NULL,
    product_description VARCHAR(255) NOT NULL,
    product_price INT NOT NULL,
    isDeleted BIT DEFAULT 0,
    product_in_stock INT NOT NULL,
    product_category VARCHAR (255) NOT NULL,
);