const pool= require("../db");
const fetchImages = async (req, res) => {
    const { product_id } = req.query;
    console.log('Product Id:',product_id);

    if (!product_id) {
        return res.status(400).send('Invalid input');
    }

    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT * FROM fetch_images($1)',
            [product_id]
        );
        res.status(200).json(result.rows);
    } catch (e) {
        console.error('Error fetching images:',e.message);
        res.status(500).send(e.message);
    } finally {
        client.release();
    }
};

module.exports =fetchImages;