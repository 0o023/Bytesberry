const pool = require("../db");
const updateImage = async (req, res) => {
    const { file_id, file_url } = req.body;

    if (!file_id || !file_url) {
        return res.status(400).send('Invalid input');
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(
            'SELECT update_image($1, $2)',
            [file_id, file_url]
        );
        await client.query('COMMIT');
        res.status(200).send('Image updated successfully');
    } catch (e) {
        await client.query('ROLLBACK');
        res.status(500).send(e.message);
    } finally {
        client.release();
    }
};

module.exports =updateImage;