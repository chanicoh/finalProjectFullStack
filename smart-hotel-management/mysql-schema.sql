CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('guest', 'staff', 'admin') NOT NULL
);

CREATE TABLE rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  number VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  status ENUM('available', 'occupied', 'cleaning') NOT NULL
);

CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  room_id INT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);
