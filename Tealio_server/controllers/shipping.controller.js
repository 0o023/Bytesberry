const pool = require("../db");
const { trackingSchema } = require("../schemas/shipping.schema");

async function insertShipping(req, res) {
    try {
        console.log('Request body:', req.body); // Debugging line
        const { error, value } = trackingSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { order_id, awb_tracking_no } = value;

        const query = 'SELECT insert_order_tracking($1, $2)';
        console.log([order_id, awb_tracking_no]);
        const result = await pool.query(query, [order_id, awb_tracking_no]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Database error' });
    }
}

async function getShipping(req, res) {
    try {
        const query = 'SELECT * FROM get_all_order_tracking_keys()';
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

async function deleteShipping(req, res) {
    const { tracking_id } = req.params; // Assuming tracking_id is passed as a URL parameter
    try {
        const query = 'SELECT delete_order_tracking_by_id($1)';
        await pool.query(query, [tracking_id]);
        res.status(200).send('Order and its details deleted successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


module.exports = { insertShipping, getShipping, deleteShipping };
