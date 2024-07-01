const pool = require("../db");

const fetchProducts = async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM fetch_all_products()');
        res.status(200).json(result.rows);
    } catch (e) {
        res.status(500).send(e.message);
    } finally {
        client.release();
    }
};

module.exports =fetchProducts;