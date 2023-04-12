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
	venue_description varchar(2000),
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
	('weeknd@gmail.com', 'Week', 'end', 'The Weeknd', 'bnguyen@gmail.com', 'https://i.scdn.co/image/ab6761610000e5ebb5f9e28219c169fd4b9e8379'),
	('kpop@gmail.com', 'one', 'two', 'TWICE', 'bnguyen@gmail.com', 'https://s1.ticketm.net/dam/a/3a4/7c0b198a-5fc2-49ce-9e75-455518e613a4_TABLET_LANDSCAPE_LARGE_16_9.jpg'),
	('indoman@gmail.com', 'Brian', 'Imanuel', 'Rich Brian', 'bnguyen@gmail.com', 'https://yt3.googleusercontent.com/5GTdgOUts50y6z1b9gJ2OmYrHZFO7uLIoMmA_HblQyI4X1XA_nWU0apFLwVp8KYURQNx6HbFJA=s900-c-k-c0x00ffffff-no-rj'),
	('warren@gmail.com', 'Warren', 'Hue', 'Warren Hue', 'bnguyen@gmail.com', 'https://i.scdn.co/image/ab6761610000e5eb4ce83e0bb702c7fec348f146'),
	('justwannarock@gmail.com', 'Uzi', 'Vert', 'Lil Uzi Vert', 'bnguyen@gmail.com', 'https://i.scdn.co/image/ab6761610000e5eb30122c0d3ead72f96bb5ee93'),
	('kaliii@gmail.com', 'Kali', 'Uchis', 'Kali Uchis', 'bnguyen@gmail.com', 'https://www.rollingstone.com/wp-content/uploads/2023/01/kali-uchis-new-album.jpg'),
	('tylercallme@gmail.com', 'Tyler', 'Boudelaire', 'Tyler The Creator', 'bnguyen@gmail.com', 'https://i.scdn.co/image/ab6761610000e5eb8278b782cbb5a3963db88ada'),
	('nikiz@gmail.com', 'Niki', 'Zefanya', 'NIKI', 'bnguyen@gmail.com', 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Niki_in_2022.png');

INSERT INTO venue (venue_name, venue_location, venue_description, venue_img)
VALUES
	('ScotiaBank Saddledome', 'Calgary, AB', 'Scotiabank Saddledome: The Scotiabank Saddledome is a multi-purpose arena located in Calgary, Alberta, Canada. It is home to the Calgary Flames of the National Hockey League (NHL) and is also a popular venue for concerts, trade shows, and other events. With a seating capacity of up to 19,289, the Saddledome is one of the largest indoor arenas in Canada and has hosted numerous high-profile events over the years.','https://upload.wikimedia.org/wikipedia/commons/0/0b/2020_Calgary_Saddledome.jpg'),
	('Rogers Arena', 'Vancouver, BC', 'Rogers Arena in Vancouver: Rogers Arena is a state-of-the-art sports and entertainment facility located in the heart of downtown Vancouver, British Columbia. Home to the Vancouver Canucks of the NHL, the arena also hosts a wide variety of concerts, shows, and other events throughout the year. With a seating capacity of up to 18,910, Rogers Arena is one of the premier entertainment venues in Western Canada.
','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw50meWdOBxdav7dY-DPQ5jDvtBleyksk64xXCTEKY1XXEThQzpHmaf7qZ1eNrynM7CZk&usqp=CAU'),
	('Machall', 'Calgary, AB', 'MacHall in Calgary AB: MacHall is a bustling student center located on the campus of the University of Calgary in Calgary, Alberta. With numerous dining options, a student-run bar, and a wide range of services and resources for students, MacHall is a hub of activity and a vital part of campus life. The center also hosts a variety of events throughout the year, including concerts, guest speakers, and cultural events.
', 'https://www.avenuecalgary.com/wp-content/uploads/2018/12/Detours-BellaConcertHall.jpg'),
	('UBC Thunderdome', 'Calgary, AB', 'UBC Thunderdome: The UBC Thunderdome is a state-of-the-art sports facility located on the campus of the University of British Columbia in Vancouver, British Columbia. With a seating capacity of up to 7,500, the Thunderdome is home to the UBC Thunderbirds basketball and volleyball teams and hosts a variety of other sporting events throughout the year. The facility also includes a fitness center, athletic training facilities, and other amenities for athletes and fitness enthusiasts.
', 'https://sportfacilities.ubc.ca/wp-content/uploads/2019/07/dmc-1-1170x487.jpg'),
	('ScotiaBank Arena', 'Toronto, ON', 'Scotiabank Arena in Toronto: Scotiabank Arena is a world-class sports and entertainment venue located in the heart of downtown Toronto, Ontario. Home to the Toronto Maple Leafs of the NHL and the Toronto Raptors of the NBA, the arena also hosts a wide range of concerts, shows, and other events throughout the year. With a seating capacity of up to 19,800, Scotiabank Arena is one of the premier entertainment venues in Canada.
', 'https://upload.wikimedia.org/wikipedia/commons/5/57/Scotiabank_Arena_-_2018_%28cropped%29.jpg'),
	('McMahon Stadium', 'Calgary, AB', 'McMahon Stadium in Calgary: McMahon Stadium is a renowned outdoor sports stadium located in Calgary, Alberta. Home to the Calgary Stampeders of the Canadian Football League (CFL), the stadium also hosts a variety of other sporting events throughout the year, including soccer and rugby. With a seating capacity of up to 35,650, McMahon Stadium is one of the largest sports venues in Western Canada and has played host to numerous high-profile events over the years.', 'https://upload.wikimedia.org/wikipedia/commons/a/a5/McMahon_Stadium_6.jpg');
	
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
	('1E', 400, null, 6),
	('1A', 250, null, 7),
	('1B', 250, null, 7),
	('1C', 250, null, 7),
	('2A', 250, null, 7),
	('2B', 250, null, 7),
	('2C', 250, null, 7),
	('3A', 250, null, 7),
	('3B', 250, null, 7),
	('3C', 250, null, 7),
	('1A', 250, null, 8),
	('1B', 250, null, 8),
	('1C', 250, null, 8),
	('2A', 250, null, 8),
	('2B', 250, null, 8),
	('2C', 250, null, 8),
	('3A', 250, null, 8),
	('3B', 250, null, 8),
	('3C', 250, null, 8),
	('1A', 250, null, 9),
	('1B', 250, null, 9),
	('1C', 250, null, 9),
	('2A', 250, null, 9),
	('2B', 250, null, 9),
	('2C', 250, null, 9),
	('3A', 250, null, 9),
	('3B', 250, null, 9),
	('3C', 250, null, 9),
	('1A', 250, null, 10),
	('1B', 250, null, 10),
	('1C', 250, null, 10),
	('2A', 250, null, 10),
	('2B', 250, null, 10),
	('2C', 250, null, 10),
	('3A', 250, null, 10),
	('3B', 250, null, 10),
	('3C', 250, null, 10),
	('1A', 250, null, 11),
	('1B', 250, null, 11),
	('1C', 250, null, 11),
	('2A', 250, null, 11),
	('2B', 250, null, 11),
	('2C', 250, null, 11),
	('3A', 250, null, 11),
	('3B', 250, null, 11),
	('3C', 250, null, 11),
	('1A', 250, null, 12),
	('1B', 250, null, 12),
	('1C', 250, null, 12),
	('2A', 250, null, 12),
	('2B', 250, null, 12),
	('2C', 250, null, 12),
	('3A', 250, null, 12),
	('3B', 250, null, 12),
	('3C', 250, null, 12),
	('1A', 250, null, 13),
	('1B', 250, null, 13),
	('1C', 250, null, 13),
	('2A', 250, null, 13),
	('2B', 250, null, 13),
	('2C', 250, null, 13),
	('3A', 250, null, 13),
	('3B', 250, null, 13),
	('3C', 250, null, 13),
	('1A', 250, null, 14),
	('1B', 250, null, 14),
	('1C', 250, null, 14),
	('2A', 250, null, 14),
	('2B', 250, null, 14),
	('2C', 250, null, 14),
	('3A', 250, null, 14),
	('3B', 250, null, 14),
	('3C', 250, null, 14),
	('1A', 250, null, 15),
	('1B', 250, null, 15),
	('1C', 250, null, 15),
	('2A', 250, null, 15),
	('2B', 250, null, 15),
	('2C', 250, null, 15),
	('3A', 250, null, 15),
	('3B', 250, null, 15),
	('3C', 250, null, 15),
	('1A', 250, null, 16),
	('1B', 250, null, 16),
	('1C', 250, null, 16),
	('2A', 250, null, 16),
	('2B', 250, null, 16),
	('2C', 250, null, 16),
	('3A', 250, null, 16),
	('3B', 250, null, 16),
	('3C', 250, null, 16),
	('1A', 250, null, 17),
	('1B', 250, null, 17),
	('1C', 250, null, 17),
	('2A', 250, null, 17),
	('2B', 250, null, 17),
	('2C', 250, null, 17),
	('3A', 250, null, 17),
	('3B', 250, null, 17),
	('3C', 250, null, 17),
	('1A', 250, null, 18),
	('1B', 250, null, 18),
	('1C', 250, null, 18),
	('2A', 250, null, 18),
	('2B', 250, null, 18),
	('2C', 250, null, 18),
	('3A', 250, null, 18),
	('3B', 250, null, 18),
	('3C', 250, null, 18),
	('1A', 250, null, 19),
	('1B', 250, null, 19),
	('1C', 250, null, 19),
	('2A', 250, null, 19),
	('2B', 250, null, 19),
	('2C', 250, null, 19),
	('3A', 250, null, 19),
	('3B', 250, null, 19),
	('3C', 250, null, 19),
	('1A', 250, null, 20),
	('1B', 250, null, 20),
	('1C', 250, null, 20),
	('2A', 250, null, 20),
	('2B', 250, null, 20),
	('2C', 250, null, 20),
	('3A', 250, null, 20),
	('3B', 250, null, 20),
	('3C', 250, null, 20),
	('1A', 250, null, 21),
	('1B', 250, null, 21),
	('1C', 250, null, 21),
	('2A', 250, null, 21),
	('2B', 250, null, 21),
	('2C', 250, null, 21),
	('3A', 250, null, 21),
	('3B', 250, null, 21),
	('3C', 250, null, 21),
	('1A', 250, null, 22),
	('1B', 250, null, 22),
	('1C', 250, null, 22),
	('2A', 250, null, 22),
	('2B', 250, null, 22),
	('2C', 250, null, 22),
	('3A', 250, null, 22),
	('3B', 250, null, 22),
	('3C', 250, null, 22),
	('1A', 250, null, 23),
	('1B', 250, null, 23),
	('1C', 250, null, 23),
	('2A', 250, null, 23),
	('2B', 250, null, 23),
	('2C', 250, null, 23),
	('3A', 250, null, 23),
	('3B', 250, null, 23),
	('3C', 250, null, 23),
	('1A', 250, null, 24),
	('1B', 250, null, 24),
	('1C', 250, null, 24),
	('2A', 250, null, 24),
	('2B', 250, null, 24),
	('2C', 250, null, 24),
	('3A', 250, null, 24),
	('3B', 250, null, 24),
	('3C', 250, null, 24),
	('1A', 250, null, 25),
	('1B', 250, null, 25),
	('1C', 250, null, 25),
	('2A', 250, null, 25),
	('2B', 250, null, 25),
	('2C', 250, null, 25),
	('3A', 250, null, 25),
	('3B', 250, null, 25),
	('3C', 250, null, 25);

	

INSERT INTO review (comment, datestamp, rating, venue_id, client_email)
VALUES 
	('this place rocks!', to_timestamp(1652259000), 5, 4, 'topan@gmail.com'),
	('I LOVE THE WEEKNKD', to_timestamp(1656821100), 5, 4, 'rahat@gmail.com'),
	('I mean it`s aight', to_timestamp(1663621200), 3, 4, 'gabe@gmail.com'),
	('this was so messy and the bathroom was so far', to_timestamp(1667273400), 1, 5, 'rayhan@gmail.com'),
	('WHY DOES IT SMELL', to_timestamp(1671747300), 0, 3, 'topan@gmail.com'),
	('zzZZzz', to_timestamp(1673881200), 2, 1, 'jt@gmail.com');