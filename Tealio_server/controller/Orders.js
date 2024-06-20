/*const pool = require("./db");

async function showShipped(req, res) {
    try {
        const { order_id, name, date, status, ordered_date } = req.body;
        
        const show_shipped = async (order_id, name, date, status, ordered_date) => {
            const query = 'SELECT show_shipped($1, $2, $3, $4, $5)';
            const result = await pool.query(query, [order_id, name, date, status, ordered_date]);
            //console.log('Query executed successfully', result.rows);
            return result.rows;
        };

        const result = await show_shipped(order_id, name, date, status, ordered_date);
        res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Database error' });
    }
}

async function deleteShipped(req, res){
    try {
        const{order_id} = req.body;
        const delete_shipped = async (order_id) => {
            const query = 'SELECT delete_shipped($1)';
            const result = await pool.query(query,[order_id])
        };
        const result = await delete_shipped(order_id);
        console.log('Deleted Successfully');
        res.status(500).json(result);
    }
     catch (err) {
        console.error(err.message);
    }
}

module.exports = {showShipped, deleteShipped};

*/


const pool = require("../db");
const {Validation} = require("../schema/Validation");


async function insertOrders(req, res) {
    try {
        const { error,value } = Validation.validate(req.body);
        if(error){
            return res.status(400).json({error: error.details[0].message});
        }
        const {order_date, billing_add, payment_mode, order_status, order_delivered_date, order_no, payment_status, order_total, customer_email, customer_phone_no } = value;

        const query = 'SELECT insert_order($1, $2, $3, $4, $5, $6,$7,$8,$9,$10)';
        console.log([order_date, billing_add, payment_mode, order_status, order_delivered_date, order_no, payment_status, order_total, customer_email, customer_phone_no]);
        const result = await pool.query(query, [order_date, billing_add, payment_mode, order_status, order_delivered_date, order_no, payment_status, order_total, customer_email, customer_phone_no]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Database error' });
    }
};

/*async function delete(req, res) {
    try {
        const { order_id } = req.body;
        const query = 'SELECT delete_shipped($1)';
        const result = await pool.query(query, [order_id]);
        res.status(200).json(result.rows);
        console.log('Deleted Successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Database error' });
    }
};*/

async function getOrders(req, res) {
    try {
        const query = 'SELECT * FROM get_all_orders()';
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};


/*async function putStatus(req,res) {
    try {
        const { order_id, status } = req.body;

        const query = 'SELECT update_order_status($1, $2)';
        const result = await pool.query(query, [order_id, status]);
        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Database error' });
    }
};*/


async function putStatus(req, res) {
    const { order_id, order_status } = req.body;
    
    try {
        const query = 'SELECT update_order_status($1, $2)';
        const values = [order_id, order_status];
        await pool.query(query, values);
        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

async function getOrderDetails(req, res) {
    try {
      const result = await pool.query('SELECT * FROM public.get_all_order_details()');
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

  async function deleteOrderAndDetails(req, res) {
    const { order_id } = req.params; // Assuming order_id is passed as a URL parameter
    try {
      const result = await pool.query('SELECT public.delete_order_and_details($1)', [order_id]);
      res.status(200).send('Order and its details deleted successfully');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  

module.exports = { insertOrders, putStatus, getOrders, getOrderDetails, deleteOrderAndDetails };



