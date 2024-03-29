const {Router} = require('express');
const router = Router();

const CartManager = require('../../CartManager');
const carrito = new CartManager('./src/dataProducts.json', './src/dataCarts.json');

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

module.exports = router;