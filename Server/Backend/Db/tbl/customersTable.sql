CREATE TABLE customers
(
    customer_id VARCHAR(255) PRIMARY KEY,
    full_name VARCHAR (255) NOT NULL,
    customer_password VARCHAR (255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone INT,
    county_code INT,
    address VARCHAR (255),
    isAdmin BIT DEFAULT 0,
    city VARCHAR (50),
    county VARCHAR(50),
    isActive BIT DEFAULT 1,
    card_name VARCHAR(255),
    card_number INT,
    card_exp_month VARCHAR(50),
    card_exp_year INT,
    cvv INT,
    isEmailSent BIT DEFAULT 0
);