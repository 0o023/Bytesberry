const { insertShipping, getShippingDetails, deleteShipping, putAwbTrackingNo, alterStatus } = require('../controllers/shipping.controller');

module.exports = function (app) {

    // Define route for placing an order
    app.post('/insert_order_tracking', insertShipping);
  
    // Define route for retrieving orders
    app.get('/get_order_tracking_details', getShippingDetails);
  
    //Define route for deleting order by its order ID
    app.delete('/delete_order_tracking/:tracking_id', deleteShipping);

    app.put('/update_awb_tracking_no_by_order_no', putAwbTrackingNo);

    app.put('/edit_status', alterStatus);

  
  };