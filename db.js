const pg = require('pg');

const client = new pg.Client('postgress://localhost/crud');

client.connect();

const sync = async () => {
	const SQL = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    DROP TABLE IF EXISTS articles;
    DROP TABLE IF EXISTS authors;

    CREATE TABLE authors(
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE articles(
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(255),
        body TEXT,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        author_id UUID REFERENCES authors(id)
    );

    INSERT INTO authors(first_name, last_name) 
        VALUES( 'Teddy', 'Roosevelt');

        INSERT INTO articles(title, body, author_id)
        VALUES( 'The Vigorous Life', 'Dee-lighted!', (SELECT id FROM authors WHERE first_name = 'Teddy'));
        `;

	await client.query(SQL);
};

module.exports = {
	sync
};
