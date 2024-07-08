const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const productGenericDetailsRoutes = require('./Routes/product_generic_detailsRoutes');
const productVarietySizeRoutes = require('./Routes/product_variant_sizeRoutes');
const productStockRoutes = require('./Routes/product_stockRoutes');
const productPriceRoutes = require('./Routes/product_priceRoutes');
const productImageRoutes = require('./Routes/product_imagesRoutes');
const app = express();
const port = 3000;

// Middleware
app.use(express.json({ limit: '10000mb' }));
app.use(bodyParser.urlencoded({ limit: '10000mb', extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve static files from the 'uploads' folder

// Using routes
app.use('/product_generic_details', productGenericDetailsRoutes);
app.use('/product_variety_size', productVarietySizeRoutes);
app.use('/product_stock', productStockRoutes);
app.use('/product_price', productPriceRoutes);
app.use('/product_images', productImageRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
