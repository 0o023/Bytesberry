const pool = require("../db");

const insertImage = async (req, res) => {
    const { product_id, file_url } = req.body;

    if (!product_id || !file_url) {
        return res.status(400).send('Product ID and file URL are required');
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        // Check if the product_id exists in utbl_product_generic_details
        const checkProductQuery = 'SELECT product_id FROM utbl_product_generic_details WHERE product_id = $1';
        const checkProductResult = await client.query(checkProductQuery, [product_id]);
        
        if (checkProductResult.rows.length === 0) {
            throw new Error(`Product with ID ${product_id} does not exist`);
        }

        // Insert into utbl_product_images
        const insertImageQuery = 'INSERT INTO utbl_product_images (product_id, file_url) VALUES ($1, $2)';
        await client.query(insertImageQuery, [product_id, file_url]);

        await client.query('COMMIT');
        res.status(200).send('Product image inserted successfully');
    } catch (e) {
        await client.query('ROLLBACK');
        res.status(500).send(e.message);
    } finally {
        client.release();
    }
};

module.exports = insertImage;