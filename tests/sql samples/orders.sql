USE gallery_db;

CREATE TABLE orders (
	id INT NOT NULL AUTO_INCREMENT,
	orderId VARCHAR(10) NOT NULL,
	pieceId VARCHAR(50),
	userExternalId VARCHAR(12),
	buyDatetime timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id, orderId),
	INDEX category_index(id, orderId)
);














