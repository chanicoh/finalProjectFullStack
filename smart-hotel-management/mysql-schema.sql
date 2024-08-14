

CREATE TABLE hotel.users (
  user_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(45) NULL,
  password VARCHAR(45) NULL,
  role VARCHAR(45) NULL,
  first_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  address VARCHAR(45) NULL,
   phone VARCHAR(20) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE INDEX id_UNIQUE (user_id ASC) VISIBLE,
  UNIQUE INDEX username_UNIQUE (username ASC) VISIBLE);
