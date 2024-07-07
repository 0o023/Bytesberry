const {addToCart,deleteCart,getCart,updateCart}=require('../controller/cart.controller');

module.exports=function(app){

    app.post('/add_cart',addToCart);
    app.get('/get_cart',getCart)
    app.delete('/delete_cart',deleteCart);
    app.put('/update_cart',updateCart);
}