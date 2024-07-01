const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./Routes/product_routes');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies 

// Use product routes
productRoutes(app);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;