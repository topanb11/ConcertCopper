CREATE TABLE USERS (
	email varchar(255) NOT NULL PRIMARY KEY,
	pw varchar(255),
	firstName varchar(255),
	lastName varchar(255),
	adminFlag boolean
);

CREATE TABLE ARTISTS (
	Email varchar(255) NOT NULL PRIMARY KEY,
	firstName varchar(255),
	lastName varchar(255),
	stageName varchar(255),
	managerEmail varchar(255)
);

INSERT INTO USERS 
VALUES 
	('topan@gmail.com', 'admin', 'Topan', 'Budiman', true),
	('rahat@gmail.com', 'admin', 'Rahat', 'Chowdhury', false);

INSERT INTO ARTISTS 
VALUES 
	('theweeknd@gmail.com', 'week', 'end', 'the weeknd', 'rahat@gmail.com');