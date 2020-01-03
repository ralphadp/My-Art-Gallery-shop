USE gallery_db;

CREATE TABLE cart (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	userId VARCHAR(50),
	pieceId VARCHAR(40),
	pickedAt datetime,
	active int(11) DEFAULT 1,
	INDEX cart_index(id)
);

insert into cart (id, userId, pieceId, pickedAt) values (1, '03-028-2484', '26b22d6c-d112-410a-8192-7cd6d7f3e90b','2017-01-08 03:14:07');
insert into cart (id, userId, pieceId, pickedAt) values (2, '03-028-2484', '12ceb724-cca4-4ef5-8395-bf78ec64a4bb','2018-01-17 05:24:05');
insert into cart (id, userId, pieceId, pickedAt) values (3, '03-028-2484', '6df14d69-c39e-49a3-a01e-fa7bbd4771c5','2019-01-16 03:14:05');
insert into cart (id, userId, pieceId, pickedAt) values (4, '03-028-2484', 'e934b117-bb36-4e51-829e-4e4ee93d6987','2018-03-11 03:13:05');
insert into cart (id, userId, pieceId, pickedAt) values (5, '03-028-2484', '1ddff1bf-26ac-4968-ba53-34477938fb5a','2018-01-08 03:14:05');
insert into cart (id, userId, pieceId, pickedAt) values (6, '03-028-2484', 'bf630f11-b930-47f3-b661-15aa640b7431','2018-01-19 03:34:05');
insert into cart (id, userId, pieceId, pickedAt) values (7, '03-028-2484', '29664d75-1c85-4845-94e6-b02ba17194bd','2018-01-22 03:14:09');
insert into cart (id, userId, pieceId, pickedAt) values (8, '03-028-2484', '3d73f473-f41f-4af0-af09-ade890906d8b','2018-05-13 03:14:05');
