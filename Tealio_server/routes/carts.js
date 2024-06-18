const { addToCart, getCart, getAllCart, deleteCart } = require('../controllers/cart.controller');

module.exports = function (app) {

    // Define route for adding an item into the cart table 
    app.post('/add_cart', addToCart);

    //Define route for retreiving a specific item from the table by its id
    app.get('/get_cart/:id', getCart);

    //Define route for retreiving all items from the table 
    app.get('/get_all_cart', getAllCart);

    //Define route to delete a row from the table 
    app.delete('/delete_cart/:id', deleteCart);
};