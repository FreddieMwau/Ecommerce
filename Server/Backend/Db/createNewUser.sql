CREATE OR ALTER PROCEDURE createUser(@customer_id VARCHAR(255), @full_name VARCHAR(255),
@email VARCHAR(255), @customer_password VARCHAR(255))
AS BEGIN
INSERT INTO customers(customer_id, full_name, customer_password, email)
VALUES(@customer_id, @full_name, @email, @customer_password)
END