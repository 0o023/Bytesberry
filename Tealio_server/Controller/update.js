const pool = require("../db");
const updateProduct = async (req, res) => {
    const { product_id, product_name, product_description } = req.body;

    if (!product_id || !product_name || !product_description) {
        return res.status(400).send('Invalid input');
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(
            'SELECT update_product($1, $2, $3)',
            [product_id, product_name, product_description]
        );
        await client.query('COMMIT');
        res.status(200).send('Product updated successfully');
    } catch (e) {
        await client.query('ROLLBACK');
        res.status(500).send(e.message);
    } finally {
        client.release();
    }
};

module.exports=updateProduct;