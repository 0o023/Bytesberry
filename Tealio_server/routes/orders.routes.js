/*
const { placeOrder, getOrders, deleteOrders } = require('../controllers/orders.controller');

module.exports = function (app) {

  // Define route for placing an order
  app.post('/place_order', placeOrder);

  // Define route for retrieving orders
  app.get('/place_order', getOrders);

  //Define route for deleting order by its order ID
  app.delete('/place_order/:orderId', deleteOrders);

};

*/

const { insertOrders, deleteOrderAndDetails, getAllOrderDetails, changeStatus, getDeliveryDetails, getShippingDetails } = require('../controllers/orders.controller'); // Correct path to shipped.js

module.exports = function(app) {
    app.post('/insert_order_keys', insertOrders);
    app.get('/get_all_order_details', getAllOrderDetails);
    app.put('/update_order_status', changeStatus);
    app.delete('/delete_orders/:order_id',deleteOrderAndDetails);
    app.get('/get_delivered_orders', getDeliveryDetails);
    app.get('/get_all_shipped_order_details', getShippingDetails);

};