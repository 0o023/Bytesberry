const { placeOrder, getOrders, deleteOrders } = require('../controllers/orders.controller');

module.exports = function (app) {

  // Define route for placing an order
  app.post('/place_order', placeOrder);

  // Define route for retrieving orders
  app.get('/place_order', getOrders);

  //Define route for deleting order by its order ID
  app.delete('/place_order/:orderId', deleteOrders);

};
