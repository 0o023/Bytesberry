/*const express = require('express');
const pool = require('./db');
const cors = require('cors');
const app = express();
const port = 5000;
const show_shipped = require('./schema/shipped');

//Middleware

app.use(express.json());
app.use(cors());
 
shippedRoutes(app);

module.exports = app;

/*
//Insert into Shipped Table
app.post('/show_shipped', async (req, res) => {
    try {
        const { order_id, name, date, status, ordered_date } = req.body;
        
        const show_shipped = async (order_id, name, date, status, ordered_date) => {
            const query = 'SELECT show_shipped($1, $2, $3, $4, $5)';
            const result = await pool.query(query, [order_id, name, date, status, ordered_date]);
            //console.log('Query executed successfully', result.rows);
            return result.rows;
        };

        const result = await show_shipped(order_id, name, date, status, ordered_date);
        res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Database error' });
    }
});

//Delete from shipped table

app.delete('/delete_shipped', async(req, res) => {
    try {
        const{order_id} = req.body;
        const delete_shipped = async (order_id) => {
            const query = 'SELECT delete_shipped($1)';
            const result = await pool.query(query,[order_id])
        };
        const result = await delete_shipped(order_id);
        console.log('Deleted Successfully');
        res.status(500).json(result);
    }
     catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});*/


const express = require('express');
const pool = require('./db');
const cors = require('cors');
const app = express();
const port = 5000;
const shippedRoutes = require('./routes/shipped_routes'); // Correct path to shipped_routes

// Middleware
app.use(express.json());
app.use(cors());

// Use shipped routes
shippedRoutes(app);


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


