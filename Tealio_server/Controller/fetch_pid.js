const pool = require("../db");
const fetchProductById = async (req, res) => {
    const { product_id } = req.query;

    if (!product_id) {
        return res.status(400).send('Invalid input');
    }

    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT * FROM fetch_product_by_id($1)',
            [product_id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Product not found');
        }
        res.status(200).json(result.rows[0]);
    } catch (e) {
        res.status(500).send(e.message);
    } finally {
        client.release();
    }
};

module.exports =fetchProductById ;