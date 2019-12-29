CREATE TABLE `gallery_db`.`util` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `key` VARCHAR(45) NULL,
  `value` VARCHAR(50) NULL,
  `context` VARCHAR(50) NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO util (key, value, context) VALUES ('READED_MESSAGES_COUNTER', '0', 'counter');

