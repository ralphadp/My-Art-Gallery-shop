USE gallery_db;

CREATE TABLE config (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50),
	description VARCHAR(120),
	value VARCHAR(20),
	type VARCHAR(10),
	options JSON,
	app enum('GALLERY','ADMIN') NOT NULL,
	INDEX category_index(id)
);

insert into config (name, description, value, type, options, app) values ('TITLE_APP','Title App Page', 'App Art Gallery', 'text', null, 'GALLERY');
insert into config (name, description, value, type, options, app) values ('PROFILE_PHOTO','Include admin profile photo', '1', 'checkbox', null, 'GALLERY');
insert into config (name, description, value, type, options, app) values ('EMAIL_BACK','Send user msg email back', '0', 'checkbox', null, 'GALLERY');
insert into config (name, description, value, type, options, app) values ('SHOW_BANNER','Show banner', '1', 'checkbox', null, 'GALLERY');
insert into config (name, description, value, type, options, app) values ('SHOW_TAGS','Show tags', '0', 'checkbox', null, 'GALLERY');
insert into config (name, description, value, type, options, app) values ('NOUSER_COUNT','Count no-user views', '1', 'checkbox', null, 'GALLERY');
insert into config (name, description, value, type, options, app) values ('SHOW_THUMS','Show thumbs by', 'RELEASE_DATE', 'select', '{"YEAR": "Year", "RELEASE_DATE": "Release Date", "MOST_VIEW":"Most view"}', 'GALLERY');
insert into config (name, description, value, type, options, app) values ('SOCIAL_COUNT','Count Social visited', 'all', 'radio', '["facebook","instagram","tweeter", "all"]', 'GALLERY');
insert into config (name, description, value, type, options, app) values ('SEARCH_DATE','Search on Date', '0', 'checkbox', null, 'GALLERY');
insert into config (name, description, value, type, options, app) values ('SHOW_USERNAME','Show username at header', '1', 'checkbox', null, 'GALLERY');
insert into config (name, description, value, type, options, app) values ('SHOW_YEAR_PIECE','Show year at piece info', '1', 'checkbox', null, 'GALLERY');
