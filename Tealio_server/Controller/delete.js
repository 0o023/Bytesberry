const pool = require("../db");

const deleteProduct = async (req, res) => {
    const { product_id } = req.body;

    if (!product_id) {
        return res.status(400).send('Invalid input');
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(
            'SELECT delete_product($1)',
            [product_id]
        );
        await client.query('COMMIT');
        res.status(200).send('Product deleted successfully');
    } catch (e) {
        await client.query('ROLLBACK');
        res.status(500).send(e.message);
    } finally {
        client.release();
    }
};

module.exports = deleteProduct ;