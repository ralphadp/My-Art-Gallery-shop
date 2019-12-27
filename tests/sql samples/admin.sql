USE gallery_db;

CREATE TABLE admin (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(50),
    last_name VARCHAR(50),
	username VARCHAR(40),
    password VARCHAR(40),
    photo varchar(36),
    registration_date date,
    email VARCHAR(50),
    email2 VARCHAR(50),
    movile VARCHAR(20),
    movile2 VARCHAR(20),
    birth date,
    gender INT,
    country VARCHAR(50),
    city VARCHAR(50),
    postal_code VARCHAR(14),
	INDEX cart_index(id)
);

insert into admin (first_name, last_name, username, password, photo, registration_date, email, email2, movile, movile2, birth, gender, country, city, postal_code) values ('Conn', 'O''Caherny', 'cocaherny0', 'pqvHNOJRIFsu', '', '2019-11-11', 'cocaherny0@webeden.co.uk', 'cocaherny0@nydailynews.com', '902-413-8628', '230-715-2563', '2004-02-09', 1, 'France', 'Perpignan', '66019 CEDEX 9');
insert into admin (first_name, last_name, username, password, photo, registration_date, email, email2, movile, movile2, birth, gender, country, city, postal_code) values ('Liam', 'Benedite', 'lbenedite1', 'bo3lD4F', '', '2018-02-12', 'lbenedite1@sciencedirect.com', 'lbenedite1@multiply.com', '452-523-3476', '204-161-7133', '1971-10-29', 1, 'Indonesia', 'Margabakti', null);
insert into admin (first_name, last_name, username, password, photo, registration_date, email, email2, movile, movile2, birth, gender, country, city, postal_code) values ('Deerdre', 'Henden', 'dhenden2', 'x77dsENWo', '', '2019-02-15', 'dhenden2@columbia.edu', 'dhenden2@webmd.com', '599-997-7215', '820-213-0216', '1977-12-09', 0, 'Sudan', 'El Bauga', null);
insert into admin (first_name, last_name, username, password, photo, registration_date, email, email2, movile, movile2, birth, gender, country, city, postal_code) values ('Bryce', 'Borzone', 'bborzone3', 'yceT6AaY2PB', '', '2018-05-07', 'bborzone3@gov.uk', 'bborzone3@cmu.edu', '937-131-5781', '175-670-3724', '2002-08-03', 1, 'China', 'Jixin', null);
insert into admin (first_name, last_name, username, password, photo, registration_date, email, email2, movile, movile2, birth, gender, country, city, postal_code) values ('Emogene', 'Killigrew', 'ekilligrew4', 'CBXcDd', '', '2019-04-06', 'ekilligrew4@sakura.ne.jp', 'ekilligrew4@ocn.ne.jp', '290-851-8927', '125-400-9423', '1954-05-01', 1, 'Morocco', 'Taounza', null);
insert into admin (first_name, last_name, username, password, photo, registration_date, email, email2, movile, movile2, birth, gender, country, city, postal_code) values ('Sydney', 'Marns', 'smarns5', 'la4sfcNEHY', '', '2018-10-09', 'smarns5@cisco.com', 'smarns5@cam.ac.uk', '951-293-2844', '911-392-8163', '1955-09-15', 0, 'Russia', 'Zlatoust', '456209');