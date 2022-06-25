CREATE OR ALTER PROCEDURE userMailed(@customer_id VARCHAR(255))
AS
BEGIN
    UPDATE customers SET isEmailSent = 1 WHERE customer_id = @customer_id
END