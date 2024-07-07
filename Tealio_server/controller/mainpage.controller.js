const pool=require('../db');
const {validate}=require('../middleware/validate');

const getProductDetails = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM get_product_details()');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getProductDetails,
};