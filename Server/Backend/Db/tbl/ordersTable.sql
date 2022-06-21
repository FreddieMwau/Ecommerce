CREATE TABLE orders
(
    order_id VARCHAR(255) NOT NULL PRIMARY KEY,
    product_id VARCHAR (255) NOT NULL,
    customer_id VARCHAR (255) NOT NULL,
    quantity_ordered INT NOT NULL,
    total_price INT NOT NULL,
    isDeleted BIT DEFAULT 0,
    isOrderMailSent BIT DEFAULT 0,
    FOREIGN KEY(product_id)
    REFERENCES products(product_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(customer_id)
    REFERENCES customers(customer_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
);

