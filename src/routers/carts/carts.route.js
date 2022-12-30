const {Router} = require('express');
const router = Router();

const CartManager = require('../../CartManager');
const carrito = new CartManager('./src/dataProducts.json', './src/dataCarts.json');

//Middlrware
// const validacionCampos = (req, res, next) =>{
//     const p = req.body;

//     if(p.title && p.description && p.price && p.code && p.category && p.stock){
//         p.status = !p.status ? true : p.status;
//         next();
//     }else{ 
//         next("Uno o mas campos faltan completar");
//     }
// }

router.get('/', async (req, res) =>{
    //Traer todos los productos
    const cart =  await carrito.getCarts();
    if(cart.status == 'error'){
        return res.status(404).json({
            ...cart
        })
    }     

    return res.status(220).json({
        ...cart
    })
})

router.post('/' , async (req, res) => {
    
    const cart =  await carrito.newCart();
    if(cart.status == 'error'){
        return res.status(404).json({
            ...cart
        })
    }

    return res.status(220).json({
        ...cart
    }) 

})
 router.post('/:cid/product/:pid' , async (req, res) => {
    const {cid, pid} = req.params;

    const cart =  await carrito.addProductCart(cid, pid);

    if(cart.status == 'error'){
        return res.status(404).json({
            ...cart
        })
    }

    return res.status(220).json({
        ...cart
    })
 })

// router.put('/:cid' , async (req, res) => {
//     //Parametro id
//     const { cid } = req.params; 
 
//     const product =  await productos.updateProduct( Number(cid) , req.body);
    
//     if(product.status == 'error'){
//         return res.status(404).json({
//             ...product
//         })
//     }

//     return res.status(220).json({
//         ...product
//     }) 

// })


// router.delete('/:cid' , async (req, res) => {
//     //Parametro id
//     const { cid } = req.params; 

//     const product =  await productos.deleteProduct(Number(cid));
    
//     if(product.status == 'error'){
//         return res.status(404).json({
//             ...product
//         })
//     }

//     return res.status(220).json({
//         ...product
//     }) 

// })



module.exports = router;