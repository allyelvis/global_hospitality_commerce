const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'your_db_user',
    host: 'localhost',
    database: 'restaurant_pos',
    password: 'your_db_password',
    port: 5432
});

app.use(bodyParser.json());

app.get('/tables', async (req, res) => {
    const result = await pool.query('SELECT * FROM dining_tables');
    res.json(result.rows);
});

app.put('/tables/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    await pool.query('UPDATE dining_tables SET status = , last_updated = NOW() WHERE id = ', [status, id]);
    res.json({ message: 'Table status updated' });
});

app.get('/kot/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const result = await pool.query('SELECT * FROM kot WHERE order_id = ', [orderId]);
    res.json(result.rows);
});

app.post('/kot', async (req, res) => {
    const { order_id, kitchen_item, quantity } = req.body;
    await pool.query(
        'INSERT INTO kot (order_id, kitchen_item, quantity) VALUES (, , )',
        [order_id, kitchen_item, quantity]
    );
    res.json({ message: 'KOT item added' });
});

app.put('/kot/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('UPDATE kot SET status =  WHERE id = ', ['completed', id]);
    res.json({ message: 'KOT item marked as completed' });
});

app.post('/fiscal', async (req, res) => {
    const { order_id, receipt_number, total } = req.body;
    await pool.query(
        'INSERT INTO fiscal_receipts (order_id, receipt_number, total) VALUES (, , )',
        [order_id, receipt_number, total]
    );
    res.json({ message: 'Fiscal receipt generated' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
