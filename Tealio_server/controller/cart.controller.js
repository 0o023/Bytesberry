const pool=require('../db');
const {addToCartSchema,deleteCartSchema,getCartSchema} =require('../schema/cart.db');
const {validate,validateParams}=require('../middleware/cart.validate');

const addToCart = async (req, res) => {
    const { orderno, productdetails } = req.body;
    try {
        // Check if the order number exists
        const checkOrderQuery = 'SELECT COUNT(*) FROM utbl_cart_details WHERE order_no = $1';
        const checkOrderResult = await pool.query(checkOrderQuery, [orderno]);
        const orderExists = checkOrderResult.rows[0].count > 0;

        let result;
        if (orderExists) {
            // If order exists, update the cart item
            const updateCartQuery = 'SELECT update_cart_item($1, $2)';
            result = await pool.query(updateCartQuery, [orderno, productdetails]);
        } else {
            // If order does not exist, add a new cart item
            const addCartQuery = 'SELECT add_cart_item($1, $2)';
            result = await pool.query(addCartQuery, [orderno, productdetails]);
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error adding/updating item in cart:', err.message, err.stack);
        res.status(500).json({ error: 'An error occurred while adding/updating an item in the cart' });
    }
};


const deleteCart =async(req,res)=>{

    const {orderno}=req.body;

    try {
        await pool.query(
            'select delete_cart($1)',
            [orderno]
        );
        res.status(200).json({ message: 'Item deleted from cart' });
    } catch (err) {
        console.error('Error deleting from cart'.err.message,err.stack);
        res.status(500).json({error:'Error occures while deleting item'})
    }
}

const getCart =async(req,res)=>{
    const {orderno}=req.query;

    try {
        const result=await pool.query(
            'SELECT * FROM get_cart_item($1)',
            [orderno]
        );

        if(result.rows.length===0){
            return res.status(404).json({ message: 'No items found in the cart' });
        }
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error displaying cart items',err.message,err.stack);
        res.status(500).json({error:'Error while displaying cart item'})
    }
}

module.exports = {
    addToCart: [validate(addToCartSchema), addToCart],
    getCart: [validate(getCartSchema), getCart],
    deleteCart: [validate(deleteCartSchema), deleteCart],
    
};
