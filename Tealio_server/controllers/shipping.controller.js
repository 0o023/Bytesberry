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

        // Ensure awb_tracking_no defaults to '0' if it is null
        const trackingNo = awb_tracking_no || '0';

        const query = 'SELECT insert_order_tracking($1, $2)';
        console.log('Query params:', [order_id, trackingNo]); // Debugging line
        const result = await pool.query(query, [order_id, trackingNo]);
        console.log('Insert result:', result); // Debugging line
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Database error:', err.message); // Detailed error logging
        res.status(500).json({ error: 'Database error' });
    }
};


async function getShippingDetails(req, res) {
    try {
        const query = 'SELECT * FROM get_order_tracking_details()';
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


async function putAwbTrackingNo(req, res) {
    const { order_no, awb_tracking_no } = req.body;
    
    try {
        const query = 'SELECT update_awb_tracking_no_by_order_no($1, $2)';
        const values = [order_no, awb_tracking_no];
        console.log(values);
        await pool.query(query, values);
        res.status(200).json({ message: 'AWB Tracking No updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

async function alterStatus(req, res) {
    const { order_id, order_status } = req.body;
    
    try {
        const query = 'SELECT edit_status($1, $2)';
        const values = [order_id, order_status];
        await pool.query(query, values);
        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { insertShipping, getShippingDetails, deleteShipping, putAwbTrackingNo, alterStatus };
