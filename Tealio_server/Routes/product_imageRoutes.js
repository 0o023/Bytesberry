
const express= require('express');
const router=express.Router();
const {
    updateProductImage,
    deleteProductImage,
    showProductImage,
    showAllproductImage,
    showProductImagesByProductId,
    addProductImagesByProductId }=require('../Controller/product_imageController');
    
    router.put('/:fileId',async(req,res)=>{
        const { fileId }=req.params;
        const {product_id,file_url}=req.body;
        try{
            await updateProductImage(fileId,product_id,file_url);
            res.send('product image updated successfully');

        }
        catch(err){
            res.status(500).send(err.message);
        }
    });
    router.delete('/:fileId',async(req,res)=>{
        const {fileId}=req.params;
        try{
            await deleteProductImage(fileId);
            res.send('product image deleted successfully');
        }
        catch(err){
            res.status(500).send(err.message);
        }

    });
    router.get('/:fileId',async(req,res)=>{
        const {fileId}=req.params;
        try{
            const result= await showProductImage(fileId);
            res.json(result);

        }
        catch(err){
            res.status(500).send(err.message);
        }

    });
    router.get('/',async(req,res)=>{
        try{
                const result=await showAllproductImage();
                res.json(result);
        }
        catch(err){
                res.status(500).send(err.message);
        }
    });

    router.get('/product/:productId', async (req, res) => {
        const { productId } = req.params;
        try {
            const result = await showProductImagesByProductId(productId);
            res.json(result);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    router.post('/add', async (req, res) => {
        const { product_id, images } = req.body;
        try {
            await addProductImagesByProductId(product_id, JSON.stringify(images));
            res.send('Product images added successfully');
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    module.exports=router;
