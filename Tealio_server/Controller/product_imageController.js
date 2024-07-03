
const pool= require('../db/pool');
 const updateProductImage=async(fileId,productId,fileUrl)=>{
    try{
        await pool.query(
            'SELECT update_product_image($1,$2,$3)',[fileId,productId,fileUrl]
        );
        console.log('product image update successfully');
    }
    catch(err){
        console.error('error updating product image:',err.message);
        throw err;
    }
};
    
  const deleteProductImage=async(fileId)=>{
    try{
    await pool.query(
        'SELECT delete_product_image($1)',
        [fileId]
    );
    console.log('product image deleted successfully');
    }
  catch(err){
    console.error('error deleting product image:',err.message);
    throw err;
  }
};

    const showProductImage=async(fileId)=>{
        try{
            const result = await pool.query(
                'SELECT * FROM show_product_image($1)',
                [fileId]

            );
            return result.rows[0];
        }
        catch(err){
            console.error('Error showing product image:',err.message);
            throw err;

        }
    };

    const showAllproductImage=async()=>{
        try{
                const result= await pool.query(
                    'SELECT * FROM show_all_product_image()'
                );
                return result.rows;
        }
        catch(err){
            console.error('Error showing all product image:',err.message);
            throw err;
        }
    };

    module.exports={updateProductImage,deleteProductImage,showProductImage,showAllproductImage};

