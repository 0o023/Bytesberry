const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cartRoutes = require('./routes/cartRoutes');


const cors=require('cors');
const pool =require("./db");
const bodyParser=require('body-parser');
const cartRoutes=require('./routes/cart.routes');
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

cartRoutes(app);

module.exports=app;

const PORT = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/cart', cartRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});