const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;
const SECRET = 'very_secret_key';
const MAX_AGE = 60 * 60; // 1h

// --- MIDDLEWARE ---
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// --- JWT ---
const createToken = (id) => {
    return jwt.sign({ id }, SECRET, { expiresIn: MAX_AGE });
};

// --- AUTH MIDDLEWARE ---
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });
        req.userId = decoded.id;
        next();
    });
};

// --- AUTH ROUTES ---

app.post('/auth/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashed = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
            [email, hashed]
        );

        const token = createToken(result.rows[0].id);
        res.cookie('jwt', token, { httpOnly: true });
        res.status(201).json({ message: 'User created' });

    } catch (err) {
        res.status(400).json({ error: 'User already exists' });
    }
});

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );

    if (user.rows.length === 0)
        return res.status(401).json({ error: 'Wrong credentials' });

    const valid = await bcrypt.compare(password, user.rows[0].password);
    if (!valid)
        return res.status(401).json({ error: 'Wrong credentials' });

    const token = createToken(user.rows[0].id);
    res.cookie('jwt', token, { httpOnly: true });
    res.json({ message: 'Logged in' });
});

app.get('/auth/logout', (req, res) => {
    res.clearCookie('jwt');
    res.json({ message: 'Logged out' });
});

app.get('/auth/authenticate', (req, res) => {
    const token = req.cookies.jwt;
    if (!token) return res.json({ authenticated: false });

    jwt.verify(token, SECRET, err => {
        if (err) return res.json({ authenticated: false });
        res.json({ authenticated: true });
    });
});

// --- POSTS ROUTES ---

// GET ALL POSTS
app.get('/api/posts', requireAuth, async (req, res) => {
    const result = await pool.query(
        'SELECT * FROM posts ORDER BY created_at DESC'
    );
    res.json(result.rows);
});

// GET ONE POST
app.get('/api/posts/:id', requireAuth, async (req, res) => {
    const result = await pool.query(
        'SELECT * FROM posts WHERE id = $1',
        [req.params.id]
    );
    res.json(result.rows[0]);
});

// ADD POST
app.post('/api/posts', requireAuth, async (req, res) => {
    const { text } = req.body;

    const result = await pool.query(
        'INSERT INTO posts (text, author) VALUES ($1, $2) RETURNING *',
        [text, 'user']
    );

    res.status(201).json(result.rows[0]);
});

// UPDATE POST
app.put('/api/posts/:id', requireAuth, async (req, res) => {
    const { text } = req.body;

    const result = await pool.query(
        'UPDATE posts SET text = $1 WHERE id = $2 RETURNING *',
        [text, req.params.id]
    );

    res.json(result.rows[0]);
});

// DELETE ONE POST
app.delete('/api/posts/:id', requireAuth, async (req, res) => {
    await pool.query(
        'DELETE FROM posts WHERE id = $1',
        [req.params.id]
    );
    res.json({ message: 'Post deleted' });
});

// DELETE ALL POSTS
app.delete('/api/posts', requireAuth, async (req, res) => {
    await pool.query('DELETE FROM posts');
    res.json({ message: 'All posts deleted' });
});

// --- START ---
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});

app.get('/', (req, res) => {
    res.send('Backend is running');
});