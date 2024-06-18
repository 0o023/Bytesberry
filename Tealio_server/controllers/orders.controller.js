// I am making a connection with the Postgres SQL database by using pool object. I am also calling the function place_order from the database in this backend server code. 

const pool = require("../db"); // db.js file exports the pool object
const { orderSchema } = require ('../schemas/orders.db');

// Route handler for placing an order
async function placeOrder(req, res) {
    const client = await pool.connect();
    try {
      // Validate the request body against the schema
      const { error, value } = orderSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      // Extract validated order details from the value
      const { username, status, total_price, date_ordered } = value;
  
      // Start a database transaction
      await client.query('BEGIN');
      try {
        // Call the place_order function
        await client.query('SELECT place_order($1, $2, $3, $4)', [username, status, total_price, date_ordered]);
  
        // Commit the transaction
        await client.query('COMMIT');
  
        // Send a success response
        res.status(200).json({ message: 'Order placed successfully' });
      } catch (transactionError) {
        // Rollback the transaction in case of an error
        await client.query('ROLLBACK');
        console.error('Transaction error:', transactionError);
        res.status(500).json({ error: 'An error occurred while placing the order' });
      } finally {
        // Release the database client back to the pool
        client.release();
      }
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ error: 'An error occurred while placing the order' });
    }
  }
  
  // Route handler for retrieving orders
  async function getOrders(req, res) {
    const client = await pool.connect();
    try {
      // Query the orders_summary table to retrieve orders
      const result = await client.query('SELECT * FROM orders_summary');
  
      // Extract the rows from the result
      const orders = result.rows;
  
      // Send the retrieved orders as the response
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error retrieving orders:', error);
      res.status(500).json({ error: 'An error occurred while retrieving orders' });
    } finally {
      // Release the database client back to the pool
      client.release();
    }
  }
  
  // Route handler for deleting orders from the database
  async function deleteOrders(req, res) {
    const client = await pool.connect();
    try {
      // Extract the order ID from the request parameters
      const orderId = req.params.orderId;
  
      // Start a database transaction
      await client.query('BEGIN');
      try {
        // Check if the order with the specified ID exists
        const result = await client.query('SELECT * FROM orders_summary WHERE order_id = $1', [orderId]);
  
        // If the order with the specified ID exists, delete it
        if (result.rows.length > 0) {
          await client.query('DELETE FROM orders_summary WHERE order_id=$1', [orderId]);
          await client.query('COMMIT');
          res.status(200).json({ message: 'Order deleted successfully' });
        } else {
          // If no order with the specified ID is found, send a 404 Not Found response
          await client.query('ROLLBACK');
          res.status(404).json({ error: 'Order not found' });
        }
      } catch (transactionError) {
        // Rollback the transaction in case of an error
        await client.query('ROLLBACK');
        console.error('Transaction error:', transactionError);
        res.status(500).json({ error: 'An error occurred while deleting the order' });
      } finally {
        // Release the database client back to the pool
        client.release();
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ error: 'An error occurred while deleting the order' });
    }
  }
  
  module.exports = { placeOrder, getOrders, deleteOrders };