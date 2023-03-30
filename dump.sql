CREATE TABLE users (
	email varchar(255),
	pw varchar(255),
	first_name varchar(255),
	last_name varchar(255),
	admin_flag boolean,
	PRIMARY KEY(email)
);

CREATE TABLE artist_managers (
	email varchar(255),
	first_name varchar(255),
	last_name varchar(255),
	record_label varchar(255),
	PRIMARY KEY(email)
);

CREATE TABLE artists (
	email varchar(255),
	first_name varchar(255),
	last_name varchar(255),
	stage_name varchar(255),
	manager_email varchar(255),
	artist_img varchar(255),
	PRIMARY KEY(email),
	FOREIGN KEY(manager_email) REFERENCES artist_managers(email)
);

CREATE TABLE venue (
	venue_id SERIAL,
	venue_name varchar(255),
	venue_location varchar(255),
	venue_img varchar(255),
	PRIMARY KEY(venue_id)
);

CREATE TABLE showtime (
	showtime_id SERIAL,
	venue_id INT,
	datestamp TIMESTAMP,
	artist_email varchar(255),
	PRIMARY KEY(showtime_id),
	FOREIGN KEY (venue_id) REFERENCES venue(venue_id)
);

CREATE TABLE orders (
	order_id SERIAL,
	total INT,
	client_email varchar(255),
	showtime_id INT,
	PRIMARY KEY (order_id),
	FOREIGN KEY (showtime_id) REFERENCES showtime(showtime_id)
);

CREATE TABLE seat (
	seat_id SERIAL,
	seat_name varchar(2),
	price INT,
	order_id INT,
	showtime_id INT,
	PRIMARY KEY (seat_id),
	FOREIGN KEY (order_id) REFERENCES orders(order_id),
	FOREIGN KEY (showtime_id) REFERENCES showtime(showtime_id)
);

CREATE TABLE review (
	comment varchar(2000),
	datestamp TIMESTAMP,
	rating INT,
	venue_id INT,
	client_email varchar(255),
	FOREIGN KEY (venue_id) REFERENCES venue(venue_id),
	FOREIGN KEY (client_email) REFERENCES users(email)
);

INSERT INTO users (email, pw, first_name, last_name, admin_flag)
VALUES 
	('topan@gmail.com', 'test', 'Topan', 'Budiman', true),
	('gabe@gmail.com', 'test', 'Gabe', 'Ngu', false),
	('rahat@gmail.com', 'test', 'Rahat', 'Chowdhury', false),
	('rayhan@gmail.com', 'test', 'Rayhan', 'Khalid', false),
	('jt@gmail.com', 'test', 'Joshua', 'Toletino', false);

INSERT INTO artist_managers (email, first_name, last_name, record_label)
VALUES
	('bnguyen@gmail.com', 'Brian', 'Nguyen', 'vietnam records');

