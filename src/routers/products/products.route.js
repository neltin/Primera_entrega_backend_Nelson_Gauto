const {Router} = require('express');
const router = Router();

const ProductManager = require('../../ProductManager');
const productos = new ProductManager('./src/dataProducts.json');

//Middlrware
const validacionCampos = (req, res, next) =>{
    const p = req.body;

    if(p.title && p.description && p.price && p.code && p.category && p.stock){
        p.status = !p.status ? true : p.status;
        next();
    }else{ 
        return next("Uno o mas campos faltan completar");
    }
}

router.get('/', async (req, res) =>{
    //Traer todos los productos
    const product =  await productos.getProducts();

    //Query limit
    const { limit } = req.query;

    if(limit > 0){
        let listProduct =  product.slice(0, limit);

        return res.status(220).json({
            status: "success",
            data: listProduct
        })

    }else{  
        return res.status(220).json({
            status: "success",
            data: product
        })           
    }
})

router.get('/:pid', async (req, res) =>{
    //Parametro id
    const { pid } = req.params;    
    const product =  await productos.getProductsById(Number(pid));

    if(product.status == 'error'){
        return res.status(404).json({
            ...product
        })
    }

    return res.status(220).json({
        ...product
    })     
})

router.post('/', validacionCampos , async (req, res) => {
    
    const product =  await productos.addProduct(req.body);
    if(product.status == 'error'){
        return res.status(404).json({
            ...product
        })
    }

    return res.status(220).json({
        ...product
    }) 

})

router.put('/:pid' , async (req, res) => {
    //Parametro id
    const { pid } = req.params; 
 
    const product =  await productos.updateProduct( Number(pid) , req.body);
    
    if(product.status == 'error'){
        return res.status(404).json({
            ...product
        })
    }

    return res.status(220).json({
        ...product
    }) 

})


router.delete('/:pid' , async (req, res) => {
    //Parametro id
    const { pid } = req.params; 

    const product =  await productos.deleteProduct(Number(pid));
    
    if(product.status == 'error'){
        return res.status(404).json({
            ...product
        })
    }

    return res.status(220).json({
        ...product
    }) 

})



module.exports = router;