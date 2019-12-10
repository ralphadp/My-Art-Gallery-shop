use gallery;
create table cart (
	id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	userId VARCHAR(50),
	pieceId VARCHAR(40),
	INDEX (id)
);

insert into cart (id, userId, pieceId) values (1, '03-028-2484', '26b22d6c-d112-410a-8192-7cd6d7f3e90b');
insert into cart (id, userId, pieceId) values (2, '03-028-2484', '12ceb724-cca4-4ef5-8395-bf78ec64a4bb');
insert into cart (id, userId, pieceId) values (3, '03-028-2484', '6df14d69-c39e-49a3-a01e-fa7bbd4771c5');
insert into cart (id, userId, pieceId) values (4, '03-028-2484', 'e934b117-bb36-4e51-829e-4e4ee93d6987');
insert into cart (id, userId, pieceId) values (5, '03-028-2484', '1ddff1bf-26ac-4968-ba53-34477938fb5a');
insert into cart (id, userId, pieceId) values (6, '03-028-2484', 'bf630f11-b930-47f3-b661-15aa640b7431');
insert into cart (id, userId, pieceId) values (7, '03-028-2484', '29664d75-1c85-4845-94e6-b02ba17194bd');
insert into cart (id, userId, pieceId) values (8, '03-028-2484', '3d73f473-f41f-4af0-af09-ade890906d8b');
