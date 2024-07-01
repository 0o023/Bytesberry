const pool = require("../db");
const resetDatabase = async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query('DELETE FROM utbl_product_generic_details');
        await client.query('ALTER SEQUENCE utbl_product_generic_details_product_id_seq RESTART WITH 1');
        await client.query('COMMIT');
        res.status(200).send('Database reset successfully');
    } catch (e) {
        await client.query('ROLLBACK');
        res.status(500).send(e.message);
    } finally {
        client.release();
    }
};

module.exports =  resetDatabase ;