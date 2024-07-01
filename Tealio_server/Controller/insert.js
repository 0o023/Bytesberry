const pool = require("../db");

async function insertProduct(req, res) {
    const { product_name, product_description } = req.body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(
            'SELECT insert_product($1, $2)',
            [product_name, product_description]
        );
        await client.query('COMMIT');
        console.log('Product name and description inserted successfully');
        res.status(200).send('Product name and description inserted successfully');
    } catch (e) {
        await client.query('ROLLBACK');
        console.error(e.stack);
        res.status(500).send('Error inserting product: ' + e.message);
    } finally {
        client.release();
    }
}
module.exports = insertProduct;