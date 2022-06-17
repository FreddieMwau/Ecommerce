CREATE OR ALTER PROCEDURE unEmailedOrders(@isOrderMailSent BIT)
AS BEGIN
SELECT * FROM orders WHERE isOrderMailSent = 0
END