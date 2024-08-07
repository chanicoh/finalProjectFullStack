

-- הכנסת משתמשים ראשוניים
INSERT INTO Users (username, password, role, firstName, lastName, email, phone) VALUES
('guest1', 'password1', 'guest', 'John', 'Doe', 'john@example.com', '1234567890'),
('staff1', 'password2', 'staff', 'Jane', 'Smith', 'jane@example.com', '0987654321'),
('manager1', 'password3', 'manager', 'Alice', 'Johnson', 'alice@example.com', '1122334455');

-- הכנסת חדרים ראשוניים
INSERT INTO Rooms (roomNumber, type, status, price) VALUES
('101', 'Single', 'available', 100.00),
('102', 'Double', 'occupied', 150.00),
('103', 'Suite', 'cleaning', 300.00);

-- הכנסת הזמנות ראשוניות
INSERT INTO Bookings (userId, roomId, checkInDate, checkOutDate, status) VALUES
(1, 1, '2024-08-01', '2024-08-05', 'confirmed');

-- הכנסת בקשות שירות ראשוניות
INSERT INTO ServiceRequests (userId, roomId, requestDate, description, status) VALUES
(1, 1, '2024-08-02 10:00:00', 'Need extra towels', 'pending');

-- הכנסת חשבונות ראשוניים
INSERT INTO Bills (userId, total, paid) VALUES
(1, 500.00, FALSE);