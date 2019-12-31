USE gallery_db;

CREATE TABLE registration (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	external_userId VARCHAR(10),
	code VARCHAR(70),
	INDEX registration_index(id)
);

