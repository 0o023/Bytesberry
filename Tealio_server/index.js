const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db'); // Ensure the path to db.js is correct
const cartRoutes = require('./routes/cart.routes'); // Ensure the path is correct
const shippedRoutes = require('./routes/shipped_routes'); // Ensure the path is correct
const productRoutes = require('./routes/maipage.routes'); // Ensure the path is correct

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad JSON');
        return res.status(400).json({ error: 'Bad JSON' });
    }
    next();
});
// Routes
cartRoutes(app);
shippedRoutes(app);
productRoutes(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


/*
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

// Route to fetch product details
app.get('/api/products', async (req, res) => {
    try {
        const { rows } = await pool.query(getProductDetailsQuery);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
*/