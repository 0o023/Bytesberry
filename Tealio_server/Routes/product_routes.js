const insertProduct = require('../Controller/insert');
const updateProduct = require('../Controller/update');
const deleteProduct = require('../Controller/delete');
const resetDatabase = require('../Controller/resetdb');
const fetchProducts = require('../Controller/fetch_all_p');
const fetchProductById = require('../Controller/fetch_pid');


const insertImage = require('../Controller/insert_img');
const updateImage = require('../Controller/update_img');
const deleteImage = require('../Controller/delete_img');
const fetchImages =require('../Controller/fetchImg');


module.exports = function (app) {
    // Define route for inserting a product
    app.post('/insert_product', insertProduct);
    //routes for updating a product
    app.post('/update_product', updateProduct);
    //routes for deleting product
    app.post('/delete_product', deleteProduct);
    //reset database
    app.post('/reset_database', resetDatabase);
    //fetch all products
    app.get('/fetch_all_products', fetchProducts);
    //fetch by product id
    app.get('/fetch_product_by_id', fetchProductById);
    

    //insert image
    app.post('/insert_image',insertImage);
    //update image
    app.post('/update_image', updateImage);
    //delete image
    app.post('/delete_image', deleteImage);
    //fetch image
    app.get('/fetch_images', fetchImages);

};