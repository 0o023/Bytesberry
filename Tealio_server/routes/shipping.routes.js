const { insertShipping, getShipping, deleteShipping } = require('../controllers/shipping.controller');

module.exports = function (app) {

    // Define route for placing an order
    app.post('/insert_order_tracking', insertShipping);
  
    // Define route for retrieving orders
    app.get('/get_all_order_tracking_keys', getShipping);
  
    //Define route for deleting order by its order ID
    app.delete('/delete_order_tracking/:tracking_id', deleteShipping);
  
  };