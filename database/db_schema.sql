CREATE TABLE users (
	uid INT NOT NULL,
	firstname VARCHAR(255) NOT NULL,
	lastname VARCHAR(255),
	email VARCHAR(255),
	PRIMARY KEY (uid)
);

CREATE TABLE entries (
	uid INT NOT NULL,
	dates DATE NOT NULL,
	content VARCHAR(1000),
	PRIMARY KEY (uid, dates)
);

CREATE TABLE emotions (
	uid INT NOT NULL,
	dates DATE NOT NULL,
	ratings INT,
	PRIMARY KEY (uid, dates)
);