const pool= require("../db");
const deleteImage = async (req, res) => {
    const { file_id } = req.body;

    if (!file_id) {
        return res.status(400).send('Invalid input');
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(
            'SELECT delete_image($1)',
            [file_id]
        );
        await client.query('COMMIT');
        res.status(200).send('Image deleted successfully');
    } catch (e) {
        await client.query('ROLLBACK');
        res.status(500).send(e.message);
    } finally {
        client.release();
    }
};

module.exports =deleteImage;