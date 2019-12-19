DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS entries;
DROP TABLE IF EXISTS emotions;

CREATE TABLE users (
	uid SERIAL PRIMARY KEY,
	firstname VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	outreach BOOLEAN NOT NULL
);

CREATE TABLE entries (
	uid FOREIGN KEY,
	dates DATE NOT NULL,
	entry VARCHAR(1000),
	FOREIGN KEY (uid) REFERENCES users(uid),
	PRIMARY KEY(uid, dates)
);

CREATE TABLE emotions (
	uid FOREIGN KEY,
	dates DATE NOT NULL,
	ratings INT,
	FOREIGN KEY (uid) REFERENCES users(uid),
	PRIMARY KEY(uid, dates)
);