INSERT into artists (email, first_name, last_name, stage_name, manager_email, artist_img)
VALUES 
	('drake@gmail.com', 'Aubrey', 'Graham', 'Drake', 'bnguyen@gmail.com', 'https://m.media-amazon.com/images/M/MV5BMjIwNDE2ODI5OF5BMl5BanBnXkFtZTcwMDkzMjU3NQ@@._V1_FMjpg_UX1000_.jpg'),
	('beyonce@gmail.com', 'Bey', 'Once', 'Beyonce', 'bnguyen@gmail.com', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Beyoncé_at_The_Lion_King_European_Premiere_2019.png/640px-Beyoncé_at_The_Lion_King_European_Premiere_2019.png'),
	('gingy@gmail.com', 'Ice', 'Spice', 'Ice Spice', 'bnguyen@gmail.com', 'https://pyxis.nymag.com/v1/imgs/339/66b/97b57ca1b6454d02f6a2fb37fb8ed69ced-Q347-RME-TheCutxIceSpice-002-05-FNL.1x.rsquare.w1400.jpg'),
	('weeknd@gmail.com', 'Week', 'end', 'Weeknd', 'bnguyen@gmail.com', 'https://i.scdn.co/image/ab6761610000e5ebb5f9e28219c169fd4b9e8379'),
	('kpop@gmail.com', 'one', 'two', 'TWICE', 'bnguyen@gmail.com', 'https://s1.ticketm.net/dam/a/3a4/7c0b198a-5fc2-49ce-9e75-455518e613a4_TABLET_LANDSCAPE_LARGE_16_9.jpg'),
	('indoman@gmail.com', 'Brian', 'Imanuel', 'Rich Brian', 'bnguyen@gmail.com', 'https://yt3.googleusercontent.com/5GTdgOUts50y6z1b9gJ2OmYrHZFO7uLIoMmA_HblQyI4X1XA_nWU0apFLwVp8KYURQNx6HbFJA=s900-c-k-c0x00ffffff-no-rj'),
	('warren@gmail.com', 'Warren', 'Hue', 'Warren Hue', 'bnguyen@gmail.com', 'https://i.scdn.co/image/ab6761610000e5eb4ce83e0bb702c7fec348f146'),
	('justwannarock@gmail.com', 'Uzi', 'Vert', 'Lil Uzi Vert', 'bnguyen@gmail.com', 'https://i.scdn.co/image/ab6761610000e5eb30122c0d3ead72f96bb5ee93'),
	('kaliii@gmail.com', 'Kali', 'Uchis', 'Kali Uchis', 'bnguyen@gmail.com', 'https://www.rollingstone.com/wp-content/uploads/2023/01/kali-uchis-new-album.jpg'),
	('tylercallme@gmail.com', 'Tyler', 'Boudelaire', 'Tyler The Creator', 'bnguyen@gmail.com', 'https://i.scdn.co/image/ab6761610000e5eb8278b782cbb5a3963db88ada'),
	('nikiz@gmail.com', 'Niki', 'Zefanya', 'Niki', 'bnguyen@gmail.com', 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Niki_in_2022.png');

INSERT INTO venue (venue_id, venue_name, venue_location, venue_img)
VALUES
	(0, 'ScotiaBank Saddledome', 'Calgary, AB', 'https://upload.wikimedia.org/wikipedia/commons/0/0b/2020_Calgary_Saddledome.jpg'),
	(1, 'Rogers Arena', 'Vancouver, BC', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw50meWdOBxdav7dY-DPQ5jDvtBleyksk64xXCTEKY1XXEThQzpHmaf7qZ1eNrynM7CZk&usqp=CAU'),
	(2, 'Machall', 'Calgary, AB', 'https://www.avenuecalgary.com/wp-content/uploads/2018/12/Detours-BellaConcertHall.jpg'),
	(3, 'UBC Thunderdome', 'Calgary, AB', 'https://sportfacilities.ubc.ca/wp-content/uploads/2019/07/dmc-1-1170x487.jpg'),
	(4, 'ScotiaBank Arena', 'Toronto, ON', 'https://upload.wikimedia.org/wikipedia/commons/5/57/Scotiabank_Arena_-_2018_%28cropped%29.jpg'),
	(5, 'McMahon Stadium', 'Calgary, AB', 'https://upload.wikimedia.org/wikipedia/commons/a/a5/McMahon_Stadium_6.jpg');
	
INSERT INTO showtime (showtime_id, venue_id, datestamp, artist_email)
VALUES
	(0, 0, to_timestamp(1693516800), 'drake@gmail.com'),
	(1, 0, to_timestamp(1693534800), 'beyonce@gmail.com'),
	(2, 0, to_timestamp(1693603200),'kpop@gmail.com' ),
	(3, 0, to_timestamp(1693621200), 'nikiz@gmail.com'),
	(4, 0, to_timestamp(1693956800), 'indoman@gmail.com'),
	(5, 1, to_timestamp(1693974800), 'drake@gmail.com'),
	(6, 1, to_timestamp(1694174400), 'beyonce@gmail.com'),
	(7, 1, to_timestamp(1694192400), 'kpop@gmail.com'),
	(8, 1, to_timestamp(1694755200), 'indoman@gmail.com'),
	(9, 1, to_timestamp(1694773200),'nikiz@gmail.com' ),
	(10, 2, to_timestamp(1694859600), 'drake@gmail.com'),
	(11, 2, to_timestamp(1694877600), 'beyonce@gmail.com'),
	(12, 2, to_timestamp(1695384000), 'kpop@gmail.com'),
	(13, 3, to_timestamp(1695402000), 'nikiz@gmail.com'),
	(14, 3, to_timestamp(1702819200), 'beyonce@gmail.com'),
	(15, 3, to_timestamp(1702446400), 'indoman@gmail.com'),
	(16, 4, to_timestamp(1702464400), 'justwannarock@gmail.com'),
	(17, 4, to_timestamp(1702540800), 'kaliii@gmail.com'),
	(18, 4, to_timestamp(1702558800), 'weeknd@gmail.com'),
	(19, 4, to_timestamp(1703166400), 'tylercallme@gmail.com'),
	(20, 4, to_timestamp(1703184400),'nikiz@gmail.com' ),
	(21, 4, to_timestamp(1703260800), 'kpop@gmail.com'),
	(22, 4, to_timestamp(1703278800), 'beyonce@gmail.com'),
	(23, 4, to_timestamp(1703894400), 'indoman@gmail.com'),
	(24, 5, to_timestamp(1703912400), 'drake@gmail.com');

INSERT INTO seat (seat_id, seat_name, price, order_id, showtime_id)
VALUES 
	(0, '1A', 400, null, 0),
	(1, '1B', 400, null, 0),
	(2, '1C', 400, null, 0),
	(3, '1D', 400, null, 0),
	(4, '1E', 400, null, 0),
	(5, '2A', 200, null, 0),
	(6, '2B', 200, null, 0),
	(7, '2C', 200, null, 0),
	(8, '2D', 200, null, 0),
	(9, '2E', 200, null, 0),
	(10, '3A', 150, null, 0),
	(11, '3B', 150, null, 0),
	(12, '3C', 150, null, 0),
	(13, '3D', 150, null, 0),
	(14, '3E', 150, null, 0),
	(15, '1A', 400, null, 1),
	(16, '1B', 400, null, 1),
	(17, '1C', 400, null, 1),
	(18, '1D', 400, null, 1),
	(19, '1E', 400, null, 1),
	(20, '2A', 200, null, 1),
	(21, '2B', 200, null, 1),
	(22, '2C', 200, null, 1),
	(23, '2D', 200, null, 1),
	(24, '2E', 200, null, 1),
	(25, '3A', 150, null, 1),
	(26, '3B', 150, null, 1),
	(27, '3C', 150, null, 1),
	(28, '3D', 150, null, 1),
	(29, '3E', 150, null, 1),
	(30, '1A', 400, null, 2),
	(31, '1B', 400, null, 2),
	(32, '1C', 400, null, 2),
	(33, '1D', 400, null, 2),
	(34, '1E', 400, null, 2),
	(35, '2A', 200, null, 2),
	(36, '2B', 200, null, 2),
	(37, '2C', 200, null, 2),
	(38, '2D', 200, null, 2),
	(39, '2E', 200, null, 2),
	(40, '3A', 150, null, 2),
	(41, '3B', 150, null, 2),
	(42, '3C', 150, null, 2),
	(43, '3D', 150, null, 2),
	(44, '3E', 150, null, 2),
	(45, '1A', 400, null, 3),
	(46, '1B', 400, null, 3),
	(47, '1C', 400, null, 3),
	(48, '1D', 400, null, 3),
	(49, '1E', 400, null, 3),
	(50, '2A', 200, null, 3),
	(51, '2B', 200, null, 3),
	(52, '2C', 200, null, 3),
	(53, '2D', 200, null, 3),
	(54, '2E', 200, null, 3),
	(55, '3A', 150, null, 3),
	(56, '3B', 150, null, 3),
	(57, '3C', 150, null, 3),
	(58, '3D', 150, null, 3),
	(59, '3E', 150, null, 3),
	(60, '1A', 400, null, 4),
	(61, '1B', 400, null, 4),
	(62, '1C', 400, null, 4),
	(63, '1D', 400, null, 4),
	(64, '1E', 400, null, 4),
	(65, '2A', 200, null, 4),
	(66, '2B', 200, null, 4),
	(67, '2C', 200, null, 4),
	(68, '2D', 200, null, 4),
	(69, '2E', 200, null, 4),
	(70, '3A', 150, null, 4),
	(71, '3B', 150, null, 4),
	(72, '3C', 150, null, 4),
	(73, '3D', 150, null, 4),
	(74, '3E', 150, null, 4),
	(75, '1A', 400, null, 5),
	(76, '1B', 400, null, 5),
	(77, '1C', 400, null, 5),
	(78, '1D', 400, null, 5),
	(79, '1E', 400, null, 5);


INSERT INTO review (comment, datestamp, rating, venue_id, client_email)
VALUES 
	('this place rocks!', to_timestamp(1652259000), 5, 4, 'topan@gmail.com'),
	('I LOVE THE WEEKNKD', to_timestamp(1656821100), 5, 4, 'rahat@gmail.com'),
	('I mean it`s aight', to_timestamp(1663621200), 3, 4, 'gabe@gmail.com'),
	('this was so messy and the bathroom was so far', to_timestamp(1667273400), 1, 5, 'rayhan@gmail.com'),
	('WHY DOES IT SMELL', to_timestamp(1671747300), 0, 3, 'topan@gmail.com'),
	('zzZZzz', to_timestamp(1673881200), 2, 1, 'jt@gmail.com');