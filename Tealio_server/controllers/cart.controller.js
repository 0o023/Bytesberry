const pool = require('../db');
const { addToCartSchema, getCartSchema, deleteCartSchema, } = require ('../schemas/carts.db');
const { validate, validateParams } = require('../middlewares/cart.validate');

// Function to add item to the database
const addToCart = async (req, res) => {
  console.log('Request body:', req.body); // Debugging line

  const { product_name, size, price, quantity, status, added_at, user_id } = req.body;

  try {
    let fetchedUserId = user_id;
    let userResult;

    // Verify if the provided user_id exists in the dummy_users table
    if (user_id) {
      userResult = await pool.query('SELECT user_id FROM dummy_users WHERE user_id = $1', [user_id]);
      if (userResult.rows.length === 0) {
        console.log(`User ID ${user_id} does not exist. Fetching a valid user ID.`);
        fetchedUserId = null;
      }
    }

    // If no valid user_id is provided, fetch one
    if (!fetchedUserId) {
      userResult = await pool.query('SELECT user_id FROM dummy_users LIMIT 1');
      fetchedUserId = userResult.rows[0].user_id;
      console.log('Fetched User ID:', fetchedUserId); // Debugging line
    }

    console.log('Calling add_cart with parameters:', product_name, size, price, quantity, status || 'In cart', added_at || new Date(), fetchedUserId); // Debugging line

    // Call the add_cart function and return the new cart item details
    const result = await pool.query(
      'SELECT * FROM add_cart($1, $2, $3, $4, $5, $6, $7)',
      [product_name, size, price, quantity, status || 'In cart', added_at || new Date(), fetchedUserId]
    );

    if (result.rows.length === 0) {
      throw new Error('Insert query did not return any rows.');
    }

    console.log('Item added to cart:', result.rows[0]);

    res.status(200).json(result.rows[0]); // Ensure the inserted item is returned
  } catch (err) {
    console.error('Error adding item to cart:', err.message, err.stack); // Detailed error logging
    res.status(500).json({ error: 'An error occurred while adding an item to the cart' });
  }
};


//Function to retrieve an item only 
const getCart = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM get_cart($1)', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
};

//Function to retrieve all items from the database
const getAllCart = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM get_all_cart()');
  
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  };

  //Function to delete item from the database
  const deleteCart = async (req, res) => {
    const { id } = req.params;
  
    try {
      await pool.query('SELECT delete_cart($1)', [id]);
      res.status(200).json({ message: 'Item deleted from cart' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  

  module.exports = {
    addToCart: [validate(addToCartSchema), addToCart],
    getCart: [validateParams(getCartSchema), getCart],
    getAllCart,
    deleteCart: [validateParams(deleteCartSchema), deleteCart],
  };
