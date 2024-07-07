const { getProductDetails } = require('../controller/mainpage.controller'); // Adjust the path if necessary

module.exports = function(app) {
  // Route to fetch products
  app.get('/products', getProductDetails);
};

