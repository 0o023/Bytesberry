/*const { insertOrders, putStatus,getOrders} = require('../controller/shipped'); // Correct path to shipped.js

module.exports = function(app) {
    app.post('/insert_Orders', insertOrders);
    app.delete('/edit_Status', putStatus);
    app.get('/show_Orders', getOrders);
};*/
const { insertOrders, putStatus, getOrders } = require('../controller/Orders'); // Correct path to shipped.js

module.exports = function(app) {
    app.post('/insert_Orders', insertOrders);
    app.put('/edit_Status', putStatus);  // Use PUT instead of DELETE
    app.get('/show_Orders', getOrders);
};
