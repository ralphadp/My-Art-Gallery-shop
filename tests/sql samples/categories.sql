USE gallery_db;

CREATE TABLE categories (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	path VARCHAR(50),
	name VARCHAR(50),
	INDEX category_index(id)
);

insert into categories (path, name) values ('realism', 'Realism');
insert into categories (path, name) values ('hyperrealism', 'Hyperrealism');
insert into categories (path, name) values ('surrealism', 'Surrealism');
insert into categories (path, name) values ('impressionism', 'Impressionism');
insert into categories (path, name) values ('expressionism', 'Expressionism');
insert into categories (path, name) values ('abstract-art', 'Abstract art');
insert into categories (path, name) values ('pop-art', 'Pop Art');
insert into categories (path, name) values ('cubism', 'Cubism');
insert into categories (path, name) values ('portrait', 'Portrait');
insert into categories (path, name) values ('gender-painting', 'Gender painting');
insert into categories (path, name) values ('landscape', 'Landscape');
insert into categories (path, name) values ('still-life', 'Still life');
insert into categories (path, name) values ('naked', 'Naked');
insert into categories (path, name) values ('historical-pPainting', 'Historical Painting');
insert into categories (path, name) values ('oil', 'Oil');
insert into categories (path, name) values ('wax', 'Wax');
insert into categories (path, name) values ('watercolor', 'Watercolor');
insert into categories (path, name) values ('tempera', 'Tempera');
insert into categories (path, name) values ('acrylic', 'Acrylic');
insert into categories (path, name) values ('pie', 'Pie');
insert into categories (path, name) values ('quenching', 'Quenching');
insert into categories (path, name) values ('ink', 'Ink');
insert into categories (path, name) values ('cool', 'Cool');
insert into categories (path, name) values ('grisalea', 'Grisalea');
insert into categories (path, name) values ('pointillism', 'Pointillism');
insert into categories (path, name) values ('dripping', 'Dripping');
insert into categories (path, name) values ('graffiti', 'Graffiti');
insert into categories (path, name) values ('mixed-media', 'Mixed media');
insert into categories (path, name) values ('on-wooden-board', 'On wooden board');
insert into categories (path, name) values ('on-canvas', 'On canvas');
insert into categories (path, name) values ('in-copper', 'In copper');
insert into categories (path, name) values ('in-glass', 'In glass');
insert into categories (path, name) values ('on-paper', 'On paper');
insert into categories (path, name) values ('sculpture', 'Sculpture');
insert into categories (path, name) values ('abstract-sculpture', 'Abstract sculpture');
insert into categories (path, name) values ('relief', 'Relief');
insert into categories (path, name) values ('color-relief', 'Color relief');
insert into categories (path, name) values ('glass-relief', 'Glass relief');
insert into categories (path, name) values ('contemporary', 'Contemporary');
insert into categories (path, name) values ('round-bulk-statue', 'Round Bulk Statue');
insert into categories (path, name) values ('low-relief', 'Low relief');
insert into categories (path, name) values ('bust', 'Bust');
insert into categories (path, name) values ('torso', 'Torso');
insert into categories (path, name) values ('kinetic-sculpture', 'Kinetic sculpture');
insert into categories (path, name) values ('chryselephantine', 'Chryselephantine');
insert into categories (path, name) values ('architectural-sculpture', 'Architectural sculpture');
insert into categories (path, name) values ('clay-sculpture', 'Clay sculpture');
insert into categories (path, name) values ('stone-sculpture', 'Stone sculpture');
insert into categories (path, name) values ('stucco-sculpture', 'Stucco sculpture');
insert into categories (path, name) values ('metal-sculpture', 'Metal sculpture');
insert into categories (path, name) values ('wood-sculpture', 'Wood sculpture');
insert into categories (path, name) values ('ivory-sculpture', 'Ivory Sculpture');
insert into categories (path, name) values ('concrete-sculpture', 'Concrete sculpture');
insert into categories (path, name) values ('emptying', 'Emptying');
insert into categories (path, name) values ('removing', 'Removing');
insert into categories (path, name) values ('adding', 'Adding');















