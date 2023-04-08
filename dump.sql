CREATE TABLE users (
	email varchar(255),
	pw varchar(255),
	first_name varchar(255),
	last_name varchar(255),
	admin_flag boolean,
	PRIMARY KEY(email)
);

CREATE TABLE artist_manager (
	email varchar(255),
	first_name varchar(255),
	last_name varchar(255),
	record_label varchar(255),
	PRIMARY KEY(email)
);

CREATE TABLE artist (
	email varchar(255),
	first_name varchar(255),
	last_name varchar(255),
	stage_name varchar(255),
	manager_email varchar(255),
	artist_img varchar(255),
	PRIMARY KEY(email),
	FOREIGN KEY(manager_email) REFERENCES artist_manager(email)
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
	FOREIGN KEY (venue_id) REFERENCES venue(venue_id),
	FOREIGN KEY (artist_email) REFERENCES artist(email)
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

INSERT INTO artist_manager (email, first_name, last_name, record_label)
VALUES
	('bnguyen@gmail.com', 'Brian', 'Nguyen', 'vietnam records');

INSERT into artist (email, first_name, last_name, stage_name, manager_email, artist_img)
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

INSERT INTO venue (venue_name, venue_location, venue_img)
VALUES
	('ScotiaBank Saddledome', 'Calgary, AB', 'https://upload.wikimedia.org/wikipedia/commons/0/0b/2020_Calgary_Saddledome.jpg'),
	('Rogers Arena', 'Vancouver, BC', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw50meWdOBxdav7dY-DPQ5jDvtBleyksk64xXCTEKY1XXEThQzpHmaf7qZ1eNrynM7CZk&usqp=CAU'),
	('Machall', 'Calgary, AB', 'https://www.avenuecalgary.com/wp-content/uploads/2018/12/Detours-BellaConcertHall.jpg'),
	('UBC Thunderdome', 'Calgary, AB', 'https://sportfacilities.ubc.ca/wp-content/uploads/2019/07/dmc-1-1170x487.jpg'),
	('ScotiaBank Arena', 'Toronto, ON', 'https://upload.wikimedia.org/wikipedia/commons/5/57/Scotiabank_Arena_-_2018_%28cropped%29.jpg'),
	('McMahon Stadium', 'Calgary, AB', 'https://upload.wikimedia.org/wikipedia/commons/a/a5/McMahon_Stadium_6.jpg');
	
INSERT INTO showtime (venue_id, datestamp, artist_email)
VALUES
	(1, to_timestamp(1693516800), 'drake@gmail.com'),
	(1, to_timestamp(1693534800), 'beyonce@gmail.com'),
	(1, to_timestamp(1693603200),'kpop@gmail.com' ),
	(1, to_timestamp(1693621200), 'nikiz@gmail.com'),
	(1, to_timestamp(1693956800), 'indoman@gmail.com'),
	(2, to_timestamp(1693974800), 'drake@gmail.com'),
	(2, to_timestamp(1694174400), 'beyonce@gmail.com'),
	(2, to_timestamp(1694192400), 'kpop@gmail.com'),
	(2, to_timestamp(1694755200), 'indoman@gmail.com'),
	(3, to_timestamp(1694773200),'nikiz@gmail.com' ),
	(3, to_timestamp(1694859600), 'drake@gmail.com'),
	(3, to_timestamp(1694877600), 'beyonce@gmail.com'),
	(3, to_timestamp(1695384000), 'kpop@gmail.com'),
	(4, to_timestamp(1695402000), 'nikiz@gmail.com'),
	(4, to_timestamp(1702819200), 'beyonce@gmail.com'),
	(4, to_timestamp(1702446400), 'indoman@gmail.com'),
	(5, to_timestamp(1702464400), 'justwannarock@gmail.com'),
	(5, to_timestamp(1702540800), 'kaliii@gmail.com'),
	(5, to_timestamp(1702558800), 'weeknd@gmail.com'),
	(5, to_timestamp(1703166400), 'tylercallme@gmail.com'),
	(5, to_timestamp(1703184400),'nikiz@gmail.com' ),
	(5, to_timestamp(1703260800), 'kpop@gmail.com'),
	(5, to_timestamp(1703278800), 'beyonce@gmail.com'),
	(5, to_timestamp(1703894400), 'indoman@gmail.com'),
	(6, to_timestamp(1703912400), 'drake@gmail.com');

INSERT INTO seat (seat_name, price, order_id, showtime_id)
VALUES 
	('1A', 400, null, 1),
	('1B', 400, null, 1),
	('1C', 400, null, 1),
	('1D', 400, null, 1),
	('1E', 400, null, 1),
	('2A', 200, null, 1),
	('2B', 200, null, 1),
	('2C', 200, null, 1),
	('2D', 200, null, 1),
	('2E', 200, null, 1),
	('3A', 150, null, 1),
	('3B', 150, null, 1),
	('3C', 150, null, 1),
	('3D', 150, null, 1),
	('3E', 150, null, 1),
	('1A', 400, null, 2),
	('1B', 400, null, 2),
	('1C', 400, null, 2),
	('1D', 400, null, 2),
	('1E', 400, null, 2),
	('2A', 200, null, 2),
	('2B', 200, null, 2),
	('2C', 200, null, 2),
	('2D', 200, null, 2),
	('2E', 200, null, 2),
	('3A', 150, null, 2),
	('3B', 150, null, 2),
	('3C', 150, null, 2),
	('3D', 150, null, 2),
	('3E', 150, null, 2),
	('1A', 400, null, 3),
	('1B', 400, null, 3),
	('1C', 400, null, 3),
	('1D', 400, null, 3),
	('1E', 400, null, 3),
	('2A', 200, null, 3),
	('2B', 200, null, 3),
	('2C', 200, null, 3),
	('2D', 200, null, 3),
	('2E', 200, null, 3),
	('3A', 150, null, 3),
	('3B', 150, null, 3),
	('3C', 150, null, 3),
	('3D', 150, null, 3),
	('3E', 150, null, 3),
	('1A', 400, null, 4),
	('1B', 400, null, 4),
	('1C', 400, null, 4),
	('1D', 400, null, 4),
	('1E', 400, null, 4),
	('2A', 200, null, 4),
	('2B', 200, null, 4),
	('2C', 200, null, 4),
	('2D', 200, null, 4),
	('2E', 200, null, 4),
	('3A', 150, null, 4),
	('3B', 150, null, 4),
	('3C', 150, null, 4),
	('3D', 150, null, 4),
	('3E', 150, null, 4),
	('1A', 400, null, 5),
	('1B', 400, null, 5),
	('1C', 400, null, 5),
	('1D', 400, null, 5),
	('1E', 400, null, 5),
	('2A', 200, null, 5),
	('2B', 200, null, 5),
	('2C', 200, null, 5),
	('2D', 200, null, 5),
	('2E', 200, null, 5),
	('3A', 150, null, 5),
	('3B', 150, null, 5),
	('3C', 150, null, 5),
	('3D', 150, null, 5),
	('3E', 150, null, 5),
	('1A', 400, null, 6),
	('1B', 400, null, 6),
	('1C', 400, null, 6),
	('1D', 400, null, 6),
	('1E', 400, null, 6);

INSERT INTO review (comment, datestamp, rating, venue_id, client_email)
VALUES 
	('this place rocks!', to_timestamp(1652259000), 5, 4, 'topan@gmail.com'),
	('I LOVE THE WEEKNKD', to_timestamp(1656821100), 5, 4, 'rahat@gmail.com'),
	('I mean it`s aight', to_timestamp(1663621200), 3, 4, 'gabe@gmail.com'),
	('this was so messy and the bathroom was so far', to_timestamp(1667273400), 1, 5, 'rayhan@gmail.com'),
	('WHY DOES IT SMELL', to_timestamp(1671747300), 0, 3, 'topan@gmail.com'),
	('zzZZzz', to_timestamp(1673881200), 2, 1, 'jt@gmail.com');