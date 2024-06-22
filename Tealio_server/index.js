const express = require('express');
const app = express();
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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});