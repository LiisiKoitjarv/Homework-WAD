const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'uusparool',
    database: 'hw4db',
    host: 'localhost',
    port: 5432
});

const execute = async (query) => {
    try {
        const client = await pool.connect();
        await client.query(query);
        client.release();
        return true;
    } catch (err) {
        console.error(err.stack);
        return false;
    }
};

// USERS
const usersTable = `
CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
`;

// POSTS
const postsTable = `
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

(async () => {
    await execute(usersTable);
    await execute(postsTable);
    console.log('Database initialized');
})();

module.exports = pool;
