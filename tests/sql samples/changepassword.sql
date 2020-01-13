CREATE TABLE changepassword (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(40) NULL,
  request_code VARCHAR(40) NULL,
  active INT NULL DEFAULT 1,
  PRIMARY KEY (id)
);
