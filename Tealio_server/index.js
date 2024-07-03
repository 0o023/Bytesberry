const express = require('express');
const cors=require('cors');
const bodyParser=require('body-parser');

const productGenericDetailsRoutes = require('./Routes/product_generic_detailsRoutes');
const productVarietySizeRoutes=require('./Routes/product_variety_sizeRoutes');
const productStockRoutes=require('./Routes/product_stockRoutes');
const productPriceRoutes=require('./Routes/product_priceRoutes');
const productImageRoutes=require('./Routes/product_imageRoutes');
const app = express();
const port = 5000;
//middleware
app.use(express.json({limit:'10000mb'})); // Use express.json() middleware
app.use(bodyParser.urlencoded({ limit: '10000mb', extended: true })); // Increase the limit for URL-encoded data
app.use(cors());
//using rout
app.use('/product_generic_details',productGenericDetailsRoutes);
app.use('/product_variety_size',productVarietySizeRoutes);
app.use('/product_stock',productStockRoutes);
app.use('/product_price',productPriceRoutes);
app.use('/product_image',productImageRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
