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

INSERT INTO users (firstname, lastname, email, outreach)
  VALUES ('Jerry', 'Johnson', 'jerry@example.com', TRUE), ('George', 'Gackley','george@example.com', TRUE);