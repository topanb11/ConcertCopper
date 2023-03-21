CREATE TABLE USERS (
	Email varchar(255) NOT NULL PRIMARY KEY,
	Password varchar(255),
	FirstName varchar(255),
	LastName varchar(255),
	AdminFlag boolean
);

INSERT INTO USERS 
VALUES 
	('topan@gmail.com', 'admin', 'Topan', 'Budiman', true),
	('rahat@gmail.com', 'admin', 'Rahat', 'Chowdhury', false);