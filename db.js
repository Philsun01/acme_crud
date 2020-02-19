const pg = require('pg');

const client = new pg.Client('postgress://localhost/crud');

client.connect();

const sync = async() => {
    const SQL = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    DROP TABLE IF EXISTS authors;
    CREATE TABLE authors(
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4()     
    );
    
    INSERT INTO authors(first_name, last_name) 
        VALUES( 'Teddy', 'Roosevelt')
        
    `;
    
    await client.query(SQL);
};

module.exports = {
    sync
}