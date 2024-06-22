const {addToCart,deleteCart,getCart}=require('../controller/cart.controller');

module.exports=function(app){

    app.post('/add_cart',addToCart);
    app.get('/get_cart',getCart);
    app.delete('/delete_cart',deleteCart);
}