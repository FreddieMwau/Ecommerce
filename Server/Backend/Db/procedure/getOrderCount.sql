CREATE OR ALTER PROCEDURE getOrderCount
AS BEGIN
SELECT COUNT(*)
FROM orders
END
