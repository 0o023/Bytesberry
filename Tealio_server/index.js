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