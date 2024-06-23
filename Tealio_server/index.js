const express = require('express');
const pool = require("./db");
const cors = require('cors');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
//const orderRoutes = require('./routes/orders');      // order database routing 
//const cartRoutes = require('./routes/carts');       // cart database routing 

//Routing for orders & shipping 
const shippedRoutes = require('./routes/shipping.routes');
const orderRoutes = require ('./routes/orders.routes');


//Middleware

app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); // parse JSON bodies 

// Use order routes
shippedRoutes(app);
orderRoutes(app);
//orderRoutes(app);
//cartRoutes(app);

module.exports = app;




app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});