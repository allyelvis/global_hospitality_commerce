const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 4000;
const pool = new Pool({
    user: 'your_db_user',
    host: 'localhost',
    database: 'facture_management',
    password: 'your_db_password',
    port: 5432
});

app.use(bodyParser.json());
app.use(cors());

// User Management APIs
app.post('/register', async (req, res) => {
    const { username, password, role_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
        'INSERT INTO users (username, password, role_id) VALUES (, , )',
        [username, hashedPassword, role_id]
    );
    res.json({ message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = (await pool.query('SELECT * FROM users WHERE username = ', [username])).rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id, role: user.role_id }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Invoice and Sales APIs
app.post('/invoices', async (req, res) => {
    const { invoice_number, customer_name, total_amount } = req.body;
    await pool.query(
        'INSERT INTO invoices (invoice_number, customer_name, total_amount) VALUES (, , )',
        [invoice_number, customer_name, total_amount]
    );
    res.json({ message: 'Invoice created successfully' });
});

app.get('/invoices', async (req, res) => {
    const result = await pool.query('SELECT * FROM invoices');
    res.json(result.rows);
});

app.post('/sales', async (req, res) => {
    const { invoice_id, product_name, quantity, price } = req.body;
    const total = quantity * price;
    await pool.query(
        'INSERT INTO sales (invoice_id, product_name, quantity, price, total) VALUES (, , , , )',
        [invoice_id, product_name, quantity, price, total]
    );
    res.json({ message: 'Sale added successfully' });
});

app.get('/sales', async (req, res) => {
    const result = await pool.query('SELECT * FROM sales');
    res.json(result.rows);
});

app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});
