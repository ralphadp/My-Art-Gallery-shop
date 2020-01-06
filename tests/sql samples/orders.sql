USE gallery_db;

CREATE TABLE orders (
	id INT NOT NULL AUTO_INCREMENT,
	orderId varchar(25) NOT NULL,
	pieceId varchar(50) DEFAULT NULL,
	pieceDescription varchar(150) DEFAULT NULL,
	userExternalId varchar(12) DEFAULT NULL,
	buyDatetime timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	paypalBuyTimestamp varchar(50) DEFAULT NULL,
	payerId varchar(20) DEFAULT NULL,
	payerCompleteName varchar(60) DEFAULT NULL,
	rawDetails text,
	payerAmount decimal(5,1) DEFAULT NULL,
	payerCurrency varchar(6) DEFAULT NULL,
	PRIMARY KEY (id, orderId),
	INDEX category_index(id, orderId)
);














