USE gallery_db;

CREATE TABLE config (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50),
	description VARCHAR(120),
	value VARCHAR(20),
	type VARCHAR(10),
	options JSON,
	INDEX category_index(id)
);

insert into config (name, description, value, type, options) values ('TITLE_APP','Title App Page', 'App Art Gallery', 'text', null);
insert into config (name, description, value, type, options) values ('PROFILE_PHOTO','Include admin profile photo', '1', 'checkbox', null);
insert into config (name, description, value, type, options) values ('EMAIL_BACk','Send user msg email back', '0', 'checkbox', null);
insert into config (name, description, value, type, options) values ('SHOW_BANNER','Show banner', '1', 'checkbox', null);
insert into config (name, description, value, type, options) values ('SHOW_TAGS','Show tags', '0', 'checkbox', null);
insert into config (name, description, value, type, options) values ('NOUSER_COUNT','Count no-user views', '1', 'checkbox', null);
insert into config (name, description, value, type, options) values ('SHOW_THUMS','Show thumbs by', 'RELEASE_DATE', 'select', '{"YEAR": "Year", "RELEASE_DATE": "Release Date", "MOST_VIEW":"Most view"}');
insert into config (name, description, value, type, options) values ('SOCIAL_COUNT','Count Social visited', 'all', 'radio', '["facebook","instagram","tweeter", "all"]');
insert into config (name, description, value, type, options) values ('SEARCH_DATE','Search on Date', '0', 'checkbox', null);
insert into config (name, description, value, type, options) values ('SHOW_USERNAME','Show username at header', '1', 'checkbox', null);
insert into config (name, description, value, type, options) values ('SHOW_YEAR_PIECE','Show year at piece info', '1', 'checkbox', null);
